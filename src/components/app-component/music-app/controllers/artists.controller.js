import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
 return {

 };
}

function ArtistsController()  {
  return (
   <div className={'music-player-controller--artist'}>
       <div className={'artist-image'}></div>
       <div className={'artist-content'}>
           <div className="artist-content-title"></div>
           <div className="artist-content-desc"></div>
       </div>
   </div>
  );
}

export default connect(
 mapStateToProps,
)(ArtistsController);