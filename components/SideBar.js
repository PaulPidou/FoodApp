import React from "react"
import {Platform, AsyncStorage} from 'react-native'
import {Container, Content, Text, List, ListItem, Icon, Left, Body} from 'native-base'

import GenericStyles from '../constants/Style'

export default class SideBar extends React.Component {
    _signOutAsync = async () => {
        await AsyncStorage.removeItem('userToken')
        await AsyncStorage.removeItem('shoppingList')
        await AsyncStorage.removeItem('fridge')
        await AsyncStorage.removeItem('savedRecipes')
        await AsyncStorage.removeItem('recipesDetails')
        await AsyncStorage.removeItem('settings')
        this.props.navigation.navigate('Auth')
    }

    render() {
        return (
            <Container style={GenericStyles.header}>
                <Content>
                    <Text style={{ fontFamily: 'Showlove_Regular', margin: 18,
                        fontSize: 36, color: '#fff'}}>
                        Groceries (Re)Cycle</Text>
                    <List style={{borderBottomColor: '#fff'}}>
                        <ListItem
                            icon
                            onPress={() => this.props.navigation.navigate("Home")}>
                            <Left>
                                <Icon
                                    style={GenericStyles.headerIcon}
                                    name='home'
                                    type="MaterialIcons"
                                />
                            </Left>
                            <Body style={{borderBottomColor: '#fff'}}>
                                <Text style={GenericStyles.headerIcon}>Accueil</Text>
                            </Body>
                        </ListItem>
                        <ListItem
                            icon
                            onPress={() => this.props.navigation.navigate("Settings")}>
                            <Left>
                                <Icon
                                    style={GenericStyles.headerIcon}
                                    name='settings'
                                    type="MaterialIcons"
                                />
                            </Left>
                            <Body style={{borderBottomColor: '#fff'}}>
                                <Text style={GenericStyles.headerIcon}>Paramètres</Text>
                            </Body>
                        </ListItem>
                        <ListItem
                            icon
                            onPress={() => this._signOutAsync()}>
                            <Left>
                                <Icon
                                    style={GenericStyles.headerIcon}
                                    name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
                                />
                            </Left>
                            <Body style={{borderBottomColor: '#fff'}}>
                            <Text style={GenericStyles.headerIcon}>Me déconnecter</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}