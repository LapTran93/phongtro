import * as services from '../services/category'


export const getCategory =  async (req ,res) =>{
    try {
        const response = await services.getCategoryServices()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err : -1,
            msg : 'Lỗi get Category controller' +error
        })
    }
}