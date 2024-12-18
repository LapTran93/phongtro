import db from '../models'


export const getPricesServices =() => new Promise(async(resovle, reject)=>{
    try {
        const response = await db.Price.findAll({
            raw : true,
            attributes : ['code','value']
        })
        resovle({
            err : response ? 0 : 1,
            msg : response ? 'Đã lấy Price' : 'Lấy Price thất bại.',
            response 
        })
    } catch (error) {
        reject(error)
    }
})