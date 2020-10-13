// pages/reg/reg.js
import {env} from '../../profile.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text1:'',
    isHide:0,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgss:[],
    imgUrl:"",
    title:"",
    text:"",
    firstname:"",
    job:"",
   img: "http://img.kaiyanapp.com/7ff70fb62f596267ea863e1acb4fa484.jpeg",
  },
  start() {
    wx.navigateTo({
      url: '../cyld/cyld'
    })
  },
  getPhone: function(e) {
    var that=this;
          console.log(e)
          if (e.detail.encryptedData) {
              //用户按了允许授权按钮
              var that = this;
              // 获取到用户的信息了，打印到控制台上看下
              console.log("手机号加密数据如下：");
              console.log(e.detail.encryptedData);
              console.log(e.detail.iv);
              //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
              // that.setData({
              //     isHide: false
              // });
              wx.setStorageSync('phone1', e.detail.encryptedData)
              wx.setStorageSync('phone2', e.detail.iv)
              //然后 wx.login
              wx.login({
                success: res => {
               if (res.code) {
                 wx.showLoading({
                   title: '正在加载',
                 })
                wx.request({
                   url: env.url+'/wechat/getOpenId',
                  method: 'POST',
                   data: {
                      code: res.code,
                      encryptedData:e.detail.encryptedData,
                      iv:e.detail.iv
                   },
                   header: {
                      'content-type': 'application/x-www-form-urlencoded'
                   },
                  success(res) {
                      console.log(res)
                      wx.setStorageSync('openid', res.data.openid);
                      wx.setStorageSync('identify', res.data.identify);
                      wx.setStorageSync('text', res.data.text);
                      wx.setStorageSync('firstname', res.data.firstname);
                      wx.setStorageSync('job', res.data.job);
                      wx.setStorageSync('userId', res.data.userId);
                      // wx.setStorageSync('userId', 'e920bd2f3d6e4323424c30fbfc0e623');
                      that.setData({
                        firstname:res.data.firstname,
                        job:res.data.job
                      });
                      wx.setStorageSync('isFirst', "yes");
                      if(res.data.identify=='ld'){
                        wx.setStorageSync('phone', res.data.phone);
                        // wx.setStorageSync('phone','16666666666');
                        that.setData({
                          isHide: 1
                          
                        });
                      }else if(res.data.identify=='pt'){
                        that.setData({
                          isHide: 2
                        });
                      }else if(res.data.identify=='gly'){
                        wx.redirectTo({
                          url: '../book/book'
                        })
                      }else if(res.data.identify=='yg'){
                        wx.redirectTo({
                          url: '../book/book'
                        })
                      }
                      wx.showToast({
                        title: '登录成功',
                      })
                   }
                })
                wx.hideLoading();
               } else {
                   console.log('获取用户登录态失败！' + res.errMsg)
               }
                }
              })
          } else {
              //用户按了拒绝按钮
              // wx.showModal({
              //     title: '警告',
              //     content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
              //     showCancel: false,
              //     confirmText: '返回授权',
              //     success: function(res) {
              //         // 用户没有授权成功，不需要改变 isHide 的值
              //         if (res.confirm) {
              //             console.log('用户点击了“返回授权”');
              //         }
              //     }
              // });
              this.setData({
                isHide: 2
              });
          }

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var text=wx.getStorageSync('text');
    console.log(text);
    that.setData({
      text1:text
    });

    wx.request({
      url: env.url+'/wechat/welcome',
     method: 'POST',
     success(res) {
         console.log(res)
         that.setData({
           imgUrl:res.data.image,
           title:res.data.title,
           text:res.data.text
         });
      }
   })
   wx.request({
    url: env.url+'/wechat/getGuidePic',
   method: 'POST',
   success(res) {
       console.log(res.data)
       that.setData({
         imgss:res.data
       });
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