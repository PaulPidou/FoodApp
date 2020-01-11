import { createStackNavigator } from 'react-navigation'

import WelcomeScreen from "../screens/WelcomeScreen"
import SearchIngredientScreen from "../screens/SearchIngredientScreen"
import SearchRecipeScreen from "../screens/SearchRecipeScreen"
import RecipeScreen from "../screens/RecipeScreen"
import ShoppingListScreen from "../screens/ShoppingListScreen"

export default createStackNavigator({
    WelcomeScreen: WelcomeScreen,
    SearchIngredient: SearchIngredientScreen,
    SearchRecipe: SearchRecipeScreen,
    RecipeDetails: RecipeScreen,
    ShoppingList: ShoppingListScreen,
    SearchIngredientForSL: SearchIngredientScreen,
})