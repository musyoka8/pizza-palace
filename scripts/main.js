const Pizza = function(name,size='small'){
    this.name = name;
    this.size = size;
    this.topping = null;
    this.crust = null;
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
                <div id="${(pizza.name).replace(' ','-')}" class="card-img-top"></div>
                <div class="card-body">
                    <h5 class="card-title">${pizza.name}</h5>
                    <div class="price-display">${pizza.getTotalPrice()}</div>
                </div>
                <div style="clear:both;"><div>
                <div class="card-footer">
                    <form>
                        <div class="form-row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="size">Size</label>
                                    <select name="size" class="form-control" id="size">
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="topping">Topping</label>
                                    <select name="topping" class="form-control" id="topping">
                                        <option value="spinach">Spinach</option>
                                        <option value="pineapple">Pineapple</option>
                                        <option value="sausage">Sausage</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="crust">Crust</label>
                                    <select name="crust" class="form-control" id="crust">
                                        <option value="crispy">Crispy</option>
                                        <option value="stuffed">stuffed</option>
                                        <option value="glutenFree">glutenFree</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <button class="btn btn-secondary cart-btn">Order</button>
                </div>
            </div> 
        `)
    })












})