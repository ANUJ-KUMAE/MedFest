import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, Modal, Button, Image, Pressable, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { globalStyles } from '../../utils/globalStyles'
import ModalView from '../../Components/ModalView'
import BlogCard from '../../Components/BlogCard'
import Background from '../auth/Background'


export default function BlogHome({ navigation }) {

  const [blogs, setBlogs] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCardId, setSelectedCardId] = useState([])




  function getBlogData() {
    firestore().collection('usersBlog')
      .onSnapshot(quearySnapshot => {
        const users = []
        quearySnapshot.forEach((documentSnapshot) => {
          const { content, coverImage, createdAt, title } = documentSnapshot.data()
          users.push({
            id: documentSnapshot.id,
            content,
            coverImage,
            createdAt,
            title,
          })
        })
        setBlogs(users)
      })
  }

  useEffect(() => {
    getBlogData()
  }, [])

  function renderItem({ item }) {
    return (
      <BlogCard
        blogData={item}
        moveToBlogScreen={moveToBlogScreen}
        onModalOpen={onModalOpen}
      />
    )
  }

  function onModalOpen(cardId) {
    setModalOpen(true)
    setSelectedCardId(cardId)
  }

  function onCloseModal() {
    setModalOpen(false)
    setSelectedCardId(null)
  }

  function moveToBlogScreen(blogData) {
    navigation.navigate('Blog', {
      blogData
    })
  }



  function onUpdateBlog()
  {
    navigation.navigate('CreateBlog', { id: selectedCardId })
    setSelectedCardId(null)
    setModalOpen(false)
  }
  function onDeleteBlog()
  {
    setModalOpen(false)
    firestore().collection('usersBlog')
    .doc(selectedCardId)
    .delete()
    .catch((error) => console.log(error))
    setSelectedCardId(null)
  }

  return (
    <Background>
      <View style={globalStyles.primaryContainer}>
        <Modal
          visible={modalOpen}
          animationType='fade'
          transparent={true}
        >
          <ModalView
             onPressHandlers={{
              onUpdateBlog,
              onDeleteBlog,
              onCloseModal
             }}
             onCloseModal={onCloseModal}

          />
        </Modal>
        <View style={styles.header}>
          <Text style={globalStyles.headingText}>My Blogs</Text>
        </View>
        <View style={styles.addIcon}>
          <Ionicons
            name='add-circle-sharp'
            size={54}
            color='blue'
            onPress={() => navigation.navigate('CreateBlog')}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <FlatList
            data={blogs}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>
      </View>
    </Background>

  )
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 10,
    marginVertical: 10
  },
  addIcon: {
    position: 'absolute',
    // bottom:20,
    marginTop:590,
    left: '43%',
    zIndex: 1,
    elevation: 20,
  },
})

