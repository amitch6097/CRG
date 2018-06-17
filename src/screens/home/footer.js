import React, { Component } from "react";
import {
  Container,
  Button,
  Footer,
  FooterTab,
  Text,
  Icon,
} from "native-base";

import styles from "./styles";
import FontAwesome, { Icons } from 'react-native-fontawesome';

import PDFScreen from "../guide/pdf";
import AgendaScreen from "../calendar/calendar";
import DirectoryTabs from "../directory/directory-tabs";
import About from "../about/about";

class AppFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      content: <PDFScreen navigation={this.props.navigation}/>,
      calendarData:null,
      directoryData:{all:null,category:null}
    };
  }

  handleCalendarData = (data) => {
    this.setState({calendarData: data});
  }

  handleDirectoryData = (data) => {
    this.setState({directoryData: data});
  }

  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      content: <PDFScreen
                navigation={this.props.navigation}/>
    });
  }
  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false,
      content: <AgendaScreen
                calendarData={this.state.calendarData}
                onCalendarData={this.handleCalendarData}/>
    });
  }
  toggleTab3() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false,
      content:  <DirectoryTabs
                naviagtor={this.props.navigation}
                directoryData={this.state.directoryData}
                onDirectoryData={this.handleDirectoryData}/>
    });
  }
  toggleTab4() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true,
      content: <About/>
    });
  }
  render() {
    return (
      <Container style={styles.container}>

        <Container>
          {this.state.content}
        </Container>

        <Footer>
          <FooterTab>
            <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
              <Icon allowFontScaling={false} active={this.state.tab1} name="bookmarks" />
              <Text allowFontScaling={false}>Guide</Text>
            </Button>
            <Button active={this.state.tab2} onPress={() => this.toggleTab2()}>
              <FontAwesome allowFontScaling={false} style={{fontSize:17,padding:6, color:'gray'}}>{Icons.calendar}</FontAwesome>
              <Text allowFontScaling={false} adjustsFontSizeToFit={true} numberOfLines={1}>Calendar</Text>
            </Button>
            <Button active={this.state.tab3} onPress={() => this.toggleTab3()}>
              <Icon allowFontScaling={false} active={this.state.tab3} name="search" />
              <Text allowFontScaling={false} adjustsFontSizeToFit={true} numberOfLines={1}>Directory</Text>
            </Button>
            <Button active={this.state.tab4} onPress={() => this.toggleTab4()}>
              <Icon allowFontScaling={false} active={this.state.tab4} name="paw" />
              <Text allowFontScaling={false}>About</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default AppFooter;
