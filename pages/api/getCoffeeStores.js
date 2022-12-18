import { FetchCoffeeShops } from "../../lib/coffee-shop"


const getCoffeeStores = async (req, res)=>{
    try {
        const {latlong} = req.query
        console.log("added latling", latlong)
         const resp = await FetchCoffeeShops(latlong)
         return res.status(200).json(resp)
    } catch (error) {
        return  res.status(400).json({message: error})
    }
}


export default getCoffeeStores