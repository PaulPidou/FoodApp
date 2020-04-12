import React from 'react'
import {Container, Left, Body, Right, Button, Icon, Header, Title} from 'native-base'
import { connect } from 'react-redux'
import { NetworkConsumer } from 'react-native-offline'
import PropTypes from "prop-types"

import MenuButton from "../components/common/MenuButton"
import SelectedRecipeHeader from "../components/headers/SelectedRecipeHeader"
import RecipesList from '../components/contents/RecipesList'
import { ActivityIndicator, Alert, Platform } from "react-native"
import { cookSavedRecipes, deleteSavedRecipes } from "../store/api/user"
import GenericStyles from "../constants/Style"
import Colors from "../constants/Colors"

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false,
            selectedRecipes: [],
            requestCook: false,
            requestDelete: false
        }
        this.handlePress = this.handlePress.bind(this)
        this.handleLongPress = this.handleLongPress.bind(this)
    }

    static navigationOptions = {
        header: null
    }

    handlePress(itemID) {
        this.props.navigation.navigate('RecipeDetails', { recipeId: itemID, origin: 'home' })
    }

    handleLongPress(itemID) {
        if(this.state.selected) {
            this._updateStateArray(itemID)
        } else {
            this.setState({
                selected: true,
                selectedRecipes: [itemID]
            })
        }
    }

    _updateStateArray(itemID) {
        const isSelected = this.state.selectedRecipes.includes(itemID)
        const newArray = isSelected
            ? this.state.selectedRecipes.filter(id => id !== itemID) : [...this.state.selectedRecipes, itemID]
        this.setState({
            selected: newArray.length > 0,
            selectedRecipes: newArray
        })
    }

    emptySelected() {
        this.setState({ selected: false, selectedRecipes: [] })
    }

    updateSelected() {
        this.setState({
            selectedRecipes: this.props.savedRecipes.map(item => item._id)
        })
    }

    async cookSelectedRecipes() {
        this.setState({ requestCook: true })
        await cookSavedRecipes(this.state.selectedRecipes)
        this.setState({ requestCook: false, selected: false, selectedRecipes: [] })
    }

    async deleteSelectedRecipes() {
        this.setState({ requestDelete: true })
        await deleteSavedRecipes(this.state.selectedRecipes)
        this.setState({ requestDelete: false, selected: false, selectedRecipes: [] })
    }

    header() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={GenericStyles.headerLeft}>
                    <MenuButton
                        navigation={this.props.navigation}
                    />
                </Left>
                <Body>
                <Title style={GenericStyles.headerTitle}>Recettes</Title>
                </Body>
                <Right>
                    <NetworkConsumer>
                        {({ isConnected }) => (
                                <Button
                                    transparent
                                    onPress={() => {
                                        isConnected ?
                                            this.props.navigation.navigate("SearchRecipe") :
                                            Alert.alert(
                                                'Serveur hors ligne',
                                                'Vous ne pouvez pas effectuer cette action',
                                            )
                                    }}>
                                    <Icon
                                        style={GenericStyles.headerIcon}
                                        name='search'
                                        type='MaterialIcons'
                                    />
                                </Button>
                            )}
                    </NetworkConsumer>
                </Right>
            </Header>
        )
    }

  render() {
      return (
          <Container>
              {this.state.selected ? (
                  <SelectedRecipeHeader
                      emptySelected={() => this.emptySelected()}
                      updateSelected={() => this.updateSelected()}
                      cookSelectedRecipes={() => this.cookSelectedRecipes()}
                      deleteSelectedRecipes={() => this.deleteSelectedRecipes()}
                      requestCook={this.state.requestCook}
                      requestDelete={this.state.requestDelete}
                      message={this.state.selectedRecipes.length > 1 ? 'les recettes' : 'la recette'}
                  />) : this.header()}
              <RecipesList
                  origin={'home'}
                  recipes={this.props.savedRecipes}
                  handlePress={this.handlePress}
                  handleLongPress={this.handleLongPress}
                  selectedRecipes={this.state.selectedRecipes}
              />
          </Container>
      )
  }
}

HomeScreen.propTypes = {
    savedRecipes: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        savedRecipes: state.generalReducer.savedRecipes
    }
}

export default connect(mapStateToProps)(HomeScreen)