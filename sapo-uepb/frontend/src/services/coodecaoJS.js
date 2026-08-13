''
let items = JSON.parse(
    localStorage.getItem("achados-items") || "[]"
);


// Elementos da página
const itemForm = document.getElementById("itemForm");
const itemsContainer = document.getElementById("items");
const itemCount = document.getElementById("count");
const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");

let selectedPhoto = null;


function renderItems() {

    // Atualiza a quantidade de itens
    itemCount.textContent = items.length;


    // Se não houver itens cadastrados
    if (items.length === 0) {

        itemsContainer.innerHTML = `
            <div class="empty">
                Nenhum item cadastrado ainda.
            </div>
        `;

        return;
    }


    // Monta os cards dos itens
    itemsContainer.innerHTML = items
        .map((item, index) => {

            const formattedDate = formatDate(item.date);

            return `
                <article class="item-row">

                    <div class="item-content">

                        ${
                            item.photo
                                ? `<img class="item-thumb" src="${item.photo}" alt="Foto de ${item.name}">`
                                : ""
                        }

                        <div class="item-text">

                            <div>
                                <b>
                                    ${item.name}
                                </b>

                                <span class="status">
                                    disponível
                                </span>
                            </div>


                            <p>
                                ${item.desc}
                            </p>


                            <small>
                                📍 ${item.location}
                                &nbsp;&nbsp;
                                ▣ ${formattedDate}
                            </small>

                        </div>

                    </div>


                    <div class="item-actions">

                        <button
                            type="button"
                            onclick="removeItem(${index})"
                        >
                            Remover
                        </button>

                    </div>

                </article>
            `;

        })
        .join("");
}




function formatDate(date) {

    if (!date) {
        return "";
    }

    return date
        .split("-")
        .reverse()
        .join("/");
}


async function removeItem(index) {

    const confirmation = confirm(
        "Deseja realmente remover este item?"
    );


    if (!confirmation) {
        return;
    }

    await fetch('http://localhost:3000/itens', 
        {   method: 'DELETE', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(
                {   id : index
                })});

    // Remove o item
    items.splice(index, 1);


    // Salva novamente no navegador
    saveItems();


    // Atualiza a tela
    renderItems();
}



function saveItems() {

    localStorage.setItem(
        "achados-items",
        JSON.stringify(items)
    );
}



photoInput.addEventListener("change", function () {

    const file = photoInput.files[0];

    if (!file) {
        selectedPhoto = null;
        photoPreview.style.display = "none";
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

        selectedPhoto = event.target.result;

        photoPreview.src = selectedPhoto;
        photoPreview.style.display = "block";
    };

    reader.readAsDataURL(file);
});



itemForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    // Recupera os campos
    const name = document
        .getElementById("name")
        .value
        .trim();


    const desc = document
        .getElementById("desc")
        .value
        .trim();


    const location = document
        .getElementById("location")
        .value
        .trim();


    const date = document
        .getElementById("date")
        .value;


    const contact = document
        .getElementById("contact")
        .value
        .trim();


    // Cria o novo item
    const newItem = {

        name: name,

        desc: desc,

        location: location,

        date: date,

        contact: contact,

        photo: selectedPhoto,

        available: true

    };
    await fetch('http://localhost:3000/itens', 
        {   method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(
                {   nome: name,
                    descricao: desc,
                    local_encontrado: location,
                    data_encontrada: date
                })});

    // Adiciona à lista
    items.push(newItem);


    // Salva no navegador
    saveItems();


    // Limpa o formulário
    itemForm.reset();


    // Restaura o contato padrão
    document.getElementById("contact").value =
        "Sala da Coordenação";


    // Limpa a foto selecionada e a prévia
    selectedPhoto = null;
    photoPreview.style.display = "none";
    photoPreview.src = "";


    // Atualiza a lista
    renderItems();

});




renderItems();