import {SIDE_NAV_LIGHT, NAV_TYPE_SIDE, DIR_LTR, NAV_TYPE_TOP, SIDE_NAV_DARK} from 'constants/ThemeConstant';
import { env } from './EnvironmentConfig'

export const APP_NAME = 'Cipta Grafika';
export const API_BASE_URL = env.API_ENDPOINT_URL
export const APP_PREFIX_PATH = '/';
export const APP_EDITOR_PREFIX_PATH = '/editor';
export const AUTH_PREFIX_PATH = '/auth';

export const DASHBOARD_PREFIX_PATH = '/dashboard';
export const COLOR_DEFAULT_SELECTION = '#bdbdbd'

const THEME_CONFIG = {
	navCollapsed: false,
	sideNavTheme: SIDE_NAV_LIGHT,
	locale: 'id',
	navType: NAV_TYPE_TOP,
	topNavColor: "#ffffff",
	headerNavColor: '#ffffff',
	mobileNav: false,
	currentTheme: 'light',
	direction: DIR_LTR
};

if(localStorage.getItem('THEME_MODE')){
	Reflect.set(THEME_CONFIG,'currentTheme',localStorage.getItem("THEME_MODE"))
	Reflect.set(THEME_CONFIG,'topNavColor',"")
	Reflect.set(THEME_CONFIG,'headerNavColor',"")
	localStorage.setItem('THEME_MODE',localStorage.getItem("THEME_MODE"))
}else{
	localStorage.setItem('THEME_MODE',"light")
	Reflect.set(THEME_CONFIG,'currentTheme',"light")
}

export {
	THEME_CONFIG
}