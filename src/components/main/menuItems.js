import React from 'react';
import {
    AccountBookOutlined,
    BookOutlined, DownSquareOutlined,
    GroupOutlined,
    ScheduleOutlined,
    SmileOutlined,
    UserOutlined
} from "@ant-design/icons";

export const initialMenuItems = [
    {
        key: 'campaign',
        label: 'Управление',
        children: [
            {
                label: 'Расписание',
                key: '1',
                icon: <ScheduleOutlined />,
                link: '/schedule',
            },
            {
                label: 'Преподаватель',
                key: '2',
                icon: <UserOutlined />,
                link: '/teachers',
            },
            {
                label: 'Предметы',
                key: '4',
                icon: <BookOutlined />,
                link: '/subjects',
            },
            {
                label: 'Группы',
                key: '5',
                icon: <GroupOutlined />,
                link: '/groups',
            },
            {
                label: 'Образовательные программы',
                key: '6',
                icon: <AccountBookOutlined />,
                link: '/educational-programs',
            },
            {
                label: 'Кабинеты',
                key: '7',
                icon: <DownSquareOutlined />,
                link: '/rooms',
            },
        ],
    },
];