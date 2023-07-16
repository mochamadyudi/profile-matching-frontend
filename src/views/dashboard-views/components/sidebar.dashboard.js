import React from 'react'
import {connect} from 'react-redux'
import {DashboardRoutes} from "../../../configs/dashboard.routes";
import {SIDE_NAV_DARK, SIDE_NAV_LIGHT, SIDE_NAV_WIDTH} from "../../../constants/ThemeConstant";
import {Grid, Layout, Menu} from "antd";
import {Scrollbars} from "react-custom-scrollbars";
import {Link} from "react-router-dom";
import IntlMessage from "../../../components/util-components/IntlMessage";
import utils from "../../../utils";
import {onMobileNavToggle} from "../../../redux/actions";
import Icon from "../../../components/util-components/Icon";

const { Sider } = Layout;

const { useBreakpoint } = Grid;

const { SubMenu } = Menu;
const setLocale = (isLocaleOn, localeKey) =>
    isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const setDefaultOpen = (key) => {
    let keyList = [];
    let keyString = "";
    if (key) {
        const arr = key.split("-");
        for (let index = 0; index < arr.length; index++) {
            const elm = arr[index];
            index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
            keyList.push(keyString);
        }
    }
    return keyList;
};


/**
 *
 * @param {Object} props
 * @param {String} props.keys
 * @param {String} props.path
 * @param {String} props.displayName,
 * @param {[]} props.subPath,
 * @param {Object} props.showMenu
 * @param {Object} props.configMenu
 * @param {Boolean} props.isAvailable
 * @param {Boolean} props.navCollapsed
 * @param {Boolean} props.isFirst
 * @param {Function | function} props.closeMobileNav
 * @param {ReactNode|Function|String|undefined|null } props.configMenu.icon
 * @returns {JSX.Element}
 */
function SubPathComponent (props){
    let {
        key,
        keys,
        navCollapsed = false,
        configMenu,
        displayName,
        subPath,
        closeMobileNav,
        path,
        isAvailable,
        isFirst
    } = props
    return (

        subPath.length > 0 ?
            <Menu.ItemGroup
                key={keys}
                style={!isFirst ? {
                    paddingLeft:"20px"
                }:{}}
                title={<div className={'!mk-flex !mk-items-center !mk-gap-2'}>{configMenu?.icon ? <Icon type={configMenu.icon}/> : null}{displayName}</div>}>

                {
                    subPath
                        .sort((a,b)=> {
                            if(b?.ordering > a?.ordering){
                                return -1
                            }
                            return 1
                        })
                        .filter(child => child?.isAvailable === true)
                        .filter(child => child?.showMenu === true)
                        .filter((child)=> child?.configMenu.hidden === false)
                        .filter((child)=> child?.configMenu.disabled === false)
                        .map((subMenuFirst) =>
                            subMenuFirst.subPath.filter(child => child?.showMenu === true).length > 0 ? (
                                <SubMenu
                                    icon={
                                        subMenuFirst?.configMenu?.icon ? (
                                            <Icon type={subMenuFirst?.configMenu?.icon} />
                                        ) : null
                                    }
                                    key={subMenuFirst?.key}
                                    title={subMenuFirst?.displayName}
                                >
                                    {subMenuFirst?.subPath
                                        .sort((a,b)=> {
                                            if(b?.ordering > a?.ordering){
                                                return -1
                                            }
                                            return 1
                                        })
                                        .filter(child => child?.isAvailable === true)
                                        .filter(child => child?.showMenu === true)
                                        .filter((child)=> child?.configMenu.hidden === false)
                                        .filter((child)=> child?.configMenu.disabled === false)
                                        .map((subMenuSecond) => (
                                            subMenuSecond.subPath.length > 0 && subMenuSecond.subPath.filter(child => child?.showMenu === true) ?
                                                <SubPathComponent
                                                    {...props}
                                                    isFirst={false}
                                                    key={subMenuSecond.key ?? subMenuSecond.keys}
                                                    closeMobileNav={closeMobileNav}
                                                    keys={subMenuSecond.key ?? subMenuSecond.keys}
                                                    configMenu={subMenuSecond.configMenu}
                                                    displayName={subMenuSecond.displayName}
                                                    subPath={subMenuSecond.subPath}
                                                    path={subMenuSecond.path}
                                                />
                                                :
                                                <Menu.Item key={subMenuSecond.key ?? subMenuSecond.keys}>
                                                    {subMenuSecond?.configMenu?.icon ? <Icon type={subMenuSecond?.configMenu?.icon} /> : null}
                                                    <span>{subMenuSecond.displayName}</span>
                                                    <Link onClick={() => closeMobileNav()} to={subMenuSecond.path} />
                                                </Menu.Item>
                                        ))
                                    }
                                </SubMenu>
                            ) : (
                                <Menu.Item key={subMenuFirst.key ?? subMenuFirst.keys}>
                                    {subMenuFirst?.configMenu?.icon ? <Icon type={subMenuFirst?.configMenu?.icon} /> : null}
                                    <span>{subMenuFirst.displayName}</span>
                                    <Link onClick={() => closeMobileNav()} to={subMenuFirst.path} />
                                </Menu.Item>
                            )
                        )}
            </Menu.ItemGroup>
                :
            (
                <Menu.Item key={keys}>
                    {configMenu?.icon ? <Icon type={configMenu.icon}/> : null}
                    <span>{displayName}</span>
                    {path ? <Link to={path} /> : null}
                </Menu.Item>
            )
    )
}

