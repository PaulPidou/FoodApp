import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeScreen';
import SearchRecipeScreen from '../screens/SearchRecipeScreen'
import RecipeScreen from '../screens/RecipeScreen'

import ShoppingListScreen from '../screens/ShoppingListScreen';
import FridgeScreen from '../screens/FridgeScreen';
import SearchIngredientScreen from '../screens/SearchIngredientScreen'
import AddIngredientScreen from '../screens/AddIngredientScreen'

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    SearchRecipe: SearchRecipeScreen,
    RecipeDetails: RecipeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Recettes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'}
    />
  ),
};

const ShoppingListStack = createStackNavigator({
    ShoppingList: ShoppingListScreen,
    SearchIngredient: SearchIngredientScreen,
    AddIngredient: AddIngredientScreen
});

ShoppingListStack.navigationOptions = {
  tabBarLabel: 'Liste de courses',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
    />
  ),
};

const FridgeStack = createStackNavigator({
    Fridge: FridgeScreen,
    SearchIngredient: SearchIngredientScreen,
    AddIngredient: AddIngredientScreen
});

FridgeStack.navigationOptions = {
  tabBarLabel: 'Frigo',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-egg' : 'md-egg'}
    />
  ),
};

export default createBottomTabNavigator({
    HomeStack,
    ShoppingListStack,
    FridgeStack,
});
