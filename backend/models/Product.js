class Product{
    id;
    title;
    description;
    price;
    quantity;

    constructor(t, d, p, q){
        this.id = Date.now()+"_"+t;
        this.title = t;
        this.description = d;
        this.price = p;
        this.quantity = q;
    }

    save(){
        db.push(this);
        return this;
    }

    edit() {
        const index = db.findIndex(p => p.id == this.id);
        db.splice(index, 1, this);
        return this;
    }

    static getAll() {
        return db;
    }

    static deleteById(pId) {
        const index = db.findIndex(p => p.id == pId);
        const deletedProduct = db[index];
        db.splice(index, 1);
        return deletedProduct;
    }

    static findById(pId) {
        const index = db.findIndex(p => p.id == pId);
        return db[index];
    }

    static makeOrder(items) {
        console.log({items});
        for(let item of items){
            const index = db.findIndex(p => p.id == item.productId);
            if(index == -1){return false;}
            if(db[index].quantity < item.quantity){return false;};
        }
        for(let item of items){
            const index = db.findIndex(p => p.id == item.productId);
            db[index].quantity -= item.quantity;
        }
        console.log({db});
        return true;
    }
}

let db = [
    new Product('Apple','fruits',1.5,10),
    new Product('T-shirt','clothes',19.99,9),
    new Product('Car','toys',35.99,50),
    new Product('Rose','flower',10.35,20)
];


module.exports = Product;

