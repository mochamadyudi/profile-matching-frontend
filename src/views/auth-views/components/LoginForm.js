import React, { useEffect } from 'react';
import { connect } from "react-redux";
import {Button, Form, Input, Divider, Alert, message} from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { GoogleSVG, FacebookSVG } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import {  
	showLoading, 
	showAuthMessage, 
	hideAuthMessage,
	authenticated
} from 'redux/actions/Auth';
import JwtAuthService from 'services/JwtAuthService'
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"
import ApiService from "../../../services/api.service";

export const LoginForm = (props) => {
	let history = useHistory();

	const { 
		otherSignIn, 
		showForgetPassword, 
		hideAuthMessage,
		onForgetPasswordClick,
		showLoading,
		extra,
		loading,
		showMessage,
		authenticated,
		showAuthMessage,
		token,
		redirect,
		allowRedirect
	} = props

	const onLogin = async values => {
		showLoading()
		const fakeToken = 'fakeToken'
		showLoading()
		let email_regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (email_regex.test(values?.email)) {
			await new ApiService({
				url:`/api/v1/auth/signIn`,
				body: values
			}).post()
				.then((response)=> {
					let data = response?.data ?? undefined

					if(!response?.error){
						if(typeof(data?.token) !== 'undefined' && data?.token !== '' && data?.token !== null){
							localStorage.setItem('token', data?.token)
						}else{
							localStorage.removeItem('token')
						}
						message.success(response?.message ?? "Successfully!")
						setTimeout(() => {
							window.location.href = '/'
						}, 1000)
					}else{
						showAuthMessage(response?.message)
					}
				})
				.catch((err)=> {
					showAuthMessage(err?.message)
				})
		}
	};

	const onGoogleLogin = () => {
		showLoading()
	}

	const onFacebookLogin = () => {
		showLoading()
	}

	useEffect(() => {
		if (token !== null && allowRedirect) {
			history.push(redirect)
		}
		if(showMessage) {
			setTimeout(() => {
			hideAuthMessage();
		}, 3000);
		}
	});
	
	const renderOtherSignIn = (
		<div>

		</div>
	)

	return (
		<>
			<motion.div 
				initial={{ opacity: 0, marginBottom: 0 }} 
				animate={{ 
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0 
				}}> 
				<Alert type="error" showIcon message={props?.message}></Alert>
			</motion.div>
			<Form 
				layout="vertical" 
				name="login-form"
				onFinish={onLogin}
			>
				<Form.Item 
					name="email" 
					label="Email" 
					rules={[
						{ 
							required: true,
							message: 'Please input your email',
						},
						{ 
							type: 'email',
							message: 'Please enter a validate email!'
						}
					]}>
					<Input prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="password" 
					label={
						<div className={`${showForgetPassword? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
							<span>Password</span>
							{
								showForgetPassword && 
								<span 
									onClick={() => onForgetPasswordClick} 
									className="cursor-pointer font-size-sm font-weight-normal text-muted"
								>
									Forget Password?
								</span>
							} 
						</div>
					} 
					rules={[
						{ 
							required: true,
							message: 'Please input your password',
						}
					]}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Sign In
					</Button>
				</Form.Item>
				{
					otherSignIn ? renderOtherSignIn : null
				}
				{ extra }
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({auth}) => {
	const {loading, message, showMessage, token, redirect} = auth;
  	return {loading, message, showMessage, token, redirect}
}

const mapDispatchToProps = {
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	authenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
