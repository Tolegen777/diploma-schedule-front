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
            // {
            //     label: 'Кабинеты',
            //     key: '3',
            //     icon: <CalendarOutlined />,
            //     link: '/rooms',
            // },
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
            // {
            //     label: 'Университеты',
            //     key: '7',
            //     icon: <SmileOutlined />,
            //     link: '/admins',
            // },
        ],
    },
];
