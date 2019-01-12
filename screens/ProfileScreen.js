import React from 'react';
import { Text } from 'react-native';
import { Container, Content } from 'native-base';

import DrawerHeader from '../components/DrawerHeader'

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <Container>
                <DrawerHeader
                    navigation={this.props.navigation}
                    name={'Profil'}
                />
                <Content>
                    <Text>Profile</Text>
                </Content>
            </Container>
        );
    }
}
