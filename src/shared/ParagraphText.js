import styled from 'styled-components';
import {TextSize, TextWeightType} from "../const/const";

export const ParagraphText = styled.p`
  display: inline-block;
  color: ${props => props.color};
  font-size: ${props => props.size ?? TextSize.p12};
  font-family: 'Museo Sans Cyrl', sans-serif;
  white-space: pre-line;
  line-height: ${props => (props.size === TextSize.p14 ? TextSize.p14 : TextSize.p12)};
  font-weight: ${({ weight }) => weight || TextWeightType.normal};
  text-align: ${props => (props.align === 'center' && 'center') || (props.align === 'right' && 'right') || 'left'
};
  text-transform: ${props => (props.textTransform ? props.textTransform : 'none')};
`;

