import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import HeroComponents from "components/layout-components/CustomrPageHeaderAlt";
import ButtonPermission from "components/permission-components/button.permission";
import ContainerTailwind from "components/layout-components/ContainerTailwind";
import {Button, Card, Rate, Table, Tag, Tooltip} from "antd";
import {DeleteOutlined, EyeOutlined, FilterOutlined} from "@ant-design/icons";
import {useHistory, useParams} from 'react-router-dom'
import ApiService from "services/api.service";


function mapStateToProps(state) {
	return {
		
	};
}

function Recomendation()  {
	const history = useHistory()
	const [loading,setLoading]= useState(true)
	const [ params, setParams]= useState({
		page:1,
		limit:20
	})
	const [ pagination, setPagination ] = useState({
		page:1,
		limit:10
	})
	const [ data, setData] = useState([])
	
	useEffect(()=> {
		setLoading(true)
		new ApiService({
			url:`/api/v1/user/travel/recommendation`,
			config : {
				params : {
					...params
				}
			}
		}).get()
			.then((response)=> {
				setData([...response?.data])
				setPagination({
					...pagination,
					...response?.paginate
				})
				setLoading(false)
			})
			.catch((err)=> {
				setLoading(false)
				setData([])
			})
	},[params])
	
	function calculate(item){
		console.log({item},'CALCULATE')
		let a = item?.ncf ?? 0
		let b = item?.nsf ?? 0
		let c = (0.60 * a) + (0.40 * b)
		return a + b
	}
	
	
	const columns = [
		{
			key:'id',
			title:'Travel Name',
			dataIndex:'name'
		},
		{
			key:'id',
			title:'Location',
			dataIndex:'location'
		},
		{
			key:'calculate',
			title:'Calculate',
			children: [
				{
					key:'calculate.ncf',
					title:"NCF",
					children:[
						{
							key:'calculate.ncf',
							title:"Value",
							dataIndex:['calculate','ncf','value'],
							render:(_)=>  _.toFixed(2)
						},
						{
							key:'calculate.ncf',
							title:"Calculate",
							dataIndex:['ncf'],
							render:(_)=>  _.toFixed(2)
						},
					]
				},
				{
					key:'calculate.nsf',
					title:"NSF",
					children:[
						{
							key:'calculate.nsf',
							title:"Value",
							dataIndex:['calculate','nsf','value'],
							render:(_)=>  _.toFixed(2)
						},
						{
							key:'calculate.nsf',
							title:"Calculate",
							dataIndex:['nsf'],
							render:(_)=>  _.toFixed(2)
						},
					]
				},
				
			]
		},
		{
			key:"index.recommendation",
			title:"Tingkat Ketepatan",
			render: (_)=> {
				return <Rate
					disabled
					count={5}
					value={calculate(_)}
					tooltips={[
						[20,'%'].join(''),
						[40,'%'].join(''),
						[60,'%'].join(''),
						[80,'%'].join(''),
						[100,'%'].join(''),
					]} allowHalf />
				// <Tag color={'cyan'}>{[calculate(_?.calculate),'%'].join('')}</Tag>
			}
		},
		// {
		// 	title: '',
		// 	dataIndex: 'id',
		// 	render: (_, elm) => (
		// 		<div className="text-right d-flex justify-content-end">
		// 			<Tooltip title="View">
		// 				<Button
		// 					onClick={()=> {
		//
		// 					}}
		// 					type="primary" className="mr-2" icon={<EyeOutlined/>} size="small"/>
		// 			</Tooltip>
		// 			<Tooltip title="Delete">
		// 				<Button danger icon={<DeleteOutlined/>} onClick={() => {
		// 					// this.deleteUser(elm.id)au
		// 				}} size="small"/>
		// 			</Tooltip>
		// 		</div>
		// 	)
		// }
	]
	return (
		<React.Fragment>
			<HeroComponents
				loading={false}
				name={"Overview"}
				positionName={['Travel','Rekomendasi']}
				thumbnail={null}
				extra={<></>}
			/>
			
			<div style={{marginTop:90}}>
				<ContainerTailwind>
					<Card>
						<Table
							bordered={true}
							loading={loading}
							dataSource={data}
							columns={columns}
							pagination={false}
						/>
					</Card>
				</ContainerTailwind>
			</div>
		</React.Fragment>
	);
}

export default connect(
	mapStateToProps,
)(Recomendation);