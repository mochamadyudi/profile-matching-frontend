import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Row, Col} from 'antd'
import StatisticWidget from "components/shared-components/StatisticWidget";
import ApiService from "../../../../../services/api.service";

function OverviewPages() {
	let loadingData = [
		{
			data: {
				label: "Loading...",
				value: 0
			}
		},
		{
			data: {
				label: "Loading...",
				value: 0
			}
		},
		{
			data: {
				label: "Loading...",
				value: 0
			}
		},
		{
			data: {
				label: "Loading...",
				value: 0
			}
		},
	
	
	]
	const [loading, setLoading] = useState()
	const [data, setData] = useState([])
	
	
	useEffect(() => {
		setLoading(true)
		setData(loadingData)
		new ApiService({
			url: `/api/v1/dashboard`,
			
		}).get()
			.then((response) => {
				setData([...response?.data])
				setLoading(false)
			})
			.catch((err)=> {
				setData([])
				setLoading(false)
			})
	}, [])
	
	return (
		<div className="w-full">
			<Row gutter={16}>
				{
					data.map((elm, i) => (
						<Col xs={24} sm={24} md={24} lg={24} xl={6} key={i}>
							<StatisticWidget
								title={elm.data?.label}
								value={elm.data?.value}
								status={0}
								subtitle={elm?.data?.description ?? "-"}
							/>
						</Col>
					))
				}
			</Row>
		</div>
	)
}

OverviewPages.propTypes = {}
OverviewPages.defaultProps = {}

export default connect(() => {
	return {}
}, {})(React.memo(OverviewPages))
