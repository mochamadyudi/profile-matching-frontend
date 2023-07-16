import React, {Component, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Form, Select, Spin} from "antd";
import {isArray} from "../../../../lib";

import {findKey} from "../../../../utils";
import ApiService from "../../../../services/api.service";

function mapStateToProps({}) {
	return { };
}


/**
 *
 * @param {Object} props
 * @param {function} props.mapping
 * @param {function} props.children
 * @param {String|Number} props.initialValue
 * @param {(String|"category")} props.name
 * @param {(Array|[])} props.rules
 * @param {(String | "Category")} props.label
 * @param {Object} props.list
 * @param {string | string[]} props.keyValue
 * @param {string | string[]} props.keyDisplay
 * @param {Boolean} props.list.loading
 * @param {Array} props.list.data
 * @param {Object} props.list.params
 * @param {Object} props.list.pagination
 * @returns {JSX.Element}
 */
function CategorySelect(props) {
	let {
		initialValue = null,
		keyValue = ['id'],
		keyDisplay = ['name']
	} = props
	
	const [loading, setLoading] = useState(false)
	const [params, setParams] = useState({
		page: 1,
		limit: 100
	})
	const [data, setData] = useState([])
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10
	})
	useEffect(() => {
		setLoading(true)
		new ApiService({
			url: `/api/v1/master-data/category`,
			config: {
				params: {
					...params,
				}
			}
		}).get()
			.then((response) => {
				setData([...response?.data])
				setPagination({
					...pagination,
					...response?.pagination,
					...response?.paginate
				})
				setLoading(false)
			})
			.catch((err) => {
				setData([])
				setLoading(false)
			})
	}, [params])
	
	
	return (
		<Form.Item
			initialValue={initialValue ?? null}
			hasFeedback
			name={props?.name ?? "category"}
			label={props?.label ?? "Category"}
			rules={props?.rules ?? []}>
			<Select
				{...props?.select}
				loading={loading ?? false}
				showSearch={props?.select?.showSearch ?? false}
				notFoundContent={<Spin size="small"/>}
			>
				{
					typeof (props?.mapping) === 'function' ?
						props?.mapping({data: data}) :
						data && isArray(data) &&
						data.map((item, index) => {
							return !props?.children ? <Select.Option value={findKey(item, keyValue ?? ['id'])}
							                                         key={findKey(item, keyValue ?? ['id'])}>{findKey(item, keyDisplay ?? ['name'])}</Select.Option>
								: typeof (props?.children) === 'function' ? props?.children({item, index}) : null
						})
				}
			</Select>
		</Form.Item>
	);
}

export default connect(
	mapStateToProps, {}
)(CategorySelect);