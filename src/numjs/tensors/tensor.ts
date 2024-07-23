type TensorArray = number | TensorArray[];

class Tensor {
  array: TensorArray;
  shape: number[];

  constructor(array: TensorArray = []) {
    this.array = array;
    this.shape = this.getShape(array);
    this.validateTensor(array);
  }

  tensorArray(array: TensorArray) {
    this.array = array;
    this.shape = this.getShape(array);
    this.validateTensor(array);
    return new Tensor(array);
  }

  private getShape(array: TensorArray): number[] {
    let shape: number[] = [];
    let currentArray = array;

    while (Array.isArray(currentArray)) {
      shape.push(currentArray.length);
      currentArray = currentArray[0] as TensorArray;
    }

    return shape;
  }

  private validateTensor(array: TensorArray): void {
    const checkArrayShape = (arr: TensorArray, shape: number[]): boolean => {
      if (!Array.isArray(arr)) return true;

      if (shape.length === 0) {
        shape.push(arr.length);
      } else if (shape[0] !== arr.length) {
        throw new Error("Inconsistent array lengths detected in tensor data.");
      }

      for (let i = 0; i < arr.length; i++) {
        checkArrayShape(arr[i], shape.slice(1));
      }

      return true;
    };

    checkArrayShape(array, this.shape);
  }

  add(tensor: Tensor): Tensor {
    if (this.shape.toString() !== tensor.shape.toString()) {
      throw new Error("Tensors must have the same shape");
    }

    const result = this.addRecursive(this.array, tensor.array) as TensorArray;

    return new Tensor(result);
  }

  private addRecursive(array1: TensorArray, array2: TensorArray): TensorArray {
    if (typeof array1 === "number" && typeof array2 === "number") {
      return array1 + array2;
    }

    if (Array.isArray(array1) && Array.isArray(array2)) {
      return array1.map((val, i) => this.addRecursive(val, array2[i]));
    }

    throw new Error("Tensors have incompatible structures");
  }

  dot(tensor: Tensor): Tensor {
    if (this.shape.toString() !== tensor.shape.toString()) {
      throw new Error("Tensors must have the same shape");
    }

    const result: TensorArray = this.dotRecursive(
      this.array,
      tensor.array
    ) as TensorArray;

    return new Tensor(result);
  }

  private dotRecursive(array1: TensorArray, array2: TensorArray): TensorArray {
    if (typeof array1 === "number" && typeof array2 === "number") {
      return array1 * array2;
    }

    if (Array.isArray(array1) && Array.isArray(array2)) {
      return array1.map((val, i) => this.dotRecursive(val, array2[i]));
    }

    throw new Error("Tensors have incompatible structures");
  }
}

export default Tensor;
