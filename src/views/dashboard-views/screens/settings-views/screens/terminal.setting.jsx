import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import HeroComponents from "components/layout-components/CustomrPageHeaderAlt";
import ButtonPermission from "components/permission-components/button.permission";
import ContainerTailwind from "components/layout-components/ContainerTailwind";
import {Button, Card, Table, Tooltip} from "antd";
import {DeleteOutlined, EyeOutlined, FilterOutlined} from "@ant-design/icons";
import { useHistory } from 'react-router-dom'
import ApiService from "services/api.service";
import Terminal from "terminal-in-react";


function mapStateToProps(state) {
	return {
	
	};
}

function TerminalSetting()  {
	const history = useHistory()
	const [loading,setLoading]= useState(true)
	const [ params, setParams]= useState({
		page:1,
		limit:20
	})
	return (
		<React.Fragment>
			<HeroComponents
				loading={false}
				name={"Overview"}
				positionName={['Sales','Order']}
				thumbnail={null}
				extra={<></>}
			/>
			
			<div style={{marginTop:90}}>
				<ContainerTailwind>
					<Card extra={
						<div className={'text-right`'}>
							<ButtonPermission
								permission={['admin']}
								theme={{
									type: "disabled",
									property: {
										message: "Access Denied"
									}
								}}
								config={{
									type: "primary",
									size: "small",
									ghost:true,
									icon: <FilterOutlined/>
								}}>
								Filter
							</ButtonPermission>
						</div>
					}>
						<Terminal
							color='white'
							backgroundColor='black'
							barColor='black'
							style={{ fontWeight: "bold", fontSize: "2em",width:"100%" }}
							commands={{
								'open-google': () => window.open('https://www.google.com/', '_blank'),
								showmsg: "HELLOOOWWW",
								popup: () => alert('Terminal in React')
							}}
							descriptions={{
								'open-google': 'opens google.com',
								showmsg: 'shows a message',
								alert: 'alert', popup: 'alert'
							}}
							msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'
						/>
					</Card>
				</ContainerTailwind>
			</div>
		</React.Fragment>
	);
}

export default connect(
	mapStateToProps,
)(TerminalSetting);