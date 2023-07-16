import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import HeroComponents from "components/layout-components/CustomrPageHeaderAlt";
import ButtonPermission from "components/permission-components/button.permission";
import ContainerTailwind from "components/layout-components/ContainerTailwind";
import {Card, Col, Row, message, Form, Input, Button, Select, InputNumber, Switch} from "antd";
import ApiService from "services/api.service";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Flex from "../../../../../components/shared-components/Flex";
import {DeleteOutlined, EllipsisOutlined, PlusOutlined} from "@ant-design/icons";
import {findKey} from "../../../../../utils";
import CategorySelect from "../../../components/forms/category.select";


function mapStateToProps(state) {
	return {};
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

function Index() {
	
	const [loading, setLoading] = useState(false)
	const [form] = Form.useForm()
	
	const [ params, setParams]= useState({
		page:1,
		limit:100
	})
	const [ pagination, setPagination ] = useState({
		page:1,
		limit:100
	})
	const [ data, setData] = useState([])
	const [ criteria, setCriteria] = useState([])
	
	useEffect(()=> {
		setLoading(true)
		new ApiService({
			url:`/api/v1/master-data/criteria`,
			config : {
				params : {
					...params
				}
			}
		}).get()
			.then((response)=> {
				setCriteria([...response?.data.map((item)=> ({
					label:item?.data?.name,
					description:item?.data?.description,
					value:0,
					isPrimary: item?.data?.isPrimary ?? false
				}))])
				setPagination({
					...pagination,
					...response?.pagination,
					...response?.paginate
				})
				setLoading(false)
			})
			.catch((err)=> {
				setLoading(false)
				setCriteria([])
			})
	},[params])
	
	
	const [loadingValue,setLoadingValue]= useState(true)
	const [paramsValue, setParamsValue]= useState({
		page:1,
		limit:20
	})
	const [paginationValue, setPaginationValue ] = useState({
		page:1,
		limit:10
	})
	const [dataValue, setDataValue] = useState([])
	
	useEffect(()=> {
		setLoadingValue(true)
		new ApiService({
			url:`/api/v1/master-data/category_value`,
			config : {
				params : {
					...params
				}
			}
		}).get()
			.then((response)=> {
				setDataValue([...response?.data])
				setPaginationValue({
					...pagination,
					...response?.pagination,
					...response?.paginate
				})
				setLoadingValue(false)
			})
			.catch((err)=> {
				setLoadingValue(false)
				setData([])
			})
	},[paramsValue])
	
	useEffect(()=> {
		form.resetFields()
	},[dataValue,criteria])
	
	
	const onFinish = () => {
		setLoading(true)
		let key = 'created'
		message.loading({
			key,
			content: "Loading...",
			duration: 4
		})
		form.validateFields()
			.then((value) => {
				new ApiService({
					url: `/api/v1/travel`,
					body: value
				}).post()
					.then((response) => {
						if (!response?.error) {
							message.success({
								key,
								content: response?.message ?? "Successfully created category",
								duration: 3
							})
						} else {
							message.error({
								key,
								content: response?.message ?? "Error: created category",
								duration: 3
							})
						}
						setLoading(false)
					})
					.catch((err) => {
						message.error({
							key,
							content: err?.message ?? "Error: created category",
							duration: 3
						})
						setLoading(false)
					})
			})
			.catch((err) => {
				message.error(err?.message ?? "Some Error")
			})
	}
	
	
	
	return (
		<React.Fragment>
			<HeroComponents
				loading={loading}
				name={"Create"}
				positionName={['Travel']}
				thumbnail={null}
				extra={<>
					<ButtonPermission
						permission={['admin']}
						theme={{
							type: "notification",
							property: {
								description: "Mohon maaf nada tidak dapat melakukan aksi",
								message: "Access Denied"
							}
						}}
						config={{
							loading: loading,
							onClick: onFinish,
							type: "primary",
							size: "small"
						}}>
						Create
					</ButtonPermission>
				</>}
			/>
			
			<div style={{marginTop: 90}}>
				<ContainerTailwind>
					<Form
						form={form}
						layout={'vertical'}
						initialValues={{
							criteria : criteria ?? [],
							category: []
						}}
					>
						<Row gutter={24}>
							<Col xs={24} lg={14}>
								<Card title={'Aspek Penilaian'}>
									<Form.List
										name={'criteria'}>
										{(fields, {add, remove}, test) => {
											return (
												<div className="mb-3">
													{fields.map((field, index) => (
														<div className={'bg-white p-2 rounded'} key={index}>
															<Flex alignItems={'center'} justifyContent={'between'} mobileFlex
															      className={'mk-gap-4'}>
																<div style={{
																	display: "flex",
																	alignItems: "center",
																	lineHeight: 0,
																	width: 30,
																	height: 30,
																	position: "relative"
																}}>
																	<EllipsisOutlined style={{
																		position: "absolute",
																		left: -7.5,
																		fontSize: 25,
																		transform: "rotate(90deg)"
																	}}/>
																	<EllipsisOutlined
																		style={{position: "absolute", fontSize: 25, transform: "rotate(90deg)"}}/>
																</div>
																<Form.Item
																	{...field}
																	name={[field.name, 'label']}
																	fieldKey={[field.fieldKey, 'label']}
																	rules={[{required: true, message: "Can't be empty!"}]}
																	className="w-100 m-0"
																	hasFeedback
																	initialValue={data[index]?.data?.name ?? ""}
																>
																	<Input disabled defaultValue={data[index]?.data?.name}/>
																</Form.Item>
																<Form.Item
																	{...field}
																	name={[field.name, 'isPrimary']}
																	fieldKey={[field.fieldKey, 'isPrimary']}
																	rules={[{required: true, message: "Can't be empty!"}]}
																	className="w-100 m-0"
																	hasFeedback
																	initialValue={criteria[index]?.isPrimary ?? false}
																>
																	<Switch defaultChecked={criteria[index]?.isPrimary ?? false}/>
																</Form.Item>
 
																<Form.Item
																	{...field}
																	name={[field.name, 'value']}
																	fieldKey={[field.fieldKey, 'value']}
																	rules={[{required: true, message: "Can't be empty!"}]}
																	style={{
																		width:"100%",
																		maxWidth:"150px"
																	}}
																	className={'m-0'}
																	hasFeedback
																>
																	<Select loading={loadingValue}>
																		{
																			Array.isArray(dataValue) && dataValue.length> 0 ?
																				dataValue.map((item,index)=> (
																					<Select.Option value={item?.value} key={item?.id}>{item?.name}</Select.Option>
																				)): null
																		}
																	</Select>
																</Form.Item>
																<Form.Item
																	{...field}
																	hidden
																	name={[field.name, 'description']}
																	fieldKey={[field.fieldKey, 'description']}
																	className="w-100 m-0"
																	style={{width:"100%"}}
																>
																	<Input placeholder={'Input your text'} style={{width:"100%"}}/>
																</Form.Item>
															</Flex>
														
														</div>
													))}
												</div>
											)
										}}
									</Form.List>
								</Card>
							</Col>
							<Col xs={24} lg={10}>
								<Card bordered={false}>
									<Row gutter={24}>
										<Col span={24}>
											<Form.Item name={'name'} label={'Name'} rules={rules.name} hasFeedback>
												<Input placeholder={'input your category name'} autoComplete={'off'}/>
											</Form.Item>
										</Col>
										<Col span={24}>
											<Form.Item name={'location'} label={'Location'} rules={rules.name} hasFeedback>
												<Input placeholder={'input your location'} autoComplete={'off'}/>
											</Form.Item>
										</Col>
										<Col span={24}>
											<Form.Item name={'description'} label={'Description'} hasFeedback rules={rules.description}>
												<Input.TextArea
													placeholder={'input your description'}
													showCount
													maxLength={900}
													autoSize={{minRows: 8, maxRows: 10}}
													allowClear
													bordered={true}
													size={'small'}
												/>
											</Form.Item>
										</Col>
									</Row>
								</Card>
								<Card>
									<CategorySelect
										initialValue={[]}
										select={{
											mode:"tags"
										}}/>
								</Card>
							</Col>
						</Row>
					</Form>
				</ContainerTailwind>
			</div>
		</React.Fragment>
	);
}

export default connect(
	mapStateToProps,
)(Index);