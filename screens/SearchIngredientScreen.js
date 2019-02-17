import React from 'react'
import {Container, Content, List, ListItem, Input, Button, Text, Header, Left, Icon, Spinner} from 'native-base'
import {Platform, ScrollView} from "react-native"
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import { getAllIngredients } from '../store/actions/actions'
import GenericStyles from '../constants/Style'

class SearchIngredientScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: undefined,
        }
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        this.props.getAllIngredients()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.ingredients ===  undefined) {
            return { ingredients: nextProps.ingredientsCache}
        }
        else return null
    }

    searchFilterFunction(text) {
        const filteredIngredients = this.props.ingredientsCache.filter(item => {
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
                        this.props.ingredientsCache === undefined ? (<Spinner color='#007aff' />) : (
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

SearchIngredientScreen.propTypes = {
    getAllIngredients: PropTypes.func,
    ingredientsCache: PropTypes.array,
}

const mapStateToProps = (state) => ({
    ingredientsCache: state.getAllIngredientsReducer.ingredients
})

const mapDispatchToProps = {
    getAllIngredients
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchIngredientScreen)
