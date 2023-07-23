import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import HeroComponents from "components/layout-components/CustomrPageHeaderAlt";
import ButtonPermission from "components/permission-components/button.permission";
import ContainerTailwind from "components/layout-components/ContainerTailwind";
import {Card, Col, Row, message, Form, Input, Switch, Select} from "antd";
import ApiService from "services/api.service";
import Flex from "../../../components/shared-components/Flex";
import {EllipsisOutlined} from "@ant-design/icons";
import {useParams} from "react-router-dom";


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
function Create()  {
	
	const { id } = useParams()
	
	const [ form ] = Form.useForm()
	const [loading,setLoading] = useState(false)
	
	
	const [ params, setParams]= useState({
		page:1,
		limit:100
	})
	const [ pagination, setPagination ] = useState({
		page:1,
		limit:100
	})
	const [ criteria, setCriteria] = useState([])
	const [ data, setData] = useState([])
	const [ metaData, setMetaData ] = useState({})
	useEffect(()=> {
		setLoading(true)
		new ApiService({
			url:`/api/v1/travel/${id}`,
			config : {
				params : {
					...params
				}
			}
		}).get()
			.then((response)=> {
				setMetaData({...response?.data})
				setCriteria([...response?.data?.criteria.map((item)=> ({
					criteriaId:item?.id,
					travelId:item?.travelId,
					label:item?.label,
					description:item?.description,
					value:0
				}))])
				setPagination({
					...pagination,
					...response?.pagination,
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
				value.criteria = value.criteria.map((item)=> {
					return {
						criteriaId:item?.criteriaId,
						value:item?.value
					}
				})
				setLoading(false)
				new ApiService({
					url:`/api/v1/user/travel`,
					body:value
				}).post()
					.then((response)=> {
						if(!response?.error){
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
						form.resetFields()
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
				name={metaData?.name ?? "Tambah"}
				positionName={`${metaData?.location}`.split(' ')}
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
			<Form
				form={form}
				layout={'vertical'}
				initialValues={{
					criteria : criteria ?? [],
					category: []
				}}
			>
			<div style={{marginTop:90}}>
				<ContainerTailwind>
					<Row gutter={24}>
						<Col xs={24} lg={16}>
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
																hidden
																name={[field.name, 'criteriaId']}
																fieldKey={[field.fieldKey, 'criteriaId']}
																rules={[{required: true, message: "Can't be empty!"}]}
																className="w-100 m-0"
																hasFeedback
																initialValue={data[index]?.data?.name ?? ""}
																style={{width:'100%'}}
															>
																<Input style={{width:"100%"}} disabled defaultValue={data[index]?.data?.name}/>
															</Form.Item>
															<Form.Item
																{...field}
																hidden
																name={[field.name, 'travelId']}
																fieldKey={[field.fieldKey, 'travelId']}
																rules={[{required: true, message: "Can't be empty!"}]}
																className="w-100 m-0"
																hasFeedback
																initialValue={data[index]?.data?.name ?? ""}
																style={{width:'100%'}}
															>
																<Input style={{width:"100%"}} disabled defaultValue={data[index]?.data?.name}/>
															</Form.Item>
															<Form.Item
																{...field}
																name={[field.name, 'label']}
																fieldKey={[field.fieldKey, 'label']}
																rules={[{required: true, message: "Can't be empty!"}]}
																className="w-100 m-0"
																hasFeedback
																initialValue={data[index]?.data?.name ?? ""}
																style={{width:'100%'}}
															>
																<Input style={{width:"100%"}} disabled defaultValue={data[index]?.data?.name}/>
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
					</Row>
				</ContainerTailwind>
			</div>
			</Form>
		</React.Fragment>
	);
}

export default connect(
	mapStateToProps,
)(Create);