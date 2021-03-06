import React, { useEffect, useState, useMemo } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { homeRoutes, findOpenKeys } from 'router';
import './menu.less'

const genMenus = (menuConfig) => {
  return menuConfig.filter(({ isMenu }) => (isMenu === undefined || isMenu)).map(menu => {
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
  const [openKeys, setOpenKeys] = useState([])
  useEffect(() => {
    if (currPath && !openKeys.length) {
      const defaultOpenKeys = findOpenKeys(homeRoutes, currPath).split('-')
      setOpenKeys(defaultOpenKeys) // handle default open when home->home/menu1
    }
  }, [openKeys, currPath])
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