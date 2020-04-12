import React from "react"
import {ActivityIndicator, Alert} from "react-native"
import {Left, Right, Header, Button} from "native-base"
import PropTypes from "prop-types"

import SelectionButton from "../common/SelectionButton"
import DeleteButton from "../common/DeleteButton"
import HeaderActionButton from "../common/HeaderActionButton"
import GenericStyles from "../../constants/Style"
import Colors from "../../constants/Colors"

export default class SelectedRecipeHeader extends React.Component {
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
                        this.props.requestCook ? (
                            <Button
                                key={'color-fill'}
                                transparent>
                                <ActivityIndicator size="small" color={Colors.counterTintColor}/>
                            </Button>
                        ) : (
                            <HeaderActionButton
                                actionFunction={() => Alert.alert('Recette cusinée',
                                    'Retirer '.concat(this.props.message, ' et les ingrédients associés de vos listes ?'),
                                    [
                                        {text: 'Annuler', style: 'cancel'},
                                        {text: 'Oui', onPress: () => this.props.cookSelectedRecipes()}
                                    ])}
                                icon={'color-fill'}
                            />)
                    }
                    {
                        this.props.requestDelete ? (
                            <Button transparent>
                                <ActivityIndicator size="small" color={Colors.counterTintColor} />
                            </Button>
                        ) : (
                            <DeleteButton
                                onPress={() => this.props.deleteSelectedRecipes()}
                                message={'Retirer '.concat(this.props.message, ' des recettes sauvegardées ?')}
                                icon={'heart'}
                            />)
                    }
                </Right>
            </Header>
        )
    }
}

SelectedRecipeHeader.propTypes = {
    emptySelected: PropTypes.func,
    updateSelected: PropTypes.func,
    cookSelectedRecipes: PropTypes.func,
    deleteSelectedRecipes: PropTypes.func,
    requestCook: PropTypes.bool,
    requestDelete: PropTypes.bool,
    message: PropTypes.string
}