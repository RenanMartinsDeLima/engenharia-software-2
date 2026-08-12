


// Recupera os itens cadastrados
const items = JSON.parse(
    localStorage.getItem("achados-items") || "[]"
);


// Elementos
const publicItems = document.getElementById("publicItems");
const foundCount = document.getElementById("found");



function updateCount() {

    if (items.length === 1) {

        foundCount.textContent =
            "1 item encontrado";

    } else {

        foundCount.textContent =
            `${items.length} itens encontrados`;

    }
}


function renderItems() {

    // Nenhum item
    if (items.length === 0) {

        publicItems.innerHTML = `
            <div class="empty">
                Nenhum item cadastrado ainda.
            </div>
        `;

        return;
    }


    // Criar os cards
    publicItems.innerHTML = items
        .map(function (item) {

            const formattedDate =
                formatDate(item.date);


            const photoHtml = item.photo
                ? `<img class="card-photo" src="${item.photo}" alt="Foto de ${item.name}">`
                : "";


            return `
                <article class="public-card">

                    ${photoHtml}

                    <div>
                        <span class="status">
                            • disponível
                        </span>

                    </div>


                    <h2>
                        ${item.name}
                    </h2>


                    <p>
                        ${item.desc}
                    </p>


                    <hr>


                    <div>
                        📍 ${item.location}
                    </div>


                    <div>
                        🗓️ Encontrado em
                        ${formattedDate}
                    </div>


                    <div>
                        ☎ ${item.contact}
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



updateCount();

renderItems();