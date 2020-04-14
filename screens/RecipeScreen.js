import React from 'react'
import {Text} from 'react-native'
import { connect } from 'react-redux'
import {Container} from 'native-base'
import { checkInternetConnection } from "react-native-offline"
import PropTypes from 'prop-types'

import RecipeScreenHeader from "../components/headers/RecipeScreenHeader"
import RecipeTabs from '../components/contents/RecipeTabs'
import { getRecipeFromId } from '../store/api/public'
import { loadRecipesDetails } from "../store/actions/actions"
import { saveRecipes, deleteSavedRecipes, cookSavedRecipes } from '../store/api/user'

import Constants from "../constants/Constants"

class RecipeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recipeId: props.navigation.getParam('recipeId', 'null'),
            recipe: props.recipe,
            requestCook: false,
            requestDelete: false,
            requestSave: false,
            showSubstitutes: props.showSubstitutes
        }
    }

    static navigationOptions = {
        header: null
    }

    async componentDidMount() {
        const isConnected = await checkInternetConnection(Constants.serverURL)
        if(this.state.recipe == null) {
            if(isConnected) {
                getRecipeFromId(this.state.recipeId).then(
                    recipe => {
                        this.setState({ recipe })
                    }
                )
            } else {
                await loadRecipesDetails()
                this.setState({ recipe: this.props.recipe })
            }
        }
    }

    async cookRecipe() {
        this.setState({ requestCook: true })
        await cookSavedRecipes([this.state.recipeId])
        this.props.navigation.goBack()
    }

    async deleteRecipe() {
        this.setState({ requestDelete: true })
        await deleteSavedRecipes([this.state.recipeId])
        this.props.navigation.goBack()
    }

    async saveRecipe() {
        this.setState({ requestSave: true })
        await saveRecipes([this.state.recipeId])
        this.setState({ requestSave: false })
    }

    getCommonIngredients(recipe) {
        if (!recipe) { return [] }
        if (this.props.fridge === undefined) { return undefined }
        const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredientID)
        return this.props.fridge.filter(value => ingredients.includes(value))
    }

    render() {
        return (
            <Container>
                <RecipeScreenHeader
                    navigation={this.props.navigation}
                    recipeId={this.state.recipeId}
                    isSaved={this.props.isSaved}
                    requestCook={this.state.requestCook}
                    cookRecipe={() => this.cookRecipe()}
                    requestDelete={this.state.requestDelete}
                    deleteRecipe={() => this.deleteRecipe()}
                    requestSave={this.state.requestSave}
                    saveRecipe={() => this.saveRecipe()}
                />
                {
                    this.state.recipeId ?
                        (<RecipeTabs
                            recipe={this.state.recipe}
                            commonIngredientsWithFridge={this.getCommonIngredients(this.state.recipe)}
                            showSubstitutes={this.state.showSubstitutes} />) :
                        (<Text style={{margin: 10, textAlign: 'center'}}>Un problème est survenu !</Text>)
                }
            </Container>
        )
    }
}

RecipeScreen.propTypes = {
    isSaved: PropTypes.bool,
    fridge: PropTypes.array,
    recipe: PropTypes.object,
    showSubstitutes: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
    const recipeID = ownProps.navigation.getParam('recipeId', 'null')
    return {
        isSaved: state.generalReducer.savedRecipes !== undefined ? state.generalReducer.savedRecipes.map(recipe => recipe._id)
            .includes(recipeID) : undefined,
        fridge: state.generalReducer.fridge === undefined ? undefined :
            state.generalReducer.fridge.map(ingredient => ingredient.ingredientID),
        recipe: state.generalReducer.recipesDetails.hasOwnProperty(recipeID) ?
            state.generalReducer.recipesDetails[recipeID] : null,
        showSubstitutes: state.settingsReducer.showSubstitutes
    }
}

export default connect(mapStateToProps)(RecipeScreen)