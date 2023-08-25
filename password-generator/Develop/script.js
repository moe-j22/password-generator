// element refs
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  passwordText.value = password;
}

// Generate a random password based on user criteria
function generatePassword() {
  var length = promptPasswordLength();
  var characterTypes = promptCharacterTypes();

  var selectedCharacterTypes = "";
  var generatedPassword = "";

  // Prepare selected character types
  if (characterTypes.lowercase) {
    selectedCharacterTypes += "abcdefghijklmnopqrstuvwxyz";
  }
  if (characterTypes.uppercase) {
    selectedCharacterTypes += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (characterTypes.numbers) {
    selectedCharacterTypes += "0123456789";
  }
  if (characterTypes.specialCharacters) {
    selectedCharacterTypes += "!@#$%^&*()_+{}[]<>?|";
  }

  // Generate the password
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * selectedCharacterTypes.length);
    generatedPassword += selectedCharacterTypes.charAt(randomIndex);
  }

  return generatedPassword;
}

// Prompt user for password length
function promptPasswordLength() {
  var length = parseInt(prompt("Enter password length (8-128 characters):"));
  while (isNaN(length) || length < 8 || length > 128) {
    length = parseInt(prompt("Please enter a valid length (8-128 characters):"));
  }
  return length;
}

// Prompt user for character types
function promptCharacterTypes() {
  var lowercase = confirm("Include lowercase letters?");
  var uppercase = confirm("Include uppercase letters?");
  var numbers = confirm("Include numbers?");
  var specialCharacters = confirm("Include special characters?");
  
  // Validate that at least one character type is selected
  if (!(lowercase || uppercase || numbers || specialCharacters)) {
    alert("You must select at least one character type.");
    return promptCharacterTypes(); // Recursive call to re-prompt
  }
  
  return {
    lowercase: lowercase,
    uppercase: uppercase,
    numbers: numbers,
    specialCharacters: specialCharacters
  };
}
