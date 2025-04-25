import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Checkbox, Collapse, Form, Input, InputNumber, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { roleApi } from '@/api/role';
import { staffsStore } from '@/stores/staffs';
import { addNotification } from '@/utils';
import { regexPhoneNumber } from '@/utils/phoneFormat';
import { clientsInfoStore } from '@/stores/clients-info';
import { IAddClientInfo, IUpdateClient, clientsInfoApi } from '@/api/clients';

export const AddEditModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [userPer, setUserPer] = useState<string[]>([]);
  const [oldPer, setOldPer] = useState<string[]>([]);

  const { data: roleData, isLoading: loadingRole } = useQuery({
    queryKey: ['getRoles'],
    queryFn: () => roleApi.getAllPartnerRoles(),
  });

  const { mutate: addNewStaffs } =
    useMutation({
      mutationKey: ['addNewStaffs'],
      mutationFn: (params: IAddClientInfo) => clientsInfoApi.addClients(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getStaffs'] });
        handleModalClose();
        addNotification('Xodim muvaffaqiyatli qo\'shildi');
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const { mutate: updateStaffs } =
    useMutation({
      mutationKey: ['updateStaffs'],
      mutationFn: (params: IUpdateClient) => clientsInfoApi.updateClient(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getStaffs'] });
        addNotification('Xodim muvaffaqiyatli o\'zgartirildi');
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const handleModalClose = () => {
    clientsInfoStore.setSingleClientInfo(null);
    clientsInfoStore.setIsOpenAddEditClientModal(false);
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleSubmit = (values: IAddClientInfo) => {
    setLoading(true);

    if (clientsInfoStore?.singleClientInfo) {
      const connectPer = userPer?.filter(newPer => !oldPer?.includes(newPer));
      const disconnectPer = oldPer?.filter(newPer => !userPer?.includes(newPer));

      updateStaffs({
        fullname: values?.fullname,
        password: values?.password,
        phone: `998${values?.phone}`,
        id: clientsInfoStore?.singleClientInfo?.id!,
        actionsToConnect: connectPer,
        actionsToDisconnect: disconnectPer,
      });

      return;
    }
    addNewStaffs({
      ...values,
      actionsToConnect: userPer,
      phone: `998${values?.phone}`,
    });
  };

  const handleChangePer = (e: CheckboxChangeEvent, perId: string) => {
    const findOldAssignPer = userPer?.find((per) => per === perId);

    if (e?.target?.checked && !findOldAssignPer) {
      setUserPer([...userPer, perId]);
    } else if (findOldAssignPer) {
      const filterPer = userPer?.filter((per) => per !== perId);

      setUserPer(filterPer);
    }
  };

  useEffect(() => {
    if (clientsInfoStore.singleClientInfo) {
      clientsInfoApi?.getSingleClient(clientsInfoStore?.singleClientInfo?.id)
        .then(res => {
          form.setFieldsValue({
            ...res?.data,
            phone: res?.data?.phone?.slice(3),
          });
          const checkPer = res?.data?.actionIds;

          setUserPer(checkPer);
          setOldPer(checkPer);
        });
    }
  }, [clientsInfoStore.singleClientInfo]);

  return (
    <Modal
      open={clientsInfoStore.isOpenAddEditClientModal}
      title={clientsInfoStore.singleClientInfo ? 'Изменить партнера' : 'Добавить партнера'}
      onCancel={handleModalClose}
      onOk={handleModalOk}
      okText={clientsInfoStore.singleClientInfo ? 'Изменить партнера' : 'Добавить партнера'}
      cancelText="Bekor qilish"
      centered
      confirmLoading={loading}
      width={600}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="fullname"
          label="Имя"
          rules={[{ required: true }]}
        >
          <Input placeholder="F.I.O" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Telefon raqami: 901234567"
          rules={[
            { required: true },
            {
              pattern: regexPhoneNumber,
              message: 'Raqamni to\'g\'ri kiriting!, Masalan: 901234567',
            },
          ]}
        >
          <InputNumber
            addonBefore="+998"
            placeholder="Telefon raqami"
            style={{ width: '100%' }}
            type="number"
          />
        </Form.Item>
        <Form.Item
          name="whereFrom"
          label="Откуда пришел"
          rules={[{ required: true }]}
        >
          <Input placeholder="Откуда пришел" />
        </Form.Item>
        {!clientsInfoStore?.singleClientInfo && (
          <>
            <Form.Item
              name="password"
              label="Введите пароль"
            >
              <Input.Password placeholder="Введите пароль" />
            </Form.Item>
            <Form.Item
              name="reset-password"
              label="Повторите пароль"
              rules={[
                {
                  validator(rule, value) {
                    if (value !== form.getFieldValue('password')) {
                      return Promise.reject('Пароли не совпадают.');
                    } else {
                      return Promise.resolve();
                    }
                  },
                  message: 'Пароли не совпадают.',
                },
              ]}
            >
              <Input.Password
                placeholder="Повторите пароль"
              />
            </Form.Item>
          </>
        )

        }
      </Form>
      {roleData?.data?.data?.map(role => (
        <div key={role?.id}>
          <Collapse
            size="small"
            items={[{
              key: role?.id,
              label: role?.name,
              children:
                role?.actions?.map((per) => (
                  <Checkbox
                    onChange={(e) => handleChangePer(e, per?.id!)}
                    key={per?.id}
                    style={{ display: 'flex', paddingLeft: '20px' }}
                    checked={userPer?.includes(per?.id)}
                  >
                    {per?.description}
                  </Checkbox>
                )),
            }]}
          />
        </div>
      ))
      }
    </Modal>
  );
});
