const Pizza = function(name,size){
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

const HeavyJoe = function(name,size){
    Pizza.call(this,name,size);
    this.listPrice = [400,600,1200]
}
HeavyJoe.prototype = new Pizza();




const myPizza = new HeavyJoe('BigMark','small');
console.log(myPizza);

$(function(){



























})