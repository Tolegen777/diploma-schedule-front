import './App.css';
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./routes/AppRoutes";
import {ConfigProvider} from "antd";

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
        </BrowserRouter>
      </ConfigProvider>
  );
}

export default App;
