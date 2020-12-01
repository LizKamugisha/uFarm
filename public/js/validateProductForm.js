// Accessing form elements by name
const validateProductForm = () => {
    const productName = document.productForm.productName;
    const productImage = document.productForm.image;
    const organic = document.getElementById('productTypeO');
    const nonOrganic = document.getElementById('productTypeNO');
    const price = document.productForm.unitPrice;
    const quantity = document.productForm.quantity;
    const productDate = document.productForm.productDate;
    const payCash = document.getElementById('paymentC');
    const payMM = document.getElementById('paymentMM');
    const delivery1 = document.getElementById('deliveryPU');
    const delivery2 = document.getElementById('deliveryHD');
    const address = document.productForm.address;
    const ward = document.productForm.selectWard;
    const status = document.productForm.status;

// Product Name Validation = 3 to 30 alphabetic characters only
let prodNameRegex = /^[a-zA-Z\s]{3,30}$/;
if(prodNameRegex.test(productName.value) == false){
    productName.style.border = "1px solid red";
    text = "<b>*Product Name is invalid.</b> Please use 3<30 alphabetic characters only.";
    document.getElementById("prodNameAlert").innerHTML = text;
} else {
    productName.style.border = "";
    text = "";
    document.getElementById("prodNameAlert").innerHTML = text;
  }

// Product Image Validation ?

// Product Type Validation = Type must be selected
if(organic.checked == false && nonOrganic.checked == false){
    text = "*<b>Please select the product type.</b>";
    document.getElementById("pTypeAlert").innerHTML = text;
} else {
    text = "";
    document.getElementById("pTypeAlert").innerHTML = text; 
    }

// Price Validation = 1 - 7 numeric characters only
let priceRegex = /^[0-9]{1,7}$/;
if (priceRegex.test(price.value) == false) {
    price.style.border = "1px solid red";
    text = "<b>*Price number is invalid.</b> Please use numeric characters only.";
    document.getElementById("priceAlert").innerHTML = text;
} else {
    price.style.border = "";  
    text = "";
    document.getElementById("priceAlert").innerHTML = text; 
  }

// Quantity Validation = 1 to 12 alphanumeric characters only
let qtyRegex = /^[0-9a-zA-Z]{1,12}$/;
if (qtyRegex.test(quantity.value) == false) {
    quantity.style.border = "1px solid red";
    text = "<b>*Quantity is invalid.</b> Please use 1<12 alphanumeric characters only.";
    document.getElementById("qtyAlert").innerHTML = text;
} else {
    quantity.style.border = "";  
    text = "";
    document.getElementById("qtyAlert").innerHTML = text; 
  }

// Product Date Validation = DD/MM/YYYY
// let dateRegex = /^(?:(?:(?:29([-/])02(?:\1)(?:(?:(?:1[8-9]|20)(?:04|08|[2468][048]|[13579][26]))|2000))|(?:(?:(?:0[1-9]|1[0-9]|2[0-8])([-/])(?:0[1-9]|1[0-2]))|(?:29|30)([-/])(?:0(?:1|[3-9])|(?:1[0-2]))|31([-/])(0[13578]|1[02]))(?:\2|\3|\4)(?:1[8-9]|20)\d\d))/;
// if (dateRegex.test(productDate.value) == false) {
//     productDate.style.border = "1px solid red";
//     text = "<b>*Date is invalid.</b> Please select a valid date.";
//     document.getElementById("productDateAlert").innerHTML = text;
// } else {
//     productDate.style.border = "";  
//     text = "";
//     document.getElementById("productDateAlert").innerHTML = text; 
//   }

// Mode of Payment Validation = Option must be selected
if(payCash.checked == false && payMM.checked == false){
    text = "*<b>Please select a payment option.</b>";
    document.getElementById("paymentAlert").innerHTML = text;
} else {
    text = "";
    document.getElementById("paymentAlert").innerHTML = text; 
    }

// Mode of Delivery Validation = Option must be selected
if(delivery1.checked == false && delivery2.checked == false){
    text = "*<b>Please select a delivery option.</b>";
    document.getElementById("deliveryAlert").innerHTML = text;
} else {
    text = "";
    document.getElementById("deliveryAlert").innerHTML = text; 
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

// Status Validation = Status selection is mandatory
if (status.value == "default") {
    status.style.border = "1px solid red";
    text = "<b>*Please select your status.</b>";
    document.getElementById("statusAlert").innerHTML = text;
} else {
    status.style.border = "";
    text = "";
    document.getElementById("statusAlert").innerHTML = text;
  }
};