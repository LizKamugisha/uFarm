// Accessing form elements by name
const validateSignup = () => {
    const name = document.ufarmSignup.name;
    const username = document.ufarmSignup.username;
    const password = document.ufarmSignup.password;
    const role = document.ufarmSignup.role;

// Validation Style: Show warning text below form input (instead of pop up alert) using .innerHTML

// Name Validation = 5 to 50 alphabetic characters only
let nameRegex = /^[a-zA-Z\s]{5,50}$/;
if(nameRegex.test(name.value) == false){
    name.style.border = "1px solid red";
    text = "<b>*Name is invalid.</b> Please use 5<50 alphabetic characters only.";
    document.getElementById("nameAlert").innerHTML = text;
    return false;
} else {
    name.style.border = "";
    text = "";
    document.getElementById("nameAlert").innerHTML = text;
  }

// Username Validation = 5 to 12 alphanumeric characters only
let userRegex = /^[0-9a-zA-Z]{5,12}$/;
if (userRegex.test(username.value) == false) {
    username.style.border = "1px solid red";
    text = "<b>*Username is invalid.</b> Please use 5<12 alphanumeric characters only.";
    document.getElementById("usernameAlert").innerHTML = text;
    return false;
} else {
    username.style.border = "";  
    text = "";
    document.getElementById("usernameAlert").innerHTML = text; 
  }

// Password Validation = 6 to 12 charcters, inclusive of letters, numbers & special characters
let pwdRegex = /^(?=.*\d)(?=.*[0-9a-zA-Z]).{5,12}$/;
if (pwdRegex.test(password.value) == false) {
    password.style.border = "1px solid red";
    text = "<b>*Password is invalid.</b> Please use 5<12 characters. Letters, numbers & special characters are allowed";
    document.getElementById("pwdAlert").innerHTML = text;
    return false;
} else {
    password.style.border = "";
    text = "";
    document.getElementById("pwdAlert").innerHTML = text;
  }
  
// Role Validation = role selection is mandatory
if (role.value == "default") {
    role.style.border = "1px solid red";
    text = "<b>*Dont forget to select your role!</b>";
    document.getElementById("selectAlert").innerHTML = text;
    return false;
} else {
    role.style.border = "";
    text = "";
    document.getElementById("selectAlert").innerHTML = text;
    return true;
  }
};
