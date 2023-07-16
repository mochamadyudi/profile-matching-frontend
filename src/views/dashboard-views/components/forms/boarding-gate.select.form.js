import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Form, Select} from "antd";
import {isArray} from "../../../../lib";

function mapStateToProps(state) {
    return {};
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
function BoardingGateSelectForm(props) {
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
        },
        {
            id: 6,
            label: 6
        },
        {
            id: 7,
            label: 7
        }
    ])
    return (
        <Form.Item
            hasFeedback
            name={props?.name ?? "type"} label={props?.label ?? "Type"} rules={props?.rules ?? []}>
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
)(BoardingGateSelectForm);