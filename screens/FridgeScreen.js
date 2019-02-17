import React from 'react'
import {ScrollView, Text} from 'react-native'
import {Body, Container, Content, Left, List, ListItem, Right, Spinner, Toast} from 'native-base'
import {Avatar} from "react-native-elements"
import moment from 'moment'

import FoodListHeader from "../components/headers/FoodListHeader"
import SelectedHeader from "../components/headers/SelectedIngredientHeader"
import { getFridge, transferItemsFromFridgeToShoppingList, deleteItemsFromFridge } from "../store/api/user"

export default class ShoppingListScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false,
            selectedIngredients: [],
            ingredients: undefined,
            requestTransfer: false,
            requestDelete: false
        }
        this.emptySelected = this.emptySelected.bind(this)
        this.updateSelected = this.updateSelected.bind(this)
        this.deleteSelectedIngredients = this.deleteSelectedIngredients.bind(this)
        this.transferItemsToShoppingList = this.transferItemsToShoppingList.bind(this)
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        this.load()
        this.props.navigation.addListener('willFocus', this.load)
    }

    load = () => {
        this.setState({ ingredients: undefined })
        getFridge().then(
            ingredients => {
                this.setState({ ingredients })
            })

    }

    handlePress(item) {
        if(this.state.selected) {
            this._updateStateArray(item._id)
        } else {
            this.props.navigation.navigate('AddIngredient', {ingredient: item, origin: 'fridge'})
        }
    }

    handleLongPress(itemID) {
        if(this.state.selected) {
            this._updateStateArray(itemID)
        } else {
            this.setState({
                selected: true,
                selectedIngredients: [itemID]
            })
        }
    }

    _updateStateArray(itemID) {
        const isSelected = this.state.selectedIngredients.includes(itemID)
        const newArray = isSelected
            ? this.state.selectedIngredients.filter(id => id !== itemID) : [...this.state.selectedIngredients, itemID]
        this.setState({
            selected: newArray.length > 0,
            selectedIngredients: newArray
        })
    }

    emptySelected() {
        this.setState({selected: false, selectedIngredients: []})
    }

    updateSelected() {
        this.setState((state) => ({
            selectedIngredients: state.ingredients.map(item => item._id)
        }))
    }

    async transferItemsToShoppingList() {
        this.setState({ requestTransfer: true })
        const res = await transferItemsFromFridgeToShoppingList(this.state.selectedIngredients)
        Toast.show({
            text: res ? 'Ingrédient(s) transféré(s)' : 'Un problème est survenu !',
            textStyle: { textAlign: 'center' },
            buttonText: 'Ok'
        })
        this.setState({ requestTransfer: false })
    }

    async deleteSelectedIngredients() {
        this.setState({ requestDelete: true })
        const res = await deleteItemsFromFridge(this.state.selectedIngredients)
        Toast.show({
            text: res ? 'Ingrédient(s) supprimé(s)' : 'Un problème est survenu !',
            textStyle: { textAlign: 'center' },
            buttonText: 'Ok'
        })
        this.setState({ requestDelete: false })
    }

    renderList() {
        return this.state.ingredients.map((item) => {
            const isSelected = this.state.selectedIngredients.includes(item._id)
            const title = isSelected ? null : item.ingredientName.charAt(0).toUpperCase()
            const icon = isSelected ? {name: 'check'} : null
            return (
                <ListItem
                    icon
                    avatar
                    key={item._id}
                    onPress={() => this.handlePress(item)}
                    onLongPress={() => this.handleLongPress(item._id)}
                >
                    <Left style={{height: 30}}>
                        <Avatar
                            size="small"
                            rounded
                            title={title}
                            icon={icon}
                            activeOpacity={0.7}
                            onPress={() => this.handleLongPress(item._id)}
                        />
                    </Left>
                    <Body>
                    <Text>{item.ingredientName.charAt(0).toUpperCase() + item.ingredientName.slice(1)}
                        {(item.quantity || item.unit) && ': '}
                        {item.quantity} {item.unit}</Text>
                    </Body>
                    <Right>
                        <Text>{item.expirationDate && (moment(item.expirationDate).format('DD/MM/YYYY'))}</Text>
                    </Right>
                </ListItem>
            )
        })
    }

    render() {
        let content
        if (this.state.ingredients === undefined) {
            content = (<Spinner color='#007aff' />)
        } else if (this.state.ingredients.length === 0) {
            content = (<Text>Votre frigidaire, commencez dès maintenant à la compléter !</Text>)
        } else {
            content = (
                <ScrollView>
                    <List>{this.renderList()}</List>
                </ScrollView>
            )
        }
        return (
            <Container>
                {this.state.selected ? (
                        <SelectedHeader
                            navigation={this.props.navigation}
                            requestTransfer={this.state.requestTransfer}
                            requestDelete={this.state.requestDelete}
                            origin={'fridge'}
                            emptySelected={this.emptySelected}
                            updateSelected={this.updateSelected}
                            transferItemsToShoppingList={this.transferItemsToShoppingList}
                            deleteSelectedIngredients={this.deleteSelectedIngredients}
                            selectedIngredients={this.state.selectedIngredients}
                        />) :
                    <FoodListHeader
                        navigation={this.props.navigation}
                        name={'Frigidaire'}
                        origin={'fridge'}
                        ingredients={this.state.ingredients}
                    />
                }
                <Content>{content}</Content>
            </Container>
        )
    }
}
