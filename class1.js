let babel = require("@babel/core")
let t = require("@babel/types");
let code = `
class Zzb{
    constructor(name){
        this.name = name;
    }
    getName (){
        return this.name
    }
}
`

let transformClass = {
    visitor:{
        ClassDeclaration(path,state){
          let node = path.node;
          let id = node.id; // 获取当前的类名 
          let methods = node.body.body; // 拿到当前的两个函数 把类声明变成函数声明
          methos = methods.map(item=>{
              if(item.kind ==='constructor'){
                  return t.functionDeclaration(id,item.params,item.body,false,false)
              }else{
                  let left = t.memberExpression(t.memberExpression(id,t.identifier("prototype")),item.key)
                  let right =  t.functionExpression(null,item.params,item.body,false,false)
                  return t.expressionStatement(t.assignmentExpression('=',left,right))
              }
          })
          path.replaceWithMultiple(methos)
        }
    }
}
let r = babel.transform(code,{
    plugins:[
        transformClass
    ]
})
console.log(r.code)