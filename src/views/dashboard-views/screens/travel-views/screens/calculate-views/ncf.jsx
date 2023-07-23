import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import {Card, Table} from "antd";

function mapStateToProps({auth}) {
   let { profile } =  auth
 return {
     profile
 };
}

function Ncf(props = {})  {
  let { gap, profile } = props
  const [ tmpData, setTmpData ]  = useState([])
  const [ data, setData ] = useState([])
  const [ loading, setLoading ] = useState(true)
  
  useEffect(()=> {
    setTmpData(()=> {
      return props?.dataNcf ?? []
    })
  },[props.dataNcf])
  
  
  
  
  useEffect(()=> {
    setLoading(true)
    let newData = []
    if(Array.isArray(tmpData) && tmpData.length > 0 ){
      if(Array.isArray(tmpData) && tmpData.length > 0){
        for (let i = 0; i < tmpData.length; i++){
          newData.push({...tmpData[i]})
        }
        
        newData.map((child)=> {
          let filtered = child.data.filter((child)=> child?.coreFactor === true) ?? []
          let newFiltered = []
          
          if(Array.isArray(filtered) && filtered.length > 0){
            for(let i = 0 ; i < filtered.length;i++){
              let item = filtered[i];
              let value = ((item?.compareValue ?? 0) - (item?.value ?? 0))
              let compareGapValue = {
                gap:0,
                weight:0
              }
              if(Array.isArray(gap) && gap.length > 0){
                let gapIndexed = gap.findIndex((item)=> item?.gap === value)
                if(gapIndexed >= 0){
                  Reflect.set(compareGapValue,'gap',gap[gapIndexed]?.gap)
                  Reflect.set(compareGapValue,'weight',gap[gapIndexed]?.weight)
                }
              }
              newFiltered.push({...item,compareGapValue})
            }
          }
          
          if(Array.isArray(newFiltered) && newFiltered.length > 0 ){
            let reduced = []

            for(let i = 0; i< newFiltered.length;i++){
              let item = newFiltered[i];
              reduced.push(item?.compareGapValue?.weight ?? 0)
            }
            let value = 0.60 * (reduced.reduce((a,b)=> a + b) ?? 0) / (filtered.length  ?? 0) ?? 0
            let calculate = {
              totalValue:reduced.reduce((a,b)=> a + b),
              value: value.toFixed(2),
              totalItem: filtered.length ?? 0,
              description: `0.60 * (${reduced.reduce((a,b)=> a + b) ?? 0}/${filtered.length ?? 0}) = ${value.toFixed(2)}`
            }
            Reflect.set(child,'calculate', calculate)
          }
          
          Reflect.set(child,'data',newFiltered)
          return child
        })
      }
      setData(newData)
      setLoading(false)
    }else{
      setLoading(false)
    }
  },[tmpData,gap])
  
  return (
   <Card bordered={false} title={'Hasil Core Factor (NCF)'} loading={loading}>
     <Table
       bordered
       pagination={false}
       rowClassName={(_)=> {
         console.log({_})
         return [_?.fullName === profile?.fullName ? "mk-bg-cyan-200" : ""].join(' ')
       }}
       columns={ [
         {
           key:"id",
           width:70,
           title:"No",
           render:(_,val,index)=> index + 1
         },
         {
           key:"name",
           title:"Name",
           dataIndex: ['fullName'],
         },
         {
           key:"description",
           title:"Description",
           dataIndex: ['calculate','description'],
         },
         {
           key:"total",
           title:"Total",
           children: [
             {
               key:"total-item",
               title:"Item",
               dataIndex: ['calculate','totalItem']
             },
             {
               key:"total-value",
               title:"Value",
               dataIndex: ['calculate','totalValue']
             }
           ]
         },
         {
           key:"ncf",
           title:"NCF",
           dataIndex: ['calculate','value'],
         },
       ]}
       loading={loading}
       dataSource={data ?? []}
     />
   </Card>
  );
}

export default connect(
 mapStateToProps,
)(Ncf);