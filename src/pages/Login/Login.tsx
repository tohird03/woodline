'use client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import classNames from 'classnames';
import { useLocalStorage } from 'usehooks-ts';
import { ILoginForm } from '@/api/auth/types';
import { ROUTES } from '@/constants';
import { authStore, TokenType } from '@/stores/auth';
import { addNotification } from '@/utils/addNotification';
import styles from './login.scss';
import SASLogo from '@/assets/img/sas.svg';
// @ts-ignore
import 'react-phone-input-2/lib/style.css';
// @ts-ignore
import PhoneInput from 'react-phone-input-2';
import ProductImg from '/public/images/sas-product.jpg';
import { mainMenuList } from '@/modules/Layout/constants';

const cn = classNames.bind(styles);

export const Login = observer(() => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [, setAccessToken] = useLocalStorage<TokenType['accessToken']>('accessToken', '');

  const handleSubmit = (values: ILoginForm) => {
    setLoading(true);

    authStore.getSignIn(values)
      .then(res => {
        if (res?.data) {
          setAccessToken(res?.data?.data?.tokens?.accessToken);
          navigate(ROUTES.partnor);
          addNotification('Success login');
          authStore.setMainMenuItems(mainMenuList);
        }
      })
      .catch(addNotification)
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main>
      <section className={cn('login')}>
        <div className={cn('login__form-wrapper')}>
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            autoComplete="off"
            className={cn('login__form')}
          >
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{required: true}]}
            >
              <PhoneInput
                country={'uz'}
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true,
                  className: 'form__password-input form__phone-input',
                  autocomplete: 'off',
                }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input.Password
                placeholder="Password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <div className={cn('login__form__submit')}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                block
                disabled={loading}
              >
                Login
              </Button>
            </div>
          </Form>
        </div>
      </section>
    </main>
  );
});
