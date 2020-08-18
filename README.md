# react-i18n-routes

React multi-language routes

## Based on

- react-router
- react-i18n
- use-react-router-breadcrumbs

## Features

### Translated, Prefixed and persistent URLs

```
http://localhost:3000/articles/article-1
http://localhost:3000/ro/articles-ro/article-1-ro
```

- Resources (`article-1`) are translated via the API.
- Resource containers (`articles`) are translated via i18n.
- URLs are persistent. They are always available and shareable.

### Language selector

- On language change the URL is translated.
- The API must support this feature, ie. to provide queries to resources based also on the language attribute. Like `GET article/{:slug or :id}/:language`

### Breadcrumbs

- Breadcrumbs are translated and update themselves on language change.

### 404 page

- Invalid URLs redirect to a 404 page.

## How it works

### Single responsibility principle

Components are responsible to localize themselves and declare their route needs.

```js
// src/components/Articles/Articles.lang.ro-ro.js
const ro_ro = {
  Articles: "Articles (RO)",
  articles: "articles-ro"
};

export { ro_ro };
```

```js
// src/components/Home/Home.data.js
const defaultProps = {
  routes: [{ id: shortid.generate(), path: "/articles", component: Articles }]
  ...
};
```

```js
// src/components/Routes/Routes.data.js
...HomeDefaultProps.routes,
{ id: shortid.generate(), path: "/", exact: true, component: Home },
{ id: shortid.generate(), path: "*", component: RouteNotFound }
```
