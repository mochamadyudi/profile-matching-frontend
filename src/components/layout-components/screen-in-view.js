import React, { useState,useEffect } from 'react';
import {useInView, useInViewEffect} from 'react-hook-inview'

function mapStateToProps(state) {
 return {

 };
}

function ScreenInView(props)  {
  const [isVisible, setIsVisible] = useState(false)
  
  const ref = useInViewEffect(
    ([entry], observer) => {
      console.log(entry.isIntersecting,'entry.isIntersecting')
      if (entry.isIntersecting) {
        observer.unobserve(entry.target)
      }
      setIsVisible(entry.isIntersecting)
    },
    { threshold: 1, })
  return <div ref={ref} {...props}>{isVisible ?
  
      typeof(props.children) === 'function'?
    props.children({isVisible}):
    props.children
  
    : ''}</div>;
}

export default ScreenInView;