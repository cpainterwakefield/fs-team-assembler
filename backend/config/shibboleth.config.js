module.exports = {
    passport: {
        strategy: 'saml',
        saml: {
          path: process.env.SAML_PATH || '/login/callback',
          entryPoint: process.env.SAML_ENTRY_POINT || 'SHIBBOLETH ADDRESS',
          issuer: 'passport-saml',
          cert: process.env.SAML_CERT || null
        }
    }
};