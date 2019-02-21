import React from 'react'
import {Container, Left, Body, Right, Button, Icon, Header, Title, Toast} from 'native-base'
import SelectedHeader from '../components/headers/SelectedRecipeHeader'
import RecipesList from '../components/contents/RecipesList'
import { getSavedRecipesSummary, deleteSavedRecipes, upsertItemsToShoppingListFromRecipes } from '../store/api/user'
import GenericStyles from "../constants/Style"

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: undefined,
            selected: false,
            selectedRecipes: [],
            requestAddToCart: false,
            requestDeleteRecipe: false
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
        this.props.navigation.addListener('willFocus', this.load)
    }

    load = () => {
        this.setState({ recipes: undefined })
        getSavedRecipesSummary().then(
            recipes => {
                this.setState({ recipes })
            })
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

    async addIngredientsToCart() {
        this.setState({ requestAddToCart: true })
        const res = await upsertItemsToShoppingListFromRecipes(this.state.selectedRecipes)
        Toast.show({
            text: res ? 'Ingrédients ajoutés à la liste de course !' : 'Un problème est survenu !',
            textStyle: { textAlign: 'center' },
            buttonText: 'Ok'
        })
        this.setState({ requestAddToCart: false })
    }

    async deleteSelectedRecipes() {
        this.setState({ requestDeleteRecipe: true })
        const res = await deleteSavedRecipes(this.state.selectedRecipes)
        Toast.show({
            text: res ? 'Recette supprimée !' : 'Un problème est survenu !',
            textStyle: { textAlign: 'center' },
            buttonText: 'Ok'
        })
        this.setState({ requestDeleteRecipe: false })
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
                      requestAddToCart={this.state.requestAddToCart}
                      requestDeleteRecipe={this.state.requestDeleteRecipe}
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
