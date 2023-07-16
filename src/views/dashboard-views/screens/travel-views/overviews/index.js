import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import HeroComponents from "components/layout-components/CustomrPageHeaderAlt";
import ButtonPermission from "components/permission-components/button.permission";
import ContainerTailwind from "components/layout-components/ContainerTailwind";
import {Button, Card, Table, Tooltip} from "antd";
import {DeleteOutlined, EyeOutlined, FilterOutlined, PlusOutlined} from "@ant-design/icons";
import {useHistory} from 'react-router-dom'
import ApiService from "services/api.service";


function mapStateToProps(state) {
	return {};
}

function Index() {
	const history = useHistory()
	
	const [visibleExpand, setVisibleExpand] = useState(null)
	const [loading, setLoading] = useState(true)
	const [params, setParams] = useState({
		page: 1,
		limit: 10
	})
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10
	})
	const [data, setData] = useState([])
	
	const [loadingExpand, setLoadingExpand] = useState(true)
	const [paramsExpand, setParamsExpand] = useState({
		page: 1,
		limit: 4
	})
	const [paginationExpand, setPaginationExpand] = useState({
		page: 1,
		limit: 4
	})
	const [dataExpand, setDataExpand] = useState([])
	
	
	useEffect(() => {
		setLoading(true)
		new ApiService({
			url: `/api/v1/travel`,
			config: {
				params: {
					...params
				}
			}
		}).get()
			.then((response) => {
				setData([...response?.data.map((item) => ({
					...item,
					isHighlight: false
				}))])
				setPagination({
					...pagination,
					...response?.pagination,
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
		if (visibleExpand) {
			setLoadingExpand(true)
			new ApiService({
				url: `/api/v1/criteria`,
				config: {
					params: {
						...paramsExpand,
						travelId: [visibleExpand]
					}
				}
			}).get()
				.then((response) => {
					setDataExpand([...response?.data.map((item) => ({
						...item,
						isHighlight: false
					}))])
					setPaginationExpand({
						...pagination,
						...response?.pagination,
						...response?.paginate
					})
					setLoadingExpand(false)
				})
				.catch((err) => {
					setLoadingExpand(false)
					setDataExpand([])
				})
		} else {
			setDataExpand([])
			setLoadingExpand(false)
		}
	}, [visibleExpand,paramsExpand])
	
	
	const columns = [
		{
			key: 'travel.id',
			title: 'No',
			dataIndex: 'id',
			width: 70,
			render: (_, val, index) => index + 1
		},
		{
			key: 'travel.name',
			title: 'Name',
			dataIndex: 'name'
		},
		{
			key: 'travel.description',
			title: 'Description',
			dataIndex: 'description'
		},
		{
			key: 'travel.location',
			title: 'Location',
			dataIndex: 'location'
		},
		{
			title: '',
			dataIndex: 'id',
			render: (_, elm) => (
				<div className="text-right d-flex justify-content-end">
					<Tooltip title="View">
						<Button
							onClick={() => {
								history.push(`/dashboard/travel/${_}/show`)
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
				positionName={["Travel"]}
				thumbnail={null}
				extra={<>
					<div className="text-right d-flex justify-content-end">
						<Tooltip title="View">
							<Button
								onClick={() => {
									history.push(`/dashboard/travel/create`)
								}}
								type="primary" className="mr-2" icon={<PlusOutlined/>} size="small">Add New</Button>
						</Tooltip>
					</div>
				</>}
			/>
			
			<div style={{marginTop: 90}}>
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
									ghost: true,
									icon: <FilterOutlined/>
								}}>
								Filter
							</ButtonPermission>
						</div>
					}>
						<Table
							key={'table-primary'}
							loading={loading}
							dataSource={data}
							columns={columns}
							rowKey={'id'}
							rowClassName={(record, index) => record?.isHighlight ? "!mk-bg-green-500 !mk-bg-opacity-20 cursor-pointer" : 'cursor-pointer'}
							expandable={{
								expandRowByClick: false,
								onExpand: function (val, arg) {
									if (Array.isArray(data) && data.length > 0) {
										let indexed = data.findIndex(child => child?.id === arg?.id)
										if (val) {
											if (typeof (data[indexed]) !== 'undefined') {
												data[indexed].isHighlight = true
												setData([...data])
												setVisibleExpand(arg?.id)
												setParamsExpand({
													...paramsExpand,
													page:1
												})
											}
										} else {
											if (typeof (data[indexed]) !== 'undefined') {
												data[indexed].isHighlight = false
												setData([...data])
												setVisibleExpand(null)
											}
										}
									}
								},
								expandedRowRender: (record, args, a) => {
									return (
										<Card bordered title={'Criteria'}>
											<Table
												key={'table-expand'}
												id={'table-expand'}
												loading={loadingExpand}
												dataSource={dataExpand}
												columns={[
													{
														dataIndex: 'id',
														title:"No",
														name: "No",
														render: (_, val, index) => index + 1
													},
													{
														title:"Label",
														dataIndex: 'label',
														name: "Label"
													},
													{
														title:"Description",
														dataIndex: 'description',
														name: "Description"
													},
													{
														title:"Index Value",
														dataIndex: 'value',
													},
												]}
												pagination={{
													pageSize: paramsExpand?.limit,
													current: paramsExpand?.page,
													total: paginationExpand?.total_record ?? 0,
													onChange: function (page, pageSize) {
														setParamsExpand({
															...paramsExpand,
															page,
															limit: pageSize
														})
													}
												}}
											/>
										</Card>
									)
								},
								rowExpandable: (record) => visibleExpand === null ? true : record?.id === visibleExpand,
							}}
							pagination={{
								pageSize: params?.limit,
								current: params?.page,
								total: pagination?.total_record ?? 0,
								onChange: function (page, pageSize) {
									setVisibleExpand(null)
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