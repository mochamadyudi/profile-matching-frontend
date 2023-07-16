import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col} from 'antd'
import StatisticWidget from "components/shared-components/StatisticWidget";

function OverviewPages(){
    const [data,setData ] = useState([
        {
            title:"Airlines",
            value:"454",
            status:0,
            subtitle: "Lorem ipsum dolor sit amet"
        },
        {
            title:"City",
            value:"1204",
            status:0,
            subtitle: "Lorem ipsum dolor sit amet"
        },
        {
            title:"Thin Client",
            value:"1204",
            status:0,
            subtitle: "Lorem ipsum dolor sit amet"
        },
        {
            title:"Display",
            value:"124",
            status:0,
            subtitle: "Lorem ipsum dolor sit amet"
        },


    ])
    return (
        <div className="w-full">
            <Row gutter={16}>
                {
                    data.map((elm, i) => (
                        <Col xs={24} sm={24} md={24} lg={24} xl={6} key={i}>
                            <StatisticWidget
                                title={elm.title}
                                value={elm.value}
                                status={elm.status}
                                subtitle={elm.subtitle}
                            />
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

OverviewPages.propTypes = {}
OverviewPages.defaultProps ={}

export default connect(()=> {
    return {}
},{})(React.memo(OverviewPages))
