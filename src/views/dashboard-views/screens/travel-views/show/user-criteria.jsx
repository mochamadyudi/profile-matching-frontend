import React, {Component, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import ApiService from "../../../../../services/api.service";
import {Card, Table} from "antd";
import moment from "moment/moment";
import {getGlobalTravelCriteriaUser} from "../../../../../redux/actions/global";

function mapStateToProps({Global}) {
	let { user_criteria } = Global
	return {
		...user_criteria
	};
}


function UserCriteria(props)  {
	let { list,getGlobalTravelCriteriaUser  } = props
	const [params, setParams ] = useState(()=> {
		return {
			...list?.params,
			page:1,
			limit: list?.params?.limit ?? 10
		}
	})
	
	
	useEffect(()=> {
		getGlobalTravelCriteriaUser({params:params})
	},[params])
	
  return (
	  <Card bordered={false} title={'User Criteria'}>
		  <Table
			  className={'table'}
			  loading={list?.loading}
			  dataSource={list?.data ?? []}
			  columns={[
				  {
					  dataIndex:"id",
					  title: "No",
					  width:70,
					  render: (_,val,index)=> index + 1
				  },
				  {
					  dataIndex:['user','fullName'],
					  title: "User",
				  },
				  {
					  dataIndex:['criterion','label'],
					  title: "Label",
				  },
				  {
					  dataIndex:['criterion','description'],
					  title: "Description",
				  },
				  {
					  dataIndex:"value",
					  title: "Index Value",
				  },
				  {
					  dataIndex:"createdAt",
					  title: "Created At",
					  render:(_,val,index)=> {
						  return moment(_)?.isValid() ? moment(_).format("DD/MM/YYYY HH:mm a") : "-"
					  }
				  },
			  ]}
			  pagination={list?.params?.limit > list?.pagination?.total_record ? false : {
				  pageSize:list?.params?.limit,
				  current: list?.params?.page,
				  total:list?.pagination?.total_record ?? 0,
				  onChange: function (page,pageSize){
					  setParams({
						  ...list?.params,
						  page,
						  limit: pageSize
					  })
				  }
			  }}
		  />
	  </Card>
  );
}

export default connect(
 mapStateToProps,{getGlobalTravelCriteriaUser}
)(UserCriteria);