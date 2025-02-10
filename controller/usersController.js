import { Op } from "sequelize"
import UserModel from "../model/User.js"

export const getUsers = async (req, res) => {  //sẽ tối ưu với where id > lastid, và TH nữa là đánh index sau
    try {
        const query = req.query
        const sort = query.sort === "asc" ? "ASC" : "DESC"
        const { page = 1, pageSize = 10, sortBy = "id", search = "", lastId = 0 } = req.query
        const pageNumber = Number(page)
        const limit = Number(pageSize)
        const offset = (pageNumber - 1) * limit;

        // Chỉ cho phép các cột hợp lệ
        const allowedSortFields = ["id", "username", "email"];
        const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "id";

        // Điều kiện WHERE (nếu có lastId thì chỉ lấy dữ liệu sau nó)
        const whereCondition = {
            username: { [Op.like]: `${search}%` }
        };

        //lastId sẽ nhanh hơn vì k phải offset qua một loạt các hàng bỏ qua
        if (lastId) {
            whereCondition.id = sort === "ASC" ? { [Op.gt]: lastId } : { [Op.lt]: lastId };
        }


        const users = await UserModel.findAll({
            where: whereCondition,
            order: [[`${safeSortBy}`, `${sort}`]],
            limit: limit,
            // offset: offset  // vì có lastId thì k cần offset, k có lastId thì là lần đầu lấy

        });

        const total = await UserModel.count({
            where: {
                username: {
                    [Op.like]: `${search}%`
                }
            },
        });


        return res.status(200).json({
            data: users,
            paginate: {
                page: pageNumber,
                pageSize: limit,
                total: total
            }
        })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: error.message })
    }
}


