import {env} from '../../profile.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    userId:'',
    bookNum:0,
    bookName:'',
    MyBorrowList:[],
    bookList:[],
    result: '',
    curIdx: 0,
    listInfo: [
     {
     text: '书库',
     imgUrl: 'https://img-blog.csdnimg.cn/2020090712212438.png',
     curUrl: 'https://img-blog.csdnimg.cn/2020090712212439.png',
     },
     {
     text: '借书',
     imgUrl: 'https://img-blog.csdnimg.cn/20200907122053724.png',
     curUrl: 'https://img-blog.csdnimg.cn/20200907122053722.png',
     },
     {
     text: '我的',
     imgUrl: 'https://img-blog.csdnimg.cn/20200907121832317.png',
     curUrl: 'https://img-blog.csdnimg.cn/20200907121832326.png',
     },
    ]
  },
  getValue(e){
    const value=e.detail.value;
    this.setData({
      bookName:value
    })
  },
  chooseImg:function(e){
   var id = e.currentTarget.dataset.id;
   if(id==0){
     //书库模块
     this.setData({
       curIdx:0
     });
   }else if(id==1){
     //借书模块
     this.setData({
      curIdx:1
    });

   }else if(id==2){
     //我的模块
     this.setData({
      curIdx:2
    });
   }
  },
  huanshu:function(){
    var that=this;
    var identify=wx.getStorageSync('identify');
    if(identify=="gly"){
      // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        console.log("扫描结果："+result);
        this.setData({
          result: result,
        })
        
        //设置正确二维码长度7位数字
        if(result!=null&&result.length==7){
          var userId=wx.getStorageSync('userId');
          wx.showLoading({
            title: '正在加载',
          });
          wx.request({
            url: env.url+'/wechat/giveBook?userId='+userId+'&bookId='+result,
           method: 'GET',
           success(res) {
            wx.hideLoading();
           if(res.data==1){
             wx.showToast({
               title: '您已还书',
               duration:1500,
                success:res=>{
                  setTimeout(function() {
                    that.onLoad();
                  }, 1500)
                }
             })
           }else{
             wx.showToast({
               title: '该书无人借出',
             })
           }
            
           }
           
         })



         
        }else{
          wx.showToast({
            title: '二维码无效'
          })
        }

      }
    })
    }else{
      wx.showModal({
        title: '提示',
        content: '抱歉，您没有权限还书，请与管理员联系',
        confirmText: "知道了",
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
          console.log('用户点击确定')
          } else if (res.cancel) {
          console.log('用户点击取消')
          }
        }
      })
    }
  },

  jieshu:function(){
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        console.log("扫描结果："+result);
        this.setData({
          result: result,
        })
        
        //设置正确二维码长度7位数字
        if(result!=null&&result.length==7){
          var userId=wx.getStorageSync('userId');
          wx.showLoading({
            title: '正在加载',
          });
          wx.request({
            url: env.url+'/wechat/insertBorrowInfo?userId='+userId+'&bookId='+result,
           method: 'GET',
           success(res) {
            wx.hideLoading();
            if(res.data==1||res.data==2||res.data==4){
              wx.navigateTo({
                url: '../ok/ok?data='+res.data
              })
            }else if(res.data==3){
              wx.showToast({
                title:'已有人预约，请排队等候'
              });
            }else if(res.data==5){
              wx.showToast({
                title:'您已借出'
              });
            }else if(res.data==6){
              wx.showToast({
                title:'您已申请'
              });
            }else{
              wx.showToast({
                title:'扫码异常'
              });
            }
            
           }
           
         })



         
        }else{
          wx.showToast({
            title: '二维码无效'
          })
        }

      }
    })
  },

  toDetail:function(e){
    var id = e.currentTarget.dataset.index;
    var index2 = e.currentTarget.dataset.index2;
    console.log("要传的参数："+id)
    wx.navigateTo({
      url: '../bookdetail/bookdetail?id='+id+'&index2='+index2,
    })
  },
  
  waitToSure:function(e){
    var that=this;
    wx.showLoading({
      title: '正在加载',
    })
    var bookId=e.currentTarget.dataset.bookid;
    var userId=e.currentTarget.dataset.userid;
    var button=e.currentTarget.dataset.button;
    console.log("###########################"+ bookId)
    console.log("###########################"+ userId)
    console.log("###########################"+ button)
   if(button=='等待确认'){
    wx.request({
      url: env.url+'/wechat/waitToSure?bookId='+bookId+'&userId='+userId,
     method: 'GET',
     success(res) {
     if(res.data==1){
       wx.showToast({
         success:res=>{
          that.onLoad();
         }
       })
     }
     wx.hideLoading();
    
      }
   })
   }else if(button=='一键延期'){
    wx.request({
      url: env.url+'/wechat/delay?bookId='+bookId+'&userId='+userId,
     method: 'GET',
     success(res) {
     if(res.data==1){
       wx.showToast({
        title:'延期成功',
        duration:1500,
        success:res=>{
          setTimeout(function() {
            that.onLoad();
           }, 1500)
         }
        
       })
     }else if(res.data==0){
       wx.showToast({
         title: '已延期'
       })
     }else{
      wx.showToast({
        title: '延期失败'
      })
     }
     wx.hideLoading();
    
      }
   })
   }else{
    wx.hideLoading();
   }
  },
  getBookByBookName(){
    var that=this;
    var hehe=that.data.bookName;
    console.log(hehe)
    
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: env.url+'/wechat/getBooksAll',
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
      data:{bookName:hehe},
     method: 'POST',
     success(res) {
     console.log(res.data)
     that.setData({
       bookList:res.data,
       bookNum:res.data[0].num
     });
     wx.hideLoading();
      }
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var identify=wx.getStorageSync('identify');
    console.log("用户角色："+identify)
    if(identify=='gly'){
      this.setData({
        isShow:true
      });
    }else{
      this.setData({
        isShow:false
      });
    }

    wx.stopPullDownRefresh();
    var that=this;
    var userIds=wx.getStorageSync('identify');
    that.setData({
      userId:userIds
    });
   
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: env.url+'/wechat/getBooksAll',
     method: 'POST',
     success(res) {
     console.log(res.data)
     that.setData({
       bookList:res.data,
       bookNum:res.data[0].num
     });
     wx.hideLoading();
      }
   })
   var userId=wx.getStorageSync('userId');
   var identify=wx.getStorageSync('identify');
   wx.request({
    url: env.url+'/wechat/borrowBookList?userId='+userId+'&identify='+identify,
   method: 'GET',
   success(res) {
   console.log(res.data)
   that.setData({
     MyBorrowList:res.data
   });
   wx.hideLoading();
    }
 })


   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   

    wx.hideHomeButton({
      success: function() {
      console.log('');
      },
      })
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})