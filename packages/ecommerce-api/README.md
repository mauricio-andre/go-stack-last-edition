<h1 align="center">
  ECOMMERCE-API
</h1>

<p align="center">
  <a href="#lista-de-correspondências">Lista de correspondências</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#testando-a-API">Testando a API</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#execução">Execução</a>
</p>

---
<br />

## Lista de correspondências
* [Desafio 09: Relacionamentos com banco de dados no Node.js](./_instruction/Desafio09.md)

## Sobre o projeto
Este projeto é uma implementação simples de um projeto de e-commerce que permite o cadastro de customers, products e orders. Demonstra o relacionamento de tabelas N:N e foi construido com os melhores padrões de projeto.

## Testando a API
Este projeto contem testes automatizados de suas rotas, para executar esses testes execute o comando `yarn test` após instalar as dependências do mesmo.

Os testes para as rotas desta API podem ser realizados manualmente por meio de qualquer ferramenta que teste rotas de uma API REST. Dentro da pasta [client](./client) deste projeto você encontrará esquemas de requisição http que podem ser enviados diretamente por meio de sua IDE, se você estiver usando VS Code, instale a extensão *REST Client* para fazer uso deste recurso.

## Execução
Para executar este projeto acesse o diretório do mesmo por meio do terminal e execute os comandos abaixo:
- `yarn install`
- `yarn dev:server`
