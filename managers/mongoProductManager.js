const {productsModel} = require('../models/products.model')

class MongoProductManager{
    constructor(){
    
    }

    async getProducts({page, limit, sort, query}){
       try{
        const filter =  query ? {category: query} : {}

        const options = {
            sort: (sort ? {price: sort} : {}),
            limit: limit ?? 10,
            page: page ?? 1,
            lean: true
        }

        const response = await productsModel.paginate(filter, options) 
        return response
       }
       catch(error){
        return ({
            state: "Error",
            message: `An error has occurred: ${error}`
        })
       }
       // return await productsModel.find().lean()
    }

    async getProductById(productId){
        try{
            const requestedProduct = await productsModel.findOne({_id: productId})
            return requestedProduct
        }
        catch(error){
            const requestedProduct = false
            return requestedProduct
        }
        
    }

    async addProduct(productObject){
            const newProduct = productObject
            const codeValidation = await productsModel.findOne({code: newProduct.code}).lean()
            if(!codeValidation){
                try{
                    await productsModel.insertMany(newProduct)
                    const productAdded = await productsModel.findOne({code: newProduct.code}).lean()
                    return ({
                        state: "successful",
                        message: `The product has been added with the ID ${productAdded._id}`,
                        product: productAdded
                    })
                } catch(error){
                    return ({
                        state: "error",
                        message: `There's been an error: ${error}`,
                    })
                }
            } else {
                return ({
                    state: "existing product",
                    message: `this product already exists`,
                    product: codeValidation
                })
            }
            
    }

    async updateProduct(id, updatedProduct){
       try{
        const productUpdate = await productsModel.findByIdAndUpdate(id, updatedProduct)
        return ({
            state: "product updated",
            message: `The product with the ID ${productUpdate._id} was updated`,
            product: productUpdate
        })
       }catch(error){
        return ({
            state: "error",
            message: `There's been an error: ${error}`
        })
       }
        
    }

    async deleteProduct(id){
       try{
        const productDeleted = await productsModel.findByIdAndRemove(id)
        return ({
            state: "product deleted",
            message: `The product with the ID ${productDeleted._id} was removed`,
            product: productDeleted
        })
       }catch(error){
            return ({
            state: "error",
            message: `There's been an error: ${error}`
        })
       }
        
    }
    }


module.exports = MongoProductManager