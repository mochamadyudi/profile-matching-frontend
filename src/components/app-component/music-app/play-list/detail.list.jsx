import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import LottieLoading from "../../../animated-components/lottie-loading";
import Spinner from "../../../../assets/lotties/loading-spinner-dots.json";
import {Empty} from "antd";

function DetailList({...props}){
    let { options,player,collections } = props

    const [ tabBar, setTabBar] = useState([])

    useEffect(()=> {
        if(player?.data && typeof(player?.data?.data) !== 'undefined' && Object.keys(player?.data).length > 0){
            let newArr = Object.entries(player?.data?.data).map(([key,value])=> ({
                key:key,
                label: key.toUpperCase(),
                ...value,
                title: value?.title,
                description: value?.description
            }))
            console.log({newArr})
        }
    },[player])


    return (
        <div className="music-playlist-global">
            {
                player?.loading ?
                    <LottieLoading animationData={Spinner} height={100} width={100}/>
                :
                    !player?.data ? <Empty/> :

                    <div>
                        <p>testing</p>
                    </div>
            }

        </div>
    )
}

export default connect(({_Announcement})=> {
    let { options,player,collections} = _Announcement
    return { options, player, collections}
},{})(React.memo(DetailList))