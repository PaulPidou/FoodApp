import React from 'react'
import PropTypes from 'prop-types'
import { Platform, StatusBar, StyleSheet } from 'react-native'
import { Root } from 'native-base'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import AppNavigator from './navigation/AppNavigator'
import { Provider } from 'react-redux'
import { NetworkProvider } from 'react-native-offline'
import store  from './store/reducers/index'
import Constants from './constants/Constants'

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
        StatusBar.setHidden(true)
        return (
            <Provider store={store}>
                <NetworkProvider pingServerUrl={Constants.serverURL}>
                    <Root style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                        <AppNavigator />
                    </Root>
                    </NetworkProvider>
            </Provider>
          )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
          ...Ionicons.font,
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
          Ionicons: require("native-base/Fonts/Ionicons.ttf"),
          Showlove_Regular: require("./assets/fonts/Showlove-Regular.ttf")
      })
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

App.propTypes = {
    skipLoadingScreen: PropTypes.bool
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
