import React from 'react';
import {Platform, Text} from 'react-native';
import {Container, Header, Content, Left, Button, Icon, Body, Title, List, ListItem, Right, Switch, Picker} from 'native-base';

import GenericStyles from "../constants/Style";

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            switchValue: false,
            selected: "key1"
        }
    }

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <Container>
                <Header style={GenericStyles.header}>
                    <Left style={GenericStyles.headerLeft}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()} >
                            <Icon
                                style={GenericStyles.icon}
                                name='menu'
                            />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={GenericStyles.headerTitle}>{'Paramètres'}</Title>
                    </Body>
                </Header>
                <Content>
                    <List>
                        <ListItem icon>
                            <Left>
                                <Button style={GenericStyles.settingIcon}>
                                    <Icon active name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'} />
                                </Button>
                            </Left>
                            <Body>
                            <Text>Automatiquement ajouter les ingrédients à la liste de courses à la sauvegarde d'une recette</Text>
                            </Body>
                            <Right>
                                <Switch
                                    onValueChange={(value) => this.setState({switchValue: value})}
                                    value={this.state.switchValue}
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
                                    selectedValue={this.state.selected}
                                    onValueChange={(value) => this.setState({selected: value})}
                                >
                                    <Picker.Item label="Toujours demander" value="key0" />
                                    <Picker.Item label="Transférer les aliments dans le frigidaire" value="key1" />
                                    <Picker.Item label="Supprimer les aliments de la liste de courses" value="key2" />
                                    <Picker.Item label="Garder les aliments dans la liste de courses" value="key3" />
                                </Picker>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}