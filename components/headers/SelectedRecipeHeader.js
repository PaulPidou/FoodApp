import React from "react"
import PropTypes from "prop-types"
import {Left, Right, Header, Button, Icon} from "native-base"

import {ActivityIndicator, Alert, Platform} from "react-native"
import GenericStyles from "../../constants/Style"

export default class SelectedRecipeHeader extends React.Component {
    render() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={GenericStyles.headerLeft}>
                    <Button
                        transparent
                        onPress={() => this.props.emptySelected()}
                    >
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
                        />
                    </Button>
                </Left>
                {
                    this.props.origin === 'home' ?
                        (<Right>
                            {
                                this.props.requestAddToCart ? (
                                    <Button transparent>
                                        <ActivityIndicator size="small" color='#007aff'/>
                                    </Button>
                                ) : (
                                    <Button
                                        transparent
                                        onPress={() => this.props.addIngredientsToCart()}>
                                        <Icon
                                            style={GenericStyles.icon}
                                            name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                                        />
                                    </Button>)
                            }
                            {
                                this.props.requestDeleteRecipe ? (
                                        <Button transparent>
                                            <ActivityIndicator size="small" color='#007aff'/>
                                        </Button>
                                    ) :
                                    (<Button
                                        transparent
                                        onPress={() => {
                                            Alert.alert(
                                                'Confirmation',
                                                'Confirmez vous la suppression ?',
                                                [
                                                    {text: 'Annuler', style: 'cancel'},
                                                    {text: 'Oui', onPress: () => this.props.deleteSelectedRecipes()},
                                                ]
                                            )
                                        }}
                                    >
                                        <Icon
                                            style={GenericStyles.icon}
                                            name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                                        />
                                    </Button>)
                            }
                        </Right>) :
                        (<Right>
                            <Button
                                transparent
                                onPress={() => this.props.saveSelectedRecipes()}>
                                <Icon
                                    style={GenericStyles.icon}
                                    name={Platform.OS === 'ios' ? 'ios-save' : 'md-save'}
                                />
                            </Button>
                        </Right>)
                }
            </Header>
        )
    }
}

SelectedRecipeHeader.propTypes = {
    requestAddToCart: PropTypes.bool,
    requestDeleteRecipe: PropTypes.bool,
    origin: PropTypes.string,
    emptySelected: PropTypes.func,
    addIngredientsToCart: PropTypes.func,
    deleteSelectedRecipes: PropTypes.func,
    saveSelectedRecipes: PropTypes.func
}