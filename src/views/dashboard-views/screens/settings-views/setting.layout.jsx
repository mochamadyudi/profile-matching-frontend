import React, {Component, useEffect} from 'react';
import { connect } from 'react-redux';
import HeroComponents from "../../../../components/layout-components/CustomrPageHeaderAlt";
import ButtonPermission from "../../../../components/permission-components/button.permission";
import ContainerTailwind from "../../../../components/layout-components/ContainerTailwind";
import InnerAppLayout from "../../../../layouts/inner-app-layout";
import {Link, useHistory} from "react-router-dom";
import * as PropTypes from "prop-types";
import {Menu} from "antd";
import {LockOutlined, SettingOutlined, UserOutlined, UserSwitchOutlined} from "@ant-design/icons";
import {GetGeneralSetting} from "../../../../redux/actions/Settings";


const menuItems = [
	{
		pathname:'/dashboard/settings/edit-profile',
		label:"Edit Profile",
		icon:<UserSwitchOutlined />,
		Pages: React.lazy(()=> import('../settings-views/screens/edit-profile.setting'))
	},
	{
		pathname:'/dashboard/settings/change-password',
		label:"Change Password",
		icon:<LockOutlined />,
		Pages: React.lazy(()=> import('../settings-views/screens/edit-profile.setting'))
	},
	{
		pathname:'/dashboard/settings/announcement',
		label:"Announcement",
		icon:<SettingOutlined />,
		Pages: React.lazy(()=> import('../settings-views/screens/edit-profile.setting'))
	},
	{
		pathname:'/dashboard/settings/options',
		label:"General",
		icon:<SettingOutlined />,
		Pages: React.lazy(()=> import('../settings-views/screens/edit-profile.setting'))
	},
	{
		pathname:'/dashboard/settings/license',
		label:"License",
		icon:<SettingOutlined />,
		Pages: React.lazy(()=> import('../settings-views/screens/edit-profile.setting'))
	},
]


function mapStateToProps(state) {
 return {

 };
}

function SettingOptions({match,location}){
	return (
		<Menu
			defaultSelectedKeys={`${match.url}/edit-profile`}
			mode="inline"
			selectedKeys={[location.pathname]}
		>
			{
				menuItems.map((item,index)=> (
					<Menu.Item key={`${item.pathname}`}>
						{
							item?.icon && item?.icon
						}
						<span>{item.label}</span>
						<Link to={`${item.pathname}`} />
					</Menu.Item>
				))
			}
		</Menu>
	)
}

SettingOptions.propTypes = {
	match: PropTypes.shape({url: PropTypes.string}),
	location: PropTypes.shape({pathname: PropTypes.any})
};

function SettingLayout(props)  {
	let { GetGeneralSetting } = props
	const history = useHistory();
	
	useEffect(()=> {
		GetGeneralSetting({params:{page:1,
				limit:200}})
	},[GetGeneralSetting])
  return (
   <div>
	   <HeroComponents
		   loading={false}
		   name={props?.name ?? ""}
		   positionName={props?.positionName ?? ['Settings']}
		   positionColor={'cyan'}
		   thumbnail={null}
	   />
	   
	   <ContainerTailwind style={{marginTop:90}}>
		   <InnerAppLayout
			   sideContentWidth={320}
			   sideContent={<SettingOptions
				   match={{url:"/dashboard/settings"}}
				   location={{pathname:history.location?.pathname}}
			   />}
			   mainContent={props.children}
		   />
	   </ContainerTailwind>
   </div>
  );
}

export default connect(
 mapStateToProps,{GetGeneralSetting}
)(SettingLayout);