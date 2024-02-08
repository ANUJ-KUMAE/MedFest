import React, { useEffect, useRef, useState } from 'react'
import Background from '../auth/Background'
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Image, FlatList, Animated, value } from 'react-native'
import TabNavigation from '../Main/TabNavigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider'
import TrackPlayer, { Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import { darkBlue } from '../auth/Constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import songs from '../../utils/data';
import { useRoute } from '@react-navigation/native'

const { width, height } = Dimensions.get('window');






const SongsHome = () => {
  const route = useRoute();
  const progress = useProgress();
  const playBackState = usePlaybackState();
  const [currentSong, setCurrentSong] = useState(route.params.index);
  const ref = useRef()
  useEffect(() => {
    setTimeout(() => {
      ref.current.scrollToIndex({
        animated: true,
        index: currentSong,
      });
    }, 100);
  }, []);

  useEffect(() => {
    setupPlayer();
  }, [])


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

      });
      await TrackPlayer.add(songs);
      await TrackPlayer.skip(currentSong);
      togglePlayBack(playBackState);
    } catch (e) {

    }
  }

  const togglePlayBack = async playBackState => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    //console.log(currentTrack, playBackState, State.Playing);
    if (currentTrack != null) {
      if (playBackState === State.Paused || playBackState === State.Ready || playBackState === State.Buffering || playBackState === State.Connecting) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={ref}
          pagingEnabled
          data={songs}
          onScroll={async e => {
            const x = e.nativeEvent.contentOffset.x / width;
            setCurrentSong(parseInt(x.toFixed(0)));
            await TrackPlayer.skip(parseInt(x.toFixed(0)));
            togglePlayBack(playBackState);
          }}
          renderItem={({ item, index }) => {
            return (
              <View>
                <View style={styles.bannerView}>
                  <Image source={item.artwork} style={styles.banner} />
                </View>
                <View style={styles.nameView}>
                  <Text style={styles.name}>{item.title}</Text>
                  <Text style={styles.name}>{item.artist}</Text>
                </View>
              </View>
            );
          }}
        />

        
        <View style={styles.sliderView}>
          <Slider
            style={styles.progressContainer}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor='blue'
            minimumTrackTintColor='blue'
            maximumTrackTintColor='#FFF'
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />
        </View>



        {/* musicControl */}


        <View style={styles.musicControl}>
          <TouchableOpacity
            onPress={async () => {
              if (currentSong > 0) {
                setCurrentSong(currentSong - 1);
                ref.current.scrollToIndex({
                  animated: true,
                  index: parseInt(currentSong) - 1,
                });
                await TrackPlayer.skip(parseInt(currentSong) - 1);
                togglePlayBack(playBackState);
              }
            }}>
            <Ionicons name='play-skip-back-outline' size={35} color={"blue"} style={{ marginTop: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => {
            //await TrackPlayer.skip(2);
            togglePlayBack(playBackState)
            //await TrackPlayer.pause();
          }}>
            <Ionicons
              name={playBackState == State.Paused || playBackState == State.Ready ? 'play-circle-outline' : 'pause-circle-outline'}
              size={45}
              color={"blue"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              if (songs.length - 1 > currentSong) {
                setCurrentSong(currentSong + 1);
                ref.current.scrollToIndex({
                  animated: true,
                  index: parseInt(currentSong) + 1,
                });
                await TrackPlayer.skip(parseInt(currentSong) + 1);
                togglePlayBack(playBackState);
              }
            }}
          >
            <Ionicons name='play-skip-forward-outline' size={35} color={"blue"} style={{ marginTop: 5 }} />
          </TouchableOpacity>
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


            <TouchableOpacity>
              <Ionicons name="repeat-outline" size={30} />
            </TouchableOpacity>


            <TouchableOpacity onPress={() => { }}>
              <Ionicons name="share-outline" size={30} />
            </TouchableOpacity>


            <TouchableOpacity onPress={() => { }}>
              <Ionicons name="ellipsis-horizontal" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  )
}

export default SongsHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 400

  },
  bannerView: {
    width: width - 10,
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 50,
  },
  banner: {
    width: '80%',
    height: 350,
    //alignSelf: 'center',
    //marginTop: 50,
    borderRadius: 10,
    alignItems: 'center'
  },
  nameView: {
    alignItems: 'center',
  },
  name: {
    marginTop: 10,
    fontSize: 15,
    marginLeft: 15,
    fontWeight: '700',
    color: '#000'
  },
  sliderView: {
    marginTop: 20,
  },
  progressContainer: {
    width: 350,
    height: 15,
    // marginBottom: 5,
    flexDirection: 'row',
  },
  musicControl: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
    marginTop: 8,
    marginLeft: 10,
    alignItems: 'center'
  },

})
