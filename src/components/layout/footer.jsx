import React from 'react';
import { Layout } from 'antd';

export const Footer = () => {
  const styleObj = {
    background: '##f0f2f5',
    textAlign: 'center'
  }
  return (
    <Layout.Footer style={styleObj}>Footer</Layout.Footer>
  )
}