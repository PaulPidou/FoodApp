import React from 'react'
import {Alert, Platform, Text} from 'react-native'
import { connect } from 'react-redux'
import {checkInternetConnection, NetworkConsumer} from "react-native-offline"
import {Container, Header, Content, Left, Button, Icon, Body, Title, List, ListItem, Right, Switch, Picker} from 'native-base'
import PropTypes from "prop-types"

import MenuButton from "../components/common/MenuButton"
import {toggleSeasonalRecipes, toggleShowSubstitutes, handleIngredientsManagement} from "../store/actions/actions"
import { getUserProfile, updateUserParameters } from '../store/api/user'

import GenericStyles from "../constants/Style"
import Constants from "../constants/Constants"

class SettingsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            switchValueAutomaticFilling: this.props.switchValueAutomaticFilling
        }
    }

    static navigationOptions = {
        header: null
    }

    async componentDidMount() {
        const isConnected = await checkInternetConnection(Constants.serverURL)
        if(isConnected) {
            await getUserProfile()
        }
    }

    async toggleAutomaticFilling(value) {
        this.setState({ switchValueAutomaticFilling: value })
        await updateUserParameters({ keepFoodListsIndependent: !value })
    }

    render() {
        return (
            <Container>
                <Header style={GenericStyles.header}>
                    <Left style={GenericStyles.headerLeft}>
                        <MenuButton
                            navigation={this.props.navigation}
                        />
                    </Left>
                    <Body>
                        <Title style={GenericStyles.headerTitle}>{'Paramètres'}</Title>
                    </Body>
                </Header>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Text style={{fontSize: 16}} >Paramètres locaux</Text>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={GenericStyles.settingIcon}>
                                    <Icon active name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>{"N'afficher que les recettes avec des fruits et légumes de saison"}</Text>
                            </Body>
                            <Right>
                                <Switch
                                    onValueChange={(value) => this.props.toggleSeasonalRecipes(value)}
                                    value={ this.props.switchValueSeasonalRecipes }
                                />
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={GenericStyles.settingIcon}>
                                    <Icon name={Platform.OS === 'ios' ? 'ios-nutrition' : 'md-nutrition'} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Afficher les ingrédients de substitution</Text>
                            </Body>
                            <Right>
                                <Switch
                                    onValueChange={(value) => this.props.toggleShowSubstitutes(value)}
                                    value={this.props.switchValueShowSubstitutes}
                                />
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={GenericStyles.settingIcon}>
                                    <Icon active name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Gestion des aliments de la liste de courses à la fin des courses</Text>
                            </Body>
                            <Right>
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={{ width: 120 }}
                                    selectedValue={this.props.shoppingListManagement}
                                    onValueChange={(value) => this.props.handleIngredientsManagement(value)}
                                >
                                    <Picker.Item label="Toujours demander" value="ALWAYS_ASK" />
                                    <Picker.Item label="Transférer les aliments dans le frigidaire" value="TRANSFER" />
                                    <Picker.Item label="Supprimer les aliments de la liste de courses" value="DELETE" />
                                    <Picker.Item label="Garder les aliments dans la liste de courses" value="KEEP" />
                                </Picker>
                            </Right>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text style={{fontSize: 16}} >Paramètres serveur</Text>
                        </ListItem>
                        <NetworkConsumer>
                            {({ isConnected }) => (
                            <ListItem icon>
                                <Left>
                                    <Button style={GenericStyles.settingIcon}>
                                        <Icon active name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'} />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>Ajouter automatiquement les ingrédients à la liste de courses à la sauvegarde d&apos;une recette</Text>
                                </Body>
                                <Right>
                                    <Switch
                                        onValueChange={(value) => { isConnected ?
                                            this.toggleAutomaticFilling(value) : (
                                                Alert.alert(
                                                    'Serveur hors ligne',
                                                    'Vous ne pouvez pas effectuer cette action')
                                            )}}
                                        value={ this.state.switchValueAutomaticFilling }
                                    />
                                </Right>
                            </ListItem>)}
                        </NetworkConsumer>
                    </List>
                </Content>
            </Container>
        )
    }
}

SettingsScreen.propTypes = {
    switchValueSeasonalRecipes: PropTypes.bool,
    switchValueShowSubstitutes: PropTypes.bool,
    shoppingListManagement: PropTypes.string,
    switchValueAutomaticFilling: PropTypes.bool,
    toggleSeasonalRecipes: PropTypes.func,
    toggleShowSubstitutes: PropTypes.func,
    handleIngredientsManagement: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        switchValueSeasonalRecipes: state.settingsReducer.seasonalRecipes,
        switchValueShowSubstitutes: state.settingsReducer.showSubstitutes,
        shoppingListManagement: state.settingsReducer.shoppingListManagement,
        switchValueAutomaticFilling: state.settingsReducer.switchValueAutomaticFilling
    }
}

const mapDispatchToProps = () => {
    return {
        toggleSeasonalRecipes: (value) => toggleSeasonalRecipes(value),
        toggleShowSubstitutes: (value) => toggleShowSubstitutes(value),
        handleIngredientsManagement: (value) => handleIngredientsManagement(value)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)