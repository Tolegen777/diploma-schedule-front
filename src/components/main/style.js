import { Layout } from 'antd';
import styled from 'styled-components';
import {Colors} from "../../const/const";
import { Menu } from 'antd';

const { Content } = Layout;

export const ContentLayout = styled(Content)`
  padding: 32px;
  background-color: ${Colors.LightGray};
  border-top-left-radius: 25px;
`;

const { ItemGroup, Item } = Menu;

export const SiderBase = styled.div`
  width: ${props => (props.collapsed ? '125px' : '270px')};
  padding: 16px 0;
  border: none;
  transition: .5s;
`;

export const SiderMenu = styled(Menu)`
  display: flex;
  flex-direction: column;
  gap: 0;
  border-inline-end: none;
  
  &:where(.ant-menu-light).ant-menu-root.ant-menu-vertical {
    border-inline-end: none;
  }
`;

export const MenuItemGroup = styled(ItemGroup)`
  .ant-menu-item-group-title {
    font-size: 12px;
    text-align: ${props => props.collapsed === 'hide' ? 'center' : 'left'};
    font-weight: 600;
    color: ${props => props.current_active_category === 'active' ? Colors.Black : Colors.Grey30};
    opacity: ${props => props.current_active_category === 'active' ? 1 : 0.5};
    text-transform: uppercase;
  }

  .ant-menu-item-group-list {
    text-align: center;
    padding: 0 20px !important;

    .ant-menu-item {
      min-width: 40px;
      line-height: 0;
      padding: 8px 0;
      margin: 0 auto 15px;
      display: flex;
      align-items: flex-start;

      :last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const MenuItem = styled(Item)``;

export const BodyContainer = styled(Layout)`
  display: flex;
  flex-direction: unset;
  border-top-left-radius: 25px;
  background-color: ${Colors.White};
`;

export const AsideContainer = styled(Layout)`
  width: ${props => (props.collapsed === 'hide' ? '125px' : '270px')};
  flex: 0;
  height: calc(100vh - 100px);
  background: ${Colors.White};
`;
