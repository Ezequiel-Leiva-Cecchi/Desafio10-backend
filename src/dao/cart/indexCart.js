import { CartsFs } from "./cart.fs.js";
import { cartMongoose } from "./cart.mongoose.js";

// Variable para el DAO de carritos
let cartDAO;

// Obtiene la opción de DAO del entorno
const DAO_OPTION = process.env.DAO_OPTION;

// Switch para seleccionar el DAO según la opción especificada en el entorno
switch (DAO_OPTION) {
    case 'mongoose':
        cartDAO = new cartMongoose(); // Crea una instancia del DAO de carritos mediante Mongoose
        break;
    case 'fs':
        cartDAO = new CartsFs(); // Crea una instancia del DAO de carritos mediante archivos
        break;
    default:
        cartDAO = new cartMongoose(); // Si no se especifica ninguna opción, utiliza el DAO de Mongoose por defecto
}

export { cartDAO };
