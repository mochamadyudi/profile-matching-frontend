import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import HeroComponents from "components/layout-components/CustomrPageHeaderAlt";
import ButtonPermission from "components/permission-components/button.permission";
import ContainerTailwind from "components/layout-components/ContainerTailwind";
import {Button, Card, Table, Tag, Tooltip} from "antd";
import {DeleteOutlined, EyeOutlined, FilterOutlined} from "@ant-design/icons";
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
	
	useEffect(()=> {
		setLoading(true)
		new ApiService({
			url:`/api/v1/user/history`,
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
	},[params])
	
	
	const columns = [
		{
			key:'id',
			title:'ID',
			width:70,
			dataIndex:'userId',
			render: (_,val,index)=> index + 1
		},
		{
			key:'name',
			title:'Travel Name',
			dataIndex:['travel','name']
		},
		{
			key:'category',
			title:'Category',
			width:150,
			dataIndex:['category','name']
		},
		{
			key:'criterias',
			title:'Criteria',
			dataIndex:'criterias',
			children:[
				{
					key:"criteria.total",
					title:"Total",
					dataIndex:'criterias',
					render: (_)=> {
						return Array.isArray(_) ? _.length : 0
					}
				},
				{
					key:"criteria.total",
					title:"compare At Value",
					dataIndex:'criterias',
					render: (_)=> {
						return Array.isArray(_) ? `[${_.map((item)=> `${item?.compareAtValue - item?.value}`).join(', ')}]`: 0
					}
				},
			]
		},
		
		{
			title: '',
			dataIndex: ['travel'],
			render: (_, elm) => (
				<div className="text-right d-flex justify-content-end">
					<Tooltip title="View">
						<Button
							onClick={()=> {
								history.push(`/dashboard/travel/${_?.id}/calculate`)
							}}
							type="primary" className="mr-2" icon={<EyeOutlined/>} size="small"/>
					</Tooltip>
				</div>
			)
		}
	]
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