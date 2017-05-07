const express = require('express');
const BeamClient = require('beam-client-node');

const config = require('config');
const port = config.get('port') || 80;
const scopes = config.get('scopes');

const portAddition = port !== 80 ? `:${port}` : '';
const redirectUri = `${config.get('baseUrl')}${portAddition}/callback`;
const app = express();

function createClient() {
    const client = new BeamClient();
    // Supply the OAuth information to the client.
    client.use('oauth', {
        clientId: config.get('clientId'),
        secret: config.get('clientSecret'),
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
        .catch(err => reply.json(err));
});

app.listen(port, () => {
    console.log(`listening on ${port}`);
});
