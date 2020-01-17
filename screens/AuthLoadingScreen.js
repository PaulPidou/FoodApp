import React from 'react'
import { AsyncStorage, View, ActivityIndicator, Image, Text } from 'react-native'
import { checkInternetConnection } from 'react-native-offline'
import { Toast } from "native-base"
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
            let action = {}
            const isConnected = await checkInternetConnection('http://192.168.43.163:3000')
            if(isConnected) {
                const userLists = await getUserLists()
                action = { type: 'UPDATE_USER_LISTS', lists: userLists ?
                        userLists : { savedRecipes: [], shoppingList: [], fridge: []} }

            } else {
                Toast.show({
                    text: 'Serveur hors ligne! Récupération des données depuis le stockage local',
                    textStyle: { textAlign: 'center' },
                    buttonText: 'Ok'
                })
                const savedRecipes = await AsyncStorage.getItem('savedRecipes')
                const shoppingList = await AsyncStorage.getItem('shoppingList')
                const fridge = await AsyncStorage.getItem('fridge')

                action = { type: 'UPDATE_USER_LISTS', lists: {
                        savedRecipes: savedRecipes ? JSON.parse(savedRecipes) : [],
                        shoppingList: shoppingList ? JSON.parse(shoppingList) : [],
                        fridge: fridge ? JSON.parse(fridge) : []
                    }}
            }
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