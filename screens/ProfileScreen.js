import React from 'react'
import { Text } from 'react-native'
import {Body, Container, Content, Header, Left, Title} from 'native-base'

import MenuButton from "../components/common/MenuButton"
import GenericStyles from "../constants/Style"

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <Container>
                <Header style={GenericStyles.header}>
                    <Left style={GenericStyles.headerLeft}>
                        <MenuButton
                            navigation={this.props.navigation}
                        />
                    </Left>
                    <Body>
                        <Title style={GenericStyles.headerTitle}>{'Profil'}</Title>
                    </Body>
                </Header>
                <Content>
                    <Text>Profile</Text>
                </Content>
            </Container>
        )
    }
}
