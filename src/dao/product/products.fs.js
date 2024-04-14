import fs from 'fs';

// Ruta al archivo JSON donde se almacenan los productos
const path = '../../data/products.json';

// Clase para representar un producto
class Products {
    constructor(id, name, price, stock, category, description, status, code) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.description = description;
        this.status = status;
        this.code = code;
        this.id = id;
    }
}

// Función promesa para leer un archivo
const readFileAsync = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

// Función promesa para escribir en un archivo
const writeFileAsync = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Clase que maneja la lectura y escritura de productos en el archivo JSON
export class productsFs {
    // Método para leer los datos del archivo o inicializarlo si está vacío o no existe
    async readOrInitializeFileData() {
        try {
            // Intenta leer el contenido del archivo
            const response = await readFileAsync(path);
            // Parsea los datos del archivo JSON
            const data = await JSON.parse(response);
            return data;
        } catch (error) {
            // Si hay un error al leer el archivo, crea un archivo vacío y retorna un array vacío
            await writeFileAsync(path, JSON.stringify([]));
            return [];
        }
    }
    
    // Método para obtener todos los productos o un número limitado de productos
    async getProducts(limit) {
        // Lee los datos del archivo o inicializa el archivo si está vacío
        const products = await this.readOrInitializeFileData();
        return limit > 0 ? products.slice(0, limit) : products;
    }
    
    // Método para agregar un nuevo producto al archivo
    async addProducts(object) {
        // Lee los datos del archivo o inicializa el archivo si está vacío
        const products = await this.readOrInitializeFileData();
        // Crea una instancia de producto con un ID único
        const product = new Products(products.length + 1, ...object);
        // Agrega el nuevo producto al array de productos
        products.push(product);
        // Escribe los datos actualizados en el archivo
        await writeFileAsync(path, JSON.stringify(products));
    }
    
    // Método para obtener un producto por su ID
    async getProductsById(id) {
        // Lee los datos del archivo o inicializa el archivo si está vacío
        const products = await this.readOrInitializeFileData();
        // Busca el producto con el ID proporcionado
        const productsExist = products.find((product) => product.id.toString() === id.toString());
        if (!productsExist) {
            throw new Error(`The product was not found`);
        } else {
            return productsExist;
        }
    }
    
    // Método para editar un producto existente por su ID
    async editProducts(id, object) {
        // Lee los datos del archivo o inicializa el archivo si está vacío
        const products = await this.readOrInitializeFileData();
        // Encuentra el índice del producto en el array
        let productsExist = products.findIndex((product) => product.id === id);
        if (productsExist < 0) {
            return null;
        }
        // Actualiza las propiedades del producto con los datos proporcionados
        products[productsExist] = {
            ...products[productsExist],
            ...object,
        };
        // Escribe los datos actualizados en el archivo
        await writeFileAsync(path, JSON.stringify(products));
        return products[productsExist];
    }
    
    // Método para eliminar un producto por su ID
    async deleteProducts(id){
        // Lee los datos del archivo o inicializa el archivo si está vacío
        const products = await this.readOrInitializeFileData();
        // Busca el producto con el ID proporcionado
        const product = products.find((product) => product.id.toString() === id.toString());
        if(!product){
            return null;
        }else{
            // Copia los productos originales para actualizarlos
            const updateProducts = products;
            // Filtra los productos para excluir el producto con el ID proporcionado
            updateProducts.filter((product)=> product.id !== id);
            // Actualiza los ID de los productos restantes después de eliminar el producto
            updateProducts.map((product,index)=>{
                return {...product,id:(index + 1).toString()};
            });
            // Escribe los datos actualizados en el archivo
            await writeFileAsync(path, JSON.stringify(updateProducts));
            return product;
        }
    }
    
}
