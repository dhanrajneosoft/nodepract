module.exports = {
  development: {
    port: process.env.NODE_PORT || 8081,
    saltingRounds: 10
  },
  production: {
    port: process.env.NODE_PORT || 8081,
    saltingRounds: 10
  }
};