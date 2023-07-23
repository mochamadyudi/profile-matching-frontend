import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Button, Card, Col, Modal, Rate, Row, Table, Tooltip, Typography} from "antd";
import {StarOutlined} from "@ant-design/icons";
import ReactJSON from 'react-json-view'

function mapStateToProps({auth}) {
   let {  profile } = auth
 return {
     profile
 };
}

function Top10(props)  {
  let { gap,profile  } = props
  const [ ncfPercentage, setNcfPercentage ] = useState(.60)
  const [ nsfPercentage, setNsfPercentage ] = useState(.40)
  const [ loading, setLoading ] = useState(false)
  const [ data, setData] = useState([])
  
  
  function calcGap(val){
    if(Array.isArray(gap) && gap.length > 0){
      let indexed = gap.findIndex((item)=> item?.gap ===val)
      if(indexed >= 0 && typeof(gap[indexed]) !== 'undefined'){
        return props?.gap[indexed]?.weight ?? -99
      }
    }
    return 0
  }
  function getDescription(val){
    if(Array.isArray(gap) && gap.length > 0){
      let indexed = gap.findIndex((item)=> item?.gap === val)
      if(indexed >= 0 && typeof(gap[indexed]) !== 'undefined'){
        return props?.gap[indexed]?.description ?? "undefined"
      }
    }
    return "undefined"
  }
  
  function _process(){
    setLoading(true)
    if((Array.isArray(props?.data) && props?.data.length > 0) && Array.isArray(props?.gap) && props?.gap.length > 0){
      let newData = []
      for(let i = 0 ; i < props.data.length;i++){
        newData.push({
          ...props.data[i]
        })
      }
      
      
      if(Array.isArray(newData) && newData.length >0){
        newData = newData.map((item)=> {
          let propertyField = {
            result:0,
            ncf:{
              countGap:0,
              item:0,
              value:0,
              data: []
            },
            nsf:{
              countGap:0,
              item:0,
              value:0
            },
          }
          let ncf =  item.data.filter((child)=> child?.coreFactor === true)
          if(Array.isArray(ncf) && ncf.length > 0){

            ncf = ncf.map((child)=> {
              let compares = child?.compareValue - child?.value ?? 0
              return {
                ...child,
                gap: {
                  compare: compares,
                  description: getDescription(compares),
                  value:calcGap(compares)
                },
              }
            })
            
            let reduce = []
            
            ncf.map((child)=> {
              reduce.push(child?.gap?.value)
            })
            
            let count = (reduce.reduce((a,b)=> a + b) ) ?? 0
            let value =  (0.60* (count/ ncf.length))
            Reflect.set(propertyField.ncf,'countGap',count)
            Reflect.set(propertyField.ncf,'value',value)
            Reflect.set(propertyField.ncf,'item',ncf.length)
            Reflect.set(propertyField.ncf,'data',ncf)
          }
          
          
          let nsf =  item.data.filter((child)=> child?.coreFactor !== true)
          if(Array.isArray(nsf) && nsf.length > 0){
            nsf = nsf.map((child)=> {
              let compares = child?.compareValue - child?.value ?? 0
              return {
                ...child,
                gap: {
                  compare: compares,
                  description: getDescription(compares),
                  value:calcGap(compares)
                },
              }
            })
            
            let reduce = []
            
            nsf.map((child)=> {
              reduce.push(child?.gap?.value)
            })
            
            let count = (reduce.reduce((a,b)=> a + b) ) ?? 0
            let value =  (0.40* (count/ nsf.length))
            Reflect.set(propertyField.nsf,'countGap',count)
            Reflect.set(propertyField.nsf,'value',value)
            Reflect.set(propertyField.nsf,'item',nsf.length)
            Reflect.set(propertyField.nsf,'data',nsf)
          }
          
          if(propertyField?.ncf?.value > 0 || propertyField?.nsf?.value > 0 ){
            Reflect.set(propertyField,'result',  [propertyField?.ncf?.value,propertyField?.nsf?.value].reduce((a,b)=> a+b))
          }
          
          propertyField = {
            ...propertyField,
            name: item?.fullName,
          }


          return {
            ...propertyField
          }
        })
          .sort((a,b)=> {
            return b?.result - a?.result
          })
          .map((item,index)=> {
            return {
              ...item,
              rank:index+ 1
            }
          }).slice(0,10)
      }
      setData(newData)
    }else{

    }
    setLoading(false)
  }
  
  function _GetRank(rank){
    switch (rank){
      case 1:
      case 2:
      case 3:
        return "!mk-text-green-500 !mk-font-bold"
      default:
        if(rank < 6){
          return "!mk-font-bold"
        }else{
          return ""
        }

    }
  }
  
  useEffect(()=> {
    if(typeof(props?.data) !== 'undefined' && Array.isArray(props.data) && props.data.length > 0 && typeof(gap) !== 'undefined' && Array.isArray(gap) && gap.length > 0){
      _process()
    }
  },[props.data,gap])
  
  const [ visible, setVisible ] = useState(false)
  return (
   <React.Fragment>
     <Modal title={'Data Real'}
            visible={visible}
            onOk={()=> setVisible(!visible)}
            onCancel={()=> setVisible(!visible)}
     >
       <ReactJSON src={data ?? {}} collapsed={true}/>
     </Modal>
     <Card bordered={false} title={'TOP 10 User'} extra={<Button type={'primary'} onClick={()=> setVisible(!visible)}>Open</Button>} loading={loading}>
       <Table
         bordered
         rowKey={'name'}
         rowClassName={(_)=> {
           return [_?.name === profile?.fullName ? "mk-bg-cyan-200" : _GetRank(_?.rank ?? 10)].join(' ')
         }}
         pagination={false}
         columns={[
           {
             key:"name",
             title:"Name",
             dataIndex:"name",
             width:150,
             render: (_,val,index)=> [_,`(${index+1})`].join(' ')
           },
           {
             key:"ncf",
             title:"NCF",
             children:[
               {
                 key:"name",
                 title:"Item",
                 dataIndex:['ncf','item'],
                 children:[]
               },
               {
                 key:"name",
                 title:"Gap",
                 dataIndex:['ncf','countGap'],
                 children:[],
                 render:(_,val)=> {
                   return (
                     <Tooltip title={"Compare At Gap | count gap"}>
                       {_}
                     </Tooltip>
                   )
                 }
               },
               {
                 key:"result",
                 title:"Result",
                 dataIndex:['ncf','value'],
                 render:(_)=> _.toFixed(2) ?? 0,
                 children:[]
               },
             ]
           },
           {
             key:"nsf",
             title:"NSF",
             children:[
               {
                 key:"item",
                 title:"Item",
                 dataIndex:['nsf','item'],
                 children:[],
                 render:(_)=> _ ?? 0
               },
               {
                 key:"compare",
                 title:"Gap",
                 dataIndex:['nsf','countGap'],
                 children:[],
                 render:(_,val)=> {
                   return (
                     <Tooltip title={"Compare At Gap | count gap"}>
                       {_ ?? 0}
                     </Tooltip>
                   )
                 }
               },
               {
                 key:"result",
                 title:"Result",
                 dataIndex:['nsf','value'],
                 render:(_)=> _.toFixed(2) ?? 0,
                 children:[]
               },
             ]
           },
           {
             key:"result",
             title:"NT",
             dataIndex:"result",
             render:(_)=> _.toFixed(2) ?? 0
           },
           {
             key:"rank",
             title:"Tingkat Ketepatan",
             dataIndex:"result",
             render:(_,val)=> {
               return (
                 <div>
                   <Rate
                     disabled
                     count={5}
                     value={_}
                     tooltips={['terrible', 'bad', 'normal', 'good', 'wonderful']} allowHalf />
                 </div>
               )
             }
           },
         ]}
         loading={loading ?? false}
         dataSource={data ?? []}
       />
     </Card>
   </React.Fragment>
  );
}

export default connect(
 mapStateToProps,
)(Top10);