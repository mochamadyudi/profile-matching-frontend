import React, {useState, useEffect, Component} from 'react';
import {connect} from 'react-redux';
import ButtonPermission from "../permission-components/button.permission";
import {PauseCircleFilled,PlayCircleFilled} from "@ant-design/icons";
import {SelectAudioAndPlay} from "../../redux/actions";
import { message } from 'antd';
function mapStateToProps({_Audio}) {
    return {
        _Audio
    };
}

/**
 *
 * @param {Object} props
 * @param {String} props.url
 * @param {String} props.title
 * @param {Function} props.onClick
 * @returns {JSX.Element}
 * @constructor
 */
function AudioBtn(props) {
    let {url,title,SelectAudioAndPlay,_Audio} = props
    const [isPlay, setIsPlay] = useState(false);


    const start = (played = true) => {
        SelectAudioAndPlay({
            url: url,
            title:title
        })
        return null
    }

    return (
        <>
            <ButtonPermission
                // permission={['public', 'admin','guest',null,'']}
                theme={{
                    type: "notification",
                    property: {
                        message: "Access Denied"
                    }
                }}
                config={{
                    icon: _Audio?.url !== url ? <PlayCircleFilled /> : <PauseCircleFilled/>,
                    type: "primary",
                    danger: false,
                    ghost: false,
                    shape:"circle",
                    size: "small",
                    onClick: ()=> {
                        if(typeof(props?.onClick) !=='undefined' && typeof(props?.onClick) === 'function'){
                            props?.onClick(start);
                        }
                    }
                }}/>
        </>
    );
}

export default connect(
    mapStateToProps,{SelectAudioAndPlay}
)(AudioBtn);