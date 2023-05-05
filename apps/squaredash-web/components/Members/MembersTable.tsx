import { useTranslation } from 'next-i18next';
import React from 'react';

import Pagination from '../../../../libs/web/components/Pagination/Pagination';
import SlideModal from '../../../../libs/web/components/SlideModal/SlideModal';
import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import TableBody from '../../../../libs/web/components/Table/TableBody';
import TableHeader from '../../../../libs/web/components/Table/TableHeader';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import MemberDetails from './MemberDetails';
import { ITEMS_PER_PAGE } from './Members.constants';
import MembersTableItem from './MembersTableItem';
import MembersTableSearch from './MembersTableSearch';
import { useMembersData } from './hooks/useMembersData';
import classNames from 'classnames';

const MembersTable = () => {
  const { localState, localActions, formattedData, handlers, localErrorText } =
    useMembersData();
  const { t } = useTranslation('members');
  const items = [t('full_name'), t('phone_number'), t('role'), t('status')];

  return (
    <>
      <div className="flex gap-2.5 mb-4">
        <Typography variant={ETextVariant.xl} medium className="sm:pl-4">
          {t('members')}
        </Typography>
        <Typography variant={ETextVariant.xl} medium color={ETextColor.gray}>
          {localState.membersCount}
        </Typography>
      </div>
      <div className="shadow rounded-md relative">
        {formattedData?.loading && <Spinner contentSize />}
        <MembersTableSearch
          search={localState.search}
          filters={localState.filters}
          setSearch={localActions.setSearch}
          setFilters={localActions.setFilters}
          data={localState.membersData}
        />
        <TableHeader
          items={items}
          columnsSize={4}
          sortItem={t('full_name')}
          sortOrder={localState.filters.sortOrder}
          setSortOrder={(value) =>
            localActions.setFilters({ ...localState.filters, sortOrder: value })
          }
          className="md:hidden sm:hidden"
          isFirstItemBig
        />
        {localState.membersData?.length ? (
          <>
            <TableBody>
              {localState.membersData.map((item) => (
                <MembersTableItem
                  key={item.id}
                  item={item}
                  size={items.length}
                  isOwnUser={formattedData?.userId === item?.id}
                  onClickRow={handlers?.handleOnClickRow}
                  handleAction={handlers?.handleAction}
                />
              ))}
            </TableBody>
            <Pagination
              itemsPerPage={ITEMS_PER_PAGE}
              totalPages={formattedData?.totalPages}
              setData={(value) =>
                localActions.setFilters({ ...localState.filters, skip: value })
              }
              currentPage={localState.currentPage}
              setCurrentPage={localActions.setCurrentPage}
            />
          </>
        ) : (
          <Typography
            variant={ETextVariant.base}
            color={ETextColor.gray}
            medium
            className={classNames('flex justify-center py-5 h-full', { 'min-h-[16em]': formattedData.loading})}
          >
            {localErrorText('IM0025', 'members')}
          </Typography>
        )}
      </div>
      <SlideModal
        closeModal={() => localActions.setOpenModal(false)}
        isModalOpen={localState.openModal}
        dialogTitle={t('details')}
      >
        <MemberDetails
          item={localState.selectedMember}
          isOwnUser={formattedData?.userId === localState.selectedMember?.id}
          handleAction={handlers?.handleAction}
        />
      </SlideModal>
    </>
  );
};

export default MembersTable;
