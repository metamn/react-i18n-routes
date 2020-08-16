# react-i18n-routes

React multi-language routes

## Based on

- react-router
- react-i18n
- use-react-router-breadcrumbs

## Features

### Prefixed routes

```
http://localhost:3000/articles/article-1
http://localhost:3000/ro/articles-ro/article-1-ro
```

### Language selector

- When a language is changed the homepage is displayed
- If the back-end provides a mechanism to connect translations then on language change the current page can be preserved

### Breadcrumbs

- Breadcrumbs are translated and update themselves on language change

## How it works

### Single responsibility principle

- Components are responsible to localize themselves and declare their route needs
