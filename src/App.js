// import './App.css';
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./routes/AppRoutes";
import {ConfigProvider} from "antd";
import ScheduleView from "./components/schedule/ScheduleView";
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";

import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Mgo+DSMBaFt/QHRqVVhkVFpHaV1FQmFJfFBmQGlddlRzdEU3HVdTRHRcQl9hTH5ac0RnWntccXU=;Mgo+DSMBPh8sVXJ0S0J+XE9AflRBQmFOYVF2R2BJelR0fV9FYEwgOX1dQl9gSXxRc0VqXH5ac3BWQWE=;ORg4AjUWIQA/Gnt2VVhkQlFacldJXnxLeUx0RWFab1t6cFxMY1xBNQtUQF1hSn5RdEBjUHpfdHdRQmld;MTIwNDk5MEAzMjMwMmUzNDJlMzBYMWdBd1BqV1pnUkh1cXRVWll4VitYRjQ2Vk5OQktieEJPaW9XT1hneDVVPQ==;MTIwNDk5MUAzMjMwMmUzNDJlMzBjb1M4WVI0WjFsNlFMTklqb0tMU01MM2JMcFpHL2NxOFhvM3F0ZkJheXg4PQ==;NRAiBiAaIQQuGjN/V0Z+WE9EaFtKVmBWfFRpR2NbfE51flFPal9RVAciSV9jS31TdEdmWXZbcXBWQ2BcUw==;MTIwNDk5M0AzMjMwMmUzNDJlMzBWZmJiNlJnOGFFbjd6ZG9jcE9SczhIVUgxQmRGaWlDdm9xTFFvRHI5ank4PQ==;MTIwNDk5NEAzMjMwMmUzNDJlMzBDQTBpanZnVDFqUzFWQjlrdXhSdFFuY000SFpFamVoYmN3OUFJQ01DTytZPQ==;Mgo+DSMBMAY9C3t2VVhkQlFacldJXnxLeUx0RWFab1t6cFxMY1xBNQtUQF1hSn5RdEBjUHpfdHdQQGFb;MTIwNDk5NkAzMjMwMmUzNDJlMzBkK1lyaFRkWWpoSlRMbEpYaTBXWUwxSk52QTU4T2QvZlhaa3ZPcGpxV1VvPQ==;MTIwNDk5N0AzMjMwMmUzNDJlMzBrOE5jV3k5WThlNklFVlBXeGhRZTQwdDRDc1JieGMxcFcwelZ6YXdaajNVPQ==;MTIwNDk5OEAzMjMwMmUzNDJlMzBWZmJiNlJnOGFFbjd6ZG9jcE9SczhIVUgxQmRGaWlDdm9xTFFvRHI5ank4PQ==');

function App() {
    console.log('hello')
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
