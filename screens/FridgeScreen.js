import React from 'react'
import {Container, Content, Spinner, Text} from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Colors from "../constants/Colors"

import FoodListHeader from "../components/headers/FoodListHeader"
import SelectedHeader from "../components/headers/SelectedIngredientHeader"
import UpdateIngredientModal from "../components/contents/UpdateIngredientModal"
import { transferItemsFromFridgeToShoppingList, deleteItemsFromFridge } from "../store/api/user"
import IngredientsList from "../components/contents/IngredientsList"

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
        this.handlePress = this.handlePress.bind(this)
        this.handleLongPress = this.handleLongPress.bind(this)
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

    render() {
        let content
        if (this.props.ingredients === undefined) {
            content = (<Spinner color={Colors.tintColor} />)
        } else if (this.props.ingredients.length === 0) {
            content = (<Text style={{margin: 10, textAlign: 'center'}}>
                Votre frigidaire est vide, commencez dès maintenant à la compléter !</Text>)
        } else {
            content = (
                <IngredientsList
                    handlePress={this.handlePress}
                    handleLongPress={this.handleLongPress}
                    ingredients={this.props.ingredients}
                    selectedIngredients={this.state.selectedIngredients}
                />)
        }
        return (
            <Container>
                {this.state.selected ? (
                        <SelectedHeader
                            navigation={this.props.navigation}
                            requestTransfer={this.state.requestTransfer}
                            requestDelete={this.state.requestDelete}
                            origin={'fridge'}
                            emptySelected={() => this.emptySelected()}
                            updateSelected={() => this.updateSelected()}
                            transferItemsToShoppingList={() => this.transferItemsToShoppingList()}
                            deleteSelectedIngredients={() => this.deleteSelectedIngredients()}
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
                    toggleModal={() => this.toggleModal()}
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
