// ast 就是把源代码 转换成树状结构
// 1) 遍历这个树 2)进行树的更改 3) 最终更改后产生最新的代码

// esprima 把代码先转换成树 ast 
// estraverse 深度优先（如果有子节点就去遍历子节点） 遍历树后
// escodegen 重新生成我们的代码s

let code = `function ast(){}`
let esprima = require("esprima");
let estraverse = require("estraverse");
let escodegen = require("escodegen")
let ast = esprima.parseScript(code);
estraverse.traverse(ast,{
    enter(node){ //参数就是当前节点 节点有type 先进去访问的时候后出来
        // console.log('entry:'+node.type)
        if(node.type ==='Identifier'){
            node.name="hello"
        }
    },
    leave(node){
        // console.log('leave:'+node.type)
    }
})
let code1 = escodegen.generate(ast);
console.log(code1)   // `function hello(){}`