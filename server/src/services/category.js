import db from '../models'


export const getCategoryServices =() => new Promise(async(resovle, reject)=>{
    try {
        const response = await db.Category.findAll({
            raw : true,
            attributes : ['code', 'value']
        })
        resovle({
            err : response ? 0 : 1,
            msg : response ? 'Đã lấy Category' : 'Lấy Category thất bại.',
            response 
        })
    } catch (error) {
        reject(error)
    }
})