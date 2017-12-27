## D3 related

- https://bl.ocks.org/mbostock/4063582 - MAYBE TreeMap instead of Pack() - if size will be always 1, then all rectangles should be the same
- https://bl.ocks.org/mbostock/4062045 - Force-Directed Graph
- https://bl.ocks.org/mbostock/4600693 - Curved Links
- https://bost.ocks.org/mike/miserables/ - Les Misérables Co-occurrence - simple grid/quad
- https://github.com/d3/d3-hierarchy/blob/master/README.md#stratify - MAYBE

## String Dot Value convert to Object
- http://underscorejs.org/#object - kinda convert complex data to object
- https://github.com/ljharb/qs - tried, not bad.
- https://stackoverflow.com/questions/28058519/javascript-convert-dot-delimited-strings-to-nested-object-value
- https://stackoverflow.com/questions/14028259/json-response-parsing-in-javascript-to-get-key-value-pair

```js
for(n1 in yourobj){
    for(n1_1 in yourobj[n1]){
    	for(n1_2 in yourobj[n1][n1_1]){
            for(n1_3 in yourobj[n1][n1_1][n1_2]){
      			obj[yourobj[n1][n1_1][n1_2].name]=yourobj[n1][n1_1][n1_2].value;
            }
    	}
 	}
}
console.log(obj);
```

- https://github.com/tangkhaiphuong/jsonkv ???
- https://www.npmjs.com/package/moredots
- https://www.npmjs.com/package/object2dot
- https://www.npmjs.com/package/to-json-schema

## IP Address parsing, converting, validating

- https://stackoverflow.com/questions/14822368/ip-address-parser-in-javascript - 3 parsing examples

```js
var v4 = '[\\d]{1-3}';
var v4d = '\\.';
var v4complete = v4+v4d+v4+v4d+v4+v4d+v4
var v6 = '[\\da-fA-F]{0-4}';
var v6d = ':';
var v6complete = v6+v6d+v6+v6d+v6+v6d+v6+v6d+v6+v6d+v6+v6d+v6+v6d+v6;
var regex = new RegExp('(' + v4complete + '(\\:\d+){0,1}|'
                           + '::|::1|'
                           + '\\[::\\]:\\d+|\\[::1\\]:\\d+|'
                           + v6complete + '|'
                           + '\\[' + v6complete + '\\]:\\d+' + ')', 'g');
var result = mystring.match(regex);
```

- https://www.npmjs.com/package/ip-address + http://ip-address.js.org/

```js
var Address6 = require('ip-address').Address6;

var address = new Address6('2001:0:ce49:7601:e866:efff:62c3:fffe');

address.isValid(); // true

var teredo = address.inspectTeredo();

teredo.client4;    // '157.60.0.1'
```

- https://www.npmjs.com/package/dot-prop