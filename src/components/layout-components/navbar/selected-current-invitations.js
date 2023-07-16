import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { first } from 'lodash'
import { connect } from 'react-redux'
import {Badge, Button, Divider, Dropdown, Empty, Menu} from "antd";
import Flex from "../../shared-components/Flex";
import {DownOutlined, LoadingOutlined} from "@ant-design/icons";
import {EmitCurrentInvitation} from "../../../redux/actions/Settings";
import {Link} from "react-router-dom";


function SelectedCurrentInvitations(props){
    let { invitations,current,EmitCurrentInvitation } = props

    return (
        <div className="w-full">
            <Dropdown
                overlayStyle={{
                minWidth:'300px'
            }} overlay={ <Menu>
                {
                    invitations?.data && invitations?.data.length > 0 ?
                    invitations.data.map((item,index)=> {
                        return (
                            <Menu.Item key={index} onClick={()=> {
                                EmitCurrentInvitation(item)
                            }}>
                                <Badge color={item?.status === 'free' ? 'gray':'green'} text={item?.title}/>
                            </Menu.Item>
                        )
                    }): (
                        <div className="p-4">
                        <Empty/>
                        </div>
                        )
                }
                <Divider className={'m-0 p-0  my-2'}/>
                <Menu.Item>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Flex mobileFlex={true} alignItems={'center'} justifyContent={'between'}>
                        <Link to={'/wedding'}><span className={'font-size-sm'}>Lihat Semua</span></Link>
                        <Button type={'primary'} size={'small'} className={'font-size-sm m-0'} style={{
                            lineHeight:1,
                        }} >Buat Baru</Button>
                    </Flex>
                </Menu.Item>
            </Menu>}
                      onVisibleChange={()=> {
                      }}
            >
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    {
                        invitations?.loading ?
                            <Flex alignItems={'center'} mobileFlex={true}>
                                <LoadingOutlined style={{ fontSize: 12 }} spin />
                                <span className={'ml-3'}>Loading</span>
                            </Flex>
                            :
                            Array.isArray(current?.invitations) && current?.invitations.length > 0 ?
                            current?.invitations.slice(0,1).map((item,index)=> {
                                return (
                                    <Badge color={item?.status === 'free' ? 'gray':'green'} text={item?.title}/>
                                )
                            }): (
                                <span>Pilih Template</span>
                                )
                    }
                    <DownOutlined className={'ml-2'} />
                </a>
            </Dropdown>
        </div>
    )
}

SelectedCurrentInvitations.propTypes = {}
SelectedCurrentInvitations.defaultProps = {}

export default connect(({Settings})=> {
    let { list,current } = Settings
    let { invitations } = list
    return {invitations, current}
},{EmitCurrentInvitation})(
    SelectedCurrentInvitations
)