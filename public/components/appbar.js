# snapdragon-util [![NPM version](https://img.shields.io/npm/v/snapdragon-util.svg?style=flat)](https://www.npmjs.com/package/snapdragon-util) [![NPM monthly downloads](https://img.shields.io/npm/dm/snapdragon-util.svg?style=flat)](https://npmjs.org/package/snapdragon-util) [![NPM total downloads](https://img.shields.io/npm/dt/snapdragon-util.svg?style=flat)](https://npmjs.org/package/snapdragon-util) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/snapdragon-util.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/snapdragon-util)

> Utilities for the snapdragon parser/compiler.

<details>
<summary><strong>Table of Contents</strong></summary>

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Release history](#release-history)
  * [[3.0.0] - 2017-05-01](#300---2017-05-01)
  * [[0.1.0]](#010)
- [About](#about)

</details>

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save snapdragon-util
```

Install with [yarn](https://yarnpkg.com):

```sh
$ yarn add snapdragon-util
```

## Usage

```js
var util = require('snapdragon-util');
```

## API

### [.isNode](index.js#L21)

Returns true if the given value is a node.

**Params**

* `node` **{Object}**: Instance of [snapdragon-node](https://github.com/jonschlinkert/snapdragon-node)
* `returns` **{Boolean}**

**Example**

```js
var Node = require('snapdragon-node');
var node = new Node({type: 'foo'});
console.log(utils.isNode(node)); //=> true
consol