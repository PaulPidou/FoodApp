import React from "react"
import {Container, Content, Text, List, ListItem, Icon, Left, Body} from "native-base"
import {Image, Platform, AsyncStorage} from "react-native"

import GenericStyles from '../constants/Style'

export default class SideBar extends React.Component {
    _signOutAsync = async () => {
        await AsyncStorage.removeItem('userToken')
        this.props.navigation.navigate('Auth')
    }

    render() {
        return (
            <Container>
                <Content>
                    <Image
                        source={require('../assets/images/drawer_header_color.jpg')}
                        style={{ height: 180 }}
                    />
                    <List>
                        <ListItem
                            icon
                            onPress={() => this.props.navigation.navigate("Home")}>
                            <Left>
                                <Icon
                                    style={GenericStyles.icon}
                                    name='home'
                                    type="MaterialIcons"
                                />
                            </Left>
                            <Body>
                                <Text>Accueil</Text>
                            </Body>
                        </ListItem>
                        <ListItem
                            icon
                            onPress={() => this.props.navigation.navigate("Profile")}>
                            <Left>
                                <Icon
                                    style={GenericStyles.icon}
                                    name='person'
                                    type="MaterialIcons"
                                />
                            </Left>
                            <Body>
                                <Text>Profil</Text>
                            </Body>
                        </ListItem>
                        <ListItem
                            icon
                            onPress={() => this.props.navigation.navigate("Settings")}>
                            <Left>
                                <Icon
                                    style={GenericStyles.icon}
                                    name='settings'
                                    type="MaterialIcons"
                                />
                            </Left>
                            <Body>
                                <Text>Paramètres</Text>
                            </Body>
                        </ListItem>
                        <ListItem
                            icon
                            onPress={() => this._signOutAsync()}>
                            <Left>
                                <Icon
                                    style={GenericStyles.icon}
                                    name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
                                />
                            </Left>
                            <Body>
                            <Text>Me déconnecter</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}