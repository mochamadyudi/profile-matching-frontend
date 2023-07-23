import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Alert, message as Message } from "antd";
import { showAuthMessage, showLoading, hideAuthMessage, authenticated } from 'redux/actions/Auth';
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"
import JwtAuthService from 'services/JwtAuthService'
import ApiService from "../../../services/api.service";

const rules = {
	email: [
		{ 
			required: true,
			message: 'Please input your email address'
		},
		{ 
			type: 'email',
			message: 'Please enter a validate email!'
		}
	],
	password: [
		{ 
			required: true,
			message: 'Please input your password'
		}
	],
	confirm: [
		{ 
			required: true,
			message: 'Please confirm your password!'
		},
		({ getFieldValue }) => ({
			validator(rule, value) {
				if (!value || getFieldValue('password') === value) {
					return Promise.resolve();
				}
				return Promise.reject('Passwords do not match!');
			},
		})
	]
}

export const RegisterForm = (props) => {
	let { extra } = props
	const { showLoading, token, loading, redirect, message, showMessage, hideAuthMessage, authenticated, allowRedirect } = props
	const [form] = Form.useForm();
	let history = useHistory();

	const onSignUp = () => {
    	form.validateFields().then(values => {
				Reflect.set(values,'role',values?.role ?? 4)
			// showLoading()
		    Reflect.deleteProperty(values,'confirm')
		    new ApiService({
			    url:`/api/v1/auth/signUp`,
			    body:values
		    }).post()
			    .then((response)=> {
						if(!response?.error){
							showAuthMessage(response?.message)
							form.resetFields()
							setTimeout(()=> {
								localStorage.setItem('token',response?.data?.token)
								window.location.href = `/dashboard`
							},3000)
							clearTimeout()

						}else{
						Message.info(response?.message)
						}
			    })
			    .catch((err)=> {
						Message.error(err?.message)
			    })
		}).catch(info => {
			console.log('Validate Failed:', info);
		});
	}

	// useEffect(() => {
  //   	if (token !== null && allowRedirect) {
	// 		history.push(redirect)
	// 	}
	// 	if(showMessage) {
	// 			setTimeout(() => {
	// 			hideAuthMessage();
	// 		}, 3000);
	// 	}
  // });
	
	return (
		<>
			<motion.div 
				initial={{ opacity: 0, marginBottom: 0 }} 
				animate={{ 
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0 
				}}> 
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>
			<Form form={form} layout="vertical" name="register-form" onFinish={onSignUp}>
				<Form.Item
					name="fullName"
					label="Full Name"
					rules={[{required:true,message:"Can't be empty"}]}
					hasFeedback
				>
					<Input prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="email" 
					label="Email" 
					rules={rules.email}
					hasFeedback
				>
					<Input prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="password" 
					label="Password" 
					rules={rules.password}
					hasFeedback
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="confirm" 
					label="ConfirmPassword" 
					rules={rules.confirm}
					hasFeedback
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item
					name="role"
					label="role"
					hasFeedback
					hidden
					initialValue={4}
				>
					<Input value={4}/>
				</Form.Item>
				
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Sign Up
					</Button>
				</Form.Item>
			</Form>
			{ extra }
		</>
	)
}

const mapStateToProps = ({auth}) => {
	const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect }
}

const mapDispatchToProps = {
	showAuthMessage,
	hideAuthMessage,
	showLoading,
	authenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
