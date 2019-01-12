import React from "react";
import {Container, Content, Text, List, ListItem, Icon} from "native-base";
import {Image, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    listItem: {
        marginLeft: 0
    },
    icon : {
        color: '#007aff',
        marginLeft: 10,
        marginRight: 10
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
                            style={styles.listItem}
                            button
                            onPress={() => this.props.navigation.navigate("Home")}>
                            <Icon
                                style={styles.icon}
                                name='home'
                            />
                            <Text>Accueil</Text>
                        </ListItem>
                        <ListItem
                            style={styles.listItem}
                            button
                            onPress={() => this.props.navigation.navigate("Profile")}>
                            <Icon
                                style={styles.icon}
                                name='person'
                            />
                            <Text>Profil</Text>
                        </ListItem>
                        <ListItem
                            style={styles.listItem}
                            button
                            onPress={() => this.props.navigation.navigate("Settings")}>
                            <Icon
                                style={styles.icon}
                                name='settings'
                            />
                            <Text>Paramètres</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}