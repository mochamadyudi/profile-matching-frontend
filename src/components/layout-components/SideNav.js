import React from "react";
import {Avatar, Layout, List, Skeleton} from 'antd';
import {connect} from 'react-redux';
import {SIDE_NAV_WIDTH, SIDE_NAV_DARK, NAV_TYPE_SIDE} from 'constants/ThemeConstant';
import {Scrollbars} from 'react-custom-scrollbars';
import MenuContent from './MenuContent'
import SkeletonList from "../shared-components/Skeleton/skeleton-list";
// import SkeletonList from 'components/shared-components/fe'

const {Sider} = Layout;

export const SideNav = ({
                            navCollapsed,
                            sideNavTheme,
                            routeInfo,
                            hideGroupTitle,
                            localization = true,
                            loading,
                            isNew
                        }) => {
    const props = {sideNavTheme, routeInfo, hideGroupTitle, localization}
    return (
        <Sider
            className={`side-nav !mk-overflow-x-hidden`}
            width={400}
            collapsed={navCollapsed}
        >

            {
                loading?.screen?.primary ? (
                    <div className={'px-4'}>
                        <Skeleton active className={'emk-skeleton'}/>
                        <Skeleton active className={'emk-skeleton'}/>
                        <Skeleton active className={'emk-skeleton'}/>
                        <Skeleton active className={'emk-skeleton'}/>
                        <Skeleton active className={'emk-skeleton'}/>
                        <Skeleton active className={'emk-skeleton'}/>
                    </div>
                ) : (
                    <Scrollbars autoHide>
                        <MenuContent
                            type={NAV_TYPE_SIDE}
                            {...props}
                        />
                    </Scrollbars>
                )
            }
        </Sider>
    )
}

const mapStateToProps = ({theme, LE, Settings}) => {
    const {navCollapsed, sideNavTheme} = theme;
    let {loading, isNew} = Settings
    return {navCollapsed, sideNavTheme, loading, isNew}
};

export default connect(mapStateToProps)(SideNav);
