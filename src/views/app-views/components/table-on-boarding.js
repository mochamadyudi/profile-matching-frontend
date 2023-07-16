import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Card, Table, Tag, Tooltip} from "antd";
import { FilterOutlined } from '@ant-design/icons'
import AvatarStatus from "components/shared-components/AvatarStatus";
import {useLocation} from "react-router-dom";
import {_setInitParams, InitialParams, ToNumber} from "../../../lib/helpers";
import ApiService from "../../../services/api.service";

function TableOnBoarding(props){
    let { title } = props
    const locations = useLocation()
    const [ params, setParams] = useState(()=> {
        const {page,limit} = InitialParams({
            search: locations.search,
            keys: ['page','limit']
        })
        return {
            page:ToNumber(page,1),
            limit: ToNumber(limit,10)
        }
    })
    const [ loading , setLoading ] = useState(false)
    const [ pagination , setPagination ] = useState({
        pageSize: 1,
        limit: 10,
        total: 100
    })
    const [ data, setData ] = useState([])

    useEffect(()=> {
        setLoading(true)
        new ApiService({
            mode: 'local',
            url:'/api/v1/templates.json'
        }).get()
            .then((response)=> {
                clearTimeout(()=> {
                    setLoading(false)
                },3000)
                clearTimeout()

            })
            .catch((err)=> {
                console.log({err})
            })
    },[params])

    function  ExtraComponent(){
        return (
            <div className="text-right">
                <Tooltip title={'Filterd Data'}>
                    <Button
                        type={'primary'}
                        ghost
                        size={'small'}
                        icon={<FilterOutlined/>}/>
                </Tooltip>
            </div>
        )
    }

    const columns = [
        {
            title:"Date",
            render:()=> '01/03/2023'
        },
        {
            title:"Airlines",
            render:()=> {
                return (
                    <>
                        <AvatarStatus
                            src={'/img/avatars/thumb-1.jpg'}
                            name={'Garuda Indonesia'}
                        />
                    </>
                )
            }
        },
        {
            title:"Airlines",
            render:()=> "CGK01"
        },
        {
            title:"FLIGHT NO",
            render:()=> <Tag color={'blue'}>ID-5678</Tag>
        },
        {
            title:"SCHEDULE TIME",
            render:()=> "11:30"
        },
        {
            title:"ACTUAL TIME",
            render:()=> "-"
        },
        {
            title:"STATUS",
            render:()=> "ARRIVED"
        }
    ]

    return (
        <div className="w-full">
            <Card title={title ?? null} extra={<ExtraComponent/>}>
                <Table
                    rowClassName={(record, index) => index === 0 ?"!mk-bg-green-500 !mk-bg-opacity-20":''}
                    pagination={!props?.pagination ? false: {
                        pageSize: params?.limit,
                        total:100,
                        onChange:(page, pageSize)=> {
                            setParams({
                                ...params,
                                page:page,
                                limit:pageSize
                            })
                        }
                    }}
                    columns={columns}
                    dataSource={[1,2,3,4,5]}
                />
            </Card>
        </div>
    )
}


TableOnBoarding.propTypes = {
    title: PropTypes.oneOf([PropTypes.string.isRequired,PropTypes.any.isRequired]),
    params: PropTypes.shape({
        page:PropTypes.number.isRequired,
        limit: PropTypes.number.isRequired
    }),
    pagination: PropTypes.bool.isRequired
}
TableOnBoarding.defaultProps = {
    title:null,
    pagination: false
}

export default TableOnBoarding