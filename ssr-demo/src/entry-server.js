const createApp = require('./app.js')

const getData = function(){
  return new Promise((reslove, reject) => {
    let str = 'this is a async data !'
    reslove(str)
  })
}

module.exports = (context) => {
  return new Promise(async(reslove,reject) => {
    let {url} = context;
    // 数据传递
    context.propsData = 'this is a data from props!'
    context.asyncData = await getData();
    let {app, router} = createApp(context);
    router.push(url);

    router.onReady(()=>{
      let matchedComponents = router.getMatchedComponents();
      if(!matchedComponents.length){
        return reject();
      }
      reslove(app);
    },reject)
  })
}