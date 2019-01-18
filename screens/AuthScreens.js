import React from 'react'
import {ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View} from 'react-native';
import {Container, Content, Header, Button} from 'native-base'


export default class SignUpScrren extends React.Component {
    static navigationOptions = {
        title: 'Please sign up',
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Sign in!" onPress={this._signInAsync} />
            </View>
        )
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc')
        this.props.navigation.navigate('App')
    }
}

export default class SignInScrren extends React.Component {
    static navigationOptions = {
        title: 'Please sign in',
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Sign in!" onPress={this._signInAsync} />
            </View>
        )
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc')
        this.props.navigation.navigate('App')
    }
}
