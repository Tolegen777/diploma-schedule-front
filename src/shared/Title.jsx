import styled from 'styled-components';


export const Title = styled.title`
  display: inline-block;
  color: ${props => props.color};
  font-size: ${props => props.size};
  white-space: pre-line;
  line-height: 26px;
  font-weight: 600;
  text-align: ${props => props.align ? props.align : 'center'};
`;
