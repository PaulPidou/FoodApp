import React from 'react'
import { AsyncStorage, View, ActivityIndicator } from 'react-native'

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this._bootstrapAsync()
    }

    _bootstrapAsync = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const userToken = await AsyncStorage.getItem('userToken')
        this.props.navigation.navigate(userToken ? 'App' : 'Auth')
    }

    render() {
        return (
            <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                <ActivityIndicator size='large' color='#007aff' />
            </View>
        )
    }
}