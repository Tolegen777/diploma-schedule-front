import { Drawer } from 'antd';
import styled from 'styled-components';

import closeButtonIcon from './../assets/icons/closeIcon.svg';
import {Colors} from "../const/const";




export const DrawerContainer = styled(Drawer)`
  .ant-drawer-header {
    color: ${Colors.Black};
    padding-top: 32px;
    padding-bottom: 0;
    border-bottom: 0;
    .ant-drawer-title {
      font-size: 20px;
    }
    .ant-drawer-close {
      order: 2;
      margin-inline-end: 0;
      padding-right: 0;
    }
  }
`;


DrawerContainer.defaultProps = {
    width: '420px',
    closeIcon: <img src={closeButtonIcon} alt='close'/>,
    destroyOnClose: true
};
