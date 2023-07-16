import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Route} from "react-router-dom";
import {AUTH_PREFIX_PATH} from "../configs/AppConfig";
import Loading from "../components/shared-components/Loading";
import {createBrowserHistory} from "history";
import LottieLoading from "../components/animated-components/lottie-loading";
import LoadingAuthComponent from "../components/layout-components/loading-auth.component";
import PreloaderText from "../components/animated-components/preloader-text";

function PrivateRoute({component: Component, children, isAuthenticated, token, Settings, loading, ...rest}) {

    return (
        <Route
            {...rest}
            history={createBrowserHistory}
            render={(props) => {
                let {location} = props
                return loading ? (
                        <LoadingAuthComponent
                            cover={'page'}
                            title={<PreloaderText
                                text={`${location?.pathname}`.includes('/monitoring') ? "Monitoring" : 'Authentication'}
                                dots={3}
                                speed={600}
                            />}
                            message={'Mohon tunggu, sedang melakukan pengecekan session'}
                        />
                    ):
                    isAuthenticated ? (
                        <Component {...props}/>
                    ): (
                        <Redirect to={{pathname: '/auth/login', state: {from: location}}}/>
                    )
            }}
        />
    );
}

export default connect(({auth, Settings}) => {
    let {loading, isAuthenticated, token} = auth
    return {loading, isAuthenticated, token, Settings}
}, {})(PrivateRoute)
