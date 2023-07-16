import React,{lazy, Suspense} from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import Loading from "../../../components/shared-components/Loading";

function ClientsViews({match}){
    return (
        <Suspense fallback={<Loading cover="content"/>}>
            <Switch>
                <Route path={`${match.url}/list`} component={lazy(() => import(`./lists/index.page`))}/>
                <Redirect to={`${match.url}/list`} from={match.url}/>
            </Switch>
        </Suspense>
    )
}

export default ClientsViews