import { Input, InputNumber } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import styled from 'styled-components';
import {Colors} from "../const/const";



export const FormInput = styled(Input)`
  height: 64px;
  color: ${props => props.color};
  border-color: #d8dbe3;
  border-radius: 16px;
  font-size: 14px;
`;

export const FormInputNumber = styled(InputNumber)`
  display: flex;
  align-items: center;
  height: 64px;
  width: 100%;
  color: ${props => props.color};
  border-color: #d8dbe3;
  border-radius: 16px;
  font-size: 14px;
`;

export const FormInputPassword = styled(Input.Password)`
  height: 64px;
  color: ${props => props.color || Colors.Grey90};
  border-color: #d8dbe3;
  border-radius: 16px;
  font-size: 14px;
  svg {
    font-size: 20px;
  }
`;


FormInput.defaultProps = {
    color: Colors.Grey90,
    type: 'text',
}
