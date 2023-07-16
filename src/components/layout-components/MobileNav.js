import React from "react";
import { Drawer } from "antd";
import { connect } from "react-redux";
import { onMobileNavToggle } from "redux/actions/Theme";
import Logo from "./Logo";
import Flex from "components/shared-components/Flex";
import { ArrowLeftOutlined } from "@ant-design/icons";
import SidebarDashboard from "../../views/dashboard-views/components/sidebar.dashboard";
import {Scrollbars} from "react-custom-scrollbars";

export default  connect(({theme})=> {
  let { navCollapsed, sideNavTheme, mobileNav } = theme;
  return { navCollapsed,sideNavTheme,mobileNav}
},{onMobileNavToggle})(function ({
                                                  sideNavTheme,
                                                  mobileNav,
                                                  onMobileNavToggle,
                                                  routeInfo,
                                                }){
  const props = { sideNavTheme, routeInfo };

  const onClose = () => {
    onMobileNavToggle(false);
  };

  return (
      <React.Fragment>
        <Drawer
            placement="left"
            closable={false}
            onClose={onClose}
            visible={mobileNav}
            bodyStyle={{ padding: 5 }}
        >
          <Flex flexDirection="column" className="h-100">
            <Flex justifyContent="between" alignItems="center">
              <Logo mobileLogo={true} />
              <div className="nav-close" onClick={() => onClose()}>
                <ArrowLeftOutlined />
              </div>
            </Flex>
            <div className="mobile-nav-menu">
                <Scrollbars autoHide>
                    <SidebarDashboard isMobile={true}/>
                </Scrollbars>
            </div>
          </Flex>
        </Drawer>
      </React.Fragment>
  );
})
