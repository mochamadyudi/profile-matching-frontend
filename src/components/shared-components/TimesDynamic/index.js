import React, {useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import moment from "moment";

const DefaultCountDown = (props)=> {
    let { render, date,format} = props
    const [Times,setTimes] = useState(()=> {
        let start = moment().utc(7)
        let end = moment(date,format ?? "HH:mm:ss").utc(7)
        let duration = moment.duration(end.diff(start))
        let time = {
            seconds:0,
            minutes:0,
            hours:0,
            days:0,
        }

        if(typeof(duration?._data) !== "undefined"){
            Object.keys(duration?._data).map((key,index)=> {
                if(typeof(time[key]) !== "undefined"){
                    time[key] = duration?._data[key]
                }
            })
        }
        return {
            d:time?.days,
            h:time?.hours,
            m:time?.minutes,
            s:time?.seconds
        }
    })


    let UpdateS = Times.s , UpdateM = Times.m, UpdateH = Times.h, UpdateD = Times.d
    useEffect(()=> {
        const id = setInterval(()=> {
            if (UpdateM === 0) {
                UpdateM = 0
            }
            if (UpdateS === 0 && UpdateM === 0 &&UpdateH === 0 && UpdateD > 0) {
                UpdateD--
                UpdateH = 24
            }

            if (UpdateD === 0 && UpdateH === 0){
                UpdateH = 0
                UpdateD = 0
            }
            if (UpdateS === 0 && UpdateM === 0 &&UpdateH > 0) {
                UpdateH--
                UpdateM = 60
            }
            if (UpdateS === 0 && UpdateM > 0) {
                UpdateM--
                UpdateS = 60
            }
            if (UpdateM >= 0 && UpdateS > 0) {
                UpdateS--
            }
            if (UpdateM === 0 && UpdateS === 0 && UpdateH === 0 && UpdateD === 0){
                clearInterval(id)
            }else{
                return setTimes({s: UpdateS,m:UpdateM, h:UpdateH, d:UpdateD})
            }
        },1000)

        return()=>{
            clearInterval(id)
        };
    },[])


    return  render({
        time:Times,
        second:UpdateS,
        minute:UpdateM,
        hour:UpdateH,
        day:UpdateD
    })
}

DefaultCountDown.propTypes = {}
DefaultCountDown.defaultProps = {
    date:PropTypes.string.isRequired,
    format:PropTypes.string.isRequired,
    render: PropTypes.func.isRequired

}
class TimesDynamic extends React.Component {
    constructor(props) {
        super(props);
    }


    static CountDown = DefaultCountDown

    render() {
        return <div/>
    }
}



export default TimesDynamic