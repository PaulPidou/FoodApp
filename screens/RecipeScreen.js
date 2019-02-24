import React from 'react'
import {ActivityIndicator, Alert, Platform, Text} from 'react-native'
import {Container, Left, Right, Button, Icon, Header, Toast} from 'native-base'

import GenericStyles from '../constants/Style'
import RecipeTabs from '../components/contents/RecipeTabs'
import { getRecipeFromId } from '../store/api/public'
import { saveRecipes, deleteSavedRecipes, upsertItemsToShoppingListFromRecipes } from '../store/api/user'

export default class RecipeScreen extends React.Component {
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
        await deleteSavedRecipes([this.state.recipeId])
        this.props.navigation.goBack()
    }

    async saveRecipe() {
        this.setState({ requestSave: true })
        await saveRecipes([this.state.recipeId])
        this.setState({ requestSave: false })
    }

    header() {
        const rightButton = this.state.recipeId ?
            this.props.navigation.state.params.origin === 'search' ?
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

            ]) : (<Button transparent />)

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
                {
                    this.state.recipeId ?
                        (<RecipeTabs
                            recipe={this.state.recipe}
                        />) :
                        (<Text style={{margin: 10, textAlign: 'center'}}>Un problème est survenu !</Text>)
                }

            </Container>
        )
    }
}
