module.exports = {
  apps: [
    {
      name: "doc-class-app",
      script: "server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      time: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};