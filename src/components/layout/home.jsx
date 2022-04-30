import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { Header } from './header'
import { Sider } from './sider'
import { Footer } from './footer';
import { homeRoutes } from 'router';

const genRoutes = (routeConfig) => {
  const r = routeConfig.map(route => {
    const { Component, path, children, } = route;
    if (children) {
      return genRoutes(children)
    } else {
      return <Route path={path} element={<Component />} key={path} />
    }
  })
  return r
}

const Home = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout>
        <Sider />
        <Layout style={{ padding: '25px 25px 0 25px' }}>
          <Layout.Content style={{ background: '#fff', padding: '20px' }}>
            <Routes>
              <Route index element={<Navigate to='menu11' />} />
              { genRoutes(homeRoutes) }
            </Routes>
          </Layout.Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Home