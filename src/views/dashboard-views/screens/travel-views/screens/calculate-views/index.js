import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import HeroComponents from "components/layout-components/CustomrPageHeaderAlt";
import ButtonPermission from "components/permission-components/button.permission";
import ContainerTailwind from "components/layout-components/ContainerTailwind";
import {Button, Card, Divider, Table, Tooltip} from "antd";
import {DeleteOutlined, EyeOutlined, FilterOutlined} from "@ant-design/icons";
import {useHistory, useParams} from 'react-router-dom'
import ApiService from "services/api.service";
import {DeleteObjKey} from "../../../../../../utils";
import {first} from "lodash";


function mapStateToProps(state) {
	return {};
}

function Index() {
	let {id} = useParams()
	const history = useHistory()
	const [loading, setLoading] = useState(true)
	const [params, setParams] = useState({
		page: 1,
		limit: 20
	})
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10
	})
	const [data, setData] = useState([])
	
	const [loadingMd, setLoadingMd] = useState(false)
	const [dataMd, setDataMd] = useState([])
	
	const [detailTravel, setDetailTravel] = useState([])
	
	useEffect(() => {
		setLoading(true)
		new ApiService({
			url: `/api/v1/travel/${id}/summary`,
			config: {
				params: {
					...params
				}
			}
		}).get()
			.then((response) => {
				setData([...response?.data])
				setPagination({
					...pagination,
					...response?.paginate
				})
				setLoading(false)
			})
			.catch((err) => {
				setLoading(false)
				setData([])
			})
	}, [params])
	useEffect(() => {
		new ApiService({
			url: `/api/v1/travel/${id}`,
			config: {
				params: {
					...params
				}
			}
		}).get()
			.then((response) => {
				setDetailTravel([...response?.data?.criteria])
			})
			.catch((err) => {
			
			})
	}, [params])
	
	
	useEffect(() => {
		setLoadingMd(true)
		new ApiService({
			url: `/api/v1/master-data/criteria`,
			config: {
				params: {
					...params
				}
			}
		}).get()
			.then((response) => {
				setDataMd([...response?.data])
				setLoadingMd(false)
			})
			.catch((err) => {
				setLoadingMd(false)
				setDataMd([])
			})
	}, [data])
	
	
	const columns = [
		{
			key: 'id',
			title: 'User ID',
			dataIndex: 'userId'
		},
		{
			key: 'id',
			title: 'Email',
			dataIndex: 'email'
		},
		{
			key: 'name',
			title: 'Name',
			dataIndex: 'fullName'
		},
		{
			key: 'criteriaTotal',
			title: 'Bobot Criteria Total',
			dataIndex: 'criteriaTotal'
		},
		{
			key: 'userCriteriaTotal',
			title: 'Bobot User Criteria Total',
			dataIndex: 'userCriteriaTotal'
		},
		{
			key: 'total',
			title: 'Askep Penilaian',
			dataIndex: 'data',
			render: (_) => _.length ? `${_?.length} Item` : "-"
		},
	
	]
	
	
	let gapColumn = []
	
	
	function ColumnDataGap(arr = [ ], masterData = [], aspek = []){
		
		let newColumn = [
			{
				fixed:"left",
				key:"label",
				title: "Label",
				dataIndex:"label",
				render:(_)=> <p className={'!mk-whitespace-nowrap'}>{_?.replace(/-/g,' ')}</p>
			}
		]
		let newData = []
		let GapWisata = {
			label: "TARGET NILAI WISATA",
			values: {},
			isGap:true
		}
		
		aspek.map((item)=> {
			let label = `${item?.label}`.replace(/ /g,'-').toLowerCase()
			Reflect.set(GapWisata.values,label, item?.value)
			newColumn.push({
				key:label,
				title:function(){
					return <p className={'!mk-whitespace-nowrap'}>{label.replace(/-/g,' ')}</p>
				},
				dataIndex:['values',label]
			})
			return item
		})
		newData = arr.map((item)=> {
			let field = {
				isCalculate: false,
			}
			let values = {}
			Reflect.set(field,'label',item?.fullName)
			item?.data.map((child)=> {
				Reflect.set(values,`${child?.label}`.replace(/ /g,'-').toLowerCase(),child?.compareValue)
				return child
			})
			Reflect.set(field,'values',values)
			return field
		})
		
		newData.push(GapWisata)
		newData = newData.concat(arr.map((item)=> {
			let field = {
				isCalculate: true,
			}
			let values = {}
			Reflect.set(field,'label',item?.fullName)
			item?.data.map((child)=> {
				Reflect.set(values,`${child?.label}`.replace(/ /g,'-').toLowerCase(),child?.compareValue - child?.value)
				return child
			})
			Reflect.set(field,'values',values)
			// Reflect.set(field,'data',item.data)
			return field
		}))
		
		return { column : newColumn ?? [], data: newData ?? []}
	}
	
	ColumnDataGap(data,dataMd,detailTravel)
	
	return (
		<React.Fragment>
			<HeroComponents
				loading={false}
				name={"Overview"}
				positionName={['Sales', 'Order']}
				thumbnail={null}
				extra={<></>}
			/>
			
			<div style={{marginTop: 90}}>
				
				{/*<pre>{JSON.stringify(dataMd,null,2)}</pre>*/}
				<ContainerTailwind>
					<Card className={'table overflow-hidden'} extra={
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
									ghost: true,
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
								pageSize: params?.limit,
								current: params?.page,
								total: pagination?.total_items ?? 0,
								onChange: function (page, pageSize) {
									setParams({
										...params,
										page,
										limit: pageSize
									})
								}
							}}
						/>
					</Card>
					{
						!loadingMd &&
						dataMd && Array.isArray(dataMd) && dataMd.length > 0 && (
							<Card title={'GAP Nilai - Nilai Ketetapan'}>
								<Table
									className={'table !mk-overflow-x-auto'}
									loading={loading}
									rowClassName={(record, index) => record?.isCalculate ? "!mk-bg-green-500 font-bold !mk-bg-opacity-20" : record?.isGap ? "!mk-bg-orange-400" : ""}
									dataSource={ColumnDataGap(data,dataMd,detailTravel)?.data ?? []}
									columns={ColumnDataGap(data,dataMd,detailTravel)?.column ?? []}
									pagination={false}
								/>
								
							</Card>
						)
					}
				
				</ContainerTailwind>
			</div>
		</React.Fragment>
	);
}

export default connect(
	mapStateToProps,
)(Index);