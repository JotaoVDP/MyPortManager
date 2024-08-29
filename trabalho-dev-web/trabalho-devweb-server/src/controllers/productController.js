const db = require('../config/database')

exports.registerProductType = async (req, res) => {
    if(req.body.hasOwnProperty('IdProductType') && req.body.hasOwnProperty('Description') && req.body.hasOwnProperty('MeanWeight') 
        && req.body.hasOwnProperty('IsFragile') && req.body.hasOwnProperty('IsTaxFree')) {
        
        const {IdProductType, Description, MeanWeight, IsFragile, IsTaxFree} = req.body;

        try {
            const insertQuery = await db.query(
                "INSERT INTO ProductType (IdProductType, Description, MeanWeight, IsFragile, IsTaxFree) VALUES ($1, $2, $3, $4, $5);",
                [IdProductType, Description, MeanWeight, IsFragile, IsTaxFree]
            );
            res.status(200).send({ sucesso: 1 });
        } catch (err) {
            res.status(200).send({ erro: "erro BD: " + err });
        }
    } else {
        res.status(200).send({ erro: "faltam parametros" });
    }
}

exports.registerProduct = async (req, res) => {
    if(req.body.hasOwnProperty('IdProduct') && req.body.hasOwnProperty('IdProductType') && req.body.hasOwnProperty('IdContainer') 
        && req.body.hasOwnProperty('Weight') && req.body.hasOwnProperty('Size') && req.body.hasOwnProperty('ShippingInfo')) {
        
        const {IdProduct, IdProductType, IdContainer, Weight, Size, ShippingInfo} = req.body;

        try {
            const insertQuery = await db.query(
                "INSERT INTO Product (IdProduct, IdProductType, IdContainer, Weight, Size, ShippingInfo) VALUES ($1, $2, $3, $4, $5, $6);",
                [IdProduct, IdProductType, IdContainer, Weight, Size, ShippingInfo]
            );
            res.status(200).send({ sucesso: 1 });
        } catch (err) {
            res.status(200).send({ erro: "erro BD: " + err });
        }
    } else {
        res.status(200).send({ erro: "faltam parametros" });
    }
}

exports.getProductTypes = async (req, res) => {
    try {
        const getAllProductTypesQuery = await db.query(
            "SELECT * FROM producttype"
        );
        if (getAllProductTypesQuery.rows.length !== 0){
            res.status(200).send(
                {
                    sucesso: 1,
                    product_types: getAllProductTypesQuery.rows,
                    qtde_product_types: getAllProductTypesQuery.rows.length
                }
            );
        } else {
            res.status(200).send(
                {
                    sucesso: 0,
                    message: "Nenhum tipo de produto encontrado."
                }
            );
        }
    } catch (err) {
        res.status(200).send({ erro: "erro BD: " + err });
    }
}

exports.getProducts = async (req, res) => {
    if(req.query.hasOwnProperty('IdProduct')){
        const {IdProduct} = req.query;

        try{
            const getAllProductsQuery = await db.query(
                "SELECT * FROM product WHERE IdProduct = $1",
                [IdProduct]
            );
            if (getAllProductsQuery.rows.length !== 0){
                res.status(200).send(
                    {
                        sucesso: 1,
                        products: getAllProductsQuery.rows,
                        qtde_products: getAllProductsQuery.rows.length
                    }
                );
            } else {
                res.status(200).send(
                    {
                        sucesso: 0,
                        message: "Nenhum produto com esses parâmetros encontrado."
                    }
                );
            }
        } catch (err) {
            res.status(200).send({ erro: "erro BD: " + err });
        }
    } else {
        res.status(200).send({ erro: "faltam parâmetros" });
    }
}

exports.getProductByType = async (req, res) => {
    try{
        const getProductByType = await db.query(
            "SELECT PT.Description, COUNT(IdProduct) AS TotalProdutos FROM Product P JOIN ProductType PT ON PT.IdProductType = P.IdProductType GROUP BY PT.Description;"
        );
        if (getProductByType.rows.length !== 0){
            res.status(200).send(
                {
                    sucesso: 1,
                    products: getProductByType.rows,
                    qtde_products: getProductByType.rows.length
                }
            );
        } else {
            res.status(200).send(
                {
                    sucesso: 0,
                    message: "Nenhum produto com esses parâmetros encontrado."
                }
            );
        }
    } catch (err) {
        res.status(200).send({ erro: "erro BD: " + err });
    }
}

exports.getWeightPerContainer = async (req, res) => {
    try{
        const getWeightPerContainer = await db.query(
            "SELECT IdContainer, SUM(Weight) AS PesoTotal FROM Product WHERE  IdContainer IS NOT NULL GROUP BY IdContainer ORDER BY PesoTotal;"
        );
        if (getWeightPerContainer.rows.length !== 0){
            res.status(200).send(
                {
                    sucesso: 1,
                    products: getWeightPerContainer.rows,
                    qtde_products: getWeightPerContainer.rows.length
                }
            );
        } else {
            res.status(200).send(
                {
                    sucesso: 0,
                    message: "Nenhum produto com esses parâmetros encontrado."
                }
            );
        }
    } catch (err) {
        res.status(200).send({ erro: "erro BD: " + err });
    }
}

exports.getTotalProducts = async (req, res) => {
    try{
        const getTotalProducts = await db.query(
            "SELECT COUNT(*) AS NumeroTotalProdutos FROM Product;"
        );
        if (getTotalProducts.rows.length !== 0){
            res.status(200).send(
                {
                    sucesso: 1,
                    products: getTotalProducts.rows,
                    qtde_products: getTotalProducts.rows.length
                }
            );
        } else {
            res.status(200).send(
                {
                    sucesso: 0,
                    message: "Nenhum produto com esses parâmetros encontrado."
                }
            );
        }
    } catch (err) {
        res.status(200).send({ erro: "erro BD: " + err });
    }
}

exports.getProductOutContainer = async (req, res) => {
    try{
        const getProductOutContainer = await db.query(
            "SELECT ROUND((COUNT(CASE WHEN IdContainer IS NULL THEN 1 END) * 100.0 / COUNT(*)), 1) AS PercentualProdutosSemContainer FROM Product;"
        );
        if (getProductOutContainer.rows.length !== 0){
            res.status(200).send(
                {
                    sucesso: 1,
                    products: getProductOutContainer.rows,
                    qtde_products: getProductOutContainer.rows.length
                }
            );
        } else {
            res.status(200).send(
                {
                    sucesso: 0,
                    message: "Nenhum produto com esses parâmetros encontrado."
                }
            );
        }
    } catch (err) {
        res.status(200).send({ erro: "erro BD: " + err });
    }
}