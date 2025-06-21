import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Checkbox, Collapse, Form, Input, InputNumber, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { roleApi } from '@/api/role';
import { staffsStore } from '@/stores/staffs';
import { addNotification } from '@/utils';
import { regexPhoneNumber } from '@/utils/phoneFormat';
import { usersApi } from '@/api/users/users';
import { IAddUser, IUpdateUser } from '@/api/users/types';

export const AddStaffsModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [userPer, setUserPer] = useState<string[]>([]);
  const [userRole, setUserRole] = useState<string[]>([]);
  const [oldPer, setOldPer] = useState<string[]>([]);
  const [oldRole, setOldRole] = useState<string[]>([]);

  const { data: roleData, isLoading: loadingRole } = useQuery({
    queryKey: ['getRoles'],
    queryFn: () => roleApi.getAllRoles(),
  });

  const { mutate: addNewStaffs } =
    useMutation({
      mutationKey: ['addNewStaffs'],
      mutationFn: (params: IAddUser) => usersApi.addUsers(params),
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
      mutationFn: (params: IUpdateUser) => usersApi.updateUsers(params),
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
    staffsStore.setSingleStaff(null);
    staffsStore.setIsOpenAddEditStaffModal(false);
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleSubmit = (values: IAddUser) => {
    setLoading(true);

    if (staffsStore?.singleStaff) {
      const connectPer = userPer?.filter(newPer => !oldPer?.includes(newPer));
      const disconnectPer = oldPer?.filter(newPer => !userPer?.includes(newPer));

      const connectRole = userRole?.filter(newRole => !oldRole?.includes(newRole));
      const disconnectRole = oldRole?.filter(newRole => !userRole?.includes(newRole));

      updateStaffs({
        fullname: values?.fullname,
        password: values?.password,
        phone: `998${values?.phone}`,
        id: staffsStore?.singleStaff?.id!,
        actionsToConnect: connectPer,
        actionsToDisconnect: disconnectPer,
        rolesToConnect: connectRole,
        rolesToDisconnect: disconnectRole,
      });

      return;
    }
    addNewStaffs({
      ...values,
      actionsToConnect: userPer,
      rolesToConnect: userRole,
      phone: `998${values?.phone}`,
    });
  };

  // PER
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
    if (staffsStore.singleStaff) {
      usersApi?.getSingleUser(staffsStore?.singleStaff?.id)
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
  }, [staffsStore.singleStaff]);

  return (
    <Modal
      open={staffsStore.isOpenAddEditStaffModal}
      title={staffsStore.singleStaff ? 'Изменить пользователей' : 'Добавить пользователя'}
      onCancel={handleModalClose}
      onOk={handleModalOk}
      okText={staffsStore.singleStaff ? 'Изменить пользователей' : 'Добавить пользователя'}
      cancelText="Отмена"
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
          label="Номер телефона: 901234567"
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
            placeholder="Номер телефона"
            style={{ width: '100%' }}
            type="number"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Введите пароль"
        >
          <Input.Password placeholder="Введите пароль" />
        </Form.Item>
        <Form.Item
          name="reset-password"
          label="Parolni qayta kiriting"
          rules={[
            {
              validator(rule, value) {
                if (value !== form.getFieldValue('password')) {
                  return Promise.reject('Parollar bir-biriga mos emas');
                } else {
                  return Promise.resolve();
                }
              },
              message: 'Parollar bir-biriga mos emas',
            },
          ]}
        >
          <Input.Password
            placeholder="Parolni qayta kiriting"
          />
        </Form.Item>
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
              key: role?.id,
              label: role?.name,
              children:
                role?.actions?.map((per) => (
                  <Checkbox
                    onChange={(e) => handleChangePer(e, per?.id!)}
                    key={per?.id}
                    style={{display: 'flex', paddingLeft: '20px'}}
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
