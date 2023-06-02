import {Button, Col, Layout, Row} from 'antd';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Colors} from "../../const/const";
import {AccountMenu} from "./AccountMenu";
import {ScheduleOutlined, UserOutlined} from "@ant-design/icons";
import ScheduleLogo from "../../shared/ScheduleLogo/ScheduleLogo";
import {useRef, useState} from "react";
import {useOnClickOutside} from "../../hooks/useOnScrollEnd";
import {userService} from "../../services/userService";

const {Header} = Layout;

const LayoutHeader = styled(Header)`
  //position: fixed;
  //top: 0;
  //left: 0;
  width: 100vw;

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

export const HeaderWrapper = styled.div`
  position: relative;
  padding: 18px 21px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  width: 100vw;

  .settings {
    position: absolute;
    top: 100%;
    right: 0;
    padding: 0.5rem 2rem;
    background: #fff;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    z-index: 2;
  }

  .logo,
  .user-info {
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }

  .user {
    font-size: 1.2rem;
    cursor: pointer;
    margin-right: 1rem;
  }

  .user:hover {
    color: #1cb5e0;
    transition: 0.5s;
  }

  .clicked {
    font-size: 1.2rem;
    color: #b65ba3;
  }

  .item {
    border-bottom: 1px solid #dcdcdc;
    padding: 5px 0;
    width: 100%;
  }

  .username {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
  }

  .username span {
    margin-right: 1rem;
  }

  img {
    height: 30px;
  }

  .logo__line {
    margin: 0 10px;
    color: #fdbb2d;
  }

  .logo__text {
    font-size: 16px;
    font-weight: 600;
  }

  .wrapper-lang {
    width: 150px;
  }
`;

export const AppHeader = () => {

    const user = userService.getUser()

    const ref = useRef(null);

    const [isComponentVisible, setIsComponentVisible] = useState(false);

    useOnClickOutside(ref, () => setIsComponentVisible(false));

    const handleClickOpenDropdown = () => setIsComponentVisible(!isComponentVisible);

    return (
        <header>
            <HeaderWrapper>
                <div className={"logo"}>
                    <Link to="/">
                        <ScheduleLogo/>
                    </Link>
                </div>
                <span
                    className={`${isComponentVisible ? "clicked " : ''}user`}
                    onClick={handleClickOpenDropdown}
                    style={{position: "fixed", top: "10px", right: "10px"}}
                >
                     <UserOutlined/>
                </span>
                {isComponentVisible && (
                    <div ref={ref} className="settings" style={{position: "fixed", top: "40px", right: "10px"}}>
            <span className="username item" style={{textTransform: "uppercase"}}>
              {user?.email ?? ''}
            </span>

                        <span className="item">

            </span>
                    </div>
                )}
            </HeaderWrapper>
        </header>
    );
}


// <div style={{
//     width: "100vw",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "10px 40px"
// }}>
//
//     <div><Link to="/">
//
//         <ScheduleLogo/>
//
//     </Link></div>
//
//     <div style={{position: "fixed", top: "10px", right: "10px"}}>
//         sdcsdc
//         <AccountMenu/>
//     </div>
//
// </div>