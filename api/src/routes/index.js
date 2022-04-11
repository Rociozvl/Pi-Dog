const { Router } = require('express');
// Importar todos los routers;
const {default:axios} = require ('axios');
const {YOUR_API_KEY}  = process.env;
const {Breed , Temperament } =  require ("../db");
const express = require('express');
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiUrl = async ()=>{
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    const apiInfo = await apiUrl.data.map(d => {
        const temperaments = d.temperament?.toString().split(",")
        const fixedTemps =[]
        temperaments?.forEach((e)=>{
            fixedTemps.push({"name": e.trim()})
        })
        const fixedHeight =[]
        d.height.metric?.split("-")?.forEach(e=>{
            fixedHeight.push(e.trim())
        })

        if(!fixedHeight[1]){
            fixedHeight.push(fixedHeight[0])
        }

        const fixedWeight =[]
        d.weight.metric.split("-")?.forEach(e=>{
            fixedWeight.push(e.trim())
        })
        if(!fixedWeight[1]){
            fixedWeight.push(fixedWeight[0])
        }

        return{
            ID: d.id,
            name: d.name,
            img: d.image.url,
            height: fixedHeight,
            weight: fixedWeight,
            lifeSpan: d.life_span,
            temperaments: fixedTemps,
          
        }
    })
    return apiInfo;
};
//--GET data from the database--
const getDbData = async ()=>{
    return await Breed.findAll({
        include:{
            model: Temperament,
            attributes: ["name"],
            through:{
                attributes:[],
            }

        }
    })
};
//--Api and database mixed--//
const getAllDogs = async()=>{
    const apiUrl = await getApiUrl();
    const dbData = await getDbData();
    const allData = apiUrl.concat(dbData);
    return allData;
     };
router.get("/dogs", async(req,res)=>{
    const name = req.query.name;
    const allDogs = await getAllDogs();
    if(name){
        const dog = allDogs.filter( el => el.name.toLowerCase().includes(name.toLowerCase()));
        dog.length ? res.status(200).send(dog) : res.status(404).send("Dog not found");
        
    }else{
        res.status(200).send(allDogs)
    }
     });


router.get("/dogs/:idRaza", async(req,res)=>{
    const idRaza = req.params.idRaza;
    const allDogs = await getAllDogs();
    const dog = allDogs.filter( el => el.ID == idRaza);
    dog.length?
    res.status(200).json(dog):
    res.status(404).send("Dog not found");

     })

router.get("/temperament" , async (req,res)=>{
    const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    const temperaments = temperamentsApi.data.map(t => t.temperament);
    const temps = temperaments.toString().split(",")
    temps.forEach(e =>{
        let i = e.trim()
        Temperament.findOrCreate({
            where:{name: i}
        })
     })
     const allTemp = await Temperament.findAll();
     res.send(allTemp);
     })


 router.post("/dog",async (req,res)=>{  
     let{
         name,
         min_height,
         max_height,
         min_weight,
         max_weight,
        life_span,
         temperaments,
         image
     }= req.body

     const fixedHeight = []
     const minHeight = min_height.trim();
     const maxHeight = max_height.trim()
     fixedHeight.push(minHeight, maxHeight)

     const fixedWeight = []
     const minWeight = min_weight.trim();
     const maxWeight = max_weight.trim()
     fixedWeight.push(minWeight, maxWeight)

    let dog = await Breed.create({
    name,
    height: fixedHeight,
    weight: fixedWeight,
    life_span,
    image: image ? image : "https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg",
    })

    let associatedTemp = await Temperament.findAll({
       where: { name: temperaments},
    })

   dog.addTemperament(associatedTemp)

   res.status(200).send("Dog created succesfully!")
})

 
 
 router.use(express.json());
module.exports = router;
