import React from 'react'
import { AsyncStorage, View, Image, Text } from 'react-native'
import { checkInternetConnection } from 'react-native-offline'
import { Toast } from "native-base"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadRecipesDetails, fetchRecipesDetails, toggleSeasonalRecipes, toggleShowSubstitutes,
    handleIngredientsManagement, toggleFoodListsIndependence } from "../store/actions/actions"
import { getUserLists } from '../store/api/user'
import Colors from "../constants/Colors"
import Constants from "../constants/Constants"

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.bootstrapAsync()
    }

    bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken')
        if (userToken) {
            let action = {}
            const isConnected = await checkInternetConnection(Constants.serverURL)
            if(isConnected) {
                const userLists = await getUserLists()
                action = { type: 'UPDATE_USER_LISTS', lists: userLists ?
                        userLists : { savedRecipes: [], shoppingList: [], fridge: []} }
                fetchRecipesDetails(userLists.savedRecipes.map(recipe => recipe._id))
            } else {
                Toast.show({
                    text: 'Serveur hors ligne! Récupération des données depuis le stockage local',
                    textStyle: { textAlign: 'center' },
                    buttonText: 'Ok'
                })
                const savedRecipes = await AsyncStorage.getItem('savedRecipes')
                const shoppingList = await AsyncStorage.getItem('shoppingList')
                const fridge = await AsyncStorage.getItem('fridge')
                await loadRecipesDetails()

                action = { type: 'UPDATE_USER_LISTS', lists: {
                        savedRecipes: savedRecipes ? JSON.parse(savedRecipes) : [],
                        shoppingList: shoppingList ? JSON.parse(shoppingList) : [],
                        fridge: fridge ? JSON.parse(fridge) : []
                    }}
            }
            this.props.dispatch(action)
            const settings = await AsyncStorage.getItem('settings')
            toggleSeasonalRecipes(settings ? JSON.parse(settings).seasonalRecipes : true)
            toggleShowSubstitutes(settings ? JSON.parse(settings).showSubstitutes : true)
            handleIngredientsManagement(settings ? JSON.parse(settings).shoppingListManagement : 'ALWAYS_ASK')
            toggleFoodListsIndependence(settings ? JSON.parse(settings).switchValueAutomaticFilling : true)

            if(isConnected && action.lists.savedRecipes.length === 0 &&
                action.lists.shoppingList.length === 0 && action.lists.fridge.length === 0) {
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

                <View style={{ width: 120, height: 120, borderRadius: 120/2,
                    justifyContent: 'center', alignItems: 'center',
                    backgroundColor: '#fff', marginTop: 150,
                    shadowColor: "#000", shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.34, shadowRadius: 6.27, elevation: 10}}>
                    <Image
                        style={{ width : 80, height: 80 }}
                        source={require('../assets/images/food-icons-loading-animation.gif')}
                    />
                </View>
                <Text style={{ fontFamily: 'Showlove_Regular', fontSize: 50, color: '#fff', marginTop: 150}}>
                    Groceries (Re)Cycle</Text>
            </View>
        )
    }
}

AuthLoadingScreen.propTypes = {
    dispatch: PropTypes.func
}

export default connect()(AuthLoadingScreen)