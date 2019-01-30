import React from 'react'
import {Platform} from 'react-native'
import {Container, Content, Input, Button, Text, Header, Left, Icon, Body, Title, Form, Item, Label, DatePicker,
    Spinner } from 'native-base'
import moment from 'moment'

import GenericStyles from '../constants/Style'

import {upsertItemsToShoppingList, upsertItemsToFridge} from '../utils/api/user'

export default class ShoppingListScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            requestAdd: false,
            quantity: props.navigation.state.params.quantity,
            unit: props.navigation.state.params.unit,
            chosenDate: props.navigation.state.params.expirationDate
        }
        this._setDate = this._setDate.bind(this)
    }

    static navigationOptions = {
        header: null
    }

    _setDate(newDate) {
        this.setState({chosenDate: newDate})
    }

    async handlePress() {
        this.setState({requestAdd: true})
        const screen = this.props.navigation.state.params.origin === 'fridge' ? 'Fridge' : 'ShoppingList'
        if (screen === 'Fridge') {
            await upsertItemsToFridge({
                ingredient: this.props.navigation.state.params.ingredient,
                quantity: this.state.quantity,
                unit: this.state.unit,
                date: this.state.chosenDate
            })
        } else {
            await upsertItemsToShoppingList({
                ingredient: this.props.navigation.state.params.ingredient,
                quantity: this.state.quantity,
                unit: this.state.unit
            })
        }
        this.props.navigation.navigate(screen)
    }

    header() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={GenericStyles.headerLeft}>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                        />
                    </Button>
                </Left>
                <Body>
                <Title style={GenericStyles.headerTitle}>{
                    this.props.navigation.state.params.ingredient.charAt(0).toUpperCase() + this.props.navigation.state.params.ingredient.slice(1)
                }</Title>
                </Body>
            </Header>
        )
    }

    render() {
        return (
            <Container>
                {this.header()}
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Quantité</Label>
                            <Input
                                keyboardType={"numeric"}
                                onChangeText={(text) => this.setState({quantity: text})}
                                value={this.state.quantity}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Unité</Label>
                            <Input
                                onChangeText={(text) => this.setState({unit: text})}
                                value={this.state.unit}
                            />
                        </Item>
                        {
                            this.props.navigation.state.params.origin === 'fridge' &&
                            <Item stackedLabel>
                                <Label>Date de péremption</Label>
                                <DatePicker
                                    defaultDate={this.state.chosenDate ? this.state.chosenDate : new Date()}
                                    locale={"fr"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText={this.state.chosenDate ?
                                        moment(this.state.chosenDate).format('DD/MM/YYYY') : 'Sélectionner une date'}
                                    textStyle={{color: '#007aff'}}
                                    placeHolderTextStyle={{color: "#d3d3d3"}}
                                    onDateChange={this._setDate}
                                    disabled={false}
                                />
                            </Item>
                        }
                        {
                            this.state.requestAdd ? (<Spinner color='#007aff'/>)
                                : (
                                    <Button
                                        block
                                        light
                                        style={{margin: 5}}
                                        onPress={() => this.handlePress()}
                                    >
                                        <Text>Ajouter l&apos;ingrédient</Text>
                                    </Button>
                                )
                        }
                    </Form>
                </Content>
            </Container>
        )
    }
}
