import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { Form , Select } from 'antd';


function mapStateToProps(state) {
 return {

 };
}

function AirlineTypeSelect(props)  {
	const [loading,setLoading] = useState(false)
	const [ data, setData ] = useState([])
	const [ params,setParams ] = useState({
		page:1,
		limit:100
	})
	useEffect(()=> {
		setLoading()
	},[params])
  return (
   <Form.Item name={props?.name ?? "airline_type"} label={props?.label ?? "Airline Type"} rules={props?.rules ?? [{required:true,message:"Can't be empty!"}]}>
	   <Select {...props?.select}>
		  
	   </Select>
   </Form.Item>
  );
}

export default connect(
 mapStateToProps,
)(AirlineTypeSelect);