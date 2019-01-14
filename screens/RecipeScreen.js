import React from 'react';
import {Platform, ScrollView, Text} from 'react-native';
import {
    Container,
    Content,
    Left,
    Right,
    Button,
    Icon,
    Header,
    Tabs,
    Tab,
    TabHeading,
    Spinner,
    H1,
    List,
    ListItem,
    Body
} from 'native-base';

import GenericStyles from "../constants/Style";
import {getRecipeFromId} from '../api_calls/public'
import {Avatar} from "react-native-elements";


export default class RecipeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeId: this.props.navigation.getParam('recipeId', 'NO-ID'),
            recipe: null
        }
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        this._asyncRequest = getRecipeFromId(this.state.recipeId).then(
            recipe => {
                this._asyncRequest = null;
                this.setState({recipe});
            }
        )
    }

    recipe() {
        const recipe = this.state.recipe
        let content;
        if (recipe === null) {
            content = (<Spinner color='#007aff' />)
        } else {
            content = (
                <ScrollView>
                    <H1 style={{textAlign: 'center', marginTop: 5, color: '#007aff'}}>{recipe.title}</H1>
                    <Text>{recipe.author && 'Auteur: ' + recipe.author}</Text>
                    <Text>{
                        recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)
                    }, {recipe.budget.charAt(0).toUpperCase() + recipe.budget.slice(1)}</Text>
                </ScrollView>)
        }
        return content
    }

    ingredients() {
        const recipe = this.state.recipe
        let content;
        if (recipe === null) {
            content = (<Spinner color='#007aff' />)
        } else {
            content = (
                <ScrollView>
                    <List>{
                        recipe.ingredients.map((item) => {
                            return (
                                <ListItem
                                    icon
                                    avatar
                                    key={item.ingredientID}
                                >
                                    <Left style={{height: 30}}>
                                        <Avatar
                                            size="small"
                                            rounded
                                            title={item.ingredient.charAt(0).toUpperCase()}
                                            activeOpacity={0.7}
                                        />
                                    </Left>
                                    <Body>
                                    <Text>{item.display}</Text>
                                    </Body>
                                </ListItem>
                            )
                        })
                    }</List>
                </ScrollView>)
        }
        return content
    }

    utensils() {
        const recipe = this.state.recipe
        let content;
        if (recipe === null) {
            content = (<Spinner color='#007aff' />)
        } else {
            content = (
                <ScrollView>
                    <List>{
                        recipe.utensils.map((item) => {
                            return (
                                <ListItem
                                    icon
                                    avatar
                                    key={item.utensil}
                                >
                                    <Left style={{height: 30}}>
                                        <Avatar
                                            size="small"
                                            rounded
                                            title={this._getUtensilAvatarTitle(item.utensil)}
                                            activeOpacity={0.7}
                                        />
                                    </Left>
                                    <Body>
                                    <Text>{item.utensil}</Text>
                                    </Body>
                                </ListItem>
                            )
                        })
                    }</List>
                </ScrollView>)
        }
        return content
    }

    _getUtensilAvatarTitle(utensil) {
        if(isNaN(utensil.charAt(0))) {
            return utensil.charAt(0).toUpperCase()
        } else {
            const utensilArray = utensil.split(' ')
            return utensilArray.length > 1 ? utensilArray[1].charAt(0).toUpperCase() : ''
        }
    }

    header() {
        const rightButton = this.props.navigation.state.params.origin === 'search' ?
            (
                <Button
                    transparent
                    onPress={() => console.log("Recipe delete")}>
                    <Icon
                        style={GenericStyles.icon}
                        name={Platform.OS === 'ios' ? 'ios-save' : 'md-save'}
                    />
                </Button>
            ) : ([
                <Button
                    key={'cart'}
                    transparent
                    onPress={() => console.log("Add ingredients to cart")}>
                    <Icon
                        style={GenericStyles.icon}
                        name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                    />
                </Button>,
                <Button
                    key={'trash'}
                    transparent
                    onPress={() => console.log("Recipe delete")}>
                    <Icon
                        style={GenericStyles.icon}
                        name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                    />
                </Button>
            ])
        return ([
            <Header
                key={'header'}
                style={GenericStyles.header}
                hasTabs
            >
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
            </Header>,
            <Tabs
                key={'tabs'}
                tabBarUnderlineStyle={{backgroundColor: '#007AFF'}}
                tabContainerStyle={{elevation: 0}}
            >
                <Tab
                    heading={
                    <TabHeading style={GenericStyles.headerTab}>
                        <Icon
                            style={GenericStyles.tabIcon}
                            name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'} />
                        <Text style={GenericStyles.tabText}>Recette</Text>
                    </TabHeading>}>
                    {this.recipe()}
                </Tab>
                <Tab
                    heading={
                    <TabHeading style={GenericStyles.headerTab}>
                        <Icon
                            style={GenericStyles.tabIcon}
                            name={Platform.OS === 'ios' ? 'ios-nutrition' : 'md-nutrition'} />
                        <Text style={GenericStyles.tabText}>Ingrédients</Text>
                    </TabHeading>}>
                    {this.ingredients()}
                </Tab>
                <Tab heading={
                    <TabHeading
                        style={GenericStyles.headerTab}
                    >
                        <Icon
                            style={GenericStyles.tabIcon}
                            name={Platform.OS === 'ios' ? 'ios-restaurant' : 'md-restaurant'} />
                        <Text style={GenericStyles.tabText}>Ustensiles</Text>
                    </TabHeading>}>
                    {this.utensils()}
                </Tab>
            </Tabs>
        ])
    }

    render() {
        const recipe = this.state.recipe
        let content;
        if (recipe === null) {
            content = (<Spinner color='#007aff' />)
        } else {
            content = (
                <ScrollView>
                    <H1>{recipe.title}</H1>
                </ScrollView>)
        }
        return (
            <Container>
                {this.header()}
            </Container>
        )
    }
}
