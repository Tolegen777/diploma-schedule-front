import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {MessageOutlined, ProfileOutlined} from "@ant-design/icons";


const HeaderMenu = styled(Menu)`
  .ant-menu-submenu-title,
  .ant-menu-overflow-item {
    display: flex;
    align-items: center;
  }
  
  .ant-menu-submenu::after,
  .ant-menu-item::after {
    display: none;
  }
`;

const items: MenuProps['items'] = [
    {
        label: 'Уведомления',
        key: 'notifications',
        // icon: <HeaderMenuIcon src={notifications} />,
        icon: <MessageOutlined />,
    },
    {
        label: 'Профиль',
        key: 'profile',
        icon: <ProfileOutlined />,
        children: [
            {
                type: 'group',
                label: 'Меню',
                children: [
                    {
                        label: 'Выход',
                        key: 'logout',
                    },
                ],
            },
        ],
    },
];

export const AccountMenu = () => {

    // const stateContext = useStateContext()
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (event) => {
        if (event.key === 'logout') {
            // Reset user data and auth data after logout
            // stateContext.dispatch({ type: 'SET_AUTH_STATUS', payload: false })
            // tokenService.updateLocalTokenData('', 'access_token')
            // tokenService.updateLocalTokenData('', 'refresh_token')
            navigate('/');
        }
    };

    return <HeaderMenu onClick={onClick} mode="horizontal" items={items} />;
};
