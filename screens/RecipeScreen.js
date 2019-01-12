import React from 'react';
import {Platform, ScrollView, Text} from 'react-native';
import {Container, Content, Left, Body, Right, Button, Icon, Header, Title, Spinner} from 'native-base';

import GenericStyles from "../constants/Style";
import {getRecipeFromId} from '../api_calls/public'


export default class RecipeScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            recipeId: navigation.getParam('recipeId', 'NO-ID'),
            recipe: null
        };
    }

    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        this._asyncRequest = getRecipeFromId(this.state.recipeId).then(
            recipe => {
                this._asyncRequest = null;
                this.setState({recipe});
            }
        );
    }

    header(props) {
        return (
            <Header style={GenericStyles.header}>
                <Left style={GenericStyles.headerLeft}>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                        />
                    </Button>
                </Left>
                <Body>
                <Title style={GenericStyles.headerTitle}>{props.navigation.state.params.recipeId}</Title>
                </Body>
                <Right>
                    <Button
                        transparent
                        onPress={() => console.log("Recipe delete")}>
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                        />
                    </Button>
                </Right>
            </Header>
        );
    };

    render() {
        if (this.state.recipe === null) {
            return (
                <Container>
                    {this.header(this.props)}
                    <Content>
                        <Spinner color='#007aff' />
                    </Content>
                </Container>
            );
        } else {
            return (
                <Container>
                    {this.header(this.props)}
                    <Content>
                        <ScrollView>
                        </ScrollView>
                    </Content>
                </Container>
            );
        }
    }
}
