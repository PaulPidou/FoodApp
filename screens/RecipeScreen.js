import React from 'react';
import {Platform, ScrollView, Text} from 'react-native';
import {Container, Content, Left, Right, Button, Icon, Header, Tabs, Tab, TabHeading, Spinner, H1} from 'native-base';

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
        return ([
            <Header
                key={'header'}
                style={GenericStyles.header}
                hasTabs
            >
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
                <Right>{rightButton}</Right>
            </Header>,
            <Tabs
                key={'tabs'}
                tabBarUnderlineStyle={{backgroundColor: '#007AFF'}}
                tabContainerStyle={{elevation:0}}
            >
                <Tab
                    heading={
                    <TabHeading style={GenericStyles.headerTab}>
                        <Icon
                            style={GenericStyles.tabIcon}
                            name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'} />
                        <Text style={GenericStyles.tabText}>Recette</Text>
                    </TabHeading>}>
                    <Text>Tab1</Text>
                </Tab>
                <Tab
                    heading={
                    <TabHeading style={GenericStyles.headerTab}>
                        <Icon
                            style={GenericStyles.tabIcon}
                            name={Platform.OS === 'ios' ? 'ios-nutrition' : 'md-nutrition'} />
                        <Text style={GenericStyles.tabText}>Ingrédients</Text>
                    </TabHeading>}>
                    <Text>Tab2</Text>
                </Tab>
                <Tab heading={
                    <TabHeading
                        style={GenericStyles.headerTab}
                    >
                        <Icon
                            style={GenericStyles.tabIcon}
                            name={Platform.OS === 'ios' ? 'ios-restaurant' : 'md-restaurant'} />
                        <Text style={GenericStyles.tabText}>Ustensiles</Text>
                    </TabHeading>}>
                    <Text>Tab3</Text>
                </Tab>
            </Tabs>
        ])
    }

    render() {
        const recipe = this.state.recipe
        let content;
        if (recipe === null) {
            content = (<Spinner color='#007aff' />)
        } else {
            content = (
                <ScrollView>
                    <H1>{recipe.title}</H1>
                </ScrollView>)
        }
        return (
            <Container>
                {this.header()}
                <Content padder>{content}</Content>
            </Container>
        )
    }
}
