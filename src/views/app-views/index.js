import React, {lazy, Suspense} from "react";
import {Switch, Route} from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import PrivateRoute from "../../permissions/PrivateRoute";

export const AppViews = () => {
    return (
        <Suspense fallback={<Loading cover="content"/>}>
            <Switch>
                <PrivateRoute path={`/departures`} component={lazy(() => import(`./departures-views/index.views`))}/>
                <PrivateRoute path={`/gate`} component={lazy(() => import(`./gate-views/index.views`))}/>
                <PrivateRoute path={`/luggage`} component={lazy(() => import(`./arrivals-views/index.views`))}/>
                <PrivateRoute path={`/on-boarding`} component={lazy(() => import(`./on-boarding-views/index.views`))}/>
                <PrivateRoute path={`/arrival`} component={lazy(() => import(`./arrivals-views/index.views`))}/>
                <PrivateRoute path={`/check-in`} component={lazy(() => import(`./check-in-views/index.views`))}/>
                <PrivateRoute path={`/belt`} component={lazy(() => import(`./belt-views/index.views`))}/>
                <PrivateRoute path={`/`} exact component={lazy(() => import(`./home`))}/>
                <Route component={lazy(() => import('../../components/layout-components/not-found.page.js'))}/>
            </Switch>
        </Suspense>
    )
}

export default React.memo(AppViews);