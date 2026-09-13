# Arquitetura do CineDash

## Geral

O CineDash foi organizado com uma arquitetura modular, inspirada em conceitos de Feature-Sliced Design.

A ideia principal foi separar bem as responsabilidades da aplicação, evitando que regras de negócio, componentes visuais, acesso à API e estado global ficassem misturados.

A estrutura foi dividida em algumas camadas principais:

- `app`
- `pages`
- `widgets`
- `features`
- `entities`
- `shared`

Não foi aplicado Feature-Sliced Design de forma rígida. A estrutura foi adaptada ao tamanho e à necessidade do projeto, mantendo principalmente a separação de responsabilidades e a facilidade de manutenção.

---

## Estrutura do projeto

```text
src/
├── app/
│   ├── providers/
│   └── router/
│
├── components/
│   └── ui/
│
├── entities/
│   ├── genre/
│   └── movie/
│
├── features/
│   ├── auth/
│   ├── movie-filters/
│   ├── movie-pagination/
│   ├── movie-search/
│   ├── theme/
│   └── watchlist/
│
├── pages/
│   ├── discover/
│   ├── login/
│   ├── movie-details/
│   └── watchlist/
│
├── shared/
│   ├── api/
│   ├── config/
│   ├── hooks/
│   ├── lib/
│   └── types/
│
├── test/
│
└── widgets/
    ├── app-shell/
    └── movie-grid/
```

> **P.S.:** A aplicação foi construída com carinho, código, café e muito punk rock tocando ao fundo