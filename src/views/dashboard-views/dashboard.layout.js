import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NavbarDashboard from "./components/navbar/navbar.dashboard";
import SidebarDashboard from "./components/sidebar.dashboard";
import DashboardContent from "./dashboard.content";
import {Grid, Layout} from "antd";
import {useThemeSwitcher} from "react-css-theme-switcher";
import utils from "../../utils";
import {
    DIR_LTR, DIR_RTL,
    NAV_TYPE_SIDE,
    NAV_TYPE_TOP,
    SIDE_NAV_COLLAPSED_WIDTH,
    SIDE_NAV_WIDTH
} from "../../constants/ThemeConstant";
import Loading from "../../components/shared-components/Loading";
import Footer from "../../components/layout-components/Footer";
import MusicPlayer from "../../components/shared-components/music-player";
import UseAuthComponent from "../../components/permission-components/use-auth.component";
import PreloaderText from "../../components/animated-components/preloader-text";
import {SocketConnect, SocketDisconnect} from "../../redux/actions/websocket.action";
import {DashboardRoutes} from "../../configs/dashboard.routes";
import MobileNav from "../../components/layout-components/MobileNav";
const { useBreakpoint } = Grid;

const { Content } = Layout;
function DashboardLayout(props){
    let { navCollapsed, navType, location, direction,SocketConnect,SocketDisconnect } = props
    const currentRouteInfo = utils.getRouteInfo(DashboardRoutes, location.pathname)
    const screens = utils.getBreakPoint(useBreakpoint());
    const isMobile = screens.length === 0 ? false : !screens.includes('lg')
    const isNavSide = navType === NAV_TYPE_SIDE
    const isNavTop = navType === NAV_TYPE_TOP


    const getLayoutGutter = () => {
        if(isMobile) {
            return 0
        }
        return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH
    }

    const { status } = useThemeSwitcher();

    if (status === 'loading') {
        return <Loading cover="page" />;
    }

    const getLayoutDirectionGutter = () => {
        if(direction === DIR_LTR) {
            return {paddingLeft: getLayoutGutter()}
        }
        if(direction === DIR_RTL) {
            return {paddingRight: getLayoutGutter()}
        }
        return {paddingLeft: getLayoutGutter()}
    }



    return (
        <UseAuthComponent
            loading={{
                cover:'page',
                title:<PreloaderText
                    text={'Dashboard'}
                    dots={3}
                    speed={600}
                />,
                message:"Harap tunggu! sedang melakukang pengecekan"
            }}
        >
            <Layout>
                <NavbarDashboard isMobile={isMobile}/>

                <Layout className="app-container">
                    {!isMobile ? <SidebarDashboard/> : null }
                    <Layout className="app-layout"  style={getLayoutDirectionGutter()}>
                        <div className="app-content">
                            <Content>
                                <DashboardContent {...props}/>

                            </Content>
                        </div>
                        <Footer />
                    </Layout>
                </Layout>
                <MusicPlayer/>
            </Layout>

            {isMobile && <MobileNav routeInfo={currentRouteInfo}/>}
        </UseAuthComponent>
    )
}


const mapStateToProps = ({ theme }) => {
    const { navCollapsed, navType, locale } =  theme;
    return { navCollapsed, navType, locale }
};

export default connect(mapStateToProps,{SocketConnect,SocketDisconnect })(React.memo(DashboardLayout))