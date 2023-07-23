import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Typography, Form, Row, Card, Col, Empty, Tag, Divider} from "antd";
import ApiService from "../../services/api.service";
import Loading from "../../components/shared-components/Loading";
import {useHistory} from "react-router-dom";

function mapStateToProps(state) {
 return {

 };
}

function Index(props)  {
  
  const history = useHistory()
  const [ loading, setLoading ] = useState(false)
  const [ params, setParams ] = useState({
    page:1,
    limit:10
  })
  const [ pagination, setPagination ] = useState({
    page:1,
    limit:10,
    total_record:0
  })
  const [data, setData ] = useState([])
  
  useEffect(()=> {
    setLoading(true)
    new ApiService({
      url:`/api/v1/travel`,
      config : {
        params
      }
    })
      .get()
      .then((response)=> {
        console.log({response})
      setData([...response?.data])
      setPagination({...pagination,...response?.pagination})
      setLoading(false)
    })
      .catch((err)=> {
        setData([])
        setLoading(false)
      })
  },[params])
  
  function onSelect(item){
    history.push(`/dashboard/travel/${item?.id}`)
  }

  
  return (
   <div>
     <Typography.Title level={3} className={'mb-4'}>Pilih Wisata</Typography.Title>
     {
       loading ? <Loading/> :
         Array.isArray(data) && data.length > 0 ?
           <Row gutter={24}>
             {
               data.map((item,index)=> (
                 <Col xs={12} lg={6}>
                   <Card bordered={false} onClick={()=> onSelect(item)} className={'cursor-pointer'}>
                     <Typography.Title level={2}>{item?.name}</Typography.Title>
                     <Tag color={'cyan'}>{item?.location}</Tag>
                     <Typography.Paragraph>{item?.description}</Typography.Paragraph>
                   </Card>
                 </Col>
               ))
             }
           </Row>
           : <Empty/>
     }
   </div>
  )
}

export default connect(
 mapStateToProps,
)(Index);