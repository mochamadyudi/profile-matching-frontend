import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {Button, Layout} from "antd";
import Icon, {DesktopOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined} from '@ant-design/icons';
import Logo from '../../Logo';
// import NavNotification from './NavNotification';
// import NavProfile from './NavProfile';
// import NavLanguage from './NavLanguage';
// import NavPanel from './NavPanel';
// import NavSearch  from './NavSearch';
// import SearchInput from './NavSearch/SearchInput.js'
import {toggleCollapsedNav, onMobileNavToggle} from 'redux/actions/Theme';
import {NAV_TYPE_TOP, SIDE_NAV_COLLAPSED_WIDTH, SIDE_NAV_WIDTH} from 'constants/ThemeConstant';
import utils from 'utils'
import SearchInput from "../../../../components/layout-components/NavSearch/SearchInput";
import {NavProfile} from "../../../../components/layout-components/NavProfile";
import {MenuAltIcons, MenuAltIconsWhite} from "../../../../assets/svg/icon";
import {NavPanel} from "../../../../components/layout-components/NavPanel";
import NavNotification from "../../../../components/layout-components/NavNotification";
import {NavLanguage} from "../../../../components/layout-components/NavLanguage";
import {NavSearch} from "../../../../components/layout-components/NavSearch";
import {useHistory} from "react-router-dom";
import {first} from "lodash";

const {Header} = Layout;

export const NavbarDashboard = props => {
	
	
	const history = useHistory()
	const {
		navCollapsed,
		mobileNav,
		navType,
		headerNavColor,
		toggleCollapsedNav,
		onMobileNavToggle,
		isMobile,
		currentTheme,
		direction
	} = props;
	const [searchActive, setSearchActive] = useState(false)
	
	
	const onSearchClose = () => {
		setSearchActive(false)
	}
	
	const onToggle = () => {
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
		if (isMobile) {
			return '0px'
		}
		if (navCollapsed) {
			return `${SIDE_NAV_COLLAPSED_WIDTH}px`
		} else {
			return `${SIDE_NAV_WIDTH}px`
		}
	}
	
	return (
		<Header className={`app-header ${navMode}`} style={{backgroundColor: headerNavColor}}>
			<div className={`app-header-wrapper `}>
				<Logo logoType={navMode}/>
				
				<div className="nav" style={{width: `calc(100% - ${getNavWidth()})`}}>
					<div className="nav-left">
						<ul className="ant-menu ant-menu-root ant-menu-horizontal">
							<li className="ant-menu-item ant-menu-item-only-child" onClick={() => {
								onToggle()
							}}>
								<Icon component={currentTheme === 'dark' ? MenuAltIconsWhite : MenuAltIcons}/>
							</li>
							{/*{*/}
							{/*    !isMobile &&*/}
							{/*    <li className="ant-menu-item ant-menu-item-only-child" style={{cursor: 'auto'}}>*/}
							{/*        <SearchInput mode={mode} isMobile={isMobile} />*/}
							{/*    </li>*/}
							{/*}*/}
						</ul>
					</div>
					<div className="nav-right">
						<div className={'!mk-h-full !mk-flex !mk-items-center !mk-justify-center'}>
							<button type={'button'} name={'monitoring-app'}
							        onClick={() => {
								        history.replace('/monitoring')
							        }}
							        className={'yid-btn-animation'}>
								<DesktopOutlined className={'yid-btn-icon'}/>
								<span className={'yid-btn-hover rightToLeft'}>Monitoring</span>
							</button>
						</div>
						<NavProfile {...props}/>
					</div>
				</div>
			</div>
		</Header>
	)
}

const mapStateToProps = ({theme, Settings,auth}) => {
	let {collections} = Settings
	let {general} = collections
	const {navCollapsed, navType, headerNavColor, mobileNav, currentTheme, direction} = theme;
	return {navCollapsed, navType, headerNavColor, mobileNav, currentTheme, direction, general,auth}
};

export default connect(mapStateToProps, {toggleCollapsedNav, onMobileNavToggle})(NavbarDashboard);
