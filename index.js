const express = require("express");
const BeamClient = require("beam-client-node");

const config = require('config');
const port = config.get('port') || 80;
const scopes = config.get('scopes');

const portAddition = port !== 80 ? `:${port}` : '';
const redirectUri = `${config.get('baseUrl')}${portAddition}/callback`;

const app = express();

function createClient() {
    const client = new BeamClient();
    client.use("oauth", {
        clientId: config.get('clientId'),
        secret: config.get('clientSecret'),
    });
    return client;
}

const client = createClient();

app.get("/", (request, res) => {
    res.redirect(client.getProvider().getRedirect(redirectUri, scopes));
});

app.get("/callback", (request, reply) => {
    const oauth = client.getProvider();

    oauth.attempt(redirectUri, request.query)
        .then(res => reply.json(oauth.getTokens()))
        .catch(err => reply.json(err));
});

app.listen(port, () => {
    console.log(`listening on ${port}`);
});