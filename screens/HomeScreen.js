import React from 'react'
import {Container,Left, Body, Right, Button, Icon, Header, Title} from 'native-base'

import GenericStyles from "../constants/Style"
import SelectedHeader from '../components/headers/SelectedRecipeHeader'
import RecipesList from '../components/contents/RecipesList'
import {getRecipesSummary} from '../utils/api/user'


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false,
            selectedRecipes: [],
            recipes: null
        }
        this.emptySelected = this.emptySelected.bind(this)
        this.handlePress = this.handlePress.bind(this)
        this.handleLongPress = this.handleLongPress.bind(this)
        this.addIngredientsToCart = this.addIngredientsToCart.bind(this)
        this.deleteSelectedRecipes = this.deleteSelectedRecipes.bind(this)
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        this._asyncRequest = getRecipesSummary().then(
            recipes => {
                this._asyncRequest = null
                this.setState({recipes})
            }
        )
    }

    handlePress(itemID) {
        if(this.state.selected) {
            this._updateSelectedRecipes(itemID)
        } else {
            this.props.navigation.navigate("RecipeDetails", {recipeId: itemID, origin: 'home'})
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

    addIngredientsToCart() {
        console.log("Add ingredients to cart:")
        console.log(this.state.selectedRecipes)
    }

    deleteSelectedRecipes() {
        console.log("Delete:")
        console.log(this.state.selectedRecipes)
    }

    header() {
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
        )
    }

  render() {
      return (
          <Container>
              {this.state.selected ?
                  <SelectedHeader
                      origin={'home'}
                      emptySelected={this.emptySelected}
                      addIngredientsToCart={this.addIngredientsToCart}
                      deleteSelectedRecipes={this.deleteSelectedRecipes}
                  /> : this.header()}
              <RecipesList
                  origin={'home'}
                  recipes={this.state.recipes}
                  selectedRecipes={this.state.selectedRecipes}
                  handlePress={this.handlePress}
                  handleLongPress={this.handleLongPress}
              />
          </Container>
      )
  }
}
