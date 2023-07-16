import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AccessDeniedComponent from "./access-denied.component";
import {ComponentChildren} from "../layout-components/component-children";
import {PERMISSION_ONE_OF} from "../../constants/component.constants";


function LayoutPermission(props){
    let { permission,role,extra } = props
    if(!permission) return null
    if(typeof(permission) === 'string') {
        return permission !== role ? null : (
            extra ? extra : <AccessDeniedComponent title={'Access Denied'}/>
        )
    }
    if(Array.isArray(permission) && permission.length > 0){
        return permission.filter((child)=> child === role).length > 0 ? <ComponentChildren children={props?.children ?? null}/> :
            extra ? extra : <AccessDeniedComponent title={'Access Denied'}/>
    }
    return null

}

LayoutPermission.propTypes = {
    role: PropTypes.string.isRequired,
    permission: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.array.isRequired
    ]).isRequired,
    extra: PropTypes.node,
}
LayoutPermission.defaultProps = {
    role: 'admin',
    permission: PERMISSION_ONE_OF,
    extra: null
}

export default connect(()=> {
    return {}
},{})(React.memo(LayoutPermission))