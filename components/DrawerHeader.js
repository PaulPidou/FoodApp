import React from "react";
import {Button, Header, Icon, Left, Right, Title} from "native-base";

import GenericStyles from '../constants/Style'

export default class DrawerHeader extends React.Component {
    render() {
        return (
            <Header style={GenericStyles.header}>
                <Left>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.openDrawer()} >
                        <Icon
                            style={GenericStyles.icon}
                            name='menu'
                        />
                    </Button>
                </Left>

                <Right>
                    <Title style={{color: '#000'}}>
                        {this.props.name}
                    </Title>
                </Right>

            </Header>
        );
    }
}