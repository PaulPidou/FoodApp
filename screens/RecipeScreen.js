import React from 'react'
import {ActivityIndicator, Alert, Platform} from 'react-native'
import {Container, Left, Right, Button, Icon, Header, Toast} from 'native-base'

import GenericStyles from '../constants/Style'
import RecipeTabs from '../components/contents/RecipeTabs'
import {getRecipeFromId} from '../utils/api/public'
import {saveRecipes, deleteSavedRecipes, upsertItemsToShoppingListFromRecipes} from '../utils/api/user'

export default class RecipeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recipeId: props.navigation.getParam('recipeId', 'NO-ID'),
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
        this._asyncRequest = getRecipeFromId(this.state.recipeId).then(
            recipe => {
                this._asyncRequest = null
                this.setState({recipe})
            }
        )
    }

    async addIngredientsToCart() {
        this.setState({ requestAddToCart: true })
        const res = await upsertItemsToShoppingListFromRecipes([this.state.recipeId])
        Toast.show({
            text: res ? 'Ingrédients ajoutés à la liste de course !' : 'Un problème est survenu !',
            textStyle: { textAlign: 'center' },
            buttonText: 'Ok'
        })
        this.setState({ requestAddToCart: false })
    }

    async deleteRecipe() {
        this.setState({ requestDelete: true })
        const res = await deleteSavedRecipes(this.state.selectedRecipes)
        Toast.show({
            text: res ? 'Recette supprimée !' : 'Un problème est survenu !',
            textStyle: { textAlign: 'center' },
            buttonText: 'Ok'
        })
        this.props.navigation.goBack()
    }

    async saveRecipe() {
        this.setState({ requestSave: true })
        const res = await saveRecipes([this.state.recipeId])
        Toast.show({
            text: res ? 'Recette sauvegardée !' : 'Un problème est survenu !',
            textStyle: { textAlign: 'center' },
            buttonText: 'Ok'
        })
        this.setState({ requestSave: false })
    }

    header() {
        const rightButton = this.props.navigation.state.params.origin === 'search' ?
            (
                this.state.requestSave ? (
                    <Button transparent>
                        <ActivityIndicator size="small" color='#007aff'/>
                    </Button>
                ) : (
                    <Button
                        transparent
                        onPress={() => this.saveRecipe()}>
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-save' : 'md-save'}
                        />
                    </Button>)
            ) : ([
                this.state.requestAddToCart ? (
                    <Button
                        key={'cart'}
                        transparent>
                        <ActivityIndicator size="small" color='#007aff'/>
                    </Button>
                ) : (
                    <Button
                        key={'cart'}
                        transparent
                        onPress={() => this.addIngredientsToCart()}>
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                        />
                    </Button>
                ),
                this.state.requestDelete ? (
                    <Button
                        key={'trash'}
                        transparent>
                        <ActivityIndicator size="small" color='#007aff'/>
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
                        style={GenericStyles.icon}
                        name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                    />
                </Button>)

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
