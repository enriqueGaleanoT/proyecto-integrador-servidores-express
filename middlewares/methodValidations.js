const validarMetodos = (req, res, next)=>{
    const metodos = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!metodos.includes(req.method)) {
        return res.status(404).send({message: "This Method is not allowed"});
    }
    next();
}

const validateMethodPOST = (req, res, next) =>{
    const dataPOST = req.body;
    const {id, description, isCompleted} = req.body;
    if(Object.keys(req.body).length === 0){
        console.log("entra aqui");
        return res.status(404).send({error: "Dont leave the body empty"});
    } else if (!id || !description || !isCompleted) {
        return res.status(404).send({error: "You need the appropriate JSON attributes"});
    }

    if ((dataPOST.id === " ") || (dataPOST.id === "")) {
        return res.status(404).send({error: "Attribute Id is not filled"});
    }else if (dataPOST.isCompleted === " " || dataPOST.isCompleted === ""){
        return res.status(404).send({error: "Attribute isCompleted is not filled"});
    }else if(dataPOST.description === " " || dataPOST.description === ""){
        return res.status(404).send({error: "Attribute description is not filled"});
    }
    console.log(id + " " + isCompleted +  " " +  description);
    next();
};
const validateMethodPUT = (req, res, next) =>{
    const dataPUT = req.body;
    const {id, description, isCompleted} = req.body;

    if (!id || !description || !isCompleted) {
        return res.status(404).send({error: "You need the appropriate JSON attributes"});
    }

    if (Object.keys(req.body).length === 0) {
        return res.status(404).send({error: "Dont leave the body empty"})
    }else if (dataPUT.id === " " || dataPUT.id === "") {
        return res.status(404).send({error: "Attribute Id is not filled"});
    }else if (dataPUT.isCompleted === " " || dataPUT.isCompleted === ""){
        return res.status(404).send({error: "Attribute isCompleted is not filled"});
    }else if(dataPUT.description === " " || dataPUT.description === ""){
        return res.status(404).send({error: "Attribute description is not filled"});
    }
    next();
};


module.exports = { 
    validarMetodos,
    validateMethodPUT,
    validateMethodPOST
};