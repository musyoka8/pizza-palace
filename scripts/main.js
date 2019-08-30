const Pizza = function(name,size){
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


const BigMark = function(name,size){
    Pizza.call(this, name, size);
    this.listPrice = [500,750,1000]
}

const HeavyJoe = function(name,size){
    Pizza.call(this,name,size);
    this.listPrice = [400,600,1200]
}




const myPizza = new HeavyJoe('BigMark','small');
console.log(myPizza);






$(function(){



























})