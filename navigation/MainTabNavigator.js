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
import AddIngredientScreen from '../screens/AddIngredientScreen'

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

HomeStack.navigationOptions = {
  tabBarLabel: 'Recettes',
  tabBarIcon: RecipeTabBarIcon
}

HomeStack.propTypes = {
    focused: PropTypes.bool,
    origin: PropTypes.string,
    startShopping: PropTypes.func
}

const ShoppingListStack = createStackNavigator({
    ShoppingList: ShoppingListScreen,
    SearchIngredient: SearchIngredientScreen,
    AddIngredient: AddIngredientScreen
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

ShoppingListStack.navigationOptions = {
  tabBarLabel: 'Liste de courses',
  tabBarIcon: ShoppingListTabBarIcon
}

const FridgeStack = createStackNavigator({
    Fridge: FridgeScreen,
    SearchIngredient: SearchIngredientScreen,
    AddIngredient: AddIngredientScreen
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

FridgeStack.navigationOptions = {
  tabBarLabel: 'Frigo',
  tabBarIcon: FridgeTabBarIcon
}

export default createBottomTabNavigator({
    HomeStack,
    ShoppingListStack,
    FridgeStack
})
