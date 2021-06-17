ap [visit](#visit) the given `fn` over `node.nodes`. This is called by [visit](#visit), use this method if you do not want `fn` to be called on the first node.

**Params**

* `node` **{Object}**: Instance of [snapdragon-node](https://github.com/jonschlinkert/snapdragon-node)
* `options` **{Object}**
* `fn` **{Function}**
* `returns` **{Object}**: returns the node

**Example**

```js
snapdragon.compiler.set('i', function(node) {
  utils.mapVisit(node, function(childNode) {
    // do stuff with "childNode"
    return childNode;
  });
});
```

### [.addOpen](index.js#L194)

Unshift an `*.open` node onto `node.nodes`.

**Params**

* `node` **{Object}**: Instance of [snapdragon-node](https://github.com/jonschlinkert/snapdragon-node)
* `Node` **{Function}**: (required) Node constructor function from [snapdragon-node](https://github.com/jonschlinkert/snapdragon-node).
* `filter` **{Function}**: Optionaly specify a filter function to exclude the node.
* `returns` **{Object}**: Returns the created opening node.

**Example**

```js
var Node = require('snapdragon-node');
snapdragon.parser.set('brace', function(node) {
  var match = this.match(/^{/);
  if (match) {
    var parent = new Node({type: 'brace'});
    utils.addOpen(parent, Node);
    console.log(parent.nodes[0]):
    // { type: 'brace.open', val: '' };

    // push the parent "brace" node onto the stack
    this.push(parent);

    // return the parent node, so it's also added to the AST
    return brace;
  }
});
```

### [.addClose](index.js#L244)

Push a `*.close` node onto `node.nodes`.

**Params**

* `node` **{Object}**: Instance of [snapdragon-node](https://github.com/jonschli