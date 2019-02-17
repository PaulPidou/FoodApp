import React from 'react'
import {Container, Content, List, ListItem, Input, Button, Text, Header, Left, Icon, Spinner} from 'native-base'
import {Platform, ScrollView} from "react-native"
import { getAllIngredients } from '../store/api/public'
import GenericStyles from '../constants/Style'

export default class SearchIngredientScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: undefined,
            ingredientsCache: undefined
        }
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        getAllIngredients().then(
            ingredientsCache => {
                this.setState({ingredientsCache, ingredients: ingredientsCache})
            })
    }

    searchFilterFunction(text) {
        const filteredIngredients = this.state.ingredientsCache.filter(item => {
            return item.name.startsWith(text.toLowerCase())
        })
        this.setState({ ingredients: filteredIngredients })
    }

    renderList() {
        let new_letter = true
        let current_letter = null

        return this.state.ingredients.map((item) => {
            if(current_letter !== item.name.charAt(0)) {
                new_letter = true
                current_letter = item.name.charAt(0)
            }

            if (new_letter) {
                new_letter = false
                return (
                    [
                        <ListItem key={item.name.charAt(0)} itemDivider>
                            <Text>{item.name.charAt(0).toUpperCase()}</Text>
                        </ListItem>,
                        <ListItem
                            key={item._id}
                            onPress={() => this.props.navigation.navigate('AddIngredient', {ingredient: item,
                                origin: this.props.navigation.state.params.origin})}
                        >
                            <Text>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
                        </ListItem>
                    ]
                )
            } else {
                return (
                    <ListItem
                        key={item._id}
                        onPress={() => this.props.navigation.navigate('AddIngredient', {ingredient: item,
                            origin: this.props.navigation.state.params.origin})}
                    >
                        <Text>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
                    </ListItem>
                )
            }
        })
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
                        returnKeyType = { "search" }
                        onChangeText={text => this.searchFilterFunction(text)}
                    />
                </Header>
                <Content>
                    {
                        this.state.ingredientsCache === undefined ? (<Spinner color='#007aff' />) : (
                            <ScrollView>
                                <List>
                                    {this.renderList()}
                                </List>
                            </ScrollView>
                        )
                    }
                </Content>
            </Container>
        )
    }
}
