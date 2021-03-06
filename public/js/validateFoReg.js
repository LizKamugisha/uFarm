// Accessing form elements by name
const validateFoReg = () => {
    const name = document.foReg.name;
    const ward = document.foReg.selectWard;
    const ufarmID = document.foReg.ufarmID;
    const date = document.foReg.regDate;
    const genderM = document.foReg.male;
    const genderF = document.foReg.female;
    const birthday = document.foReg.birthday;
    const nationalID = document.foReg.nin;
    const phone = document.foReg.phone;
    const activity = document.foReg.activities;
    const residence = document.foReg.residence;
    const homestay = document.foReg.homeStay;
    const address = document.foReg.address;
    const username = document.foReg.username;
    const password = document.foReg.password;
    const role = document.foReg.role;
    

// Validation Style: Show warning text below form input (instead of pop up alert) using .innerHTML

// Name Validation = 5 to 50 alphabetic characters only
let nameRegex = /^[a-zA-Z\s]{5,50}$/;
if(nameRegex.test(name.value) == false){
    name.style.border = "1px solid red";
    text = "<b>*Name is invalid.</b> Please use 5<50 alphabetic characters only.";
    document.getElementById("nameAlert").innerHTML = text;
} else {
    name.style.border = "";
    text = "";
    document.getElementById("nameAlert").innerHTML = text;
  }

// Ward Validation = ward selection is mandatory
if (ward.value == "default") {
    ward.style.border = "1px solid red";
    text = "<b>*Please select your urban ward.</b>";
    document.getElementById("wardAlert").innerHTML = text;
} else {
    ward.style.border = "";
    text = "";
    document.getElementById("wardAlert").innerHTML = text;
  }

// Ufarm ID Validation = 5 to 12 alphanumeric characters only
let ufIDRegex = /^[0-9a-zA-Z]{5,12}$/;
if (ufIDRegex.test(ufarmID.value) == false) {
    ufarmID.style.border = "1px solid red";
    text = "<b>*Ufarm ID is invalid.</b> Please use 5<12 alphanumeric characters only.";
    document.getElementById("ufIdAlert").innerHTML = text;
} else {
    ufarmID.style.border = "";  
    text = "";
    document.getElementById("ufIdAlert").innerHTML = text; 
  }

// Date Validation = DD/MM/YYYY
// let dateRegex = /^(?:(?:(?:29([-/])02(?:\1)(?:(?:(?:1[8-9]|20)(?:04|08|[2468][048]|[13579][26]))|2000))|(?:(?:(?:0[1-9]|1[0-9]|2[0-8])([-/])(?:0[1-9]|1[0-2]))|(?:29|30)([-/])(?:0(?:1|[3-9])|(?:1[0-2]))|31([-/])(0[13578]|1[02]))(?:\2|\3|\4)(?:1[8-9]|20)\d\d))/;
// if (dateRegex.test(date.value) == false) {
//     date.style.border = "1px solid red";
//     text = "<b>*Date is invalid.</b> Please select a valid date.";
//     document.getElementById("regDateAlert").innerHTML = text;
// } else {
//     date.style.border = "";  
//     text = "";
//     document.getElementById("regDateAlert").innerHTML = text; 
//   }

// Gender Validation = Gender must be selected
if(genderM.checked == false && genderF.checked == false){
    text = "*<b>Please select your gender.</b>";
    document.getElementById("genderAlert").innerHTML = text;
} else {
    text = "";
    document.getElementById("genderAlert").innerHTML = text; 
    }

// Birthdate Validation = DD/MM/YYYY
// let bdRegex = /^(?:(?:(?:29([-/])02(?:\1)(?:(?:(?:1[8-9]|20)(?:04|08|[2468][048]|[13579][26]))|2000))|(?:(?:(?:0[1-9]|1[0-9]|2[0-8])([-/])(?:0[1-9]|1[0-2]))|(?:29|30)([-/])(?:0(?:1|[3-9])|(?:1[0-2]))|31([-/])(0[13578]|1[02]))(?:\2|\3|\4)(?:1[8-9]|20)\d\d))/;
// if (bdRegex.test(birthday.value) == false) {
//     birthday.style.border = "1px solid red";
//     text = "<b>*Date is invalid.</b> Please select a valid date.";
//     document.getElementById("birthdayAlert").innerHTML = text;
// } else {
//     birthday.style.border = "";  
//     text = "";
//     document.getElementById("birthdayAlert").innerHTML = text; 
//   }

// National ID Validation = 13 alphanumeric characters only
let ninRegex = /^[0-9a-zA-Z]{13}$/;
if (ninRegex.test(nationalID.value) == false) {
    nationalID.style.border = "1px solid red";
    text = "<b>*National ID is invalid.</b> Please use 13 alphanumeric characters only.";
    document.getElementById("ninAlert").innerHTML = text;
} else {
    nationalID.style.border = "";  
    text = "";
    document.getElementById("ninAlert").innerHTML = text; 
  }

// Phone Validation = 10 - 12 numeric characters only
let phoneRegex = /^[0-9]{10,12}$/;
if (phoneRegex.test(phone.value) == false) {
    phone.style.border = "1px solid red";
    text = "<b>*Phone Number is invalid.</b> Please use numeric characters only.";
    document.getElementById("phoneAlert").innerHTML = text;
} else {
    phone.style.border = "";  
    text = "";
    document.getElementById("phoneAlert").innerHTML = text; 
  }

// Activities Checkbox Validation = Activity must be selected
if(activity.checked == false ){
    text = "*Please select at least one activity.";
    document.getElementById("activityAlert").innerHTML = text;
} else {
    text = "";
    document.getElementById("activityAlert").innerHTML = text; 
    }

// Residence Selection Validation = residence selection is mandatory
if (residence.value == "default") {
    residence.style.border = "1px solid red";
    text = "<b>*Dont forget to select your residence!</b>";
    document.getElementById("residenceAlert").innerHTML = text;
} else {
    residence.style.border = "";
    text = "";
    document.getElementById("residenceAlert").innerHTML = text;
  }

// HomeStay Selection Validation = option must be selected
if (homestay.value == "default") {
    homestay.style.border = "1px solid red";
    text = "<b>*Please select an option!</b>";
    document.getElementById("homestayAlert").innerHTML = text;
} else {
    homestay.style.border = "";
    text = "";
    document.getElementById("homestayAlert").innerHTML = text;
  }

// Address Validation = 5 to 50 alphabetic characters only
let addyRegex = /^[a-zA-Z\s]{5,50}$/;
if(addyRegex.test(address.value) == false){
    address.style.border = "1px solid red";
    text = "<b>*Address is invalid.</b> Please use 5<50 alphabetic characters only.";
    document.getElementById("addyAlert").innerHTML = text;
} else {
    address.style.border = "";
    text = "";
    document.getElementById("addyAlert").innerHTML = text;
  }

// Username Validation = 5 to 12 alphanumeric characters only
let userRegex = /^[0-9a-zA-Z]{5,12}$/;
if (userRegex.test(username.value) == false) {
    username.style.border = "1px solid red";
    text = "<b>*Username is invalid.</b> Please use 5<12 alphanumeric characters only.";
    document.getElementById("usernameAlert").innerHTML = text;
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
} else {
    role.style.border = "";
    text = "";
    document.getElementById("selectAlert").innerHTML = text;
  }
};