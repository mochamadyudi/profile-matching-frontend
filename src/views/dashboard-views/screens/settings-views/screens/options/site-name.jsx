import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Button,message, Form, Input} from 'antd';
import SettingLayout from "../../setting.layout";
import ApiService from "../../../../../../services/api.service";
import {first} from "lodash";
import Flex from "../../../../../../components/shared-components/Flex";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";

function mapStateToProps({Settings}) {
	let { collections,site } = Settings
 return {
	 site,
		...collections
 };
}

function SiteName(props)  {
	let { general,site } = props
	const history = useHistory()
	const [ form ] = Form.useForm();
	const [ loading, setLoading ] = useState(false)
	const [initialValues, setInitialValues] = useState({})
	
	useEffect(()=> {
		// if(!general.loading && Array.isArray(general.data) && general.data.length > 0){
		// 	let filtered = general.data.filter((item)=> item.name === 'site_name')
		// 	if(Array.isArray(filtered) && filtered.length > 0){
		// 		let item = first(filtered)
		// 		setInitialValues({
		// 			...item,
		// 		})
		//
		// 	}
		// }
		if(typeof(site) !== 'undefined' && Object.keys(site).length > 0){
			setInitialValues({
				...site
			})
		}
	},[site])
	
	useEffect(()=> {
		if(!site?.loading){
			form.resetFields()
		}
		
	},[site,initialValues])

	const onSubmit = ()=> {
		form.validateFields()
			.then((value)=> {
				setLoading(true)
				new ApiService({
					url:`/api/v1/options/site_name`,
					body:value
				})
					.post()
					.then((response)=> {
						message.info(response?.message ?? "-")
						setLoading(false)
					})
					.catch((err)=> {
						message.error(err?.message ?? "Error: Some Error")
						setLoading(false)
					})
			})
			.catch((err)=> {
				console.log({err})
			})
	}
	
  return (
	  <SettingLayout name={'Site Name'} positionName={['Settings','Options']}>
		  <Flex alignItems={'center'} justifyContent={'start'} className={'mb-4'}>
			  <Button type={'link'} onClick={()=> history.goBack()} icon={<ArrowLeftOutlined/>}>Back</Button>
		  </Flex>
		  <div>
			  {
					!general?.loading && (
					  <Form layout={'vertical'} form={form} initialValues={{
							...initialValues,
						  opt_type: site?.opt_type ?? null,
						  opt_value: site?.opt_value ?? null,
					  }}>
						  <Form.Item name={'opt_value'} label={'Site Name'} rules={[{required:true,message:"Can't be empty!"}]}>
							  <Input/>
						  </Form.Item>
						  <Form.Item name={'opt_type'} hidden label={'Site Name'} initialValue={'site'}>
							  <Input defaultValue={'site'}/>
						  </Form.Item>
						  
						  <Button loading={loading} type={'primary'} onClick={onSubmit}>Submit</Button>
					  </Form>
				  )
			  }
		  </div>
	  </SettingLayout>
  );
}

export default connect(
 mapStateToProps,
)(SiteName);