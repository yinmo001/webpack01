console.log('hello wk');

require('./index.css');
require('./index.less')

let fn = () => {
  console.log('log')
}
fn()

// @log 类装饰器
class A{
  a = 1
}
let a = new A()
console.log(a.a)

let p = new Promise(resolve => {
  resolve('promise')
}).then(res => {
  console.log(res)
})

console.log($)

import logo from './logo.jpg'
let img = new Image()
img.src = logo
document.body.appendChild(img)

import moment from 'moment'
// 手动引入
import 'moment/locale/zh-cn'
// 设置语言
moment.locale('zh-cn')

let r = moment().endOf('day').fromNow()
let m = moment().format('L');
console.log(r)
console.log(m)