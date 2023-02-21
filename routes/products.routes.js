const { auth } = require('../middlewares/auth.middleware');
const {Router} = require('express');

const router = Router();

//Persistencia de archivos con Mongoose
const ProductManagmentDB = require('../managers/mongoProductManager')
const productosDb = new ProductManagmentDB()

router.get('/', auth ,async (req, res) => {
    
    try{
        const user = req.user;
        const respuesta = await productosDb.getProducts(req.query)
        const data = {
            status: 'success',
            payload: respuesta.docs,
            totalPages: respuesta.totalPages,
            prevPage: respuesta.prevPage,
            nextPage: respuesta.nextPage,
            page: respuesta.page,
            hasPrevPage:respuesta.hasPrevPage,
            hasNextPage: respuesta.hasNextPage,
            prevLink: (respuesta.hasPrevPage ? "localhost:8080/products?page=$" + respuesta.prevPage : null),
            nexLink: (respuesta.hasNextPage ? "localhost:8080/products?page="+respuesta.nextPage : null)}
        
           // res.send(data)
            const renderData = data.payload
            res.render('products', {renderData, user}) 

    }
    catch(error){
        console.log(error)
    } 
})

module.exports = router;