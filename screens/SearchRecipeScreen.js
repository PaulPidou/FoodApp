import React from 'react';
import {ScrollView, Text, Platform} from 'react-native';
import {
    Container,
    Header,
    Left,
    Right,
    Content,
    List,
    ListItem,
    Body,
    Thumbnail,
    Button,
    Icon,
    Input
} from 'native-base';

import GenericStyles from '../constants/Style'

export default class SearchRecipeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.setRecipes = this.setRecipes.bind(this)
        this.state = {
            recipes: []
        };
    }

    static navigationOptions = {
        header: null
    };

    setRecipes(data) {
        this.setState({recipes: data})
    }

    renderList() {
        return this.state.recipes.map((item) => {
            const source = item._source
            return (
                <ListItem thumbnail>
                    <Left>
                        <Thumbnail square source={{ uri: 'Image URL' }} />
                    </Left>
                    <Body>
                    <Text>{source.title}</Text>
                    <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text>View</Text>
                        </Button>
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
