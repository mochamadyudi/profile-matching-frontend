import React from 'react'
import {useSelector} from "react-redux";
import {Button, Col, Row} from "antd";
import {Link, useHistory} from "react-router-dom";
import {ArrowLeftOutlined} from "@ant-design/icons";
import ContainerTailwind from "./ContainerTailwind";

const NotFoundPage = ()=> {
    const history = useHistory()
    const theme = useSelector(state => state.theme.currentTheme)
    return (
        <div className={`h-100 ${theme === 'light' ? '' : ''}`}>
            <ContainerTailwind>
                <div className="d-flex flex-column justify-content-between h-100 pb-md-4 pt-md-1">
                    <Row align="middle">
                        <Col xs={24} sm={24} md={8}>
                            <h1 className="font-weight-bold mb-4 display-4">Page not found</h1>
                            <p className="font-size-md mb-4">We've noticed you lost your way, no worries, we will help you to found the correct path.</p>
                            <Button type="primary" icon={<ArrowLeftOutlined />} onClick={()=> history.goBack()}>Go back</Button>
                        </Col>
                        <Col xs={24} sm={24} md={{ span: 14, offset: 2 }}>
                            <img className="img-fluid mt-md-0 mt-4" src="/img/others/img-20.png" alt="" />
                        </Col>
                    </Row>
                </div>
            </ContainerTailwind>

        </div>
    )
}

export default NotFoundPage