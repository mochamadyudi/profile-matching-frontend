import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingAuthComponent from "../layout-components/loading-auth.component";

function mapStateToProps({auth}) {
 return {
     auth
 };
}

/**
 *
 * @param {Object} props
 * @param props.children
 * @param {Object} props.auth
 * @param {boolean} props.auth.loading
 * @returns {JSX.Element}
 * @constructor
 */
function UseAuthComponent(props)  {
    let { auth,children } = props
    if(auth.loading){
        return <LoadingAuthComponent {...props?.loading}/>
    }
  return (
   <div>
       {children}
   </div>
  );
}

export default connect(
 mapStateToProps,
)(UseAuthComponent);