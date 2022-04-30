import React from 'react';
import { Layout } from 'antd';
import { PageMenu } from './menu/menu';

export const Sider = () => {
  const style = {
    background: '#fff',
    maxHeight: 'calc(100vh - 64px)',
    overflow: 'hidden auto'
  }
  return <Layout.Sider width='200' style={style} children={<PageMenu />} />
}
