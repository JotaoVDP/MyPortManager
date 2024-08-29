const db = require('../config/database')

exports.registerContainerType = async (req, res) => {

    if(req.body.hasOwnProperty('IdContainerType') && req.body.hasOwnProperty('Height') && req.body.hasOwnProperty('Width') && req.body.hasOwnProperty('Length') 
        && req.body.hasOwnProperty('Name')&& req.body.hasOwnProperty('Description')){
        const {IdContainerType, Height, Width, Length, Name, Description} = req.body

        try{
            const insertQuery = await db.query(
                "INSERT INTO ContainerType (IdContainerType, Height, Width, Length, Name, Description) VALUES ($1, $2, $3, $4, $5, $6);",
                [IdContainerType, Height, Width, Length, Name, Description]
            )
            res.status(200).send(
                {
                    sucesso: 1
                }
            );
        }catch (err) {
            var errorMsg = "erro BD: "
            res.status(200).send(
                {
                    erro: errorMsg.concat(err)
                }
            );
        }
        } else {
        var errorMsg = "faltam parametros";
        res.status(200).send(
            {
                erro: errorMsg
            }
        );
    }

}

exports.registerContainer = async (req, res) => {
    if(req.body.hasOwnProperty('IdContainer') && req.body.hasOwnProperty('IdContainerType') && req.body.hasOwnProperty('IdLocation') && req.body.hasOwnProperty('IdShip') && req.body.hasOwnProperty('Flag')) {
        const {IdContainer, IdContainerType, IdLocation, IdShip, flag} = req.body
        
        try{
            const insertQuery = await db.query(
                "INSERT INTO Container (IdContainer, IdContainerType, IdLocation, IdShip, flag) VALUES ($1, $2, $3, $4, $5);",
                [IdContainer, IdContainerType, IdLocation, IdShip, flag]
            )
            res.status(200).send(
                {
                    sucesso: 1
                }
            );
        }catch (err) {
            var errorMsg = "erro BD: "
            res.status(200).send(
                {
                    erro: errorMsg.concat(err)
                }
            );
        }
        } else {
        var errorMsg = "faltam parametros";
        res.status(200).send(
            {
                erro: errorMsg
            }
        );
    }
}

exports.getContainerTypes = async (req, res) => {
    try {
        const getAllContainerTypesQuery = await db.query(
            "SELECT * FROM containertype"
        );
        if (getAllContainerTypesQuery.rows.length !== 0){
            res.status(200).send(
                {
                    sucesso: 1,
                    container_types: getAllContainerTypesQuery.rows,
                    qtde_container_types: getAllContainerTypesQuery.rows.length
                }
            );
        } else {
            res.status(200).send(
                {
                    sucesso: 0,
                    message: "Nenhum tipo de contêiner encontrado."
                }
            );
        }
    } catch (err) {
        res.status(200).send({ erro: "erro BD: " + err });
    }
}

exports.getContainers = async (req, res) => {
    if(req.query.hasOwnProperty('IdContainer')){
        const {IdContainer} = req.query;

        try{
            const getAllContainersQuery = await db.query(
                "SELECT * FROM container WHERE IdContainer = $1",
                [IdContainer]
            );
            if (getAllContainersQuery.rows.length !== 0){
                res.status(200).send(
                    {
                        sucesso: 1,
                        containers: getAllContainersQuery.rows,
                        qtde_containers: getAllContainersQuery.rows.length
                    }
                );
            } else {
                res.status(200).send(
                    {
                        sucesso: 0,
                        message: "Nenhum contêiner com esses parâmetros encontrado."
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

exports.getCountContainers = async (req, res) => {
        const {IdContainer} = req.query;

        try{
            const getAllContainersQuery = await db.query(
                "SELECT Count(*) FROM container"
            );
            if (getAllContainersQuery.rows.length !== 0){
                res.status(200).send(
                    {
                        sucesso: 1,
                        containers_qtde: getAllContainersQuery.rows
                    }
                );
            } else {
                res.status(200).send(
                    {
                        sucesso: 0,
                        message: "Nenhum contêiner com esses parâmetros encontrado."
                    }
                );
            }
        } catch (err) {
            res.status(200).send({ erro: "erro BD: " + err });
        }
}

exports.getContainerByLocation = async (req, res) => {
    try{
        const getContainersByLocationQuery = await db.query(
            "SELECT L.cidade, L.IdLocation, COUNT(C.IdContainer) AS NumberOfContainers FROM Container C JOIN Location L ON C.IdLocation = L.IdLocation GROUP BY L.cidade, L.IdLocation;"
        );
        if(getContainersByLocationQuery.rows.length !== 0){
            res.status(200).send(
                {
                    sucesso: 1,
                    containers: getContainersByLocationQuery.rows,
                    qtde_locations: getContainersByLocationQuery.rows.length
                }
            );
        } else {
                res.status(200).send(
                    {
                        sucesso: 0,
                        message: "Nenhum contêiner com esses parâmetros encontrado."
                    }
                );
            }
    } catch (err) {
            res.status(200).send({ erro: "erro BD: " + err });
        }
}

exports.getContainerByContainerType = async (req, res) => {
    try{
        const getContainerByContainerType = await db.query(
            "SELECT T.name, T.idcontainertype, COUNT(C.IdContainer) AS NumberOfContainers FROM Container C JOIN ContainerType T ON C.idcontainertype= T.idcontainertype GROUP BY T.name, T.idcontainertype;"
        );
        if(getContainerByContainerType.rows.length !== 0){
            res.status(200).send(
                {
                    sucesso: 1,
                    containers: getContainerByContainerType.rows,
                    qtde_types: getContainerByContainerType.rows.length
                }
            );
        } else {
                res.status(200).send(
                    {
                        sucesso: 0,
                        message: "Nenhum contêiner com esses parâmetros encontrado."
                    }
                );
            }
    } catch (err) {
            res.status(200).send({ erro: "erro BD: " + err });
        }
}

exports.getContainerAlerts = async (req, res) => {
    try{
        const getContainerAlerts = await db.query(
            "SELECT COUNT(*) AS NumberOfContainersWithFalseFlag FROM Container WHERE flag = FALSE;"
        );
        if(getContainerAlerts.rows.length !== 0){
            res.status(200).send(
                {
                    sucesso: 1,
                    alerts: getContainerAlerts.rows
                }
            );
        } else {
                res.status(200).send(
                    {
                        sucesso: 0,
                        message: "Nenhum contêiner com esses parâmetros encontrado."
                    }
                );
            }
    } catch (err) {
            res.status(200).send({ erro: "erro BD: " + err });
        }
}