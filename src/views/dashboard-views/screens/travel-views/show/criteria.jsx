import React, {useContext, useEffect, useRef, useState} from 'react';
import { connect } from 'react-redux';
import ApiService from "../../../../../services/api.service";
import {Card, Form, message, Input, Table, Tag} from "antd";
import moment from "moment";
import {getGlobalTravelCriteria} from "../../../../../redux/actions/global";

const EditableContext = React.createContext(null);

function mapStateToProps({Global}) {
  let { criteria } = Global
  return {
    ...criteria
  };
}

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
                        title,
                        editable,
                        children,
                        dataIndex,
                        record,
                        handleSave,
                        ...restProps
                      }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};


function Criteria(props)  {
  let { getGlobalTravelCriteria } = props
  let { list,show } = props
  const [ data, setData]  = useState([])
  const [ params, setParams]  =useState(()=> {
    return {
      ...list?.params
    }
  })
  useEffect(()=> {
    getGlobalTravelCriteria({params:{...params}})
  },[params,getGlobalTravelCriteria])
  
  useEffect(()=> {
    setData([...list.data])
  },[list.data])
  
  
  const handleSave = (row,col) => {
    const newData = [...list?.data];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    console.log({index,item,row,newData})
    
    new ApiService({
      url:`/api/v1/criteria/${row?.id}`,
      body: {
        [col.name]: row[col.name]
      }
    }).patch()
      .then((response)=> {
        if(!response?.error){
          message.success(response?.message)
          setData([...newData]);
        }else{
          message.info(response?.message)
        }
      })
      .catch((err)=> {
        message.error(err?.message)
      })
  };
  
  const defaultColumns = [
    {
      dataIndex:"id",
      title: "No",
      width:70,
      render: (_,val,index)=> index + 1
    },
    {
      key:"label",
      name:"label",
      dataIndex:"label",
      title: "Label",
      editable: false,
    },
    {
      key: "description",
      "name":"description",
      dataIndex:"description",
      title: "Description",
      editable: false,
    },
    {
      key: "value",
      "name":"value",
      dataIndex:"value",
      title: "Index Value",
      editable: true,
    },
    {
      key: "isPrimary",
      "name":"isPrimary",
      dataIndex:"isPrimary",
      title: "Core Factor",
      editable: false,
      render:(_,val,index)=> {
        return _ ? <Tag color={'cyan'}>YES</Tag> : <Tag color={'orange'}>NO</Tag>
      }
    },
    {
      dataIndex:"createdAt",
      title: "Created At",
      render:(_,val,index)=> {
        return moment(_)?.isValid() ? moment(_).format("DD/MM/YYYY HH:mm a") : "-"
      }
    },
  ]
  
  
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: function(row){
          handleSave(row,col)
        },
      }),
    };
  });
  
  return (
    <Card bordered={false} title={'Criteria'}>
      <Table
        components={{
          body: {
            row: EditableRow,
            cell:EditableCell
          }
        }}
        rowClassName={() => 'editable-row'}
        className={'table'}
        loading={list?.loading}
        dataSource={data ?? []}
        columns={columns ?? []}
        pagination={list?.params?.limit > list?.pagination?.total_record ? false : {
          pageSize:list?.params?.limit,
          current: list?.params?.page,
          total:list?.pagination?.total_items ?? 0,
          onChange: function (page,pageSize){
            setParams({
              ...list?.params,
              page,
              limit: pageSize
            })
          }
        }}
      />
    </Card>
  );
}

export default connect(
 mapStateToProps, {getGlobalTravelCriteria}
)(Criteria);