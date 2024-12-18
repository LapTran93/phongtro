import * as priceServices from '../services/price'

export const getPrice =  async(req , res)=>{
    try {
        const response  =  await priceServices.getPricesServices()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg : 'Faild at price controller' + error
        })
    }
}