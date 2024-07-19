let data = [
    "Mouse",
    "Teclado",
    "Celular"
];

function buscar() {
    let query = document.getElementById("buscar").value;
    console.log(query);

    let resultsContainer = document.getElementById("results");
    let closeButton = document.querySelector(".close-btn");

    if (query.trim() === "") {
        resultsContainer.innerHTML = "";
        resultsContainer.style.display = "none";
        closeButton.style.display = "none";
        return;
    }

    resultsContainer.style.display = "block";
    closeButton.style.display = "block";

    let results = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].toLowerCase().includes(query.toLowerCase())) {
            results.push(data[i]);
        }
    }

    resultsContainer.innerHTML = "";

    if (results.length > 0) {
        for (let i = 0; i < results.length; i++) {
            let li = document.createElement("li");
            li.textContent = results[i];
            resultsContainer.appendChild(li);
        }
    } else {
        let li = document.createElement("li");
        li.textContent = "No se encontró ningún resultado: " + query;
        resultsContainer.appendChild(li);
    }
}

function cerrarResultados() {
    document.getElementById("results").style.display = "none";
    document.querySelector(".close-btn").style.display = "none";
    document.getElementById("buscar").value = "";
}
