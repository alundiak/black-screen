var qs = require('qs')

var withDots = qs.parse('172.26.34.32', { allowDots: true });

console.log(JSON.stringify(withDots, null, 2));

// {
//   "172": {
//     "26": {
//       "34": {
//         "32": ""
//       }
//     }
//   }
// }
