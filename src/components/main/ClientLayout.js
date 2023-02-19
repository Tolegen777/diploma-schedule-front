import React, { useState } from 'react';
import Layout from 'antd/es/layout/layout';
import styled from 'styled-components';
import {BodyContainer, AsideContainer, ContentLayout} from './style';
import { SideBar } from './SideBar';
import {Colors} from "../../const/const";
import {initialMenuItems} from "./menuItems";
import {AppHeader} from "./AppHeader";

const ClientLayoutWrapper = styled(Layout)`
  background-color: ${Colors.White};
`;

export const ClientLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(true);

    const onToggleCollapsed = (toggle) => {
        setCollapsed(toggle);
    };

    return (
        <ClientLayoutWrapper>
            <AppHeader />

            <BodyContainer>
                {/* collapsed can't be boolean for styled components css props */}
                <AsideContainer collapsed={collapsed ? 'hide' : 'show'}>
                    <SideBar
                        items={initialMenuItems}
                        collapsed={collapsed}
                        onToggleCollapsed={onToggleCollapsed}
                    />
                </AsideContainer>

                <ContentLayout>
                    { children }
                </ContentLayout>
            </BodyContainer>
        </ClientLayoutWrapper>
    );
};
