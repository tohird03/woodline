import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {MoreOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import { IStorehouse } from '@/api/storehouse/type';
import { warehouseStores } from '@/stores/warehouse';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { IPurchase } from '@/api/purchase/types';

type Props = {
  income: IPurchase;
};

export const Action: FC<Props> = observer(({income}) => {
  const navigate = useNavigate();

  const handleShowMoreIncome = () => {
    navigate(ROUTES.singleIncome?.replace(':incomeId', income?.id));
  };

  return (
    <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
      <Button onClick={handleShowMoreIncome} type="primary" icon={<MoreOutlined />} />
    </div>
  );
});
