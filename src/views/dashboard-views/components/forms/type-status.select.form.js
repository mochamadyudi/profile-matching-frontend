import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Form, Select, Spin} from "antd";
import {isArray} from "../../../../lib";
import {GET_LIST_MD_AIRLINES_STATUS} from "../../../../redux/actions/MasterData";
import {findKey} from "../../../../utils";

function mapStateToProps({MasterData}) {
    let { airlines_status} = MasterData
    let { list  } = airlines_status
    return { list };
}


/**
 *
 * @param {Object} props
 * @param {(String|"airlines"|Array|[])} props.name
 * @param {(Array|[])} props.rules
 * @param {String} props.keyValue
 * @param {String} props.displayValue
 * @param {(String|Number)} props.initialValue
 * @param {(String | "Airlines")} props.label
 * @param {(Object|{})} props.select
 * @param {Object} props.list
 * @param {Boolean} props.list.loading
 * @param {Array} props.list.data
 * @param {Object} props.list.params
 * @param {Object} props.list.pagination
 * @param {Function} props.GET_LIST_MD_AIRLINES_STATUS
 * @returns {JSX.Element}
 */
function TypeStatusSelectForm(props) {
    let { GET_LIST_MD_AIRLINES_STATUS,
        list ,
        initialValue = null,
        keyValue=['data','name'],
      keyDisplay = ['data','name']
    } = props
    const [ params, setParams ] = useState({
        page:1,
        limit:50
    })

    useEffect(()=> {
        GET_LIST_MD_AIRLINES_STATUS({query:params})
    },[GET_LIST_MD_AIRLINES_STATUS,params])

    return (
        <Form.Item hasFeedback name={props?.name ?? "type"} label={props?.label ?? "Type"} rules={props?.rules ?? []} initialValue={initialValue}>
            <Select
                {...props?.select}
                loading={list?.loading ?? false}
                showSearch
                notFoundContent={<Spin size="small"/>}
            >
                {
                    list?.data && isArray(list?.data) &&
                    list?.data.map((item, index) => {
                        return <Select.Option value={findKey(item, keyValue ?? ['id'])} key={findKey(item,keyValue ?? ['id'])}>{findKey(item,keyDisplay ?? ['data','name'])}</Select.Option>
                    })
                }
            </Select>
        </Form.Item>
    );
}

export default connect(
    mapStateToProps, { GET_LIST_MD_AIRLINES_STATUS }
)(TypeStatusSelectForm);