import React from 'react'
import {ScrollView, Text} from 'react-native'
import {Body, Container, Content, Left, List, ListItem, Right, Spinner} from 'native-base'
import {Avatar} from "react-native-elements"
import moment from 'moment'

import FoodListHeader from "../components/headers/FoodListHeader"
import SelectedHeader from "../components/headers/SelectedIngredientHeader"
import {getFridge} from "../utils/api/user"

export default class ShoppingListScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false,
            selectedIngredients: [],
            ingredients: null
        }
        this.emptySelected = this.emptySelected.bind(this)
        this.updateSelected = this.updateSelected.bind(this)
        this.deleteSelectedIngredients = this.deleteSelectedIngredients.bind(this)
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        this._asyncRequest = getFridge().then(
            ingredients => {
                this._asyncRequest = null
                this.setState({ingredients})
            })
    }

    handlePress(item) {
        if(this.state.selected) {
            this._updateStateArray(item._id)
        } else {
            this.props.navigation.navigate('AddIngredient', {ingredient: item.ingredientName, origin: 'fridge',
                quantity: item.quantity ? item.quantity.toString() : null, unit: item.unit ? item.unit.toString() : null,
                expirationDate: item.expirationDate ? item.expirationDate : null})
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

    deleteSelectedIngredients() {
        console.log("Delete: ")
        console.log(this.state.selectedIngredients)
    }

    activateSelectedHeader = () => { this.setState({ selected: true }) }

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
        if (this.state.ingredients === null) {
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
                            origin={'fridge'}
                            emptySelected={this.emptySelected}
                            updateSelected={this.updateSelected}
                            deleteSelectedIngredients={this.deleteSelectedIngredients}
                        />) :
                    <FoodListHeader
                        navigation={this.props.navigation}
                        name={'Frigidaire'}
                        origin={'fridge'}
                        activateSelectedHeader={this.activateSelectedHeader}
                    />
                }
                <Content>{content}</Content>
            </Container>
        )
    }
}
