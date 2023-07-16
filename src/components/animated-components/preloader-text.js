import React, { useState, useEffect } from 'react';

/**
 *
 * @param {Object} props
 * @param {boolean} props.loading - Allowed => <boolean>[ false, true ]
 * @param {string} props.text - default => "Loading..."
 * @param {number} props.dots - default => 4
 * @param {number} props.speed - default => 300
 * @returns {JSX.Element}
 */
function PreloaderText(props)  {
    let {
        loading = false,
        text= "Loading",
        speed = 500,
        dots = 4
    } = props

    function defaultValue(){
        return {
            text: text ?? "Loading",
            dots: dots ?? 4,
            speed: speed ?? 500
        }
    }
    const [ tick , setTick ] = useState(0)

    /**
     * @param {String} str
     * @param {number} n - default=> 0
     * @returns {*|string}
     */
    function repeat(str,n){
        if(n === 0) return ""
        return n === 1 ? str : str + repeat(str,n - 1 );
    }

    /**
     * @returns {string|string}
     */
    function getText(){
        return props.hasOwnProperty('text') && props.text ? props?.text : defaultValue().text
    }

    /**
     * @returns {number|number}
     */
    function getSpeed(){
        return props.hasOwnProperty('speed') && props?.speed ? props?.speed : defaultValue().speed
    }

    function getNumDots(){
        return props.hasOwnProperty('dots') && props.dots ? props.dots : defaultValue().dots
    }

    function ticks(){
        setTick((prevState)=> {
            return prevState > getNumDots() ? 0 : prevState + 1
        });
    }

    let timeout
    useEffect(()=> {
        timeout = setInterval(()=> {
            ticks()
        },getSpeed())
        return ()=>  clearInterval(timeout)
    },[])


  return (
      <span
          {...props}>
                {getText()}
          {repeat(".", tick)}
          <span style={{color: '#ddd'}}>{repeat(".", getNumDots()-(tick-1))}</span></span>
  );
}

export default PreloaderText;