///////////////// Import Dependencies /////////////////
import { useState, useEffect } from "react";
import {
    Alert,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Text,
    Image,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import CredentialField from "../../components/authentication/CredentialView.component";
import PasswordView from "../../components/authentication/PasswordView.component";
import MediaUploader from "../../components/shared/MediaUploader.component";

import Colors from "../../utils/Colors.util";
const Logo = require("../../assets/Logo.png");
import IsStrongPassword from "../../utils/IsStrongPassword.util";
/////////////////////////////////////////////////////

/////////////////// Screen dimensions ///////////////////
const { width, height } = Dimensions.get('window');
/////////////////////////////////////////////////

/////////////////// Component ///////////////////
export default function SignUpScreen({ navigation }) {
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ identity, setIdentity ] = useState("");
    const [ age, setAge ] = useState("");
    const [ about, setAbout ] = useState("");
    const [ submitted, setSubmitted ] = useState(false);
    const [ selectedAvatar, setSelectedAvatar ] = useState("");
    const [ emailError, setEmailError ] = useState("");
    const [ usernameError, setUsernameError ] = useState("");
    const [ passwordError, setPasswordError ] = useState("");
    const [ identityError, setIdentityError ] = useState("");
    const [ ageError, setAgeError ] = useState("");
    const [ aboutError, setAboutError ] = useState("");
    const [ hasCheckedInputs, setHasCheckedInputs ] = useState(false);
    const dispatch = useDispatch();
    const userExists = useSelector(state => state.user.userExists);
    const hasSignedUp = useSelector(state => state.user.hasSignedUp);
    const hasSentVerificationCode = useSelector(state => state.verification.hasSent);

    useEffect(() => {
        if (
            submitted
                &&
            hasCheckedInputs
                &&
            !emailError
                &&
            !usernameError
                &&
            !passwordError
                &&
            !identityError
                &&
            !ageError
                &&
            !aboutError
        ) {
            dispatch({
                type: "user/doesUserExist",
                payload: {
                    emailAddress: email,
                    username: username
                }
            });
            setHasCheckedInputs(false);
        } else if (
            submitted
                &&
            hasCheckedInputs
                &&
            (emailError
                ||
            usernameError
                ||
            passwordError
                ||
            identityError
                ||
            ageError
                ||
            aboutError)
        ) {
            setSubmitted(false);
            setHasCheckedInputs(false);
        }
    }, [hasCheckedInputs]);

    useEffect(() => {
        if (userExists === 1) {
            dispatch({
                type: "user/resetDoesUserExist"
            });
            setSubmitted(false);
            Alert.alert(
                "Noise",
                "This email address or username already exists.",
                [
                    {
                        text: "Try again"
                    }
                ]
            );
        } else if (userExists === 2) {
            dispatch({
                type: "user/resetDoesUserExist"
            });
            dispatch({
                type: "user/signUp",
                payload: {
                    username: username,
                    emailAddress: email,
                    profileAvatar: selectedAvatar,
                    identity: identity,
                    age: age,
                    about: about,
                    password: password
                }
            });
        } else if (userExists === 0) {
            dispatch({
                type: "user/resetDoesUserExist"
            });
            setSubmitted(false);
            Alert.alert(
                "Noise",
                "Internet connection error.",
                [
                    {
                        text: "Try again"
                    }
                ]
            );
        }
    }, [userExists]);

    useEffect(() => {
        if (hasSignedUp === 1) {
            dispatch({
                type: "user/resetSignUp"
            });
            dispatch({
                type: "verification/send",
                payload: email
            });
        } else if (hasSignedUp === 0) {
            dispatch({
                type: "user/resetSignUp"
            });
            setSubmitted(false);
            Alert.alert(
                "Noise",
                "Internet connection error.",
                [
                    {
                        text: "Try again"
                    }
                ]
            );
        }
    }, [hasSignedUp]);

    useEffect(() => {
        if (hasSentVerificationCode === 1) {
            dispatch({
                type: "verification/resetSend"
            });
            setSubmitted(false);
            navigation.navigate("Verification");
        } else if (hasSentVerificationCode === 0) {
            dispatch({
                type: "verification/resetSend"
            });
            setSubmitted(false);
            Alert.alert(
                "Noise",
                "Internet connection error.",
                [
                    {
                        text: "Try again"
                    }
                ]
            );
        }
    }, [hasSentVerificationCode]);

    useEffect(() => {
        if (submitted) {
            checkInputs();
        }
    }, [submitted]);

    function navToLogin() {
        navigation.navigate('Login');
    }

    function submit() {
        if (!submitted) {
            setSubmitted(true);
        }
    }

    function checkInputs() {
        setHasCheckedInputs(true);
        checkEmail();
        checkUsername();
        checkPassword();
        checkIdentity();
        checkAge();
        checkAbout();
    }

    function checkEmail() {
        if (
            (email.length <= 6) 
                || 
            !email.includes("@") 
                || 
            !email.includes(".")
        ) {
            setEmailError("Invalid email address.")
        } else {
            setEmailError("");
        }
    }

    function checkUsername() {
        if (username.length < 5) { 
            setUsernameError("Username is too short.");
        } else if (username.length > 12) { 
            setUsernameError("Username is too long.");
        } else {
            setUsernameError("");
        }
    }

    function checkPassword() {
        IsStrongPassword(password, setPasswordError);
    }

    function checkIdentity() {
        if (!identity) {
            setIdentityError("Please specify your identity.");
        } else {
            setIdentityError("");
        }
    }

    function checkAge() {
        if (age.length < 1) {
            setAgeError("Please specify your age.");
        } else {
            setAgeError("");
        }
    }

    function checkAbout() {
        if (about.length < 10) {
            setAboutError("Please tell a little more about yourself.");
        } else {
            setAboutError("");
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content"/>
            <TouchableOpacity 
                onPress={navToLogin}
                style={styles.backButton}
            >
                <Ionicons 
                    name="arrow-back-circle" 
                    size={width * 0.1} 
                    color={Colors.white} 
                />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Image source={Logo} style={styles.logo}/>
                <Text style={styles.signUpText}>Sign up</Text>
                <CredentialField 
                    prompt="Email address:"
                    data={email}
                    setData={setEmail}
                    errorMessage={emailError}
                />
                <CredentialField 
                    prompt="Username:"
                    data={username}
                    setData={setUsername}
                    errorMessage={usernameError}
                />
                <PasswordView 
                    data={password}
                    setData={setPassword}
                    errorMessage={passwordError}
                />
                <CredentialField 
                    prompt="Identity:"
                    data={identity}
                    setData={setIdentity}
                    placeholder="e.g. Visual Artist"
                    errorMessage={identityError}
                />
                <CredentialField 
                    prompt="Age:"
                    data={age}
                    setData={setAge}
                    errorMessage={ageError}
                />
                <CredentialField 
                    prompt="About you:"
                    data={about}
                    setData={setAbout}
                    placeholder="e.g. I live and breath creativity..."
                    errorMessage={aboutError}
                />
                <View style={styles.avatarPromptWrapper}>
                    <Text style={styles.avatarPrompt}>Avatar:</Text>
                </View>
                <View style={styles.mediaUploaderWrapper}>
                    <MediaUploader 
                        isAvatar={true}
                        selectedMedia={selectedAvatar}
                        setSelectedMedia={setSelectedAvatar}
                    />
                </View>
                <Text style={styles.reminder}>Make sure to check your email address carefully.</Text>
                <TouchableOpacity 
                    onPress={submit}
                    style={styles.createAccountButton}
                >
                    {
                        submitted ? (
                            <Text style={styles.createAccountText}>... Creating</Text>
                        ) : (
                            <Text style={styles.createAccountText}>Create an account</Text>
                        )
                    }
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
/////////////////////////////////////////////////

/////////////////// Styles ///////////////////
const styles = {
    safeArea: {
        backgroundColor: Colors.black
    },

    backButton: {
        width: width * 0.1, 
        height: width * 0.1, 
        marginLeft: 20, 
        marginTop: 20,
        marginBottom: 20
    },

    scrollView: {
        width: width,
        minHeight: height,
        alignItems: "center"
    },

    logo: {
        width: width * 0.16,
        height: width * 0.16,
        marginBottom: 35
    },

    signUpText: {
        fontSize: width * 0.08, 
        fontWeight: "bold", 
        color: Colors.white,
        marginBottom: 40
    },

    avatarPromptWrapper: {
        width: width * 0.8
    },

    avatarPrompt: {
        fontSize: width * 0.045,
        color: Colors.smokeyWhite,
        fontWeight: "bold",
        marginBottom: 20
    },

    mediaUploaderWrapper: {
        width: width * 0.8
    },

    reminder: {
        fontSize: width * 0.03,
        color: Colors.smokeyWhite,
        marginTop: 50,
        marginBottom: 10
    },

    createAccountButton: {
        width: width * 0.8,
        height: width * 0.12,
        backgroundColor: Colors.white,
        marginBottom: 120,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    loader: {
        width: width * 0.2,
        height: width * 0.2
    },

    createAccountText: {
        fontSize: width * 0.04,
        fontWeight: "bold",
        color: Colors.black
    }
};
/////////////////////////////////////////////