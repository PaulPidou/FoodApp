import React from 'react'
import {Platform, ScrollView, Text} from 'react-native'
import {Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Spinner, ActionSheet} from 'native-base'
import { Avatar } from 'react-native-elements'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import GenericStyles from "../constants/Style"
import FoodListHeader from "../components/headers/FoodListHeader"
import SelectedHeader from '../components/headers/SelectedIngredientHeader'
import { transferItemsFromShoppingListToFridge, deleteItemsFromShoppingList } from "../store/api/user"

class ShoppingListScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false,
            selectedIngredients: [],
            shoppingMode: false,
            checkedIngredients: [],
            requestTransfer: false,
            requestDelete: false
        }
        this.emptySelected = this.emptySelected.bind(this)
        this.updateSelected = this.updateSelected.bind(this)
        this.transferItemsToFridge = this.transferItemsToFridge.bind(this)
        this.deleteSelectedIngredients = this.deleteSelectedIngredients.bind(this)
    }

    static navigationOptions = {
        header: null
    }

    handlePress(item) {
        if(this.state.selected) {
            this._updateStateArray(item.ingredientID, 'selectedIngredients')
        } else {
            this.props.navigation.navigate('AddIngredient', {ingredient: item, origin: 'shoppinglist' })
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

    emptySelected() {
        this.setState({ selected: false, selectedIngredients: [] })
    }

    updateSelected() {
        this.setState({selectedIngredients: this.props.ingredients.map(item => item.ingredientID)})
    }

    async transferItemsToFridge() {
        this.setState({ requestTransfer: true })
        await transferItemsFromShoppingListToFridge(this.state.selectedIngredients)
        this.setState({ requestTransfer: false, selected: false, selectedIngredients: [] })
    }

    async deleteSelectedIngredients() {
        this.setState({ requestDelete: true })
        await deleteItemsFromShoppingList(this.state.selectedIngredients)
        this.setState({ requestDelete: false, selected: false, selectedIngredients: [] })
    }

    startShopping = () => { this.setState({ shoppingMode: true }) }

    shoppingHeader() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={{flex: 1, flexDirection: 'row'}}>
                    <Button transparent
                            onPress={() => this.setState({ shoppingMode: false, checkedIngredients: [] })}
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
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    title: "Que voulez-vous faire ?",
                                    options: [
                                        "Transférer les aliments dans le frigidaire",
                                        "Supprimer les aliments de la liste de courses",
                                        "Garder les aliments dans la liste de courses",
                                        "Annuler"
                                    ],
                                    cancelButtonIndex: 3
                                },
                                (index) => this.handleActionSheetOptions(index)
                            )}
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
                            type="MaterialIcons"
                        />
                    </Button>
                </Right>
            </Header>
        )
    }

    async handleActionSheetOptions(index) {
        switch(index) {
            case 0:
                await transferItemsFromShoppingListToFridge(this.state.checkedIngredients)
                break
            case 1:
                await deleteItemsFromShoppingList(this.state.checkedIngredients)
                break
            case 2:
                break
            case 3:
                return
            default:
                return
        }
        this.setState({ shoppingMode: false, checkedIngredients: [] })
    }

    renderList() {
        return this.props.ingredients.map((item) => {
            const isSelected = this.state.selectedIngredients.includes(item.ingredientID)
            const title = isSelected ? null : item.ingredientName.charAt(0).toUpperCase()
            const icon = isSelected ? {name: 'check'} : null

            const isChecked = this.state.checkedIngredients.includes(item.ingredientID)
            const iconLeft = isChecked ? (Platform.OS === 'ios' ? 'ios-checkbox-outline' : 'md-checkbox-outline') :
                (Platform.OS === 'ios' ? 'ios-square-outline' : 'md-square-outline')
            return (
                <ListItem
                    icon
                    avatar
                    key={item.ingredientID}
                    onPress={() => this.handlePress(item)}
                    onLongPress={() => this.handleLongPress(item.ingredientID)}
                >
                    <Left style={{height: 30}}>
                        {
                            this.state.shoppingMode ? (
                                <Button
                                    transparent
                                    onPress={() => {this._updateStateArray(item.ingredientID, 'checkedIngredients')}}
                                >
                                    <Icon name={iconLeft} />
                                </Button>) : (
                                    <Avatar
                                        size="small"
                                        rounded
                                        title={title}
                                        icon={icon}
                                        activeOpacity={0.7}
                                        onPress={() => this.handleLongPress(item.ingredientID)}
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
                    navigation={this.props.navigation}
                    requestTransfer={this.state.requestTransfer}
                    requestDelete={this.state.requestDelete}
                    origin={'shoppinglist'}
                    emptySelected={this.emptySelected}
                    updateSelected={this.updateSelected}
                    transferItemsToFridge={this.transferItemsToFridge}
                    deleteSelectedIngredients={this.deleteSelectedIngredients}
                    selectedIngredients={this.props.ingredients ?
                        this.props.ingredients.filter(item => this.state.selectedIngredients.includes(item.ingredientID)) : null }
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
                    ingredients={this.state.ingredients}
                />
            )
        }

        if (this.props.ingredients === undefined) {
            content = (<Spinner color='#007aff' />)
        } else if (this.props.ingredients.length === 0) {
            content = (<Text style={{margin: 10, textAlign: 'center'}}>
                Votre liste de courses est vide, commencez dès maintenant à la compléter !</Text>)
        } else {
            content = (<ScrollView><List>{this.renderList()}</List></ScrollView>)
        }
        return (
            <Container>
                {header}
                <Content>{content}</Content>
            </Container>
        )
    }
}

ShoppingListScreen.propTypes = {
    ingredients: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.generalReducer.shoppingList
    }
}

export default connect(mapStateToProps)(ShoppingListScreen)
