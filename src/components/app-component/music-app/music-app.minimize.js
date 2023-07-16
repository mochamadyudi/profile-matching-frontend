import React, {Component, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import {__AnIsMinify, __AnOpenPlayer} from "../../../redux/actions/Announcement";

function MusicAppMinimize({options, __AnOpenPlayer, __AnIsMinify, ...props})  {
    const refMinimize = useRef(null)
    let timeout
    useEffect(()=> {

        if(refMinimize.current){
            if(options.isMinify){
                timeout = setTimeout(()=> {
                    refMinimize.current.classList.add('show')
                },1000)
            }else{
                timeout = setTimeout(()=> {
                    refMinimize.current.classList.remove('show')
                },1000)
            }
        }
        return ()=> clearTimeout(timeout)
    },[options.isMinify])

    const onOpen = ()=> {
        __AnIsMinify(false)
        __AnOpenPlayer(true)
    }
  return (
      <div className="yid-app-music--minimize" ref={refMinimize} onClick={onOpen}>

      </div>
  );
}

export default connect(
 function({_Announcement}){
     let { options } = _Announcement
     return { options }
 },{__AnOpenPlayer,__AnIsMinify}
)(MusicAppMinimize);