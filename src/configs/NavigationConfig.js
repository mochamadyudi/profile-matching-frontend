import {APP_PREFIX_PATH} from 'configs/AppConfig'
import {AtSymbolIcons, MenuAltIcons, UserGroupIcons, ViewBoxAddIcons} from "../assets/svg/icon";
import {SettingOutlined, ReadOutlined, DollarCircleOutlined, PlusOutlined} from "@ant-design/icons";

const dashBoardNavTree = [
    {
        key: 'monitoring',
        path: `/`,
        title: 'Monitoring',
        isNew: [false],
        icon: () => <ViewBoxAddIcons style={{
            '-webkit-transform': 'scaleX(-1)',
            transform: 'scaleX(-1)'
        }}/>,
        breadcrumb: false,
        submenu: []
    },
    {
        key: 'dashboard',
        path: `/dashboard`,
        title: 'Dashboard',
        isNew: [false],
        icon: () => <ViewBoxAddIcons style={{
            '-webkit-transform': 'scaleX(-1)',
            transform: 'scaleX(-1)'
        }}/>,
        breadcrumb: false,
        submenu: []
    },
    {
        key: 'arrival',
        path: `/arrival`,
        title: 'Arrival',
        isNew: [false],
        icon: () => <ViewBoxAddIcons style={{
            '-webkit-transform': 'scaleX(-1)',
            transform: 'scaleX(-1)'
        }}/>,
        breadcrumb: false,
        submenu: []
    },
    {
        key: 'departures',
        path: `/departures`,
        title: 'Departures',
        isNew: [false],
        icon: () => <ViewBoxAddIcons style={{
            '-webkit-transform': 'scaleX(-1)',
            transform: 'scaleX(-1)'
        }}/>,
        breadcrumb: false,
        submenu: []
    },
    {
        key: 'belt',
        path: `/belt`,
        title: 'Belt',
        isNew: [false],
        icon: () => <ViewBoxAddIcons style={{
            '-webkit-transform': 'scaleX(-1)',
            transform: 'scaleX(-1)'
        }}/>,
        breadcrumb: false,
        submenu: []
    },
    {
        key: 'check-in',
        path: `/check-in`,
        title: 'Check In',
        isNew: [false],
        icon: () => <ViewBoxAddIcons style={{
            '-webkit-transform': 'scaleX(-1)',
            transform: 'scaleX(-1)'
        }}/>,
        breadcrumb: false,
        submenu: []
    },
    {
        key: 'on-boarding',
        path: `/on-boarding`,
        title: 'On Boarding',
        isNew: [false],
        icon: () => <ViewBoxAddIcons style={{
            '-webkit-transform': 'scaleX(-1)',
            transform: 'scaleX(-1)'
        }}/>,
        breadcrumb: false,
        submenu: []
    },
    {
        key: 'gate',
        path: `/gate`,
        title: 'Gate',
        isNew: [false],
        icon: () => <ViewBoxAddIcons style={{
            '-webkit-transform': 'scaleX(-1)',
            transform: 'scaleX(-1)'
        }}/>,
        breadcrumb: false,
        submenu: []
    },
    {
        key: 'luggage',
        path: `/luggage`,
        title: 'Luggage',
        isNew: [false],
        icon: () => <ViewBoxAddIcons style={{
            '-webkit-transform': 'scaleX(-1)',
            transform: 'scaleX(-1)'
        }}/>,
        breadcrumb: false,
        submenu: []
    },

]

const navigationConfig = [
    ...dashBoardNavTree
]

export default navigationConfig;
