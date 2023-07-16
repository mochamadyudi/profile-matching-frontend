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
function TypeAnnouncementSelectForm(props)  {

    const [data, setData] = useState([
        {
            id: 1,
            label: "TO BOARDING GATE"
        },
        {
            id: 2,
            label: "BOARDING NOW"
        },
        {
            id: 3,
            label: "CHECK-IN"
        },
        {
            id: 4,
            label: "BOARDING"
        },
        {
            id: 5,
            label: "ARRIVAL"
        }
    ])
    return (
        <Form.Item hasFeedback name={props?.name ?? "type"} label={props?.label ?? "Type"} rules={props?.rules ?? []}>
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
)(TypeAnnouncementSelectForm);