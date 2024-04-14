export class ProductDTO {
  constructor({ title, description, code, price, status, stock, category }) {
    this.title = title;
    this.description = description;
    this.code = code;
    this.price = price;
    this.status = status;
    this.stock = stock;
    this.category = category;
  }

  static fromModel(productModel) {
    return new ProductDTO({
      title: productModel.title,
      description: productModel.description,
      code: productModel.code,
      price: productModel.price,
      status: productModel.status,
      stock: productModel.stock,
      category: productModel.category,
    });
  }
}
