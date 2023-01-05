const {products} = require('./products')

export function getAllProducts(){
    console.log(products)
    return products.map((product) => {
        return {
            params: {
                id: `${product.id}`,
            },
        };
    });
}

export function getProductData(id){
    return products.filter(product => product.id === id)[0]
}