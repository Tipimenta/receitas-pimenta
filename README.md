<h1 align="center">
    <img alt="Capa" title="#Receitas Pimenta" src="./src/assets/img/cover.png/>
</h1>


# Receitas Pimenta

 ## Objetivo 🎯
 Desafio final da campinho digital, turma de front-end 2024 com objetivo de consumir uma API em React e fazer uso de Hooks.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Funcionalidades ✏️

- Pesquisa de receita por nome
- Cadastro de usuario
- Login para acesso a receitas favoritas
- Adicionar e remover dos favoritos
- Cards para visualizar receitas por categorias
- Cards para visualizar receitas por recomendads
- Modal para visualizar receita desejada
- Feito versão mobile


## Como Executar o Projeto 📌

Clone este repositório em sua máquina local.
Instale as dependências usando npm install.
Execute o projeto com npm start.
Acesse http://localhost:3000 em seu navegador para visualizar o projeto.

## Tecnologias Utilizadas 👨‍💻

### React.js

#### Gerenciamento de Estado
Para gerenciar o estado da aplicação e lidar com operações assíncronas, utilizamos os hooks useState e useEffect.

- useState: Para gerenciar o estado local dos componentes.
- useEffect: Para lidar com efeitos colaterais, como chamadas de API e outras operações assíncronas.

#### Comunicação com API
- fetch: Implementei a comunicação com APIs externas para buscar e enviar dados utilizando fetch para realizar as requisiçoes.

#### Roteamento
Para a navegação entre páginas, usamos a biblioteca react-router. Implementamos rotas e navegação de forma eficiente com os seguintes elementos:

- useAuth: Hook personalizado para gerenciar autenticação.
useNavigate: Hook para navegação programática.
- Router: Componente para definir e gerenciar as rotas da aplicação.

#### Autenticação
useAuth - Implementamos a autenticação de usuários utilizando um hook personalizado, que gerencia o estado de autenticação e protege rotas sensíveis.

#### Funcionalidades Adicionais
Debounce: Implementação de debounce no componente de busca para melhorar a performance e evitar requisições excessivas.


### HTML5

#### Estrutura Semântica
Adotamos tags semânticas do HTML5 para garantir uma estrutura de documento clara e acessível, melhorando a experiência de navegação para todos os usuários, incluindo aqueles que utilizam tecnologias assistivas.

#### Formulários e Entradas
Desenvolvemos formulários interativos e elementos de entrada para facilitar a busca de personagens, assegurando que sejam acessíveis e usáveis por todos os usuários.

#### Multimídia
Integramos imagens e outros elementos multimídia de forma eficiente, garantindo que todos os conteúdos sejam acessíveis, com o uso de descrições alternativas e legendas quando necessário.

### CSS3
#### Estilização Responsiva
Utilizamos media queries para garantir que a aplicação seja responsiva e adaptável a diferentes dispositivos e tamanhos de tela.

#### Animações e Transições
Implementamos animações suaves e transições para melhorar a experiência do usuário.

#### Flexbox
Utilizamos Flexbox para criar layouts complexos e fluidos com facilidade.


## Melhorias
- Refatorar 
- Incluir mais acessibilidade por meio de "Text Resizer"
- Incluir botão de imprimir receitas
- Incluir botão de compartilar receitas
- Incluir sessão para adicionar novas receitas


## Contribuições 🤝

Contribuições são sempre bem-vindas! 😄


