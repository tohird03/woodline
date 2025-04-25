import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, Popconfirm, notification} from 'antd';
import {clientsInfoApi, IClientsInfo} from '@/api/clients';
import {addNotification} from '@/utils';
import { clientsInfoStore } from '@/stores/clients-info';

type Props = {
  client: IClientsInfo;
};

export const Action: FC<Props> = observer(({client}) => {
  const queryClient = useQueryClient();

  const {mutate: deleteClient} =
  useMutation({
    mutationKey: ['deleteClient'],
    mutationFn: (id: string) => clientsInfoApi.deleteClient(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getClients']});
      addNotification('Успешно удалено');
    },
    onError: addNotification,
  });

  const handleEditProcess = () => {
    clientsInfoStore.setSingleClientInfo(client);
    clientsInfoStore.setIsOpenAddEditClientModal(true);
  };

  const handleDelete = () => {
    deleteClient(client?.id);
  };

  return (
    <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
      <Button onClick={handleEditProcess} type="primary" icon={<EditOutlined />} />
      <Popconfirm
        title="Удалить модель"
        description="Вы уверены, что хотите удалить эту модель?"
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
