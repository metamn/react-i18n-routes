import { Server, Model } from "miragejs";

const makeServer = () => {
  let server = new Server({
    models: {
      article: Model
    },

    seeds(server) {
      server.create("article", {
        name: "Article 1",
        slug: "article-1",
        lang: "en-US",
        multilangID: "1"
      });
      server.create("article", {
        name: "Article 2",
        slug: "article-2",
        lang: "en-US",
        multilangID: "2"
      });
      server.create("article", {
        name: "Article 3",
        slug: "article-3",
        lang: "en-US",
        multilangID: "3"
      });
      server.create("article", {
        name: "Article 1 (RO)",
        slug: "article-1-ro",
        lang: "ro-RO",
        multilangID: "1"
      });
      server.create("article", {
        name: "Article 2 (RO)",
        slug: "article-2-ro",
        lang: "ro-RO",
        multilangID: "2"
      });
      server.create("article", {
        name: "Article 3 (RO)",
        slug: "article-3-ro",
        lang: "ro-RO",
        multilangID: "3"
      });
      server.create("article", {
        name: "Article 1 (HU)",
        slug: "article-1-hu",
        lang: "hu-HU",
        multilangID: "1"
      });
      server.create("article", {
        name: "Article 2 (HU)",
        slug: "article-2-hu",
        lang: "hu-HU",
        multilangID: "2"
      });
      server.create("article", {
        name: "Article 3 (HU)",
        slug: "article-3-hu",
        lang: "hu-HU",
        multilangID: "3"
      });
    },

    routes() {
      this.namespace = "api";

      /**
       * Returns all articles for a lang
       */
      this.get("/articles/:lang", (schema, request) => {
        const lang = request.params.lang;

        return schema.articles.where(article => article.lang === lang);
      });

      /**
       * Returns an article by slug
       */
      this.get("/article/:slug", (schema, request) => {
        const slug = request.params.slug;

        return schema.articles.findBy({ slug: slug });
      });

      /**
       * Returns an article on a different language based on slug
       */
      this.get("/article/:slug/:lang", (schema, request) => {
        const slug = request.params.slug;
        const lang = request.params.lang;

        const article = schema.articles.findBy({ slug: slug });
        const { multilangID } = article;

        const res = schema.articles.where(
          article =>
            article.lang === lang && article.multilangID === multilangID
        );

        return res.models[0];
      });
    }
  });

  return server;
};

export { makeServer };
