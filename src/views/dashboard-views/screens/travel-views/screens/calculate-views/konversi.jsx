import React, {Component, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {Card, Table} from "antd";
import {calcGap} from "../../../../../../utils";

function mapStateToProps(state) {
 return {

 };
}

/**
 *
 * @param {object} props
 * @param { [] } props.data
 * @param { [] } props.master
 * @param { CALC_GAP[] | [] } props.gap
 * @returns {JSX.Element}

 */
function Konversi(props)  {
	let { data, master, gap } = props
	const [ newData, setNewData ] = useState(()=> [])
	
	const [ columns, setColumns ] = useState([])
	
	const [dataTable, setDataTable] = useState([])
	function ColumnGap(){
		let newColumn= [
			{
				fixed:"left",
				key:"label",
				title: "Label",
				dataIndex:"label",
				render:(_)=> <p className={'!mk-whitespace-nowrap'}>{_?.replace(/-/g,' ')}</p>
			}
		]
		return {
			column: []
		}
	}
	
	
	function GroupingCoreFactor(arr = []){
		if(Array.isArray(arr) && arr.length === 0) return []
		return arr.reduce((acc,col)=> {
			const { labelFactor } = col;
			if (!acc[labelFactor]) {
				acc[labelFactor] = [];
			}
			acc[labelFactor].push(col);
			return acc;
		},{})
	}
	
	function ClearValueConvert(obj = {},gap){
		if(typeof(obj) !== 'undefined' && Object.keys(obj).length > 0){
			Object.entries(obj).map(([key,value])=> {
				if(Array.isArray(value) && value.length > 0){
					value =  value.map((item)=> {
						let label = `${item?.label}`.replace(/ /g,'-').toLowerCase()
						let value = (item?.compareValue ?? 0) - item?.value
						let compareGapValue = {
								gap:0,
								weight:0
						}
						if(Array.isArray(gap) && gap.length > 0){
							let gapIndexed = gap.findIndex((child)=> child?.gap === value)
							
							if(gapIndexed >= 0){
								Reflect.set(compareGapValue,'gap',gap[gapIndexed]?.gap)
								Reflect.set(compareGapValue,'weight',gap[gapIndexed]?.weight)
							}
						}
						return {
							...item,
							label,
							compareGapValue
						}
					})
					Reflect.set(obj,key,value)
				}
				Reflect.set(obj,key,value)
			})
			return obj
		}
		return obj
	}
	
	function removeDuplicates(arr, property) {
		const uniqueValues = new Set();
		return arr.filter(obj => {
			if (!uniqueValues.has(obj[property])) {
				uniqueValues.add(obj[property]);
				return true;
			}
			return false;
		});
	}
	useEffect(()=> {
		let newColumns = [
			{
				key:"no",
				title:`NO`,
				width:70,
				render:(_,val,index)=> index + 1
			},
			{
				key:"name",
				title:`Name`,
				dataIndex:['fullName'],
			},
		]
		
		
		let childrens = []
		let newDataConvert = data.map((item)=> {
			let childNodesColumn = []
			
			item.data = item?.data.map((child)=> {
				return {
					...child,
					fullName:item?.fullName,
					email:item?.email,
				}
			})
			
			
			item.data = item.data.map((item)=> {
				return {
					...item,
					['labelFactor']: item?.coreFactor === true ? "core": "secondary"
				}
			}).sort((a,b)=> a?.coreFactor + b?.coreFactor)
			
			let a = ClearValueConvert(GroupingCoreFactor(item.data ?? {}),gap) ?? {}
			let newObject= {}
			if(typeof(a) === 'object' && Object.keys(a).length > 0){
				Object.entries(a).map(([key,value])=> {
					let objects = {}
					if(Array.isArray(value) && value.length > 0){
						value.map((child)=> {
							Reflect.set(objects,
								`${child?.label}`.toString().toLowerCase().replace(/ /g,'-')
								,{
									...child
								})
						})
					}
					Reflect.set(newObject,key,objects)
				})
			}
			
			if(typeof(newObject) === 'object' && Object.keys(newObject).length > 0){
				Object.entries(newObject).map(([k,v])=> {
					let NodeItem = []
					Object.entries(v).map(([key,val])=> {
						NodeItem.push({
							key:`group-childNodes-${k}-${key}`,
							title:`${key}`,
							dataIndex:['groups',k,key,'compareGapValue','weight'],
							render:(_)=> {
								return _ ?? "-"
							}
						})
					})
					
					childNodesColumn.push({
						key:`${k}`,
						style:{
							background:"red"
						},
						label:`${k} Factor`.replace(/-/g,' '),
						title:`${k} Factor`.replace(/-/g,' '),
						children:NodeItem
					})
				})
			}
			// console.log([removeDuplicates(childNodesColumn,'key'),'HEHEH'])
			newColumns = newColumns.concat(removeDuplicates(childNodesColumn,'key'))
			Reflect.set(item,'groups',newObject ?? {})
			return item
		}) ?? []
		
		setColumns(removeDuplicates(newColumns ?? [],'key'))
		setNewData(newDataConvert ?? [])
	},[data,master,gap])
	
  return (
		<Card bordered={false} title={'Konversi Nilai GAP'}>
			<Table
				bordered
				pagination={false}
				className={'table !mk-overflow-x-auto'}
				dataSource={newData ?? []} columns={columns ?? []}/>
		</Card>
  );
}

export default connect(
 mapStateToProps,
)(Konversi);