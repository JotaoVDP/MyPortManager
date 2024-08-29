const db = require('../config/database')

exports.registerMachineType = async (req, res) => {
    if(req.body.hasOwnProperty('IdMachineType') && req.body.hasOwnProperty('Description') && req.body.hasOwnProperty('Height') 
        && req.body.hasOwnProperty('Width') && req.body.hasOwnProperty('Length') && req.body.hasOwnProperty('Model') 
        && req.body.hasOwnProperty('Sector')) {
        
        const {IdMachineType, Description, Height, Width, Length, Model, Sector} = req.body;

        try {
            const insertQuery = await db.query(
                "INSERT INTO MachineType (IdMachineType, Description, Height, Width, Length, Model, Sector) VALUES ($1, $2, $3, $4, $5, $6, $7);",
                [IdMachineType, Description, Height, Width, Length, Model, Sector]
            );
            res.status(200).send({ sucesso: 1 });
        } catch (err) {
            res.status(200).send({ erro: "erro BD: " + err });
        }
    } else {
        res.status(200).send({ erro: "faltam parametros" });
    }
}

exports.registerMachine = async (req, res) => {
    if(req.body.hasOwnProperty('IdMachine') && req.body.hasOwnProperty('IdMachineType') && req.body.hasOwnProperty('BoughtDate') 
        && req.body.hasOwnProperty('LastMaintenance') && req.body.hasOwnProperty('IdLocation')) {
        
        const {IdMachine, IdMachineType, BoughtDate, LastMaintenance, IdLocation} = req.body;

        try {
            const insertQuery = await db.query(
                "INSERT INTO Machine (IdMachine, IdMachineType, BoughtDate, LastMaintenance, IdLocation) VALUES ($1, $2, $3, $4, $5);",
                [IdMachine, IdMachineType, BoughtDate, LastMaintenance, IdLocation]
            );
            res.status(200).send({ sucesso: 1 });
        } catch (err) {
            res.status(200).send({ erro: "erro BD: " + err });
        }
    } else {
        res.status(200).send({ erro: "faltam parametros" });
    }
}

exports.getMachineTypes = async (req, res) => {
    try {
        const getAllMachineTypesQuery = await db.query(
            "SELECT * FROM machinetype"
        );
        if (getAllMachineTypesQuery.rows.length !== 0){
            res.status(200).send(
                {
                    sucesso: 1,
                    machine_types: getAllMachineTypesQuery.rows,
                    qtde_machine_types: getAllMachineTypesQuery.rows.length
                }
            );
        } else {
            res.status(200).send(
                {
                    sucesso: 0,
                    message: "Nenhum tipo de máquina encontrado."
                }
            );
        }
    } catch (err) {
        res.status(200).send({ erro: "erro BD: " + err });
    }
}

exports.getMachines = async (req, res) => {
    if(req.query.hasOwnProperty('IdMachine')){
        const {IdMachine} = req.query;

        try{
            const getAllMachinesQuery = await db.query(
                "SELECT * FROM machine WHERE IdMachine = $1",
                [IdMachine]
            );
            if (getAllMachinesQuery.rows.length !== 0){
                res.status(200).send(
                    {
                        sucesso: 1,
                        machines: getAllMachinesQuery.rows,
                        qtde_machines: getAllMachinesQuery.rows.length
                    }
                );
            } else {
                res.status(200).send(
                    {
                        sucesso: 0,
                        message: "Nenhuma máquina com esses parâmetros encontrada."
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
