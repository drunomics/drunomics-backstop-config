# Drunomics Backstop Configurator

Simple CLI to update backstop configuration.

## Usage
run `./node_modules/drunomics-backstop-config/bin/index.js`

## Available arguments
`-u $URL` Base URL of test page \
`-p $PATH` Path to `backstop.json`; default: 'backstop.json' \
`-e $ENGINE` Engine that should be used by backstop; default: 'phantomjs' \

`--s` Whether site has subsites. (http(s)://subsite_site.host)