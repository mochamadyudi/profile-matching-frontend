import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { connect } from 'react-redux'
import { 
  EditOutlined, 
  SettingOutlined,
  LogoutOutlined 
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import { signOut } from 'redux/actions/Auth';
import {Link} from "react-router-dom";


export const NavProfile = (props) => {
  let {signOut,auth} = props
  let { profile } = auth
  const menuItem = [
    {
      title: "Edit Profile",
      icon: EditOutlined ,
      path: "/dashboard/settings/edit-profile"
    },
    
    {
      title: "Setting",
      icon: SettingOutlined,
      path: "/dashboard/settings/options"
    }
  ]
  const profileImg = "/img/avatars/thumb-1.jpg";

  return (
    <>
      <Dropdown placement="bottomRight" overlay={<div className="nav-profile nav-dropdown">
        <div className="nav-profile-header">
          <div className="d-flex">
            <div style={{minWidth:45}}>
              <Avatar size={45} src={profileImg} />
            </div>
            <div className="pl-3 !mk-overflow-x-hidden">
              <h4 className="mb-0 !mk-truncate">{[profile?.first_name,profile?.last_name].join(' ') ?? "-"}</h4>
              <span className="text-muted">{profile?.email ?? "-"}</span>
            </div>
          </div>
        </div>
        <div className="nav-profile-body">
          <Menu>
            {menuItem.map((el, i) => {
              return (
                <Menu.Item key={i}>
                  <Link to={el.path}>
                    <a rel={'noopener'}>
                      <Icon type={el.icon} />
                      <span className="font-weight-normal">{el.title}</span>
                    </a>
                  </Link>
                
                </Menu.Item>
              );
            })}
            <Menu.Item key={menuItem.length + 1} onClick={e => signOut()}>
            <span>
              <LogoutOutlined />
              <span className="font-weight-normal">Sign Out</span>
            </span>
            </Menu.Item>
          </Menu>
        </div>
      </div>} trigger={["click"]}>
        
        <Menu className="d-flex align-item-center" mode="horizontal">
          <Menu.Item key="profile">
            <Avatar src={profileImg} />
          </Menu.Item>
        </Menu>
      </Dropdown>
    </>

  );
}

export default connect(function({auth}){
  let { profile, isAuthenticated} = auth
  return { profile, isAuthenticated,auth }
}, {signOut})(NavProfile)
