import React from 'react'
import {AsyncStorage, Platform, Keyboard, Image} from 'react-native'
import {Container, Content, Header, Button, Icon, Text, Form, Item, Input, Left, Title, Body, Toast, Spinner} from 'native-base'
import GenericStyles from '../constants/Style'
import { logInUser, signUpUser } from '../store/api/public'
import Constants from "expo-constants"
import Colors from "../constants/Colors"


export class LogInScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: undefined,
            password: undefined,
            requestLogIn: false
        }
    }

    static navigationOptions = {
        header: null,
    }

    logInAsync = async () => {
        if (this.state.email && this.state.password) {
            this.setState({requestLogIn: true})
            const token = await logInUser(this.state.email, this.state.password)
            if (token) {
                await AsyncStorage.setItem('userToken', token)
                this.props.navigation.navigate('AuthLoading')
            }
        } else {
            Toast.show({
                text: 'Vous devez fournir votre email et votre mot de passe !',
                duration: 3000,
            })
        }
    }

    render() {
        return (
            <Container style={{marginTop: Constants.statusBarHeight, backgroundColor: Colors.splashScreenColor}}>
                <Content contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        style={{width: 200, height: 200, resizeMode: 'contain', marginBottom: 10, marginTop: 15}}
                        source={require('../assets/images/icon_large.png')}
                    />
                    <Text style={{color: Colors.counterTintColor, fontSize: 32, fontWeight: '100', marginBottom: 20}}>Groceries (Re)Cycle</Text>
                    <Form>
                        <Item style={{backgroundColor: '#fff', width: 350}} regular>
                            <Input
                                placeholder="Email"
                                keyboardType={"email-address"}
                                returnKeyType = { "next" }
                                onSubmitEditing={() => { this.password._root.focus() }}
                                blurOnSubmit={false}
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                        </Item>
                        <Item style={{backgroundColor: '#fff', width: 350, marginTop: 10}} regular>
                            <Input
                                ref={input => { this.password = input }}
                                placeholder="Mot de passe"
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({ password: text })}
                                onSubmitEditing={() => this.logInAsync()}
                            />
                        </Item>
                    </Form>
                    {
                        this.state.requestLogIn ? (<Spinner color={Colors.counterTintColor}/>) : (
                            <Button
                                block
                                style={GenericStyles.formBlockButton}
                                onPress={() => this.logInAsync()}>
                                <Icon
                                    name={Platform.OS === 'ios' ? 'ios-log-in' : 'md-log-in'}
                                />
                                <Text>Me connecter</Text>
                            </Button>)
                    }
                    <Text style={{color: Colors.counterTintColor, fontSize: 22, marginTop: 10}}>────────  OU  ────────</Text>
                    <Button
                        block
                        style={GenericStyles.formBlockButton}
                        onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Icon
                            style={{color: Colors.tintColor}}
                            name={Platform.OS === 'ios' ? 'ios-rocket' : 'md-rocket'}
                        />
                        <Text style={{color: Colors.tintColor}}>Me créer un compte</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

export class SignUpScreen extends React.Component {
    constructor(props) {
        super(props)
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
            })
        } else if(this.state.password === this.state.confirmPassword) {
            const token = await signUpUser(this.state.email, this.state.password)
            if (token) {
                await AsyncStorage.setItem('userToken', token)
                this.props.navigation.navigate('AuthLoading')
            }
        } else {
            Toast.show({
                text: 'Les deux mots de passe ne sont identiques !',
                duration: 3000,
            })
        }
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
                                onChangeText={(text) => this.setState({ confirmPassword: text })}
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
        )
    }
}
