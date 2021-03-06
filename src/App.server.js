import { Server, Model } from "miragejs";

const makeServer = () => {
  let server = new Server({
    models: {
      article: Model,
      comment: Model
    },

    seeds(server) {
      server.create("article", {
        id: "1",
        name: "Article 1",
        slug: "article-1",
        lang: "en-US",
        multilangID: "1"
      });
      server.create("article", {
        id: "2",
        name: "Article 2",
        slug: "article-2",
        lang: "en-US",
        multilangID: "2"
      });
      server.create("article", {
        id: "3",
        name: "Article 3",
        slug: "article-3",
        lang: "en-US",
        multilangID: "3"
      });
      server.create("article", {
        id: "4",
        name: "Article 1 (RO)",
        slug: "article-1-ro",
        lang: "ro-RO",
        multilangID: "1"
      });
      server.create("article", {
        id: "5",
        name: "Article 2 (RO)",
        slug: "article-2-ro",
        lang: "ro-RO",
        multilangID: "2"
      });
      server.create("article", {
        id: "6",
        name: "Article 3 (RO)",
        slug: "article-3-ro",
        lang: "ro-RO",
        multilangID: "3"
      });
      server.create("article", {
        id: "7",
        name: "Article 1 (HU)",
        slug: "article-1-hu",
        lang: "hu-HU",
        multilangID: "1"
      });
      server.create("article", {
        id: "8",
        name: "Article 2 (HU)",
        slug: "article-2-hu",
        lang: "hu-HU",
        multilangID: "2"
      });
      server.create("article", {
        id: "9",
        name: "Article 3 (HU)",
        slug: "article-3-hu",
        lang: "hu-HU",
        multilangID: "3"
      });
      server.create("comment", {
        id: "1",
        name: "Comment 1 / 2 for Article 1",
        slug: "comment-1",
        lang: "en-US",
        articleID: "1"
      });
      server.create("comment", {
        id: "2",
        name: "Comment 2 / 2 for Article 1",
        slug: "comment-2",
        lang: "en-US",
        articleID: "1"
      });
      server.create("comment", {
        id: "3",
        name: "Comment 1 / 1 for Article 2",
        slug: "comment-3",
        lang: "en-US",
        articleID: "2"
      });
      server.create("comment", {
        id: "4",
        name: "Comment 1 / 1 for Article 3",
        slug: "comment-4",
        lang: "en-US",
        articleID: "3"
      });
      server.create("comment", {
        id: "5",
        name: "Comment 1 / 2 for Article 1 (RO)",
        slug: "comment-1-ro",
        lang: "ro-RO",
        articleID: "1"
      });
      server.create("comment", {
        id: "6",
        name: "Comment 2 / 2 for Article 1 (RO)",
        slug: "comment-2-ro",
        lang: "ro-RO",
        articleID: "1"
      });
      server.create("comment", {
        id: "7",
        name: "Comment 1 / 1 for Article 2 (RO)",
        slug: "comment-3-ro",
        lang: "ro-RO",
        articleID: "2"
      });
      server.create("comment", {
        id: "8",
        name: "Comment 1 / 1 for Article 3 (RO)",
        slug: "comment-4-ro",
        lang: "ro-RO",
        articleID: "3"
      });
      server.create("comment", {
        id: "9",
        name: "Comment 1 / 2 for Article 1 (HU)",
        slug: "comment-1-hu",
        lang: "hu-HU",
        articleID: "1"
      });
      server.create("comment", {
        id: "10",
        name: "Comment 2 / 2 for Article 1 (HU)",
        slug: "comment-2-hu",
        lang: "hu-HU",
        articleID: "1"
      });
      server.create("comment", {
        id: "11",
        name: "Comment 1 / 1 for Article 2 (HU)",
        slug: "comment-3-hu",
        lang: "hu-HU",
        articleID: "2"
      });
      server.create("comment", {
        id: "12",
        name: "Comment 1 / 1 for Article 3 (HU)",
        slug: "comment-4-hu",
        lang: "hu-HU",
        articleID: "3"
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

      /**
       * Returns a comment by slug
       */
      this.get("/comment/:slug", (schema, request) => {
        const slug = request.params.slug;

        return schema.comments.findBy({ slug: slug });
      });

      /**
       * Returns a comment on a different language based on slug
       */
      this.get("/comment/:slug/:lang", (schema, request) => {
        const slug = request.params.slug;
        const lang = request.params.lang;

        const comment = schema.comments.findBy({ slug: slug });
        const { articleID } = comment;

        const res = schema.comments.where(
          comment => comment.lang === lang && comment.articleID === articleID
        );

        return res.models[0];
      });

      /**
       * Returns all comments for an article on a given language
       */
      this.get("/comments/:articleID/:lang", (schema, request) => {
        const articleID = request.params.articleID;
        const lang = request.params.lang;

        return schema.comments.where(
          comment => comment.articleID === articleID && comment.lang === lang
        );
      });
    }
  });

  return server;
};

export { makeServer };