/**
 *
 * @param navCollapsed
 * @param sideNavTheme
 * @param routeInfo
 * @param onMobileNavToggle
 * @param hideGroupTitle
 * @param localization
 * @returns {JSX.Element}
 * @constructor
 */
function SidebarDashboard({navCollapsed, sideNavTheme, routeInfo,onMobileNavToggle, hideGroupTitle, localization = true}) {

    const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg')
    const closeMobileNav = () => {
        if (isMobile) {
            onMobileNavToggle(false)
        }
    }
    function UseLayoutMobile({children}){
        if(isMobile){
            return children
        }else{
            return (
                <Sider

                    className={`side-nav ${sideNavTheme === SIDE_NAV_DARK? 'side-nav-dark' : ''}`}
                    width={SIDE_NAV_WIDTH}
                    collapsed={navCollapsed}
                >
                    <Scrollbars autoHide>
                        {children}
                    </Scrollbars>
                </Sider>
            )
        }
    }
    return UseLayoutMobile({children:<Menu
        theme={sideNavTheme === SIDE_NAV_LIGHT ? "light" : "dark"}
        mode="inline"
        style={{ height: "calc(100%-80px)", borderRight: 0,paddingBottom:50 }}
        defaultSelectedKeys={[routeInfo?.key]}
        defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
        className={hideGroupTitle ? "hide-group-title" : ""}
    >
        {
            DashboardRoutes
                .sort((a,b)=> {
                    if(b?.ordering > a?.ordering){
                        return -1
                    }
                    return 1
                })
                .filter(child => child?.isAvailable === true)
                .filter(child => child?.showMenu === true)
                .filter((child)=> child?.configMenu.hidden === false)
                .filter((child)=> child?.configMenu.disabled === false)
                .map((child)=> {
                    return Array.isArray(child.subPath) && child.subPath.length > 0 && child.subPath.filter(child => child?.showMenu === true).length > 0 ?
                        <SubPathComponent
                            {...child}
                            navCollapsed={navCollapsed}
                            isFirst={true}
                            displayName={child.displayName}
                            path={child.path}
                            subPath={child.subPath}
                            showMenu={child.showMenu}
                            configMenu={child.configMenu}
                            isAvailable={child.isAvailable}
                            closeMobileNav={closeMobileNav}
                            keys={child?.key}
                            key={child?.key}
                        />
                        :
                        <Menu.Item key={child?.key}>
                            {child?.configMenu?.icon ? <Icon type={child.configMenu.icon}/> : null}
                            <span>{setLocale(localization, child?.displayName)}</span>
                            {child?.path ? <Link to={child.path} /> : null}
                        </Menu.Item>
                })
        }
    </Menu>})
}

SidebarDashboard.propTypes = {}
SidebarDashboard.defaultProps = {}
const mapStateToProps = ({ theme }) => {
    const { navCollapsed, sideNavTheme } =  theme;
    return { navCollapsed, sideNavTheme }
};
export default connect(mapStateToProps,{ onMobileNavToggle })(React.memo(SidebarDashboard))
