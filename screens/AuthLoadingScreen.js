import React from 'react'
import { AsyncStorage, View, ActivityIndicator } from 'react-native'
import { getUserLists } from '../store/api/user'

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.bootstrapAsync()
    }

    bootstrapAsync = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const userToken = await AsyncStorage.getItem('userToken')

        if(userToken) {
            const lists = await getUserLists()
        }
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