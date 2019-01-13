import React from 'react';
import {Platform, ScrollView, Text, Alert} from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Spinner, ActionSheet} from 'native-base';
import {Avatar} from "react-native-elements";

import GenericStyles from "../constants/Style";
import FoodListHeader from "../components/FoodListHeader";
import {getShoppingList} from "../api_calls/user";

export default class ShoppingListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.actionSheet = null;
        this.state = {
            selected: false,
            selectedIngredients: [],
            shoppingMode: false,
            checkedIngredients: [],
            ingredients: null
        };
    }

    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        this._asyncRequest = getShoppingList().then(
            ingredients => {
                this._asyncRequest = null;
                this.setState({ingredients});
            });
    }

    handlePress(item) {
        if(this.state.selected) {
            this._updateStateArray(item._id, 'selectedIngredients')
        } else {
            this.props.navigation.navigate('AddIngredient', {ingredient: item.ingredientName, origin: 'shoppinglist',
                quantity: item.quantity ? item.quantity.toString() : null, unit: item.unit ? item.unit.toString() : null})
        }
    }

    handleLongPress(itemID) {
        if(this.state.selected) {
            this._updateStateArray(itemID, 'selectedIngredients')
        } else {
            this.setState({
                selected: true,
                selectedIngredients: [itemID]
            })
        }
    }

    startShopping = () => { this.setState({ shoppingMode: true }) }

    _updateStateArray(itemID, arrayName) {
        const isSelected = this.state[arrayName].includes(itemID)
        const newArray = isSelected
            ? this.state[arrayName].filter(id => id !== itemID) : [...this.state[arrayName], itemID]
        if(arrayName === 'selectedIngredients') {
            this.setState({
                selected: newArray.length > 0,
                [arrayName]: newArray
            })
        } else {
            this.setState({ [arrayName]: newArray })
        }
    }

    selectedHeader() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={{flex: 1, flexDirection: 'row'}}>
                    <Button transparent
                        onPress={() => this.setState({selected: false, selectedIngredients: []})}
                        style={{flex: 0}}
                    >
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
                        />
                    </Button>
                    <Button transparent
                        onPress={() => this.setState({selectedIngredients: this.state.ingredients.map(item => item._id)})}
                        style={{flex: 0}}
                    >
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-filing' : 'md-filing'}
                        />
                    </Button>
                </Left>
                <Right>
                    <Button transparent>
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-egg' : 'md-egg'}
                        />
                    </Button>
                    <Button transparent>
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'}
                        />
                    </Button>
                    <Button
                        transparent
                        onPress={() => {
                            Alert.alert(
                                'Confirmation',
                                'Confirmez vous la suppression ?',
                                [
                                    {text: 'Annuler', style: 'cancel'},
                                    {text: 'Oui', onPress: () => console.log('OK Pressed')},
                                ]
                            )}}
                    >
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                        />
                    </Button>
                </Right>
            </Header>
        )
    }

    shoppingHeader() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={{flex: 1, flexDirection: 'row'}}>
                    <Button transparent
                            onPress={() => this.setState({shoppingMode: false, checkedIngredients: []})}
                            style={{flex: 0}}
                    >
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
                        />
                    </Button>
                </Left>
                <Right>
                    <Button
                        transparent
                        onPress={() => this.showActionSheet()}

                    >
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-flag' : 'md-flag'}
                        />
                    </Button>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.navigate('SearchIngredient', {origin: 'shoppinglist'})} >
                        <Icon
                            style={GenericStyles.icon}
                            name='add'
                        />
                    </Button>
                </Right>
            </Header>
        )
    }

    showActionSheet() {
        if ( this.actionSheet !== null ) {
            this.actionSheet._root.showActionSheet({
                title: "Que voulez-vous faire ?",
                options: [
                    "Transférer les ingrédients dans le frigidaire",
                    "Supprimer les ingrédients de la liste de courses",
                    "Garder les ingrédients dans la liste de courses",
                    "Annuler"
                ],
                cancelButtonIndex: 3
            }, (i) => console.log(i));
        }
    }

    renderList() {
        return this.state.ingredients.map((item) => {
            const isSelected = this.state.selectedIngredients.includes(item._id)
            const title = isSelected ? null : item.ingredientName.charAt(0).toUpperCase()
            const icon = isSelected ? {name: 'check'} : null

            const isChecked = this.state.checkedIngredients.includes(item._id)
            const iconLeft = isChecked ? (Platform.OS === 'ios' ? 'ios-checkbox-outline' : 'md-checkbox-outline') :
                (Platform.OS === 'ios' ? 'ios-square-outline' : 'md-square-outline')
            return (
                <ListItem
                    icon
                    avatar
                    key={item._id}
                    onPress={() => this.handlePress(item)}
                    onLongPress={() => this.handleLongPress(item._id)}
                >
                    <Left style={{height: 30}}>
                        {
                            this.state.shoppingMode ? (
                                <Button
                                    transparent
                                    onPress={() => {this._updateStateArray(item._id, 'checkedIngredients')}}
                                >
                                    <Icon name={iconLeft} />
                                </Button>) : (
                                    <Avatar
                                        size="small"
                                        rounded
                                        title={title}
                                        icon={icon}
                                        activeOpacity={0.7}
                                        onPress={() => this.handleLongPress(item._id)}
                                    />)
                        }
                    </Left>
                    <Body>
                    <Text
                        style={isChecked && {textDecorationLine: 'line-through'}}
                    >{item.ingredientName.charAt(0).toUpperCase() + item.ingredientName.slice(1)}
                        {(item.quantity || item.unit) && ': '}
                        {item.quantity} {item.unit}</Text>
                    </Body>
                </ListItem>
            );
        });
    }

    render() {
        let header;
        let content;

        if(this.state.selected) {
            header = this.selectedHeader()
        } else if(this.state.shoppingMode) {
            header = this.shoppingHeader()
        } else {
            header = (
                <FoodListHeader
                    navigation={this.props.navigation}
                    name={'Liste de courses'}
                    origin={'shoppinglist'}
                    startShopping={this.startShopping}
                />
            )
        }

        if (this.state.ingredients === null) {
            content = (<Spinner color='#007aff' />)
        } else if (this.state.ingredients.length === 0) {
            content = (<Text>Votre liste de courses est vide, commencez dès maintenant à la compléter !</Text>)
        } else {
            content = (<ScrollView><List>{this.renderList()}</List></ScrollView>)
        }
        return (
            <Container>
                {header}
                <Content>
                    {content}
                    <ActionSheet ref={(c) => { this.actionSheet = c; }} />
                    </Content>
            </Container>
        )
    }
}
