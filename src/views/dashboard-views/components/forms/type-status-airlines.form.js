import React, {Component, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Form, Select, Spin} from "antd";
import {isArray} from "../../../../lib";
import {GET_LIST_MD_AIRLINES_TYPE} from "../../../../redux/actions/MasterData";
import {findKey} from "../../../../utils";

function mapStateToProps({MasterData}) {
    let { airlines_type } = MasterData
    let { list  } = airlines_type
    return { list };
}


/**
 *
 * @param {Object} props
 * @param {function} props.mapping
 * @param {function} props.children
 * @param {String|Number} props.initialValue
 * @param {(String|"airlines")} props.name
 * @param {(Array|[])} props.rules
 * @param {(String | "Airlines")} props.label
 * @param {Object} props.list
 * @param {string | string[]} props.keyValue
 * @param {string | string[]} props.keyDisplay
 * @param {Boolean} props.list.loading
 * @param {Array} props.list.data
 * @param {Object} props.list.params
 * @param {Object} props.list.pagination
 * @param {Function} props.GET_LIST_MD_AIRLINES_TYPE
 * @returns {JSX.Element}
 */
function TypeStatusAirlinesForm(props) {
    let { list,
        GET_LIST_MD_AIRLINES_TYPE,
        initialValue = null,
      keyValue = ['id'],
      keyDisplay = ['data','name']
    } = props
    const [ params, setParams] = useState({
        page:1,
        limit:50
    })

    useEffect(()=> {
        GET_LIST_MD_AIRLINES_TYPE({query:params})
    },[GET_LIST_MD_AIRLINES_TYPE,params])


    return (
        <Form.Item
            initialValue={initialValue ?? null}
            hasFeedback
            name={props?.name ?? "type"}
            label={props?.label ?? "Type"}
            rules={props?.rules ?? []}>
            <Select
                {...props?.select}
                loading={list?.loading ?? false}
                showSearch={props?.select?.showSearch ?? false}
                notFoundContent={<Spin size="small"/>}
            >
              {
                typeof(props?.mapping) === 'function' ?
                  props?.mapping({data:list?.data}) :
                  list?.data && isArray(list?.data) &&
                  list?.data.map((item, index) => {
                    return !props?.children ? <Select.Option value={findKey(item,keyValue ?? ['id'])} key={findKey(item,keyValue ?? ['id'])}>{findKey(item,keyDisplay ?? ['data','name'])}</Select.Option>
                      : typeof(props?.children) === 'function' ? props?.children({item,index}): null
                  })
              }
            </Select>
        </Form.Item>
    );
}

export default connect(
    mapStateToProps,{GET_LIST_MD_AIRLINES_TYPE}
)(TypeStatusAirlinesForm);