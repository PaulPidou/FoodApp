import React from 'react'
import PropTypes from 'prop-types'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'

import HomeScreen from '../screens/HomeScreen'
import SearchRecipeScreen from '../screens/SearchRecipeScreen'
import RecipeScreen from '../screens/RecipeScreen'

import ShoppingListScreen from '../screens/ShoppingListScreen'
import FridgeScreen from '../screens/FridgeScreen'
import SearchIngredientScreen from '../screens/SearchIngredientScreen'

import Colors from '../constants/Colors'

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    SearchRecipe: SearchRecipeScreen,
    RecipeDetails: RecipeScreen
})

function RecipeTabBarIcon({ focused }) {
    return (
    <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'}
    />)
}

RecipeTabBarIcon.propTypes = {
    focused: PropTypes.bool
}

HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true
    if (navigation.state.index > 0) {
        tabBarVisible = false
    }

    return {
        tabBarVisible,
        tabBarOptions: {
            activeTintColor: Colors.tintColor
        },
        tabBarLabel: 'Recettes',
        tabBarIcon: RecipeTabBarIcon
    }
}

const ShoppingListStack = createStackNavigator({
    ShoppingList: ShoppingListScreen,
    SearchIngredient: SearchIngredientScreen,
    SearchRecipe: SearchRecipeScreen,
    RecipeDetails: RecipeScreen
})

function ShoppingListTabBarIcon({ focused }) {
    return (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
        />)
}

ShoppingListTabBarIcon.propTypes = {
    focused: PropTypes.bool
}

ShoppingListStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true
    if (navigation.state.index > 0) {
        tabBarVisible = false
    }

    return {
        tabBarVisible,
        tabBarOptions: {
            activeTintColor: Colors.tintColor
        },
        tabBarLabel: 'Liste de courses',
        tabBarIcon: ShoppingListTabBarIcon
    }

}

const FridgeStack = createStackNavigator({
    Fridge: FridgeScreen,
    SearchIngredient: SearchIngredientScreen,
    SearchRecipe: SearchRecipeScreen,
    RecipeDetails: RecipeScreen
})

function FridgeTabBarIcon({ focused }) {
    return (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-egg' : 'md-egg'}
        />)
}

FridgeTabBarIcon.propTypes = {
    focused: PropTypes.bool
}

FridgeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true
    if (navigation.state.index > 0) {
        tabBarVisible = false
    }

    return {
        tabBarVisible,
        tabBarOptions: {
            activeTintColor: Colors.tintColor
        },
        tabBarLabel: 'Frigo',
        tabBarIcon: FridgeTabBarIcon
    }
}

export default createBottomTabNavigator({
    'Fridge': FridgeStack,
    'Recipes': HomeStack,
    'ShoppingList': ShoppingListStack,
}, {
    initialRouteName: 'Recipes'
})
