import React,{createContext, useState, useContext} from 'react'
import GlobalList from "./play-list/global.list";
import DetailList from "./play-list/detail.list";
import MusicAppPlayer from "./music-app.player";
import MusicAppContent from "./music-app.content";
import MusicAppMinimize from "./music-app.minimize";
export const MusicContext = React.createContext();


export class MusicApp extends React.Component{

    static PlayList = {
        Global:GlobalList,
        Detail: DetailList
    }
    static Minimize = MusicAppMinimize
    static Content = MusicAppContent
    static Player = MusicAppPlayer
    render() {

        return (
            <React.Fragment>
                <div className={'yid-app-music'}>
                    <MusicApp.Minimize {...this.props}/>

                    <MusicApp.Content {...this.props}/>


                    <div className="music--children-blur">
                        {React.Children.map(this.props.children, child =>{
                                return React.cloneElement(child, {
                                    ...child?.props,
                                    key: child?.key ?? Math.random(),
                                    context: MusicContext,
                                    state:this.state })
                            }
                        )}
                    </div>


                </div>
            </React.Fragment>

        );
    }
}