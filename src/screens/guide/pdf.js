import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  SwipeRow,
  Content,
  List,
  ListItem,
  Badge
} from "native-base";

import {
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';

import Pdf from 'react-native-pdf';

import FontAwesome, { Icons } from 'react-native-fontawesome';


import platformVars from '../../theme/variables/platform'
const listHeight = platformVars.deviceHeight + 15 - platformVars.footerHeight - platformVars.toolbarHeight
const pdfPaddingLeft = platformVars.deviceWidth

const source = require('../../../assets/guide.pdf');  // ios only

const datas = [
  {
    name: "Associations & Clubs",
    route: 9,
    bg: "#96013c"
  },
  {
    name: "Boarding & Daycare",
    route: 27,
    bg: "#ed4f30"
  },
  {
    name: "Canine Health & Care",
    route: 37,
    bg: "#f38134"
  },
  {
    name: "Food & Supplies",
    route: 57,
    bg: "#8ac353"
  },
  {
    name: "Grooming",
    route: 69,
    bg: "#086f3a"
  },
  {
    name: "Michigan Lifestyle",
    route: 73,
    bg: "#0aa2dc"
  },
  {
    name: "Professional & Special Services",
    route: 81,
    bg: "#1f4d9d"
  },
  {
    name: "Purebred, Rescue & Shelter",
    route: 89,
    bg: "#9969ab"
  },
  {
    name: "Training & Instructions",
    route: 95,
    bg: "#ee457f"
  },
  {
    name: "Calendar",
    route: 111,
    bg: "#707d89"
  },
  {
    name: "Appendix",
    route: 121,
    bg: "#552216"
  }
];

class PDFScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      currentPage:1,
      totalPages:1,
      sideBarOpen:false,
      indexButtonIcon: "menu",
      scale: 1,
    };
    this.toggleSideBar = this.toggleSideBar.bind(this);
    this.resetSideBar = this.resetSideBar.bind(this);
  }

  updatePage = (page) => {
    this.setState({
      currentPage:page,
      pageInput:page
    });
    this.resetSideBar()
  }

  updateTotalPages = (totalPages) => {
   this.setState({totalPages: totalPages})
  }

  prePage = () => {
      let prePage = this.state.currentPage > 1 ? this.state.currentPage - 1 : 1;
      this.updatePage(prePage);
  };

  nextPage = () => {
      let nextPage = this.state.currentPage + 1 > this.state.totalPages ? this.state.totalPages : this.state.currentPage + 1;
      this.updatePage(nextPage);
  };

  zoomOut = () => {
      let scale = this.state.scale > 1 ? this.state.scale / 1.2 : 1;
      this.setState({scale: scale});
  };

  zoomIn = () => {
      let scale = this.state.scale * 1.2;
      scale = scale > 3 ? 3 : scale;
      this.setState({scale: scale});
  };

  toggleSideBar() {
    var width = Dimensions.get('window').width;
    var sideBarWidth = 2*width/3;

    var setSideBarValue = 0
    var tempIndexButtonIcon = "menu"
    var open = this.state.sideBarOpen;

    if(!open){
      setSideBarValue = sideBarWidth;
      tempIndexButtonIcon = "arrow-back";
    }

    this.component._root.manuallySwipeRow(setSideBarValue)

    this.setState({
      sideBarOpen:!open,
      indexButtonIcon: tempIndexButtonIcon,
    });
  }
  resetSideBar() {
    this.component._root.manuallySwipeRow(0)
    this.setState({
      sideBarOpen:false,
      indexButtonIcon: "menu",
    });
  }


  render() {
    var width = Dimensions.get('window').width;
    var sideBarWidth = 2*width/3;
    var fontSize = platformVars.deviceWidth === 320 ? 10 : 15;

    return (
      <Container style={styles.containerC}>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => this.toggleSideBar()}
          >
            <Icon name={this.state.indexButtonIcon} />
            <Text
             numberOfLines={1}
             style={{marginTop:10, fontSize:fontSize, flex:1}}>
              Index
            </Text>
          </Button>
        </Left>
        <Body>
          <Title style={{marginTop:5}}>Guide</Title>
        </Body>
        <Right>
          <View style={{flexDirection: 'row', marginTop:10}}>
            <Button transparent onPress={() => this.zoomIn()}>
            <Icon type="SimpleLineIcons" name="plus" style={{fontSize: 20, color: '#007AFF'}}/>
            </Button>
            <Button transparent onPress={() => this.zoomOut()}>
            <Icon type="SimpleLineIcons" name="minus" style={{fontSize: 20, color: '#007AFF'}}/>
            </Button>
          </View>
        </Right>
      </Header>
      <Content
        bounces={false}
        scrollEnabled={false}
      >
        <SwipeRow
          ref={(c) => { this.component = c }}
          style={styles.list}
          leftOpenValue={sideBarWidth}
          left={
            <List
            style={{marginBottom:15}}
              dataArray={datas}
              renderRow={data =>
                <ListItem
                  button
                  style={{backgroundColor:data.bg, borderColor:"white", marginLeft:0}}
                  onPress={() => this.updatePage(data.route)}
                >
                  <Left>
                    <Text style={styles.text}>
                      {data.name}
                    </Text>
                  </Left>
                </ListItem>}
            />
          }
          body={
            <View>
              <Pdf
                  scale={this.state.scale}
                  page={this.state.currentPage}
                  source={source}
                  onLoadComplete={this.updateTotalPages}
                  onError={(error)=>{
                      console.log(error);
                  }}
                  style={styles.pdf}/>
            </View>
          }
        />
      </Content>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  text:{
    color:"white",
  },
  itemFlex1:{
    flex:1
  },
  containerC: {
    backgroundColor: "#FFF",
  },
  viewRow:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft:20
  },
  list:{
    padding:0,
    margin:0,
    marginTop:0,
    paddingTop:0,
    height:listHeight,
    width:Dimensions.get('window').width

  },
  pdf: {
      width:Dimensions.get('window').width
  },
  input: {
    width:100,
    height:40
  }
});

export default PDFScreen;
