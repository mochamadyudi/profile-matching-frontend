import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function AccessDeniedComponent({title, description}){
    return (
        <div className="w-full">
            <span>{title}</span>
            <span>{description}</span>
        </div>
    )
}
AccessDeniedComponent.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}
AccessDeniedComponent.defaultProps = {
    title: "Access Denied",
    description :"Anda tidak dapat mengakses component ini"
}
export default AccessDeniedComponent
