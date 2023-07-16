import React, {lazy, Suspense} from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import Loading from "../../components/shared-components/Loading";
import {DashboardRoutes} from "../../configs/dashboard.routes";
import { connect } from 'react-redux'
import PrivateRoute from "../../permissions/PrivateRoute";
import {MusicApp} from "../../components/app-component/music-app";

function RoutesChildren(props){
    let {route,Pages,exact,routes,subPath} = props
    return (
        <Suspense fallback={<Loading cover={'content'}/>}>
            <Switch>
                {
                    subPath
                        .filter(child => child?.isAvailable === true)
                        .filter((child)=> child?.configMenu.hidden === false)
                        .filter((child)=> child?.configMenu.disabled === false)
                        // .filter((child)=> child?.roles.filter((child2)=> child2 === 'admin' ).length > 0)
                        .map(({Pages: Component, ...route2})=> {
                            return Array.isArray(route2?.subPath) && route2?.subPath.length > 0 ? (
                                route2.key === 'general/audio' ?

                                <Route path={route2.path}>
                                    <MusicApp>
                                        <RoutesChildren subPath={route2.subPath}/>
                                    </MusicApp>
                                </Route>
                                    :
                                    <Route path={route2.path}>
                                            <RoutesChildren subPath={route2.subPath}/>
                                    </Route>
                            ):(
                                route2.guard ? (
                                    <PrivateRoute
                                        key={route2.key}
                                        path={route2.path}
                                        exact={route2.exact}
                                        component={Component}
                                    />
                                ):
                                <Route
                                    key={route2.key}
                                    path={route2.path}
                                    exact={route2.exact}
                                    render={(props)=> {
                                        return (
                                            <Component {...props}/>
                                        )
                                    }}
                                />
                            )
                        })
                }
              <Route component={lazy(() => import('components/layout-components/not-found.page.js'))}/>
            </Switch>
        </Suspense>
    )
}
function DashboardContent({location,locale,direction}){
    return (
            <Suspense fallback={<Loading cover="content"/>}>
                <Switch>
                    {
                        DashboardRoutes
                            .filter(child => child?.isAvailable === true)
                            .filter((child)=> child?.configMenu.hidden === false)
                            .filter((child)=> child?.configMenu.disabled === false)
                            .filter((child)=> child?.roles.filter((child2)=> child2 === 'admin' ).length > 0)
                            .map(({Pages,...child})=>{
                                return Array.isArray(child?.subPath) && child?.subPath.length > 0 ? (
                                    <Route path={child.path}>
                                        <RoutesChildren
                                            subPath={child.subPath}
                                        />
                                    </Route>
                                ):(

                                        child.guard ? (
                                            <PrivateRoute
                                                key={child.key}
                                                path={child.path}
                                                exact={child.exact}
                                                component={Pages}
                                            />
                                        ): (
                                            <Route
                                                key={child.key}
                                                path={child.path}
                                                exact={child.exact}
                                                render={(props)=> {
                                                    return (
                                                        <Pages {...props}/>
                                                    )
                                                }}
                                            />
                                        )

                                )
                            })
                    }
                    <Route component={lazy(() => import('components/layout-components/not-found.page.js'))}/>
                </Switch>
            </Suspense>

    )
}

export default connect(()=> {
    return {}
},{})(React.memo(DashboardContent))



