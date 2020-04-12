import React from "react"
import {ActivityIndicator, Alert, Platform} from "react-native"
import {Left, Right, Header, Button, Icon} from "native-base"
import {NetworkConsumer} from "react-native-offline"
import PropTypes from "prop-types"

import SelectionButton from "../common/SelectionButton"
import GenericStyles from "../../constants/Style"
import Colors from "../../constants/Colors"
import DeleteButton from "../common/DeleteButton"

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
                            <NetworkConsumer>
                                {({ isConnected }) => (
                                    <Button
                                        key={'color-fill'}
                                        transparent
                                        onPress={() => {
                                            isConnected ? Alert.alert(
                                                'Recette cusinée',
                                                'Retirer '.concat(this.props.message, ' et les ingrédients associés de vos listes ?'),
                                                [
                                                    {text: 'Annuler', style: 'cancel'},
                                                    {text: 'Oui', onPress: () => this.props.cookSelectedRecipes()}
                                                ]) : Alert.alert(
                                                'Serveur hors ligne',
                                                'Vous ne pouvez pas effectuer cette action',
                                            )
                                        }}>
                                        <Icon
                                            style={GenericStyles.headerIcon}
                                            name={Platform.OS === 'ios' ? 'ios-color-fill' : 'md-color-fill'}
                                        />
                                    </Button>)}
                            </NetworkConsumer>
                        )
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