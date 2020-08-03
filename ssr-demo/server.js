const express = require('express');
// const { request, response } = require('express');
const app = express();
// const Vue = require("vue");
const App = require('./src/entry-server')
// const vueServerRender = require("vue-server-renderer").createRenderer();
let path = require("path");
const vueServerRender = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync(path.join(__dirname, "./index.html"), 'utf-8')
})

app.get('*', async(request, response) => {
  
  // const vueApp = new Vue({
  //   data:{
  //     message: 'hello , ssr'
  //   },
  //   template: `<h1>{{message}}</h1>`
  // });
  response.status(200);
  response.setHeader("content-type", 'text/html;charset-utf-8');

  let {url} = request;
  let vm;
  vm = await App({url})
  vueServerRender.renderToString(vm).then((html) => {
    response.end(html)
  }).catch(err => console.log(err))
})

app.listen(3001, () => {
  console.log('服务已开启')
})