let babel = require("@babel/core"); //babel的核心库用来转换为ast
let t = require("@babel/types") // 他的第一个功能是可以构建ast对象  // 判断当前ast是什么类型
let code = `let sum = (a,b)=>{return a+b}`;
let transformArrow = {
    visitor:{  //访问者模式  node = {type}
        VariableDeclaration(path){   //path表示路径，state表示状态。
            let node = path.node
            path.node.kind = 'var'
        },
        ArrowFunctionExpression(path){
            // console.log(path.node)
            let node = path.node; //获取当前节点的对象
            let params1 = node.params;  // 获取节点的内容
            let body = node.body;   // 获取箭头函数的参数
            // console.log(t.isVariableDeclaration())
            // t.variableDeclaration(kind, declarations)
            if(!t.isBlockStatement(body)){  //判断当前的body是不是代码块 
                body = t.blockStatement([t.returnStatement(body)])
            }
            let obj = t.functionExpression(null, params1,body );
            path.replaceWith(obj) // 用来进行替换
        }
    }
}

let r = babel.transform(code,{
    plugins:[
        transformArrow
    ]
})
console.log(r.code)