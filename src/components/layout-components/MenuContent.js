import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Menu, Grid} from "antd";
import IntlMessage from "../util-components/IntlMessage";
import Icon from "../util-components/Icon";
import navigationConfig from "configs/NavigationConfig";
import {connect} from "react-redux";
import {SIDE_NAV_LIGHT, NAV_TYPE_SIDE} from "constants/ThemeConstant";
import utils from 'utils'
import {onMobileNavToggle} from "redux/actions/Theme";

const {SubMenu} = Menu;
const {useBreakpoint} = Grid;

const setLocale = (isLocaleOn, localeKey) =>
    isLocaleOn ? <IntlMessage id={localeKey}/> : localeKey.toString();

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

const SideNavContent = (props) => {
    const {sideNavTheme, routeInfo, hideGroupTitle, localization, onMobileNavToggle, isNew} = props;
    const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg')
    const closeMobileNav = () => {
        if (isMobile) {
            onMobileNavToggle(false)
        }
    }
    return (
        <Menu
            theme={sideNavTheme === SIDE_NAV_LIGHT ? "light" : "dark"}
            mode="inline"
            style={{height: "100%", borderRight: 0}}
            defaultSelectedKeys={[routeInfo?.key]}
            defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
            className={hideGroupTitle ? "hide-group-title" : ""}
        >
            {
                navigationConfig
                    .filter((item) => item.isNew.filter((child) => child === isNew).length > 0)
                    .map((menu) =>
                        menu.submenu.length > 0 ? (
                            <Menu.ItemGroup
                                key={menu.key}
                                title={setLocale(localization, menu.title)}
                            >
                                {menu.submenu.map((subMenuFirst) =>
                                        subMenuFirst.submenu.length > 0 ? (
                                            <SubMenu
                                                icon={
                                                    subMenuFirst.icon ? (
                                                        <Icon type={subMenuFirst?.icon}/>
                                                    ) : null
                                                }
                                                key={subMenuFirst.key}
                                                title={setLocale(localization, subMenuFirst.title)}
                                            >
                                                {subMenuFirst.submenu.map((subMenuSecond) => (
                                                    <Menu.Item key={subMenuSecond.key}>
                                                        {subMenuSecond.icon ? (
                                                            <Icon type={subMenuSecond?.icon}/>
                                                        ) : null}
                                                        <span>
                        {setLocale(localization, subMenuSecond.title)}
                      </span>
                                                        <Link onClick={() => closeMobileNav()} to={subMenuSecond.path}/>
                                                    </Menu.Item>
                                                ))}
                                            </SubMenu>
                                        ) : (
                                            <Menu.Item key={subMenuFirst.key}>
                                                {subMenuFirst.icon ? <Icon type={subMenuFirst.icon}/> : null}
                                                <span>{setLocale(localization, subMenuFirst.title)}</span>
                                                <Link onClick={() => closeMobileNav()} to={subMenuFirst.path}/>
                                            </Menu.Item>
                                        )
                                )}
                            </Menu.ItemGroup>
                        ) : (
                            <Menu.Item key={menu.key}>
                                {menu.icon ? <Icon type={menu?.icon}/> : null}
                                <span>{setLocale(localization, menu?.title)}</span>
                                {menu.path ? <Link onClick={() => closeMobileNav()} to={menu.path}/> : null}
                            </Menu.Item>
                        )
                    )}
        </Menu>
    );
};

const TopNavContent = (props) => {
    const {topNavColor, localization, isNew} = props;
    const [current, setCurrent] = useState('dashboard');
    const onClick = (e) => {
        let target = e.key.split('.').filter((child)=> child !== '')
        setCurrent(target[0]);
    };
    return (
        <Menu mode="horizontal" style={{backgroundColor: topNavColor}} selectedKeys={[current]}>
            {navigationConfig
                .map((menu) =>
                        menu.submenu.length > 0 ? (
                            <SubMenu
                                key={menu.key}
                                popupClassName="top-nav-menu !mk-text-xs"
                                title={
                                    <span className={'!mk-text-sm'}>
                {menu.icon ? <Icon type={menu?.icon}/> : null}
                                        <span>{setLocale(localization, menu.title)}</span>
              </span>
                                }
                            >
                                {menu.submenu.map((subMenuFirst) =>
                                        subMenuFirst.submenu.length > 0 ? (
                                            <SubMenu
                                                key={subMenuFirst.key}
                                                popupClassName="top-nav-menu !mk-text-xs"
                                                icon={
                                                    subMenuFirst.icon ? (
                                                        <Icon type={subMenuFirst?.icon}/>
                                                    ) : null
                                                }
                                                title={setLocale(localization, subMenuFirst.title)}
                                            >
                                                {subMenuFirst.submenu.map((subMenuSecond) => (
                                                    <Menu.Item key={subMenuSecond.key}>
                      <span className={'!mk-text-sm'}>
                        {setLocale(localization, subMenuSecond.title)}
                      </span>
                                                        <Link to={subMenuSecond.path}/>
                                                    </Menu.Item>
                                                ))}
                                            </SubMenu>
                                        ) : (
                                            <Menu.Item key={subMenuFirst.key} onClick={(e)=> onClick(e)}>
                                                {subMenuFirst.icon ? (
                                                    <Icon type={subMenuFirst?.icon} className={'!mk-text-sm'}/>
                                                ) : null}
                                                <span className={'!mk-text-sm'}>{setLocale(localization, subMenuFirst.title)}</span>
                                                <Link to={subMenuFirst.path}/>
                                            </Menu.Item>
                                        )
                                )}
                            </SubMenu>
                        ) : (
                            <Menu.Item key={menu.key} onClick={(e)=> onClick(e)}>
                                {menu.icon ? <Icon type={menu?.icon} className={'!mk-text-sm'}/> : null}
                                <span className={'!mk-text-sm'}>{setLocale(localization, menu?.title)}</span>
                                {menu.path ? <Link to={menu.path}/> : null}
                            </Menu.Item>
                        )
                )}
        </Menu>
    );
};

const MenuContent = (props) => {
    return props.type === NAV_TYPE_SIDE ? (
        <SideNavContent {...props} />
    ) : (
        <TopNavContent {...props} />
    );
};

const mapStateToProps = ({theme, Settings}) => {
    const {sideNavTheme, topNavColor} = theme;
    let {isNew} = Settings
    return {sideNavTheme, topNavColor, isNew};
};

export default connect(mapStateToProps, {onMobileNavToggle})(MenuContent);
