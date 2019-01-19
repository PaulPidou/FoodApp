import {createStackNavigator, createSwitchNavigator} from 'react-navigation'

import DrawerNavigator from './DrawerNavigator'
import {LogInScreen, SignUpScreen} from "../screens/AuthScreens"

const AuthStack = createStackNavigator({
    LogIn: LogInScreen,
    SignUp: SignUpScreen
})

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        App: DrawerNavigator,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'Auth',
    })