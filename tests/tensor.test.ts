import ns from "@/numjs/index";
import Tensor from "@/numjs/tensors/tensor";

describe("Tensor", () => {
  it("Should add the two tensor and return a new tensor", () => {
    const tensor1 = ns.tensorArray([
      [1, 2],
      [3, 5],
    ]);
    const tensor2 = ns.tensorArray([
      [4, 5],
      [6, 7],
    ]);

    const tensor3 = tensor1.add(tensor2);
    const result = ns.tensorArray([
      [5, 7],
      [9, 12],
    ]);
    expect(tensor3.array).toEqual(result.array);
  });

  it("Should return a new tensor created from array", () => {
    const tensorArray = ns.tensorArray([1, 2, 3, 4]);

    expect(tensorArray).toBeInstanceOf(Tensor);
  });
});
