import React from 'react';
import {Platform} from 'react-native';
import {Container, Header, Left, Right, Button, Icon, Input} from 'native-base';

import GenericStyles from '../constants/Style'
import RecipesList from '../components/contents/RecipesList'
import {getRecipesFromKeywords} from '../api_calls/public'

export default class SearchRecipeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: null,
            selected: false,
            selectedRecipes: [],
            recipes: [],
            firstSearch: true
        }
        this.handlePress = this.handlePress.bind(this)
        this.handleLongPress = this.handleLongPress.bind(this)
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

    async handleSearch(keywords) {
        this.setState({recipes: null})
        const recipes = await getRecipesFromKeywords(keywords)
        this.setState({recipes, firstSearch: false})
    }

    selectedHeader() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={GenericStyles.headerLeft}>
                    <Button
                        transparent
                        onPress={() => this.setState({selected: false, selectedRecipes: []})}
                    >
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
                        />
                    </Button>
                </Left>
                <Right>
                    <Button
                        transparent
                    >
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-save' : 'md-save'}
                        />
                    </Button>
                </Right>
            </Header>
        );
    }

    render() {
        return (
            <Container>
                {this.state.selected ? this.selectedHeader() : (
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
                            defaultValue={this.state.inputText}
                            onChangeText={(text) => this.setState({inputText: text})}
                            onSubmitEditing={(event) => this.handleSearch(event.nativeEvent.text)}
                        />
                    </Header>
                )}
                <RecipesList
                    origin={'search'}
                    firstSearch={this.state.firstSearch}
                    recipes={this.state.recipes}
                    selectedRecipes={this.state.selectedRecipes}
                    handlePress={this.handlePress}
                    handleLongPress={this.handleLongPress}
                />
            </Container>
        );
    }
}
