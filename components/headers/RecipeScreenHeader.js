import React from "react"
import {ActivityIndicator, Alert} from "react-native"
import {Button, Header, Left, Right} from 'native-base'
import PropTypes from 'prop-types'

import HeaderActionButton from "../common/HeaderActionButton"
import BackButton from "../common/BackButton"
import DeleteButton from "../common/DeleteButton"

import GenericStyles from '../../constants/Style'
import Colors from "../../constants/Colors"

export default class RecipeScreenHeader extends React.Component {
    render() {
        return (
            <Header
                style={GenericStyles.header}
                hasTabs>
                <Left style={GenericStyles.headerLeft}>
                    <BackButton
                        navigation={this.props.navigation}
                    />
                </Left>
                <Right>
                    {
                        this.props.recipeId && this.props.isSaved ? ([
                            this.props.requestCook ? (
                                <Button
                                    key={'color-fill'}
                                    transparent>
                                    <ActivityIndicator size="small" color={Colors.counterTintColor}/>
                                </Button>
                            ) : (
                                <HeaderActionButton
                                    key={'color-fill'}
                                    actionFunction={() => Alert.alert('Recette cusinée',
                                        'Retirer la recette et ses ingrédients de vos listes ?',
                                        [
                                            {text: 'Annuler', style: 'cancel'},
                                            {text: 'Oui', onPress: () => this.props.cookRecipe()}
                                        ]
                                    )}
                                    icon={'color-fill'}
                                />),
                            this.props.requestDelete ? (
                                <Button
                                    key={'trash'}
                                    transparent>
                                    <ActivityIndicator size="small" color={Colors.counterTintColor}/>
                                </Button>
                            ) : (
                                <DeleteButton
                                    key={'trash'}
                                    onPress={() => this.props.deleteRecipe()}
                                    message={'Retirer la recette des recettes sauvegardées ?'}
                                    icon={'heart'}
                                />)
                        ]) : (
                            this.props.requestSave || (this.props.isSaved === undefined) ? (
                                <Button transparent>
                                    <ActivityIndicator size="small" color={Colors.counterTintColor}/>
                                </Button>
                            ) : (
                                <HeaderActionButton
                                    actionFunction={() => this.props.saveRecipe()}
                                    icon={'heart-empty'}
                                />))
                    }
                </Right>
            </Header>)
    }
}

RecipeScreenHeader.propTypes = {
    recipeId: PropTypes.string,
    isSaved: PropTypes.bool,
    requestCook: PropTypes.bool,
    cookRecipe: PropTypes.func,
    requestDelete: PropTypes.bool,
    deleteRecipe: PropTypes.func,
    requestSave: PropTypes.bool,
    saveRecipe: PropTypes.func
}