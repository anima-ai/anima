module.exports = {
  apps: [
    {
      name: "strapi",
      script: "npm",
      args: "run strapi:start",
    },
    {
      name: "server",
      script: "npm",
      args: "run server:start",
    },
  ],
};
