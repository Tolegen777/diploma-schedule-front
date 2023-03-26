import { Descriptions } from 'antd';
import styled from 'styled-components';
import {Colors} from "../const/const";

export const FormInfoDescription = styled(Descriptions)`
 .ant-descriptions-row {
   display: flex;
   flex-direction: column;
   // description item values
   .ant-descriptions-item-container .ant-descriptions-item-content {
     text-align: right;
     display: block;
     color: ${Colors.Grey55};
     a {
       text-decoration: underline;
       color: #2196F3;
     }
   }
  }
  // block main title  
  .ant-descriptions-title {
    font-size: 14px;
  }
  // description item label
  .ant-descriptions-item-label {
    color: ${Colors.Grey55};
  }
`;

export const FormInfoDescriptionItem = styled(Descriptions.Item)``

FormInfoDescription.defaultProps = {
    layout: 'horizontal',
};
