import React from 'react'
import {ActivityIndicator, Alert, Platform, Text} from 'react-native'
import {Container, Left, Right, Button, Icon, Header} from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import GenericStyles from '../constants/Style'
import Colors from '../constants/Colors'
import RecipeTabs from '../components/contents/RecipeTabs'
import { getRecipeFromId } from '../store/api/public'
import { saveRecipes, deleteSavedRecipes, upsertItemsToShoppingListFromRecipes } from '../store/api/user'

class RecipeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recipeId: props.navigation.getParam('recipeId', null),
            recipe: null,
            requestAddToCart: false,
            requestDelete: false,
            requestSave: false
        }
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        getRecipeFromId(this.state.recipeId).then(
            recipe => {
                this.setState({ recipe })
            }
        )
    }

    async addIngredientsToCart() {
        this.setState({ requestAddToCart: true })
        await upsertItemsToShoppingListFromRecipes([this.state.recipeId])
        this.setState({ requestAddToCart: false })
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
        const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredientID)
        return this.props.fridge.filter(value => ingredients.includes(value))
    }

    header() {
        const rightButton = this.state.recipeId &&
            this.props.isSaved ? ([
                this.state.requestAddToCart ? (
                    <Button
                        key={'cart'}
                        transparent>
                        <ActivityIndicator size="small" color={Colors.tintColor}/>
                    </Button>
                ) : (
                    <Button
                        key={'cart'}
                        transparent
                        onPress={() => this.addIngredientsToCart()}>
                        <Icon
                            style={GenericStyles.headerIcon}
                            name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                        />
                    </Button>
                ),
                this.state.requestDelete ? (
                    <Button
                        key={'trash'}
                        transparent>
                        <ActivityIndicator size="small" color={Colors.tintColor}/>
                    </Button>
                ) : (<Button
                    key={'trash'}
                    transparent
                    onPress={() => {
                        Alert.alert(
                            'Confirmation',
                            'Confirmez vous la suppression ?',
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
                        <ActivityIndicator size="small" color={Colors.tintColor}/>
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
    fridge: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    return {
        isSaved: state.generalReducer.savedRecipes !== undefined ? state.generalReducer.savedRecipes.map(recipe => recipe._id)
            .includes(ownProps.navigation.getParam('recipeId', null)) : undefined,
        fridge: state.generalReducer.fridge.map(ingredient => ingredient.ingredientID)
    }
}

export default connect(mapStateToProps)(RecipeScreen)