import React from 'react';
import {Alert, Platform, ScrollView, Text} from 'react-native';
import {Container, Content, List, ListItem, Left, Body, Right, Button, Icon, Header, Title, Spinner} from 'native-base';
import {Avatar} from 'react-native-elements'

import GenericStyles from "../constants/Style";
import {getRecipesSummary} from '../api_calls/user'


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            selectedRecipes: [],
            recipes: null
        };
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        this._asyncRequest = getRecipesSummary().then(
            recipes => {
                this._asyncRequest = null;
                this.setState({recipes});
            }
        );
    }

    handlePress(itemID) {
        if(this.state.selected) {
            this._updateSelectedRecipes(itemID)
        } else {
            this.props.navigation.navigate("RecipeDetails", {recipeId: itemID})
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

    normalHeader() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={GenericStyles.headerLeft}>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Icon
                            style={GenericStyles.icon}
                            name='menu'
                        />
                    </Button>
                </Left>
                <Body>
                <Title style={GenericStyles.headerTitle}>Recettes</Title>
                </Body>
                <Right>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.navigate("SearchRecipe")}>
                        <Icon
                            style={GenericStyles.icon}
                            name='search'
                        />
                    </Button>
                </Right>
            </Header>
        );
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
                        onPress={() => {
                            Alert.alert(
                                'Confirmation',
                                'Confirmez vous la suppression ?',
                                [
                                    {text: 'Annuler', style: 'cancel'},
                                    {text: 'Oui', onPress: () => console.log('OK Pressed')},
                                ]
                            )}}
                    >
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
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
                        <Text note numberOfLines={1}>{item.difficulty}, {item.budget}</Text>
                    </Body>
                    <Right>
                        <Text>{item.totalTime} min</Text>
                    </Right>
                </ListItem>
            );
        });
    }

  render() {
        let content;
      if (this.state.recipes === null) {
          content = (<Spinner color='#007aff' />)
      } else if (this.state.recipes.length === 0) {
          content = (
              <Text>Votre liste de recettes est vide, commencez dès maintenant à rechercher et sauvegarder des recettes !</Text>
          )
      } else {
          content = (
              <ScrollView>
                  <List>{this.renderList()}</List>
              </ScrollView>
          )
      }
      return (
          <Container>
              {this.state.selected ? this.selectedHeader() : this.normalHeader()}
              <Content>{content}</Content>
          </Container>
      )
  }
}
