import React from 'react';
import {ScrollView, Text, Platform} from 'react-native';
import {Container, Header, Left, Right, Content, List, ListItem, Body, Button, Icon, Input} from 'native-base';
import {Avatar} from "react-native-elements";

import GenericStyles from '../constants/Style'
import {getRecipesFromKeywords} from '../api_calls/public'

export default class SearchRecipeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        }
    }

    static navigationOptions = {
        header: null
    }

    async handleSearch(keywords) {
        console.log(keywords)
        const recipes = await getRecipesFromKeywords(keywords)
        this.setState({recipes})
    }

    renderList() {
        return this.state.recipes.map((item) => {
            return (
                <ListItem
                    avatar
                    key={item._id}
                >
                    <Left>
                        <Avatar
                            size="large"
                            rounded
                            title={item.title.charAt(0)}
                            activeOpacity={0.7}
                        />
                    </Left>
                    <Body>
                    <Text>{item.title}</Text>
                    <Text note numberOfLines={1}>{item.difficulty}, {item.budget}</Text>
                    </Body>
                    <Right>
                        <Text>{item.totalTime} min</Text>
                    </Right>
                </ListItem>
            );
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
                        autoFocus = {true}
                        placeholder={'Je recherche des recettes...'}
                        onSubmitEditing={(event) => this.handleSearch(event.nativeEvent.text)}
                    />
                </Header>
                <Content>
                    <ScrollView>
                        <List>
                            {this.renderList()}
                        </List>
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}
