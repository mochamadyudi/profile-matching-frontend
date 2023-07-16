import React, { Component } from 'react';
import { connect } from 'react-redux';
import SettingLayout from "../setting.layout";

function mapStateToProps(state) {
 return {

 };
}

function LicenseSetting()  {
  return (
   <SettingLayout>
	   <h1>License Info</h1>
   </SettingLayout>
  );
}

export default connect(
 mapStateToProps,
)(LicenseSetting);