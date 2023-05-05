import { useTranslation } from 'next-i18next';
import React from 'react';

import Pagination from '../../../../libs/web/components/Pagination/Pagination';
import SlideModal from '../../../../libs/web/components/SlideModal/SlideModal';
import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import TableBody from '../../../../libs/web/components/Table/TableBody';
import TableHeader from '../../../../libs/web/components/Table/TableHeader';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { ITEMS_PER_PAGE } from '../Members/Members.constants';
import AdminDetails from './AdminDetails';
import AdminsTableItem from './AdminsTableItem';
import AdminsTableSearch from './AdminsTableSearch';
import { useAdminsData } from './hooks/useAdminsData';

const AdminsTable = () => {
  const {
    localState,
    localActions,
    formattedData,
    handlers,
  } = useAdminsData();
  const { t } = useTranslation('admins');
  const items = [t('full_name'), t('contact_email'), t('status')];

  return (
    <>
      <div className="flex gap-2.5 mb-4">
        <Typography variant={ETextVariant.xl} medium className="sm:pl-4">
          {t('admins')}
        </Typography>
        <Typography variant={ETextVariant.xl} medium color={ETextColor.gray}>
          ({localState.adminsCount})
        </Typography>
      </div>
      <div className="shadow rounded-md handleCancelButton relative">
        {formattedData?.loading && <Spinner contentSize />}
        <AdminsTableSearch
          search={localState.search}
          filters={localState.filters}
          setSearch={localActions.setSearch}
          setFilters={localActions.setFilters}
          data={localState.adminsData}
        />
        <TableHeader
          items={items}
          columnsSize={2}
          sortItem={t('full_name')}
          sortOrder={localState.filters.sortOrder}
          setSortOrder={(value) =>
            localActions.setFilters({ ...localState.filters, sortOrder: value })
          }
          className="md:hidden sm:hidden"
        />
        {localState.adminsData?.length ? (
          <>
            <TableBody>
              {localState.adminsData.map((item) => (
                <AdminsTableItem
                  key={item.id}
                  item={item}
                  size={items.length}
                  onClickRow={handlers?.handleOnClickRow}
                  handleAction={handlers?.handleAction}
                  currentUserId={formattedData?.currentUserId}
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
            className="flex justify-center py-5 h-full"
          >
            {formattedData?.localErrorText('IM0025', 'admins')}
          </Typography>
        )}
      </div>
      <SlideModal
        closeModal={() => localActions.setOpenModal(false)}
        isModalOpen={localState.openModal}
        dialogTitle={t('details')}
      >
        <AdminDetails
          item={localState.selectedAdmin}
          handleAction={handlers?.handleAction}
          currentUserId={formattedData?.currentUserId}
        />
      </SlideModal>
    </>
  );
};

export default AdminsTable;
