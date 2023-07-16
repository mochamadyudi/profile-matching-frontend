import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

function NewUserNavbar(props) {
    return (
        <div className="w-full">

        </div>
    )
}

NewUserNavbar.propTypes = {}
NewUserNavbar.defaultProps = {}

export default connect(({}) => {
    return {}
}, {})(React.memo(NewUserNavbar))