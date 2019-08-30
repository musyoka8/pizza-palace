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

    //add pizza displauy to the DOM dynamically
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
                                        <option value=""></option>
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
                                        <option value=""></option>
                                        <option value="pepperoni">Pepperoni</option>
                                        <option value="bacon">Bacon</option>
                                        <option value="mushrooms">Mushrooms</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="crust">Crust</label>
                                    <select name="crust" class="form-control" id="crust">
                                        <option value=""></option>
                                        <option value="crispy">Crispy</option>
                                        <option value="classic">Stuffed</option>
                                        <option value="glutenFree">Gluten Free</option>
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

    //collect form input to recalculate price
    
    let arr = [];
    let objArr = [];

    // function showResults(){
    //     arr = []
    //     // console.log(this);
    //     // const form = $('form')
    //     var result = $('form').serialize()

    //     const splitted = result.split('&');

    //     splitted.forEach(element => {
    //         let data = element.split('=');
    //         arr.push(data);
    //     });
       
        
    //     arr.forEach(function(element){

    //         let obj =Object.assign({},{[element[0]]:element[1]})
        
    //         objArr.push(obj);
    //      })
    
    //     //  console.log(objArr)
    //     }

    //     $('form :input').change(function(){
    //         objArr = [];
    //         showResults();
    //     })
    // showResults();

    $('form').change(function(){
        arr =[];
        objArr = []
        var result = $(this).serialize();
        const splitted = result.split('&');

        splitted.forEach(element => {
            let data = element.split('=');
            arr.push(data);
        });
        
        arr.forEach(function(element){
            let obj =Object.assign({},{[element[0]]:element[1]})
        
            objArr.push(obj);
        })
        const myObject = {};
        objArr.forEach(function(obj){
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    myObject[key] = obj[key]
                }
            }
        })
        console.log(myObject);
    })















})