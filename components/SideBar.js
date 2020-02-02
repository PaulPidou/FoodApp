import React from "react"
import {Image, Platform, AsyncStorage} from 'react-native'
import {Container, Content, Text, List, ListItem, Icon, Left, Body} from 'native-base'

import GenericStyles from '../constants/Style'

export default class SideBar extends React.Component {
    _signOutAsync = async () => {
        await AsyncStorage.removeItem('userToken')
        await AsyncStorage.removeItem('savedRecipes')
        await AsyncStorage.removeItem('shoppingList')
        await AsyncStorage.removeItem('fridge')
        this.props.navigation.navigate('Auth')
    }

    render() {
        return (
            <Container style={GenericStyles.header}>
                <Content>
                    <Image
                        source={require('../assets/images/icon_large.png')}
                        style={{ height: 180, resizeMode: 'contain' }}
                    />
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