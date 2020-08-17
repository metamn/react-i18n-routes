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
        lang: "en-US"
      });
      server.create("article", {
        name: "Article 2",
        slug: "article-2",
        lang: "en-US"
      });
      server.create("article", {
        name: "Article 3",
        slug: "article-3",
        lang: "en-US"
      });
      server.create("article", {
        name: "Article 1 (RO)",
        slug: "article-1-ro",
        lang: "ro-RO"
      });
      server.create("article", {
        name: "Article 2 (RO)",
        slug: "article-2-ro",
        lang: "ro-RO"
      });
      server.create("article", {
        name: "Article 3 (RO)",
        slug: "article-3-ro",
        lang: "ro-RO"
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/articles/:lang", (schema, request) => {
        const lang = request.params.lang;

        return schema.articles.where(article => article.lang === lang);
      });

      this.get("/article/:slug", (schema, request) => {
        const slug = request.params.slug;

        return schema.articles.findBy({ slug: slug });
      });
    }
  });

  return server;
};

export { makeServer };
