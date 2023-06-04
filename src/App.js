// import './App.css';
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./routes/AppRoutes";
import {ConfigProvider} from "antd";
import "react-toastify/dist/ReactToastify.css";
import {useEffect} from "react";
import {userService} from "./services/userService";
import {useStateContext} from "./contexts";
import {ToastContainer} from "react-toastify";


function App() {

    const data = userService.getUser()

    const {dispatch} = useStateContext();

    useEffect(() => {
        if (data?.email) {
            dispatch({type: 'SET_USER_DATA', payload: data})
        }
    }, [data?.email])

    // useEffect(() => {
    //     // Get the URL from window.location.href
    //     const url = window.location.href;
    //
    //     // Extract the parameter value from the URL
    //     const parameter = url.substring(url.lastIndexOf(':') + 1);
    //
    //     userService.updateLocal(parameter)
    // }, []);

    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: 'Museo Sans Cyrl, sans-serif',
                },
            }}
        >
            <BrowserRouter>
                <AppRoutes/>
                <ToastContainer />
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
