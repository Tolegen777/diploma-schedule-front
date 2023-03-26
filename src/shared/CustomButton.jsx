import { Button } from 'antd';
import styled from 'styled-components';
import {ButtonSizes, Colors} from "../const/const";



export const CustomButton = styled(Button)`
  height: auto;
  border-radius: 16px;
  box-sizing: border-box;
  border: none;
  width: max-content;
  font-weight: 600;
  color: ${props => props.text_color ? props.text_color : Colors.White};
  ${props =>
    props.position_from === 'right' && 'margin-left: auto' ||
    props.position_from === 'left' && 'margin-right: auto' ||
    props.position_from === 'unset' && 'margin: unset' || 'margin: 0 auto'};
  
  padding: 10px;
  padding-left: ${props => props.button_size === ButtonSizes.Large ? '64px' : '16px'};
  padding-right: ${props => props.button_size === ButtonSizes.Large ? '64px' : '16px'};
  
  // Button color properties
    background-color: ${props => props.color ?? Colors.Blue};
  
  // Button disable color properties
  &:disabled {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;


