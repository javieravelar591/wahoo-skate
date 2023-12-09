window.addEventListener("load", function () {
    const toggleButton = document.getElementById("dark-button");
    let theme = localStorage.getItem("theme");

    if (theme === null) {
        localStorage.setItem("theme", "light");
        theme = "light";
    }

    if (theme == "dark") {
        document.body.classList.add("dark-mode", "dark-nav");
    }

    toggleButton.addEventListener("click", function () {
        theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.body.classList.remove("dark-mode", "dark-nav");
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.add("dark-mode", "dark-nav");
            localStorage.setItem("theme", "dark");
        }
    });

    async function showBanner() {
        const saleBanner = document.getElementById("sale-div");

        const result = await fetch("/api/sale");
        if (result.ok) {
            const saleJson = await result.json()
            saleBanner.innerHTML = saleJson.message
        }
        
    }
    showBanner();
    setInterval(showBanner, 1000);
});