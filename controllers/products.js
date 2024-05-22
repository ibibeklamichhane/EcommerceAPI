const Product = require("../models/product");
const getAllProducts = async (req,res) => {
    const {company,name,sort,featured,select} = req.query;
    const queryObject = {};
    if(company){
        queryObject.company = company;
        console.log(queryObject);
        }

        if(featured){
            queryObject.featured = featured;
         
            }

        if(name){
            queryObject.name = { $regex:name, $options: "i"};
           
            }

        let apiData = Product.find(queryObject);

        if(sort) {
            let sortFix = sort.replace(",", " ");
            apiData = apiData.sort(sortFix);
        }

        //select name , company , price
        if(select) {
            let selectFix = select.split(",").join(" ");
            apiData = apiData.select(selectFix);
        }




        //pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;
        const skip = (page - 1) * limit;
        apiData = apiData.skip(skip).limit(limit);

            console.log(queryObject);

    const myData = await apiData;
    res.status(200).json({
       myData ,nbHits:myData.length
    })
};

const getAllProductsTesting = async (req,res) => {
    const myData = await Product.find(req.query).select("name,company,price ");
    res.status(200).json({
        myData
    })
};

module.exports = {
    getAllProducts,
    getAllProductsTesting
}