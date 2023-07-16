import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {Layout, Dropdown, Menu, Divider, Button, Badge, Drawer} from "antd";
import Icon, {DownOutlined, SearchOutlined} from '@ant-design/icons';
import Logo from './Logo';
import NavPanel from './NavPanel';
import NavSearch from './NavSearch';
import {toggleCollapsedNav, onMobileNavToggle} from 'redux/actions/Theme';
import {NAV_TYPE_SIDE, NAV_TYPE_TOP, SIDE_NAV_COLLAPSED_WIDTH, SIDE_NAV_WIDTH} from 'constants/ThemeConstant';
import utils from 'utils'
import {MenuAltIcons, MenuAltIconsWhite} from "../../assets/svg/icon";
import Flex from 'components/shared-components/Flex'
import SelectedCurrentInvitations from "./navbar/selected-current-invitations";
import NewUserNavbar from "./navbar/new-user.navbar";
import ContainerTailwind from "./ContainerTailwind";
import {SideNav} from "./SideNav";
import navigationConfig from "../../configs/NavigationConfig";
import {useLocation} from "react-router-dom";
import MenuContent from "./MenuContent";
import {Scrollbars} from "react-custom-scrollbars";
import SearchInput from "./NavSearch/SearchInput";
import {NavProfile} from "./NavProfile";

const {Header} = Layout;


export const HeaderNav = props => {
    const {
        navCollapsed,
        mobileNav,
        isNew,
        navType,
        headerNavColor,
        toggleCollapsedNav,
        onMobileNavToggle,
        isMobile,
        currentTheme,
        direction
    } = props;

    const location = useLocation()

    const [menuActive, setMenuActive] = useState(false)
    const MenuOpen = ()=> {
        setMenuActive(!menuActive)
    }
    const [searchActive, setSearchActive] = useState(false)
    const currentRouteInfo = utils.getRouteInfo(navigationConfig, location.pathname)
    const onSearchClose = () => {
        setSearchActive(false)
    }

    const onToggle = () => {
        MenuOpen()
        if (!isMobile) {
            toggleCollapsedNav(!navCollapsed)
        } else {
            onMobileNavToggle(!mobileNav)
        }
    }

    const isNavTop = navType === NAV_TYPE_TOP
    const mode = () => {
        if (!headerNavColor) {
            return utils.getColorContrast(currentTheme === 'dark' ? '#00000' : '#ffffff')
        }
        return utils.getColorContrast(headerNavColor)
    }
    const navMode = mode()
    const getNavWidth = () => {
        if (isNavTop || isMobile) {
            return '0px'
        }
            return `${SIDE_NAV_WIDTH}px`
    }

    useEffect(() => {
        if (!isMobile) {
            onSearchClose()
        }
    })

    return (
        <Header className={`app-header ${navMode}`} style={{backgroundColor: headerNavColor}}>
            <ContainerTailwind>
                <div className={`app-header-wrapper layout-top-nav`}>
                    <div>
                        <Logo logoType={navMode}/>
                    </div>
                    <div className="nav" style={{width: `calc(100% - ${getNavWidth()})`}}>
                        <div className="nav-left">
                            <ul className="ant-menu ant-menu-root ant-menu-horizontal">
                                <li className="ant-menu-item ant-menu-item-only-child" onClick={() => {
                                    onToggle()
                                }}>
                                    <Icon component={currentTheme === 'dark' ? MenuAltIconsWhite : MenuAltIcons}/>
                                </li>
                                {
                                    isMobile ?
                                        <li className="ant-menu-item ant-menu-item-only-child">
                                            <SearchOutlined />
                                        </li>
                                        :
                                        <li className="ant-menu-item ant-menu-item-only-child" style={{cursor: 'auto'}}>
                                            <SearchInput mode={mode} isMobile={isMobile} />
                                        </li>
                                }
                            </ul>
                        </div>
                        <div className="nav-right">
                            {/*<NavPanel direction={direction}/>*/}
                            <NavProfile/>
                        </div>
                    </div>
                </div>
            </ContainerTailwind>
            <Drawer
                className={'p-0 m-0'}
                placement={'left'}
                closable={false}
                bodyStyle={{padding:0}}
                onClose={MenuOpen}
                visible={menuActive}>
                <MenuContent
                    type={NAV_TYPE_SIDE}
                    {...props}
                />
                <Button type={'primary'}>Dashboard</Button>
            </Drawer>
        </Header>
    )
}

const mapStateToProps = ({theme, Settings}) => {
    let {isNew} = Settings
    const {navCollapsed, navType, headerNavColor, mobileNav, currentTheme, direction} = theme;
    return {navCollapsed, navType, headerNavColor, mobileNav, currentTheme, direction, isNew}
};

export default connect(mapStateToProps, {toggleCollapsedNav, onMobileNavToggle})(HeaderNav);
