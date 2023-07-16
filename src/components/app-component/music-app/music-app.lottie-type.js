import React, { Component } from 'react';
import { connect } from 'react-redux';
import LottieLoading from "../../animated-components/lottie-loading";
import EmojiAnnouncementLottie from '../../../assets/lotties/92424-emoji-announcement.json'
import LoadingIconLottie from '../../../assets/lotties/137705-music-play-button.json'
import AirportLottie from '../../../assets/lotties/129307-airport.json'
import SendingAnnouncementLottie from '../../../assets/lotties/sending-announcement.json'
/**
 *
 * @param {string | 'announcement' | 'airport' | 'loading'} type
 * @param props
 * @returns {JSX.Element}
 */
function GetLottieFiles({type,...props}){
    switch (type){
        case "announcement":
            return <LottieLoading animationData={SendingAnnouncementLottie} {...props}/>
        case "airport":
            return <LottieLoading animationData={AirportLottie} {...props}/>
        case "loading":
        default:
            return <LottieLoading animationData={LoadingIconLottie} {...props}/>
    }
}
function MusicAppLottieType(props)  {
  return <GetLottieFiles {...props} type={props?.type ?? "loading"}/>
}

export default connect(
 function({}){
     return {}
 },
)(MusicAppLottieType);