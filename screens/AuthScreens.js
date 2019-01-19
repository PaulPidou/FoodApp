import React from 'react'
import {AsyncStorage, Platform} from 'react-native'
import {Container, Content, Header, Button, Icon, Text, Form, Item, Input, Left, Title, Body} from 'native-base'
import GenericStyles from "../constants/Style"


export class LogInScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }

    _logInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc')
        this.props.navigation.navigate('App')
    }

    render() {
        return (
            <Container>
                <Header style={GenericStyles.header}>
                    <Left style={GenericStyles.headerLeft} />
                    <Body>
                    <Title style={GenericStyles.headerTitle}>Se connecter</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Item>
                            <Input
                                placeholder="Email"
                                keyboardType={"email-address"}
                            />
                        </Item>
                        <Item last>
                            <Input
                                placeholder="Mot de passe"
                                secureTextEntry={true}
                            />
                        </Item>
                    </Form>
                    <Button
                        block
                        style={GenericStyles.formBlockButton}
                        onPress={() => this._logInAsync()}>
                        <Icon
                            name={Platform.OS === 'ios' ? 'ios-log-in' : 'md-log-in'}
                        />
                        <Text>Me connecter</Text>
                    </Button>
                    <Button
                        block
                        style={GenericStyles.formBlockButton}
                        onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Icon
                            name={Platform.OS === 'ios' ? 'ios-rocket' : 'md-rocket'}
                        />
                        <Text>Me créer un compte</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

export class SignUpScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }

    _logInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc')
        this.props.navigation.navigate('App')
    }

    render() {
        return (
            <Container>
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
                    <Title style={GenericStyles.headerTitle}>S&apos;enregistrer</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Item>
                            <Input
                                placeholder="Email"
                                keyboardType={"email-address"}
                            />
                        </Item>
                        <Item>
                            <Input
                                placeholder="Mot de passe"
                                secureTextEntry={true}
                            />
                        </Item>
                        <Item last>
                            <Input
                                placeholder="Confirmer le mot de passe"
                                secureTextEntry={true}
                            />
                        </Item>
                    </Form>
                    <Button
                        block
                        style={GenericStyles.formBlockButton}
                        onPress={() => this._logInAsync()}>
                        <Icon
                            name={Platform.OS === 'ios' ? 'ios-rocket' : 'md-rocket'}
                        />
                        <Text>Créer mon compte</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}
