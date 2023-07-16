import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import HeroComponents from "components/layout-components/CustomrPageHeaderAlt";
import ButtonPermission from "components/permission-components/button.permission";
import ContainerTailwind from "components/layout-components/ContainerTailwind";
import {Button, Card, Col, Row, Table, Tooltip} from "antd";
import {DeleteOutlined, EyeOutlined, FilterOutlined} from "@ant-design/icons";
import {useHistory, useParams} from 'react-router-dom'
import ApiService from "services/api.service";
import Criteria from './criteria'
import UserCriteria from "./user-criteria";
import {getGlobalTravel} from "../../../../../redux/actions/global";

function mapStateToProps({Global}) {
	let { travel } = Global
	return {
		show: travel?.show
	};
}

function Index(props)  {
	let { id } = useParams()
	const history = useHistory()
	let { getGlobalTravel,show } = props
	useEffect(()=> {
		getGlobalTravel({
			id:id,
			params: {
				page:1,
				limit:10,
				direction:"ASC",
				notUser: true,
			}
		})
	},[getGlobalTravel])
	
	
	
	return (
		<React.Fragment>
			<HeroComponents
				loading={show?.loading}
				name={show?.loading ? "Loading..." : show?.data?.name ?? "undefined"}
				positionName={!show?.loading ? show?.data?.location ?? "-" : null}
				thumbnail={null}
				extra={<>
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
								onClick: function() {
									history.push(`/dashboard/travel/${id}/show/calculate`)
								},
								type: "primary",
								size: "small",
								ghost:true,
								icon: <FilterOutlined/>
							}}>
							Calculate
						</ButtonPermission>
					</div>
				</>}
			/>
			
			<div style={{marginTop:90}}>
				<ContainerTailwind>

						<Row gutter={24}>
							<Col xs={24} lg={24}>
								<Criteria/>
								<UserCriteria/>
							</Col>
						</Row>

				</ContainerTailwind>
			</div>
		</React.Fragment>
	);
}

export default connect(
	mapStateToProps,{getGlobalTravel}
)(Index);