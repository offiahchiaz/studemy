module.exports = {
    MongoURI: 'mongodb://localhost:27017/studemy',
    port: process.env.PORT || 7000,
    secretKey: 'Chiazor@$@!#&',
    facebook: {
        clientID: process.env.FACEBOOK_ID || '367318653860563',
        clientSecret: process.env.FACEBOOK_ID || '553568803ac854ca11dcc6a916192065',
        profileFields: ['emails', 'displayName'],
        callbackURL: 'http://localhost:7000/auth/facebook/callback'
    }
}