import React from 'react';
import {Container, Content, Input, Button, Text, Header, Left, Icon, Body, Title, Form, Item, Label, DatePicker} from 'native-base';
import moment from 'moment';

import GenericStyles from '../constants/Style'
import {Platform} from "react-native";

export default class ShoppingListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: props.navigation.state.params.quantity,
            unit: props.navigation.state.params.unit,
            chosenDate: props.navigation.state.params.expirationDate
        };
        this._setDate = this._setDate.bind(this);
    }

    static navigationOptions = {
        header: null
    }

    _setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    _handlePress() {
        console.log(this.state)
        const screen = this.props.navigation.state.params.origin === 'fridge' ? 'Fridge' : 'ShoppingList'
        this.props.navigation.navigate(screen)
    }

    header(props) {
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
                    props.navigation.state.params.ingredient.charAt(0).toUpperCase() + props.navigation.state.params.ingredient.slice(1)
                }</Title>
                </Body>
            </Header>
        );
    }

    render() {
        return (
            <Container>
                {this.header(this.props)}
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Quantité</Label>
                            <Input
                                keyboardType={"numeric"}
                                onChangeText={(text) => this.setState({quantity:text})}
                                value={this.state.quantity}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Unité</Label>
                            <Input
                                onChangeText={(text) => this.setState({unit:text})}
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
                                        textStyle={{ color: '#007aff' }}
                                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                                        onDateChange={this._setDate}
                                        disabled={false}
                                    />
                                </Item>
                        }
                        <Button
                            block
                            light
                            style={{margin: 5}}
                            onPress={() => this._handlePress()}
                        >
                            <Text>Ajouter l'ingrédient</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}
