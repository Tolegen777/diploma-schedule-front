import Schedule from "../pages/Schedule";
import Teacher from "../pages/Teacher";
import Room from "../pages/Room";
import Subject from "../pages/Subject";
import University from "../pages/University";
import Group from "../pages/Group";
import EducationalPrograms from "../pages/EducationalPrograms";

export const routesList = [
    {
        path: '/',
        element: <Schedule />,
    },
    {
        path: '/schedule',
        element: <Schedule />,
    },
    {
        path: '/teachers',
        element: <Teacher />,
    },
    {
        path: '/subjects',
        element: <Subject />,
    },
    {
        path: '/groups',
        element: <Group />,
    },
    {
        path: '/educational-programs',
        element: <EducationalPrograms />,
    },
    {
        path: '/universities',
        element: <University />,
    },
    {
        path: '/rooms',
        element: <Room />,
    },


];

export const routesSuperAdminList = [
    {
        path: '/',
        element: <University />,
    },
    {
        path: '/universities',
        element: <University />,
    },
];