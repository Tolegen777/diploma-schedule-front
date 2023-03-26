import { Radio } from 'antd';
import styled from 'styled-components';
import {Colors} from "../const/const";

export const CustomRadio = styled(Radio)`
  .ant-radio-checked .ant-radio-inner {
    border: 2px solid ${Colors.Blue};
    background-color: unset;
  }
  .ant-radio-inner {
    &::after {
      background-color: ${Colors.Blue};
    }
  }
`;

