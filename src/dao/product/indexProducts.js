import { productsFs } from "./products.fs.js";
import { productsMongoose } from "./products.mongoose.js";

// Declaración de la variable para el acceso a los productos
let productDAO;

// Obtiene la opción de DAO del entorno
const DAO_OPTION = process.env.DAO_OPTION;

// Según la opción de DAO proporcionada, instancia el DAO correspondiente
switch (DAO_OPTION) {
  case 'mongoose':
    // Si la opción es 'mongoose', utiliza el acceso a los productos mediante Mongoose
    productDAO = new productsMongoose();
    break;
  case 'fs':
    // Si la opción es 'fs', utiliza el acceso a los productos mediante FileSystem
    productDAO = new productsFs();
    break;
  default:
    // Por defecto, utiliza el acceso a los productos mediante Mongoose
    productDAO = new productsMongoose();
}

// Exporta el DAO seleccionado para el acceso a los productos
export {productDAO};
