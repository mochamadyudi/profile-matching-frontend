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
function TimePicker(props)  {
    return (
        <Form.Item hasFeedback name={props?.name ?? "time"} label={props?.label ?? "time"} rules={props?.rules ?? []} >
            <DatePicker.TimePicker {...props?.picker}/>
        </Form.Item>
    );
}

export default connect(
    mapStateToProps,
)(TimePicker);