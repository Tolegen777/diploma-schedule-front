import { Tabs } from 'antd';
import styled from 'styled-components';

export const TabsWrapper = styled(Tabs)`
  //color: #61dafb;
  margin-top: 15px;

  .ant-tabs-nav .ant-tabs-nav-more {
    display: none;
  }

  :where(.css-dev-only-do-not-override-1syfplo).ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #fff;
    text-shadow: 0 0 0.25px currentcolor;
    //background: #61dafb;
  }

  :where(.css-dev-only-do-not-override-1syfplo).ant-tabs-card.ant-tabs-top >.ant-tabs-nav .ant-tabs-tab-active, :where(.css-dev-only-do-not-override-1syfplo).ant-tabs-card.ant-tabs-top >div>.ant-tabs-nav .ant-tabs-tab-active {
    border-bottom-color: #ffffff;
    background: #61dafb;
  }
  
`;
