import { Button } from 'antd';
import styled from 'styled-components';
import {ButtonSizes, Colors} from "../const/const";

const ButtonWithIcon = styled(Button)`
  display: flex;
  align-items: center;
  gap: 5px;
  height: auto;
  border-radius: 16px;
  border-color: #F3F3F3;
  box-sizing: border-box;
  color: ${Colors.Grey90};
  line-height: 1;
  width: max-content;
  font-weight: 600;
 
  ${props =>
    (props.position_from === 'right' && 'margin-left: auto') ||
    (props.position_from === 'left' && 'margin-right: auto') ||
    'margin: 0 auto'};

  padding: 13px 16px;

  // Button color properties
    background-color: ${props => props.color ?? Colors.White};
    img {
      display: inline-block;
      width: 16px;
      height: 16px;
      object-fit: cover;
    }
`;

export const CustomButtonWithIcon = ({ children, button_size, position_from, icon, callBack }) => (
    <ButtonWithIcon button_size={button_size ?? ButtonSizes.Medium} position_from={position_from} onClick={callBack}>
        <img src={icon} alt='filter_icon' /> {children}
    </ButtonWithIcon>
)
