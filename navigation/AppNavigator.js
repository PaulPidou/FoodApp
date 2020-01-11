import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation'

import DrawerNavigator from './DrawerNavigator'
import EmptyListsStackNavigator from "./EmptyListsStackNavigator"
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import {LogInScreen, SignUpScreen} from '../screens/AuthScreens'

const AuthStack = createStackNavigator({
    LogIn: LogInScreen,
    SignUp: SignUpScreen
})

const MainNavigator = createSwitchNavigator({
        AuthLoading: AuthLoadingScreen,
        App: DrawerNavigator,
        EmptyLists: EmptyListsStackNavigator,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    })

export default createAppContainer(MainNavigator)