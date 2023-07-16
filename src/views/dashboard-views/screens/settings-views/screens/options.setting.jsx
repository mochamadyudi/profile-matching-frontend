import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import SettingLayout from "../setting.layout";
import Icon, {
	ArrowRightOutlined,
	TagsOutlined,
	CheckOutlined,
	CloseOutlined
} from "@ant-design/icons";
import {Button, List, Switch} from "antd";
import Flex from "../../../../../components/shared-components/Flex";
import {useHistory} from "react-router-dom";
import {onSwitchTheme,onHeaderNavColorChange} from "../../../../../redux/actions";
import {useThemeSwitcher} from "react-css-theme-switcher";


function OptionsSetting(props)  {
	let { currentTheme,onSwitchTheme,onHeaderNavColorChange } = props
	const history = useHistory()
	const { switcher, themes } = useThemeSwitcher();
	const config = [
		{
			key: 'site-name',
			title: 'Site Name',
			icon: TagsOutlined,
			onClick:()=> {
				history.push(`/dashboard/settings/options/site-name`)
			},
			isSwitch: false,
			value:null,
			desc: 'Update nama site.',
			allow: false
		},
		{
			key: 'dark-mode',
			title: 'Theme Mode',
			icon: TagsOutlined,
			onClick:(value)=> {
				onHeaderNavColorChange('')
				const changedTheme = value ? 'dark' : 'light'
				onSwitchTheme(changedTheme);
				if(localStorage.getItem('THEME_MODE')){
					localStorage.setItem('THEME_MODE',changedTheme)
				}else{
					localStorage.setItem('THEME_MODE',changedTheme ?? "light")
				}
				switcher({ theme: themes[changedTheme] });
			},
			value: currentTheme === 'dark',
			isSwitch: true,
			desc: 'Setup theme App use dark mode / light mode',
			allow: false
		},
	]
	
	useEffect(()=> {
	
	})
  return (
	  <SettingLayout positionName={['Settings']} name={'Options'}>
		  <List
			  itemLayout="horizontal"
			  dataSource={config}
			  renderItem={item => (
				  <List.Item>
					  <Flex justifyContent="between" alignItems="center" className="w-100">
						  <div className="d-flex align-items-center">
							  <Icon className="h1 mb-0 " type={item.icon} />
							  <div className="ml-3">
								  <h4 className="mb-0">{item.title}</h4>
								  <p>{item.desc}</p>
							  </div>
						  </div>
						  <div className="ml-3">
							  {
									item.isSwitch ? (
											<Switch
												checkedChildren={<CheckOutlined />}
												unCheckedChildren={<CloseOutlined />}
												onChange={()=> item.onClick(!item.value)}
												defaultChecked={item?.value ?? false}
											/>
									):
										<Button icon={<ArrowRightOutlined/>} type={'link'} ghost onClick={item.onClick}/>
							  }

						  </div>
					  </Flex>
				  </List.Item>
			  )}
		  />
	  </SettingLayout>
  );
}
const mapStateToProps = ({ theme }) => {
	const { navType, sideNavTheme, navCollapsed, topNavColor, headerNavColor, locale, currentTheme, direction } =  theme;
	return { navType, sideNavTheme, navCollapsed, topNavColor, headerNavColor, locale, currentTheme, direction }
};
export default connect(
	mapStateToProps,{ onSwitchTheme,onHeaderNavColorChange }
)(OptionsSetting);