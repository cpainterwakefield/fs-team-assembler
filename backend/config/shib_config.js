module.exports = {
      app: {
        name: 'Passport SAML strategy',
        port: process.env.PORT || 3000
      },
      passport: {
        strategy: 'custom',
        path: '/login'
      }
  };