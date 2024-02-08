import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const MusicListItem = ({ item, index, data }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={[
                styles.container,
                { marginBottom: index == data.length - 1 ? 30 : 0 },
            ]}
            onPress={() => {
                navigation.navigate('SongsHome', {
                    data: item,
                    index:index,
                });
            }}>
            <Image source={item.artwork} style={styles.songImage} />
            <View style={styles.nameView}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.name}>{item.artist}</Text>
            </View>
            <TouchableOpacity>
                <Ionicons
                    name='play-circle-outline'
                    size={39}
                    color={'black'}
                    style={styles.play}
                />
            </TouchableOpacity>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        width: width - 30,
        height: 90,
        marginTop: 20,
        elevation: 5,
        alignSelf: 'center',
        backgroundColor: '#fff',
        marginLeft: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    songImage: {
        width: 100,
        height: 80,
        borderRadius: 10,
        marginLeft: 8,
    },
    nameView: {
        paddingLeft: 15,
        width: '55%'

    },
    name: {
        fontSize: 15,
        fontWeight: '500',
        color: '#000',
    },
    play: {

    }
})

export default MusicListItem;
