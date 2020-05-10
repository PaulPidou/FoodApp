import React from "react"
import {ActivityIndicator, View} from 'react-native'
import Modal from 'react-native-modal'
import {Button, Form, Input, Item, Text} from "native-base"
import PropTypes from "prop-types"

import { addRecipe } from '../../store/api/user'
import Colors from "../../constants/Colors"

export default class AddRecipeFromUrlModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: '',
            requestOngoing: false,
            requestFailed: false,
            badUrl: false
        }
    }

    handleClose() {
        this.setState({ url: '', requestOngoing: false, requestFailed: false, badUrl: false })
        this.props.toggleModal()
    }

    async requestUrl() {
        this.setState({ requestFailed: false })
        if(!this.state.url.startsWith('https://www.marmiton.org/recettes/')) {
            this.setState({ badUrl: true })
            return
        }

        this.setState({ requestOngoing: true })
        const recipeID = await addRecipe(this.state.url)
        this.setState({ requestOngoing: false })

        if(recipeID) {
            this.handleClose()
            this.props.navigation.navigate('RecipeDetails', {recipeId: recipeID, origin: 'search'})
        } else {
            this.setState({ requestFailed: true })
        }
    }

    render() {
        return (
            <View>
                <Modal isVisible={this.props.isModalVisible} animationIn={'zoomIn'} animationOut={'fadeOut'} >
                    <View style={{backgroundColor: '#fff', margin: 10, padding: 15}}>
                        <Text style={{color: '#286064', fontSize: 20, fontWeight: '100', marginBottom: 10}}>
                            Ajouter une nouvelle recette depuis un URL
                        </Text>
                        <Form style={{marginTop: 15, marginBottom: 15}}>
                            <Item regular>
                                <Input
                                    placeholderTextColor={'#888'}
                                    placeholder={'https://www.marmiton.org/recettes/recette'}
                                    defaultValue={this.state.url}
                                    onChangeText={(url) => this.setState({ url: url, badUrl: false })}
                                    onSubmitEditing={() => this.requestUrl()}
                                />
                            </Item>
                        </Form>
                        {
                            this.state.badUrl && (<Text>BAD URL</Text>)
                        }
                        {
                            this.state.requestFailed && (<Text>REQUEST FAILED</Text>)
                        }
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Button transparent style={{width: 100}} onPress={() => this.handleClose()}>
                                <Text style={{fontSize: 14}}>Annuler</Text>
                            </Button>
                            {
                                this.state.requestOngoing ? (
                                    <ActivityIndicator size="small" color={Colors.tintColor} style={{width: 100}} />
                                ) : (
                                    <Button transparent style={{width: 100}} onPress={() => this.requestUrl()}>
                                        <Text style={{fontSize: 14}}>Ajouter</Text>
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

AddRecipeFromUrlModal.propTypes = {
    isModalVisible: PropTypes.bool,
    toggleModal: PropTypes.func
}