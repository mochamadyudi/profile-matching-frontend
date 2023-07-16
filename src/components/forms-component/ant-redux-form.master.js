import React from 'react'
import {Form, Input, Radio, Select, Checkbox, DatePicker} from "antd";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {Option} = Select
const {TextArea,} = Input

const {
    RangePicker,
    TimePicker,
    MonthPicker,
    YearPicker
} = DatePicker

const formItemLayout = {
    labelCol: {
        xs: { span: 24},
        sm: { span : 6},
    },
    wrapperCol: {
        xs: { span:24 },
        sm: { span: 14 }
    }
}

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span:24,
            offset:0
        },
        sm: {
            span:14,
            offset:6
        }
    }
}

const makeField = Component => ({
    input,
    meta,
    children,
    hasFeedback,
    label,
    ...rest
}) => {
    // console.log({rest,    input,
    //     meta,
    //     children,
    //     hasFeedback,
    //     label,})
    const hasError = meta.touched && meta.invalid;
    console.log({...input,meta})
    return (
        <FormItem
            {...input}
            rules={rest?.rules ?? []}
            label={label}
            hasFeedback={hasFeedback}
            // validateStatus={hasError ? "error": "success"}
            // hasFeedback={hasFeedback && hasError}
            help={meta.error}
        >
            <Component {...rest} children={children}/>
        </FormItem>
    )
}

const AntdInput = makeField(Input);
const AntdRadioGroup = makeField(RadioGroup);
const AntdSelect = makeField(Select);
const AntdCheckbox = makeField(Checkbox);
const AntdTextArea = makeField(TextArea);
const AntdRangePicker = makeField(RangePicker)
const AntdMonthPicker = makeField(MonthPicker)
const AntdYearPicker = makeField(YearPicker)
const AntdDatePicker = makeField(DatePicker)
const AntdTimePicker = makeField(TimePicker)


export {
    makeField,
    FormItem,
    formItemLayout,
    tailFormItemLayout,
    AntdInput,
    AntdRadioGroup,
    AntdSelect,
    AntdCheckbox,
    AntdTextArea,
    AntdRangePicker,
    AntdMonthPicker,
    AntdYearPicker,
    AntdDatePicker,
    AntdTimePicker,
}