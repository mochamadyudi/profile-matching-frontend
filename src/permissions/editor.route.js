import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Route} from "react-router-dom";
import {AUTH_PREFIX_PATH} from "../configs/AppConfig";
import Loading from "../components/shared-components/Loading";
import {createBrowserHistory} from "history";

function EditorRoute({component: Component, children, isAuthenticated, token, Settings, loading, ...rest}) {
    return (
        <Route
            {...rest}
            history={createBrowserHistory}
            render={(props) => {
                let {location} = props
                
                return loading ? <Loading cover={'page'}/> : !isAuthenticated && !token ?
                    <Redirect to={{pathname: AUTH_PREFIX_PATH, state: {from: location}}}/> :
                    Settings?.loading?.screen?.primary ? <Loading cover={'page'}/> :
                        Settings?.isNew ? <Redirect to={{pathname: '/wedding/create', state: {from: location}}}/>
                            :
                            <Component {...props}/>
            }}
        />
    );
}

export default connect(({auth, Settings}) => {
    let {loading, isAuthenticated, token} = auth
    return {loading, isAuthenticated, token, Settings}
}, {})(EditorRoute)
