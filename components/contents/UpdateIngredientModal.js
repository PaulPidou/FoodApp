import React from "react"
import {ActivityIndicator, Platform, ScrollView, View, Linking} from 'react-native'
import Modal from 'react-native-modal'
import {Button, Form, Text, DatePicker, List, ListItem, Left, Body, Right, Icon, Thumbnail} from "native-base"
import { Badge } from 'react-native-elements'
import moment from "moment"
import PropTypes from "prop-types"
import { updateFridgeItem, updateShoppingListItem } from '../../store/api/user'
import Colors from "../../constants/Colors"

export default class UpdateIngredientModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chosenDate: null,
            chosenProduct: null,
            associatedProduct: this._getAssociatedProductID(), // Wrong way to do it, should be a props !
            requestUpdate: false
        }
        this.setDate = this.setDate.bind(this)
    }

    _getAssociatedProductID() {
        if(this.props.ingredient) {
            if(this.props.ingredient.hasOwnProperty('associatedProduct')) {
                if(this.props.ingredient.associatedProduct.hasOwnProperty('productID')) {
                    return this.props.ingredient.associatedProduct.productID
                }
            }
        }
        return undefined
    }

    handleClose() {
        this.setState({ chosenDate: null, chosenProduct: null })
        this.props.toggleModal()
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate })
    }

    setProduct(product) {
        if(product._id === this.state.associatedProduct) {
            this.setState({ chosenProduct: null, associatedProduct: undefined })
        } else {
            this.setState({
                chosenProduct: {
                    productID: product._id,
                    name: product.name,
                    brand: product.brand,
                    nutriscore: product.nutriscore
                }, associatedProduct: product._id
            })
        }
    }

    updateIngredient() {
        this.setState({ requestUpdate: true })
        if(this.props.origin === 'fridge') {
            if (this.state.chosenDate) {
                const item = {
                    ...this.props.ingredient,
                    expirationDate: this.state.chosenDate
                }
                updateFridgeItem(item)
            }
        } else {
            const item = {
                ...this.props.ingredient,
                associatedProduct: this.state.chosenProduct
            }
            updateShoppingListItem(item)
        }
        this.handleClose()
        this.setState({ requestUpdate: false })
    }

    renderProductList() {
        return this.props.products.map((item) => {
            return (
                <ListItem
                    thumbnail
                    key={item._id}
                    onPress={() => this.setProduct(item)}
                >
                    <Left>
                        <View>
                            <Thumbnail small source={ item.picture ? ({ uri:  item.picture}) :
                                require('../../assets/images/icon_large.png') } />
                            {
                                item.nutriscore && (
                                    <Badge
                                        containerStyle={{
                                            backgroundColor: Colors.getNutriscoreColor(item.nutriscore),
                                            position: 'absolute', top: -15, right: -10 }}>
                                        <Text
                                            style={{color: "#fff", fontWeight: 'bold', fontSize: 14}}
                                        >{item.nutriscore.toUpperCase()}</Text>
                                    </Badge>)
                            }
                        </View>
                    </Left>
                    <Body>
                        <Text>
                            {item.name} { item._id === this.state.associatedProduct && (
                                <Icon
                                    style={{fontSize: 18, color: Colors.tintColor}}
                                    name={Platform.OS === 'ios' ? 'ios-checkmark-circle-outline' : 'md-checkmark-circle-outline'}
                                />)
                            }
                        </Text>

                        <Text style={{ color: '#808080', fontSize: 12 }}>{item.brand}</Text>
                    </Body>
                    <Right>
                        <Button transparent
                                onPress={() => Linking.openURL(item.OFFUrl)}
                        >
                            <Icon
                                style={{color: '#aaa'}}
                                name={Platform.OS === 'ios' ? 'ios-information-circle-outline' : 'md-information-circle-outline'}
                            />
                        </Button>
                    </Right>
                </ListItem>
            )
        })
    }

    render() {
        const ingredient = this.props.ingredient
        if (!ingredient) { return null }
        return (
            <View>
                <Modal isVisible={this.props.isModalVisible} animationIn={'zoomIn'} animationOut={'fadeOut'} >
                    <View style={{backgroundColor: '#fff', margin: 10, padding: 15, maxHeight: 500}}>
                        <Text style={{color: '#286064', fontSize: 27, fontWeight: '100', marginBottom: 10}}>
                            {ingredient &&
                            ingredient.ingredientName.charAt(0).toUpperCase() + ingredient.ingredientName.slice(1)}
                        </Text>
                        {
                            this.props.origin === 'fridge' ? (
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
                                </Form>) : (
                                    this.props.products === undefined ? (
                                        <ActivityIndicator color={Colors.tintColor} />) :
                                        this.props.products.length ? (
                                            <ScrollView><List>{this.renderProductList()}</List></ScrollView>) :
                                            (<Text>Il n'y a pas de produit référencé pour cet ingrédient</Text>)
                            )
                        }

                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Button transparent style={{width: 100}} onPress={() => this.handleClose()}>
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

UpdateIngredientModal.propTypes = {
    isModalVisible: PropTypes.bool,
    toggleModal: PropTypes.func,
    ingredient: PropTypes.object,
    products: PropTypes.array,
    origin: PropTypes.string
}