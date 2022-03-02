#!/usr/bin/env node

const chalk = require('chalk');
const pegaArquivo = require('./index');
const validaUrls = require('./http-validacao')

const caminho = process.argv;

async function processaTexto(caminhoDoArquivo) {
    const resultado = await pegaArquivo(caminhoDoArquivo[2]);

    if (caminho[3] === 'validar') {
        console.log(chalk.yellow('lista validados'), await validaUrls(resultado));
    } else {
        console.log(chalk.yellow('lista de links'), resultado);
    }
}

processaTexto(caminho);