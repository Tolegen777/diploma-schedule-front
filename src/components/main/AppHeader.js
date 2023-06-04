import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {UserOutlined} from "@ant-design/icons";
import ScheduleLogo from "../../shared/ScheduleLogo/ScheduleLogo";
import {useRef, useState} from "react";
import {useOnClickOutside} from "../../hooks/useOnScrollEnd";
import {userService} from "../../services/userService";
import Copy from "../../shared/Copy/Copy";


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
                <div className={"logo"} style={{marginLeft: "20px"}}>
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
               <Copy />
            </span>
                    </div>
                )}
            </HeaderWrapper>
        </header>
    );
}