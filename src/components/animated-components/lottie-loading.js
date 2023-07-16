import React from 'react'
import Animation from 'assets/lotties/lottie-flight.json'
import Lottie from 'react-lottie'

/**
 *
 * @param {Object} props
 * @param {Object} props.options
 * @param {File} props.animationData
 * @param {Number} props.width
 * @param {Number} props.height
 * @param {Boolean} props.isStopped
 * @param {Boolean} props.isPaused
 * @param {(String | "content" | "page" | "app" | "icon")} props.cover
 * @returns {JSX.Element}
 * @constructor
 */
function LottieLoading(props){
    let { cover  } = props
    return(
        <div className={`yid-lottie ${cover}`}>
            <div style={{pointerEvents:"none"}}>
                <Lottie
                    options={{
                        ...props?.options,
                        animationData: props?.animationData ?? Animation
                    }}
                    height={props?.height ?? 400}
                    width={props?.width ?? 400}
                    isStopped={props?.isStopped}
                    isPaused={props?.isPaused}
                />
            </div>
            {
                props?.cover === "page" && (
                    <div className={'yid-lottie-backdrop'}/>
                )
            }

        </div>
    )
}

LottieLoading.defaultProps = {
    theme: 1,
    cover:'content',
    animationData: Animation,
    height:400,
    width:400,
    isPaused: false,
    isStopped:false,
    options: {
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
}

export default LottieLoading