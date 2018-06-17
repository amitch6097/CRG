import React, { Component } from "react";
import Setup from "./src/boot/setup.js";
import FontAwesome, { Icons } from 'react-native-fontawesome';

import {
  Title,
  Input,
} from "native-base";

import {
  Text
} from 'react-native';

export default class App extends React.Component {
  render() {
    return <Setup />;
  }
}

Text.defaultProps.allowFontScaling=false;
Title.defaultProps.allowFontScaling=false;
Input.defaultProps.allowFontScaling=false;
// Icons.defaultProps.allowFontScaling=false
