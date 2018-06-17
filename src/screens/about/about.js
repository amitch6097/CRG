import React, { Component } from "react";

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
  Body,
  Text,
  Thumbnail
} from "native-base";

import call from 'react-native-phone-call'
import FontAwesome, { Icons } from 'react-native-fontawesome';

const cover = require("../../../assets/about.jpeg");

class About extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title allowFontScaling={false}>Canine Resource Guide</Title>
          </Body>
        </Header>
        <Content style={{ backgroundColor: "#fff"}}>

          <View style={styles.viewRowCenter}>
            <Thumbnail large source={cover} style={styles.mb10} />
            <Text style={styles.profileText}>Beth Mitchell</Text>
            <Text style={styles.profileText}>Owner and Publisher</Text>
          </View>
          <View>
            <Button full success style={styles.mt15}
            onPress={() => call({number:"2483772918",prompt: false}).catch(console.error)}>
              <View style={styles.iconTextPair}>
                 <FontAwesome allowFontScaling={false} style={styles.iconClear}>{Icons.phone}</FontAwesome>
                 <Text allowFontScaling={false} style={{color:'white'}}>Call 248-377-2918</Text>
               </View>
               <Icon name="arrow-forward" />
            </Button>

            <Button full info style={styles.mt15}
            onPress={() => Linking.openURL("https://midogguide.com/")}>
              <View style={styles.iconTextPair}>
                <Text allowFontScaling={false} style={{color:'white'}}>Michigan Dog Guide Website</Text>
              </View>
              <Icon name="arrow-forward" />
            </Button>

            <Button full info style={styles.mt15}
            onPress={() => Linking.openURL("https://www.canineresourceguide.com/")}>
              <View style={styles.iconTextPair}>
                <Text allowFontScaling={false} style={{color:'white'}}>Canine Resource Guide Website</Text>
              </View>
              <Icon name="arrow-forward" />
            </Button>
          </View>
          <View style={{padding:10}}>
            <Text style={styles.paragraph}>
            Canine Resource Guide® was founded by Beth Mitchell.
            </Text>
            <Text style={styles.paragraph}>
            She is a registered nurse and lives in Michigan.   Beth has been a dog enthusiast for many years.  Experience has taught her the importance of finding quality pet services.
            </Text>
            <Text style={styles.paragraph}>
            Beth has been looking for a way to volunteer in her community.  She became interested in therapy dog training.  With her many years as a health care provider and experience in dog training she decided to become a therapy dog handler.
            </Text>
            <Text style={styles.paragraph}>
            While searching for a new puppy to train as a therapy dog, Beth became aware of the difficulty in finding local dog show events and services.  Websites with regional show listings require narrowing the search by state.  Searching for local dog care and training businesses on the web is time intensive.  The idea for the business came from Beth's need to efficiently find Michigan dog show events, training facilities, and services for her new puppy, Miles.  Beth's sister, Cathleen, is the
            </Text>
            <Text style={styles.paragraph}>
            owner/publisher of Equine Resource Guide®.  She offered to share her knowledge and expertise to help Beth create a premier dog guide.  Canine Resource Guide was founded in 2015 as service to the Michigan dog clubs and associations and it will be another way Beth can give back to her community!
            </Text>
            <Text style={styles.paragraph}>
            If you belong to a dog club or association, or have a dog related business and would like to be included in the 2018 online and published guide, please contact Beth or submit your listing.
            </Text>
            <Text style={styles.paragraph}>
            In an effort to make the guide as extensive as possible, many dog resources and services will  be published at no cost.  Space restrictions may limit the number of listings.  If you would like to ensure or enhance your listing, please visit the advertising information page for pricing information.  Non-profit listings will be included at no cost.
            </Text>
            <Text style={styles.paragraph}>
            Local clubs and associations will be provided free guides to distribute to their members annually.  Dog related business will efficiently reach dog owners in both published and online guides.   Dog owners will be guided to a marketplace of products and services available to care for their furry friend.  This publication would not be possible without advertising.  Please support our advertisers with your patronage!
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  profileText: {
    margin:5,
  },
  viewRow:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin:10
  },
  viewRowCenter:{
    padding:10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRow:{
    flex: 1,
    flexDirection: 'row',
  },
  paragraph:{
    margin:10
  },
  buttonLink:{
    margin:5,
    color:'blue'
  },
  viewColumn:{
    flex: 1,
    flexDirection: 'column',
  },
  mt15: {
    marginTop:2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconTextPair:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconClear:{
    color:'white',
    paddingHorizontal:20
  },
});

export default About;
