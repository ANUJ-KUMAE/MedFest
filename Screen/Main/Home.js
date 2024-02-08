import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Button } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import Background from '../auth/Background'
import Btn from '../auth/Btn'
import { darkBlue } from '../auth/Constants'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Home(props) {
  const [name, setName] = useState('')

  useEffect(() => {
    firestore().collection('users')
      .doc(auth().currentUser.uid).get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data())
        }
        // else {
        //   alert("user does not exist")
        // }
      })
  }, [])



  return (
    <Background>
      {<SafeAreaView>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent:'space-between',
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>
              Hello, {name.fullName}
            </Text>
            <TouchableOpacity
              onPress={() => { auth().signOut() }}
            >
              <Text style={{ fontSize: 22, fontWeight: 'bold', marginRight:10 }}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>

          <View>
            <Btn
              textColor='white'
              bgColor={darkBlue}
              btnLabel="Songs"
              Press={() => {
                props.navigation.navigate('SongsMain')
              }}
            />
          </View>

          <View>
            <Btn
              textColor='white'
              bgColor={darkBlue}
              btnLabel="Blog"
              Press={() => {
                props.navigation.navigate('BlogHome')
              }}
            />
          </View>
        </View>
      </SafeAreaView>}
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 200,
    width: 400,
  },

  primary: {
    display: 'flex',
    flexDirection: 'column'
  }
  // button: {
  //   button: {
  //     marginTop: 50,
  //     height: 70,
  //     width: 250,
  //     backgroundColor: '#026efd',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     borderRadius: 50
  //   }
  // }
})
