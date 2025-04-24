import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  supplier: any;
};

export const SupplierNameLink = ({ supplier }: Props) => {
  const navigate = useNavigate();

  return (
    <div style={{color: '#17a2b8', cursor: 'pointer'}}>
      <p style={{ margin: 0, fontWeight: 'bold' }}>
        {supplier?.name}
      </p>
      <i>+{supplier?.phone}</i>
    </div>
  );
};
