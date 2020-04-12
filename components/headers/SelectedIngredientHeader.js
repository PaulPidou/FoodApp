import React from "react"
import {ActivityIndicator} from "react-native"
import { Left, Right, Header, Button } from "native-base"
import PropTypes from 'prop-types'

import SelectionButton from "../common/SelectionButton"
import DeleteButton from "../common/DeleteButton"
import HeaderActionButton from "../common/HeaderActionButton"
import GenericStyles from "../../constants/Style"

export default class SelectedIngredientHeader extends React.Component {
    render() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={{flex: 1, flexDirection: 'row'}}>
                    <SelectionButton
                        onPress={() => this.props.emptySelected()}
                        isSelector={false}
                    />
                    <SelectionButton
                        onPress={() => this.props.updateSelected()}
                        isSelector={true}
                    />
                </Left>
                <Right>
                    {
                        this.props.requestTransfer ? (
                            <Button transparent>
                                <ActivityIndicator size="small" color='#fff' />
                            </Button>
                        ) : (
                        this.props.origin === 'shoppinglist' && (
                            <HeaderActionButton
                                actionFunction={() => this.props.transferItemsToFridge()}
                                icon={'egg'}
                            />))
                    }
                    {
                        this.props.origin === 'fridge' && (
                            <HeaderActionButton
                                actionFunction={() => this.props.navigation.navigate('SearchRecipe',
                                    {ingredients: this.props.selectedIngredients})}
                                icon={'bookmarks'}
                            />)
                    }
                    {
                        this.props.requestDelete ? (
                            <Button transparent>
                                <ActivityIndicator size="small" color='#fff' />
                            </Button>
                        ) : (
                            <DeleteButton
                                onPress={() => this.props.deleteSelectedIngredients()}
                                message={'Confirmez vous la suppression ?'}
                                icon={'trash'}
                            />
                        )
                    }
                </Right>
            </Header>
        )
    }
}

SelectedIngredientHeader.propTypes = {
    requestTransfer: PropTypes.bool,
    requestDelete: PropTypes.bool,
    origin: PropTypes.string,
    emptySelected: PropTypes.func,
    updateSelected: PropTypes.func,
    transferItemsToFridge: PropTypes.func,
    transferItemsToShoppingList: PropTypes.func,
    deleteSelectedIngredients: PropTypes.func,
    selectedIngredients: PropTypes.array
}