import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import SideNav from 'components/layout-components/SideNav';
import TopNav from 'components/layout-components/TopNav';
import Loading from 'components/shared-components/Loading';
import MobileNav from 'components/layout-components/MobileNav'
import HeaderNav from 'components/layout-components/HeaderNav';
import PageHeader from 'components/layout-components/PageHeader';
import Footer from 'components/layout-components/Footer';
import AppViews from 'views/app-views';
import {
    Layout,
    Grid,
} from "antd";

import navigationConfig from "configs/NavigationConfig";
import {
    SIDE_NAV_WIDTH,
    SIDE_NAV_COLLAPSED_WIDTH,
    NAV_TYPE_SIDE,
    NAV_TYPE_TOP,
    DIR_RTL,
    DIR_LTR
} from 'constants/ThemeConstant';
import utils from 'utils';
import {useThemeSwitcher} from "react-css-theme-switcher";
import {first} from "lodash";
import {DescribeGlobalScreen, EmitCurrentInvitation, GetInvitationsInSettings} from "../../redux/actions/Settings";
import ContainerTailwind from "../../components/layout-components/ContainerTailwind";

const {Content} = Layout;
const {useBreakpoint} = Grid;

export const AppLayout = (props) => {
    let {
        navCollapsed,
        navType,
        location,
        direction,
    } = props


    let {
        isNew,
        current,
        loading,
        invitations,
        EmitCurrentInvitation,
        GetInvitationsInSettings,
        DescribeGlobalScreen
    } = props


    const currentRouteInfo = utils.getRouteInfo(navigationConfig, location.pathname)
    const screens = utils.getBreakPoint(useBreakpoint());
    const isMobile = !screens.includes('lg')
    const isNavSide = navType === NAV_TYPE_SIDE
    const isNavTop = navType === NAV_TYPE_TOP


    useEffect(() => {
        GetInvitationsInSettings({})
    }, [GetInvitationsInSettings])

    useEffect(() => {
        if (Array.isArray(current?.invitations) && current?.invitations.length === 0) {
            if (Array.isArray(invitations.data) && invitations.data.length > 0) {
                EmitCurrentInvitation(first(invitations.data))
            }
        }
    }, [current?.invitations, invitations.data])


    useEffect(() => {
        if (Array.isArray(invitations.data) && invitations.data.length > 0) {
            let timeout = setTimeout(() => {
                DescribeGlobalScreen()
            }, 1000)

            return () => clearTimeout(timeout)
        }
    }, [current?.invitations])

    const getLayoutGutter = () => {
        if (isNavTop || isMobile) {
            return 0
        }
        return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH
    }

    const {status} = useThemeSwitcher();

    if (status === 'loading') {
        return <div className={'emk-loading'}>

            <p>loading...</p>
        </div>;
    }


    const getLayoutDirectionGutter = () => {
        if (direction === DIR_LTR) {
            return {paddingLeft: getLayoutGutter()}
        }
        if (direction === DIR_RTL) {
            return {paddingRight: getLayoutGutter()}
        }
        return {paddingLeft: getLayoutGutter()}
    }

    return (
        <Layout>
            <HeaderNav isMobile={isMobile}/>
            <Layout className="app-container">
                {(isNavSide && !isMobile) ? <SideNav routeInfo={currentRouteInfo}/> : null}
                <Layout className="app-layout" style={getLayoutDirectionGutter()}>
                    <div className={`app-content`}>
                        <ContainerTailwind>
                            <PageHeader display={currentRouteInfo?.breadcrumb} title={currentRouteInfo?.title}/>
                        </ContainerTailwind>
                        <AppViews/>
                    </div>
                </Layout>
            </Layout>
            {isMobile && <MobileNav/>}
        </Layout>
    )
}

const mapStateToProps = ({theme, Settings}) => {
    const {navCollapsed, navType, locale} = theme;
    let {list, current, loading, isNew} = Settings
    let {invitations} = list
    return {invitations, isNew, current, navCollapsed, navType, locale, loading}
};

export default connect(mapStateToProps, {
    EmitCurrentInvitation,
    GetInvitationsInSettings,
    DescribeGlobalScreen
})(React.memo(AppLayout));