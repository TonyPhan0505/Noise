export default (password, setPasswordError) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password) || password.length < 10) {
        setPasswordError(
            `Password is too weak. Password must contain at least 10 characters, an uppercase, a lowercase, a number and a special character.`
        );
    } else {
        setPasswordError("");
    }
}