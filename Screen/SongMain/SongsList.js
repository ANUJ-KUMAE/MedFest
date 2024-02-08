import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import Background from '../auth/Background';
import songs from '../../utils/data';
import MusicListItem from './Common/MusicListItem';
import chantsongs from '../../utils/chant';

const SongsList = () => {
    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.logo}>Music</Text>
                </View>
                <FlatList data={songs} 
                    renderItem={({item, index}) => {
                        return <MusicListItem item={item} index={index} data={songs}/>
                    }}
                />
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        height: 60, 
        backgroundColor: '#fff',
        width: '500%',
        elevation: 7,
        justifyContent: 'center',
    },
    logo:{
        fontSize:20,
        fontWeight:'700',
        color:'#FF0D0D',
        marginLeft:20,
    }

})

export default SongsList;
