import { Table } from 'antd';
import styled from 'styled-components';

import { TablePaginationRowCountWrapper, TablePaginationRowItem } from './styles';
import {Colors, TextSize} from "../../const/const";

const TableWrapper = styled.div`
    position: relative;
`


const AntdCustomTable = styled(Table)`
  transition: 5s;

  // Lines of table
  .ant-table-cell {
    color: ${Colors.Grey65};
  }
  // Main table wrapper
  &:where(.ant-table-wrapper) {
    padding: 16px 16px 0 16px;
    border-radius: 16px;
    background-color: ${Colors.White};
  }
  
  &:where(.ant-table-wrapper) .ant-spin-nested-loading .ant-spin-container .ant-table .ant-table-thead > tr > th {
    font-size: ${TextSize.p12};
    background-color: ${Colors.LightGray};
    color: ${Colors.Grey55};
    text-transform: uppercase;
    &:nth-child(2) {
      border-radius: 0;
      border-top-left-radius: 16px !important;
      border-bottom-left-radius: 16px;
    }
  }

  // Last child in table header
  &:where(.ant-table-wrapper) .ant-table-container table > thead > tr:first-child th:last-child {
    border-bottom-right-radius: 16px;
    border-start-end-radius: 16px;
  }
  
  .ant-spin-container .ant-table-content .ant-table-row {
    .ant-table-row-selected {
      background-color: red;
    }
  }

  // Pagination styles
  .ant-spin-container {
    .ant-pagination {
      .ant-pagination-item {
        background: unset;
        a {
          color: ${Colors.Grey90};
        }
      }
      .ant-pagination-item-active {
        background-color: ${Colors.Grey15};
        border: none;
      }
    }
  }

  // Hide checkbox in table header
  .ant-table-content {
    .ant-table-row {
      cursor: pointer;
      }
    .ant-table-selection-column {
      padding: 0;
      width: 0;
      .ant-checkbox-inner {
        display: none;
      }
    }
  }

`;


export const CustomTable = ({
                                isLoading,
                                columns,
                                dataSource,
                                selectedRow,
                                onSelectRow,
                                selectedRowCount,
                                onSelectRowCount,
                                onSelectCurrentPage
                            }) => {
    console.log(dataSource.content, 'DATAS')

    return (
        <TableWrapper>
            <TablePaginationRowCountWrapper>
                Показать по: {[20, 50, 100].map(rowCount =>
                <TablePaginationRowItem
                    className={rowCount === selectedRowCount ? 'active_row_counter' : ''}
                    onClick={() => onSelectRowCount(rowCount)} key={rowCount}
                >
                    {rowCount}
                </TablePaginationRowItem>,
            )}
            </TablePaginationRowCountWrapper>
            <AntdCustomTable
                loading={isLoading}
                columns={columns}
                dataSource={dataSource.content}
                pagination={{
                    pageSize: selectedRowCount,
                    defaultCurrent: 1,
                    total: dataSource.total_elements,
                    current: dataSource.number,
                    pageSizeOptions: [],
                    showSizeChanger: false,
                    onChange: onSelectCurrentPage
                }}
                rowSelection={{
                    selectedRowKeys: selectedRow,
                    columnWidth: 0,
                }}
                rowKey='id'
                onRow={(record) => ({
                    onClick: () => record.id && typeof record.id === 'number' && onSelectRow(record.id), // click row
                })}
            />
        </TableWrapper>
    )
}
