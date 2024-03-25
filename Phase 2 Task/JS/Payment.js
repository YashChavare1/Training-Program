function validateField(input, label, regex = null) {
    const value = input.value.trim();
    const isValid = value !== "" && (!regex || regex.test(value));
    label.style.color = isValid ? "" : "red";
    input.style.border = isValid ? "" : "1px solid red";
    return isValid;
}

function formSubmit() {
    const fields = [
        { id: 'firstname', labelId: 'firstnameLabel', regex: /^[A-Za-z]+$/ },
        { id: 'lastname', labelId: 'lastnameLabel', regex: /^[A-Za-z]+$/ },
        { id: 'phone', labelId: 'phoneLabel', regex: /^\d{10}$/, message: 'Invalid Phone' },
        { id: 'cardNumber', labelId: 'cardNumberLabel', regex: /^\d+$/, message: 'Invalid Card Number' },
        { id: 'cvc', labelId: 'cvcLabel', regex: /^\d{3}$/, message: 'Invalid CVC' },
        { id: 'exp', labelId: 'expLabel', regex: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Invalid Expiry Date' }
    ];

    let allValid = true;

    fields.forEach(({ id, labelId, regex, message }) => {
        const input = document.getElementById(id);
        const label = document.getElementById(labelId);
        if (!validateField(input, label, regex)) {
            allValid = false;
            if (message) showError(input, label, message);
        }
    });

    if (allValid) {
        alert("Payment Success");
        window.location.reload();
    }
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function subscribeBtn() {
    const email = document.getElementById("subscribeEmail");
    const label = document.getElementById("subscribeLabel");
    const validEmail = validateEmail(email.value);

    if (email.value.trim() === "") {
        showError(email, label, "Enter Email");
    } else if (!validEmail) {
        showError(email, label, "Invalid Email");
    } else {
        hideError(email, label);
        alert("Email Registered Successfully");
        window.location.reload();
    }
}

function showError(input, label, message) {
    input.style.border = "1px solid red";
    label.style.color = "red";
    label.innerHTML = message;
    label.style.width = "100px";
}

function hideError(input, label) {
    input.style.border = "";
    label.style.color = "";
    label.innerHTML = "";
    label.style.width = "";
}