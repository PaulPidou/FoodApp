import React from 'react'
import {Platform, Text} from 'react-native'
import {Container, Header, Content, Left, Button, Icon, Body, Title, List, ListItem, Right, Switch, Picker} from 'native-base'
import {checkInternetConnection} from "react-native-offline"

import MenuButton from "../components/common/MenuButton"
import { getUserProfile, updateUserParameters } from '../store/api/user'
import { toggleShowSubstitutes, toggleSeasonalRecipes, handleIngredientsManagement } from '../store/actions/actions'
import GenericStyles from "../constants/Style"
import Constants from "../constants/Constants"

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            switchValueAutomaticFilling: true,
            switchValueSeasonalRecipes: true,
            switchValueShowSubstitutes: true,
            shoppingListManagement: 'ALWAYS_ASK'
        }
    }

    static navigationOptions = {
        header: null
    }

    async componentDidMount() {
        const isConnected = await checkInternetConnection(Constants.serverURL)
        if(isConnected) {
            const userProfile = await getUserProfile()
            this.setState({ switchValueAutomaticFilling: !userProfile.parameters.keepFoodListsIndependent })
        }

    }

    async toggleAutomaticFilling(value) {
        this.setState({ switchValueAutomaticFilling: value })
        await updateUserParameters({ keepFoodListsIndependent: !value })
    }

    async toggleSeasonalRecipes(value) {
        this.setState({ switchValueSeasonalRecipes: value })
        toggleSeasonalRecipes(value)
        //await updateUserParameters({ keepFoodListsIndependent: !value }) No endpoint yet
    }

    toggleShowSubstitutes(value) {
        this.setState({ switchValueShowSubstitutes: value })
        toggleShowSubstitutes(value)
    }

    handleIngredientsManagement(value) {
        this.setState({shoppingListManagement: value})
        handleIngredientsManagement(value)
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
                            <Text
                                style={{fontSize: 16}}
                            >Paramètres locaux</Text>
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
                                    onValueChange={(value) => this.toggleSeasonalRecipes(value)}
                                    value={ this.state.switchValueSeasonalRecipes }
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
                                    onValueChange={(value) => this.toggleShowSubstitutes(value)}
                                    value={this.state.switchValueShowSubstitutes}
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
                                    selectedValue={this.state.shoppingListManagement}
                                    onValueChange={(value) => this.handleIngredientsManagement(value)}
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
                                    onValueChange={(value) => this.toggleAutomaticFilling(value)}
                                    value={ this.state.switchValueAutomaticFilling }
                                />
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}