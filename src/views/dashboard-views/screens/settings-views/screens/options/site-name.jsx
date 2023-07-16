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
	let { collections } = Settings
 return {
		...collections
 };
}

function SiteName(props)  {
	let { general } = props
	const history = useHistory()
	const [ form ] = Form.useForm();
	const [ loading, setLoading ] = useState(false)
	const [initialValues, setInitialValues] = useState({
		data:null,
		name:"site_name"
	})
	
	useEffect(()=> {
		if(!general.loading){
			form.resetFields()
		}
		
	},[general.loading,initialValues])
	
	useEffect(()=> {
		if(!general.loading && Array.isArray(general.data) && general.data.length > 0){
			let filtered = general.data.filter((item)=> item.name === 'site_name')
			if(Array.isArray(filtered) && filtered.length > 0){
				let item = first(filtered)
				setInitialValues({
					...item,
				})

			}
		}
	},[general])

	const onSubmit = ()=> {
		form.validateFields()
			.then((value)=> {
				setLoading(true)
				new ApiService({
					url:`/api/v1/setting/general`,
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
					  <Form layout={'vertical'} form={form} initialValues={initialValues}>
						  <Form.Item name={'data'} label={'Site Name'} rules={[{required:true,message:"Can't be empty!"}]}>
							  <Input/>
						  </Form.Item>
						  <Form.Item name={'name'} hidden label={'Name'} rules={[{required:true,message:"Can't be empty!"}]}>
							  <Input/>
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