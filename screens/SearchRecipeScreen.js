import React from 'react'
import {Platform} from 'react-native'
import {Container, Header, Left, Button, Icon, Input} from 'native-base'

import GenericStyles from '../constants/Style'
import RecipesList from '../components/contents/RecipesList'
import {getRecipesFromKeywords} from '../utils/api/public'
import SelectedHeader from "../components/headers/SelectedRecipeHeader"

export default class SearchRecipeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputText: null,
            selected: false,
            selectedRecipes: [],
            recipes: [],
            firstSearch: true
        }
        this.emptySelected = this.emptySelected.bind(this)
        this.handlePress = this.handlePress.bind(this)
        this.handleLongPress = this.handleLongPress.bind(this)
        this.saveSelectedRecipes = this.saveSelectedRecipes.bind(this)
    }

    static navigationOptions = {
        header: null
    }

    handlePress(itemID) {
        if(this.state.selected) {
            this._updateSelectedRecipes(itemID)
        } else {
            this.props.navigation.navigate("RecipeDetails", {recipeId: itemID, origin: 'search'})
        }
    }

    handleLongPress(itemID) {
        if(this.state.selected) {
            this._updateSelectedRecipes(itemID)
        } else {
            this.setState({
                selected: true,
                selectedRecipes: [itemID]
            })
        }
    }

    _updateSelectedRecipes(itemID) {
        const isSelected = this.state.selectedRecipes.includes(itemID)
        const newArray = isSelected
            ? this.state.selectedRecipes.filter(id => id !== itemID) : [...this.state.selectedRecipes, itemID]
        this.setState({
            selected: newArray.length > 0,
            selectedRecipes: newArray
        })
    }

    emptySelected() {
        this.setState({selected: false, selectedRecipes: []})
    }

    saveSelectedRecipes() {
        console.log("Save:")
        console.log(this.state.selectedRecipes)
    }

    async handleSearch(keywords) {
        this.setState({recipes: null})
        const recipes = await getRecipesFromKeywords(keywords)
        this.setState({recipes, firstSearch: false})
    }

    header() {
        return(
            <Header searchbar style={GenericStyles.header} >
                <Left style={GenericStyles.headerLeft}>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()} >
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                        />
                    </Button>
                </Left>
                <Input
                    autoFocus = {!this.state.inputText}
                    placeholder={'Je recherche des recettes...'}
                    returnKeyType = { "search" }
                    defaultValue={this.state.inputText}
                    onChangeText={(text) => this.setState({inputText: text})}
                    onSubmitEditing={(event) => this.handleSearch(event.nativeEvent.text)}
                />
            </Header>
        )
    }

    render() {
        return (
            <Container>
                {this.state.selected ?
                    <SelectedHeader
                        origin={'search'}
                        emptySelected={this.emptySelected}
                        saveSelectedRecipes={this.saveSelectedRecipes}
                    /> : this.header()}
                <RecipesList
                    origin={'search'}
                    firstSearch={this.state.firstSearch}
                    recipes={this.state.recipes}
                    selectedRecipes={this.state.selectedRecipes}
                    handlePress={this.handlePress}
                    handleLongPress={this.handleLongPress}
                />
            </Container>
        )
    }
}
