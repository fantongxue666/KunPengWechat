const current='dev'
const profiles={
  'dev':{
    url:'http://localhost:7000'
  },
  'localProd':{
    url:'http://localhost:9000'
  },
  'prod':{
    url:'https://kpit.huanghe.com.cn'
  }
}

const env=profiles[current]
export {env}