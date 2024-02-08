
import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Button, Text, TouchableOpacity, Image } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { black, darkBlue, darkGreen } from './Constants'
import Field from './Field';
import Btn from './Btn';

import { globalStyles } from '../../utils/globalStyles'
import Background from './Background'

export default function Signup(props) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [fullName, setFullName] = useState()
    const [displayPicture, setDisplayPicture] = useState()

    function onPickPicture() {
        launchImageLibrary({
            mediaType: 'photo',
        }, (data) => setDisplayPicture(data.assets[0].uri))
    }
    function onClickPicture() {
        launchCamera({
            mediaType: 'photo',
        }, (data) => setDisplayPicture(data.assets[0].uri))
    }

    async function onRegister(email, password, fullName) {
        if (!email && !password) {
            return
        }
        try {
            const { user: { uid } } = await auth().createUserWithEmailAndPassword(email, password)

            let downloadURL = null
            if (displayPicture) {
                const spiltPath = displayPicture.split('/')
                const imageName = spiltPath[spiltPath.length - 1]
                const reference = storage().ref(`${uid}/images/${imageName}`)
                const data = await reference.putFile(displayPicture)
                downloadURL = await storage().ref(data.metadata.fullPath).getDownloadURL()
            }


            firestore().collection('users')
                .doc(auth().currentUser.uid)
                .set({
                    email,
                    fullName,
                    displayPicture: downloadURL
                })
                .then(() => alert('Account Created'))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Background>
            <View style={styles.container}>
                <Text style={{ marginTop: 20, fontSize: 35, fontWeight: 'bold', color: 'black' }}>Register</Text>
                <Text style={{ color: 'black' }}>Create a new Account</Text>
                <Image
                    source={{ uri: !displayPicture ? null : displayPicture }}
                    style={styles.displayPicture}
                />
                <View style={styles.touchableContainer}>
                    <TouchableOpacity onPress={onPickPicture}>
                        <Text style={{ color: 'black' }}>Pick Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClickPicture}>
                        <Text style={{ color: 'black' }}>Click Picture</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    value={fullName}
                    placeholder='Name'
                    style={globalStyles.primaryInput}
                    onChangeText={(fullName) => setFullName(fullName)}
                    autoCorrect={false}
                />

                <TextInput
                    value={email}
                    placeholder='Email'
                    style={globalStyles.primaryInput}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                <TextInput
                    value={password}
                    placeholder='Password'
                    style={globalStyles.primaryInput}
                    onChangeText={(text) => setPassword(text)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                />
                <Button
                    title='Signup'
                    onPress={() => onRegister(email, password, fullName)}
                />
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 20,
                    }}>
                    <Text style={{ fontSize: 15 }}>Already have an account?  </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
                        <Text style={{ color: black, fontWeight: 'bold', fontSize: 15 }}>Login</Text>
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