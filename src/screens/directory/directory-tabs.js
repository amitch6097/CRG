import React, { Component } from "react";

import {
  Container,
  Header,
  Title,
  Tabs,
  Tab,
  Body
} from "native-base";

import DirectoryAll from "./directory-all";
import DirectoryCategory from "./directory-category";
import platformVars from '../../theme/variables/platform'


class DirectoryTabs extends Component {
  constructor(props) {
    super(props);
  }

  handleDirectoyDataAll = (data) => {
    this.props.directoryData.all = data;
    this.props.onDirectoryData(this.props.directoryData);
  }

  handleDirectoyDataCategory = (data) => {
    this.props.directoryData.category = data;
    this.props.onDirectoryData(this.props.directoryData);
  }

  render() {
    var paddingTabs = platformVars.isIphoneX ? 35 : 15;
    return (

      <Container style={{paddingTop:paddingTabs}}>
        <Tabs>
          <Tab allowFontScaling={false} heading="Business Name">
            <DirectoryAll
            naviagtor={this.props.naviagtor}
            directoryData={this.props.directoryData.all}
            onDirectoryData={this.handleDirectoyDataAll}/>
          </Tab>
          <Tab allowFontScaling={false} heading="Category">
            <DirectoryCategory
            naviagtor={this.props.naviagtor}
            directoryData={this.props.directoryData.category}
            onDirectoryData={this.handleDirectoyDataCategory}/>
          </Tab>
        </Tabs>
      </Container>

    );
  }
}

export default DirectoryTabs;
