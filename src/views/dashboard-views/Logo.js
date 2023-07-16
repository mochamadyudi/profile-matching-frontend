import React, {useEffect, useState} from 'react'
import { SIDE_NAV_WIDTH, SIDE_NAV_COLLAPSED_WIDTH, NAV_TYPE_TOP } from 'constants/ThemeConstant';
import { APP_NAME } from 'configs/AppConfig';
import { connect } from "react-redux";
import utils from 'utils';
import { Grid } from 'antd';
import {first} from "lodash";
import Utils from "utils";

const { useBreakpoint } = Grid;

const getLogoWidthGutter = (props, isMobile) => {
  const { navCollapsed, navType } = props;
  const isNavTop = navType === NAV_TYPE_TOP ? true : false
  if(isMobile && !props.mobileLogo) {
    return 0
  }
  // if(isNavTop) {
  //   return 'auto'
  // }
  if(navCollapsed) {
    return `${SIDE_NAV_COLLAPSED_WIDTH}px`
  } else {
    return `${SIDE_NAV_WIDTH}px`
  }
}

const getLogo = (props) => {
  const { navCollapsed, logoType } = props;
  if(logoType === 'light') {
    if(navCollapsed) {
      return '/logo.png'
    }
    return '/logo.png'
  }

  if (navCollapsed) {
    return '/logo-ai.png'
  }
  return '/logo.png'
}

const getLogoDisplay = (isMobile, mobileLogo) => {
  if(isMobile && !mobileLogo) {
    return 'd-none'
  } else {
    return 'logo'
  }
}

export const Logo = (props) => {
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg')
  let { site } = props
  return (
    <div
      className={[getLogoDisplay(isMobile, props.mobileLogo),'d-flex align-items-center justify-content-start'].join(' ')}
      style={{width: `${getLogoWidthGutter(props, isMobile)}`}}>
      {
        site?.loading ? "Loading...":
          !site?.data ?
            <img src={getLogo(props)} alt={`${APP_NAME} logo`} style={{
              height:'28px',
              margin:'0 15px',
              objectPosition:'left center',
              objectFit:'contain'
            }}/>
          :
            isMobile ? null :
              props?.navCollapsed ?
                <h1 className={'m-0 p-0 !mk-text-xl !mk-text-center px-4'}>{Utils.getNameInitial(site?.data)}</h1> :
                <h1 className={'m-0 p-0 !mk-text-xl !mk-text-center px-4'}>{site?.data ?? site?.opt_value ?? "-"}</h1>
            
      }
    </div>
  )
}

const mapStateToProps = ({ theme, Settings }) => {
  let { collections,site } = Settings
  let { general } = collections
  const { navCollapsed, navType } =  theme;
  return { navCollapsed, navType, general,site }
};

export default connect(mapStateToProps)(Logo);
