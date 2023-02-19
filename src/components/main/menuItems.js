import React from 'react';
import {QuestionOutlined} from "@ant-design/icons";

export const initialMenuItems = [
    {
        key: 'campaign',
        label: 'Управление',
        children: [
            {
                label: 'Расписание',
                key: '1',
                icon: <QuestionOutlined />,
                link: '/schedule',
            },
            {
                label: '/Преподаватель',
                key: '2',
                icon: <QuestionOutlined />,
                link: '/teachers',
            },
            {
                label: '/Кабинеты',
                key: '3',
                icon: <QuestionOutlined />,
                link: '/rooms',
            },
            {
                label: 'Предметы',
                key: '4',
                icon: <QuestionOutlined />,
                link: '/subjects',
            },
        ],
    },
];
