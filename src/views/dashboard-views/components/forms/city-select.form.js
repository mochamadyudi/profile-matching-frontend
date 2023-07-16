import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Form, Select, Spin} from "antd";
import {isArray} from "../../../../lib";
import {GET_LIST_MD_CITY} from "../../../../redux/actions/MasterData";
import {findKey} from "../../../../utils";

function mapStateToProps({MasterData}) {
    let { city } = MasterData
    let { list  } = city
    return { list };
}


/**
 *
 * @param {Object} props
 * @param {function} props.children
 * @param {(String|"city"|Array|[])} props.name
 * @param {String} props.keyValue
 * @param {String | string[]} props.displayValue
 * @param {String|Number} props.initialValue
 * @param {(Array|[])} props.rules
 * @param {(String | "Airlines")} props.label
 * @param {(Object|{})} props.select
 * @param {Object} props.list
 * @param {Boolean} props.list.loading
 * @param {Array} props.list.data
 * @param {Object} props.list.params
 * @param {Object} props.list.pagination
 * @param {Function} props.GET_LIST_MD_CITY
 * @returns {JSX.Element}
 */
function CitySelectForm(props) {
    let {
        GET_LIST_MD_CITY,
        list,
        displayValue =['data','name'],
        keyValue = 'id',
        initialValue= null
    } = props
    const [ params, setParams ] = useState({
        page:1,
        limit:50
    })

    useEffect(()=> {
        GET_LIST_MD_CITY({query:params})
    },[GET_LIST_MD_CITY,params])

    return (
      <React.Fragment>
          <Form.Item
            hasFeedback
            name={props?.name ?? "city"}
            label={props?.label ?? "City"}
            rules={props?.rules ?? []}
            initialValue={initialValue}
          >
              <Select
                {...props?.select}
                loading={list?.loading ?? false}
                showSearch
                notFoundContent={<Spin size="small"/>}
              >
                  {
                    list?.data && isArray(list?.data) &&
                    list?.data.map((item, index) => {
                        return !props?.children ? <Select.Option value={findKey(item,keyValue ?? ['id'])} key={findKey(item,keyValue ?? ['id'])}>{findKey(item,displayValue ?? ['data','name']) ?? "-"}</Select.Option>
                          : typeof(props?.children) === 'function' ? props?.children({item,index}) : null
                    })
                  }
              </Select>
          </Form.Item>
      </React.Fragment>
    );
}

export default connect(
    mapStateToProps, { GET_LIST_MD_CITY }
)(CitySelectForm);