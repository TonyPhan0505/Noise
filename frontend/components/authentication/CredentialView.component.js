///////////////// Import Dependencies /////////////////
import {
    Dimensions,
    View,
    Text,
    TextInput
} from "react-native";

import Colors from "../../utils/Colors.util";
//////////////////////////////////////////////////////

/////////////// Screen dimensions ///////////////
const width = Dimensions.get('window').width;
/////////////////////////////////////////////////

///////////////// Component /////////////////
export default function CredentialView({ prompt, data, setData, placeholder, errorMessage }) {
    return (
        <View style={styles.root}>
            <Text style={styles.prompt}>{prompt}</Text>
            <TextInput 
                style={styles.inputField}
                value={data}
                onChangeText={(text) => setData(text)}
                placeholder={placeholder}
                placeholderTextColor={Colors.smokeyWhite}
            />
            {errorMessage && (
                <Text style={styles.error}>{errorMessage}</Text>
            )}
        </View>
    );
}
////////////////////////////////////////////

///////////////// Styles /////////////////
const styles = {
    root: {
        width: width * 0.8,
        marginBottom: 45
    },

    prompt: {
        fontSize: width * 0.045,
        color: Colors.smokeyWhite,
        fontWeight: "bold",
        marginBottom: 10
    },

    inputField: {
        width: "100%",
        height: width * 0.09,
        borderBottomWidth: 2,
        borderColor: Colors.white,
        color: Colors.white,
        fontSize: width * 0.04
    },

    error: {
        fontSize: width * 0.03,
        color: Colors.red,
        marginTop: 10
    }
};
/////////////////////////////////////////