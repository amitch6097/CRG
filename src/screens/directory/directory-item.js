import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Linking
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Left,
  Right,
  Body
} from "native-base";

import openMap from 'react-native-open-maps';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import call from 'react-native-phone-call'



export default class DirectoryItem extends Component
{
  static navigationOptions =
  {
     title: 'SecondActivity',
  };

  render()
  {

    item = this.props.navigation.state.params.item

    websiteButton = <View/>
    if(item.website){
      websiteButton =
      <Button full info style={styles.mt15}
      onPress={() => Linking.openURL(item.website)}>
        <View style={styles.iconTextPair}>
          <Icon name="navigate" />
          <Text style={{color:'white'}}>Website</Text>
        </View>
        <Icon name="arrow-forward" />
      </Button>
    }

    facebookButton = <View/>
    if(item.facebook){
      facebookButton =
      <Button full primary style={styles.mt15}
      onPress={() => Linking.openURL(item.facebook)}>
        <View style={styles.iconTextPair}>
           <Icon name="logo-facebook" />
            <Text style={{color:'white'}}>Facebook</Text>
        </View>
        <Icon name="arrow-forward" />
      </Button>
    }

    mapButton = <View/>
    if(item.location && item.location !== " "){
      mapButton =
      <Button full light style={styles.mt15Map}
      onPress={() => openMap({ latitude: item.lat, longitude: item.lon })}>
       <View style={styles.iconTextPairFontAwsm}>
         <FontAwesome style={styles.icon}>{Icons.mapMarker}</FontAwesome>
          <Text adjustsFontSizeToFit={true} style={{flex:1.2,fontSize:15, color:'black'}}>{item.location}</Text>
       </View>
       <Icon name="arrow-forward" />
      </Button>
    }

    phoneButton = <View/>
    if(item.phone_number && item.phone_number !== " "){
      phoneButton =
      <Button full success style={styles.mt15}
      onPress={() => call({number:item.phone_number.split("-").join(""),prompt: false}).catch(console.error)}>
        <View style={styles.iconTextPair}>
           <FontAwesome style={styles.iconClear}>{Icons.phone}</FontAwesome>
           <Text style={{color:'white'}}>Call {item.phone_number}</Text>
         </View>
         <Icon name="arrow-forward" />
      </Button>
    }


    console.log(item)
     return(
       <Container>
           <Header>
             <View style={styles.viewRow}>
             <Left style={{flex:1}}>
               <Button transparent onPress={() => this.props.navigation.goBack()}>
                 <Icon name="arrow-back" />
               </Button>
             </Left>
             <Body style={{flex:9}}>
               <Title>{ item.name }</Title>
             </Body>
             </View>
           </Header>
         <Content style={{ backgroundColor: "#fff" }}>
         <View>
           <Text style={styles.headingText}>
            {item.name}
           </Text>
           <Text  style={styles.paragraph}>
            {item.business_description.split('\\n').join('\n')}
           </Text>
           {mapButton}
           {phoneButton}
           {websiteButton}
           {facebookButton}

          </View>
         </Content>
       </Container>
     );
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
  headingText:{
    fontSize:20,
    fontWeight: 'bold',
    margin:20,

  },
  paragraph:{
    marginHorizontal:20,
  },
  mt15: {
    marginTop: 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    paddingHorizontal:20
  },
  iconClear:{
    color:'white',
    paddingHorizontal:20
  },
  mt15Map:{
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
