import { Switch } from 'antd';
import styled from 'styled-components';
import {Colors} from "../const/const";

export const SwitchButton = styled(Switch)`
  min-width: 40px;
  width: max-content;
  background: ${Colors.Grey15};
  :where(.ant-switch-checked) {
    background: ${Colors.Grey15} !important;
    .ant-switch-handle {
      &:before {
        background-color: ${Colors.Blue};
      }
    }
  }
`;
