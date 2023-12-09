
var selectElement = document.getElementById("xp-level");
const emailElement = document.getElementById("email-input");
const nameElement = document.getElementById("name-input");

var result = document.getElementById("price-calculation");

selectElement.addEventListener("change", calculatePrice);
emailElement.addEventListener("change", calculatePrice);
nameElement.addEventListener("change", calculatePrice);


function calculatePrice() {
    var standardRate = 25.0; // standard hourly rate
    var experience = selectElement.value;
    var name = nameElement.value;
    const domain = emailElement.value.split("@")[1];
    
    if (experience === "Brand New") {
        standardRate = standardRate // base rate for newbies
    }
    else if (experience === "Intermediate") {
        standardRate = standardRate * 1.25 // 25% increase for better people
    }
    else if (experience === "Pretty Good") {
        standardRate = standardRate * 1.5 // 50% increase for even better people
    }
    else if (experience === "Steezy") {
        standardRate = standardRate * 1.75 // 75% for good people, need specailized instructors
    }

    if (domain === "umn.edu"){
        standardRate = standardRate * .75 // 25 percent discount for umn students
    }

    if (name.startsWith("Javier") || name.startsWith("javier")) {
        standardRate = 0; // :)
    } 

    result.innerText = "$ " + standardRate + " for 1-hour session";
}

