import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Background from '../auth/Background'
import SongsHome from './SongsHome'
import Btn from '../auth/Btn'
import { darkBlue } from '../auth/Constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ChantHome from './ChantHome'
import SleepyHome from './SleepyHome'

export default function SongsMain(props) {
    return (
        <Background>
            <View style={styles.container}>
                <Text style={{ fontSize: 36, color: 'rgba(0,0,0,0.7)', fontWeight:'bold'}}>Songs</Text>
            </View>
            <View>
                <Text style={{ textAlign: 'center', fontSize: 25, marginTop: 20, color:'black' }}>Welcome to Music World</Text>
            </View>
            <View>
                <Image source={require('../assets/Nature.jpg')}
                    style={{
                        marginHorizontal:20,
                        marginVertical:20,
                        height: '70%',
                        width: '88%',
                        resizeMode: 'cover',
                        marginBottom: 50,
                        marginTop: 20,
                        borderRadius:10,
                    }}
                />
                <View style={styles.btnContainer}>
                    <View>
                        <Btn
                            textColor='white'
                            bgColor={darkBlue}
                            btnLabel="Calm"
                            Press={() => {
                                props.navigation.navigate('SongsList')
                            }}
                        />
                    </View>

                    <View>
                        <Btn
                            textColor='white'
                            bgColor={darkBlue}
                            btnLabel="Sleepy"
                            Press={() => {
                                props.navigation.navigate('SleepyHome')
                            }}
                        />
                    </View>
                </View>
            </View>

        </Background>
    )
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal:10,
        marginVertical:10,
        flex: 1,
        width: 400
    },
    btnContainer: {
        alignItems: 'center',
        
    }

})
