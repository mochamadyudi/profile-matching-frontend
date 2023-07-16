import React, { useState } from 'react';
import { connect } from 'react-redux';
import HeroComponents from "components/layout-components/CustomrPageHeaderAlt";
import ButtonPermission from "components/permission-components/button.permission";
import ContainerTailwind from "components/layout-components/ContainerTailwind";
import {Card, Col, Row, message, Form, Input, Button} from "antd";
import ApiService from "services/api.service";
import SettingLayout from "../setting.layout";
import Utils from "../../../../../utils";
import {ArrowLeftOutlined, LockOutlined} from "@ant-design/icons";
import Flex from "../../../../../components/shared-components/Flex";
import {useHistory} from "react-router-dom";


function mapStateToProps(state) {
	return {
	
	};
}

const rules = {
	name: [
		{
			required: true,
			message: 'Please input your category name'
		},
	],
	status: [
		{
			required: true,
			message: 'Please input your status'
		}
	],
	description: [
		{
			required: true,
			message: 'Please input your description'
		}
	],
	
}
function ChangePasswordSetting()  {
	
	const history = useHistory();
	
	const [loading,setLoading] = useState(false)
	const [ form ] = Form.useForm()
	const onFinish = ()=> {
		setLoading(true)
		let key = 'created'
		message.loading({
			key,
			content:"Loading...",
			duration:4
		})
		form.validateFields()
			.then((value)=> {
				new ApiService({
					url:`/api/v1/`,
					body:value
				}).post()
					.then((response)=> {
						if(response?.message){
							message.success({
								key,
								content:response?.message ?? "Successfully created category",
								duration:3
							})
						}else{
							message.error({
								key,
								content:response?.message ?? "Error: created category",
								duration:3
							})
						}
						setLoading(false)
					})
					.catch((err)=> {
						message.error({
							key,
							content:err?.message ?? "Error: created category",
							duration:3
						})
						setLoading(false)
					})
			})
			.catch((err)=> {
				message.error(err?.message ?? "Some Error")
			})
	}
	return (
		<React.Fragment>
			<SettingLayout name={'Change Password'} positionName={'Settings'} >
				
				<Flex alignItems={'center'} justifyContent={'start'} className={'mb-4'}>
					<Button type={'link'} onClick={()=> history.goBack()} icon={<ArrowLeftOutlined/>}>Back</Button>
				</Flex>
				
				<h2>Change Password</h2>
				<Form
					form={form}
					layout={'vertical'}
				>
					<Row gutter={24}>
						<Col xs={24} md={24}>
							<Form.Item
								name={"old_password"}
								label={'Old Password'}
								rules={[
									Utils.rules('initial').instance("Required!")
								]}
							>
								<Input.Password prefix={<LockOutlined className="text-primary"/>}/>
							</Form.Item>
						</Col>
						<Col xs={24} md={12}>
							<Form.Item
								hasFeedback
								name={'new_password'}
								label={'Password'}
								rules={[
									Utils.rules('initial').instance("Required!"),
									Utils.rules('password').instance,
								]}>
								<Input.Password placeholder={'input Password'}/>
							</Form.Item>
						</Col>
						<Col xs={24} md={12}>
							
							<Form.Item
								hasFeedback
								name={"confirm_password"}
								label={'Confirm Password'}
								rules={[
									Utils.rules('initial').instance,
									Utils.rules('validatePassword').instance('new_password')
								]}>
								<Input.Password placeholder={'input username'}/>
							</Form.Item>
						</Col>
					
					</Row>
				</Form>
				<ButtonPermission
					permission={['admin']}
					theme={{
						type: "notification",
						property: {
							description:"Mohon maaf nada tidak dapat melakukan aksi",
							message: "Access Denied"
						}
					}}
					config={{
						loading:loading,
						onClick:onFinish,
						type: "primary",
						size: "small"
					}}>
					Create
				</ButtonPermission>
			</SettingLayout>
		</React.Fragment>
	);
}

export default connect(
	mapStateToProps,
)(ChangePasswordSetting);