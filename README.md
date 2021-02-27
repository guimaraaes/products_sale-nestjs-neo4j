# products_sale-nestjs-neo4j

Aplicação backend com o framework [NestJS](https://nestjs.com/) e o banco de dados em grafos [Neo4j](https://neo4j.com/). Nesta aplicação é realizado o controle de vendas de produtos de um mercados. Pelo diagrama dos grafos observa-se as entidades e os relacionamentos possíveis entre si. Tanto as entidades como alguns relacionamentos podem ter atributos.

### Descrição das entidades 

Pela modelagem do sistema temos as seguintes observações, 

- **Mercado** (com nome e endereço) está localizado em uma **Cidade** (com nome, estado e país), tem clientes (com o somatório da quantidade já comprada) e tem produtos (com quantidade disponível, somatório quantidade vendida e quantidade de vendas).

- Para **Funcionário** ou **Cliente** há o relacionamento LIVE_ON identificando a Cidade onde este mora e desde qual data mora nesta. Em caso de mudança de cidade o relacionamento LIVE_ON torna-se LIVED_ON com a identificação do data de saída.

- **Cliente** relaciona-se com cada produto pela compra destes com a identificação da quantidade deste produto já comprados pelo cliente.

- **Funcionário** (com nome, departamento, e-mail e senha) relacionam-se com a identificação de mercado onde trabalha (desde quando trabalha, somatório da quantidade já vendida e o quantidade de vendas). Relacionam-se também com quais vendas este funcionário realizou identificando a comissão recebida, a data e uma referência para o cliente e para o produto.

- **Venda** identificado com o tipo de pagamento, quantidade de parcelas, total da venda, quantidade comprada do produto e data. Relaciona-se com o mercado onde foi realizada, o cliente que comprou e o produto comprado.

- **Produto** identificado pelo nome, quantidade, quantidade disponível e valor.


![img](https://raw.githubusercontent.com/guimaraaes/products_sale-nestjs-neo4j/master/arrow-schema/v2.svg)

### Outras observações

- Autenticação [JWT](https://jwt.io/) para proteger a API e o acesso é permitido para os funcionário autenticados com os atributos e-mail e password. 

- Documentação da API com o [Swagger](https://swagger.io/).


### :mailbox: Dúvidas? Me manda um [e-mail](sguimaraaes@gmail.com) 

<img src="https://raw.githubusercontent.com/guimaraaes/guimaraaes/master/assets/card-readme.png" >

### :globe_with_meridians: para me encontrar na web
[![LinkedIn](https://img.shields.io/badge/-LINKEDIN-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sara-guimar%C3%A3es-negreiros-aa2382155/)
[![GitHub](https://img.shields.io/badge/github-%23100000.svg?&style=for-the-badge&logo=github&logoColor=white)](https://guimaraaes.github.io/guimaraaes/)
[<img height="25" src="https://i.imgur.com/2iVxee6.png">![Lattes](https://img.shields.io/badge/lattes-%23100000?logoColor=blue&style=for-the-badge)](http://lattes.cnpq.br/7082901769077209)
