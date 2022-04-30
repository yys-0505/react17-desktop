
import React from 'react'
import { UserOutlined, LaptopOutlined, NotificationOutlined, AppstoreOutlined } from '@ant-design/icons';

const Home = React.lazy(() => import('components/layout/home'))
const Login = React.lazy(() => import('pages/login/login'))
const NotFound = React.lazy(() => import('pages/not-found/not-found'))

const Menu11 = React.lazy(() => import('pages/menu1/menu11/menu11'))
const Menu12 = React.lazy(() => import('pages/menu1/menu12/menu12'))
const Menu13 = React.lazy(() => import('pages/menu1/menu13/menu13'))

const Menu21 = React.lazy(() => import('pages/menu2/menu21/menu21'))
const Menu22 = React.lazy(() => import('pages/menu2/menu22/menu22'))

const Menu31 = React.lazy(() => import('pages/menu3/menu31/menu31'))
const Menu321 = React.lazy(() => import('pages/menu3/menu321/menu321'))
const Menu322 = React.lazy(() => import('pages/menu3/menu322/menu322'))
const Menu322Dtl = React.lazy(() => import('pages/menu3/menu322/menu322-dtl'))

const Menu4 = React.lazy(() => import('pages/menu4/menu4'))

export const pageRoutes = [
  { path: '/', },
  { path: '/home/*', Component: Home, auth: true, },
  { path: '/login', Component: Login, auth: false, },
  { path: '/notfound', Component: NotFound, auth: false, },
]

// used for both router and menu
export const homeRoutes = [
  {
    name: 'subnav 1',
    key: 'menu1',
    Icon: UserOutlined,
    children: [
      { name: 'option1-1', path: 'menu11', Component: Menu11, },
      { name: 'option1-2', path: 'menu12', Component: Menu12, },
      { name: 'option1-3', path: 'menu13', Component: Menu13, },
      { name: 'option1-4', path: 'menu14', Component: NotFound, },
    ]
  },
  {
    name: 'subnav 2',
    key: 'menu2',
    Icon: LaptopOutlined,
    children: [
      { name: 'option2-1', path: 'menu21', Component: Menu21, },
      { name: 'option2-2', path: 'menu22', Component: Menu22, },
      { name: 'option2-3', path: 'menu23', Component: NotFound, },
      { name: 'option2-4', path: 'menu24', Component: NotFound, },
    ]
  },
  {
    name: 'subnav 3',
    key: 'menu3',
    Icon: NotificationOutlined,
    children: [
      { name: 'option3-1', path: 'menu31', Component: Menu31, },
      {
        name: 'option3-2',
        key: 'menu32',
        children: [
          { name: 'option3-2-1', path: 'menu321', Component: Menu321, },
          { name: 'option3-2-2', path: 'menu322', Component: Menu322, },
          { name: 'option3-2-2', path: 'menu322/:id', Component: Menu322Dtl, },
          { name: 'option3-2-3', path: 'menu323', Component: NotFound, },
          { name: 'option3-2-4', path: 'menu324', Component: NotFound, },
        ]
      },
    ]
  },
  { name: 'subnav 4', path: 'menu4', Component: Menu4, Icon: AppstoreOutlined },
]

export const findOpenKeys = (routeConfig, currPathName) => {
  let openKeysStr = ''
  const deepFind = (arr, pathName, parentKey) => {
    return arr.find(r => {
      const { key, children, path, } = r
      if (children) {
        const currkey = parentKey ? `${parentKey}-${key}` : key
        return deepFind(children, pathName, currkey)
      } else {
        if (path === pathName) {
          parentKey && (openKeysStr = parentKey)
          return true
        }
        return false
      }
    })
  }
  deepFind(routeConfig, currPathName)
  return openKeysStr
}

