import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkBlue, darkGreen, red } from './Constants';

const Welcome = (props) => {
    return (
        <Background>
            <View style={{ marginHorizontal: 20, marginVertical: 20}}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 30, marginTop:25 }}>Welcome To</Text>
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <Text style={{ color: 'red', fontSize: 45 }}> MedFest</Text>
                    </View>
                </View>
                <Image source={require("../assets/Nameste.jpg")}
                    style={{
                        height: '40%',
                        width: '100%',
                        resizeMode: 'cover',
                        marginBottom: 50,
                        marginTop: 10,
                    }} />
                <View style={{ marginBottom: 90 }}>
                    <Text style={{ fontSize: 25}}>Bend Your Mind,Inspire Yourself</Text>
                </View>
                <View style={{alignItems: 'center' }}>
                    <Btn bgColor={darkBlue} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
                    <Btn bgColor={darkBlue} textColor='white' btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
                </View>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({})

export default Welcome;
