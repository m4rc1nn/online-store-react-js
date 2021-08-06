let cartItems = [];

module.exports.updateCart = () => {
    cartItems = JSON.parse(localStorage.getItem('cart')) || [];
}

module.exports.addItem = (id, itemName, size, price, amount, image) => {
    this.updateCart();
    for(let x=0; x<amount; x++){
        let item = new Item(id, itemName, size, price, image);
        cartItems.push(item) 
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

module.exports.removeItem = (id, itemName, size, price, amount) => {
    for(let x=0; x<amount; x++){
        let ni = new Item(id, itemName, size, price);
        let items = cartItems;
        let removeIndex = -1;
        items.forEach((item, index) => {
            if(item.name === ni.name && item.size === ni.size && item.price === ni.price){
                removeIndex = index;
            }
        })
        if(removeIndex != -1){
            console.log(removeIndex)
            items.splice(removeIndex, 1);
        }
        cartItems = items; 
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

module.exports.getItems = () => {
    this.updateCart();
    return cartItems;
}

function Item(id, itemName, size, price, image){
    this.id = id;
    this.name = itemName;
    this.size = size;
    this.price = price;
    this.image = image;
}