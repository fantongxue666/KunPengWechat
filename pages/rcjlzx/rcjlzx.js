import {env} from '../../profile.js'
var app = getApp();
Page({
  data:{
    winHeight:"",//窗口高度
    currentTab:0, //预设当前项的值
    scrollLeft:0, //tab标题的滚动条位置
    expertList:[],
    obj:[],
    obj1:[],
    showModal:false
  },
  go:function(){
    this.setData({
      showModal:false
    });
   },
  test:function(e){
    var that=this;
    var index=e.currentTarget.dataset.index;
    wx.showLoading({
      title: '正在加载...',
    })
    wx.request({
      url: env.url+'/wechat/getIsvAndProductByProjectUuid?projectuuid='+index,
     method: 'GET',
     success(res) {
         console.log(res)
         var list=res.data;
         for(var i=0;i<list.length;i++){
           if(list[i].productname==null || list[i].productname==''){
              list[i]={
                isvname:list[i].isvname,
                productname:'暂无产品'
              }
           }
         }
         that.setData({
          obj:res.data
         });
      }
   })
  
   this.setData({
     showModal:true
   });
   wx.hideLoading();
  },


  // 滚动切换标签样式
  switchTab:function(e){
    this.setData({
      currentTab:e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav:function(e){
    var cur=e.target.dataset.current;
    if(this.data.currentTaB==cur){return false;}
    else{
      this.setData({
        currentTab:cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor:function(){
   if (this.data.currentTab>4){
    this.setData({
     scrollLeft:300
    })
   }else{
    this.setData({
     scrollLeft:0
    })
   }
  },
  onLoad: function() { 
    var that = this; 
    wx.request({
      url: env.url+'/wechat/stxmlb',
     method: 'POST',
     success(res) {
         console.log(res)
         that.setData({
          expertList:res.data
         });
      }
   })
   wx.request({
    url: env.url+'/wechat/selectISVandPaiming',
   method: 'GET',
   success(res) {
     console.log("ISV详情页")
       console.log(res)
       var list=res.data;
       for(var i=0;i<list.length;i++){
         var percent=Math.round(list[i].ywc/ (list[i].count) * 10000) / 100.00;
         list[i]={
           ywc:list[i].ywc,
           company_name:list[i].company_name,
           count:list[i].count,
           percent:percent
         }
       }
       that.setData({
        obj1:res.data
       });
    }
 })



    // 高度自适应
    wx.getSystemInfo( { 
      success: function( res ) { 
        var clientHeight=res.windowHeight,
          clientWidth=res.windowWidth,
          rpxR=750/clientWidth;
       var calc=clientHeight*rpxR-180;
        console.log(calc)
        that.setData( { 
          winHeight: calc 
        }); 
      } 
    });
  }, 
  footerTap:app.footerTap
})
