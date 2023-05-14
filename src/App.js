// import './App.css';
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./routes/AppRoutes";
import {ConfigProvider} from "antd";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  return (
      <ConfigProvider
          theme={{
            token: {
              fontFamily: 'Museo Sans Cyrl, sans-serif',
            },
          }}
      >
        <BrowserRouter>
          <AppRoutes />
            <ToastContainer />
        </BrowserRouter>
      </ConfigProvider>
  );
}

export default App;
