import React, {lazy, Suspense} from "react";
import {Switch, Route} from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import PrivateRoute from "../../../permissions/PrivateRoute";

export const BeltViews = ({match}) => {

    return (
        <Suspense fallback={<Loading cover="content"/>}>
            <Switch>
                <PrivateRoute path={[match.url , '/'].join('')} exact component={lazy(() => import(`./index`))}/>
                <Route component={lazy(() => import('components/layout-components/not-found.page.js'))}/>
            </Switch>
        </Suspense>
    )
}

export default BeltViews;