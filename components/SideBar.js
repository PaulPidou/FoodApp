import React from "react";
import {Container, Content, Text, List, ListItem, Icon, Left, Body} from "native-base";
import {Image, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    icon : {
        color: '#007aff'
    }
});

export default class SideBar extends React.Component {
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
                                    style={styles.icon}
                                    name='home'
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
                                    style={styles.icon}
                                    name='person'
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
                                    style={styles.icon}
                                    name='settings'
                                />
                            </Left>
                            <Body>
                                <Text>Paramètres</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}