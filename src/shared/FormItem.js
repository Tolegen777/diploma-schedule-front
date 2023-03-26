import { Form } from 'antd';
import styled from 'styled-components';
import {Colors} from "../const/const";

export const FormItem = styled(Form.Item)`
  margin: 0;
  position: relative;
  .ant-form-item-row {
    .ant-form-item-label {
      position: ${ props => props.label_align === 'top' ? 'absolute' : 'unset' };
      top: -10px;
      left: 10px;
      z-index: 10;
      font-weight: 400;
      background: ${ props => props.label_align === 'top' ? Colors.White : 'none' };
      border-radius: ${ props => props.label_align === 'top' ? '5px' : 'none' };
      height: auto;
      padding-left: ${ props => props.label_align === 'top'  ? '5px' : '0' };
      label {
        height: auto;
      }
    }
  }
  
  .ant-form-item-row {
    display: flex;
    align-items: center;
    flex-direction: unset;
    .ant-col {
      width: max-content;
      padding-bottom: 0 !important;
    }
  }
`;

FormItem.defaultProps = {
    label_align: 'top'
}
