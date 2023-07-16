import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import LottieLoading from "../../../animated-components/lottie-loading";
import Spinner from '../../../../assets/lotties/loading-spinner-dots.json'

function GlobalList({player, options, collections, ...props}) {

    return (
        <div className="music-playlist-global">
            <LottieLoading animationData={Spinner} height={100} width={100}/>
        </div>
    );
}

export default connect(
    function({_Announcement}){
        let { player, options, collections } = _Announcement
        return { player, options, collections }
    },
)(GlobalList);