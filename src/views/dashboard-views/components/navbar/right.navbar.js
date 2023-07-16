import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Button} from "antd";
function RightNavbar(){
    return (
        <div className="text-right">
            <Button type={'primary'}>right button</Button>
        </div>
    )
}

RightNavbar.propTypes = {}
RightNavbar.defaultProps = {}

export default connect(()=> {
    return {}
},{})(React.memo(RightNavbar))