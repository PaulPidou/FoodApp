import React from 'react'
import {AsyncStorage, Platform, Keyboard, Image} from 'react-native'
import {Container, Content, Button, Icon, Text, Form, Item, Input, Toast, Spinner} from 'native-base'
import GenericStyles from '../constants/Style'
import { logInUser, signUpUser } from '../store/api/public'
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
            const response = await logInUser(this.state.email, this.state.password)
            if (response.hasOwnProperty('token')) {
                await AsyncStorage.setItem('userToken', response.token)
            } else if(response.hasOwnProperty('message')) {
                Toast.show({
                    text: response.message,
                    textStyle: { textAlign: 'center' },
                    buttonText: 'Ok'
                })
            }
            this.props.navigation.navigate('AuthLoading')
        } else {
            Toast.show({
                text: 'Vous devez fournir votre email et votre mot de passe !',
                duration: 3000,
            })
        }
    }
    
    render() {
        return (
            <Container style={GenericStyles.loginContainer}>
                <Content contentContainerStyle={GenericStyles.loginContent}>
                    <Image
                        style={GenericStyles.loginImage}
                        source={require('../assets/images/icon_large.png')}
                    />
                    <Image
                        style={{resizeMode: 'contain', height: 100, width: 350}}
                        source={require('../assets/images/logo.png')}
                    />
                    <Form>
                        <Item style={GenericStyles.loginFormItem} regular>
                            <Input
                                placeholder="Email"
                                keyboardType={"email-address"}
                                returnKeyType = { "next" }
                                onSubmitEditing={() => { this.password._root.focus() }}
                                blurOnSubmit={false}
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                        </Item>
                        <Item style={GenericStyles.loginFormItem} regular>
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
                    <Text style={{color: Colors.counterTintColor, fontSize: 22, marginTop: 15}}>────────  OU  ────────</Text>
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
            const register = await signUpUser(this.state.email, this.state.password)
            if (register) {
                const response = await logInUser(this.state.email, this.state.password)
                if (response.hasOwnProperty('token')) {
                    await AsyncStorage.setItem('userToken', response.token)
                }
                this.props.navigation.navigate('AuthLoading')
            }
        } else {
            Toast.show({
                text: 'Les deux mots de passe ne sont pas identiques !',
                duration: 3000,
            })
        }
    }

    render() {
        return (
            <Container style={GenericStyles.loginContainer}>
                <Content contentContainerStyle={GenericStyles.loginContent}>
                    <Image
                        style={GenericStyles.loginImage}
                        source={require('../assets/images/icon_large.png')}
                    />
                    <Image
                        style={{resizeMode: 'contain', height: 100, width: 350}}
                        source={require('../assets/images/logo.png')}
                    />
                    <Form>
                        <Item style={GenericStyles.loginFormItem} regular>
                            <Input
                                placeholder="Email"
                                keyboardType={"email-address"}
                                returnKeyType = { "next" }
                                onChangeText={(text) => this.setState({email: text})}
                                onSubmitEditing={() => { this.password._root.focus() }}
                                blurOnSubmit={false}
                            />
                        </Item>
                        <Item style={GenericStyles.loginFormItem} regular>
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
                        <Item style={GenericStyles.loginFormItem} regular>
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
