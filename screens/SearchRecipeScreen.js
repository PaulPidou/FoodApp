import React from 'react'
import {Platform} from 'react-native'
import {Container, Header, Left, Button, Icon, Input, Body } from 'native-base'

import GenericStyles from '../constants/Style'
import RecipesList from '../components/contents/RecipesList'
import { getRecipesSummaryFromKeywords, getRecipesSummaryFromIngredients, getMostFamousRecipesSummary } from '../store/api/public'

export default class SearchRecipeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputText: null,
            recipes: [],
            firstSearch: true,
            ingredients: props.navigation.getParam('ingredients', null),
        }
        this.handlePress = this.handlePress.bind(this)
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        if (this.state.ingredients) {
            this.setState({ recipes: undefined })
            if(this.state.ingredients.length === 0) {
                getMostFamousRecipesSummary().then(
                    recipes => {
                        this.setState({ recipes, firstSearch: false })
                    }
                )
            } else {
                getRecipesSummaryFromIngredients(this.state.ingredients.map(item => item.ingredientID)).then(
                    recipes => {
                        this.setState({ recipes, firstSearch: false })
                    })
            }
        }
    }

    handlePress(itemID) {
        if(this.state.selected) {
            this._updateSelectedRecipes(itemID)
        } else {
            this.props.navigation.navigate('RecipeDetails', {recipeId: itemID, origin: 'search'})
        }
    }

    async handleSearch(keywords) {
        this.setState({ recipes: undefined })
        const recipes = await getRecipesSummaryFromKeywords(keywords)
        this.setState({ recipes, firstSearch: false })
    }

    header() {
        return(
            <Header searchbar style={GenericStyles.header} >
                <Left style={GenericStyles.headerLeft}>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()} >
                        <Icon
                            style={GenericStyles.headerIcon}
                            name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                        />
                    </Button>
                </Left>
                <Body>
                {
                    !this.state.ingredients && (
                        <Input
                            style={GenericStyles.headerTitle}
                            autoFocus = {!this.state.inputText}
                            placeholder={'Je recherche des recettes...'}
                            placeholderTextColor='#fff'
                            returnKeyType = { "search" }
                            defaultValue={this.state.inputText}
                            onChangeText={(text) => this.setState({inputText: text})}
                            onSubmitEditing={(event) => this.handleSearch(event.nativeEvent.text)}
                        />)
                }
                </Body>
            </Header>
        )
    }

    render() {
        return (
            <Container>
                {this.header()}
                <RecipesList
                    origin={'search'}
                    firstSearch={this.state.firstSearch}
                    recipes={this.state.recipes}
                    handlePress={this.handlePress}
                />
            </Container>
        )
    }
}
