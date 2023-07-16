import React, {lazy} from 'react'
import {DASHBOARD_PREFIX_PATH} from "./AppConfig";
import {
	WindowsOutlined,
	AppstoreAddOutlined,
	DatabaseOutlined,
	SettingOutlined,
	InsertRowRightOutlined, GatewayOutlined,
	DesktopOutlined, FieldTimeOutlined, GroupOutlined, UngroupOutlined,
	DashboardOutlined, PlusOutlined, AudioOutlined, CalendarOutlined, EnvironmentOutlined
} from '@ant-design/icons'
import {UserGroupIcons} from "../assets/svg/icon";

export const MASTER_DATA_PREFIX = '/master-data'


function getPath(path = '/', prefix = DASHBOARD_PREFIX_PATH) {
	return [prefix, path].join('')
}

export const DashboardRoutes = [
	{
		ordering: 7,
		key: 'settings',
		guard: true,
		displayName: "Settings",
		showMenu: true,
		configMenu: {
			icon: SettingOutlined,
			breadcrumb: false,
			hidden: false,
			disabled: false,
			elRight: null
		},
		exact: true,
		isAvailable: true,
		pathMenu: getPath('/settings'),
		path: getPath('/settings'),
		roles: ['admin', 'public', 'operator'],
		permissions: [],
		Pages: lazy(()=> import('../views/dashboard-views/screens/settings-views/screens/edit-profile.setting')),
		subPath: [
			{
				ordering: 0,
				key: 'settings-overview',
				guard: true,
				displayName: "Settings",
				showMenu: true,
				configMenu: {
					icon: DesktopOutlined,
					breadcrumb: false,
					hidden: false,
					disabled: false,
					elRight: null
				},
				exact: true,
				isAvailable: true,
				pathMenu: getPath('/settings/edit-profile '),
				path: getPath('/settings/edit-profile'),
				roles: ['admin', 'public', 'operator'],
				permissions: [],
				Pages: lazy(()=> import('../views/dashboard-views/screens/settings-views/screens/edit-profile.setting')),
				subPath: []
			},
			{
				ordering: 0,
				key: 'settings-announcement',
				guard: true,
				displayName: "Setting Announcement",
				showMenu: false,
				configMenu: {
					icon: DesktopOutlined,
					breadcrumb: false,
					hidden: false,
					disabled: false,
					elRight: null
				},
				exact: true,
				isAvailable: true,
				pathMenu: getPath('/settings/announcement '),
				path: getPath('/settings/announcement'),
				roles: ['admin', 'public', 'operator'],
				permissions: [],
				Pages: lazy(()=> import('../views/dashboard-views/screens/settings-views/screens/announcement')),
				subPath: []
			},
			{
				ordering: 0,
				key: 'settings-edit-profile',
				guard: true,
				displayName: "Edit Profile",
				showMenu: false,
				configMenu: {
					icon: DesktopOutlined,
					breadcrumb: false,
					hidden: false,
					disabled: false,
					elRight: null
				},
				exact: true,
				isAvailable: true,
				pathMenu: getPath('/settings/edit-profile'),
				path: getPath('/settings/edit-profile'),
				roles: ['admin', 'public', 'operator'],
				permissions: [],
				Pages: React.lazy(() => import("../views/dashboard-views/screens/settings-views/screens/edit-profile.setting")),
				subPath: []
			},
			{
				ordering: 0,
				key: 'settings-change-password',
				guard: true,
				displayName: "Change Password",
				showMenu: false,
				configMenu: {
					icon: DesktopOutlined,
					breadcrumb: false,
					hidden: false,
					disabled: false,
					elRight: null
				},
				exact: true,
				isAvailable: true,
				pathMenu: getPath('/settings/change-password'),
				path: getPath('/settings/change-password'),
				roles: ['admin', 'public', 'operator'],
				permissions: [],
				Pages: React.lazy(() => import("../views/dashboard-views/screens/settings-views/screens/change-password.setting")),
				subPath: []
			},
			{
				ordering: 0,
				key: 'settings-license',
				guard: true,
				displayName: "License",
				showMenu: false,
				configMenu: {
					icon: DesktopOutlined,
					breadcrumb: false,
					hidden: false,
					disabled: false,
					elRight: null
				},
				exact: true,
				isAvailable: true,
				pathMenu: getPath('/settings/license'),
				path: getPath('/settings/license'),
				roles: ['admin', 'public', 'operator'],
				permissions: [],
				Pages: React.lazy(() => import("../views/dashboard-views/screens/settings-views/screens/license.setting")),
				subPath: []
			},
			{
				ordering: 0,
				key: 'settings-options',
				guard: true,
				displayName: "Options",
				showMenu: false,
				configMenu: {
					icon: DesktopOutlined,
					breadcrumb: false,
					hidden: false,
					disabled: false,
					elRight: null
				},
				exact: true,
				isAvailable: true,
				pathMenu: getPath('/settings/options'),
				path: getPath('/settings/options'),
				roles: ['admin', 'public', 'operator'],
				permissions: [],
				Pages: React.lazy(() => import("../views/dashboard-views/screens/settings-views/screens/options.setting")),
				subPath: [
					{
						ordering: 0,
						key: 'settings-options-overview',
						guard: true,
						displayName: "Overview",
						showMenu: false,
						configMenu: {
							icon: DesktopOutlined,
							breadcrumb: false,
							hidden: false,
							disabled: false,
							elRight: null
						},
						exact: true,
						isAvailable: true,
						pathMenu: getPath('/settings/options'),
						path: getPath('/settings/options'),
						roles: ['admin', 'public', 'operator'],
						permissions: [],
						Pages: React.lazy(() => import("../views/dashboard-views/screens/settings-views/screens/options.setting")),
						subPath: []
					},
					{
						ordering: 0,
						key: 'settings-options-site-name',
						guard: true,
						displayName: "Site Name",
						showMenu: false,
						configMenu: {
							icon: DesktopOutlined,
							breadcrumb: false,
							hidden: false,
							disabled: false,
							elRight: null
						},
						exact: true,
						isAvailable: true,
						pathMenu: getPath('/settings/options/site-name'),
						path: getPath('/settings/options/site-name'),
						roles: ['admin', 'public', 'operator'],
						permissions: [],
						Pages: React.lazy(() => import("../views/dashboard-views/screens/settings-views/screens/options/site-name")),
						subPath: []
					},
				]
			},
		]
	},
	{
		ordering: 1,
		key: 'master-data',
		guard: true,
		displayName: "Master Data",
		showMenu: true,
		configMenu: {
			icon: DatabaseOutlined,
			breadcrumb: false,
			hidden: false,
			disabled: false,
			elRight: null
		},
		exact: true,
		isAvailable: true,
		pathMenu: getPath('/master-data'),
		path: getPath('/master-data'),
		roles: ['admin', 'public', 'operator'],
		permissions: [],
		Pages: lazy(()=> import('../views/dashboard-views/screens/settings-views/screens/edit-profile.setting')),
		subPath: [
			{
				ordering: 1,
				key: 'master-data.category',
				guard: true,
				displayName: "Category",
				showMenu: true,
				configMenu: {
					icon: DatabaseOutlined,
					breadcrumb: false,
					hidden: false,
					disabled: false,
					elRight: null
				},
				exact: true,
				isAvailable: true,
				pathMenu: getPath('/master-data/category'),
				path: getPath('/master-data/category'),
				roles: ['admin', 'public', 'operator'],
				permissions: [],
				Pages: lazy(()=> import('../views/dashboard-views/screens/master-data-views/screens/category/overviews')),
				subPath: [
					{
						ordering: 1,
						key: 'master-data.category',
						guard: true,
						displayName: "Category",
						showMenu: false,
						configMenu: {
							icon: DatabaseOutlined,
							breadcrumb: false,
							hidden: false,
							disabled: false,
							elRight: null
						},
						exact: true,
						isAvailable: true,
						pathMenu: getPath('/master-data/category'),
						path: getPath('/master-data/category'),
						roles: ['admin', 'public', 'operator'],
						permissions: [],
						Pages: lazy(()=> import('../views/dashboard-views/screens/master-data-views/screens/category/overviews')),
						subPath: []
					},
					{
						ordering: 1,
						key: 'master-data.category.create',
						guard: true,
						displayName: "Create",
						showMenu: false,
						configMenu: {
							icon: DatabaseOutlined,
							breadcrumb: false,
							hidden: false,
							disabled: false,
							elRight: null
						},
						exact: true,
						isAvailable: true,
						pathMenu: getPath('/master-data/category/create'),
						path: getPath('/master-data/category/create'),
						roles: ['admin', 'public', 'operator'],
						permissions: [],
						Pages: lazy(()=> import('../views/dashboard-views/screens/master-data-views/screens/category/create')),
						subPath: []
					},
				]
			},
			{
				ordering: 1,
				key: 'master-data.category_value',
				guard: true,
				displayName: "Category Value",
				showMenu: true,
				configMenu: {
					icon: DatabaseOutlined,
					breadcrumb: false,
					hidden: false,
					disabled: false,
					elRight: null
				},
				exact: true,
				isAvailable: true,
				pathMenu: getPath('/master-data/category-value'),
				path: getPath('/master-data/category-value'),
				roles: ['admin', 'public', 'operator'],
				permissions: [],
				Pages: lazy(()=> import('../views/dashboard-views/screens/master-data-views/screens/category_value/overviews')),
				subPath: [
					{
						ordering: 1,
						key: 'master-data.category_value.overview',
						guard: true,
						displayName: "Category Value",
						showMenu: false,
						configMenu: {
							icon: DatabaseOutlined,
							breadcrumb: false,
							hidden: false,
							disabled: false,
							elRight: null
						},
						exact: true,
						isAvailable: true,
						pathMenu: getPath('/master-data/category-value'),
						path: getPath('/master-data/category-value'),
						roles: ['admin', 'public', 'operator'],
						permissions: [],
						Pages: lazy(()=> import('../views/dashboard-views/screens/master-data-views/screens/category_value/overviews')),
						subPath: []
					},
					{
						ordering: 1,
						key: 'master-data.category_value.create',
						guard: true,
						displayName: "Create",
						showMenu: false,
						configMenu: {
							icon: DatabaseOutlined,
							breadcrumb: false,
							hidden: false,
							disabled: false,
							elRight: null
						},
						exact: true,
						isAvailable: true,
						pathMenu: getPath('/master-data/category-value/create'),
						path: getPath('/master-data/category-value/create'),
						roles: ['admin', 'public', 'operator'],
						permissions: [],
						Pages: lazy(()=> import('../views/dashboard-views/screens/master-data-views/screens/category_value/create')),
						subPath: []
					},
				]
			},
			{
				ordering: 1,
				key: 'master-data.criteria',
				guard: true,
				displayName: "Criteria",
				showMenu: true,
				configMenu: {
					icon: DatabaseOutlined,
					breadcrumb: false,
					hidden: false,
					disabled: false,
					elRight: null
				},
				exact: true,
				isAvailable: true,
				pathMenu: getPath('/master-data/criteria'),
				path: getPath('/master-data/criteria'),
				roles: ['admin', 'public', 'operator'],
				permissions: [],
				Pages: lazy(()=> import('../views/dashboard-views/screens/master-data-views/screens/criteria-views/overviews')),
				subPath: [
					{
						ordering: 1,
						key: 'master-data.criteria.overview',
						guard: true,
						displayName: "Criteria Overview",
						showMenu: false,
						configMenu: {
							icon: DatabaseOutlined,
							breadcrumb: false,
							hidden: false,
							disabled: false,
							elRight: null
						},
						exact: true,
						isAvailable: true,
						pathMenu: getPath('/master-data/criteria'),
						path: getPath('/master-data/criteria'),
						roles: ['admin', 'public', 'operator'],
						permissions: [],
						Pages: lazy(()=> import('../views/dashboard-views/screens/master-data-views/screens/criteria-views/overviews')),
						subPath: []
					},
					{
						ordering: 1,
						key: 'master-data.criteria.create',
						guard: true,
						displayName: "Create",
						showMenu: false,
						configMenu: {
							icon: DatabaseOutlined,
							breadcrumb: false,
							hidden: false,
							disabled: false,
							elRight: null
						},
						exact: true,
						isAvailable: true,
						pathMenu: getPath('/master-data/criteria/create'),
						path: getPath('/master-data/criteria/create'),
						roles: ['admin', 'public', 'operator'],
						permissions: [],
						Pages: lazy(()=> import('../views/dashboard-views/screens/master-data-views/screens/criteria-views/create')),
						subPath: []
					},
				]
			},
		]
	},
	{
		ordering: 1,
		key: 'travel',
		guard: true,
		displayName: "Travel",
		showMenu: true,
		configMenu: {
			icon: GroupOutlined,
			breadcrumb: false,
			hidden: false,
			disabled: false,
			elRight: null
		},
		exact: true,
		isAvailable: true,
		pathMenu: getPath('/travel'),
		path: getPath('/travel'),
		roles: ['admin', 'public', 'operator'],
		permissions: [],
		Pages: lazy(()=> import('../views/dashboard-views/screens/travel-views/overviews')),
		subPath: [
			{
				ordering: 1,
				key: 'travel.wisata',
				guard: true,
				displayName: "Wisata",
				showMenu: true,
				configMenu: {
					icon: EnvironmentOutlined,
					breadcrumb: false,
					hidden: false,
					disabled: false,
					elRight: null
				},
				exact: true,
				isAvailable: true,
				pathMenu: getPath('/travel'),
				path: getPath('/travel'),
				roles: ['admin', 'public', 'operator'],
				permissions: [],
				Pages: lazy(()=> import('../views/dashboard-views/screens/travel-views/overviews')),
				subPath: [
					{
						ordering: 1,
						key: 'travel.wisata Overview',
						guard: true,
						displayName: "Wisata",
						showMenu: false,
						configMenu: {
							icon: DatabaseOutlined,
							breadcrumb: false,
							hidden: false,
							disabled: false,
							elRight: null
						},
						exact: true,
						isAvailable: true,
						pathMenu: getPath('/travel'),
						path: getPath('/travel'),
						roles: ['admin', 'public', 'operator'],
						permissions: [],
						Pages: lazy(()=> import('../views/dashboard-views/screens/travel-views/overviews')),
						subPath: [
						]
					},
					{
						ordering: 1,
						key: 'travel.wisata.show',
						guard: true,
						displayName: "Show",
						showMenu: false,
						configMenu: {
							icon: DatabaseOutlined,
							breadcrumb: false,
							hidden: false,
							disabled: false,
							elRight: null
						},
						exact: true,
						isAvailable: true,
						pathMenu: getPath('/travel/:id/show'),
						path: getPath('/travel/:id/show'),
						roles: ['admin', 'public', 'operator'],
						permissions: [],
						Pages: lazy(()=> import('../views/dashboard-views/screens/travel-views/show')),
						subPath: [
						]
					},
					{
						ordering: 1,
						key: 'travel.wisata.show.calculate',
						guard: true,
						displayName: "Show",
						showMenu: false,
						configMenu: {
							icon: DatabaseOutlined,
							breadcrumb: false,
							hidden: false,
							disabled: false,
							elRight: null
						},
						exact: true,
						isAvailable: true,
						pathMenu: getPath('/travel/:id/show/calculate'),
						path: getPath('/travel/:id/show/calculate'),
						roles: ['admin', 'public', 'operator'],
						permissions: [],
						Pages: lazy(()=> import('../views/dashboard-views/screens/travel-views/screens/calculate-views')),
						subPath: [
						]
					},
					{
						ordering: 1,
						key: 'travel.wisata.create',
						guard: true,
						displayName: "Create",
						showMenu: false,
						configMenu: {
							icon: DatabaseOutlined,
							breadcrumb: false,
							hidden: false,
							disabled: false,
							elRight: null
						},
						exact: true,
						isAvailable: true,
						pathMenu: getPath('/travel/create'),
						path: getPath('/travel/create'),
						roles: ['admin', 'public', 'operator'],
						permissions: [],
						Pages: lazy(()=> import('../views/dashboard-views/screens/travel-views/create')),
						subPath: [
						]
					},
				]
			},
		]
	},
	
	{
		ordering: 0,
		key: 'dashboard',
		guard: true,
		displayName: "Dashboard",
		showMenu: true,
		isAvailable: true,
		configMenu: {
			icon: () => <DashboardOutlined/>,
			breadcrumb: false,
			hidden: false,
			disabled: false,
			elRight: null
		},
		exact: true,
		pathMenu: getPath(''),
		path: getPath(''),
		roles: ['admin', 'public', 'operator'],
		permissions: [],
		Pages: lazy(() => import("../views/dashboard-views/screens/home/overview")),
		subPath: []
	},
]
