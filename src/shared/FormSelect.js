import { Dropdown, Select } from 'antd';
import styled from 'styled-components';
import {Colors} from "../const/const";

export const FormSelect = styled(Select)`
  .ant-select-selector {
    height: 64px !important;
    min-width: 122px;
    border-radius: 16px !important;
    display: flex;
    align-items: center;
    font-size: 14px;
    background-color: ${props => props.background || 'unset'};
    .ant-select-selection-item-content {
      color: ${Colors.White};
    }
    
   .ant-select-selection-placeholder {
      font-size: 14px;
   }
  }
  
  .ant-select-selection-overflow-item .ant-select-selection-item {
    border-radius: 16px;
    color: ${Colors.White};
    background-color: ${Colors.Blue};
  }
  
  .ant-select-arrow {
    display: ${props => props.arrow_none === 'active' ? 'block' : 'none'};
    color: ${props => props.selector_color ? props.selector_color : 'rgba(0, 0, 0, 0.25)'};
  }
  
  &.ant-select-lg .ant-select-selector .ant-select-selection-search-input {
    height: 100% !important;
  }
  
`;

FormSelect.defaultProps = {
    size: 'large'
}

// Campaign create / update selectors

export const FormCampaignToggleSelectWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const FormCampaignSelectTypeDropdown = styled(Dropdown)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 40px;
  border-radius: 0 16px 16px 0;
  border: 1px solid #d9d9d9;
  border-left: none;
  box-sizing: border-box;
`

export const FormToggleCampaignSelect = styled(Select)`
  .ant-select-selector {
    height: 64px !important;
    min-width: 122px;
    border-radius: 16px 0 0 16px;
    display: flex;
    align-items: center;
    font-size: 14px;
    background-color: ${props => props.background || 'unset'};
  }
  
  .ant-select-arrow {
    display: ${props => props.arrow_none === 'active' ? 'block' : 'none'};
    color: ${props => props.selector_color ? props.selector_color : 'rgba(0, 0, 0, 0.25)'};
  }
  
`


FormToggleCampaignSelect.defaultProps = {
    placeholder: 'Выберите значение',
    background: Colors.GreyLight,
    selector_color: Colors.Blue,
}
