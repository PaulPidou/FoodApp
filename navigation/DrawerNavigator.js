import React from "react";
import { createDrawerNavigator } from "react-navigation";

import MainTabNavigator from './MainTabNavigator'
import ProfileScreen from '../screens/ProfileScreen'
import SettingsScreen from '../screens/SettingsScreen'
import SideBar from '../components/SideBar'

const DrawerNavigator = createDrawerNavigator(
    {
        Home: { screen: MainTabNavigator },
        Profile: { screen: ProfileScreen },
        Settings: { screen: SettingsScreen }
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
);
export default DrawerNavigator;