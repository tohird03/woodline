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
import { IAddUser, IUpdateUser } from '@/api/users/types';
import { usersApi } from '@/api/users/users';

export const AddEditModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [userPer, setUserPer] = useState<string[]>([]);
  const [oldPer, setOldPer] = useState<string[]>([]);
  const [userRole, setUserRole] = useState<string[]>([]);
  const [oldRole, setOldRole] = useState<string[]>([]);

  const { data: roleData, isLoading: loadingRole } = useQuery({
    queryKey: ['getRoles'],
    queryFn: () => roleApi.getAllRoles(),
  });

  const { mutate: addNewClient } =
    useMutation({
      mutationKey: ['addNewClient'],
      mutationFn: (params: IAddUser) => usersApi.addUsers(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getClients'] });
        handleModalClose();
        addNotification('Mijoz muvaffaqiyatli qo\'shildi');
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const { mutate: updateClient } =
    useMutation({
      mutationKey: ['updateClient'],
      mutationFn: (params: IUpdateUser) => usersApi.updateUsers(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getClients'] });
        addNotification('Mijoz muvaffaqiyatli o\'zgartirildi');
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

  const handleSubmit = (values: IAddUser) => {
    setLoading(true);

    if (clientsInfoStore?.singleClientInfo) {
      const connectPer = userPer?.filter(newPer => !oldPer?.includes(newPer));
      const disconnectPer = oldPer?.filter(newPer => !userPer?.includes(newPer));

      const connectRole = userRole?.filter(newRole => !oldRole?.includes(newRole));
      const disconnectRole = oldRole?.filter(newRole => !userRole?.includes(newRole));

      updateClient({
        fullname: values?.fullname,
        password: values?.password,
        phone: `998${values?.phone}`,
        id: clientsInfoStore?.singleClientInfo?.id!,
        actionsToConnect: connectPer,
        actionsToDisconnect: disconnectPer,
        rolesToConnect: connectRole,
        rolesToDisconnect: disconnectRole,
      });

      return;
    }

    addNewClient({
      ...values,
      actionsToConnect: userPer,
      rolesToConnect: userRole,
      phone: `998${values?.phone}`,
    });
  };

  // const handleChangePer = (e: CheckboxChangeEvent, perId: string) => {
  //   const findOldAssignPer = userPer?.find((per) => per === perId);

  //   if (e?.target?.checked && !findOldAssignPer) {
  //     setUserPer([...userPer, perId]);
  //   } else if (findOldAssignPer) {
  //     const filterPer = userPer?.filter((per) => per !== perId);

  //     setUserPer(filterPer);
  //   }
  // };

  const handleChangeRole = (e: CheckboxChangeEvent, roleName: string) => {
    const findOldAssignRole = userRole?.find((per) => per === roleName);

    if (e?.target?.checked && !findOldAssignRole) {
      setUserRole([...userRole, roleName]);
    } else if (findOldAssignRole) {
      const filterPer = userRole?.filter((per) => per !== roleName);

      setUserRole(filterPer);
    }
  };

  useEffect(() => {
    if (clientsInfoStore.singleClientInfo) {
      usersApi?.getSingleUser(clientsInfoStore.singleClientInfo?.id)
        .then(res => {
          form.setFieldsValue({
            ...res?.data,
            phone: res?.data?.phone?.slice(3),
          });
          const checkPer = res?.data?.actionIds;
          const checkRole = res?.data?.roles?.map(role => role?.name);

          setUserPer(checkPer);
          setOldPer(checkPer);

          setUserRole(checkRole);
          setOldRole(checkRole);
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
          name="source"
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
        <div key={role?.name}>
          <Checkbox
            onChange={(e) => handleChangeRole(e, role?.name)}
            key={role?.name}
            style={{ display: 'flex', paddingLeft: '20px' }}
            checked={userRole?.includes(role?.name)}
          >
            {role?.name}
          </Checkbox>
          {/* <Collapse
            size="small"
            items={[{
              key: role?.name,
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
          /> */}
        </div>
      ))
      }
    </Modal>
  );
});
