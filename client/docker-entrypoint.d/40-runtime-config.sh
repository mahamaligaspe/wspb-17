#!/bin/sh
# Substitute $API_URL into the template, producing the config.js the page loads.
set -e
envsubst '${API_URL}' \
  < /usr/share/nginx/html/config.template.js \
  > /usr/share/nginx/html/config.js
