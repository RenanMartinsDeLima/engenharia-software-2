const abrirBanco = require('./abrir-banco');

async function main() {
  try {
    const db = await abrirBanco();
    console.log('Banco criado/aberto com sucesso!');
    console.log('Tabela usuarios criada!');
    
    const tabelas = await db.all(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
    `);
    console.log('Tabelas:', tabelas);

    // const estrutura = await db.all(`
    // PRAGMA table_info(usuarios)
    // `);
    // console.log('Estrutura:', estrutura);

    const usuarios = await db.all('SELECT * FROM usuarios');
    console.log('Usuários:', usuarios);
    
    await db.close();

  } catch (erro) {
    console.error('Erro:', erro);
  }
}

main();