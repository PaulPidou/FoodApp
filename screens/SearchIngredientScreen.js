import React from 'react'
import { Container, Content, Input, Button, Text, Header, Left, Icon, Spinner } from 'native-base'
import { Platform, ScrollView, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import { getAllIngredients } from '../store/api/public'
import GenericStyles from '../constants/Style'

export default class SearchIngredientScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: undefined,
            ingredientsCache: undefined,
            ingredientsSelected: []
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

    searchFilterFunction(text) {
        const filteredIngredients = this.state.ingredientsCache.filter(item => {
            return item.name.startsWith(text.toLowerCase())
        })
        this.setState({ ingredients: filteredIngredients })
    }

    _selectIngredient(ingredientID) {
        const isSelected = this.state.ingredientsSelected.includes(ingredientID)
        const newArray = isSelected ? this.state.ingredientsSelected.filter(id => id !== ingredientID) :
            [...this.state.ingredientsSelected, ingredientID]
        this.setState({ ingredientsSelected: newArray })
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
                                {this.renderList()}
                            </ScrollView>
                        )
                    }
                </Content>
            </Container>
        )
    }
}