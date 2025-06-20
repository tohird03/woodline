import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {MoreOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import { IPurchase } from '@/api/purchase/types';
import { incomeStores } from '@/stores/storehouse';

type Props = {
  income: IPurchase;
};

export const Action: FC<Props> = observer(({income}) => {
  const handleShowMoreIncome = () => {
    incomeStores.setIncome(income);
    incomeStores.setIsOpenShowIncomeProductsModal(true);
  };

  return (
    <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
      <Button onClick={handleShowMoreIncome} type="primary" icon={<MoreOutlined />} />
    </div>
  );
});
