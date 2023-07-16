import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Form, Select, Spin} from "antd";
import {isArray} from "../../../../lib";
import {GET_LIST_MD_AIRLINES} from "../../../../redux/actions/MasterData";
import {findKey} from "../../../../utils";

function mapStateToProps({MasterData}) {
    let { airlines } = MasterData
    let { list  } = airlines
    return { list };
}


/**
 *
 * @param {Object} props
 * @param {Function} props.children
 * @param {(String|"airlines"|Array|[])} props.name
 * @param {String|Number} props.initialValue
 * @param {String} props.keyValue
 * @param {String} props.keyDisplay
 * @param {(Array|[])} props.rules
 * @param {(String | "Airlines")} props.label
 * @param {(Object|{})} props.select
 * @param {Object} props.list
 * @param {Boolean} props.list.loading
 * @param {Array} props.list.data
 * @param {Object} props.list.params
 * @param {Object} props.list.pagination
 * @param {Function} props.GET_LIST_MD_AIRLINES
 * @returns {JSX.Element}
 */
function AirlinesSelectForm(props) {
    let {
        GET_LIST_MD_AIRLINES,
        list,
        keyValue = ['id'],
        initialValue= null,
        keyDisplay = ['data','name']
    } = props
    const [ params, setParams ] = useState({
        page:1,
        limit:50
    })

    useEffect(()=> {
        GET_LIST_MD_AIRLINES({query:params})
    },[GET_LIST_MD_AIRLINES,params])

    return (
        <Form.Item
          hasFeedback
            initialValue={initialValue}
            name={props?.name ?? "airlines"}
            label={props?.label ?? "Airlines"}
            rules={props?.rules ?? []}>
            <Select
                {...props?.select}
                loading={list?.loading ?? false}
                showSearch
                notFoundContent={<Spin size="small"/>}
            >
                {
                    list?.data && isArray(list?.data) &&
                    list?.data.map((item, index) => {
                        return !props?.children ? <Select.Option value={findKey(item,keyValue ?? ['id'])} key={findKey(item,keyValue ?? ['id'])}>
                            {item?.data?.name ?? "undefined"}
                        </Select.Option> :
                          typeof(props?.children) === 'function' ? props?.children({item,index}) : null
                    })
                }
            </Select>
        </Form.Item>
    );
}

export default connect(
    mapStateToProps, { GET_LIST_MD_AIRLINES }
)(AirlinesSelectForm);