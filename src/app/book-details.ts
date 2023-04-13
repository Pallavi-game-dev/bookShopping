export interface BookDetails {
   
    id:string,
    title: string,
    img:string,
    author:string,
    seller:string,
    price: string,
    discount:string,
    category: [],
    infomation:{},
    description:string
  
}
export interface userMetaData {
    id:string,
    userID: string,
    cart: [],
    wishlist: [],
    buyproducts: []
}
