//@ Accesss : Private
//@ Desc : get add Sub Category Page
//@ Route : api/v1/subcategoryhandle/add-subcategory-page

export const add_subCategory_page = async (req,res)=>{
    try {
       res.render('backend/sub-category/add_subcategory') 
    } catch (error) {
        console.log(error)
    }
}

//------------------ End Add Sub Category Section 🐱‍🏍--------------------//

//@ Accesss : Private
//@ Desc : get  Sub Category Manage  Page
//@ Route : api/v1/subcategoryhandle/subcategory-manage-page

export const  manage_subCategory_page = async (req,res)=>{
    try {
        res.render('backend/sub-category/managesubCategory') 
    } catch (error) {
      console.log(error)  
    }
}