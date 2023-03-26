import styled from 'styled-components';
import {Colors} from "../../const/const";

export const TablePaginationRowCountWrapper = styled.div`
  z-index: 1;
  position: absolute;
  display: flex;
  align-items: center;
  gap: 5px;
  bottom: 16px;
  left: 24px;
  color: ${Colors.Grey65};
`;

export const TablePaginationRowItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: unset;
  color: ${Colors.Grey65};
  min-width: 32px;
  height: 32px;
  border: 1px solid ${Colors.Grey15};
  margin-inline-end: 8px;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: #8f92a1;
  &.active_row_counter {
    background-color: ${Colors.Grey15};
    color: ${Colors.Grey90};
  }
`;
