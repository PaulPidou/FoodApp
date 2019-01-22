import React from 'react'
import {Alert, Platform} from 'react-native'
import {Container, Left, Right, Button, Icon, Header} from 'native-base'

import GenericStyles from '../constants/Style'
import RecipeTabs from '../components/contents/RecipeTabs'
import { getRecipeFromId } from '../utils/api/public'
import { saveRecipes, deleteSavedRecipes, upsertItemsToShoppingListFromRecipes } from '../utils/api/user'

export default class RecipeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recipeId: props.navigation.getParam('recipeId', 'NO-ID'),
            recipe: null
        }
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        this._asyncRequest = getRecipeFromId(this.state.recipeId).then(
            recipe => {
                this._asyncRequest = null
                this.setState({recipe})
            }
        )
    }

    async addIngredientsToCart() {
        await upsertItemsToShoppingListFromRecipes([this.state.recipeId])
        console.log("Add ingredients to cart:")
        console.log(this.state.recipeId)
    }

    async deleteRecipe() {
        await deleteSavedRecipes([this.state.recipeId])
        console.log("Delete:")
        console.log(this.state.recipeId)
    }

    async saveRecipe() {
        await saveRecipes([this.state.recipeId])
        console.log("Save:")
        console.log(this.state.recipeId)
    }

    header() {
        const rightButton = this.props.navigation.state.params.origin === 'search' ?
            (
                <Button
                    transparent
                    onPress={() => this.saveRecipe()}>
                    <Icon
                        style={GenericStyles.icon}
                        name={Platform.OS === 'ios' ? 'ios-save' : 'md-save'}
                    />
                </Button>
            ) : ([
                <Button
                    key={'cart'}
                    transparent
                    onPress={() => this.addIngredientsToCart()}>
                    <Icon
                        style={GenericStyles.icon}
                        name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                    />
                </Button>,
                <Button
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
                        )}}>
                    <Icon
                        style={GenericStyles.icon}
                        name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                    />
                </Button>
            ])
        return (
            <Header
                style={GenericStyles.header}
                hasTabs>
                <Left style={GenericStyles.headerLeft}>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            style={GenericStyles.icon}
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
                <RecipeTabs
                    recipe={this.state.recipe}
                />
            </Container>
        )
    }
}
