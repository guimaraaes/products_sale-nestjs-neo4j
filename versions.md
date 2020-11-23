
## Sistema
API de gerenciamento de produtos, vendas e clientes em um estoque com NestJs e Neo4j.


# VERSÕES
## Stoke, Product, Sale, Client v1
  ### Database
- [x] Stoke
  - [x] HAS_PRODUCT
  - [x] HAS_CLIENT
- [x] Product
- [x] Sale
  - [x] FROM_CLIENT
  - [x] FROM_PRODUCT 
  - [x] DONE_ON
- [x] Client
  - [x] HAS_SALE_PRODUCT 

  ### Api
- [x] Validação dos dados
- [x] Manipulações para Stokes
- [x] Mensagens de node não encontrado
- [x] Verificar product indisponível
<!-- - [ ] CONSTRAINTS nos nomes dos objetos -->
- [x] Renomear as variáveis

<img src="https://raw.githubusercontent.com/guimaraaes/products_sale-nestjs-neo4j/master/arrow-schema/v1.svg">

## Staff e City v2
  ### Database
- [ ] Staff
  - [ ] HAS_DONE_SALE
  - [ ] WORKS_ON
- [ ] City
  - [ ] LOCALED_ON
  - [ ] LIVES_ON

  ### Api
  - [ ] Autenticação com JWT
  - [ ] Get melhores funcionários
  - [ ] Get quantidade de clientes por cidade
  - [ ] Get quantidade de funcionários por cidade
  - [ ] Get clientes
  - [ ] Get produtos
  - [ ] Get funcionários
  - [ ] Get
  
  <img src="https://raw.githubusercontent.com/guimaraaes/products_sale-nestjs-neo4j/master/arrow-schema/v2.svg">

