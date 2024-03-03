///////////////// Import Dependencies /////////////////
import { useState } from "react";
import {
    Dimensions,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

import Colors from "../../utils/Colors.util";
//////////////////////////////////////////////////////

/////////////// Screen dimensions ///////////////
const width = Dimensions.get('window').width;
/////////////////////////////////////////////////

///////////////// Component /////////////////
export default function PasswordView({ data, setData, errorMessage }) {
    const [ hidden, setHidden ] = useState(true);

    function toggle() {
        setHidden(!hidden);
    }

    return (
        <View style={styles.root}>
            <Text style={styles.prompt}>Password:</Text>
            <View style={styles.inputFieldWrapper}>
                <TextInput 
                    style={styles.inputField}
                    secureTextEntry={hidden}
                    value={data}
                    onChangeText={(text) => setData(text)}
                />
                <TouchableOpacity onPress={toggle}>
                    {
                        hidden ?
                            <Ionicons 
                                name="eye-off-sharp" 
                                size={width * 0.06} 
                                color={Colors.white}
                            />
                        :
                            <Ionicons 
                                name="eye-sharp" 
                                size={width * 0.06} 
                                color={Colors.white} 
                            />
                    }
                </TouchableOpacity>
            </View>
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

    inputFieldWrapper: {
        flexDirection: "row",
        width: "100%",
        height: width * 0.09,
        borderBottomWidth: 2,
        borderColor: Colors.white,
    },

    inputField: {
        width: "90%",
        height: "100%",
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