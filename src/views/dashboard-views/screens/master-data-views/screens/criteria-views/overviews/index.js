import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import HeroComponents from "components/layout-components/CustomrPageHeaderAlt";
import ButtonPermission from "components/permission-components/button.permission";
import ContainerTailwind from "components/layout-components/ContainerTailwind";
import {Button, Modal, Card, Table, Tag, Tooltip, Form, Input, Switch, message} from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	EyeOutlined,
	FilterOutlined,
	HistoryOutlined,
	PlusOutlined
} from "@ant-design/icons";
import { useHistory } from 'react-router-dom'
import ApiService from "services/api.service";


function mapStateToProps(state) {
	return {
	
	};
}

function Index()  {
	const history = useHistory()
	const [loading,setLoading]= useState(true)
	const [ params, setParams]= useState({
		page:1,
		limit:20
	})
	const [ pagination, setPagination ] = useState({
		page:1,
		limit:10
	})
	const [ data, setData] = useState([])
	const [ visible, setVisible ] = useState(false)
	const [ selected, setSelected ] = useState(null)
	
	
	function _caller(){
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
				setData([...response?.data])
				setPagination({
					...pagination,
					...response?.paginate
				})
				setLoading(false)
			})
			.catch((err)=> {
				setLoading(false)
				setData([])
			})
	}
	useEffect(()=> {
		_caller()
	},[params])
	
	const [ form ] = Form.useForm()
	
	function onOpenEdit(_){
		setSelected(_)
		setVisible(true)
	}
	
	useEffect(()=> {
		form.resetFields()
	},[visible])
	
	
	const columns = [
		{
			key:'criteria.id',
			title:'ID',
			dataIndex:'id',
			width:70,
			render:(_,val,index)=> index + 1
		},
		{
			key:'criteria.identifier',
			title:'Identifier',
			dataIndex:"identifier"
		},
		{
			key:'criteria.name',
			title:'Name',
			dataIndex:['data','name']
		},
		{
			key:'criteria.description',
			title:'Description',
			dataIndex:['data','description']
		},
		{
			key:'criteria.description',
			title:'Core Factor',
			dataIndex:['data','isPrimary'],
			render: (_,val,index)=> {
				return _ ? <Tag color={'cyan'}>YES</Tag>: <Tag color={'orange'}>NO</Tag>
			}
		},
		{
			title: '',
			dataIndex: 'id',
			render: (_, elm) => (
				<div className="text-right d-flex justify-content-end">
					<Tooltip title="Edit">
						<Button
							ghost
							onClick={()=> {
								onOpenEdit(elm)
							}}
							type="primary" className="mr-2" icon={<EditOutlined/>} size="small"/>
					</Tooltip>
					<Tooltip title="Delete">
						<Button danger icon={<DeleteOutlined/>} onClick={() => {
							// this.deleteUser(elm.id)
						}} size="small"/>
					</Tooltip>
				</div>
			)
		}
	]
	
	function onClose(){
		setSelected(null)
		setVisible(false)
	}
	
	function onFinish(){
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
					url:`/api/v1/master-data/criteria`,
					body:value
				}).post()
					.then((response)=> {
						if(!response?.error){
							message.success({
								key,
								content:response?.message ?? "Successfully created category",
								duration:3
							})
							form.resetFields()
						}else{
							message.error({
								key,
								content:response?.message ?? "Error: created category",
								duration:3
							})
						}
						setLoading(false)
						form.resetFields()
						setSelected(null)
						setVisible(false)
						_caller()
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
			
			<pre>{JSON.stringify(selected,null,2)}</pre>
			<Modal visible={visible} title={'Edit'} onCancel={onClose} onOk={onFinish}>
				<Form
					form={form}
				  layout={'vertical'}
					initialValues={{
						...selected,
						name: selected?.identifier
					}}
				>
					<Form.Item name={'identifier'} label={'Identifier'} hidden>
						<Input placeholder={'Input your identifier'}/>
					</Form.Item>
					<Form.Item name={'name'} label={'Identifier'} hidden>
						<Input placeholder={'Input your identifier'}/>
					</Form.Item>
					<Form.Item name={['data','name']} label={'Name'}>
						<Input placeholder={'Input your identifier'}/>
					</Form.Item>
					<Form.Item name={['data','description']} label={"Description"}>
						<Input placeholder={'Input your identifier'}/>
					</Form.Item>
					<Form.Item name={['data','isPrimary']} label={'Core Factor'} initialValue={selected?.data?.isPrimary ?? false}>
						<Switch defaultChecked={selected?.data?.isPrimary ?? false}/>
					</Form.Item>
				</Form>
			</Modal>
			
			
			<HeroComponents
				loading={false}
				name={"Overview"}
				positionName={['Sales','Order']}
				thumbnail={null}
				extra={<>
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
							ghost:false,
							onClick: function(){
								history.push(`/dashboard/master-data/criteria/create`)
							},
							icon: <PlusOutlined/>
						}}>
						Add New
					</ButtonPermission>
				</>}
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
									onClick: _caller,
									type: "primary",
									size: "small",
									ghost:true,
									icon: <HistoryOutlined/>
								}}>
								Reload
							</ButtonPermission>
						</div>
					}>
						<Table
							loading={loading}
							dataSource={data}
							columns={columns}
							pagination={{
								pageSize:params?.limit,
								current: params?.page,
								total:pagination?.total_items ?? 0,
								onChange: function (page,pageSize){
									setParams({
										...params,
										page,
										limit: pageSize
									})
								}
							}}
						/>
					</Card>
				</ContainerTailwind>
			</div>
		</React.Fragment>
	);
}

export default connect(
	mapStateToProps,
)(Index);