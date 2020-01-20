import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null)


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

    if (!currentRegion) {
        return null
    }

    return (
        <MapView style={styles.map} initialRegion={currentRegion} >
            <Marker coordinate={{ latitude: -23.7740045, longitude: -46.6959843 }} >
                <Image style={styles.avatar} source={{ uri: 'https://avatars3.githubusercontent.com/u/16908177?s=460&v=4' }} />

                <Callout onPress={() => { navigation.navigate('Profile', { github_username: 'lrdrodrigues' }) }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Rogerio Rodrigues</Text>
                        <Text style={styles.bio}>Bio: IT & English Teacher | Community Coordinator | Speaker | Business Partner & Innovation Intern</Text>
                        <Text style={styles.devTechs}>Techs: ReactJS, React Native, NodeJS</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
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
    }
})

export default Main