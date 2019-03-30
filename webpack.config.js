let path = require("path");
console.log('999',path.resolve(__dirname,'index.html'))
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"bundle.js"
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.js$/,
                use:[
                    {
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env',
                            '@babel/preset-react',
                        ],
                        plugins:[
                            ['import',{ "libraryName":"antd",style:"css" }]// 当引入lodash的时候 按需引入
                        ]
                    },
                    
                }]
            },
        ]
    },
    // module:{
    //     rules:[
    //         {
    //             test:/\.css$/,
    //             use:['style-loader','css-loader']
    //         },
    //         {
    //             test:/\.js$/,
    //             use:[{
    //                 loader:"babel-loader",
    //                 options:{
    //                     presets:[
    //                         '@babel/preset-env',
    //                         '@babel/preset-react',
    //                     ]
    //                 },
    //                 plugins:[  //babel-plugin-import //能够实现按需加载
    //                     ['import',{ "libraryName":"antd",style:"css" }]// 当引入lodash的时候 按需引入
    //                 ]
    //             }]
    //         }
    //     ]
    // },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'index.html'),
        })
    ]
}


