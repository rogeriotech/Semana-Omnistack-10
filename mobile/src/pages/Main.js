import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api'

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null)
    const [devs, setDevs] = useState([])
    const [techs, setTechs] = useState('')

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync()
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                })
                console.log('coords', coords)

                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                })

                console.log('currentRegion', currentRegion)
            }
        }

        loadInitialPosition()
    }, [])

    async function loadDevs(techs = 'React') {
        const { latitude, longitude } = currentRegion
        console.log('chegou aqui') 

        // const response = await api.get('/devs')
        const response = await api.get('/devs', {
            latitude,
            longitude,
            techs: ['React']
        })

        console.log('response.data', response.data) 

        setDevs(response.data)
        console.log('devs', devs) 
    }

    function handleRegionChange(region) {
        setCurrentRegion(region)
        console.log('region', region)
    }

    if (!currentRegion) {
        return null
    }

    return (
        <>
            <MapView
                onRegionChangeComplete={handleRegionChange}
                style={styles.map}
                initialRegion={currentRegion}
            >
                {devs.map(dev => (
                    <Marker key={dev._id} coordinate={{
                        longitude: dev.location.coordinates[0],
                        latitude: dev.location.coordinates[1]
                    }} >
                        <Image
                            style={styles.avatar}
                            source={{uri: dev.avatar_url}}
                        />
    
                        <Callout onPress={() => { navigation.navigate('Profile', { github_username: dev.github_username }) }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}> {dev.github_username} </Text>
                                <Text style={styles.bio}> {dev.bio} </Text>
                                <Text style={styles.devTechs}> {dev.techs.join(', ')} </Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>

            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeHolder='Buscar devs por tech...'
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={text => setTechs(text)}
                />

                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    callout: {
        width: 260
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFF",
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#7D40E7',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
})

export default Main