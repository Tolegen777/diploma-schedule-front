import { Col, Layout, Row } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {Colors} from "../../const/const";
import {AccountMenu} from "./AccountMenu";
import {QuestionOutlined} from "@ant-design/icons";
const { Header } = Layout;

const LayoutHeader = styled(Header)`
  .ant-row {
    line-height: 0;
  }
  .logo {
    width: 72px;
    height: auto;
    display: flex;
    align-items: center;
    img {
      width: auto;
      height: auto;
      object-fit: cover;
    }
  }
  .ant-menu-overflow {
    justify-content: flex-end;
    border: none;
    .ant-menu-item {
    }
  }
`;

// Header can change styles only inline
const headerInlineStyles = {
    background: Colors.White,
    height: 'auto',
    padding: '32px 40px',
}

export const AppHeader = () => (
    <LayoutHeader style={headerInlineStyles}>
        <Row>
            <Col className="logo" flex="100px">
                <Link to="/">
                    {/*<img src={logo} alt="logo" />*/}
                    Logogoi
                    <QuestionOutlined />
                </Link>
            </Col>
            <Col flex="auto">
                <AccountMenu />
            </Col>
        </Row>
    </LayoutHeader>
);
