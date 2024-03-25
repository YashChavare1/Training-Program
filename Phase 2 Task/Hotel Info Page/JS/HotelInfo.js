function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateInput(inputElement, regex) {
    const isValid = regex.test(inputElement.value.trim());
    if (!isValid) {
        inputElement.style.border = "1px solid red";
        return false;
    } else {
        inputElement.style.border = "";
        return true;
    }
}

function validateNumber(inputElement) {
    const isValid = /^\d+$/.test(inputElement.value.trim());
    if (!isValid) {
        inputElement.style.border = "1px solid red";
        return false;
    } else {
        inputElement.style.border = "";
        return true;
    }
}

function subscribeBtn() {
    const email = document.getElementById("subscribeEmail");
    const label = document.getElementById("subscribeLabel");

    if (email.value.trim().length === 0) {
        email.style.border = "1px solid red";
        label.style.color = "red";
        label.innerHTML = "Enter Email";
        email.value = "";
        return;
    }

    const validEmail = validateEmail(email);
    if (!validEmail) {
        email.style.border = "1px solid red";
        label.style.color = "red";
        label.innerHTML = "Invalid Email";
        return;
    }

    email.style.border = "";
    label.style.color = "";
    label.innerHTML = "";
    alert("Email Registered Successfully");
}

function payment() {
    const fields = [
        { id: "firstName", regex: /^[A-Za-z]+$/, label: "fullName" },
        { id: "middleName", regex: /^[A-Za-z]+$/, label: "fullName" },
        { id: "lastName", regex: /^[A-Za-z]+$/, label: "fullName" },
        { id: "email", regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, label: "emailLabel" },
        { id: "phone", regex: /^\d+$/, label: "phoneLabel" },
        { id: "country", regex: /^[A-Za-z]+$/, label: "countryLabel" },
        { id: "cardHolderName", regex: /^[A-Za-z]+$/, label: "cardHolderLabel" },
        { id: "cardNumber", regex: /^\d+$/, label: "cardNumberLabel" },
        { id: "cardCvc", regex: /^\d+$/, label: "cardCvcLabel" }
    ];

    for (const field of fields) {
        const inputElement = document.getElementById(field.id);
        const isValid = validateInput(inputElement, field.regex);
        const labelElement = document.getElementById(field.label);

        if (!isValid) {
            inputElement.style.border = "1px solid red";
            if (field.id !== "phone") {
                labelElement.style.color = "red";
            }
        } else {
            inputElement.style.border = "";
            labelElement.style.color = "";
        }
    }

    const cardExp = document.getElementById("cardExp");
    const cardExpLabel = document.getElementById("cardExpLabel");
    const isValidExp = validateInput(cardExp, /^(0[1-9]|1[0-2])\/\d{2}$/);
    if (!isValidExp) {
        cardExp.style.border = "1px solid red";
        cardExpLabel.style.color = "red";
    } else {
        cardExp.style.border = "";
        cardExpLabel.style.color = "";
    }

    const isValidCvc = validateNumber(document.getElementById("cardCvc"));
    if (!isValidCvc || cardCvc.value.trim().length !== 3) {
        document.getElementById("cardCvc").style.border = "1px solid red";
        document.getElementById("cardCvcLabel").style.color = "red";
    } else {
        document.getElementById("cardCvc").style.border = "";
        document.getElementById("cardCvcLabel").style.color = "";
    }
}