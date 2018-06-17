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
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Input,
  ListItem,
  Item
} from "native-base";

import styles from "./styles";

class DirectoryListItem extends React.PureComponent {

  constructor(props) {
    super(props);
    this.naviagtor = this.props.naviagtor;
    this._pressed = this._pressed.bind(this);
  }

  _pressed ()
  {
    this.props.pressed(this.props.item);
  }

  render() {
    return (
      <ListItem onPress={this._pressed}>
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

export default class DirectoryCategory extends Component {

  constructor(props)
  {
    super(props);
    this.naviagtor = this.props.naviagtor;
    this.state = {
      isLoading: true,
      isCategory: true,
      data:[],
      fullData:[]
    }

    this.openDirectoyCategory = this.openDirectoyCategory.bind(this);
    this.openDirectoryItem = this.openDirectoryItem.bind(this);
    this.BackButton = this.BackButton.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  BackButton()
  {
    this.setState({
      isLoading: true,
      isCategory:true
    });
    this.loadCategoryData();
  }

  loadCategoryData(){
    if(this.props.directoryData == null || !this.props.directoryData){
      return fetch('https://midogguide.com/app-requests/directory-categories.php', {
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

  componentDidMount() {
    this.loadCategoryData();
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

    if (!this.state.isCategory)
    {
      return (

      <Container>
        <View style={styles.MainContainer}>
          <View style={{flexDirection:'row'}}>
            <Button  style={styles.mb15}
            onPress={this.BackButton}>
              <Icon active name="arrow-back" />
            </Button>
            <Item style={{flex:5, marginLeft:10}}>
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
            keyExtractor={this._keyExtractorItem}
            renderItem={this._renderItemClass}
          />
        </View>
      </Container>
      );

    } else {
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
            style={{marginBottom:80}}
              data={this.state.data}
              keyExtractor={this._keyExtractorCategory}
              renderItem={this._renderCategoryClass}
            />
          </View>
        </Container>
      );
    }
  }

  handleSearchInput(e){
    console.log(e)
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

  _keyExtractorItem = (item, index) => item.sequence_id;
  _keyExtractorCategory = (item, index) => item.name;


  _renderCategoryClass = ({item}) => (
    <DirectoryListItem
      item={item}
      naviagtor={this.props.naviagtor}
      pressed={this.openDirectoyCategory}
    />
  );

  openDirectoyCategory = (rowData) => {
    this.setState({
      isLoading: true,
      isCategory:false
    });
    console.log(rowData);
    url = 'https://midogguide.com/app-requests/directory-category.php?category='+rowData.name;
    console.log(url)
    fetch(url,{
        headers: {
          'Cache-Control': 'no-cache'
        }       })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          data:responseJson,
          fullData:responseJson
        }, function() {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _renderItemClass = ({item}) => (
    <DirectoryListItem
      item={item}
      naviagtor={this.props.naviagtor}
      pressed={this.openDirectoryItem}

    />
  );

  openDirectoryItem = (rowData) => {
    this.naviagtor.navigate('DirectoryItem', { item: rowData });
  }
}
