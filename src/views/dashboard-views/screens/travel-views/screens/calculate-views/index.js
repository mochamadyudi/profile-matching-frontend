import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import HeroComponents from "components/layout-components/CustomrPageHeaderAlt";
import ButtonPermission from "components/permission-components/button.permission";
import ContainerTailwind from "components/layout-components/ContainerTailwind";
import {Button, Card, Col, Descriptions, Divider, Empty, Modal, Row, Table, Tooltip} from "antd";
import {DeleteOutlined, EyeOutlined, FilterOutlined} from "@ant-design/icons";
import {useHistory, useParams} from 'react-router-dom'
import ApiService from "services/api.service";
import {DeleteObjKey} from "../../../../../../utils";
import {first} from "lodash";
import Konversi from "./konversi";
import Ncf from "./ncf";
import Nsf from "./nsf";
import Top10 from "./top-10";
import ReactJSON from "react-json-view";


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
	const [dataNcf, setDataNcf] = useState([])
	
	//gap mapping array
	const [ loadingGap,setLoadingGap] = useState(false)
	const [ dataGap, setDataGap ] = useState([])
	
	useEffect(()=> {
		setLoadingGap(true)
		new ApiService({
			url:`/api/v1/gap`,
			config: {
				params: {
					page:1,
					limit:20,
					direction:"ASC"
				}
			}
		}).get()
			.then((response)=> {
				setDataGap([...response?.data])
				setLoadingGap(false)
			})
			.catch((err)=> {
				setDataGap([])
				setLoadingGap(false)
			})
	},[])
	
	const [loadingMd, setLoadingMd] = useState(false)
	const [dataMd, setDataMd] = useState([])
	const [summary, setSummary ] = useState(null)
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
				setDataNcf([...response?.data])
				setPagination({
					...pagination,
					...response?.paginate
				})
				setLoading(false)
			})
			.catch((err) => {
				setDataNcf([])
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
				setSummary(response?.data ?? null)
				setDetailTravel([...response?.data?.criteria])
			})
			.catch((err) => {
				setSummary(null)
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
	
	function ColumnDataGap(arr = [ ], masterData = [], aspek = []){
		if(Array.isArray(arr) && arr.length > 0){
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
		return { column : [], data: []}
		
	}
	
	const [ visible, setVisible ] = useState(false)
	
	
	return (
		<React.Fragment>
			<Modal title={'Data Real'}
			       visible={visible}
			       onOk={()=> setVisible(!visible)}
			       onCancel={()=> setVisible(!visible)}
			>
				<ReactJSON src={{
					data,
					ncf: dataNcf,
					gap: dataGap,
					masterData: dataMd,
					travel: detailTravel
				}}/>
			</Modal>

			<HeroComponents
				loading={false}
				name={loading ? "Loading...": summary?.name ?? "Overview"}
				positionName={loading ? "Loading..." : summary?.location ? summary.location.split(' '): ['Travel','Calculate']}
				thumbnail={null}
				extra={<><Button type={'primary'} onClick={()=> setVisible(true)}>Open Data Real</Button></>}
			/>
			
			<div style={{marginTop: 90}}>
				<ContainerTailwind>
					<Top10
					data={data ?? []}
					gap={dataGap ?? []}
					/>
					
					<Row gutter={24}>
						<Col xs={24} lg={14}>
							<Card title={'Pengelompokan Core/Secondary Factor'}>
								<Row gutter={24}>
									<Col xs={12} className={'!mk-space-y-2'}>
										<p>Rumus Core Factor</p>
										<div className={'w-full mk-flex mk-items-center mk-gap-2 py-4'}>
											<span>NCF</span>
											<span>=</span>
											<div className={'mk-flex mk-flex-col'}>
												<span className={'m-0 p-0'} style={{lineHeight:0}}>Σ<i>NC</i></span>
												<span className={'m-0 p-0'} >______</span>
												<span className={'m-0 p-0'} style={{lineHeight:1}}>Σ<i>IC</i></span>
											</div>
										</div>
										<div>
											<Descriptions size={'small'} title={'Keterangan'}>
												<Descriptions.Item span={4} label={'NCF'}>Nilai rata-rata Core Factor</Descriptions.Item>
												<Descriptions.Item span={4} label={'NC'}>Jumlah Total Core Factor</Descriptions.Item>
												<Descriptions.Item span={4} label={'IC'}>Jumlah Item Core Factor</Descriptions.Item>
											</Descriptions>
										</div>
									</Col>
									<Col xs={12} className={'!mk-space-y-2'}>
										<p>Rumus Secondary Factor</p>
										<div className={'w-full mk-flex mk-items-center mk-gap-2 py-4'}>
											<span>NSF</span>
											<span>=</span>
											<div className={'mk-flex mk-flex-col'}>
												<span className={'m-0 p-0'} style={{lineHeight:0}}>Σ<i>NS</i></span>
												<span className={'m-0 p-0'} >______</span>
												<span className={'m-0 p-0'} style={{lineHeight:1}}>Σ<i>IS</i></span>
											</div>
										</div>
										<div>
											<Descriptions size={'small'} title={'Keterangan'}>
												<Descriptions.Item span={4} label={'NCF'}>Nilai rata-rata Secondary Factor</Descriptions.Item>
												<Descriptions.Item span={4} label={'NC'}>Jumlah Total Secondary Factor</Descriptions.Item>
												<Descriptions.Item span={4} label={'IC'}>Jumlah Item Secondary Factor</Descriptions.Item>
											</Descriptions>
										</div>
									</Col>
									<Col xs={12}></Col>
								</Row>
								<Divider/>
								<div>
									<Descriptions size={'small'} title={'Keterangan Core & Secondary Factor'}>
										<Descriptions.Item span={4} label={'Core Factor'}>Faktor Utama</Descriptions.Item>
										<Descriptions.Item span={4} label={'Secondary Factor'}>Faktor Pendukung</Descriptions.Item>
									</Descriptions>
								</div>
							</Card>
						</Col>
						<Col xs={24} lg={10}>
							<Card title={loadingGap ? "Loading...": 'PEMETAAN GAP'} loading={loadingGap}>
								{Array.isArray(dataGap) && dataGap.length > 0 ? (
									<div>
										<div className={'mk-bg-gray-200 p-2 mk-rounded-xl mb-2'}>
											<Row gutter={10}>
												<Col span={2} className={'text-center'}>
													<span className={'mk-text-xs'}>No</span>
												</Col>
												<Col span={4}>
													<span className={'mk-text-xs'}>GAP</span>
												</Col>
												<Col span={4}>
													<span className={'mk-text-xs'}>Weight</span>
												</Col>
												<Col span={14}>Description</Col>
											</Row>
										</div>
										{
											dataGap.map((item,index)=> (
												<div className={'mk-bg-cyan-500 mk-bg-opacity-10 p-2 mk-rounded-xl mb-2'} key={`gap.mapping-${index}`}>
													<Row gutter={10}>
														<Col span={2} className={'text-center'}>
															<span className={'mk-text-xs'}>{index + 1}</span>
														</Col>
														<Col span={4}>
															<span className={'mk-text-xs'}>{item?.gap ?? "undefined"}</span>
														</Col>
														<Col span={4}>
															<span className={'mk-text-xs'}>{item?.weight ?? "undefined"}</span>
														</Col>
														<Col span={14}>
															<span className={'mk-text-xs'}>{item?.description ?? "undefined"}</span>
														</Col>
													</Row>
												</div>
											))
										}
									</div>
								):<Empty/>}
							</Card>
						</Col>
					</Row>
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
					
					
					<Konversi data={data ?? []} master={dataMd ?? []} gap={dataGap ?? []}/>
					
					<Ncf dataNcf={dataNcf ?? []} gap={dataGap ?? []}/>
					<Nsf dataNsf={dataNcf ?? []} gap={dataGap ?? []}/>
				</ContainerTailwind>
			</div>
		</React.Fragment>
	);
}

export default connect(
	mapStateToProps,
)(Index);