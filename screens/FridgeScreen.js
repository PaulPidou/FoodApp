import React from 'react'
import {ScrollView} from 'react-native'
import {Body, Container, Content, Left, List, ListItem, Spinner, Text} from 'native-base'
import {Avatar} from 'react-native-elements'
import moment from 'moment'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Colors from "../constants/Colors"

import FoodListHeader from "../components/headers/FoodListHeader"
import SelectedHeader from "../components/headers/SelectedIngredientHeader"
import UpdateIngredientModal from "../components/contents/UpdateIngredientModal"
import { transferItemsFromFridgeToShoppingList, deleteItemsFromFridge } from "../store/api/user"

class Fridge extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false,
            selectedIngredients: [],
            requestTransfer: false,
            requestDelete: false,
            ingredientClicked: null,
            isIngredientModalVisible: false
        }
        this.emptySelected = this.emptySelected.bind(this)
        this.updateSelected = this.updateSelected.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.deleteSelectedIngredients = this.deleteSelectedIngredients.bind(this)
        this.transferItemsToShoppingList = this.transferItemsToShoppingList.bind(this)
    }

    static navigationOptions = {
        header: null
    }

    handlePress(item) {
        if(this.state.selected) {
            this._updateStateArray(item.ingredientID)
        } else {
            this.setState({ ingredientClicked: item })
            this.toggleModal()
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

    toggleModal() {
        this.setState({ isIngredientModalVisible: !this.state.isIngredientModalVisible })
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
        this.setState({ selected: false, selectedIngredients: [] })
    }

    updateSelected() {
        this.setState({
            selectedIngredients: this.props.ingredients.map(item => item.ingredientID)
        })
    }

    async transferItemsToShoppingList() {
        this.setState({ requestTransfer: true })
        await transferItemsFromFridgeToShoppingList(this.state.selectedIngredients)
        this.setState({ requestTransfer: false, selected: false, selectedIngredients: [] })
    }

    async deleteSelectedIngredients() {
        this.setState({ requestDelete: true })
        await deleteItemsFromFridge(this.state.selectedIngredients)
        this.setState({ requestDelete: false, selected: false, selectedIngredients: [] })
    }

    renderList() {
        return this.props.ingredients.map((item) => {
            const isSelected = this.state.selectedIngredients.includes(item.ingredientID)
            const title = isSelected ? null : item.ingredientName.charAt(0).toUpperCase()
            const icon = isSelected ? {name: 'check'} : null
            return (
                <ListItem
                    icon
                    avatar
                    key={item.ingredientID}
                    onPress={() => this.handlePress(item)}
                    onLongPress={() => this.handleLongPress(item.ingredientID)}
                >
                    <Left style={{height: 30}}>
                        <Avatar
                            size="small"
                            rounded
                            title={title}
                            icon={icon}
                            activeOpacity={0.7}
                            onPress={() => this.handleLongPress(item.ingredientID)}
                        />
                    </Left>
                    <Body>
                        <Text>{item.ingredientName.charAt(0).toUpperCase() + item.ingredientName.slice(1)}</Text>
                        {
                            item.expirationDate && (
                                <Text style={{ color: '#808080', fontSize: 12 }}>
                                    {"Périme le ".concat(moment(item.expirationDate).format('DD/MM/YYYY'))}
                                </Text>
                            )
                        }
                    </Body>
                </ListItem>
            )
        })
    }

    render() {
        let content
        if (this.props.ingredients === undefined) {
            content = (<Spinner color={Colors.tintColor} />)
        } else if (this.props.ingredients.length === 0) {
            content = (<Text style={{margin: 10, textAlign: 'center'}}>
                Votre frigidaire est vide, commencez dès maintenant à la compléter !</Text>)
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
                            selectedIngredients={this.props.ingredients ?
                                this.props.ingredients.filter(item => this.state.selectedIngredients.includes(item.ingredientID)) : null }
                        />) :
                    <FoodListHeader
                        navigation={this.props.navigation}
                        name={'Frigidaire'}
                        origin={'fridge'}
                        ingredients={this.props.ingredients}
                    />
                }
                <UpdateIngredientModal
                    isModalVisible={this.state.isIngredientModalVisible}
                    toggleModal={this.toggleModal}
                    ingredient={this.state.ingredientClicked}
                    origin={'fridge'} />
                <Content>{content}</Content>
            </Container>
        )
    }
}

Fridge.propTypes = {
    ingredients: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.generalReducer.fridge
    }
}

export default connect(mapStateToProps)(Fridge)
