import React, {useEffect} from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from 'layouts/auth-layout';
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from 'antd';
import {APP_PREFIX_PATH, AUTH_PREFIX_PATH, DASHBOARD_PREFIX_PATH} from 'configs/AppConfig'
import useBodyClass from 'hooks/useBodyClass';
import DashboardLayout from "./dashboard-views/dashboard.layout";
import {GetPath} from "../utils";
import moment from "moment/moment";
import 'moment/locale/id';
import UseAuth from "../hooks/use-auth";
import {SocketConnect, SocketDisconnect} from "../redux/actions/websocket.action";
import {GetGeneralSetting, getSite} from "../redux/actions/Settings";
import {LoadUser} from "../redux/actions/Auth";

/**
 * @typedef CALC_GAP
 * @property {number} id
 * @property {number} gap
 * @property {number} weight
 */
export const Views = (props) => {
  
  let { SocketConnect, SocketDisconnect,LoadUser,site, getSite, GetGeneralSetting} = props
  moment.locale('id');
  const { locale, location, direction } = props;
  const currentAppLocale = AppLocale[locale];
  useBodyClass(`dir-${direction}`);

  useEffect(()=> {
    SocketConnect(`/ws/${Math.random()}`)
    return ()=> SocketDisconnect();
  },[])

  useEffect(()=> {
    LoadUser()
  },[LoadUser])
  
  useEffect(()=> {
    if(!site?.loading){
      document.title = [site?.opt_value,process.env.REACT_APP_TITLE].join(' | ') ?? process.env.REACT_APP_TITLE ?? "SKRIPSI"
    }
  },[site])
  
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <UseAuth>
          <Switch>
            <Route path={DASHBOARD_PREFIX_PATH}>
              <DashboardLayout direction={direction} location={location}/>
            </Route>
            <Route path={AUTH_PREFIX_PATH}>
              <AuthLayout direction={direction} />
            </Route>
            <Route path={'/'}>
              <Redirect to={DASHBOARD_PREFIX_PATH}/>
            </Route>

          </Switch>
        </UseAuth>
      </ConfigProvider>
    </IntlProvider>
  )
}

const mapStateToProps = ({ theme, auth,Settings }) => {
  const { locale, direction } =  theme;
  let { site } = Settings
  const { token } = auth;
  return { locale, token, direction, site }
};

export default withRouter(connect(mapStateToProps,{LoadUser, SocketConnect,SocketDisconnect,getSite,GetGeneralSetting})(Views));
