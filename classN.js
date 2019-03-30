class Zzb{
    constructor(name){
        this.name = name;
    }
    getName (){
        return this.name
    }
}

//转换后
function Zzb(name){
    this.name = name;
}
Zfpx.prototype.getName = function(){
    return this.name
}