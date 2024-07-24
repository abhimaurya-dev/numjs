import ns from "./numjs/index";

const tensor1 = ns.tensorArray([
  [1, 2],
  [3, 4],
]);
const tensor2 = ns.tensorArray([
  [4, 5],
  [6, 7],
]);

const tensor3 = tensor1.dot(tensor2);

console.log(tensor3);
