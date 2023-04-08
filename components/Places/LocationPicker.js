import { View, StyleSheet } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync } from "expo-location";


const LocationPicker = () => {

    const getLocationHandler = async () => {
        // const location = await getCurrentPositionAsync();
        // console.log('location', location)
    };

    const pickOnMapHandler = () => {

    };

    return (
        <View>
            <View style={styles.mapPreview}>

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
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});