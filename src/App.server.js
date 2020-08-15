import { Server, Model } from "miragejs";
import shortid from "shortid";

const makeServer = () => {
  let server = new Server({
    models: {
      article: Model
    },

    seeds(server) {
      server.create("article", {
        id: shortid.generate(),
        name: "Article 1",
        slug: "article-1"
      });
      server.create("article", {
        id: shortid.generate(),
        name: "Article 2",
        slug: "article-2"
      });
      server.create("article", {
        id: shortid.generate(),
        name: "Article 3",
        slug: "article-3"
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/articles", schema => {
        return schema.articles.all();
      });

      this.get("/articles/:slug", (schema, request) => {
        const slug = request.params.slug;

        return schema.articles.findBy({ slug: slug });
      });
    }
  });

  return server;
};

export { makeServer };
