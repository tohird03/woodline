import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, Popconfirm} from 'antd';
import {addNotification} from '@/utils';
import { IFurnutureType } from '@/api/furnuture-type/types';
import { furnutureTypeApi } from '@/api/furnuture-type/furnuture-type';
import { furnutureTypeStore } from '@/stores/furnuture-type';

type Props = {
  type: IFurnutureType;
};

export const Action: FC<Props> = observer(({type}) => {
  const queryClient = useQueryClient();

  const {mutate: deleteFurnutureType} =
  useMutation({
    mutationKey: ['deleteFurnutureType'],
    mutationFn: (id: string) => furnutureTypeApi.deleteFurnutureType(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getFurnutureType']});
    },
    onError: addNotification,
  });

  const handleEdit = () => {
    furnutureTypeStore.setSingleFurnutureType(type);
    furnutureTypeStore.setIsOpenNewTypeModal(true);
  };

  const handleDelete = () => {
    deleteFurnutureType(type?.id);
  };

  return (
    <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
      <Button onClick={handleEdit} type="primary" icon={<EditOutlined />} />
      <Popconfirm
        title="Удалить Вид мебели"
        description="Вы уверены, что хотите удалить этого Вид мебели?"
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
