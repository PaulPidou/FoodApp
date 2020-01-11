import React from 'react'
import { AsyncStorage, View, ActivityIndicator, Image, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserLists } from '../store/api/user'
import Colors from "../constants/Colors"

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.bootstrapAsync()
    }

    bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken')
        if (userToken) {
            const userLists = await getUserLists()
            const action = { type: 'UPDATE_USER_LISTS', lists: userLists ?
                    userLists : { savedRecipes: [], shoppingList: [], fridge: []} }
            this.props.dispatch(action)

            if(action.lists.savedRecipes.length === 0 && action.lists.shoppingList.length === 0 &&
                action.lists.fridge.length === 0) {
                this.props.navigation.navigate('EmptyLists')
            } else {
                this.props.navigation.navigate('App')
            }
        } else {
            this.props.navigation.navigate('Auth')
        }

    }

    render() {
        return (
            <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.splashScreenColor }}
            >
                <Image
                    style={{ marginBottom: 50}}
                    source={require('../assets/images/icon_large.png')}
                />
                <ActivityIndicator size='large' color='#fff' />
                <Text style={{ color: Colors.counterTintColor, fontSize: 27, fontWeight: '100', marginTop: 40 }}>Groceries (Re)Cycle</Text>
            </View>
        )
    }
}

AuthLoadingScreen.propTypes = {
    dispatch: PropTypes.func
}

export default connect()(AuthLoadingScreen)