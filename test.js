let code = `
import React,{Component} from 'react';
import apply,{flatten,join} from 'lodash'
`
let babel = require("@babel/core");
let t = require("@babel/types")
let importPlugin = {
    visitor:{
        ImportDeclaration(path,state){
            let node = path.node;
            let specifiers = node.specifiers;
            if(state.opts.libraryName === node.source.value){
            // 如果不是默认导出 我才进行判断
                if(!(specifiers.length===1&&t.isImportDefaultSpecifier(specifiers[0]))){
                    let obj = specifiers.map(item=>{
                        // 如果当前已经是默认导出，就不要再替换，否则就会死循环
                        if(!t.isImportDefaultSpecifier(item)){
                            // 如果是{} 这种方式的话 ，就变成默认导出
                            return t.importDeclaration([t.importDefaultSpecifier(item.local)],
                            t.stringLiteral(`${node.source.value}/lib/${item.local.name}`))
                        }else{
                            // import apply,{flatten,join} from 'lodash'`
                            // 如果是默认导出
                            return t.importDeclaration([t.importDefaultSpecifier(item.local)],
                            t.stringLiteral(`${node.source.value}`))
                        }
                    })
                    path.replaceWithMultiple(obj)
                }
            }
            
        }
    }
}
let r = babel.transform(code,{
    plugins:[
        // importPlugin 可以这样写 也可以[importPlugin]这样写 这样写的目的是为了方便传参
        [importPlugin,{ "libraryName":"lodash" }]
    ]
})
console.log(r.code)
// ast 用的是@babel/core 他的核心是babylon 把我们的语法转化成ast
// @bbael/core.transform 默认会自动调用babel-traverse visitor
// babel-generator 生成最后的结果