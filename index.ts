import Tensor from "./src/tensors/tensor";

const tensor1 = new Tensor([[1, 2], [3]]);
const tensor2 = new Tensor([[4, 5], [6]]);

const tensor3 = tensor1.dot(tensor2);

console.log(tensor3);
