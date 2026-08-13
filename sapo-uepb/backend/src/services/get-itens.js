async function cadastrarItens(name, desc, location, date) {
  try {
    const response = await fetch("http://localhost:3000/itens", 
      {
        method : "POST",
        body : JSON.stringify({nome:name, descricao:desc, local_encontrado:location, data_encontrada:date})
      });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error("Erro:", error);
  }
}

// buscarItens();
module.exports = cadastrarItens;