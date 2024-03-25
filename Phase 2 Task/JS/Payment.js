function validateField(input, label) {
    if (input.value.trim() === "") {
        label.style.color = "red";
        input.style.border = "1px solid red";
        return false;
    } else {
        label.style.color = "";
        input.style.border = "";
        return true;
    }
}

function formSubmit() {
    const firstname = document.getElementById('firstname');
    const firstnameLabel = document.getElementById('firstnameLabel');
    const lastname = document.getElementById('lastname');
    const lastnameLabel = document.getElementById('lastnameLabel');
    const phone = document.getElementById('phone');
    const phoneLabel = document.getElementById('phoneLabel');
    const cardNumber = document.getElementById('cardNumber');
    const cardNumberLabel = document.getElementById('cardNumberLabel');
    const cvc = document.getElementById('cvc');
    const cvcLabel = document.getElementById('cvcLabel');
    const exp = document.getElementById('exp');
    const expLabel = document.getElementById('expLabel');

    const firstnameValid = validateField(firstname, firstnameLabel);
    const lastnameValid = validateField(lastname, lastnameLabel);
    const phoneValid = validateField(phone, phoneLabel);
    const cardNumberValid = validateField(cardNumber, cardNumberLabel);
    const cvcValid = validateField(cvc, cvcLabel);
    const expValid = validateField(exp, expLabel);

    if (firstnameValid && lastnameValid && phoneValid && cardNumberValid && cvcValid && expValid) {
        alert("Payment Success")
        window.location.reload();
    }
}

function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function subscribeBtn() {
    const email = document.getElementById("subscribeEmail");
    const label = document.getElementById("subscribeLabel");
    const validEmail = validateEmail(email.value);

    if(email.value.trim() === "") {
        subscribeEmail.style.border = "1px solid red";
        label.style.color = "red";
        label.innerHTML="Enter Email";
        label.style.width="100px";
        return
    }
    else if(!validEmail) {
        subscribeEmail.style.border = "1px solid red";
        label.style.color = "red";
        label.innerHTML="Invalid Email";
        label.style.width="100px";
        return;
    }
    else {
        subscribeEmail.style.border = "";
        label.style.color = "";
        label.innerHTML="";
        label.style.width="";
        alert("Email Registered Successfully");
        window.location.reload();
    }
}