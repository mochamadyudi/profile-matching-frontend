import React from 'react'
import {connect} from "react-redux";

/**
 * @param {object} props
 * @returns {JSX.Element}
 */
function MusicAppPlayer(props){
    return(
        <div className="w-full">

        </div>
    )
}

MusicAppPlayer.propTypes = {}

export default connect(()=> {
    return {}
},{})(React.memo(MusicAppPlayer))