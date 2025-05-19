import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, Popconfirm} from 'antd';
import {addNotification} from '@/utils';
import { IStorehouse } from '@/api/storehouse/type';
import { storehouseApi } from '@/api/storehouse';
import { warehouseStores } from '@/stores/warehouse';

type Props = {
  warehouse: IStorehouse;
};

export const Action: FC<Props> = observer(({warehouse}) => {
  const queryClient = useQueryClient();

  const {mutate: deleteWarehouse} =
  useMutation({
    mutationKey: ['deleteWarehouse'],
    mutationFn: (id: string) => storehouseApi.deleteStorehouse(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getShowooms']});
      addNotification('Успешное удаление');
    },
    onError: addNotification,
  });

  const handleEdit = () => {
    warehouseStores.setSingleWarehouse(warehouse);
    warehouseStores.setIsOpenWarehouseModal(true);
  };

  const handleDelete = () => {
    deleteWarehouse(warehouse?.id);
  };

  return (
    <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
      <Button onClick={handleEdit} type="primary" icon={<EditOutlined />} />
      <Popconfirm
        title="Удалить склад"
        description="Вы уверены, что хотите удалить этого склад?"
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
