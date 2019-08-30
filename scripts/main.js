const Pizza = function(name,size){
    this.name = name;
    this.size = size;
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


// const myPizza = new Pizza('BigMark','small');
// console.log(myPizza);






$(function(){



























})