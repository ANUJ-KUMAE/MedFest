import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button, TextInput } from 'react-native';
import Background from './Background';
import { black, darkBlue, darkGreen } from './Constants'
import Field from './Field';
import Btn from './Btn';


import auth from '@react-native-firebase/auth';
import { globalStyles } from '../../utils/globalStyles'

export default function Login(props) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [name, setName] = useState()
    const [displayPicture, setDisplayPicture] = useState()

    // function onLogin() {
    //     auth().signInWithEmailAndPassword(email, password)
    //  }

    async function onLogin(email,password){
        try {
            auth().signInWithEmailAndPassword(email, password)
        } catch (error){
            alert(error.message)
        }
    }

    return (
        <Background>
            <View style={styles.container}>
                <Text style={{
                    color: "white",
                    fontSize: 45,
                    fontWeight: "bold",
                    marginVertical: 10,
                    alignItems:'center'
                }}>Login</Text>
                <View style={{alignItems:'center', marginTop:50}}>
                <Text style={{fontSize:20, color:'darkgreen'}}>Welcome Back</Text>
                <Text style={{fontSize:20}}>Login to your account</Text>

                </View>
                <TextInput
                    value={email}
                    placeholder='Email'
                    style={globalStyles.primaryInput}
                    onChangeText={(email) => setEmail(email)}
                />

                <TextInput
                    value={password}
                    placeholder='Password'
                    style={globalStyles.primaryInput}
                    onChangeText={(password) => setPassword(password)}
                />
                <Button
                    title='Login'
                    onPress={() => onLogin(email,password)}
                />
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 20,
                    }}>
                    <Text style={{ fontSize: 15 }}>Already have an account?  </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
                        <Text style={{ color: black, fontWeight: 'bold', fontSize: 15 }}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Background>
    )
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: 400
    },
    touchableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginBottom: 20
    },
    displayPicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'gray',
        marginTop: 20
    },
})
