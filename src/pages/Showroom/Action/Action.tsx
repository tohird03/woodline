import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, Popconfirm} from 'antd';
import {addNotification} from '@/utils';
import { furnutureTypeApi } from '@/api/furnuture-type/furnuture-type';
import { furnutureTypeStore } from '@/stores/furnuture-type';
import { IStorehouse } from '@/api/storehouse/type';
import { showroomStores } from '@/stores/showroom';
import { storehouseApi } from '@/api/storehouse';

type Props = {
  showroom: IStorehouse;
};

export const Action: FC<Props> = observer(({showroom}) => {
  const queryClient = useQueryClient();

  const {mutate: deleteShowroom} =
  useMutation({
    mutationKey: ['deleteShowroom'],
    mutationFn: (id: string) => storehouseApi.deleteStorehouse(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getShowooms']});
      addNotification('Успешное удаление');
    },
    onError: addNotification,
  });

  const handleEdit = () => {
    showroomStores.setSingleShowroom(showroom);
    showroomStores.setIsOpenShowroomModal(true);
  };

  const handleDelete = () => {
    deleteShowroom(showroom?.id);
  };

  return (
    <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
      <Button onClick={handleEdit} type="primary" icon={<EditOutlined />} />
      <Popconfirm
        title="Удалить выставочный зал"
        description="Вы уверены, что хотите удалить этого выставочный зал?"
        onConfirm={handleDelete}
        okText="Да"
        okButtonProps={{style: {background: 'red'}}}
        cancelText="Нет"
      >
        <Button type="primary" icon={<DeleteOutlined />} danger />
      </Popconfirm>
    </div>
  );
});
