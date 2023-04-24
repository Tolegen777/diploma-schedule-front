import { Layout } from 'antd';
import styled from 'styled-components';
import {Colors} from "../const/const";


export const PublicLayout = styled(Layout)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${Colors.White};
  flex-direction: unset;
`;
