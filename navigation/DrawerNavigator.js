/* eslint-disable react/display-name */
import React from "react"
import { createDrawerNavigator } from "react-navigation"

import MainTabNavigator from './MainTabNavigator'
import SettingsScreen from '../screens/SettingsScreen'
import SideBar from '../components/SideBar'

const DrawerNavigator = createDrawerNavigator(
    {
        Home: { screen: MainTabNavigator },
        Settings: { screen: SettingsScreen }
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
)

export default DrawerNavigator