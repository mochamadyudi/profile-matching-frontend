import React, { Component, useState,useEffect } from 'react';
import { connect } from 'react-redux';
import {DatePicker, Form, Select} from "antd";
import {isArray} from "../../../../lib";

function mapStateToProps(state) {
    return {

    };
}


/**
 *
 * @param {Object} props
 * @param {(String|"date")} props.name
 * @param {(Array|[])} props.rules
 * @param {(String | "Date")} props.label
 * @param {(Object|undefined)} props.picker
 * @returns {JSX.Element}
 * @constructor
 */
function DateForm(props)  {
    return (
        <Form.Item
            hasFeedback
            name={props?.name ?? "date"} label={props?.label ?? "Date"} rules={props?.rules ?? []} >
            <DatePicker {...props?.picker}/>
        </Form.Item>
    );
}

export default connect(
    mapStateToProps,
)(DateForm);