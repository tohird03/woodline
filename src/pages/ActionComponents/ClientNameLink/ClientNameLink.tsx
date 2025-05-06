import React from 'react';
import { IClientsInfo } from '@/api/clients';
import { useNavigate } from 'react-router-dom';
import { formatPhoneNumber } from '@/utils/phoneFormat';

type Props = {
  client: IClientsInfo;
};

export const ClientNameLink = ({ client }: Props) => {
  const navigate = useNavigate();

  return (
    <div style={{color: '#000', cursor: 'pointer'}}>
      <p style={{ margin: 0, fontWeight: 'bold', fontSize: '16px' }}>
        {client?.fullname}
      </p>
      <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>
        +{formatPhoneNumber(client?.phone)}
      </p>
    </div>
  );
};
