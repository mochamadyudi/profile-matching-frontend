import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import MusicPlayer from "./controllers/player.controller";
import {MusicApp} from "./index";
import MusicAppLottieType from "./music-app.lottie-type";
import ArtistsController from "./controllers/artists.controller";
import {__AnClosePlayer, __AnIsMinify} from "../../../redux/actions/Announcement";

const OverviewContent = connect(({_Announcement})=> {
    return {_Announcement}
},{})(function(props){
    let { _Announcement } = props
    const [lottieType,setLottieType] = useState('loading')
    const [isStopped, setIsStopped] = useState(true)

    useEffect(()=> {
        setLottieType((LottieQueue({type:_Announcement.player.isType})))
    },[_Announcement.player.isType])

    function LottieQueue({type}){
        switch (type){
            case "SUCCESS-SELECTED":
                setIsStopped(false)
                return "announcement"
            case "SELECTED":
            default:
                setIsStopped(true)
                return "loading"
        }
    }
    return (
        <div className="music-overview-content">
            <div className={'music-overview-content__header'}>
                {/*<h2 className={'text-white mk-text-lg'}>Lorem ipsum dolor sit amet</h2>*/}
                {/*<pre>{JSON.stringify(_Announcement?.player,null,2)}</pre>*/}
            </div>
            <div className="music-overview-content__animation">
                <MusicAppLottieType type={lottieType} height={480} width={500} isStopped={isStopped}/>
            </div>
        </div>
    )
})

function MusicAppContent({__AnIsMinify, __AnClosePlayer, ...props})  {
    let { options,player, collections } = props
    
    
    const refIsOpen = useRef(null)
    useEffect(()=> {
        if(refIsOpen.current){
            let validate = Object.entries(options).filter(([key])=> key !== 'isOpen').map(([key,value])=> value)
            if(options.isOpen && validate.every((val)=> val === false)){
                refIsOpen.current.classList.add('show')
                document.querySelector('body').style.overflowY = 'hidden'
            }else{
                document.querySelector('body').style.overflowY = 'auto'
                refIsOpen.current.classList.remove('show')
            }
        }
    },[options])
    
    function Playlist({type}){
        switch (type){
            case "SUCCESS-SELECTED":
            case "SELECTED":
                return <MusicApp.PlayList.Detail {...props}/>
            default:
                return <MusicApp.PlayList.Global {...props}/>
        }
    }


  return (
      <React.Fragment>
          <div className="music-content" ref={refIsOpen}>
              <div>
                  <div className="music-hero">
                      <div className="close" onClick={()=> __AnClosePlayer(false)}/>
                      <div className="minify" onClick={()=> __AnIsMinify(true)}/>
                      <div className="fullscreen"/>
                  </div>
                  <div className="music-overview">
                      <OverviewContent {...props}/>
                      <div className="music-overview-playlist">
                          <Playlist type={player?.isType ?? null}/>
                      </div>
                  </div>
                  <MusicPlayer/>
              </div>
          </div>
      </React.Fragment>
  );
}

export default connect(
    function({_Announcement}){
        let { options, player, collections } = _Announcement
        return { options,player, collections }
    },{__AnClosePlayer,__AnIsMinify}
)(MusicAppContent);