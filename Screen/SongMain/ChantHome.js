import React, { useEffect, useRef, useState } from 'react'
import Background from '../auth/Background'
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Image, FlatList, Animated, value } from 'react-native'
import TabNavigation from '../Main/TabNavigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider'
import TrackPlayer, { Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';

import chantsongs from '../../utils/chant'

const { width, height } = Dimensions.get('window');


const ChantHome = ( ) => {
  return (
    <Background>
      
    </Background>
  )
}

export default ChantHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 400

  },
  Maincontainer: {
    alignItems: 'center'
  },
  artwork: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 240,
    marginBottom: 30,
    marginTop: 80,
    marginRight: 20
  },
  artworkImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15
  },
  progressContainer: {
    width: 350,
    height: 15,
    marginTop: 5,
    // marginBottom: 5,
    flexDirection: 'row',
  },
  ProgressLabelContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ProgressLabeltxt: {
    color: ' blue'
  },
  musicControl: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
    marginTop: 5,
    marginLeft: 55
  }

})