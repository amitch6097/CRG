import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator} from "react-navigation";

import AppFooter from "./screens/home/footer";

import DirectoryItem from "./screens/directory/directory-item";
import DirectoryAll from "./screens/directory/directory-all";
import DirectoryCategory from "./screens/directory/directory-category";
import DirectoryTabs from "./screens/directory/directory-tabs";

import PDFScreen from "./screens/guide/pdf";

import AgendaScreen from "./screens/calendar/calendar";

import About from "./screens/about/about";


const AppNavigator = StackNavigator(
  {

    AppFooter: {screen:AppFooter},
    DirectoryItem: {screen:DirectoryItem},
    DirectoryAll: {screen:DirectoryAll},
    DirectoryCategory: {screen:DirectoryCategory},
    DirectoryTabs: {screen:DirectoryTabs},
    PDFScreen: {screen:PDFScreen},
    AgendaScreen: {screen:AgendaScreen},
    About: {screen:About}
  },
  {
    initialRouteName: "AppFooter",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
