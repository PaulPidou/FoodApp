import React from "react";
import { Header, Left, Button, Icon, Item, Input, Right } from 'native-base';

import GenericStyles from '../constants/Style'
import {getRecipeFromKeywords} from '../api_calls/public'

export default class SearchHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: '',
            recipes: [],
            error: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            keywords: e.nativeEvent.text
        });
    }

    async handleSubmit() {
        this.state.recipes = await getRecipeFromKeywords(this.state.keywords)
        this.props.callback(this.state.recipes)
    }

    render() {
        return (
            <Header searchBar style={GenericStyles.header}>
                <Left style={GenericStyles.headerLeft}>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.openDrawer()} >
                        <Icon
                            style={GenericStyles.icon}
                            name='menu'
                        />
                    </Button>
                </Left>
                <Item rounded>
                    <Input
                        placeholder={this.props.placeholder}
                        onChange={this.handleChange}
                    />
                    <Icon
                        active
                        name={this.props.icon}
                        style={GenericStyles.icon}
                        onPress = {this.handleSubmit}
                    />
                </Item>
            </Header>
        );
    }
}