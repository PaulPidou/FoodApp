import React from 'react';
import {Platform, ScrollView} from 'react-native';
import {Container, Content, Left, Body, Right, Button, Icon, Header, Title, Spinner} from 'native-base';

import GenericStyles from "../constants/Style";
import {getRecipeFromId} from '../api_calls/public'


export default class RecipeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeId: this.props.navigation.getParam('recipeId', 'NO-ID'),
            recipe: null
        }
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        this._asyncRequest = getRecipeFromId(this.state.recipeId).then(
            recipe => {
                this._asyncRequest = null;
                this.setState({recipe});
            }
        )
    }

    header() {
        const rightButton = this.props.navigation.state.params.origin === 'search' ?
            (
                <Button
                    transparent
                    onPress={() => console.log("Recipe delete")}>
                    <Icon
                        style={GenericStyles.icon}
                        name={Platform.OS === 'ios' ? 'ios-save' : 'md-save'}
                    />
                </Button>
            ) : (
                <Button
                    transparent
                    onPress={() => console.log("Recipe delete")}>
                    <Icon
                        style={GenericStyles.icon}
                        name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                    />
                </Button>
            )
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
                <Title style={GenericStyles.headerTitle}>{this.state.recipeId}</Title>
                </Body>
                <Right>{rightButton}</Right>
            </Header>
        )
    }

    render() {
        let content;
        if (this.state.recipe === null) {
            content = (<Spinner color='#007aff' />)
        } else {
            content = (<ScrollView></ScrollView>)
        }
        return (
            <Container>
                {this.header()}
                <Content>{content}</Content>
            </Container>
        )
    }
}
