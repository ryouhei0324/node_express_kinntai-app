module.exports = {

  development: {
    client: "mysql",
    connection: {
      database: "runapp",
      user: "root",
      password: "Ryohei00@",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  staging: {
    client: "mysql",
    connection: {
      database: "runapp",
      user: "root",
      password: "Ryohei00@",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: "mysql",
    connection: {
      database: "runapp",
      user: "root",
      password: "Ryohei00@",
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};