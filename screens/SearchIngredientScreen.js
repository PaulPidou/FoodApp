import React from 'react'
import { Container, Content, Input, Button, Text, Header, Left, Right, Icon, Spinner, Toast } from 'native-base'
import {Platform, ScrollView, View, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native'
import { Avatar } from 'react-native-elements'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import GenericStyles from '../constants/Style'
import { getAllIngredients } from '../store/api/public'
import { upsertItemsToShoppingList, upsertItemsToFridge } from '../store/api/user'
import Colors from "../constants/Colors"

class SearchIngredientScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: undefined,
            ingredientsCache: undefined,
            ingredientsSelected: [],
            sortByFame: false,
            requestAdd: false
        }
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        getAllIngredients().then(
            ingredientsCache => {
                this.setState({ ingredientsCache, ingredients: ingredientsCache })
            })
    }

    _searchFilterFunction(text) {
        const filteredIngredients = this.state.ingredientsCache.filter(item => {
            return item.name.startsWith(text.toLowerCase())
        })
        this.setState({ ingredients: filteredIngredients },
            () => { this._sortIngredients(this.state.sortByFame) })
    }

    _sortIngredients(sortByFame) {
        let ingredients = this.state.ingredients.slice()

        sortByFame ? ingredients.sort((a, b) => (a.fame > b.fame) ? -1 : 1) :
            ingredients.sort((a, b) => (a.name > b.name) ? 1 : -1)

        this.setState({ ingredients, sortByFame })
    }

    _selectIngredient(ingredientID) {
        const isSelected = this.state.ingredientsSelected.includes(ingredientID)
        const newArray = isSelected ? this.state.ingredientsSelected.filter(id => id !== ingredientID) :
            [...this.state.ingredientsSelected, ingredientID]
        this.setState({ ingredientsSelected: newArray })
    }

    async handlePress() {
        this.setState({ requestAdd: true })
        const screen = this.props.navigation.state.params.origin === 'fridge' ? 'Fridge' : 'ShoppingList'
        const ingredients = this.state.ingredientsSelected.map((item) => {
            return { ingredientID: item, unit: 'INFINITY', quantity: 0 }
        })
        if(this.props.navigation.state.params.origin === 'fridge') {
            await upsertItemsToFridge(ingredients)
        } else {
            await upsertItemsToShoppingList(ingredients)
        }
        this.setState({ requestAdd: false })
        this.props.navigation.navigate(screen)
    }

    renderList() {
        let view = []
        for (let i = 0; i < this.state.ingredients.length; i+=2) {
            const item1 = this.state.ingredients[i]
            let row = null

            if (i+1 <= this.state.ingredients.length-1) {
                const item2 = this.state.ingredients[i+1]

                row = (
                    <TouchableOpacity
                        activeOpacity={.4}
                        onPress={() => this._selectIngredient(item2._id)}>
                        <View
                            style={[GenericStyles.ingredientBlock,
                            this.state.ingredientsSelected.includes(item2._id) ?
                                GenericStyles.selectedIngredientBlock : GenericStyles.unselectedIngredientBlock]}
                        >
                            <Avatar
                                large
                                rounded
                                title={item2.name.charAt(0).toUpperCase()}
                                source={{ uri: item2.picture }}
                                activeOpacity={0.7}
                            />
                            <Text style={{marginTop: 10}}>{item2.name.charAt(0).toUpperCase() + item2.name.slice(1)}</Text>
                        </View>
                    </TouchableOpacity>
                )
            } else {
                row = (<View style={{width: 150, height: 150, margin: 10}} />)
            }

            view.push(
                <View key={i} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity
                        activeOpacity={.4}
                        onPress={() => this._selectIngredient(item1._id)}>
                        <View style={[GenericStyles.ingredientBlock,
                            this.state.ingredientsSelected.includes(item1._id) ?
                                GenericStyles.selectedIngredientBlock : GenericStyles.unselectedIngredientBlock]}>
                            <Avatar
                                large
                                rounded
                                title={item1.name.charAt(0).toUpperCase()}
                                source={{ uri: item1.picture }}
                                activeOpacity={0.7}
                            />
                            <Text style={{marginTop: 10}}>{item1.name.charAt(0).toUpperCase() + item1.name.slice(1)}</Text>
                        </View>
                    </TouchableOpacity>
                    {row}
                </View>
            )
        }
        return view
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
                                style={GenericStyles.headerIcon}
                                name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                            />
                        </Button>
                    </Left>
                    <Input
                        style={GenericStyles.headerTitle}
                        placeholder={'Je recherche un ingrédient...'}
                        placeholderTextColor='#fff'
                        returnKeyType = { "search" }
                        onChangeText={text => this._searchFilterFunction(text)}
                    />
                    <Right style={{flex: 0}}>
                        <Button
                            transparent
                            onPress={() => this._sortIngredients(!this.state.sortByFame)}>
                            <Icon
                                style={GenericStyles.headerIcon}
                                name={this.state.sortByFame ? 'sort-by-alpha': 'sort' }
                                type='MaterialIcons'
                            />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    {
                        this.state.ingredientsCache === undefined ? (<Spinner color={Colors.tintColor} />) : (
                            <View style={{marginLeft: 10, marginRight: 10}}>
                                <ScrollView style={{ marginBottom: 55 }}>
                                    {this.renderList()}
                                </ScrollView>
                            </View>
                        )
                    }
                </Content>
                {
                    this.state.ingredientsCache !== undefined && (
                        <Button rounded success
                                style={{
                                    position: 'absolute',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 200,
                                    left: Math.round(Dimensions.get('window').width / 2) - 100,
                                    bottom: 10,
                                    zIndex:5
                                }}
                                onPress={() => {
                                    !this.state.requestAdd && (
                                    this.state.ingredientsSelected.length === 0 ? (
                                        Toast.show({
                                            text: "Aucun ingrédient sélectionné",
                                            textStyle: { textAlign: 'center' },
                                            buttonText: 'Ok'
                                        })
                                    ) : (this.handlePress())) }}
                        >{ this.state.requestAdd ? (<ActivityIndicator size="small" color='#fff'/>) :
                                (<Text>Ajouter</Text>)
                        }</Button>
                        )
                }
            </Container>
        )
    }
}

SearchIngredientScreen.propTypes = {
    dispatch: PropTypes.func
}

export default connect()(SearchIngredientScreen)