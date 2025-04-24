import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, Popconfirm} from 'antd';
import {IStaffs, staffsApi} from '@/api/staffs';
import {staffsStore} from '@/stores/staffs';
import {addNotification} from '@/utils';

type Props = {
  staff: IStaffs;
};

export const Action: FC<Props> = observer(({staff}) => {
  const queryClient = useQueryClient();

  const {mutate: deleteStaff} =
  useMutation({
    mutationKey: ['deleteStaff'],
    mutationFn: (id: string) => staffsApi.deleteStaff(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getStaffs']});
      addNotification('Xodim muvaffaqiyatli o\'chirildi');
    },
    onError: addNotification,
  });

  const handleEditStaff = () => {
    staffsStore.setSingleStaff(staff);
    staffsStore.setIsOpenAddEditStaffModal(true);
  };

  const handleDelete = () => {
    deleteStaff(staff?.id);
  };

  return (
    <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
      <Button onClick={handleEditStaff} type="primary" icon={<EditOutlined />} />
      <Popconfirm
        title="Удалить пользователя"
        description="Вы уверены, что хотите удалить этого пользователя?"
        onConfirm={handleDelete}
        okText="Да"
        okButtonProps={{style: {background: 'red'}}}
        cancelText="Отмена"
      >
        <Button type="primary" icon={<DeleteOutlined />} danger />
      </Popconfirm>
    </div>
  );
});
