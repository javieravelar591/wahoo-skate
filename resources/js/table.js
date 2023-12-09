
window.addEventListener("DOMContentLoaded", ()=>{
    // const tableElement = document.getElementById("contact-list");
    async function removeRow() {
        const buttons = document.querySelectorAll("#delete-button")
        console.log(buttons);
        buttons.forEach((button) => {
            console.log(button);
            button.addEventListener("click", async ()=> {
                let currentRow = button.parentNode.parentNode;
                // console.log(currentRow);
                let next_id = currentRow.getElementsByClassName('next-id')[0].innerHTML;
                // console.log(next_id);
                const result = await fetch("/api/contact", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({"next_id": next_id})
                })
                
                if (result.ok) {
                    currentRow.remove();
                }
                else {
                    console.log("Error")
                }
            })

        })
    }  
    removeRow();

    async function updateSale() {
        let deleteSaleButton = document.getElementById("delete-sale")
        deleteSaleButton.addEventListener("click", async() => {
            const result = await fetch("/api/sale", {
                method: "DELETE",
            });
    
            if (result.ok) {
                console.log("Sale has ended");
            }
            else{
                console.log("Some error");
            }
        })

        let setSaleButton = document.getElementById("set-sale");
        let messageInput = document.getElementById("sale-message");
        setSaleButton.addEventListener("click", async() => {
            const message = messageInput.value;
            const result = await fetch("/api/sale", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"message": message})
            })

            if (result.ok) {
                console.log("Message sent");
            }
            else {
                console.log("Message error");
            }
        })
    }
    updateSale();
    
    // updateSale()
    function addTimeUntil() {
        const dateElements = document.querySelectorAll('.date');
        dateElements.forEach((dateElement) => {
            // console.log(dateElement);
            var dateValue = dateElement.innerHTML;
            var countdownDate = new Date(dateValue);
            var currentDate = new Date();
    
            var difference = countdownDate - currentDate;
    
            var days = Math.floor(difference / (1000 * 60 * 60 * 24));
            var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            // let timeElements = document.querySelector('.time-until');
            let row = dateElement.closest('tr')
            let timeElement = row.querySelector('.time-until')
            if (difference < 0) {
                timeElement.innerHTML = "Date Passed"
            }
            else {
                timeElement.innerHTML = days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds"
            }

    
        })
    }
    
    addTimeUntil();
    setInterval(addTimeUntil, 1000);

})