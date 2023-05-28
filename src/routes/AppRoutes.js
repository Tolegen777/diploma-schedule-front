import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useStateContext } from '../contexts';
import { LoginPage } from '../pages/LoginPage';
import { tokenService } from '../services/tokenService';
import {routesList, routesSuperAdminList} from './routesList';
import {ClientLayout} from "../components/main/ClientLayout";

export const AppRoutes = () => {
    const { dispatch, state } = useStateContext();

    const accessToken = tokenService.getLocalAccessToken();

    useEffect(() => {
        if (!accessToken) {
            dispatch({ type: 'SET_AUTH_STATUS', payload: false });
        }

    }, [accessToken]);

    if (!state.authUser) {
        return (
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        );
    }

    return (
        <ClientLayout>
            <Routes>
                {state?.user?.email !== 'superadmin@gmail.com' && routesList.map(route => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}

                {state?.user?.email === 'superadmin@gmail.com' && routesSuperAdminList.map(route => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
        </ClientLayout>
    );
};
