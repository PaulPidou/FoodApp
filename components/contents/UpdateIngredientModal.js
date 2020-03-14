import React from "react"
import {ActivityIndicator, View} from 'react-native'
import Modal from 'react-native-modal'
import {Button, Form, Text, DatePicker} from "native-base"
import PropTypes from "prop-types"
import Colors from "../../constants/Colors"
import { updateFridgeItem } from '../../store/api/user'
import moment from "moment"

export default class SearchRecipeModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            origin: props.origin,
            chosenDate: null,
            requestUpdate: false
        }
        this.setDate = this.setDate.bind(this)
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate })
    }

    updateIngredient() {
        this.setState({ requestUpdate: true })
        if(this.state.chosenDate) {
            const item = {
                ...this.props.ingredient,
                expirationDate: this.state.chosenDate
            }
            updateFridgeItem(item)
        }
        this.props.toggleModal()
        this.setState({ requestUpdate: false })
    }

    render() {
        const ingredient = this.props.ingredient
        if (!ingredient) { return null }
        return (
            <View>
                <Modal isVisible={this.props.isModalVisible} animationIn={'zoomIn'} animationOut={'fadeOut'} >
                    <View style={{backgroundColor: '#fff', margin: 10, padding: 15}}>
                        <Text style={{color: '#286064', fontSize: 27, fontWeight: '100', marginBottom: 10}}>
                            {ingredient &&
                            ingredient.ingredientName.charAt(0).toUpperCase() + ingredient.ingredientName.slice(1)}
                        </Text>
                        <Form>
                            <Text style={{color: '#888', fontSize: 22}}>
                                Date de péremption</Text>
                                <DatePicker
                                    locale={"fr"}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText={ ingredient.hasOwnProperty('expirationDate') ?
                                        moment(ingredient.expirationDate).format('DD/MM/YYYY') :
                                        "Choisissez une date" }
                                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                                    onDateChange={this.setDate}
                                    disabled={false}
                                />
                        </Form>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Button transparent style={{width: 100}} onPress={() => this.props.toggleModal()}>
                                <Text style={{fontSize: 14}}>Annuler</Text>
                            </Button>
                            {
                                this.state.requestUpdate ? (
                                    <ActivityIndicator size="small" color={Colors.tintColor} style={{width: 140}} />
                                ) : (
                                    <Button transparent style={{width: 140}} onPress={() => this.updateIngredient()}>
                                        <Text style={{fontSize: 14}}>Sauvegarder</Text>
                                    </Button>
                                )
                            }
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

SearchRecipeModal.propTypes = {
    isModalVisible: PropTypes.bool,
    toggleModal: PropTypes.func,
    ingredient: PropTypes.object,
    origin: PropTypes.string
}