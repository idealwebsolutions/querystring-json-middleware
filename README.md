# querystring-json-middleware
Middleware that parses urlencoded form querystrings as JSON for validation

# Install
    $ git clone https://github.com/idealwebsolutions/querystring-json-middleware.git
    $ cd querystring-json-middleware && npm install

# Usage
Consume urlencoded forms as JSON to validate their structure. Takes any function that uses `(req, res, next)` as its signature and returns a valid json body in `req.body` if successful.

# API
## .urlencodedSchema(schema) -> (req, res, next)
Parses and validates a urlencoded body as a JSON structure. If valid, places the newly formed JSON structure as `req.body`.

# TODO
- Tests

# License
MIT
