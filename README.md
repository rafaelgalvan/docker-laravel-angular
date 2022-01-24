
# Angular, Laravel, Docker, Redis, Mysql

### Passo a passo
1. Clone Repositório
```sh
git clone https://github.com/rafaelgalvan/docker-laravel-angular.git my-project
```

2. Navegar até a pasta do projeto:
```sh
cd my-project/
```

3. Iniciar os containers:
```sh
docker-compose up -d
```
caso não queira usar a flag “-d”, abra um novo terminal para prosseguir. O container Angular pode levar até 2 minutos pra iniciar devido a compilação.
Baixar todos os containers e compilar pode levar um tempo. Aguarde os containers subir para prosseguir para o passo 4.


4. Rodar um comando para gerar os arquivos de autoload no laravel com composer:
```sh
docker container exec laravel composer install
```
6. Rodar um comando para gerar as tabelas no banco de dados. As tabelas serão criadas sem nenhum registro:
```sh
docker container exec laravel php artisan migrate
```

Após executar os passos acima a aplicação está pronta para ser acessada nos links abaixo:

Backend: [http://localhost:8000](http://localhost:8000)

Frontend: [http://localhost:4200](http://localhost:4200)

Caso queira acessar um container isolado, execute:
```sh
docker-compose exec laravel_8 bash
```
```sh
docker-compose exec angular_13 bash
```
```sh
docker-compose exec mysql bash
```