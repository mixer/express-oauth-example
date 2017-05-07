# Express OAuth Example

An example of how to use express to retrieve a Beam OAuth access token, using [express](https://www.npmjs.com/package/express).

## Setup

1. Setup an OAuth Client on the [Beam Developer Lab](https://beam.pro/lab).
    - Your "HOSTS" and "WEBSITE" should be the hostname from which your express application will be accessed from.
    - The other details are up to you.
1. [Clone this Repository](https://help.github.com/articles/cloning-a-repository/)
1. `npm install`
1. Edit `config/default.json` to match your needs:
    - `baseUrl` should be the url the express application will be accessed from. `http://localhost` is ok.
    - `port` should be the port to run the express server on. Defaults to 80.
    - `clientId` and `clientSecret` should be set to your client details from step 1.
    - `scopes` should be an array of [Beam OAuth scopes](https://dev.beam.pro/reference/oauth/index.html#oauth_scopes)


## Use

1. Start the express server with `node index.js`.
1. You should see "listening on port 80". This signifies that the server is ready.
1. Visit your `baseUrl` in your browser. It should redirect you to Beam's OAuth sign in page.
1. Sign in with your Beam account.
1. You'll be redirected back to the application and should see an OAuth Token in the response.


## More Information

If you'd like more information on Beam's OAuth visit [our reference page](https://dev.beam.pro/reference/oauth/index.html).
