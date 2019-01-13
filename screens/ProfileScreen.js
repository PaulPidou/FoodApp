import React from 'react';
import { Text } from 'react-native';
import {Body, Button, Container, Content, Header, Icon, Left, Title} from 'native-base';

import GenericStyles from "../constants/Style";

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <Container>
                <Header style={GenericStyles.header}>
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
                    <Body>
                        <Title style={GenericStyles.headerTitle}>{'Profil'}</Title>
                    </Body>
                </Header>
                <Content>
                    <Text>Profile</Text>
                </Content>
            </Container>
        );
    }
}
