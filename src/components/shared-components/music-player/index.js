import React, { useState,useEffect,useRef,Component } from 'react';
import { connect } from 'react-redux';
import {PlayCircleFilled,SoundOutlined,CloseCircleFilled, PauseCircleFilled, CloseOutlined} from '@ant-design/icons'
import {Button, Popover, Slider} from "antd";
import {PlayerClosed} from '../../../redux/actions'
function mapStateToProps({_Audio}) {

 return {
     ..._Audio
 };
}

function MusicPlayer(props)  {
    let {
        PlayerClosed,
        loading,
        isType,
        url,
        title

    } = props
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = React.createRef();


    function togglePlay(){
        if(audioRef.current){
            if(isPlaying){
                audioRef.current.pause();
            }else{
                audioRef.current.play();
            }
        }
        setIsPlaying(!isPlaying)
    }
    useEffect(()=> {
        if(isType === null){
            stop()
        }else if (url && isType === 'PLAY'){
            setIsPlaying(false)
            togglePlay()
        }else if (isType === 'SELECTED'){
            setIsPlaying(false)
            stop()
        }
    },[isType,url])


    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener('ended', handleAudioEnded);
        return () => {
            audio.removeEventListener('ended', handleAudioEnded);
        };
    }, [currentTrackIndex]);

    useEffect(()=> {
        const handlerBeforeUnload = (event)=> {
            event.preventDefault();
            event.returnValue = '';
        }
        if(isPlaying){
            window.addEventListener('beforeunload', handlerBeforeUnload);
        }

        return () => {
            window.removeEventListener('beforeunload', handlerBeforeUnload);
        };
    },[isPlaying])

    function stop() {
        const audio = audioRef.current;
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
    }
    function handleVolumeChange(value) {
        const audio = audioRef.current;
        setVolume(value);
        audio.volume = value;
    }

    function handleTimeUpdate() {
        const audio = audioRef.current;
        if(audio && duration >0){
            if((duration - audio?.currentTime) < .5){
                setTimeout(()=> {
                    PlayerClosed()
                },2000)
                clearTimeout()
            }else{
                setCurrentTime(audio?.currentTime);
            }
        }
    }

    function handleLoadedMetadata() {
        const audio = audioRef.current;
        setDuration(audio?.duration);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function handleAudioEnded() {
        const audio = audioRef.current;
        if (audio?.duration === 0) {
            audio.stop()
            setIsPlaying(false);
            // setDuration(0);
            // PlayerClosed();
            // setCurrentTrackIndex((currentTrackIndex + 1) % 2);
        }
    }



  return (
   <div
       className={`yid-player ${url ? 'show': ''}`}
   >
       <div className={'yid-player--close'}>
           <Button
               onClick={PlayerClosed}
               shape={'circle'}
               size={'small'} type={'link'} ghost icon={<CloseCircleFilled style={{fontSize:20}} />}/>
       </div>
       <audio
           ref={audioRef}
           src={url}
           onTimeUpdate={handleTimeUpdate}
           onLoadedMetadata={handleLoadedMetadata}
           volume={volume}
       />

       <div className={'yid-player-btn'}>
           <Button
               type={'link'}
               onClick={togglePlay}
               shape={'circle'}
               size={'small'}
               icon={isPlaying ? <PauseCircleFilled style={{fontSize:18}} />  :<PlayCircleFilled style={{fontSize:18}} />}
           />
           <Popover content={<Slider
               vertical
               style={{height:100}}
               min={0}
               max={1}
               step={0.01}
               onChange={handleVolumeChange}
               defaultValue={volume} />} trigger="click">
               <Button
                   type={'link'}
                   icon={<SoundOutlined style={{fontSize:16}}/>}
                   size={'small'}/>
           </Popover>
       </div>
       <div className={'yid-player--progress'}>

           <div className={'yid-progress--prgs'}>
               <div className={'yid-progress-title'}>
                   <span>{title}</span>
               </div>
               <span>{formatTime(currentTime)}</span>
               <input
                   type="range"
                   min="0"
                   max={duration}
                   step="1"
                   value={currentTime}
                   onChange={(e) => {
                       const audio = audioRef.current;
                       audio.currentTime = e.target.value;
                       setCurrentTime(e.target.value);
                   }}
               />
               <span>{formatTime(duration)}</span>
           </div>

       </div>
   </div>
  );
}

export default connect(
 mapStateToProps,{PlayerClosed}
)(MusicPlayer);