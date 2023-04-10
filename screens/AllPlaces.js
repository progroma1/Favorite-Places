import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";


const AllPlaces = ({ route }) => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const isFocused = useIsFocused();

    useEffect(() => {
        const loadedPlaces = async () => {
            const places = await fetchPlaces();
            setLoadedPlaces(places);
        };
        if (isFocused) {
            loadedPlaces();
            // setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
        }

    }, [isFocused])

    return (
        <PlacesList places={loadedPlaces} />
    );
};

export default AllPlaces;