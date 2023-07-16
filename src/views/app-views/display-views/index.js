import React, {lazy, Suspense} from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import Loading from "components/shared-components/Loading";
import PrivateRoute from "../../../permissions/PrivateRoute";

function DisplayViews({match}){
    return (
        <Suspense fallback={<Loading cover="content"/>}>
            <Switch>
                {/*<Route path={`${match.url}`} component={lazy(() => import(`./arrival/index`))}/>*/}
                <Route path={`${match.url}/arrival`} component={lazy(() => import(`./arrival/index`))}/>
                <Route component={lazy(() => import('../../../components/layout-components/not-found.page.js'))}/>
            </Switch>
        </Suspense>
    )
}

export default DisplayViews