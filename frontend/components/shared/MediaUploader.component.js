///////////////// Import Dependencies /////////////////
import { useEffect } from "react";
import { 
    Dimensions,
    View, 
    TouchableOpacity, 
    Image, 
    StyleSheet,
    Text
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import Colors from "../../utils/Colors.util";
/////////////////////////////////////////////////////

/////////////////// Screen dimensions ///////////////////
const width = Dimensions.get('window').width;
/////////////////////////////////////////////////

/////////////////// Component ///////////////////
export default function MediaUploader({ isAvatar, selectedMedia, setSelectedMedia }) {
    useEffect(() => {
        (async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        })();
    }, []);

    const handleChooseMedia = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });
    
        if (!result.canceled) {
          setSelectedMedia(result.assets[0].uri);
        }
      };

    return (
        <View style={styles.root}>
            {
                selectedMedia ? (
                    <Image
                        source={{ uri: selectedMedia }}
                        style={ isAvatar ? styles.avatarPreviewImage : styles.previewImage }
                    />
            )
                : (
                    <FontAwesome name="photo" size={width * 0.4} color={Colors.smokeyWhite} />
                )
            }
            <TouchableOpacity style={styles.button} onPress={handleChooseMedia}>
                <Fontisto name="photograph" size={21} color={Colors.white} />
                <Text style={styles.buttonText}>{ selectedMedia ? "Replace" : "Add" }</Text>
            </TouchableOpacity>
        </View>
    );
}
////////////////////////////////////////////////

/////////////////// Styles ///////////////////
const styles = StyleSheet.create({
    root: {
        width: "100%",
        alignItems: "center"
    },

    avatarPreviewImage: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: width * 0.1
    },

    previewImage: {
        width: width * 0.7,
        height: width * 0.4,
    },

    button: {
        width: width * 0.35,
        height: width * 0.09,
        borderRadius: 7,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.banffGreen,
        marginTop: 20
    },

    buttonText: {
        fontSize: width * 0.04,
        color: Colors.white,
        marginLeft: 6
    }
});
/////////////////////////////////////////////