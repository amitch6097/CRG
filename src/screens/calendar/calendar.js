import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  // AppRegistry,
  ActivityIndicator,
  ListView,
  Linking
} from 'react-native';

import {
  Container,
  Header,
  Text,
  Button,
  Icon,
  Body
} from "native-base";

import {Agenda} from 'react-native-calendars';
import openMap from 'react-native-open-maps';
import FontAwesome, { Icons } from 'react-native-fontawesome';


export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    date = new Date()

    this.state = {
      isLoading: true,
      loadedItems: {},
      items: {},
      selected: date,
      dateString: date.toISOString().substring(0, 10),
      calendarOpen: false
    };

    this.onDayPress = this.onDayPress.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.previousWeek = this.previousWeek.bind(this);
    this.todayFocus = this.todayFocus.bind(this);
  }

  componentDidMount() {
    if(this.props.calendarData === null){
      const res = fetch('https://midogguide.com/app-requests/calendar.php', {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          const newItems = {};
          Object.keys(responseJson).forEach(key => {newItems[key] = responseJson[key];newItems["color"] = 'blue';});
          this.setState({
            isLoading: false,
            loadedItems: newItems,
          }, function() {
            // In this block you can do something with new state.
          });
          this.props.onCalendarData(newItems);
        })
        .catch((error) => {
          this.setState({
            isLoading: true,
          });
        });
    } else {
      this.setState({
        isLoading: false,
        loadedItems: this.props.calendarData,
      });
    }
  }

  renderItem(item) {
    return (
      <View style={styles.item}>
        <Text style={styles.itemHeader}>{item.name}</Text>
        <Button full info style={styles.mt15}
        onPress={() => Linking.openURL(item.website)}>
          <View style={styles.iconTextPair}>
            <Icon name="navigate" />
            <Text allowFontScaling={false} style={{color:'white'}}>Event Website</Text>
          </View>
          <Icon name="arrow-forward" />
        </Button>
        <Button full style={styles.mt15Map}
        onPress={() => openMap({ latitude: item.lat, longitude: item.lon })}>
           <View style={styles.iconTextPairFontAwsm}>
              <FontAwesome allowFontScaling={false} style={styles.iconClear}>{Icons.mapMarker}</FontAwesome>
              <Text allowFontScaling={false} adjustsFontSizeToFit={true} style={{flex:1.2,fontSize:10, color:'white'}}>{item.location}</Text>
           </View>
           <Icon name="arrow-forward" />
        </Button>
      </View>
    );
  }


  renderEmptyDate() {
    return (
      <View></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator />
        </View>
      );
    }

    if(!this.state.calendarOpen){
      header =
      <Header>
        <View style={styles.viewRow}>
          <Button transparent onPress={() => this.previousWeek()}
          style={styles.itemFlex1}>
            <Icon name="arrow-back" />
            <Text allowFontScaling={false} adjustsFontSizeToFit={true} numberOfLines={1} style={{color:"#007aff"}}>Previous Week</Text>
          </Button>
          <Body style={styles.itemFlex1, styles.mb15}>
              <Button transparent  onPress={() => this.todayFocus()}>
                <Text allowFontScaling={false} style={{color:"#007aff"}}>Today</Text>
              </Button>
          </Body>
          <Button transparent onPress={() => this.nextWeek()}
          style={styles.itemFlex1}>
            <Text allowFontScaling={false} style={{color:"#007aff"}}>Next Week</Text>
            <Icon name="arrow-forward" />
          </Button>
        </View>
      </Header>

    } else {
      header =
      <Header>
        <View style={styles.viewRow}>
          <Body style={styles.itemFlex1, styles.mb15}>
              <Button transparent  onPress={() => this.todayFocus()}>
                <Text allowFontScaling={false} style={{color:"#007aff"}}>Today</Text>
              </Button>
          </Body>
        </View>
      </Header>
    }

    return (

      <Container style={styles.container}>

      {header}

      <Agenda
        ref="AgendaReference"
        items={this.state.loadedItems}
        onDayPress={this.onDayPress}
        current={this.state.dateString}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        renderEmptyData = {() => {return (<View />);}}
        onCalendarToggled={(calendarOpen) => {this.calendarOpened(calendarOpen)}}/>
      </Container >
    );
  }
  previousWeek(){
    this.state.selected.setDate(this.state.selected.getDate()-6);
    this.refs.AgendaReference.chooseDay(this.state.selected);
    this.setState({
      selected: date,
      dateString:date.toISOString().substring(0, 10)
    });

  }
  nextWeek(){
    this.state.selected.setDate(this.state.selected.getDate()+8);
    this.refs.AgendaReference.chooseDay(this.state.selected);
    this.setState({
      selected: date,
      dateString:date.toISOString().substring(0, 10)

    });
  }

  calendarOpened(calendarOpen){
    this.setState({
      calendarOpen: calendarOpen
    });
  }

  todayFocus(){
    date = new Date();
    date_string = date.toISOString().substring(0, 10);

    this.refs.AgendaReference.chooseDay(date_string);

    this.setState({
      selected: date,
      dateString:date_string
    });
  }

  onDayPress(day) {
    date = new Date(day.dateString);
    this.setState({
      selected: date,
      dateString:date.toISOString().substring(0, 10)

    });
  }
}


const styles = StyleSheet.create({
  itemFlex1:{
    flex:1
  },
  viewRow:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    marginRight: 10,
    marginTop: 17,
  },
  itemHeader:{
    padding: 10,
    fontSize:17,
    fontWeight: 'bold',
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  iconTextPair:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconTextPairFontAwsm:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon:{
    flex:.1,
    paddingLeft:20,
    paddingRight:10
  },
  iconClear:{
    color:'white',
    flex:.1,
    paddingLeft:20,
    paddingRight:10
  },
  mt15: {
    marginTop: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mt15Map:{
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    marginTop: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
