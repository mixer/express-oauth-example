const express = require('express');
const BeamClient = require('beam-client-node');

const config = require('./config/config.json');
const port = config.port || 80;
const scopes = config.scopes;

const portAddition = port !== 80 ? `:${port}` : '';
const redirectUri = `${config.baseUrl}${portAddition}/callback`;

const app = express();

function createClient() {
    const client = new BeamClient();
    // Supply the OAuth information to the client.
    client.use('oauth', {
        clientId: config.clientId,
        secret: config.clientSecret
    });
    return client;
}

const client = createClient();

app.get('/', (request, reply) => {
    // Redirect clients who visit `/` to the authorization page.
    reply.redirect(client.getProvider().getRedirect(redirectUri, scopes));
});

app.get('/callback', (request, reply) => {
    // Respond with either an error, or with the information the client can use to authorize with.
    const oauth = client.getProvider();

    oauth.attempt(redirectUri, request.query)
        .then(res => reply.json(oauth.getTokens()))
        .catch(reply.json);
});

app.listen(port, () => {
    console.log(`listening on ${port}`);
});
