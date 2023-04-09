import { View, StyleSheet, Alert, Text } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { useEffect, useState  } from "react";
import { getMapPreview } from '../../util/location';
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { getAddress } from "../../util/location";


const LocationPicker = ({ onPickLocation }) => {
    const [pickedLocation, setPickedLocation] = useState(null);
    const isFocused = useIsFocused();

    const navigation = useNavigation();
    const route = useRoute(); 

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = { lat: route.params.pickedLat, lng: route.params.pickedLng };
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    useEffect(() => {

        const handleLocation = async () => {
            if (pickedLocation) {
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                onPickLocation({ ...pickedLocation, address });
            };
        };

        handleLocation();
        
    }, [pickedLocation, onPickLocation]);

    const verifyPermission = async () => {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
            );
            return false;
        }

        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermission();

        if (!hasPermission) {
            return;
        };

        const location = await getCurrentPositionAsync();

        const locationData = {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        };

        setPickedLocation(locationData);
    };

    const pickOnMapHandler = () => {
        navigation.navigate('Map');
    };

    let locationPreview = <Text>No location picked yet</Text>

    if (pickedLocation) {
        locationPreview = <Image source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} style={styles.image} />;
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon='location' onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon='map' onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
        </View>
    );
};

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});