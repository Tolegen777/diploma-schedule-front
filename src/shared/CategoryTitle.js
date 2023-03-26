import styled from 'styled-components';
import {Colors, TitleSize} from "../const/const";

export const CategoryTitle = styled.title `
  display: inline-block;
  color: ${props => props.color ?? Colors.Grey90};
  font-size: ${props => props.size ?? TitleSize.h2};
  line-height: 1;
  font-weight: 600;
`;
