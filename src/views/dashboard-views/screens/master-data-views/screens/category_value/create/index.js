import React, { useState } from 'react';
import { connect } from 'react-redux';
import HeroComponents from "components/layout-components/CustomrPageHeaderAlt";
import ButtonPermission from "components/permission-components/button.permission";
import ContainerTailwind from "components/layout-components/ContainerTailwind";
import {Card, Col,Row,message,Form,Input} from "antd";
import ApiService from "services/api.service";


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
function Index()  {
	
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
			<HeroComponents
				loading={loading}
				name={"Create"}
				positionName={['Master Data','Category Value']}
				thumbnail={null}
				extra={<>
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
				</>}
			/>
			
			<div style={{marginTop:90}}>
				<ContainerTailwind>
					<Card bordered={false}>
						<Form
							form={form}
							layout={'vertical'}
						>
							<Row gutter={24}>
								<Col span={12}>
									<Form.Item name={'name'} label={'Category Name'} rules={rules.name} hasFeedback>
										<Input placeholder={'input your category name'} autoComplete={'off'}/>
									</Form.Item>
								</Col>
								<Col span={6}>
								</Col>
								<Col span={24}>
									<Form.Item name={'description'} label={'Description'} hasFeedback rules={rules.description}>
										<Input.TextArea
											placeholder={'input your description'}
											showCount
											maxLength={900}
											autoSize={{ minRows: 8, maxRows: 10}}
											allowClear
											bordered={true}
											size={'small'}
										/>
									</Form.Item>
								</Col>
							</Row>
						</Form>
					</Card>
				</ContainerTailwind>
			</div>
		</React.Fragment>
	);
}

export default connect(
	mapStateToProps,
)(Index);