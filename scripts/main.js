
const Pizza = function(name,size='small'){
    this.name = name;
    this.size = size;
    this.topping = null;
    this.crust = null;
    Object.defineProperty(this,'price',{
        get: function(){
            switch (this.size) {
                case 'medium': return this.listPrice[1]
                    break;
                case 'large':return this.listPrice[2]
                    break;
                default: return this.listPrice[0]
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
        case 'classic' : crustPrice = 100;
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

const bigMark = new BigMark('Big Mark');
const cheeseLove = new CheeseLove('Cheese Love')
const pepperoni = new Pepperoni('Pepperoni Craze')
availablePizza.push(bigMark,cheeseLove,pepperoni);


const orders = []

const computeChanges = function(pizza,object,card){
    pizza.size = object.size;
    pizza.topping = object.topping;
    pizza.crust = object.crust;

    const index = orders.findIndex(function(order){
        return order.details.name === pizza.name;
    })

    if(index == -1){
        orders.unshift({
            details:pizza,
            count:1
        })
        updatePrice(card,orders[0].details.getTotalPrice());
        updateCount(card,1)
    }else{
        orders[index].details = pizza;
        updatePrice(card,orders[index].details.getTotalPrice() * orders[index].count )
    }
    console.log(orders);

    // displayPrice.text(`${pizza.getTotalPrice()}`);
}
const keepCount = function(pizza,calc,card){
    const index = orders.findIndex(function(order){
        return order.details.name === pizza.name;
    })
    if(index == -1){
        if(calc == 'add'){
            orders.push({
                details:pizza,
                count:1
            })
        // card.find('.inCart').text = `1 in Cart`
        updateCount(card,'1 in Cart');

        }
    }else{
        if(calc == 'add'){
            orders[index].count += 1;
            updateCount(card,`${orders[index].count} in Cart`)
            let price = orders[index].details.getTotalPrice() * orders[index].count;
            updatePrice(card,price)
             
        }else{
            orders[index].count -= 1;
            updateCount(card,`${orders[index].count} in Cart`)
            let price = orders[index].details.getTotalPrice() * orders[index].count
            updatePrice(card,price)
        } 
    }
    console.log(orders);
}

function callKeepCount(id,calc,card){
    switch (id) {
        case 'Big-Mark': keepCount(bigMark,calc,card);
            break;
        case 'Cheese-Love':keepCount(cheeseLove,calc,card);
            break;
        case 'Pepperoni-Craze':keepCount(pepperoni,calc,card)
        default:
            break;
    }
}

function updateCount(card,count){
     card.find('.inCart').text(count)
}

function updatePrice(card,price){
    card.find('.price-display').text(price)
}

$(function(){

    //add pizza display to the DOM dynamically
    availablePizza.forEach(function(pizza){
        $('#card-display').append(`
            <div class="card" id="${(pizza.name).replace(' ','-')}">
                <div class="card-img-top"></div>
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
                                        <option value="classic">Classic</option>
                                        <option value="glutenFree">Gluten Free</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <button class="btn btn-secondary cart-btn">Add to cart</button>
                    <div class="order-btns">
                        <button class="btn btn-primary add">+</button>
                        <p class="inCart">0 in Cart</p>
                        <button class="btn btn-primary minus">-</button>
                    </div>
                    
                    
                </div>
            </div> 
        `)
    })

    //collect form input to recalculate price
    
    let arr = [];
    let objArr = [];

    $('form').change(function(){
        arr =[];
        objArr = []
        const result = $(this).serialize();
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
        // console.log(myObject);
        const currentCard = $(this).closest('.card');
        const pizzaId = currentCard.attr('id')
        // const priceDisplay = $(this).closest('.card').find('.price-display')
        switch (pizzaId) {
            case 'Big-Mark':
                computeChanges(bigMark,myObject,currentCard);
                break;
            case 'Cheese-Love':
                computeChanges(cheeseLove,myObject,currentCard);
                break;
            case 'Pepperoni-Craze':
                computeChanges(pepperoni,myObject,currentCard);
                break;
            default:
                console.log('Sth broke')
                break;
        }
        

    })

    $('.order-btns').hide();
    $('.cart-btn').click(function(){
        $(this).next().show()
        $(this).hide();
    })

    $('.add').click(function(){
        const card = $(this).closest('.card')
        const id = card.attr('id');
        callKeepCount(id,'add',card)
    })

    $('.minus').click(function(){
        const card = $(this).closest('.card')
        const id  = card.attr('id');
        callKeepCount(id,'minus',card)

    })
   
    $('.close').click(function(){
        $('#mymodal').hide();
    })
    $('.cart').click(function(){
        $('#mymodal').show();
    })


})