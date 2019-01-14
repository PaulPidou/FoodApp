import React from 'react';
import {ScrollView, Text, Platform} from 'react-native';
import {Container, Header, Left, Right, Content, List, ListItem, Body, Button, Icon, Input} from 'native-base';
import {Avatar} from "react-native-elements";

import GenericStyles from '../constants/Style'
import {getRecipesFromKeywords} from '../api_calls/public'

export default class SearchRecipeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: null,
            selected: false,
            selectedRecipes: [],
            recipes: []
        }
    }

    static navigationOptions = {
        header: null
    }

    async handleSearch(keywords) {
        const recipes = await getRecipesFromKeywords(keywords)
        this.setState({recipes})
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

    renderList() {
        return this.state.recipes.map((item) => {
            const isSelected = this.state.selectedRecipes.includes(item._id)
            const title = isSelected ? null : item.title.charAt(0)
            const icon = isSelected ? {name: 'check'} : null
            return (
                <ListItem
                    avatar
                    key={item._id}
                    onPress={() => this.handlePress(item._id)}
                    onLongPress={() => this.handleLongPress(item._id)}
                >
                    <Left>
                        <Avatar
                            size="large"
                            rounded
                            title={title}
                            icon={icon}
                            activeOpacity={0.7}
                            onPress={() => this.handleLongPress(item._id)}
                        />
                    </Left>
                    <Body>
                    <Text>{item.title}</Text>
                    <Text note numberOfLines={1}>{
                        item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)
                    }, {item.budget.charAt(0).toUpperCase() + item.budget.slice(1)}</Text>
                    </Body>
                    <Right>
                        <Text>{item.totalTime} min</Text>
                    </Right>
                </ListItem>
            );
        });
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
                <Content>
                    <ScrollView>
                        <List>
                            {this.renderList()}
                        </List>
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}
