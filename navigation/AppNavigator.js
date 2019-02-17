import {createStackNavigator, createSwitchNavigator} from 'react-navigation'

import DrawerNavigator from './DrawerNavigator'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import {LogInScreen, SignUpScreen} from '../screens/AuthScreens'

const AuthStack = createStackNavigator({
    LogIn: LogInScreen,
    SignUp: SignUpScreen
})

export default createSwitchNavigator({
        AuthLoading: AuthLoadingScreen,
        App: DrawerNavigator,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    })