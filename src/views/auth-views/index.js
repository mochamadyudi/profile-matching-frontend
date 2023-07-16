import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { AUTH_PREFIX_PATH } from 'configs/AppConfig'
import CheckAuthRoute from "../../permissions/CheckAuthRoute";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="page"/>}>
      <Switch>
        <CheckAuthRoute path={`${AUTH_PREFIX_PATH}/login`} component={lazy(() => import(`./authentication/login`))} />
        <CheckAuthRoute path={`${AUTH_PREFIX_PATH}/register`} component={lazy(() => import(`./authentication/register-1`))} />
        <Redirect from={`${AUTH_PREFIX_PATH}`} to={`${AUTH_PREFIX_PATH}/login`} />
      </Switch>
    </Suspense>
  )
}

export default AppViews;

