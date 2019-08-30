const Pizza = function(name,size='small'){
    this.name = name;
    this.size = size;
    this.topping = 'mushrooms';
    this.crust = 'puff';
    Object.defineProperty(this,'price',{
        get: function(){
            switch (this.size) {
                case 'small': return this.listPrice[0]
                    break;
                case 'medium': return this.listPrice[1]
                    break;
                case 'large':return this.listPrice[2]
                default: alert('error')
                    break;
            }
        }
    })
}

Pizza.prototype.getTotalPrice = function(){
    let toppingPrice;
    let crustPrice;
    switch (this.topping) {
        case 'pepperoni': toppingPrice = 100;
            break;
        case 'mushrooms': toppingPrice = 200;
            break;
        case 'onions' : toppingPrice = 80;
            break;
        case 'bacon' : toppingPrice = 150;
            break;
        default: toppingPrice = 0;
            break;
    }

    switch (this.crust) {
        case 'glutenFree': crustPrice = 300;
            break;
        case 'puff': crustPrice = 170;
            break;
        case 'crispy' : crustPrice = 200;
            break;
        case 'classic' : crustPrice = 10;
            break;
        default: crustPrice= 0;
            break;
    }
    

    return toppingPrice + crustPrice + this.price;
   
}

const BigMark = function(name,size){
    Pizza.call(this, name, size);
    this.listPrice = [500,750,1000]
}
BigMark.prototype = new Pizza();

const CheeseLove = function(name,size){
    Pizza.call(this,name,size);
    this.listPrice = [700,1000,1300]
}
CheeseLove.prototype = new Pizza();

const Pepperoni = function(name,size){
    Pizza.call(this,name,size);
    this.listPrice = [650,950,1150]
}
Pepperoni.prototype = new Pizza();

const  availablePizza = [];

const bigmark = new BigMark('Big Mark');
const cheeseLove = new CheeseLove('Cheese Love')
const pepperoni = new Pepperoni('Pepperoni Craze')
availablePizza.push(bigmark,cheeseLove,pepperoni);



$(function(){

    availablePizza.forEach(function(pizza){
        $('#card-display').append(`
            <div class="card">
                <div id="${pizza.name}" class="card-img-top"></div>
                <div class="card-body">
                    <h5 class="card-title">${pizza.name}</h5>
                </div>
                <div class="card-footer">
                    <button class="btn btn-secondary cart-btn">Order</button>
                </div>
            </div> 
        `)
    })












})