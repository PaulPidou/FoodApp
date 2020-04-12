import React from 'react'
import {Alert, Platform, ScrollView, View} from 'react-native'
import {Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Spinner, ActionSheet, Text} from 'native-base'
import {Badge} from 'react-native-elements'
import { NetworkConsumer } from "react-native-offline"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import FoodListHeader from "../components/headers/FoodListHeader"
import SelectedHeader from '../components/headers/SelectedIngredientHeader'
import ShoppingListHeader from "../components/headers/ShoppingListHeader"
import UpdateIngredientModal from "../components/contents/UpdateIngredientModal"
import ClickableAvatar from '../components/common/ClickableAvatar'
import { transferItemsFromShoppingListToFridge, deleteItemsFromShoppingList } from "../store/api/user"

import GenericStyles from "../constants/Style"
import Colors from '../constants/Colors'
import {getProductsByIngredient} from "../store/api/public"

class ShoppingListScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false,
            selectedIngredients: [],
            shoppingMode: false,
            checkedIngredients: [],
            requestTransfer: false,
            requestDelete: false,
            ingredientClicked: null,
            products: undefined,
            origin: props.navigation.getParam('origin', null)
        }
    }

    static navigationOptions = {
        header: null
    }

    handlePress(item) {
        if(this.state.shoppingMode) {
            this._updateStateArray(item.ingredientID, 'checkedIngredients')
        } else if(this.state.selected) {
            this._updateStateArray(item.ingredientID, 'selectedIngredients')
        } else {
            this.setState({ ingredientClicked: item })
            this.toggleModal()
            getProductsByIngredient(item.ingredientID).then(
                products => {
                    this.setState({ products: products })
                })
        }
    }

    handleLongPress(itemID) {
        if(this.state.shoppingMode) {
            this._updateStateArray(itemID, 'checkedIngredients')
            return
        }
        if(this.state.selected) {
            this._updateStateArray(itemID, 'selectedIngredients')
        } else {
            this.setState({
                selected: true,
                selectedIngredients: [itemID]
            })
        }
    }

    toggleModal() {
        this.setState({ products: undefined, isIngredientModalVisible: !this.state.isIngredientModalVisible })
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

    emptyChecked() {
        this.setState({ shoppingMode: false, checkedIngredients: [] })
    }

    updateChecked() {
        this.setState({checkedIngredients: this.props.ingredients.map(item => item.ingredientID) })
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

    handleIngredientsManagement() {
        switch(this.props.shoppingListManagement) {
            case 'ALWAYS_ASK':
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
                    (index) => this.handleActionSheetOptions(index))
                break
            case 'TRANSFER':
                Alert.alert(
                    'Confirmation',
                    'Les aliments seront transférés dans le frigidaire',
                    [
                        {text: 'Annuler', style: 'cancel'},
                        {text: 'Ok', onPress: () => this.handleActionSheetOptions(0)},
                    ])
                break
            case 'DELETE':
                Alert.alert(
                    'Confirmation',
                    'Les aliments seront supprimés de la liste de courses',
                    [
                        {text: 'Annuler', style: 'cancel'},
                        {text: 'Ok', onPress: () => this.handleActionSheetOptions(1)},
                    ])
                break
            case 'KEEP':
                Alert.alert(
                    'Confirmation',
                    'Les aliments seront gardés dans la liste de courses',
                    [
                        {text: 'Annuler', style: 'cancel'},
                        {text: 'Ok', onPress: () => this.handleActionSheetOptions(2)},
                    ])
                break
        }

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
                                    onPress={() => this.handlePress(item)}
                                >
                                    <Icon name={iconLeft} style={{color: '#2ed583'}} />
                                </Button>) : (
                                    <ClickableAvatar
                                        title={item.ingredientName.charAt(0).toUpperCase()}
                                        isSelect={isSelected}
                                        onPress={() => this.handleLongPress(item.ingredientID)}
                                    />)
                        }
                    </Left>
                    <Body>
                    <Text
                        style={isChecked ? {textDecorationLine: 'line-through'} : {}}
                    >{item.ingredientName.charAt(0).toUpperCase() + item.ingredientName.slice(1)}</Text>
                        {
                            item.associatedProduct && (
                                <Text
                                    numberOfLines={1}
                                    style={{ color: '#808080', fontSize: 12 }}>
                                    {item.associatedProduct.name} - {item.associatedProduct.brand}
                                </Text>
                            )
                        }
                    </Body>
                    <Right>
                        {
                            item.associatedProduct && item.associatedProduct.nutriscore && (
                                <Badge
                                    containerStyle={{
                                        backgroundColor: Colors.getNutriscoreColor(item.associatedProduct.nutriscore)}}>
                                    <Text
                                        style={{color: "#fff", fontWeight: 'bold'}}
                                    >{item.associatedProduct.nutriscore.toUpperCase()}</Text>
                                </Badge>
                            )
                        }
                    </Right>
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
                    emptySelected={() => this.emptySelected()}
                    updateSelected={() => this.updateSelected()}
                    transferItemsToFridge={() => this.transferItemsToFridge()}
                    deleteSelectedIngredients={() => this.deleteSelectedIngredients()}
                    selectedIngredients={this.props.ingredients ?
                        this.props.ingredients.filter(item => this.state.selectedIngredients.includes(item.ingredientID)) : null }
                />)
        } else if(this.state.shoppingMode) {
            header = (
                <ShoppingListHeader
                    navigation={this.props.navigation}
                    emptyChecked={() => this.emptyChecked()}
                    updateChecked={() => this.updateChecked()}
                    handleIngredientsManagement={() => this.handleIngredientsManagement()}
                    keepIngredientsInShoppingList={() => this.handleActionSheetOptions(2)}
                />
            )
        } else if(this.state.origin === 'welcome') {
            header = (
                <Header style={GenericStyles.header}>
                    <Right style={GenericStyles.headerFoodListComponent}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('SearchIngredientForSL', {origin: 'shoppinglist'})} >
                            <Icon
                                style={GenericStyles.headerIcon}
                                name='add'
                                type="MaterialIcons"
                            />
                        </Button>
                    </Right>
                </Header>)
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
            content = (<Spinner color={Colors.tintColor} />)
        } else if (this.props.ingredients.length === 0) {
            content = (<Text style={{margin: 10, textAlign: 'center'}}>
                Votre liste de courses est vide, commencez dès maintenant à la compléter !</Text>)
        } else {
            content = (<ScrollView><List>{this.renderList()}</List></ScrollView>)
        }
        return (
            <Container>
                {header}
                {
                    this.state.origin === 'welcome' && (
                        <View style={{alignItems: 'center'}}>
                            <Text style={{marginTop: 5, marginBottom: 5}}>
                                <Text style={{color: Colors.tintColor}}>Frigidaire > Recettes > </Text>
                                <Text style={{color: Colors.tintColor, textDecorationLine: 'underline'}}>Liste de courses</Text>
                            </Text>
                            <Button
                                style={{marginBottom: 5}}
                                onPress={() => {
                                    this.props.navigation.navigate('App')
                                }}
                                rounded success iconRight>
                                <Text>Accéder à l'app</Text>
                                <Icon name='arrow-forward' />
                            </Button>
                        </View>
                    )
                }
                <UpdateIngredientModal
                    isModalVisible={this.state.isIngredientModalVisible}
                    toggleModal={() => this.toggleModal()}
                    ingredient={this.state.ingredientClicked}
                    products={this.state.products}
                    origin={'shoppinglist'} />
                <Content>{content}</Content>
            </Container>
        )
    }
}

ShoppingListScreen.propTypes = {
    ingredients: PropTypes.array,
    shoppingListManagement: PropTypes.string
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.generalReducer.shoppingList,
        shoppingListManagement: state.settingsReducer.shoppingListManagement
    }
}

export default connect(mapStateToProps)(ShoppingListScreen)
