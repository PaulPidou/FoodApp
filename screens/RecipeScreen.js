import React from 'react'
import {ActivityIndicator, Alert, Platform, Text} from 'react-native'
import {Container, Left, Right, Button, Icon, Header} from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import GenericStyles from '../constants/Style'
import Colors from '../constants/Colors'
import RecipeTabs from '../components/contents/RecipeTabs'
import { getRecipeFromId } from '../store/api/public'
import { saveRecipes, deleteSavedRecipes, cookSavedRecipes } from '../store/api/user'
import {checkInternetConnection} from "react-native-offline"

class RecipeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recipeId: props.navigation.getParam('recipeId', null),
            recipe: props.recipe,
            requestCook: false,
            requestDelete: false,
            requestSave: false
        }
    }

    static navigationOptions = {
        header: null
    }

    async componentDidMount() {
        const isConnected = await checkInternetConnection('http://192.168.43.163:3000')
        if(this.state.recipe == null && isConnected) {
            getRecipeFromId(this.state.recipeId).then(
                recipe => {
                    this.setState({ recipe })
                }
            )
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

    _getCommonIngredients(recipe) {
        if (!recipe) { return [] }
        if (this.props.fridge === undefined) { return undefined }
        const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredientID)
        return this.props.fridge.filter(value => ingredients.includes(value))
    }

    header() {
        const rightButton = this.state.recipeId &&
            this.props.isSaved ? ([
                this.state.requestCook ? (
                    <Button
                        key={'color-fill'}
                        transparent>
                        <ActivityIndicator size="small" color={Colors.counterTintColor}/>
                    </Button>
                ) : (
                    <Button
                        key={'color-fill'}
                        transparent
                        onPress={() => {
                            Alert.alert(
                                'Recette cusinée',
                                'Retirer la recette et ses ingrédients de vos listes ?',
                                [
                                    {text: 'Annuler', style: 'cancel'},
                                    {text: 'Oui', onPress: () => this.cookRecipe()}
                                ]
                            )
                        }}>
                        <Icon
                            style={GenericStyles.headerIcon}
                            name={Platform.OS === 'ios' ? 'ios-color-fill' : 'md-color-fill'}
                        />
                    </Button>
                ),
                this.state.requestDelete ? (
                    <Button
                        key={'trash'}
                        transparent>
                        <ActivityIndicator size="small" color={Colors.counterTintColor}/>
                    </Button>
                ) : (<Button
                    key={'trash'}
                    transparent
                    onPress={() => {
                        Alert.alert(
                            'Confirmation',
                            'Retirer la recette des recettes sauvegardées ?',
                            [
                                {text: 'Annuler', style: 'cancel'},
                                {text: 'Oui', onPress: () => this.deleteRecipe()}
                            ]
                        )
                    }}>
                    <Icon
                        style={GenericStyles.headerIcon}
                        name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
                    />
                </Button>)
            ]) : (
                this.state.requestSave || (this.props.isSaved === undefined) ? (
                    <Button transparent>
                        <ActivityIndicator size="small" color={Colors.counterTintColor}/>
                    </Button>
                ) : (
                    <Button
                        transparent
                        onPress={() => this.saveRecipe()}>
                        <Icon
                            style={GenericStyles.headerIcon}
                            name={Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'}
                        />
                    </Button>))

        return (
            <Header
                style={GenericStyles.header}
                hasTabs>
                <Left style={GenericStyles.headerLeft}>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            style={GenericStyles.headerIcon}
                            name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                        />
                    </Button>
                </Left>
                <Right>{rightButton}</Right>
            </Header>)
    }

    render() {
        return (
            <Container>
                {this.header()}
                {
                    this.state.recipeId ?
                        (<RecipeTabs
                            recipe={this.state.recipe}
                            commonIngredientsWithFridge={this._getCommonIngredients(this.state.recipe)}
                        />) :
                        (<Text style={{margin: 10, textAlign: 'center'}}>Un problème est survenu !</Text>)
                }

            </Container>
        )
    }
}

RecipeScreen.propTypes = {
    isSaved: PropTypes.bool,
    fridge: PropTypes.array,
    recipe: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
    const recipeID = ownProps.navigation.getParam('recipeId', 'null')
    return {
        isSaved: state.generalReducer.savedRecipes !== undefined ? state.generalReducer.savedRecipes.map(recipe => recipe._id)
            .includes(recipeID) : undefined,
        fridge: state.generalReducer.fridge === undefined ? undefined :
            state.generalReducer.fridge.map(ingredient => ingredient.ingredientID),
        recipe: state.generalReducer.recipesDetails.hasOwnProperty(recipeID) ?
            state.generalReducer.recipesDetails[recipeID] : null
    }
}

export default connect(mapStateToProps)(RecipeScreen)