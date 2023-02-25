import Schedule from "../components/schedule/Schedule";

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
        element: <>teachers</>,
    },
    {
        path: '/rooms',
        element: <>rooms</>,
    },
    {
        path: '/subjects',
        element: <>subjects</>,
    },

];