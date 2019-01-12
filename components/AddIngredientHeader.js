import React from "react";
import {Platform} from "react-native";
import {Button, Header, Icon, Left, Right, Title, Text} from "native-base";

import GenericStyles from '../constants/Style'

export default class AddIngredientHeader extends React.Component {
    render() {
        return (
            <Header style={GenericStyles.header}>
                <Left style={{flex: 1}}>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()} >
                        <Icon
                            style={GenericStyles.icon}
                            name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                        />
                        <Text style={GenericStyles.headerButton}>Retour</Text>
                    </Button>
                </Left>

                <Right style={{flex: 1}}>
                    <Title style={GenericStyles.headerTitle}>
                        {this.props.name}
                    </Title>
                </Right>

            </Header>
        );
    }
}