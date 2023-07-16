import React, {Component, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Form, Select } from 'antd';
import {ACTION_MD_THIN_STATUS} from "../../redux/actions/MasterData";
import {findKey} from "../../utils";

function mapStateToProps(state) {
 return {

 };
}

/**
 *
 * @param {object} props
 * @param {object} props.select
 * @param {string | string[]} props.name
 * @param {string} props.label
 * @param {object[]} props.rules
 * @param {string[]} props.selectValue
 * @param {string[]} props.selectLabel
 * @param {string[]} props.selectKey
 * @returns {JSX.Element}
 */
function ThinClientStatusSelect(props)  {
  let {
    ACTION_MD_THIN_STATUS,
    list,
    select = {},
    name,
    label,
    rules,
    selectValue,
    selectLabel,
    selectKey = Number,
  } = props
  const [ data ] = useState([
    {
      value:'inactive',
      label:"IN-ACTIVE"
    },
    {
      value:'active',
      label:"ACTIVE"
    },
    {
      value:"disabled",
      label:"DISABLED"
    }
  ])

  return (
   <Form.Item name={name ?? 'status'} label={label ?? "Thin Client Status"} rules={rules ?? [{required:true,message:"Can't be empty!"}]}>
     <Select {...props?.select} placeholder={props?.select?.placeholder ?? 'Select your status'} loading={list?.loading ?? false}>
       {
         data.map((item,index)=> (
           <Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>
         ))
       }
     </Select>
   </Form.Item>
  );
}

export default connect(
 function({MasterData}){
   let { thin_client } = MasterData
   let { status } = thin_client
   let { list } = status
   return { list }
 },{ACTION_MD_THIN_STATUS}
)(ThinClientStatusSelect);