import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import {Form, Select} from "antd";
import {isArray} from "../../../../lib";

function mapStateToProps(state) {
    return {

    };
}
/**
 *
 * @param {Object} props
 * @param {(String|"airlines")} props.name
 * @param {(Array|[])} props.rules
 * @param {(String | "Airlines")} props.label
 * @returns {JSX.Element}
 * @constructor
 */
function FloorSelectForm(props)  {

    const [data, setData] = useState([
        {
            id: 1,
            label: 1
        },
        {
            id: 2,
            label: 2
        },
        {
            id: 3,
            label: 3
        },
        {
            id: 4,
            label: 4
        },
        {
            id: 5,
            label: 5
        }
    ])
    return (
        <Form.Item
            hasFeedback
            name={props?.name ?? "floor"} label={props?.label ?? "Floor"} rules={props?.rules ?? []}>
            <Select>
                {
                    isArray(data) &&
                    data.map((item, index) => {
                        return <Select.Option value={item?.id} key={item.id}>{item.label}</Select.Option>
                    })
                }
            </Select>
        </Form.Item>
    );
}

export default connect(
    mapStateToProps,
)(FloorSelectForm);