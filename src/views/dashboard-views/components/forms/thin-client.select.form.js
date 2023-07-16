import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Form, Select} from "antd";
import ApiService from "../../../../services/api.service";
import {findKey} from "../../../../utils";

function mapStateToProps(state) {
 return {

 };
}

/**
 *
 * @param {Object} props
 * @param {function} props.children
 * @param {(Object|undefined)} props.params
 * @param {Number} props.params.page
 * @param {Number} props.params.limit
 * @param {(Object|undefined)} props.pagination
 * @param {Number} props.pagination.page
 * @param {Number} props.pagination.limit
 * @param {Object} props.form
 * @param {(String|Array)} props.form.name
 * @param {String} props.form.label
 * @param {Array.<{required: Boolean, message: String}>} props.form.rules
 * @returns {JSX.Element}
 */
function ThinClientSelectForm(props)  {
    let { form, select,
        keyValue = ['id'],
        keyDisplay = ['ip_address']
    } = props
    const [ loading, setLoading ] = useState(false)
    const [ data , setData] = useState([])
    const [params, setParams ] = useState(()=> {
        return {
            page:1,
            limit:100,
        }

    })
    const [ pagination, setPagination ] = useState(()=> {
        if(typeof(props?.pagination) !== 'undefined' && typeof(props?.pagination) === 'object'){
            return {
                ...props?.pagination,
                page: props?.pagination?.page ?? 1,
                limit:props?.pagination?.limit ?? 10,
            }
        }
        return {
            page:1,
            limit:0,
        }
    })
    
    useEffect(()=> {
        setLoading(true)
        setData([])
        new ApiService({
            url:'/api/v1/thin-client',
            config : {
                params: {
                    ...params,
                }
            }
        }).get()
          .then((response)=> {
              setData([...response?.data])
              setPagination({
                  ...pagination,
                  ...response?.pagination,
                  ...response?.paginate
              })
              setLoading(false)
          })
          .catch((err)=> {
              setLoading(false)
              setData([])
          })
    },[params])
  return (
      <Form.Item
          {...form}
          hasFeedback={form?.hasFeedback ?? true}
          name={form?.name ?? "thin_client"}
          label={form?.label ?? "Thin Client"}
      >
          <Select
              {...select}
              placeholder={select?.placeholder ?? "Select thin Client"}
          >
              {
                  data &&
                  data.map((item,index)=> {
                      return !props?.children ? <Select.Option value={findKey(item,keyValue ?? ['id'])} key={findKey(item,keyValue ?? ['id'])}>{findKey(item,['display_name'])} - {findKey(item,keyDisplay ?? ['ip_address'])}</Select.Option>
                        : typeof props?.children === 'function' ? props?.children({item,index}): null
                  })
              }
          </Select>
      </Form.Item>
  );
}

export default connect(
 mapStateToProps,
)(ThinClientSelectForm);