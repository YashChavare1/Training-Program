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