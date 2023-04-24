import Schedule from "../pages/Schedule";
import Teacher from "../pages/Teacher";
import Room from "../pages/Room";
import Subject from "../pages/Subject";
import Admin from "../pages/Admin";
import {groupApi} from "../api/groupApi";
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
    // {
    //     path: '/rooms',
    //     element: <Room />,
    // },
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
        path: '/admins',
        element: <Admin />,
    },


];