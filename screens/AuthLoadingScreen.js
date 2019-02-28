import React from 'react'
import { AsyncStorage, View, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserLists } from '../store/api/user'

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.bootstrapAsync()
    }

    bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken')
        if (userToken) {
            const userLists = await getUserLists()
            const action = { type: 'UPDATE_USER_LISTS', lists: userLists }
            this.props.dispatch(action)
            this.props.navigation.navigate('App')
        } else {
            this.props.navigation.navigate('Auth')
        }

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

AuthLoadingScreen.propTypes = {
    dispatch: PropTypes.func
}

export default connect()(AuthLoadingScreen)