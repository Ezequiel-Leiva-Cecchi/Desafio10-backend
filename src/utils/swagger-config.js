export const swaggerConfiguration = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación API de productos y carrito',
            description: 'API para gestionar productos y carrito de mi tienda virtual',
        },
    },
    apis: ['src/docs/**/*.yaml']
}