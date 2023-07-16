import React from 'react'
const defaultRoute = [
    {
        path: '/',
        exact: true,
        permissions:[],
        component: React.lazy(()=> import('.'))
    }
]

export default defaultRoute