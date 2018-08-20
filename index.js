'use strict'

var parse = require('querystring').parse
var ok = require('assert').ok

var validator = require('is-my-json-valid')
var concat = require('concat-stream')
var pump = require('pump')

module.exports = function schemaMiddleware (schema) {
  ok(typeof schema === 'string' || typeof schema === 'object', 'urlencoded-schema-middleware: schema should be type string or type object')

  var validate = validator(schema)

  return function (req, res, next) {
    _parseString(req, function (err, json) {
      if (err) {
        return next(err, null)
      }

      validate(json)

      if (validate.errors) {
        return next(validate.errors, null)
      }

      req.body = json

      next()
    })
  }
}

function _parseString (req, done) {
  pump(req, concat({ encoding: 'string' }, handler), done)

  function handler (str) {
    var isLikelyURL = str.indexOf('?') > -1
    done(null, parse(isLikelyURL ? str.slice(str.indexOf('?') + 1) : str))
  }
}
