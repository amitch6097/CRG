import React, { Component } from 'react';

import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  FlatList
} from 'react-native';

import {
  Container,
  Icon,
  Left,
  Right,
  Input,
  ListItem,
  Item
} from "native-base";

class DirectoryListItem extends React.PureComponent {

  constructor(props) {
    super(props);
    this.naviagtor = this.props.naviagtor;
    this.OpenDirectoyItem = this.OpenDirectoyItem.bind(this);
  }

  OpenDirectoyItem ()
  {
    this.naviagtor.navigate('DirectoryItem', { item: this.props.item });
  }

  render() {
    return (
      <ListItem onPress={this.OpenDirectoyItem}>
        <Left>
          <Text> {this.props.item.name}
          </Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }
}

export default class DirectoryAll extends Component {

  constructor(props) {
    super(props);
    this.naviagtor = this.props.naviagtor;

    this.state = {
      isLoading: true,
      data:[],
      fullData:[]
    }
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  componentDidMount() {
    if(this.props.directoryData === null || !this.props.directoryData){
      return fetch('https://midogguide.com/app-requests/directory-all.php',{
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            data: responseJson,
            fullData: responseJson
          }, function() {
          });
          this.props.onDirectoryData(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });

      } else {
        this.setState({
          isLoading: false,
          data:this.props.directoryData,
          fullData: this.props.directoryData,
        });
      }
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

    return (
      <Container>
        <View style={styles.container}>
          <View style={styles.searchInputStyle}>
            <Item>
              <Icon active name="search" />
              <Input placeholder="Search"

              onChangeText={this.handleSearchInput}
              value={this.state.text}
              returnKeyType="search"
              clearButtonMode="while-editing"/>
            </Item>
          </View>
          <FlatList
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItemClass}
          />
        </View>
      </Container>
    );
  }

  handleSearchInput(e){
    var text = e.toLowerCase().replace(/\s/g, '-').replace(/,/g, '').replace(/\?/g, '')
    let fullList = this.state.fullData;
    let filteredList = fullList.filter((item) => { // search from a full list, and not from a previous search results list
      if(item.name.toLowerCase().match(text))
        return item;
    })
    this.setState({
      data: filteredList
    })
  }

  _keyExtractor = (item, index) => item.sequence_id;

  _renderItemClass = ({item}) => (
    <DirectoryListItem
      item={item}
      naviagtor={this.props.naviagtor}
    />
  );
}

const styles = StyleSheet.create({
  container :{
    justifyContent: 'center',
    flex:1,
  },
  searchInputStyle:{
    margin:10
 }
});
