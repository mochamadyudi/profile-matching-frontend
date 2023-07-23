import React, {lazy, Suspense} from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import Loading from "../../components/shared-components/Loading";
import {DashboardRoutes} from "../../configs/dashboard.routes";
import { connect } from 'react-redux'
import PrivateRoute from "../../permissions/PrivateRoute";
import {MusicApp} from "../../components/app-component/music-app";
import {Empty} from "antd";

const RoutesChildren = connect(({auth})=> {
  return {auth}
},{})(function(props){
  let {route,Pages,exact,routes,auth,subPath} = props
  return (
    <div>
      <Suspense fallback={<Loading cover={'content'}/>}>
        <Switch>
          {
            subPath
              .filter(child => child?.isAvailable === true)
              .filter((child)=> child?.roles.filter((child2)=> child2 ===  `${auth?.profile?.role?.name}`).length > 0)
              .filter((child)=> child?.configMenu.hidden === false)
              .filter((child)=> child?.configMenu.disabled === false)
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
                        return <Component {...props}/>
                      }}
                    />
                )
              })
          }
          <Route component={lazy(() => import('components/layout-components/not-found.page.js'))}/>
        </Switch>
      </Suspense>
    </div>
  )
})
function DashboardContent({location,locale,direction,auth}){
    return (
            <Suspense fallback={auth?.loading ? <Loading cover="content"/> : null}>
                <Switch>
                    {
                        DashboardRoutes
                          .filter((child)=> child?.roles.filter((child2)=> child2 ===  `${auth?.profile?.role?.name}`).length > 0)
                            .filter(child => child?.isAvailable === true)
                            .filter((child)=> child?.configMenu.hidden === false)
                            .filter((child)=> child?.configMenu.disabled === false)
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

export default connect(({auth})=> {
    return {auth}
},{})(React.memo(DashboardContent))