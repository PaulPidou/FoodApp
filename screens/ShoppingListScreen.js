import React from 'react'
import {Platform, ScrollView, Text} from 'react-native'
import {Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Spinner, ActionSheet} from 'native-base'
import {Avatar} from "react-native-elements"

import GenericStyles from "../constants/Style"
import FoodListHeader from "../components/headers/FoodListHeader"
import SelectedHeader from '../components/headers/SelectedIngredientHeader'
import {getShoppingList} from "../api_calls/user"

export default class ShoppingListScreen extends React.Component {
    constructor(props) {
        super(props)
        this.actionSheet = null
        this.state = {
            selected: false,
            selectedIngredients: [],
            shoppingMode: false,
            checkedIngredients: [],
            ingredients: null
        }
        this.emptySelected = this.emptySelected.bind(this)
        this.updateSelected = this.updateSelected.bind(this)
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        this._asyncRequest = getShoppingList().then(
            ingredients => {
                this._asyncRequest = null
                this.setState({ingredients})
            })
    }

    handlePress(item) {
        if(this.state.selected) {
            this._updateStateArray(item._id, 'selectedIngredients')
        } else {
            this.props.navigation.navigate('AddIngredient', {ingredient: item.ingredientName, origin: 'shoppinglist',
                quantity: item.quantity ? item.quantity.toString() : null, unit: item.unit ? item.unit.toString() : null})
        }
    }

    handleLongPress(itemID) {
        if(this.state.selected) {
            this._updateStateArray(itemID, 'selectedIngredients')
        } else {
            this.setState({
                selected: true,
                selectedIngredients: [itemID]
            })
        }
    }

    emptySelected() {
        this.setState({selected: false, selectedIngredients: []})
    }

    updateSelected() {
        this.setState({selectedIngredients: this.state.ingredients.map(item => item._id)})
    }

    startShopping = () => { this.setState({ shoppingMode: true }) }

    _updateStateArray(itemID, arrayName) {
        const isSelected = this.state[arrayName].includes(itemID)
        const newArray = isSelected
            ? this.state[arrayName].filter(id => id !== itemID) : [...this.state[arrayName], itemID]
        if(arrayName === 'selectedIngredients') {
            this.setState({
                selected: newArray.length > 0,
                [arrayName]: newArray
            })
        } else {
            this.setState({ [arrayName]: newArray })
        }
    }

    shoppingHeader() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={{flex: 1, flexDirection: 'row'}}>
                    <Button transparent
                            onPress={() => this.setState({shoppingMode: false, checkedIngredients: []})}
                            style={{flex: 0}}
                    >
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
                        />
                    </Button>
                </Left>
                <Right>
                    <Button
                        transparent
                        onPress={() => this.showActionSheet()}

                    >
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-flag' : 'md-flag'}
                        />
                    </Button>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.navigate('SearchIngredient', {origin: 'shoppinglist'})} >
                        <Icon
                            style={GenericStyles.icon}
                            name='add'
                        />
                    </Button>
                </Right>
            </Header>
        )
    }

    showActionSheet() {
        if ( this.actionSheet !== null ) {
            this.actionSheet._root.showActionSheet({
                title: "Que voulez-vous faire ? (ne concerne que les aliments cochés)",
                options: [
                    "Transférer les aliments dans le frigidaire",
                    "Supprimer les aliments de la liste de courses",
                    "Garder les aliments dans la liste de courses",
                    "Annuler"
                ],
                cancelButtonIndex: 3
            }, (index) => this.handleActionSheetOptions(index))
        }
    }

    handleActionSheetOptions(index) {
        switch(index) {
            case 0:
                console.log('Transfer')
                break
            case 1:
                console.log('Delete')
                break
            case 2:
                console.log('Keep')
                break
            case 3:
                return
            default:
                return
        }
        this.setState({shoppingMode: false, checkedIngredients: []})
    }

    renderList() {
        return this.state.ingredients.map((item) => {
            const isSelected = this.state.selectedIngredients.includes(item._id)
            const title = isSelected ? null : item.ingredientName.charAt(0).toUpperCase()
            const icon = isSelected ? {name: 'check'} : null

            const isChecked = this.state.checkedIngredients.includes(item._id)
            const iconLeft = isChecked ? (Platform.OS === 'ios' ? 'ios-checkbox-outline' : 'md-checkbox-outline') :
                (Platform.OS === 'ios' ? 'ios-square-outline' : 'md-square-outline')
            return (
                <ListItem
                    icon
                    avatar
                    key={item._id}
                    onPress={() => this.handlePress(item)}
                    onLongPress={() => this.handleLongPress(item._id)}
                >
                    <Left style={{height: 30}}>
                        {
                            this.state.shoppingMode ? (
                                <Button
                                    transparent
                                    onPress={() => {this._updateStateArray(item._id, 'checkedIngredients')}}
                                >
                                    <Icon name={iconLeft} />
                                </Button>) : (
                                    <Avatar
                                        size="small"
                                        rounded
                                        title={title}
                                        icon={icon}
                                        activeOpacity={0.7}
                                        onPress={() => this.handleLongPress(item._id)}
                                    />)
                        }
                    </Left>
                    <Body>
                    <Text
                        style={isChecked && {textDecorationLine: 'line-through'}}
                    >{item.ingredientName.charAt(0).toUpperCase() + item.ingredientName.slice(1)}
                        {(item.quantity || item.unit) && ': '}
                        {item.quantity} {item.unit}</Text>
                    </Body>
                </ListItem>
            )
        })
    }

    render() {
        let header
        let content

        if(this.state.selected) {
            header = (
                <SelectedHeader
                    origin={'shoppinglist'}
                    emptySelected={this.emptySelected}
                    updateSelected={this.updateSelected}
                />)
        } else if(this.state.shoppingMode) {
            header = this.shoppingHeader()
        } else {
            header = (
                <FoodListHeader
                    navigation={this.props.navigation}
                    name={'Liste de courses'}
                    origin={'shoppinglist'}
                    startShopping={this.startShopping}
                />
            )
        }

        if (this.state.ingredients === null) {
            content = (<Spinner color='#007aff' />)
        } else if (this.state.ingredients.length === 0) {
            content = (<Text>Votre liste de courses est vide, commencez dès maintenant à la compléter !</Text>)
        } else {
            content = (<ScrollView><List>{this.renderList()}</List></ScrollView>)
        }
        return (
            <Container>
                {header}
                <Content>
                    {content}
                    <ActionSheet ref={(c) => { this.actionSheet = c }} />
                    </Content>
            </Container>
        )
    }
}
