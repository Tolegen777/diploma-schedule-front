import styled from 'styled-components';
import {Colors} from "../const/const";

const CustomActionButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  background: unset;
  border: none;
  color: ${props => props.color ?? Colors.Grey30};
  cursor: pointer;
  transition: 0.2s;
  img {
    display: block;
    height: ${props => (props.size === 'small' ? '24px'
    : props.size === 'middle' ? '30px'
        : '36px')};
    width: auto;
  }
  &:hover {
    img {
      color: ${Colors.Blue};
      filter: invert(21%) sepia(92%) saturate(2125%) hue-rotate(206deg) brightness(97%) contrast(108%);
    }
  }
`;

export const ActionButton = ({
                                                        image,
                                                        callBack,
                                                        size = 'small',
                                                        color,
                                                    }) => (
    <CustomActionButton onClick={callBack} size={size} color={color}>
        <img src={image} alt="icon" />
    </CustomActionButton>
);
