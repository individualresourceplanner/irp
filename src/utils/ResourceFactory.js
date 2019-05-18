export const EventFactory = {
    create: ( id, title, tags, price, geo) => {
        return {
            id:id,
            title:title,
            tags:tags,
            price:price,
            geo:geo
        }
    },
    createExample: ()=>{
        return {
            id:1337,
            title:'free aples',
            tags:["organice"],
            price:77,
            geo:[22.0,13.0]
        }
    }
}
