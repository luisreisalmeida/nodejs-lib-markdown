const chalk = require('chalk');
const fs = require('fs');

function extraiLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResultados = [];

    let temp;
    while ((temp = regex.exec(texto)) !== null) {
        arrayResultados.push({ [temp[1]]: temp[2] });
    }

    return arrayResultados.length === 0 ? 'não há links' : arrayResultados;
}

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'erro ao pegar o arquivo.'));
}

//Modelo Assíncrono usando o async/await
async function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';

    try {
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        return extraiLinks(texto);
    } catch (erro) {
        trataErro(erro);
    } finally {
        console.log(chalk.yellow('operação concluída'));
    }
}

/* Pegando arquivos de um diretório
async function pegarArquivo(caminho) {
 const caminhoAbsoluto = path.join(__dirname, '..', caminho);
 const encoding = 'utf-8';
 try {
   const arquivos = await fs.promises.readdir(caminhoAbsoluto, { encoding });
   const result = await Promise.all(arquivos.map(async (arquivo) => {
     const localArquivo = `${caminhoAbsoluto}/${arquivo}`;
     const texto = await fs.promises.readFile(localArquivo, encoding);
     return extraiLinks(texto);
   }));
   return result;
 } catch (erro) {
   return trataErro(erro);
 }
}
*/
module.exports = pegaArquivo;

/*
Modelo Síncrono
function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';
    fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
        if (erro) {
            trataErro(erro);
        }
        console.log(chalk.green(texto));
    })
}
*/

/*
Modelo Assíncrono usando .then()
function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';
    fs.promises
        .readFile(caminhoDoArquivo, encoding)
        .then((texto) => console.log(chalk.green(texto)))
        .catch((erro) => trataErro(erro));
}
 */