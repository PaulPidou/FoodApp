import React from 'react'
import {Container, Left, Body, Right, Button, Icon, Header, Title, Text} from 'native-base'
import { connect } from 'react-redux'
import { NetworkConsumer } from 'react-native-offline'

import RecipesList from '../components/contents/RecipesList'
import PropTypes from "prop-types"
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

    selectedHeader() {
        const message = this.state.selectedRecipes.length > 1 ? 'les recettes' : 'la recette'
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
                        this.state.requestCook ? (
                            <Button
                                key={'color-fill'}
                                transparent>
                                <ActivityIndicator size="small" color={Colors.counterTintColor}/>
                            </Button>
                        ) : (
                            <NetworkConsumer>
                                {({ isConnected }) => (
                                <Button
                                    key={'color-fill'}
                                    transparent
                                    onPress={() => {
                                        isConnected ? Alert.alert(
                                            'Recette cusinée',
                                            'Retirer '.concat(message, ' et les ingrédients associés de vos listes ?'),
                                            [
                                                {text: 'Annuler', style: 'cancel'},
                                                {text: 'Oui', onPress: () => this.cookSelectedRecipes()}
                                            ]) : Alert.alert(
                                            'Serveur hors ligne',
                                            'Vous ne pouvez pas effectuer cette action',
                                        )
                                    }}>
                                    <Icon
                                        style={GenericStyles.headerIcon}
                                        name={Platform.OS === 'ios' ? 'ios-color-fill' : 'md-color-fill'}
                                    />
                                </Button>)}
                            </NetworkConsumer>
                        )
                    }
                    {
                        this.state.requestDelete ? (
                            <Button transparent>
                                <ActivityIndicator size="small" color={Colors.counterTintColor} />
                            </Button>
                        ) : (
                            <NetworkConsumer>
                                {({ isConnected }) => (
                                <Button
                                    transparent
                                    onPress={() => {
                                        isConnected ? Alert.alert(
                                            'Confirmation',
                                            'Retirer '.concat(message, ' des recettes sauvegardées ?'),
                                            [
                                                {text: 'Annuler', style: 'cancel'},
                                                {text: 'Oui', onPress: () => this.deleteSelectedRecipes()},
                                            ]): Alert.alert(
                                            'Serveur hors ligne',
                                            'Vous ne pouvez pas effectuer cette action',
                                        )
                                    }}>
                                    <Icon
                                        style={GenericStyles.headerIcon}
                                        name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
                                    />
                                </Button>)}
                            </NetworkConsumer>
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