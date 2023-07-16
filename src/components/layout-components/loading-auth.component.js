import React, { Component } from 'react';
import { connect } from 'react-redux';
import LottieLoading from "../animated-components/lottie-loading";

function mapStateToProps(state) {
 return {

 };
}

/**
 * @param {Object} props
 * @param {String|null|ReactNode|InnerHTML} props.title
 * @param {String|null|ReactNode|InnerHTML} props.message
 * @returns {JSX.Element}
 * @constructor
 */
function LoadingAuthComponent(props)  {
  return (
   <div className={'yid-loading'}>
       <LottieLoading cover={'icon'} width={200} height={200}/>
       {
           props?.title && (
               <h1>{props?.title}</h1>
           )
       }
       {
           props?.message ? (
               <p>{props?.message}</p>
           ):<p>Loading....</p>
       }
   </div>
  );
}

export default connect(
 mapStateToProps,
)(LoadingAuthComponent);