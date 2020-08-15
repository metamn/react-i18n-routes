import { Server, Model } from "miragejs";

const makeServer = () => {
  let server = new Server({
    models: {
      article: Model
    },

    seeds(server) {
      server.create("article", { name: "Article 1" });
      server.create("article", { name: "Article 2" });
      server.create("article", { name: "Article 3" });
    },

    routes() {
      this.namespace = "api";

      this.get("/articles", schema => {
        return schema.articles.all();
      });
    }
  });

  return server;
};

export { makeServer };
