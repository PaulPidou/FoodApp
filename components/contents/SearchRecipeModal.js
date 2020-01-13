import React from "react"
import {View} from 'react-native'
import Modal from 'react-native-modal'
import {Button, Text} from "native-base"
import GenericStyles from "../../constants/Style"
import PropTypes from "prop-types"

export default class SearchRecipeModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: props.isModalVisible
        }
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    render() {
        return (
            <View>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{backgroundColor: '#fff', margin: 10, padding: 15}}>
                        <Text style={{color: '#286064', fontSize: 27, fontWeight: '100', marginBottom: 10}}>
                            Vous allez maintenant voir une liste de recettes suggérées</Text>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <View style={GenericStyles.commonIngredientsCircleModal}/>
                            <Text style={GenericStyles.modalText}>
                                Ce label indique le nombre d'ingrédients de la recette
                                <Text style={GenericStyles.modalTextBold}> déjà dans votre fridigdaire</Text>
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={GenericStyles.missingIngredientsCircleModal}/>
                            <Text style={GenericStyles.modalText}>
                                Ce label indique le nombre d'ingredients de la recette
                                <Text style={GenericStyles.modalTextBold}> manquants de votre frigidaire</Text>
                            </Text>
                        </View>
                        <Text
                            style={{color: '#888', fontSize: 20, fontWeight: '100', marginTop: 10}}
                        >Quand vous sauvegardez une recette les ingrédients manquants sont automatiquement ajoutés à votre liste de courses</Text>
                        <Button transparent style={{width: 60, alignSelf: 'flex-end'}} onPress={this.toggleModal}>
                            <Text style={{fontSize: 16}}>Ok</Text>
                        </Button>
                    </View>
                </Modal>
            </View>
        )
    }
}

SearchRecipeModal.propTypes = {
    isModalVisible: PropTypes.bool
}