import React, { useEffect, useState, useMemo } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { homeRoutes, findOpenKeys } from 'router';
import './menu.less'

const genMenus = (menuConfig) => {
  return menuConfig.map(menu => {
    const { name, path, Icon, children, key } = menu
    if (children?.length) {
      return <Menu.SubMenu key={key} {...(Icon && { icon: <Icon />})} title={name}>
          { genMenus(children) }
        </Menu.SubMenu>
    } else {
      return <Menu.Item key={path} {...(Icon && { icon: <Icon />})}>
        <Link to={path}>{ name }</Link>
      </Menu.Item>
    }
  })
}

export const PageMenu = () => {
  const { pathname } = useLocation()
  const currPath = pathname.split('/')[2]
  const selectKeys = Array.of(currPath)
  const defaultOpenKeys = useMemo(() => findOpenKeys(homeRoutes, currPath).split('-'), [currPath])
  const [openKeys, setOpenKeys] = useState([])
  useEffect(() => {
    defaultOpenKeys[0] && setOpenKeys(defaultOpenKeys) // handle default open when home->home/menu1
  }, [defaultOpenKeys])
  const handleOpenChange = openKeys => setOpenKeys(openKeys)
  return (
    <Menu
      mode="inline"
      selectedKeys={selectKeys}
      openKeys={openKeys} // 如设置openKeys，defaultOpenKeys失效; defaultOpenKeys只一次有效
      onOpenChange={handleOpenChange}
      style={{ borderRight: 0 }}
    >
      { genMenus(homeRoutes) }
    </Menu>
  )
}