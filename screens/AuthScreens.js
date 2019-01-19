import React from 'react'
import {AsyncStorage, Platform, Keyboard} from 'react-native'
import {Root, Container, Content, Header, Button, Icon, Text, Form, Item, Input, Left, Title, Body, Toast} from 'native-base'
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
                                returnKeyType = { "next" }
                                onSubmitEditing={() => { this.password._root.focus() }}
                                blurOnSubmit={false}
                            />
                        </Item>
                        <Item last>
                            <Input
                                ref={input => { this.password = input }}
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
    constructor(props) {
        super(props)
        this.secondTextInput = null
        this.state = {
            email: null,
            password: null,
            confirmPassword: null,
        }
    }

    static navigationOptions = {
        header: null,
    }

    handleSignUp = async () => {
        Keyboard.dismiss()
        if(!this.state.email || !this.state.password || !this.state.confirmPassword) {
            Toast.show({
                text: 'Veuillez renseigner les différents champs !',
                duration: 3000,
                textStyle: { textAlign: 'center' }
            })
        } else if(this.state.password === this.state.confirmPassword) {
            await AsyncStorage.setItem('userToken', 'abc')
            this.props.navigation.navigate('App')
        } else {
            Toast.show({
                text: 'Les deux mots de passe ne sont identiques !',
                duration: 3000,
                textStyle: { textAlign: 'center' }
            })
        }
    }

    render() {
        return (
            <Root>
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
                                    returnKeyType = { "next" }
                                    onChangeText={(text) => this.setState({email: text})}
                                    onSubmitEditing={() => { this.password._root.focus() }}
                                    blurOnSubmit={false}
                                />
                            </Item>
                            <Item>
                                <Input
                                    ref={input => { this.password = input }}
                                    placeholder="Mot de passe"
                                    secureTextEntry={true}
                                    returnKeyType = { "next" }
                                    onChangeText={(text) => this.setState({password: text})}
                                    onSubmitEditing={() => { this.confirmPassword._root.focus() }}
                                    blurOnSubmit={false}
                                />
                            </Item>
                            <Item last>
                                <Input
                                    ref={input => { this.confirmPassword = input }}
                                    placeholder="Confirmer le mot de passe"
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({confirmPassword: text})}
                                    onSubmitEditing={() => this.handleSignUp()}
                                />
                            </Item>
                        </Form>
                        <Button
                            block
                            style={GenericStyles.formBlockButton}
                            onPress={() => this.handleSignUp()}>
                            <Icon
                                name={Platform.OS === 'ios' ? 'ios-rocket' : 'md-rocket'}
                            />
                            <Text>Créer mon compte</Text>
                        </Button>
                    </Content>
                </Container>
            </Root>
        )
    }
}
