import React, { useEffect, useRef, useState } from 'react'
import Background from '../auth/Background'
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Image, FlatList, Animated, value } from 'react-native'
import TabNavigation from '../Main/TabNavigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider'
import TrackPlayer, { Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';

import sleepysongs from '../../utils/sleepy'

const { width, height } = Dimensions.get('window');

const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],

    })
    await TrackPlayer.add(sleepysongs);
  } catch (e) {

  }
}

const tooglePlayback = async (playbackState) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  if (currentTrack != null) {
    if (playbackState === State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
}


const SleepyHome = ({ navigation }) => {
  const playbackState = usePlaybackState();

  const scrollX = useRef(new Animated.Value(0)).current;
  const [songsIndex, setSongIndex] = useState(0);

  const songSlider = useRef(null);

  useEffect(() => {
    setupPlayer();

    scrollX.addListener(({ value }) => {
      // console.log('Scroll X ', scrollX);
      // console.log('Device', width);
      const index = Math.round(value / width);
      setSongIndex(index);

      // console.log('Index: ', index);
    });

    return () => {
      scrollX.removeAllListeners();
    }
  }, []);

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songsIndex + 1) * width,
    });
  }

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songsIndex - 1) * width,
    });
  }

  function renderSongs({ index, item }) {
    return (
      <Animated.View style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.artwork}>
          <Image source={item.artwork}
            style={styles.artworkImg}
          />
        </View>
      </Animated.View>

    );
  }
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.Maincontainer}>


          <Animated.FlatList
            ref={songSlider}
            data={sleepysongs}
            renderItem={renderSongs}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{
                nativeEvent: {
                  contentOffset: { x: scrollX }
                }
              }],
              { useNativeDriver: true }
            )}
          />

          <View>
            <Text style={styles.title}>{sleepysongs[songsIndex].title}</Text>
          </View>
          <View>
            <Text style={{textAlign:'center'}}>{sleepysongs[songsIndex].artist}</Text>
          </View>
          <View>
            <Slider
              style={styles.progressContainer}
              value={10}
              minimumValue={0}
              maximumValue={100}
              thumbTintColor='blue'
              minimumTrackTintColor='blue'
              maximumTrackTintColor='#FFF'
              onSlidingComplete={() => { }}
            />
            <View style={styles.ProgressLabelContainer}>
              <Text style={styles.ProgressLabeltxt}>0:00</Text>
              <Text style={styles.ProgressLabeltxt}>0:00</Text>
            </View>
          </View>
          <View style={styles.musicControl}>
            <TouchableOpacity onPress={skipToPrevious}>
              <Ionicons name='play-skip-back-outline' size={35} color={"blue"} style={{ marginTop: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => tooglePlayback(playbackState)}>
              <Ionicons name={
                playbackState == State.Paused
                ? 'play-circle-outline' : 'pause-circle-outline'} size={45} color={"blue"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={skipToNext}>
              <Ionicons name='play-skip-forward-outline' size={35} color={"blue"} style={{ marginTop: 5 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          marginTop: 60,
          borderTopColor: 'black',
          borderTopWidth: 2,
          width: width,
          alignItems: 'center',
          paddingVertical: 15,
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
            <TouchableOpacity onPress={() => { }}>
              <Ionicons name="heart-outline" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
              <Ionicons name="repeat" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
              <Ionicons name="share-outline" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
              <Ionicons name="ellipsis-horizontal" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  )
}

export default SleepyHome;

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