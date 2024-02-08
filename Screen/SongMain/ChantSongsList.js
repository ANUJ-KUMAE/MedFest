import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Background from '../auth/Background'
import chantsongs from '../../utils/chant'
import ChantMusicListItem from './Common/ChantMusicListItem'

function ChantSongsList() {
    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.logo}>ChantMusicApp</Text>
                </View>
                <FlatList data={chantsongs}
                    renderItem={({ item, index }) => {
                        return <ChantMusicListItem item={item} index={index} data={chantsongs} />
                    }}
                />
            </View>
        </Background>
    )
}

export default ChantSongsList;

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
    logo: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FF0D0D',
        marginLeft: 20,
    }

})
