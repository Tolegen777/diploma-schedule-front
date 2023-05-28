import React from 'react';
import {ScheduleOutlined, SmileOutlined, CalendarOutlined, BookOutlined} from "@ant-design/icons";

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
                icon: <SmileOutlined />,
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
                icon: <BookOutlined />,
                link: '/groups',
            },
            {
                label: 'Образовательные программы',
                key: '6',
                icon: <BookOutlined />,
                link: '/educational-programs',
            },
            {
                label: 'Кабинеты',
                key: '7',
                icon: <BookOutlined />,
                link: '/rooms',
            },
        ],
    },
];

export const initialSuperAdminMenuItems = [
    {
        key: 'superadmin',
        label: 'Управление',
        children: [
            {
                label: 'Университеты',
                key: '1',
                icon: <SmileOutlined />,
                link: '/universities',
            },
        ],
    },
];