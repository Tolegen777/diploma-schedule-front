import {Route, Routes} from "react-router-dom";
import {ClientLayout} from "../components/main/ClientLayout";
import {routesList} from "./routesList";

export const AppRoutes = () => {

    const isAuth = true

    if (!isAuth) {
        return (
            <Routes>
                {/*<Route path="/" element={<LoginPage />} />*/}
                {/*<Route path="/login" element={<LoginPage />} />*/}
                <Route path="/" element={<></>} />
                <Route path="/login" element={<></>} />
            </Routes>
        );
    }

    return (
        <ClientLayout>
            <Routes>
                {routesList.map(route => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
        </ClientLayout>
    );
};
