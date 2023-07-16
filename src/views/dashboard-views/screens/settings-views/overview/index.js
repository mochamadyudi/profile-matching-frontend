import React, {useState} from 'react'
import { connect } from 'react-redux'
import {Menu} from 'antd';
import {useHistory} from "react-router-dom";
import SettingLayout from "../setting.layout";



function Overview(props){



    return (
        <>
          
          <SettingLayout name={'Settings'} positionName={[]}>
            <p>tesing</p>
          </SettingLayout>
        </>
    )
}
Overview.propTypes= {}
Overview.defaultProps = {}
export default connect(()=> {
    return {}
},{})(React.memo(Overview))
