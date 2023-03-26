import { Row, Col } from 'antd/es/grid';
import styled from 'styled-components';

export const PageMenu = styled(Row)`
  padding-bottom: 20px;
  gap: 30px;
  align-items: center;
`;

export const PageMenuColumn = styled(Col)`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: ${props => props.to_right && 'auto' || 'unset'};
`;
