import React, {useState} from "react";
import {PauseOutlined, PlayCircleFilled} from "@ant-design/icons";
import {Button} from "antd";
import ArtistsController from "./artists.controller";
import {connect} from "react-redux";

function MusicPlayer(props){
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const audioRef = React.createRef();

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
    return (
        <div className="music-player">
            <div className={'music-player--progress'}>
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
            </div>
            <audio
                ref={audioRef}
                src={'/announcement-0.mp3'}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
            <div className="music-player-controller">
                <div className="mk-flex mk-items-center !mk-gap-10">
                    <div className={'mk-flex mk-items-center mk-gap-4'}>
                        <PauseOutlined />
                        <Button icon={<PlayCircleFilled style={{transform:"scale(2)"}} />} ghost shape={'circle'}/>
                        <PauseOutlined />
                    </div>
                    <div className="mk-flex mk-items-center mk-gap-4">
                        <span>{[formatTime(currentTime),formatTime(duration)].join('/')}</span>
                    </div>
                </div>
                <ArtistsController/>
                <div/>
            </div>
        </div>
    )
}

export default connect(()=> {
    return {}
},{})(MusicPlayer)