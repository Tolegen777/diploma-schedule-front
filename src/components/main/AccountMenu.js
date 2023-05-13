import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {MessageOutlined, ProfileOutlined} from "@ant-design/icons";
import {resetService} from "../../services/resetService";


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
            {
                type: 'group',
                label: localStorage.getItem('UNIVERSITY_LINK') ?? 'https://schedule-platform.vercel.app/',
                children: [],
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
            resetService()
        }
    };

    return <>
        <HeaderMenu onClick={onClick} mode="horizontal" items={items} />
    </>;
};
