import {useState} from 'react';
import {ETextVariant} from '../../../../../../libs/web/constants/enums';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import Modal from '../../../../../../libs/web/components/Modal/Modal';
import Input from '../../../../../../libs/web/components/Input/Input';
import {TGroupForm} from '../Items/Items.types';
import {DEPRECIATION_RECOVERABLE_OPTIONS, GROUP_ITEM_FIELDS} from '../Items/Items.constants';
import SelectControlled, {IItem} from '../../../../../../libs/web/components/Select/SelectControlled';
import Checkbox from '../../../../../../libs/web/components/Checkbox/Checkbox';
import {AsyncSelect} from '../../../../../../libs/web/components/Select/AsyncSelect';
import {GET_CLAIM_ITEMS} from '../../../ClaimItems/ClaimItems.api';
import {SOURCES} from '../../../ClaimItems/ClaimItems.contants';
import {ErrorMessage} from '../../../Components/ErrorMessage';

interface IProps {
  t: any,
  groupItemForm: TGroupForm,
  groupItemFormErrors: TGroupForm,
  localErrorText: any,
  createGroupItemModal: boolean,
  closeCreateGroupItemModal: () => void,
  handleCreateGroupItem: (val?: boolean) => void,
  handleChangeGroupItemForm: (value, name: string) => void,
  loading: boolean,
  showFields: boolean,
  setShowFields: (val: boolean) => void,
  hideFields?: boolean
  unitsData: IItem[];
}

