import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import {GET_LIST_MD_LOCATION} from "../../../../redux/actions/MasterData";
import {Form, Select} from "antd";
import {findKey} from "../../../../utils";

function mapStateToProps({MasterData}) {
    let { location } = MasterData
    let { list }  = location
 return {list};
}

/**
 *
 * @param {Object} props
 * @param {Boolean} props.hasFeedback
 * @param {Object} props.list
 * @param {Boolean} props.list.loading
 * @param {Array} props.list.data
 * @param {Object} props.search
 * @param {Object|undefined} props.list.query
 * @param {Function} props.GET_LIST_MD_LOCATION
 * @param {String|String[]} props.name
 * @param {String|String[]} props.selectValue
 * @param {String|String[]} props.selectLabel
 * @param {String} props.label
 * @param {Array|Array[Object]} props.rules
 * @param {String|Number|Boolean|null|undefined} props.initialValue
 * @returns {JSX.Element}
 */
function MdLocationSelect(props)  {
    let {
        GET_LIST_MD_LOCATION,
        name,
        label,
        rules,
        initialValue,
      selectValue ,
      selectLabel ,
        list,
        hasFeedback,
    } = props
    const [query,setQuery] = useState({
        page:1,
        limit:10
    })

    useEffect(()=> {
        GET_LIST_MD_LOCATION({query})
    },[GET_LIST_MD_LOCATION])

  return (
   <Form.Item
       hasFeedback={hasFeedback ?? false}
       name={name}
       label={label}
       rules={rules??[]}
       initialValue={initialValue}
   >
       <Select {...props?.search} placeholder={'Select Location'} loading={list?.loading ?? false}>
           {
               list?.data && Array.isArray(list?.data) && list.data.length > 0 &&
               list?.data.map((item)=> {
                   return (
                       <Select.Option key={item?.id} value={findKey(item,selectValue ?? ['data','name']) ?? item.identifier}>{findKey(item,selectLabel ?? ['data','name'])}</Select.Option>
                   )
               })
           }
       </Select>

   </Form.Item>
  );
}

export default connect(
 mapStateToProps,{GET_LIST_MD_LOCATION}
)(MdLocationSelect);