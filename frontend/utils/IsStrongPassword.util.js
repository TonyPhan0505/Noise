export default (password, setPasswordError) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const criteriaWeights = {
        length: 1,
        upperCase: 1,
        lowerCase: 1,
        numbers: 1,
        specialChars: 1
    };

    let score = 0;
    if (password.length >= 8) score += criteriaWeights.length;
    if (hasUpperCase) score += criteriaWeights.upperCase;
    if (hasLowerCase) score += criteriaWeights.lowerCase;
    if (hasNumbers) score += criteriaWeights.numbers;
    if (hasSpecialChars) score += criteriaWeights.specialChars;

    if (score < 8) {
        setPasswordError(
            `Password is too weak. Password must contain at least 10 characters, an uppercase, a lowercase, a number and a special character.`
        );
    } else {
        setPasswordError("");
    }
}