const CreateGroupItemModal = ({
  t,
  groupItemForm,
  groupItemFormErrors,
  localErrorText,
  createGroupItemModal,
  closeCreateGroupItemModal,
  handleCreateGroupItem,
  handleChangeGroupItemForm,
  loading,
  showFields,
  setShowFields,
  hideFields = false,
  unitsData,
}: IProps): JSX.Element => {
  const addGroupItem = () => {
    handleCreateGroupItem(showFields || hideFields);
  };
  const closeModal = () => {
    setShowFields(false);
    closeCreateGroupItemModal();
  };

  return (
    <Modal
      show={createGroupItemModal}
      closeModal={closeModal}
      secondButtonAction={addGroupItem}
      firstButtonText={t('cancel')}
      secondButtonText={t('add_item')}
      fullScreenModal
      loading={loading}
    >
      <div>
        <Typography
          variant={ETextVariant.lg}
          medium
          className="sm:text-left sm:block"
        >
          {t('add_claim_item')}
        </Typography>
        <Input
          label={t('sequence_number')}
          onChangeText={(e) =>
            handleChangeGroupItemForm(e?.target?.value, GROUP_ITEM_FIELDS.GROUP_ITEM_SEQUENCE)
          }
          value={groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_SEQUENCE] as string}
          error={!!groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_SEQUENCE]}
          errorText={localErrorText(
            groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_SEQUENCE],
            GROUP_ITEM_FIELDS.GROUP_ITEM_SEQUENCE
          )}
          maxLength={10}
          className='w-1/2 pr-2 mt-8'
        />
        {(!hideFields && !showFields) && <div className='w-100 mt-8'>
          <AsyncSelect
            label={t('claim_item')}
            variableName="search"
            responsePathToArray="claimItems"
            queryStructure={GET_CLAIM_ITEMS}
            initialLoad
            value={(groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_ID] as IItem)}
            onChange={(e) => {
              handleChangeGroupItemForm(e, GROUP_ITEM_FIELDS.GROUP_ITEM_ID);
            }}
            numberRequestElements={10}
            responseNameName={'description'}
            addNew={'Create new item'}
            onClick={() => setShowFields(true)}
            isModalSelect={true}
          />
        </div>}
        {(showFields || hideFields) &&
          <div>
            <Input
              label={t('description')}
              onChangeText={(e) =>
                handleChangeGroupItemForm(e?.target?.value, GROUP_ITEM_FIELDS.GROUP_ITEM_DESCRIPTION)
              }
              value={groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_DESCRIPTION] as string}
              error={!!groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_DESCRIPTION]}
              errorText={localErrorText(
                groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_DESCRIPTION],
                GROUP_ITEM_FIELDS.GROUP_ITEM_DESCRIPTION
              )}
              maxLength={50}
              className='mt-8 mb-4'
            />
            <SelectControlled
              label={t('source')}
              options={SOURCES}
              placeholder="Select..."
              value={groupItemForm?.[GROUP_ITEM_FIELDS.GROUP_ITEM_SOURCE] as IItem}
              onChangeValue={(e) =>
                handleChangeGroupItemForm(e, GROUP_ITEM_FIELDS.GROUP_ITEM_SOURCE)
              }
              error={!!groupItemFormErrors?.[GROUP_ITEM_FIELDS.GROUP_ITEM_SOURCE]}
              errorText={localErrorText(
                groupItemFormErrors?.[GROUP_ITEM_FIELDS.GROUP_ITEM_SOURCE],
                GROUP_ITEM_FIELDS.GROUP_ITEM_SOURCE
              )}
              directionClass="top-full"
            />
          </div>
        }
        <Input
          label={t('note')}
          rightLabel={`(${t('optional')})`}
          onChangeText={(e) =>
            handleChangeGroupItemForm(e?.target?.value, GROUP_ITEM_FIELDS.GROUP_ITEM_NOTES)
          }
          value={groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_NOTES] as string}
          error={!!groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_NOTES]}
          errorText={localErrorText(
            groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_NOTES],
            GROUP_ITEM_FIELDS.GROUP_ITEM_NOTES
          )}
          maxLength={100}
          className='mt-8 mb-4'
        />
        <div className='flex mt-8 mb-4'>
          <Input
            label={t('quantity')}
            onChangeText={(e) =>
              handleChangeGroupItemForm(e?.target?.value, GROUP_ITEM_FIELDS.GROUP_ITEM_QUANTITY)
            }
            value={groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_QUANTITY] as string}
            error={!!groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_QUANTITY]}
            errorText={localErrorText(
              groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_QUANTITY],
              GROUP_ITEM_FIELDS.GROUP_ITEM_QUANTITY
            )}
            maxLength={100}
            className='w-1/2 pr-2'
          />
          <SelectControlled
            label={t('unit')}
            options={unitsData}
            value={groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_OF_MEASUREMENT] as IItem}
            onChangeValue={(e) =>
              handleChangeGroupItemForm(e, GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_OF_MEASUREMENT)
            }
            error={!!groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_QUANTITY]}
            errorText={localErrorText(
              groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_OF_MEASUREMENT],
              GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_OF_MEASUREMENT
            )}
            className='w-1/2 pl-2'
          />
        </div>
        <Input
          label={t('unit_price')}
          onChangeText={(e) =>
            handleChangeGroupItemForm(e?.target?.value, GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_PRICE)
          }
          value={groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_PRICE] as string}
          error={!!groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_PRICE]}
          errorText={localErrorText(
            groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_PRICE],
            GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_PRICE
          )}
          maxLength={50}
          className='w-1/2 pr-2 mt-8 mb-4'
        />
        <Input
          label={t('tax')}
          onChangeText={(e) =>
            handleChangeGroupItemForm(e?.target?.value, GROUP_ITEM_FIELDS.GROUP_ITEM_TAX)
          }
          value={groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_TAX] as string}
          error={!!groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_TAX]}
          errorText={localErrorText(
            groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_TAX],
            GROUP_ITEM_FIELDS.GROUP_ITEM_TAX
          )}
          maxLength={50}
          className='w-1/2 pr-2 mt-8 mb-4'
        />
        <Input
          label={t('overhead_and_profit')}
          onChangeText={(e) =>
            handleChangeGroupItemForm(e?.target?.value, GROUP_ITEM_FIELDS.GROUP_ITEM_OVERHEAD)
          }
          value={groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_OVERHEAD] as string}
          error={!!groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_OVERHEAD]}
          errorText={localErrorText(
            groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_OVERHEAD],
            GROUP_ITEM_FIELDS.GROUP_ITEM_OVERHEAD
          )}
          maxLength={50}
          className='w-1/2 pr-2 mt-8 mb-4'
        />
        <Input
          label={t('rcv')}
          onChangeText={(e) =>
            handleChangeGroupItemForm(e?.target?.value, GROUP_ITEM_FIELDS.GROUP_ITEM_RCV)
          }
          value={groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_RCV] as string}
          error={!!groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_RCV]}
          errorText={localErrorText(
            groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_RCV],
            GROUP_ITEM_FIELDS.GROUP_ITEM_RCV
          )}
          maxLength={50}
          className='w-1/2 pr-2 mt-8 mb-4'
        />
        <div className='flex mt-8 mb-4'>
          <Input
            label={t('depreciation_percentage')}
            onChangeText={(e) =>
              handleChangeGroupItemForm(e?.target?.value, GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_PERCENTAGE)
            }
            value={groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_PERCENTAGE] as string}
            error={!!groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_PERCENTAGE]}
            errorText={localErrorText(
              groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_PERCENTAGE],
              GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_PERCENTAGE
            )}
            maxLength={100}
            className='w-1/2 pr-2'
          />
          <Input
            label={t('depreciation_sum')}
            onChangeText={(e) =>
              handleChangeGroupItemForm(e?.target?.value, GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_SUM)
            }
            value={groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_SUM] as string}
            error={!!groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_SUM]}
            errorText={localErrorText(
              groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_SUM],
              GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_SUM
            )}
            maxLength={100}
            className='w-1/2 pl-2'
          />
        </div>
        <div>
          <Typography variant={ETextVariant.sm} medium className="text-gray-700">
            {t('depreciation_recoverable')}
          </Typography>
          {DEPRECIATION_RECOVERABLE_OPTIONS.map((item) => {
            return (
              <Checkbox
                key={item.id}
                label={item.name}
                onChange={() => handleChangeGroupItemForm(item, GROUP_ITEM_FIELDS.GROUP_ITEM_IS_DEPRECIATION_REFUNDABLE)}
                checked={(groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_IS_DEPRECIATION_REFUNDABLE] as IItem).id === item.id ||
                  groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_IS_DEPRECIATION_REFUNDABLE] === item.type}
                className="my-2"
                isRounded
              />
            );
          })}
        </div>
        <Input
          label={t('acv')}
          onChangeText={(e) =>
            handleChangeGroupItemForm(e?.target?.value, GROUP_ITEM_FIELDS.GROUP_ITEM_ACV)
          }
          value={groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_ACV] as string}
          error={!!groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_ACV]}
          errorText={localErrorText(
            groupItemFormErrors[GROUP_ITEM_FIELDS.GROUP_ITEM_ACV],
            GROUP_ITEM_FIELDS.GROUP_ITEM_ACV
          )}
          maxLength={50}
          className='w-1/2 pr-2 mt-8 mb-4'
        />
        <ErrorMessage formError={groupItemFormErrors} t={t}/>
      </div>
    </Modal>
  );
};

export default CreateGroupItemModal;
