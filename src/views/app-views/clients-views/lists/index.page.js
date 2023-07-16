import React from 'react'
import { Card, Table, Row,Col,Button } from 'antd'
import ContainerTailwind from "../../../../components/layout-components/ContainerTailwind";
import {PageHeaderAlt} from "../../../../components/layout-components/PageHeaderAlt";
import Flex from 'components/shared-components/Flex/index'
function ListsPage(props){


    const columns = [
        {
            dataIndex:"id",
            title:"No",
            render: (_,val,index)=> index + 1
        }
    ]
    const ExtraComponent = ()=> {
        return (
            <div className="text-right mb-3">
                <Button type={'primary'} size={'small'}>Filter</Button>
            </div>
        )
    }
    return (
        <React.Fragment>
            <PageHeaderAlt>
                <ContainerTailwind>
                    <Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
                        <h2 className="mb-3">{'Think Client'} </h2>
                        <div className="mb-3">
                            <Button type="primary"  htmlType="submit" size={'small'}>Add</Button>
                        </div>
                    </Flex>
                </ContainerTailwind>
            </PageHeaderAlt>
            <ContainerTailwind style={{marginTop:20}}>
                <Row justify={'center'}>
                    <Col span={20} className={'!mk-space-y-4'}>
                        <Card extra={<ExtraComponent/>}>
                            <Table
                                columns={columns}
                                dataSource={[]}
                            />
                        </Card>
                    </Col>
                </Row>
            </ContainerTailwind>
        </React.Fragment>
    )
}

ListsPage.propTypes = {}
ListsPage.defaultProps = {}

export default ListsPage