import {memo, useState} from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, SiderBase, SiderMenu, MenuItemGroup } from './style';


export const SideBar = memo(({ items, collapsed, onToggleCollapsed }) => {
    const [currentCategory, setCurrentCategory] = useState('campaign')


    return  (
        <SiderBase
            collapsed={collapsed}
            onMouseEnter={() => onToggleCollapsed(false)}
            onMouseLeave={() => onToggleCollapsed(true)}
        >
            <SiderMenu>
                {items.map(item => (
                    <MenuItemGroup
                        current_active_category={ currentCategory === item.key ? 'active' : 'not_active' }
                        title={item.label}
                        key={item.key}
                        collapsed={collapsed ? 'hide' : 'show'}
                    >
                        {item.children.map(menuItem => (
                            <MenuItem key={menuItem.key}>
                                <Link onClick={() => setCurrentCategory(item.key)} to={menuItem.link}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                                        {menuItem.icon}
                                        {!collapsed && <>{menuItem.label}</>}
                                    </div>
                                </Link>
                            </MenuItem>
                        ))}
                    </MenuItemGroup>
                ))}
            </SiderMenu>
        </SiderBase>
    )
})

