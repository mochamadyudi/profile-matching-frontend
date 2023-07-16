import React, {Component, useEffect} from 'react';
import { connect } from 'react-redux';
import {userLoad} from "../redux/actions/Auth";

function mapStateToProps({auth}) {
 return {
     auth
 };
}

/**
 *
 * @param {Object} props
 * @param {ReactNode} props.children
 * @param {Function} props.userLoad
 * @constructor
 */
function UseAuth(props)  {
    let { userLoad } = props
    useEffect(()=> {
        userLoad()
    },[]);
    return props?.children ?? null
}

export default connect(
 mapStateToProps,{userLoad}
)(UseAuth);