//function DashboardContent({location,locale,direction}){
//     return (
//             <Suspense fallback={<Loading cover="content"/>}>
//                 <Switch>
//                     {
//                         DashboardRoutes
//                             .filter(child => child?.isAvailable === true)
//                             .filter((child)=> child?.configMenu.hidden === false)
//                             .filter((child)=> child?.configMenu.disabled === false)
//                             .filter((child)=> child?.roles.filter((child2)=> child2 === 'admin' ).length > 0)
//                             .map(({Pages,...child})=>{
//                                 return Array.isArray(child?.subPath) && child?.subPath.length > 0 ? (
//                                     <Route path={child.path}>
//                                         <Suspense fallback={<Loading cover={'content'}/>}>
//                                             <Switch>
//                                                 {
//                                                     child?.subPath
//                                                         .filter(child => child?.isAvailable === true)
//                                                         .filter((child)=> child?.configMenu.hidden === false)
//                                                         .filter((child)=> child?.configMenu.disabled === false)
//                                                         // .filter((child)=> child?.roles.filter((child2)=> child2 === 'admin' ).length > 0)
//                                                         .map(({Pages: Component, ...route2})=> {
//                                                             return Array.isArray(route2?.subPath) && route2?.subPath.length > 0 ? (
//                                                                 <Route path={route2.path}>
//                                                                     <Suspense fallback={<Loading cover={'content'}/>}>
//                                                                         <Switch>
//                                                                             {
//                                                                                 route2?.subPath
//                                                                                     .filter(route3 => route3?.isAvailable === true)
//                                                                                     .filter((route3)=> route3?.configMenu.hidden === false)
//                                                                                     .filter((route3)=> route3?.configMenu.disabled === false)
//                                                                                     .filter((route2)=> route2?.roles.filter((role)=> role === 'admin' ).length > 0)
//                                                                                     .map(({Pages: Component, ...route3})=> {
//                                                                                         return (
//                                                                                             <Route
//                                                                                                 key={route3.key}
//                                                                                                 path={route3.path}
//                                                                                                 exact={route3.exact ?? false}
//                                                                                                 render={(props)=> <Component {...props}/>}
//                                                                                             />
//                                                                                         )
//                                                                                     })
//                                                                             }
//                                                                             <Route
//                                                                                 key={route2.key}
//                                                                                 path={route2.path}
//                                                                                 exact={route2.exact}
//                                                                                 render={(props)=> {
//                                                                                     return (
//                                                                                         <Pages {...props}/>
//                                                                                     )
//                                                                                 }}
//                                                                             />
//                                                                         </Switch>
//                                                                     </Suspense>
//                                                                 </Route>
//                                                             ):(
//                                                                 <Route
//                                                                     key={route2.key}
//                                                                     path={route2.path}
//                                                                     exact={route2.exact}
//                                                                     render={(props)=> {
//                                                                         return (
//                                                                             <Component {...props}/>
//                                                                         )
//                                                                     }}
//                                                                 />
//                                                             )
//                                                         })
//                                                 }
//
//                                             </Switch>
//                                         </Suspense>
//                                     </Route>
//                                 ):(
//                                     <Route
//                                         key={child.key}
//                                         path={child.path}
//                                         exact={child.exact}
//                                         render={(props)=> {
//                                             return (
//                                                 <Pages {...props}/>
//                                             )
//                                         }}
//                                     />
//                                 )
//                             })
//                     }
//                     <Route component={lazy(() => import('components/layout-components/not-found.page.js'))}/>
//                 </Switch>
//             </Suspense>
//
//     )
// }





//<Suspense fallback={<Loading cover={'content'}/>}>
//                                         <Switch>
//                                             {
//                                                 route2?.subPath
//                                                     .filter(route3 => route3?.isAvailable === true)
//                                                     .filter((route3)=> route3?.configMenu.hidden === false)
//                                                     .filter((route3)=> route3?.configMenu.disabled === false)
//                                                     .filter((route2)=> route2?.roles.filter((role)=> role === 'admin' ).length > 0)
//                                                     .map(({Pages: Component, ...route3})=> {
//                                                         return (
//                                                             <Route
//                                                                 key={route3.key}
//                                                                 path={route3.path}
//                                                                 exact={route3.exact ?? false}
//                                                                 render={(props)=> <Component {...props}/>}
//                                                             />
//                                                         )
//                                                     })
//                                             }
//                                             <Route
//                                                 key={route2.key}
//                                                 path={route2.path}
//                                                 exact={route2.exact}
//                                                 render={(props)=> {
//                                                     return (
//                                                         <Pages {...props}/>
//                                                     )
//                                                 }}
//                                             />
//                                         </Switch>
//                                     </Suspense>