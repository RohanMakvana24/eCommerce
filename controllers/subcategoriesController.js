//@ Accesss : Private
//@ Desc : get add Sub Category Page
//@ Route : api/v1/subcategoryhandle/add-subcategory-page

export const add_subCategory_page = async (req,res)=>{
    try {
       res.render('backend/sub-category/add_categories') 
    } catch (error) {
        console.log(error)
    }
}