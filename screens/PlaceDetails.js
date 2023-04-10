import { ScrollView, Image, Text, View, StyleSheet } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";


const PlaceDetails = () => {
    const showOnMapHandler = () => {

    };

    return (
        <ScrollView>
            <Image style={styles.image} />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>ADDRESS</Text>
                </View>
                <OutlinedButton icon='map' onPress={showOnMapHandler}>View on Map</OutlinedButton>
            </View>
        </ScrollView>
    );
};

export default PlaceDetails;

const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%', 
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});