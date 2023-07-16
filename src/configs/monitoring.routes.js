import {DesktopOutlined} from "@ant-design/icons";
import React from "react";

const monitoringRoutes = [
    {
        ordering:99,
        key:'monitoring.arrival',
        guard: true,
        displayName: "Arrival",
        showMenu:true,
        configMenu:{
            icon:DesktopOutlined,
            breadcrumb: false,
            hidden: false,
            disabled: false,
            elRight: null
        },
        exact: true,
        isAvailable: true,
        pathMenu:'/monitoring/arrival',
        path: '/monitoring/arrival',
        roles:['admin','public','operator'],
        permissions:[],
        Pages: React.lazy(()=> import("../views/dashboard-views/screens/settings-views/overview/index")),
        subPath:[]
    },
    {
        ordering:99,
        key:'monitoring',
        guard: true,
        displayName: "Home",
        showMenu:true,
        configMenu:{
            icon:DesktopOutlined,
            breadcrumb: false,
            hidden: false,
            disabled: false,
            elRight: null
        },
        exact: true,
        isAvailable: true,
        pathMenu:'/monitoring',
        path: '/monitoring',
        roles:['admin','public','operator'],
        permissions:[],
        Pages: React.lazy(()=> import("../views/dashboard-views/screens/settings-views/overview/index")),
        subPath:[]
    }
]

export { monitoringRoutes }