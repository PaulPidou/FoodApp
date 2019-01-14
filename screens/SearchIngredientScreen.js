import React from 'react';
import {Container, Content, List, ListItem, Input, Button, Text, Header, Left, Icon} from 'native-base';

import GenericStyles from '../constants/Style'
import {Platform, ScrollView} from "react-native";

export default class ShoppingListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: this.ingredients
        };
    }

    ingredients = [
        'abricot',
        'beurre',
        'farine',
        'salade',
        'saumon',
        'thon',
        'tortilla'
    ]

    static navigationOptions = {
        header: null
    };

    searchFilterFunction(text) {
        const filteredIngredients = this.ingredients.filter(item => {
            return item.startsWith(text.toLowerCase());
        });
        this.setState({ ingredients: filteredIngredients });
    }

    renderList(props) {
        let new_letter = true
        let current_letter = null
        return this.state.ingredients.map((item) => {
            if(current_letter !== item.charAt(0)) {
                new_letter = true
                current_letter = item.charAt(0)
            }

            if (new_letter) {
                new_letter = false
                return (
                    [
                        <ListItem key={item.charAt(0)} itemDivider>
                            <Text>{item.charAt(0).toUpperCase()}</Text>
                        </ListItem>,
                        <ListItem
                            key={item}
                            onPress={() => this.props.navigation.navigate('AddIngredient', {ingredient: item,
                                origin: props.navigation.state.params.origin})}
                        >
                            <Text>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                        </ListItem>
                    ]
                );
            } else {
                return (
                    <ListItem
                        key={item}
                        onPress={() => this.props.navigation.navigate('AddIngredient', {ingredient: item})}
                    >
                        <Text>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                    </ListItem>
                );
            }
        });
    }

    render() {
        return (
            <Container>
                <Header searchbar style={GenericStyles.header} >
                    <Left style={GenericStyles.headerLeft}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()} >
                            <Icon
                                style={GenericStyles.icon}
                                name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                            />
                        </Button>
                    </Left>
                    <Input
                        placeholder={'Je recherche un ingrédient...'}
                        onChangeText={text => this.searchFilterFunction(text)}
                    />
                </Header>
                <Content>
                    <ScrollView>
                        <List>
                            {this.renderList(this.props)}
                        </List>
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}