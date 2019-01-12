import React from 'react';
import { Text } from 'react-native';
import { Container, Header, Content } from 'native-base';

import DrawerHeader from '../components/DrawerHeader'

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <Container>
                <DrawerHeader
                    navigation={this.props.navigation}
                    name={'Paramètres'}
                />
                <Content>
                    <Text>Settings</Text>
                </Content>
            </Container>
        );
    }
}