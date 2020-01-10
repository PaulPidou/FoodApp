import React from 'react'
import { Container, Left, Body, Right, Button, Icon, Header, Title } from 'native-base'
import { connect } from 'react-redux'
import { NetworkConsumer } from 'react-native-offline'

import RecipesList from '../components/contents/RecipesList'
import GenericStyles from "../constants/Style"
import PropTypes from "prop-types"
import { ActivityIndicator, Alert, Platform } from "react-native"
import { deleteSavedRecipes } from "../store/api/user"

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false,
            selectedRecipes: [],
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

    async deleteSelectedRecipes() {
        this.setState({ requestDelete: true })
        await deleteSavedRecipes(this.state.selectedRecipes)
        this.setState({ requestDelete: false, selected: false, selectedRecipes: [] })
    }

    header() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={GenericStyles.headerLeft}>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Icon
                            style={GenericStyles.headerIcon}
                            name='menu'
                            type="MaterialIcons"
                        />
                    </Button>
                </Left>
                <Body>
                <Title style={GenericStyles.headerTitle}>Recettes</Title>
                </Body>
                <Right>
                    <NetworkConsumer>
                        {({ isConnected }) => (
                            isConnected && (
                                <Button
                                    transparent
                                    onPress={() => this.props.navigation.navigate("SearchRecipe")}>
                                    <Icon
                                        style={GenericStyles.headerIcon}
                                        name='search'
                                        type='MaterialIcons'
                                    />
                                </Button>
                            )
                        )}
                    </NetworkConsumer>
                </Right>
            </Header>
        )
    }

    selectedHeader() {
        const message = this.state.selectedRecipes.length > 1 ?
            'Retirer les recettes des recettes sauvegardées ?' : 'Retirer la recette des recettes sauvegardées ?'
        return (
            <Header style={GenericStyles.header}>
                <Left style={{flex: 1, flexDirection: 'row'}}>
                    <Button transparent
                            onPress={() => this.emptySelected()}
                            style={{flex: 0}}
                    >
                        <Icon
                            style={GenericStyles.headerIcon}
                            name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
                            type='Ionicons'
                        />
                    </Button>
                    <Button transparent
                            onPress={() => this.updateSelected()}
                            style={{flex: 0}}
                    >
                        <Icon
                            style={GenericStyles.headerIcon}
                            name={Platform.OS === 'ios' ? 'ios-filing' : 'md-filing'}
                        />
                    </Button>
                </Left>
                <Right>
                    {
                        this.state.requestDelete ? (
                            <Button transparent>
                                <ActivityIndicator size="small" color='#fff' />
                            </Button>
                        ) : (
                            <Button
                                transparent
                                onPress={() => {
                                    Alert.alert(
                                        'Confirmation',
                                        message,
                                        [
                                            {text: 'Annuler', style: 'cancel'},
                                            {text: 'Oui', onPress: () => this.deleteSelectedRecipes()},
                                        ]
                                    )}}>
                                <Icon
                                    style={GenericStyles.headerIcon}
                                    name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
                                />
                            </Button>
                        )
                    }
                </Right>
            </Header>
        )
    }

  render() {
      return (
          <Container>
              {this.state.selected ? this.selectedHeader() : this.header()}
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