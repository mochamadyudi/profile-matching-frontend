import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import HeroComponents from "components/layout-components/CustomrPageHeaderAlt";
import ButtonPermission from "components/permission-components/button.permission";
import ContainerTailwind from "components/layout-components/ContainerTailwind";
import {Button, Card, Table, Tooltip} from "antd";
import {DeleteOutlined, EyeOutlined, FilterOutlined,PlusOutlined} from "@ant-design/icons";
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
		limit:5
	})
	const [ pagination, setPagination ] = useState({
		page:1,
		limit:10
	})
	const [ data, setData] = useState([])
	
	useEffect(()=> {
		setLoading(true)
		new ApiService({
			url:`/api/v1/master-data/category`,
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
					...response?.pagination,
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
			key:'category.id',
			title:'No',
			dataIndex:'id',
			render: (_,val,index)=> index + 1
		},
		{
			key:'category.name',
			title:'Name',
			dataIndex:'name'
		},
		{
			key:'category.color',
			title:'Color',
			dataIndex:"color"
		},
		{
			key:'category.background',
			title:'Background',
			dataIndex:"background"
		},
		{
			title: '',
			dataIndex: 'id',
			render: (_, elm) => (
				<div className="text-right d-flex justify-content-end">
					<Tooltip title="View">
						<Button
							onClick={()=> {
								
							}}
							type="primary" className="mr-2" icon={<EyeOutlined/>} size="small"/>
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
	return (
		<React.Fragment>
			<HeroComponents
				loading={false}
				name={"Overview"}
				positionName={['Master Data','Category']}
				thumbnail={null}
				extra={<>
					<Button
						size={'small'}
						icon={<PlusOutlined/>}
						type={'primary'} onClick={()=> history.push(`/dashboard/master-data/category/create`)}>
						Add Category
					</Button>
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
								total:pagination?.total_record ?? 0,
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