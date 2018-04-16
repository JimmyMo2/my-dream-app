webpackJsonp([0],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_cookies_ng2_cookies__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_cookies_ng2_cookies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_cookies_ng2_cookies__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, httpService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.toastCtrl = toastCtrl;
        //新建一个对象，用来传递公告页面的数据
        this.notice = {};
        //默认记住密码的checkbox为未选中状态
        this.login_get_checkbox = false;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
        //判断cookie存入的值，是否为空,如果不为空，那么双向绑定到对应input上面，且记住密码的checkbox为true
        if (this.getCookie("cookie_password") || this.getCookie("cookie_username")) {
            // this.login_username = Cookie.get("cookie_username");
            // this.login_password = Cookie.get("cookie_password");
            this.login_username = this.getCookie("cookie_username");
            this.login_password = this.getCookie("cookie_password");
            this.login_get_checkbox = true;
        }
    };
    //用原生JS方法来存储在cookie里面
    LoginPage.prototype.setCookie = function (name, value, Days) {
        if (Days == null || Days == '') {
            Days = 300;
        }
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + decodeURI(value) + "; path=/;expires=" + exp.toUTCString();
    };
    //用原生JS方法来获取在cookie里面的值
    LoginPage.prototype.getCookie = function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return decodeURI(arr[2]);
        else
            return null;
    };
    //用原生JS方法来删除在cookie里面的值
    LoginPage.prototype.delCookie = function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toUTCString();
    };
    //登录访问后端
    LoginPage.prototype.logIn = function (username, password) {
        var _this = this;
        //alert('登录');
        if (username.value.length == 0) {
            var toast = this.toastCtrl.create({
                message: '员工号不能为空',
                duration: 3000,
                position: 'middle' //位置
            });
            toast.present();
        }
        else if (password.value.length == 0) {
            var toast = this.toastCtrl.create({
                message: '请输入密码',
                duration: 3000,
                position: 'middle' //位置
            });
            toast.present();
        }
        else {
            //当点击登录的时候，判断是否勾选了记住密码选项
            //如果勾选了该选项，那么把该值存入cookie中，如果没勾选，那么清空cookie
            if (this.login_get_checkbox) {
                // Cookie.set('cookie_username', this.login_username);
                // Cookie.set('cookie_password', this.login_password);
                this.setCookie("cookie_username", this.login_username, 15);
                this.setCookie("cookie_password", this.login_password, 15);
                //console.log("这是cookie_username:"+Cookie.get("cookie_username"));
                //console.log("这是cookie_password:"+Cookie.get("cookie_password"));
                console.log("这是cookie_username" + this.getCookie("cookie_username"));
                console.log("这是cookie_password" + this.getCookie("cookie_password"));
                console.log("你勾选了记住密码");
            }
            else {
                //如果没勾上记住密码，那么删除存在cookie的值
                __WEBPACK_IMPORTED_MODULE_4_ng2_cookies_ng2_cookies__["Cookie"].set("cookie_username", "");
                __WEBPACK_IMPORTED_MODULE_4_ng2_cookies_ng2_cookies__["Cookie"].set("cookie_password", "");
                //this.delCookie("cookie_username");
                //this.delCookie("cookie_password");
                // console.log("这是清除后的cookie_username:"+Cookie.get("cookie_username"));
                // console.log("这是清除后的cookie_password:"+Cookie.get("cookie_password"));
                console.log("这是清除后的cookie_username" + this.getCookie("cookie_username"));
                console.log("这是清除后的cookie_password" + this.getCookie("cookie_username"));
            }
            var url = "performance/customerCurrent.json";
            // const url = "http://127.0.0.1:8000/mcrm/zwebmcrm/com.nbcb.pcrm.mcrm.mobile";
            var data = {
                "appId": "mcrm",
                "reqParam": {
                    "uid": username.value,
                    "pwd": password.value
                },
                "serviceId": "auth.mcrmLogin"
            };
            this.httpService.postData({
                // url:Contents.HTTP_LOCAL_ORIGIN,
                url: url,
                body: data
                // body:{
                //   username:username,
                //   passwprd:password
                // },
            }).then(function (res) {
                var result = res.status;
                //alert(result);
                if (result == 0) {
                    console.log(res.resultRes);
                    sessionStorage.setItem("userName", _this.login_username);
                    // sessionStorage.setItem("userName",JSON.parse(res.resultRes).data.userName);
                    //this.navCtrl.push(WelcomeTimePage);
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
                }
                else {
                    //alert("登陆失败");
                    var toast = _this.toastCtrl.create({
                        message: '登陆失败',
                        duration: 3000,
                        position: 'middle' //位置
                    });
                    toast.present();
                }
            }).catch(function (error) {
            });
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\login\login.html"*/'\n<ion-header>\n  <ion-navbar style="background:#ff8611">\n    <ion-title style="background:#ff8611"><span style="color:#ffffff">资产项目管理登录</span></ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <div class="login_content">\n\n    <div class="login_info">\n      <ion-item style="text-indent: 16px; padding-left: 0px;">\n        <ion-label>用户</ion-label>\n        <ion-input type="text"  placeholder="输入员工号"  #username  [(ngModel)]="login_username"></ion-input>\n      </ion-item>\n      <ion-item style="text-indent: 16px; padding-left: 0px;">\n        <ion-label>密码</ion-label>\n        <ion-input type="password" placeholder="输入密码" #password [(ngModel)]="login_password"></ion-input>\n      </ion-item>\n    </div>\n\n    <div class="login_button" (click)="logIn(username, password)">\n      登录\n    </div>\n    <div class="footer_forget">\n      <input type="checkbox"  [(ngModel)]="login_get_checkbox">记住密码\n    </div>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddOtherPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MarketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddOtherPage = (function () {
    function AddOtherPage(navCtrl, navParams, httpService, alertCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.addOthers = {};
        this.addParams = {};
        this.others = {};
        this.isDisabled = true;
        this.infoType = this.navParams.get('type');
        this.num = this.navParams.get('num');
        console.log(navParams.get('otherDetails'));
        if (this.navParams.get('otherDetails')) {
            this.addOthers = this.navParams.get('otherDetails');
            this.others = JSON.stringify(this.navParams.get('otherDetails'));
            console.log(this.addOthers);
            console.log(this.addOthers.time);
            console.log(this.addOthers.time.substr(0, 10));
            this.addOthers.time = this.addOthers.time.substr(0, 10);
        }
    }
    AddOtherPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddOtherPage');
    };
    AddOtherPage.prototype.saveOther = function () {
        //	if(this.infoType!="编辑其它"){
        // 	this.addOthers.style="计划"+(this.num+1);
        // }
        //	const date=new Date();
        //	this.addOthers.nowTime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
        console.log(this.addOthers);
        this.addOthers.time = this.transformData(this.addOthers.time);
        if (this.infoType == "编辑其它") {
            //编辑存数据库url
            //		const url = "performance/customerCurrent.json";
            var url = "calendar/editOther.json";
            this.addParams = {
                "appId": "1",
                "serviceId": "1111",
                "reqParam": {
                    "pkId": "11",
                    "bizCode": "12",
                    "bizVal": "13",
                    "title": this.addOthers.title,
                    "time": this.addOthers.time,
                    "Content": this.addOthers.content
                }
            };
            this.saveInfo(url);
        }
        else {
            //添加存数据库url
            if (Object.keys(this.addOthers).length != 3) {
                return;
            }
            //		const url = "performance/customerCurrent.json";
            var url = "calendar/addOther.json";
            this.addParams = {
                "appId": "1",
                "serviceId": "1111",
                "reqParam": {
                    "title": this.addOthers.title,
                    "time": this.addOthers.time,
                    "Content": this.addOthers.content
                }
            };
            this.saveInfo(url);
        }
    };
    AddOtherPage.prototype.transformData = function (data) {
        var da = new Date(data).getDay();
        switch (da) {
            case 0:
                this.date = "周日";
                break;
            case 1:
                this.date = "周一";
                break;
            case 2:
                this.date = "周二";
                break;
            case 3:
                this.date = "周三";
                break;
            case 4:
                this.date = "周四";
                break;
            case 5:
                this.date = "周五";
                break;
            case 6:
                this.date = "周六";
                break;
            default:
                break;
        }
        return (data + " " + this.date);
    };
    AddOtherPage.prototype.saveInfo = function (URL) {
        var _this = this;
        this.httpService.getData({
            url: URL,
            body: {
                //        params: this.addOthers
                params: this.addParams
            },
        }).then(function (res) {
            console.log(res);
            var result = res.status;
            if (result == 0) {
                _this.showAlertMsg("保存成功", true);
            }
            else {
                _this.showAlertMsg("保存失败", false);
            }
        }).catch(function (error) {
            _this.showAlertMsg(error, false);
        });
    };
    AddOtherPage.prototype.showAlertMsg = function (messag, isTouter) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '系统提示',
            subTitle: messag,
            buttons: [
                {
                    text: "确定",
                    handler: function () {
                        console.log('Cancel clicked');
                        if (isTouter) {
                            if (_this.infoType == "编辑") {
                                _this.dismiss(true);
                            }
                            else {
                                _this.dismiss(true);
                            }
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    AddOtherPage.prototype.dismiss = function (data) {
        if (data) {
            this.viewCtrl.dismiss(this.addOthers);
        }
        else {
            console.log(this.others);
            //		this.viewCtrl.dismiss(JSON.parse(this.others));
            if (this.infoType != "编辑其它") {
                this.addOthers = this.others;
                this.viewCtrl.dismiss(this.addOthers);
            }
            else {
                this.addOthers = JSON.parse(this.others);
                this.viewCtrl.dismiss(this.addOthers);
            }
        }
    };
    AddOtherPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addotherpage',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\addotherpage\addotherpage.html"*/'\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>新增其他任务</ion-title>\n    <div class="save right" (click)="saveOther()">保存</div>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n	<!--<ion-item *ngIf="this.infoType!=\'编辑其它\'">\n    <ion-label fixed>计划:</ion-label>\n    <ion-input type="text" value="" placeholder="计划" [(ngModel)]="addOthers.style" readonly="true"></ion-input>\n  </ion-item>-->\n  <ion-item>\n    <ion-label fixed>任务主题</ion-label>\n    <ion-input type="text" value="" placeholder="任务主题" [(ngModel)]="addOthers.title"></ion-input>\n  </ion-item>\n  <!--<ion-item>\n    <ion-label fixed>计划类型:</ion-label>\n    <ion-input type="text" value="" placeholder="计划类型" [(ngModel)]="addOthers.style"></ion-input>\n  </ion-item>-->\n  <ion-item>\n    <ion-label fixed>任务时间</ion-label>\n		<div item-content class="item_width">\n      <div class="left">\n      	<ion-datetime displayFormat="YYYY年MM月DD日 HH:mm" placeholder="任务时间" cancelText="取消" doneText="完成" [(ngModel)]="addOthers.time" ></ion-datetime>\n      </div>\n      <ion-label class="img imgall"></ion-label>\n    </div>\n  </ion-item>\n  <ion-item>\n    <ion-label fixed>任务内容</ion-label>\n\n    <!--<ion-input type="text" value="" placeholder="任务内容" [(ngModel)]="addOthers.style"></ion-input>-->\n    <ion-textarea name="" rows="4" cols="10"  placeholder="任务内容" [(ngModel)]="addOthers.content"></ion-textarea>\n  </ion-item>\n  <!--<ion-item>\n    <ion-label fixed>地点:</ion-label>\n    <ion-input type="text" value="" placeholder="地点" [(ngModel)]="addOthers.addr"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label fixed>发起人:</ion-label>\n    <ion-input type="text" value="" placeholder="发起人" [(ngModel)]="addOthers.who"></ion-input>\n  </ion-item>-->\n\n\n  <!--<div class="market-list">\n    <span class="market-list-name">客户类型</span>\n    <span class="market-list-cont">个人</span>\n  </div>-->\n  <!--<div class="market-list">\n    <span class="market-list-name">时间</span>\n    <span class="market-list-cont">2018-2-28</span>\n  </div>-->\n  <!--<div class="market-list">\n    <span class="market-list-name">地点</span>\n    <span class="market-list-cont">宁波银行</span>\n  </div>-->\n  <!--<div class="market-list">\n    <span class="market-list-name">同行人</span>\n    <span class="market-list-cont">张三</span>\n  </div>\n  <div class="market-list">\n    <span class="market-list-name">事项</span>\n    <span class="market-list-cont">理财</span>\n  </div>-->\n\n\n  <div class="footer"></div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\addotherpage\addotherpage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], AddOtherPage);
    return AddOtherPage;
}());

//# sourceMappingURL=addotherpage.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisitlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__addreport_addreport__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the VisitlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VisitlistPage = (function () {
    function VisitlistPage(navCtrl, navParams, httpService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.toastCtrl = toastCtrl;
        //申明list集合
        this.visilist = [];
        //申明员工ID
        this.empId = "1";
        this.visitPlans = [];
    }
    VisitlistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VisitlistPage');
        this.getvisitlistPage();
    };
    //点击进入走访详情页面
    VisitlistPage.prototype.go_visidetail = function (status) {
        // let index;
        // if(status == '待走访'){
        //   index = 1;
        // }else if(status == '已走访'){
        //   index = 2;
        // }else if(status == '待审批'){
        //   index = 3;
        // }else if(status == '已退回'){
        //   index = 4;
        // }
        // this.navCtrl.push(VisidetailPage,{index:index},
        //   { animate: true });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__addreport_addreport__["a" /* addreportPage */], { animate: true });
    };
    //时间字段格式化
    VisitlistPage.prototype.timeFormat = function (val) {
        return val.slice(0, 10);
    };
    //查询主界面的接口
    VisitlistPage.prototype.getvisitlistPage = function () {
        var _this = this;
        var url = "visilist/visilist.json";
        // const url = "http://127.0.0.1:8000/mcrm/zwebmcrm/com.nbcb.pcrm.mcrm.mobile";
        var data = {
            "appId": "mcrm",
            "reqParam": {
                "userId": this.empId,
                "beginDate": "",
                "endDate": "",
                "pageNo": "",
                "firstPageNo": "",
                "dataCount": "",
            },
            "serviceId": "auth.mcrmLogin"
        };
        this.httpService.getData({
            url: url,
            body: {}
        }).then(function (res) {
            console.log(res.resultRes.visitPlans);
            _this.visitPlans = res.resultRes.visitPlans;
            _this.visilist = res.resultRes.visitPlans.slice(0, 11);
            console.log(_this.visilist);
        });
    };
    VisitlistPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        setTimeout(function () {
            for (var i = 11, len = _this.visitPlans.length; i < len; i++) {
                if (_this.visilist.length < _this.visitPlans.length) {
                    _this.visilist.push(_this.visitPlans[i]);
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: '已无更多数据',
                        duration: 3000,
                        position: 'bottom' //位置
                    });
                    toast.present();
                    break;
                }
            }
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    };
    VisitlistPage.prototype.getWeekday = function (time) {
        var arr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        return arr[new Date(time).getDay()];
    };
    VisitlistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-visitlist',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\visitlist\visitlist.html"*/'<!--\n  Generated template for the VisitlistPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>未完成走访计划列表</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="home_menu" style="padding: 0px;">\n    <div *ngFor="let item of visilist" class="common_content common_flex" style="padding: 1.5rem 1rem 1.5rem 1rem;border-bottom: 1px #ddd solid;" (click)="go_visidetail(item.status)">\n      <div  class="content_nowrap">\n        <div class="content_title" style="display: -webkit-box">\n          <span style="color:#ff9933">{{ getWeekday(item.planDate) }}</span>\n          <span class="line_vertical"></span>\n          <span>{{item.customName}}</span>\n          <span class="content_type" [ngClass]="{\'orange\':item.status == \'待走访\',\'red\':item.status == \'已走访\',\'orange\':item.status == \'已取消\',\'seagreen\':item.status == \'过期未走访\',\'powderblue\':item.status == \'已提交待审批\'}">{{item.status}}</span>\n        </div>\n      </div>\n      <div class="content_detail">   >  </div>\n    </div>\n\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n      <ion-infinite-scroll-content\n        loadingSpinner="bubbles"\n        loadingText="加载更多">\n      </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\visitlist\visitlist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], VisitlistPage);
    return VisitlistPage;
}());

//# sourceMappingURL=visitlist.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExaminerecordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ExaminerecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ExaminerecordPage = (function () {
    function ExaminerecordPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ExaminerecordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ExaminerecordPage');
    };
    ExaminerecordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-examinerecord',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\examinerecord\examinerecord.html"*/'<!--\n  Generated template for the ExaminerecordPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>审批记录</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="newrecord clearfix" style="background-color: #fff !important;">\n    <div class="market-list">\n      <span class="market-list-name">处理环节</span>\n      <span class="market-list-cont">一级支行管理部门经理审批</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">处理人</span>\n      <span class="market-list-cont">沈XX</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">操作时间</span>\n      <span class="market-list-cont">2018-3-3 12:00:00</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">处理结果</span>\n      <span class="market-list-cont">同意</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">处理意见</span>\n      <span class="market-list-cont">同意</span>\n    </div>\n  </div>\n\n  <div class="newrecord clearfix" style="background-color: #fff !important;">\n    <div class="market-list">\n      <span class="market-list-name">处理环节</span>\n      <span class="market-list-cont">一级支行管理部门经理审批</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">处理人</span>\n      <span class="market-list-cont">沈XX</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">操作时间</span>\n      <span class="market-list-cont">2018-3-3 12:00:00</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">处理结果</span>\n      <span class="market-list-cont">同意</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">处理意见</span>\n      <span class="market-list-cont">同意</span>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\examinerecord\examinerecord.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ExaminerecordPage);
    return ExaminerecordPage;
}());

//# sourceMappingURL=examinerecord.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PotentialcusteditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_Constants__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the PotentialcusteditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PotentialcusteditPage = (function () {
    function PotentialcusteditPage(navCtrl, navParams, httpServer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpServer = httpServer;
        this.custName = '';
        this.custPhoneNum = '';
        this.companyName = '';
        this.dutyCd = '';
        this.navParams.get("detail");
        this.isEdit = this.navParams.get('isEdit');
    }
    PotentialcusteditPage.prototype.ionViewDidLoad = function () {
        this.msgDatasList = this.navParams.get("detail");
        console.log(this.msgDatasList);
    };
    // 添加潜在客户
    PotentialcusteditPage.prototype.addinfo = function () {
        this.httpServer.postData({
            url: __WEBPACK_IMPORTED_MODULE_2__providers_Constants__["a" /* Contents */].HTTP_LOCAL_ORIGIN,
            body: {
                "appId": "mcrm",
                "reqParam": {
                    "custName": this.custName,
                    "mobile": this.custPhoneNum,
                    "dutyCd": this.dutyCd,
                    "companyName": this.companyName
                },
                "serviceId": "cust.mobile.potenCust.addPotenCustInfo"
            }
        })
            .then(function (res) {
            console.log(res);
        }).catch(function (err) {
            console.log(err);
        });
    };
    //修改潜在客户信息
    PotentialcusteditPage.prototype.back = function () {
        console.log(this.msgDatasList);
        this.httpServer.postData({
            url: __WEBPACK_IMPORTED_MODULE_2__providers_Constants__["a" /* Contents */].HTTP_LOCAL_ORIGIN,
            body: {
                "appId": "mcrm",
                "reqParam": {
                    "changejson": "ceshi",
                    "custId": "",
                    "sex": "F"
                },
                "serviceId": "cust.mobile.potenCust.updata360CustPotenCustInfo"
            }
        })
            .then(function (res) {
            console.log(res);
        }).catch(function (err) {
            console.log(err);
        });
    };
    PotentialcusteditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-potentialcustedit',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\potentialcustedit\potentialcustedit.html"*/'<!--\n  Generated template for the PotentialcusteditPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title *ngIf="isEdit">编辑</ion-title>\n    <ion-title *ngIf="!isEdit">新增潜在客户</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <!--编辑页视图-->\n  <div *ngIf="isEdit">\n    <ion-list *ngFor="let list of msgDatasList" class="list">\n      <ion-item  class="list-item">\n        <ion-row>\n          <span col-2 class="item-title">名字</span>\n          <input class="iteminput" [ngModel]="list.custName" type="text"/>\n        </ion-row>\n      </ion-item>\n      <ion-item  class="list-item">\n        <ion-row>\n          <span col-2 class="item-title">性别</span>\n          <input class="iteminput" [ngModel]="list.sex==\'M\'?\'男\':\'女\'" type="text"/>\n        </ion-row>\n      </ion-item>\n      <ion-item  class="list-item">\n        <ion-row>\n          <span col-2 class="item-title">年龄</span>\n          <input class="iteminput" [ngModel]="list.age" type="text"/>\n        </ion-row>\n      </ion-item>\n      <ion-item  class="list-item">\n        <ion-row>\n          <span col-2 class="item-title">单位</span>\n          <input class="iteminput" [ngModel]="list.companyName==undefined?\'\':list.companyName" type="text"/>\n        </ion-row>\n      </ion-item>\n      <ion-item  class="list-item">\n        <ion-row>\n          <span col-2 class="item-title">职位</span>\n          <input class="iteminput" [ngModel]="list.dutyCd" type="text"/>\n        </ion-row>\n      </ion-item>\n      <ion-item  class="list-item">\n        <ion-row>\n          <span col-2 class="item-title">工号</span>\n          <input class="iteminput" [ngModel]="list.pkId" type="text"/>\n        </ion-row>\n      </ion-item>\n      <ion-item  class="list-item">\n        <ion-row>\n          <span col-2 class="item-title">电话</span>\n          <input class="iteminput" [ngModel]="list.mobileNo" type="text"/>\n        </ion-row>\n      </ion-item>\n    </ion-list>\n  </div>\n\n\n  <!--添加页视图-->\n  <div *ngIf="!isEdit">\n    <ion-list class="list">\n      <ion-item  class="list-item">\n        <ion-row>\n          <span col-2 class="item-title">名字</span>\n          <input class="iteminput" placeholder="请输入您的姓名" [ngModel]="custName" type="text"/>\n        </ion-row>\n      </ion-item>\n      <ion-item  class="list-item">\n        <ion-row>\n          <span col-2 class="item-title">电话</span>\n          <input class="iteminput" placeholder="请输入您的电话" [ngModel]="custPhoneNum" type="text"/>\n        </ion-row>\n      </ion-item>\n      <ion-item  class="list-item">\n        <ion-row>\n          <span col-2 class="item-title">单位</span>\n          <input class="iteminput" placeholder="请输入您的工作单位"  [ngModel]="companyName" type="text"/>\n        </ion-row>\n      </ion-item>\n      <ion-item  class="list-item">\n        <ion-row>\n          <span col-2 class="item-title">职务</span>\n          <input class="iteminput" placeholder="亲输入您的职务" [ngModel]="dutyCd" type="text"/>\n        </ion-row>\n      </ion-item>\n    </ion-list>\n  </div>\n\n  <div *ngIf="isEdit" class="submit">\n    <ion-row>\n      <button (click)="back()" col-12  ion-button>确定</button>\n    </ion-row>\n  </div>\n  <div *ngIf="!isEdit" class="submit">\n    <ion-row>\n      <button (click)="addinfo()" col-12  ion-button>提交</button>\n    </ion-row>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\potentialcustedit\potentialcustedit.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
    ], PotentialcusteditPage);
    return PotentialcusteditPage;
}());

//# sourceMappingURL=potentialcustedit.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customerdetail_customerdetail__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the MarketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CustomerPage = (function () {
    function CustomerPage(navCtrl, navParams, modalCtrl, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.httpService = httpService;
        this.search = {};
        this.searchLists = [];
    }
    CustomerPage.prototype.goCustomer = function (cust) {
        console.log('去客户详情');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__customerdetail_customerdetail__["a" /* CustomerDetailPage */], { "customer": this.search.customer }, { animate: true });
    };
    CustomerPage.prototype.goSearch = function () {
        var _this = this;
        var url = "search/customer.json";
        var param = {
            "customName": this.search.customer,
            "pageNo": "1",
            "dataCount": "10",
            "fisrPageNo": "10",
            "vague": true
        };
        this.httpService.getData({
            url: url,
            body: param
        })
            .then(function (res) {
            console.log(res);
            _this.searchLists = res.customs;
        });
    };
    CustomerPage.prototype.presentModal = function () {
        console.log('分享');
    };
    CustomerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customerpage',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\customer\customer.html"*/'\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>用户信息</ion-title>\n    <!--<div class="edit right" (click)="goEditOther(otherDetails)">编辑</div>-->\n    <div class="edit right" (click)="presentModal()">分享</div>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="cont_bg_color">\n  <div class="customer_search">\n   	<div class="serach_top">\n   		<div class="serach_title">客户名称</div>\n   		<div class="serach_cont">\n   			<ion-icon name="search" class="search_icon" (keyup)="goSearch()"></ion-icon>\n   			<input type="text" class="serach_inp" placeholder="客户名称"  [(ngModel)]="search.customer" (keyup)="goSearch()"/>\n   		</div>\n   	</div>\n   	<div class="serach_lists">\n   		<div class="lists_cont">\n   			<div class="list_item" (click)="goCustomer(cust)" *ngFor="let item of searchLists">{{item.customName}}</div>\n   		</div>\n   	</div>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\customer\customer.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
    ], CustomerPage);
    return CustomerPage;
}());

//# sourceMappingURL=customer.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomermanagerprodetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the CustomermanagerprodetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CustomermanagerprodetailPage = (function () {
    function CustomermanagerprodetailPage(navCtrl, navParams, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.customId = navParams.get("customId");
    }
    CustomermanagerprodetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomermanagerprodetailPage');
        this.getDetail();
    };
    //查询主界面的接口
    CustomermanagerprodetailPage.prototype.getDetail = function () {
        var _this = this;
        var url = "home_g/home_g.json";
        // const url = "http://127.0.0.1:8000/mcrm/zwebmcrm/com.nbcb.pcrm.mcrm.mobile";
        var data = {
            "appId": "mcrm",
            "reqParam": {
                "customId": this.customId,
            },
            "serviceId": "auth.mcrmLogin"
        };
        this.httpService.getData({
            url: url,
            body: {}
        }).then(function (res) {
            _this.customerList = res;
            console.log(_this.customerList);
        });
    };
    CustomermanagerprodetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customermanagerprodetail',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\customermanagerprodetail\customermanagerprodetail.html"*/'<!--\n  Generated template for the CustomermanagerprodetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>客户信息</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <div>\n    <div class="header_title">华林证券-桃林一号定向资产管理计划</div>\n\n    <div class="detail_content" style="margin-bottom: 3rem">\n      <div class="detail_item">\n        <div class="item_name flex_one">项目类型</div>\n        <div class="item_name flex_four" style="border-right: 0px;">卷商定向</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">项目状态</div>\n        <div class="item_name flex_four" style="border-right: 0px;">已成立</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">费用/费率</div>\n        <div class="item_name flex_four" style="border-right: 0px;">0.0000%</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">主办行</div>\n        <div class="item_name flex_four" style="border-right: 0px;">XX银行</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one" style="border-right: 0px;">最初报价</div>\n        <div class="item_name flex_four" style="border-right: 0px;border-left: 1px #ddd solid">20000110.00元</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">当初规模</div>\n        <div class="item_name flex_four" style="border-right: 0px;">200000000.00元</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">立项日期</div>\n        <div class="item_name flex_four" style="border-right: 0px;">2015-05-22</div>\n      </div>\n    </div>\n\n\n    <div class="header_title">华林证券-桃林一号定向资产管理计划</div>\n\n    <div class="detail_content" style="margin-bottom: 3rem">\n      <div class="detail_item">\n        <div class="item_name flex_one">项目类型</div>\n        <div class="item_name flex_four" style="border-right: 0px;">卷商定向</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">项目状态</div>\n        <div class="item_name flex_four" style="border-right: 0px;">已成立</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">费用/费率</div>\n        <div class="item_name flex_four" style="border-right: 0px;">0.0000%</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">主办行</div>\n        <div class="item_name flex_four" style="border-right: 0px;">XX银行</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one" style="border-right: 0px;">最初报价</div>\n        <div class="item_name flex_four" style="border-right: 0px;border-left: 1px #ddd solid">20000110.00元</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">当初规模</div>\n        <div class="item_name flex_four" style="border-right: 0px;">200000000.00元</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">立项日期</div>\n        <div class="item_name flex_four" style="border-right: 0px;">2015-05-22</div>\n      </div>\n    </div>\n\n\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\customermanagerprodetail\customermanagerprodetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */]])
    ], CustomermanagerprodetailPage);
    return CustomermanagerprodetailPage;
}());

//# sourceMappingURL=customermanagerprodetail.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__projectDetail_projectDetail__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { Cookie } from 'ng2-cookies/ng2-cookies';
/**
 * Generated class for the MarketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProjectPage = (function () {
    function ProjectPage(navCtrl, navParams, modalCtrl, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.httpService = httpService;
        this.search = {};
        this.projectLists = [];
        this.userName = sessionStorage.getItem('userName');
    }
    ProjectPage.prototype.goCustomer = function (instId) {
        console.log(instId);
        console.log('去客户详情');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__projectDetail_projectDetail__["a" /* ProjectDetailPage */], { "instId": instId }, { animate: true });
    };
    ProjectPage.prototype.goSearch = function () {
        var _this = this;
        console.log('搜索');
        var url = "search/project.json";
        var param = {
            "customName": this.search.project,
            "userId": this.userName,
            "pageNo": "1",
            "dataCount": "10",
            "firstPageNo": "10"
        };
        this.httpService.getData({
            url: url,
            body: param
        })
            .then(function (res) {
            console.log(res);
            _this.projectLists = res.projects;
        });
    };
    ProjectPage.prototype.presentModal = function () {
        console.log("分享");
    };
    ProjectPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-projectpage',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\project\project.html"*/'\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>项目信息</ion-title>\n    <!--<div class="edit right" (click)="goEditOther(otherDetails)">编辑</div>-->\n    <div class="edit right" (click)="presentModal()">分享</div>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="cont_bg_color">\n  <div class="customer_search">\n   	<div class="serach_top">\n   		<div class="serach_title">项目名称</div>\n   		<div class="serach_cont">\n   			<ion-icon name="search" class="search_icon" (click)="goSearch()"></ion-icon>\n   			<input type="text" class="serach_inp" placeholder="客户名称"  [(ngModel)]="search.project" (keyup)="goSearch()"/>\n   			\n   		</div>\n   	</div>\n   	<div class="serach_lists">\n   		<div class="lists_cont">\n   			<div class="list_item" (click)="goCustomer(item.instId)" *ngFor="let item of projectLists">{{item.name}}</div>\n   		</div>\n   	</div>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\project\project.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
    ], ProjectPage);
    return ProjectPage;
}());

//# sourceMappingURL=project.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rateDetail_rateDetail__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the MarketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RatePage = (function () {
    function RatePage(navCtrl, navParams, modalCtrl, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.httpService = httpService;
        this.rates = {};
        this.isSearch = 'none';
        this.reports = {};
    }
    RatePage.prototype.goSearch = function () {
        var _this = this;
        var url = "search/customer.json";
        // const param={
        //   "customName":this.reports.customer,
        //   "pageNo":"1",
        //   "dataCount":"10",
        //   "fisrPageNo":"10",
        //   "vague":true
        // }
        this.httpService.getData({
            url: url
            // body: param
        })
            .then(function (res) {
            console.log(res);
            _this.searchLists = res.customs;
            if (_this.searchLists.length == 0) {
                _this.isSearch = 'none';
            }
            else {
                _this.isSearch = 'block';
            }
        });
    };
    RatePage.prototype.goCustomer = function (cust) {
        this.reports.customer = cust.customName;
        this.isSearch = 'none';
    };
    RatePage.prototype.goRateDetail = function () {
        var _this = this;
        console.log('去客户详情');
        var url = "search/rate.json";
        var param = {
            "name": this.rates.name,
            "beginDate": this.rates.start,
            "endDate": this.rates.end,
            "pageNo": "1",
            "dataCount": "10",
            "firstPageNo": "10"
        };
        this.httpService.getData({
            url: url,
            body: param
        })
            .then(function (res) {
            console.log(res);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__rateDetail_rateDetail__["a" /* RateDetailPage */], { "ratesDetails": res }, { animate: true });
        });
    };
    RatePage.prototype.presentModal = function () {
        console.log("分享");
    };
    RatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ratepage',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\rate\rate.html"*/'\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>指令进度</ion-title>\n    <!--<div class="edit right" (click)="goEditOther(otherDetails)">编辑</div>-->\n    <div class="edit right" (click)="presentModal()">分享</div>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="cont_bg_color">\n   <!--<div class="rate">\n			<ion-list>\n			  <ion-item>\n				  <ion-label fixed>项目名称:</ion-label>\n				  <ion-input type="text" placeholder="项目名称"></ion-input>\n				</ion-item>\n				<ion-item>\n				  <ion-label>开始日期:</ion-label>\n				  <ion-datetime displayFormat="YYYY/MM/DD" placeholder="开始时间" cancelText="取消" doneText="完成" [(ngModel)]="start" ></ion-datetime>\n				</ion-item>\n				<ion-item>\n				  <ion-label>结束日期:</ion-label>\n				  <ion-datetime displayFormat="YYYY/MM/DD" placeholder="结束时间" cancelText="取消" doneText="完成" [(ngModel)]="end" ></ion-datetime>\n				</ion-item>\n				<div class="search_btn">\n					<button ion-button (click)="goRateDetail(rate)">查询</button>\n				</div>\n			</ion-list>\n   </div>-->\n\n   <div class="rate">\n			<ion-list>\n			  <ion-item>\n				  <ion-label fixed>项目名称:</ion-label>\n				  <ion-input type="text" [(ngModel)]="rates.name" placeholder="项目名称" (keyup)="goSearch()"></ion-input>\n				</ion-item>\n\n        <div class="serach_lists" [ngStyle]="{\'display\':isSearch}">\n          <div class="lists_cont">\n            <div class="list_item" (click)="goCustomer(item)" *ngFor="let item of searchLists">{{item.customName}}</div>\n          </div>\n        </div>\n\n				<ion-item>\n				  <ion-label>开始日期:</ion-label>\n				  <ion-datetime displayFormat="YYYY/MM/DD" placeholder="开始时间" cancelText="取消" doneText="完成" [(ngModel)]="rates.start" ></ion-datetime>\n				</ion-item>\n				<ion-item>\n				  <ion-label>结束日期:</ion-label>\n				  <ion-datetime displayFormat="YYYY/MM/DD" placeholder="结束时间" cancelText="取消" doneText="完成" [(ngModel)]="rates.end" ></ion-datetime>\n				</ion-item>\n				<div class="search_btn">\n					<button ion-button (click)="goRateDetail()">查询</button>\n				</div>\n			</ion-list>\n   </div>\n\n		<!--<button (click)="goRateDetail(rate)">进度详情</button>-->\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\rate\rate.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
    ], RatePage);
    return RatePage;
}());

//# sourceMappingURL=rate.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountSearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__accountDetail_accountDetail__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the MarketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AccountSearchPage = (function () {
    function AccountSearchPage(navCtrl, navParams, modalCtrl, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.httpService = httpService;
        this.accounts = {};
    }
    AccountSearchPage.prototype.goRateDetail = function (search) {
        var _this = this;
        console.log('去客户详情');
        var url = "search/accountSearch.json";
        var param = {
            "name": this.accounts.name,
            "AccountId": this.accounts.AccountId,
            "beginDate": this.accounts.start,
            "endDate": this.accounts.end,
            "pageNo": "1",
            "dataCount": "10",
            "firstPageNo": "10"
        };
        this.httpService.getData({
            url: url,
            body: param
        })
            .then(function (res) {
            console.log(res);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__accountDetail_accountDetail__["a" /* AccountDetailPage */], { "accountDetails": res }, { animate: true });
        });
    };
    AccountSearchPage.prototype.presentModal = function () {
        console.log("分享");
    };
    AccountSearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-accountSearchpage',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\accountSearch\accountSearch.html"*/'\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>资金进出</ion-title>\n    <!--<div class="edit right" (click)="goEditOther(otherDetails)">编辑</div>-->\n    <div class="edit right" (click)="presentModal()">分享</div>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="cont_bg_color">\n   <div class="rate">\n			<ion-list>\n			  <ion-item>\n				  <ion-label fixed>项目名称:</ion-label>\n				  <ion-input type="text" placeholder="项目名称" [(ngModel)]="accounts.name"></ion-input>\n				</ion-item>\n				<ion-item>\n				  <ion-label fixed>账户信息:</ion-label>\n				  <ion-input type="text" placeholder="账户信息" [(ngModel)]="accounts.AccountId"></ion-input>\n				</ion-item>\n				<ion-item>\n				  <ion-label>开始日期:</ion-label>\n				  <ion-datetime displayFormat="YYYY/MM/DD" placeholder="开始时间" cancelText="取消" doneText="完成" [(ngModel)]="accounts.start" ></ion-datetime>\n				</ion-item>\n				<ion-item>\n				  <ion-label>结束日期:</ion-label>\n				  <ion-datetime displayFormat="YYYY/MM/DD" placeholder="结束时间" cancelText="取消" doneText="完成" [(ngModel)]="accounts.end" ></ion-datetime>\n				</ion-item>\n				<div class="search_btn">\n					<button ion-button (click)="goRateDetail(search)">查询</button>\n				</div>\n			</ion-list>\n   	\n   	\n   </div>\n		<!--<button (click)="goRateDetail(rate)">进度详情</button>-->\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\accountSearch\accountSearch.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
    ], AccountSearchPage);
    return AccountSearchPage;
}());

//# sourceMappingURL=accountSearch.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BalancePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__balanceDetail_balanceDetail__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the MarketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BalancePage = (function () {
    function BalancePage(navCtrl, navParams, modalCtrl, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.httpService = httpService;
        this.balance = {};
    }
    BalancePage.prototype.goRateDetail = function (search) {
        var _this = this;
        console.log('去客户详情');
        var url = "search/balance.json";
        var param = {
            "name": this.balance.name,
            "AccountId": this.balance.AccountId,
            "beginDate": this.balance.start,
            "endDate": this.balance.end,
            "pageNo": "1",
            "dataCount": "1",
            "firstPageNo": "1"
        };
        this.httpService.getData({
            url: url,
            body: param
        })
            .then(function (res) {
            console.log(res);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__balanceDetail_balanceDetail__["a" /* BalanceDetailPage */], { "balanceDetails": res }, { animate: true });
        });
    };
    BalancePage.prototype.presentModal = function () {
        console.log("分享");
    };
    BalancePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-balancepage',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\balance\balance.html"*/'\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>余额查询</ion-title>\n    <!--<div class="edit right" (click)="goEditOther(otherDetails)">编辑</div>-->\n    <div class="edit right" (click)="presentModal()">分享</div>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="cont_bg_color">\n   <div class="rate">\n			<ion-list>\n			  <ion-item>\n				  <ion-label fixed>项目名称:</ion-label>\n				  <ion-input type="text" placeholder="项目名称" [(ngModel)]="balance.name"></ion-input>\n				</ion-item>\n				<ion-item>\n				  <ion-label fixed>账户信息:</ion-label>\n				  <ion-input type="text" placeholder="账户信息" [(ngModel)]="balance.AccountId"></ion-input>\n				</ion-item>\n				<ion-item>\n				  <ion-label>开始日期:</ion-label>\n				  <ion-datetime displayFormat="YYYY/MM/DD" placeholder="开始时间" cancelText="取消" doneText="完成" [(ngModel)]="balance.start" ></ion-datetime>\n				</ion-item>\n				<ion-item>\n				  <ion-label>结束日期:</ion-label>\n				  <ion-datetime displayFormat="YYYY/MM/DD" placeholder="结束时间" cancelText="取消" doneText="完成" [(ngModel)]="balance.end" ></ion-datetime>\n				</ion-item>\n				<div class="search_btn">\n					<button ion-button (click)="goRateDetail(search)">查询</button>\n				</div>\n			</ion-list>\n   	\n   	\n   </div>\n		<!--<button (click)="goRateDetail(rate)">进度详情</button>-->\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\balance\balance.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
    ], BalancePage);
    return BalancePage;
}());

//# sourceMappingURL=balance.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApprovedpenddetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ApprovedpenddetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ApprovedpenddetailPage = (function () {
    function ApprovedpenddetailPage(navCtrl, navParams, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
    }
    ApprovedpenddetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ApprovedpenddetailPage');
        this.getDetail();
    };
    //查询报告详情
    ApprovedpenddetailPage.prototype.getDetail = function () {
        var _this = this;
        var url = "home_g/home_g.json";
        // const url = "http://127.0.0.1:8000/mcrm/zwebmcrm/com.nbcb.pcrm.mcrm.mobile";
        var data = {
            "appId": "mcrm",
            "reqParam": {
                "reportId": this.reportId,
                "userId": this.userId,
                "approveMsg": "",
                "status": "",
                "approveDate": "",
                "processinstId": "",
                "workItemId": ""
            },
            "serviceId": "auth.mcrmLogin"
        };
        this.httpService.getData({
            url: url,
            body: {}
        }).then(function (res) {
            _this.dependdingDetail = res;
            console.log(_this.dependdingDetail);
        });
    };
    ApprovedpenddetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-approvedpenddetail',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\approvedpenddetail\approvedpenddetail.html"*/'<!--\n  Generated template for the ApprovedpenddetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>宁波天心企业咨询有限公司资产</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="detail_content">\n    <div class="detail_item">\n      <span>用户名</span>\n      <span style="margin-left: 30px;">希维尔</span>\n    </div>\n    <div class="detail_item">\n      <span>用户名称</span>\n      <span style="margin-left: 30px;">上海希维尔</span>\n    </div>\n    <div class="detail_item">\n      <span>申请角色</span>\n      <span style="margin-left: 30px;">用户管理员</span>\n    </div>\n    <div class="detail_item">\n      <span>员工状态</span>\n      <span style="margin-left: 30px;">在线</span>\n    </div>\n    <div class="detail_item">\n      <span>申请类型</span>\n      <span style="margin-left: 30px;">宁波行方</span>\n    </div>\n    <div class="detail_item">\n      <span>申请类型</span>\n      <span style="margin-left: 30px;">宁波行方</span>\n    </div>\n    <div class="detail_item">\n      <span>所属机构</span>\n      <span style="margin-left: 30px;">宁波银行</span>\n    </div>\n    <div class="detail_item">\n      <span>申请人</span>\n      <span style="margin-left: 30px;">希维尔</span>\n    </div>\n    <div class="detail_item">\n      <span>申请日期</span>\n      <span style="margin-left: 30px;">2018-3-20</span>\n    </div>\n    <div class="detail_item">\n      <span>审批状态</span>\n      <span style="margin-left: 30px;">未审批</span>\n    </div>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\approvedpenddetail\approvedpenddetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */]])
    ], ApprovedpenddetailPage);
    return ApprovedpenddetailPage;
}());

//# sourceMappingURL=approvedpenddetail.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusinessreportdetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the BusinessreportdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BusinessreportdetailPage = (function () {
    function BusinessreportdetailPage(navCtrl, navParams, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        //申明员工ID
        this.empId = 1;
        this.startTime = navParams.get("startTime");
        this.endTime = navParams.get("endTime");
        this.reprotArrListLastWeek = navParams.get("reprotArrListLastWeek");
        console.log("这是传递过来的week:" + this.reprotArrListLastWeek);
        console.log("开始时间" + this.startTime + " 结束时间：" + this.endTime);
    }
    BusinessreportdetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BusinessreportdetailPage');
        this.getDetail();
    };
    //查询主界面的接口
    BusinessreportdetailPage.prototype.getDetail = function () {
        var _this = this;
        var url = "home_g/home_g.json";
        // const url = "http://127.0.0.1:8000/mcrm/zwebmcrm/com.nbcb.pcrm.mcrm.mobile";
        var data = {
            "appId": "mcrm",
            "reqParam": {
                "userId": this.empId,
                "startTime": this.startTime,
                "endTime": this.endTime
            },
            "serviceId": "auth.mcrmLogin"
        };
        this.httpService.getData({
            url: url,
            body: {}
        }).then(function (res) {
            _this.pageDetail = res;
            console.log(_this.pageDetail);
        });
    };
    BusinessreportdetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-businessreportdetail',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\businessreportdetail\businessreportdetail.html"*/'<!--\n  Generated template for the BusinessreportdetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header  class="header">\n\n  <ion-navbar>\n    <ion-title>2017年第{{reprotArrListLastWeek}}周业务报告</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="common_title">\n    <span class="nav_icon"></span>\n      本周全行规模\n  </div>\n  <div class="flex" style="padding: 2rem 0rem;">\n    <div class="flex_one common_nav_font">\n      项目总数<span class="common_num">5000</span>\n    </div>\n    <div class="flex_one common_nav_font">\n      较上周变化<span class="common_num">288<span class="top_icon">↑</span></span>\n    </div>\n  </div>\n\n  <div class="common_title">\n    <span class="nav_icon"></span>\n    本周分行规模\n  </div>\n  <div class="flex"  style="padding: 2rem 0rem;">\n    <div class="flex_one common_nav_font">\n      项目总数<span class="common_num">10000</span>\n    </div>\n    <div class="flex_one common_nav_font">\n      较上周变化<span class="common_num">68<span class="top_icon">↑</span></span>\n    </div>\n  </div>\n\n  <div class="common_title">\n    <span class="nav_icon"></span>\n    本周重客规模\n  </div>\n  <div class="flex"  style="padding: 2rem 0rem;">\n    <div class="flex_one common_nav_font">\n      项目总数<span class="common_num">600</span>\n    </div>\n    <div class="flex_one common_nav_font">\n      较上周变化<span class="common_num">38<span class="top_icon">↑</span></span>\n    </div>\n  </div>\n\n  <div class="common_title">\n    <span class="nav_icon" style="background: rgb(85, 221, 170)"></span>\n    本周分行业绩完成情况\n  </div>\n  <div style="width: 100%;height: 5rem">\n\n  </div>\n\n  <div class="common_title">\n    <span class="nav_icon" style="background: rgb(85, 221, 170)"></span>\n    本周所在团队业绩完成情况\n  </div>\n  <div style="width: 100%;height: 5rem">\n\n  </div>\n\n  <div class="common_title">\n    <span class="nav_icon" style="background: #0099ff"></span>\n    本周客户走访情况\n  </div>\n  <div style="width: 100%;height: 5rem">\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\businessreportdetail\businessreportdetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */]])
    ], BusinessreportdetailPage);
    return BusinessreportdetailPage;
}());

//# sourceMappingURL=businessreportdetail.js.map

/***/ }),

/***/ 130:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 130;

/***/ }),

/***/ 172:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 172;

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KnowledgePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var KnowledgePage = (function () {
    function KnowledgePage(navCtrl) {
        this.navCtrl = navCtrl;
        this.kk = "valbook";
        this.kde = "tow";
        this.collect = "collect";
        this.rank = "hot";
    }
    KnowledgePage.prototype.goformalcust = function () {
        // this.navCtrl.push(FormalcustPage)
    };
    KnowledgePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-knowledge',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\knowledge\knowledge.html"*/'<!--\n  Generated template for the KnowledgePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="both-clear">\n  <ion-toolbar id="know-header both-clear" class="both-clear" style="padding: 0px; top: 0px ">\n    <ion-segment [(ngModel)]="kde" class="header-konw">\n      <ion-segment-button class="bolder-sm" value="tow" col-3>\n        知识\n      </ion-segment-button >\n      <ion-segment-button class="bolder-sm" value="three" col-3>\n        收藏\n      </ion-segment-button>\n      <ion-segment-button class="bolder-sm" value="four" col-3>\n        排行\n      </ion-segment-button>\n      <ion-icon class="seach-icon" name="ios-search-outline"></ion-icon>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n<div [ngSwitch]="kde">\n  <!--知识-->\n  <ion-list *ngSwitchCase="\'tow\'">\n    <div padding class="table-list">\n      <ion-segment [(ngModel)]="kk">\n        <ion-segment-button class="nav-list seg-btn" value="valbook">\n          宝典\n        </ion-segment-button>\n        <ion-segment-button class="seg-btn" value="tinyclass">\n          微课\n        </ion-segment-button>\n        <ion-segment-button class="seg-btn" value="case">\n          案例\n        </ion-segment-button>\n        <ion-segment-button class="seg-btn" value="plan">\n          应急预案\n        </ion-segment-button>\n      </ion-segment>\n    </div>\n\n    <div [ngSwitch]="kk">\n      <ion-list *ngSwitchCase="\'tinyclass\'">\n        <ion-item ng-repeat="item in items" class="item-thumbnail-left datas-item" >\n          <div class="button-positive clearfix" ng-click="share(item)">\n            <div class=" item-list both-clear">\n              <div class="item-title left">重点客户孙正和</div>\n              <div class="item-head-total right">\n                <ion-icon name="ios-eye-outline"></ion-icon>\n                1260\n              </div>\n            </div>\n            <div class="item-list item-job">张三：(杭州城北支行)</div>\n            <div class="item-list">\n              <div class="item-btns left">\n                <button ion-button color="danger" outline>标签1</button>\n                <button ion-button color="danger" outline>标签1</button>\n                <button ion-button color="danger" outline>标签1</button>\n              </div>\n              <div class="item-btns-r right">\n                2018 - 1 - 9  &nbsp; 更新\n                <!--<button ion-button color="calm" outline>2018-1-9 更新</button>-->\n              </div>\n            </div>\n            <!--<div class="item_who left">自己发起 |2018-01-15 9:45 </div>-->\n          </div>\n        </ion-item>\n      </ion-list>\n\n      <ion-list *ngSwitchCase="\'valbook\'">\n        <ion-item ng-repeat="item in items" class="item-thumbnail-left datas-item" >\n          <div class="button-positive clearfix" ng-click="share(item)">\n            <!--<div class="list_mark left">接待</div>-->\n            <div class=" item-list both-clear">\n              <div class="item-title left">重点客户孙正和</div>\n              <div class="item-head-total right">\n                <ion-icon name="ios-eye-outline"></ion-icon>\n                1260\n              </div>\n            </div>\n            <div class="item-list item-job">张三：(杭州城北支行)</div>\n            <div class="item-list">\n              <div class="item-btns left">\n                <button ion-button color="danger" outline>标签1</button>\n                <button ion-button color="danger" outline>标签1</button>\n                <button ion-button color="danger" outline>标签1</button>\n              </div>\n              <div class="item-btns-r right">\n                2018 - 1 - 9  &nbsp; 更新\n                <!--<button ion-button color="calm" outline>2018-1-9 更新</button>-->\n              </div>\n            </div>\n            <!--<div class="item_who left">自己发起 |2018-01-15 9:45 </div>-->\n          </div>\n        </ion-item>\n\n        <ion-item ng-repeat="item in items" class="item-thumbnail-left datas-item" >\n          <div class="button-positive clearfix" ng-click="share(item)">\n            <!--<div class="list_mark left">接待</div>-->\n            <div class=" item-list both-clear">\n              <div class="item-title left">重点客户孙正和</div>\n              <div class="item-head-total right">\n                <ion-icon name="ios-eye-outline"></ion-icon>\n                1260\n              </div>\n            </div>\n            <div class="item-list item-job">张三：(杭州城北支行)</div>\n            <div class="item-list">\n              <div class="item-btns left">\n                <button ion-button color="danger" outline>标签1</button>\n                <button ion-button color="danger" outline>标签1</button>\n                <button ion-button color="danger" outline>标签1</button>\n              </div>\n              <div class="item-btns-r right">\n                2018 - 1 - 9  &nbsp; 更新\n                <!--<button ion-button color="calm" outline>2018-1-9 更新</button>-->\n              </div>\n            </div>\n            <!--<div class="item_who left">自己发起 |2018-01-15 9:45 </div>-->\n          </div>\n        </ion-item>\n      </ion-list>\n\n      <ion-list *ngSwitchCase="\'case\'">\n        <ion-item ng-repeat="item in items" class="item-thumbnail-left datas-item" >\n          <div class="button-positive clearfix" ng-click="share(item)">\n            <!--<div class="list_mark left">接待</div>-->\n            <div class=" item-list both-clear">\n              <div class="item-title left">重点客户孙正和</div>\n              <div class="item-head-total right">\n                <ion-icon name="ios-eye-outline"></ion-icon>\n                1260\n              </div>\n            </div>\n            <div class="item-list item-job">张三：(杭州城北支行)</div>\n            <div class="item-list">\n              <div class="item-btns left">\n                <button ion-button color="danger" outline>标签1</button>\n                <button ion-button color="danger" outline>标签1</button>\n                <button ion-button color="danger" outline>标签1</button>\n              </div>\n              <div class="item-btns-r right">\n                2018 - 1 - 9  &nbsp; 更新\n                <!--<button ion-button color="calm" outline>2018-1-9 更新</button>-->\n              </div>\n            </div>\n            <!--<div class="item_who left">自己发起 |2018-01-15 9:45 </div>-->\n          </div>\n        </ion-item>\n      </ion-list>\n\n      <ion-list *ngSwitchCase="\'plan\'">\n        <ion-item ng-repeat="item in items" class="item-thumbnail-left datas-item" >\n          <div class="button-positive clearfix" ng-click="share(item)">\n            <!--<div class="list_mark left">接待</div>-->\n            <div class=" item-list both-clear">\n              <div class="item-title left">重点客户孙正和</div>\n              <div class="item-head-total right">\n                <ion-icon name="ios-eye-outline"></ion-icon>\n                1260\n              </div>\n            </div>\n            <div class="item-list item-job">张三：(杭州城北支行)</div>\n            <div class="item-list">\n              <div class="item-btns left">\n                <button ion-button color="danger" outline>标签1</button>\n                <button ion-button color="danger" outline>标签1</button>\n                <button ion-button color="danger" outline>标签1</button>\n              </div>\n              <div class="item-btns-r right">\n                2018 - 1 - 9  &nbsp; 更新\n                <!--<button ion-button color="calm" outline>2018-1-9 更新</button>-->\n              </div>\n            </div>\n            <!--<div class="item_who left">自己发起 |2018-01-15 9:45 </div>-->\n          </div>\n        </ion-item>\n      </ion-list>\n    </div>\n  </ion-list>\n\n  <!--收藏-->\n\n  <ion-list *ngSwitchCase="\'three\'">\n    <div padding class="table-list">\n      <ion-segment [(ngModel)]="collect">\n        <ion-segment-button class="nav-list seg-btn" value="collect">\n          收藏\n        </ion-segment-button>\n      </ion-segment>\n    </div>\n    <div [ngSwitch]="collect">\n      <ion-list *ngSwitchCase="\'collect\'">\n        <ion-list ng-controller="MyCtrl"\n                  show-delete="shouldShowDelete"\n                  show-reorder="shouldShowReorder"\n                  can-swipe="listCanSwipe" >\n          <ion-item ng-repeat="item in items" class="item-thumbnail-left datas-item" >\n            <div class="button-positive clearfix" ng-click="share(item)">\n              <!--<div class="list_mark left">接待</div>-->\n              <div class=" item-list both-clear">\n                <div class="item-title left">重点客户孙正和</div>\n                <div class="item-head-total right">\n                  <ion-icon name="ios-eye-outline"></ion-icon>\n                  1260\n                </div>\n              </div>\n              <div class="item-list item-job">张三：(杭州城北支行)</div>\n              <div class="item-list">\n                <div class="item-btns left">\n                  <button ion-button color="danger" outline>标签1</button>\n                  <button ion-button color="danger" outline>标签1</button>\n                  <button ion-button color="danger" outline>标签1</button>\n                </div>\n                <div class="item-btns-r right">\n                  2018 - 1 - 9  &nbsp; 更新\n                  <!--<button ion-button color="calm" outline>2018-1-9 更新</button>-->\n                </div>\n              </div>\n              <!--<div class="item_who left">自己发起 |2018-01-15 9:45 </div>-->\n            </div>\n          </ion-item>\n\n          <ion-item ng-repeat="item in items" class="item-thumbnail-left datas-item" >\n            <div class="button-positive clearfix" ng-click="share(item)">\n              <!--<div class="list_mark left">接待</div>-->\n              <div class=" item-list both-clear">\n                <div class="item-title left">重点客户孙正和</div>\n                <div class="item-head-total right">\n                  <ion-icon name="ios-eye-outline"></ion-icon>\n                  1260\n                </div>\n              </div>\n              <div class="item-list item-job">张三：(杭州城北支行)</div>\n              <div class="item-list">\n                <div class="item-btns left">\n                  <button ion-button color="danger" outline>标签1</button>\n                  <button ion-button color="danger" outline>标签1</button>\n                  <button ion-button color="danger" outline>标签1</button>\n                </div>\n                <div class="item-btns-r right">\n                  2018 - 1 - 9  &nbsp; 更新\n                  <!--<button ion-button color="calm" outline>2018-1-9 更新</button>-->\n                </div>\n              </div>\n              <!--<div class="item_who left">自己发起 |2018-01-15 9:45 </div>-->\n            </div>\n          </ion-item>\n        </ion-list>\n      </ion-list>\n    </div>\n  </ion-list>\n\n  <!--排行-->\n  <ion-list *ngSwitchCase="\'four\'">\n    <div padding class="table-list">\n      <ion-segment [(ngModel)]="rank">\n        <ion-segment-button class="nav-list seg-btn" value="hot">\n          热门内容\n        </ion-segment-button>\n        <ion-segment-button class="seg-btn" value="popularity">\n          人气作者\n        </ion-segment-button>\n      </ion-segment>\n    </div>\n    <div [ngSwitch]="rank">\n      <ion-list *ngSwitchCase="\'popularity\'">\n        <ion-item ng-repeat="item in items" class="item-thumbnail-left datas-item" >\n          <div class="button-positive clearfix" ng-click="share(item)">\n            <div class=" item-list both-clear">\n              <div class="item-title left">重点客户孙正和</div>\n              <div class="item-head-total right">\n                <ion-icon name="ios-eye-outline"></ion-icon>\n                1260\n              </div>\n            </div>\n            <div class="item-list item-job">张三：(杭州城北支行)</div>\n            <div class="item-list">\n              <div class="item-btns left">\n                <button ion-button color="danger" outline>标签1</button>\n                <button ion-button color="danger" outline>标签1</button>\n                <button ion-button color="danger" outline>标签1</button>\n              </div>\n              <div class="item-btns-r right">\n                2018 - 1 - 9  &nbsp; 更新\n                <!--<button ion-button color="calm" outline>2018-1-9 更新</button>-->\n              </div>\n            </div>\n            <!--<div class="item_who left">自己发起 |2018-01-15 9:45 </div>-->\n          </div>\n        </ion-item>\n      </ion-list>\n\n      <ion-list *ngSwitchCase="\'hot\'">\n        <ion-item ng-repeat="item in items" class="item-thumbnail-left datas-item" >\n          <div class="button-positive clearfix" ng-click="share(item)">\n            <!--<div class="list_mark left">接待</div>-->\n            <div class=" item-list both-clear">\n              <div class="item-title left">重点客户孙正和</div>\n              <div class="item-head-total right">\n                <ion-icon name="ios-eye-outline"></ion-icon>\n                1260\n              </div>\n            </div>\n            <div class="item-list item-job">张三：(杭州城北支行)</div>\n            <div class="item-list">\n              <div class="item-btns left">\n                <button ion-button color="danger" outline>标签1</button>\n                <button ion-button color="danger" outline>标签1</button>\n                <button ion-button color="danger" outline>标签1</button>\n              </div>\n              <div class="item-btns-r right">\n                2018 - 1 - 9  &nbsp; 更新\n                <!--<button ion-button color="calm" outline>2018-1-9 更新</button>-->\n              </div>\n            </div>\n            <!--<div class="item_who left">自己发起 |2018-01-15 9:45 </div>-->\n          </div>\n        </ion-item>\n\n        <ion-item ng-repeat="item in items" class="item-thumbnail-left datas-item" >\n          <div class="button-positive clearfix" ng-click="share(item)">\n            <!--<div class="list_mark left">接待</div>-->\n            <div class=" item-list both-clear">\n              <div class="item-title left">重点客户孙正和</div>\n              <div class="item-head-total right">\n                <ion-icon name="ios-eye-outline"></ion-icon>\n                1260\n              </div>\n            </div>\n            <div class="item-list item-job">张三：(杭州城北支行)</div>\n            <div class="item-list">\n              <div class="item-btns left">\n                <button ion-button color="danger" outline>标签1</button>\n                <button ion-button color="danger" outline>标签1</button>\n                <button ion-button color="danger" outline>标签1</button>\n              </div>\n              <div class="item-btns-r right">\n                2018 - 1 - 9  &nbsp; 更新\n                <!--<button ion-button color="calm" outline>2018-1-9 更新</button>-->\n              </div>\n            </div>\n            <!--<div class="item_who left">自己发起 |2018-01-15 9:45 </div>-->\n          </div>\n        </ion-item>\n      </ion-list>\n    </div>\n  </ion-list>\n\n</div>\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\knowledge\knowledge.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], KnowledgePage);
    return KnowledgePage;
}());

//# sourceMappingURL=knowledge.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__workbench_workbench__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mine_mine__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__customermanager_customermanager__ = __webpack_require__(248);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TabsPage = (function () {
    function TabsPage(cd) {
        this.cd = cd;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__workbench_workbench__["a" /* WorkBench */];
        // tab4Root = KnowledgePage;
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_5__customermanager_customermanager__["a" /* CustomermanagerPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_4__mine_mine__["a" /* MinePage */];
        this.tabFlag = "工具";
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        this.dateNow = new Date().getDate();
        console.log(this.dateNow);
    };
    TabsPage.prototype.chat = function (num) {
        this.tabNum = num;
        if (num == 3) {
            this.tabFlag = "";
        }
        else {
            this.tabFlag = "工作";
        }
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\tabs\tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="首页" (ionSelect)="chat(1)" tabIcon="tab-home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="走访" (ionSelect)="chat(2)" tabIcon="tab-about"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="工具" (ionSelect)="chat(3)" tabIcon="tab-contact"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="客户" (ionSelect)="chat(4)" tabIcon="tab-knowledge"></ion-tab>\n  <ion-tab [root]="tab5Root" tabTitle="我的" (ionSelect)="chat(5)" tabIcon="tab-mine"></ion-tab>\n  <!--<div class="tab-num" [ngClass]="{\'tab-num-in\':tabNum == 2}">{{dateNow}}</div>-->\n</ion-tabs>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__otherdetailpage_otherdetailpage__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__addotherpage_addotherpage__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__addplanpage_addplanpage__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__addreport_addreport__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__visidetail_visidetail__ = __webpack_require__(223);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AboutPage = (function () {
    function AboutPage(platform, actionsheetCtrl, navCtrl, navParams, httpService, modalCtrl) {
        var _this = this;
        this.platform = platform;
        this.actionsheetCtrl = actionsheetCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.modalCtrl = modalCtrl;
        this.kk = "kittens";
        this.workList = [];
        this.elseList = [];
        this.cardlist = [];
        this.marketingList = []; //营销
        this.meetinglist = [];
        this.statuslist = [];
        this.showmyList = false;
        this.toggleSelect = "全部";
        this.myList = [];
        this.isPrompt = true;
        this.isShowArrow = true;
        this.day = {};
        this.reportants = [];
        this.reports = {};
        this.select = {
            ismyListshow: false,
            MyList: [
                { option: "拜访", ischecked: false },
                { option: "接待", ischecked: false },
                { option: "陪访", ischecked: false },
                { option: "客户活动", ischecked: false },
                { option: "外拓活动", ischecked: false }
            ]
        };
        /*
          items:any= [];
          //上滑加载更多
          doInfinite(infiniteScroll) {
            console.log('Begin async operation');
        
            setTimeout(() => {
              for (let i = 0; i < 30; i++) {
                this.items.push( this.items.length );
              }
              console.log('Async operation has ended');
              infiniteScroll.complete();
            }, 500);
          }
        */
        //获取营销信息
        this.statusName = "";
        //hou 日历
        this.title = {};
        this.isTodayFlag = true;
        this.ordinaryActivityList = [];
        this.hasEvent = '';
        //点击某一天请求事件
        this.onDayEvent = function (event) {
            if (_this.workList.length != 0) {
                _this.workList = [];
                _this.hasEvent = 'false';
            }
            console.log(event);
            console.log(event.date);
            _this.day = _this.tranformDate(event.date);
            console.log(_this.day);
            var fullDate = event.fullDate;
            _this.date = fullDate.cMonth + '月' + fullDate.cDay + '日'; //cYear
            // this.date2 = fullDate.cYear + '/' + fullDate.cMonth + '/' + fullDate.cDay;//cYear
            var hasEvent = event.hasEvent;
            if (!hasEvent) {
                _this.hasEvent = 'true';
                var par = {
                    "userId": _this.userId,
                    "beginDate": _this.day.mondayDate,
                    "endDate": _this.day.sundayDate,
                    "pageNo": "1",
                    "dataCount": "10",
                    "firstPageNo": "10"
                };
                var url = "search/visitPlan.json";
                _this.httpService.postData({
                    url: url,
                    body: par
                }).then(function (res) {
                    console.log(res);
                    for (var i = 0, len = res.visitPlans.length; i < len; i++) {
                        if (res.visitPlans[i].planDate.replace(/-/g, '/') == event.date) {
                            console.log("666");
                            _this.ordinaryActivityList.push(res.visitPlans[i]);
                        }
                        else {
                            ;
                        }
                    }
                    if (_this.ordinaryActivityList.length != 0) {
                        _this.workList = _this.ordinaryActivityList;
                    }
                    else {
                        _this.workList = [];
                        _this.hasEvent = 'false';
                    }
                }).catch(function (error) {
                });
            }
            else {
                _this.workList = [];
                _this.hasEvent = 'false';
            }
        };
        this.onTitleChange = function (event) {
            _this.title = event;
        };
        this.onChange = function (event) {
            _this.date = '';
            _this.hasEvent = '';
            _this.initData(event);
            // setTimeout(() => {
            //   this.daysEvents = {
            //     '2018/03/01': true,
            //     '2018/03/02': true
            //   }
            // }, 1000)
        };
        this.goToday = function () {
            _this.calendar.goToday();
        };
        this.isToday = function (event) {
            _this.isTodayFlag = event;
            console.log(_this.isTodayFlag);
        };
        this.next = function () {
            _this.calendar.next();
        };
        this.previous = function () {
            _this.calendar.previous();
        };
        this.onPanUp = function () {
            _this.calendar.onPanUp();
        };
        this.onPanDown = function () {
            _this.calendar.onPanDown();
        };
        //获取userId
        this.userId = sessionStorage.getItem("userName");
        //把原来的构造方法删了
        this.title = navParams.get('title');
        if (navParams.get('type') == 'other') {
            this.kk = 'other';
            this.nowflage();
        }
        //判断是否是从外拓活动进来的，如果是获取传过来的值，如果存在，则直接转到mareketing选项卡
        this.getmarketAll = navParams.get('getmarketAll');
        if (this.getmarketAll == "mareketing") {
            this.kk = 'mareketing';
            //重新获取数据
            this.getmarketing();
        }
    }
    //跳转详情页面传值
    AboutPage.prototype.gomarket = function (item) {
    };
    AboutPage.prototype.showmarket = function () {
    };
    AboutPage.prototype.nowflage = function () {
        var _this = this;
        this.elseList = [];
        // this.homeService.getCustomerCurrent()
        //  const url = "calendar/currentLists.json";
        var url = "calendar/otherLists.json";
        this.httpService.getData({
            url: url,
            body: {}
        })
            .then(function (res) {
            //      let pieData = res.resultRes.elseList;
            var pieData = res.resultRes;
            for (var o in pieData) {
                _this.elseList.push(pieData[o]);
            }
        });
    };
    AboutPage.prototype.gotoOtherDetail = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__otherdetailpage_otherdetailpage__["a" /* OtherDetailPage */], {
            detail: item
        }, { animate: true });
    };
    //获取信用卡页面信息
    AboutPage.prototype.getcardinfo = function () {
    };
    AboutPage.prototype.openMap = function () {
        console.log("Map");
    };
    AboutPage.prototype.gomeeting = function () {
    };
    AboutPage.prototype.gotomeetingdetil = function (item) {
    };
    AboutPage.prototype.gotoCardDetail = function (item) {
    };
    AboutPage.prototype.CallPhone = function (phone) {
    };
    //设置单选列表状态
    AboutPage.prototype.showMyList = function () {
        this.myList = this.select.MyList;
        if (this.showmyList) {
            this.showmyList = false;
        }
        else {
            this.showmyList = true;
        }
    };
    //设置筛选内容
    AboutPage.prototype.getValues = function (val) {
        console.log(val + "getval");
        //调用筛选请求
        this.getfiltermarketing(val);
        this.toggleSelect = val;
        this.showmyList = false;
    };
    //点击全部按钮 进行筛选
    AboutPage.prototype.getfiltermarketing = function (marketType) {
        // this.meetinglist = [];
        // const url = "calendar/currentLists.json";
        // this.httpService.getData({
        //   url: url,
        //   body: {
        //     "marketType":marketType, //营销类型
        //     "page":1,   //分页对象
        //     "pageIndex":1,//当前第几页
        //     "pageSize":5  //每页记录数
        //   }
        // })
        //   .then(res=>{
        //     let pieData = res.resultRes.marketingList;
        //     for(var o in pieData){
        //
        //       this.marketingList.push(pieData[o]);
        //     }
        //     console.log(this.meetinglist);
        //   })
    };
    // marketFlag:any;
    AboutPage.prototype.getmarketing = function () {
        var _this = this;
        this.marketingList = [];
        var par = {
            "customName": this.reports.customer,
            "type": this.reports.activityType,
            "pace": this.reports.rate,
            "userId": this.userId,
            "pageNo": "1",
            "dataCount": "10",
            "firstPageNo": "10"
        };
        //  const url = "calendar/currentLists.json";
        var url = "search/visitReportant.json";
        this.httpService.getData({
            url: url,
            body: par
        })
            .then(function (res) {
            _this.reportants = res.visitReports;
        });
    };
    AboutPage.prototype.parseData = function (date) {
        if (date) {
            return date.replace(/\-/g, '/');
        }
        return;
    };
    AboutPage.prototype.initData = function (dateParm) {
        var _this = this;
        var url = "currentLists.json";
        this.httpService.postData({
            url: url,
            body: {
                dateParm: dateParm
            }
        })
            .then(function (res) {
            if (res.status != 0) {
                return;
            }
            var ordinaryActivityList = res.resultRes.marketList[0].ordinaryActivityList;
            var obj = {};
            ordinaryActivityList.forEach(function (item, index, array) {
                var date = _this.parseData(item.date);
                obj[date] = true;
            });
            _this.daysEvents = obj;
        }).catch(function (error) {
        });
    };
    AboutPage.prototype.ionViewDidLoad = function () {
        this.initData();
    };
    //通过今天获取这周的周一和周日日期
    AboutPage.prototype.tranformDate = function (date) {
        var now = new Date(date);
        var nowTime = now.getTime();
        var day = now.getDay();
        var oneDayTime = 24 * 60 * 60 * 1000;
        //显示周一
        var MondayTime = nowTime - (day - 1) * oneDayTime;
        //显示周日
        var SundayTime = nowTime + (7 - day) * oneDayTime;
        //初始化日期时间
        var monday = new Date(MondayTime);
        var sunday = new Date(SundayTime);
        var mondayDate = monday.getFullYear() + "/" + (monday.getMonth() + 1) + "/" + monday.getDate();
        var sundayDate = sunday.getFullYear() + "/" + (sunday.getMonth() + 1) + "/" + sunday.getDate();
        console.log(mondayDate);
        console.log(sundayDate);
        var dayDuring = {
            "mondayDate": mondayDate,
            "sundayDate": sundayDate
        };
        return dayDuring;
    }; //通过今天获取这周的周一和周日日期
    AboutPage.prototype.presentModal = function () {
        /* let myModal = this.modalCtrl.create(AddOtherPage,{type:"新增其他任务",num:this.elseList.length});
          myModal.onDidDismiss(data => {
          console.log(data);
          console.log(Object.keys(data));
          console.log(Object.keys(data).length);
          if(Object.keys(data).length!=0){
             this.elseList[this.elseList.length]=data;
          }
     
        });
         myModal.present();*/
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__addotherpage_addotherpage__["a" /* AddOtherPage */], {}, { animate: true });
    };
    //日历中日程跳转到当前日程的详情
    AboutPage.prototype.goCalendarDetail = function (calendarData) {
        switch (calendarData.scheduleType) {
            case "拜访":
            case "接待":
            case "陪访":
            case "客户活动":
            case "外拓活动":
                this.gomarket(calendarData);
                break;
            case "晨会":
            case "夕会":
            case "周会":
                this.gotomeetingdetil(calendarData);
                break;
            case "接待":
                this.gotoCardDetail(calendarData);
                break;
            case "其他":
                this.gotoOtherDetail(calendarData);
                break;
        }
        console.log(calendarData);
    };
    //点击走访计划列表进入新增报告页面
    AboutPage.prototype.goAddReport = function (datas) {
        var reportModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__addreport_addreport__["a" /* addreportPage */], { type: "编辑其它", "showPromp": false, "isAdd": 1, "datas": datas });
        reportModal.onDidDismiss(function (data) {
            //	 this.otherDetails=data;
        });
        reportModal.present();
    };
    AboutPage.prototype.go_visidetail = function (item) {
        this.status = item.approveStatus;
        console.log(this.status);
        this.interviewId = item.id;
        console.log(this.interviewId);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__visidetail_visidetail__["a" /* VisidetailPage */], { "index": this.status, "item": this.interviewId }, { animate: true });
    };
    //************走访报告*************
    AboutPage.prototype.goSearch = function () {
        console.log('走访报告');
        this.getmarketing();
    };
    //切换搜索条件
    AboutPage.prototype.showArrow = function () {
        this.isShowArrow = !this.isShowArrow;
    };
    AboutPage.prototype.plan = function () {
        //  let planModal = this.modalCtrl.create(AddplanpagePage,{ otherDetails: this.otherDetails,type:"编辑其它" });
        var planModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__addplanpage_addplanpage__["a" /* AddplanpagePage */], { type: "编辑其它" });
        planModal.onDidDismiss(function (data) {
            //	 this.otherDetails=data;
        });
        planModal.present();
    };
    AboutPage.prototype.report = function (isAdd) {
        var reportModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__addreport_addreport__["a" /* addreportPage */], { type: "编辑其它", "showPromp": true, "isAdd": isAdd });
        reportModal.onDidDismiss(function (data) {
            //	 this.otherDetails=data;
        });
        reportModal.present();
        //  let reportModal = this.modalCtrl.create(addreportPage,{ otherDetails: this.otherDetails,type:"编辑其它"});
        //  if(this.isPrompt){
        //  	let promptModal = this.modalCtrl.create(PromptPage,{type:"编辑其它" });
        //		  promptModal.onDidDismiss(data => {
        //		//	 this.otherDetails=data;
        //		   });
        //		  promptModal.present();
        //  }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('calendar'),
        __metadata("design:type", Object)
    ], AboutPage.prototype, "calendar", void 0);
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\about\about.html"*/'<ion-header class="header">\n  <ion-navbar>\n    <ion-title>\n      {{title}}\n      <ion-badge item-end (click)="goToday()" *ngIf="(isTodayFlag) && kk==\'kittens\'" style="font-size: 1.3rem;background:#7CC839">今</ion-badge>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n\n  <div style="background: #ffffff">\n    <ion-segment [(ngModel)]="kk" class="about-list">\n      <ion-segment-button class="seg-btn" value="kittens">\n        走访计划\n      </ion-segment-button>\n      <ion-segment-button class="seg-btn" value="mareketing"  (click)="getmarketing()" >\n        走访报告\n      </ion-segment-button>\n      <!--<ion-segment-button class="seg-btn" value="meeting" (click)="getmeetinginfo()">\n        会议\n      </ion-segment-button>\n      <ion-segment-button class="seg-btn" value="card" (click)="getcardinfo()">\n        信用卡\n      </ion-segment-button>-->\n      <!--<ion-segment-button class="seg-btn" value="other"  (click)="nowflage()">\n        其他\n      </ion-segment-button>-->\n\n    </ion-segment>\n  </div>\n  <!--走访报告-->\n  <div [ngSwitch]="kk">\n    <ion-list *ngSwitchCase="\'mareketing\'">\n\n      <!--************************************-->\n      <ion-list class="item-thumbnail-left" style="margin-bottom: 0px;">\n        <ion-item class="items"  >\n         <div class="search_inp">\n         	 <input type="text" placeholder="请输入客户名称" [(ngModel)]="reports.customer"/>\n         	 <ion-icon name="search" class="search_icon" (click)="goSearch()"></ion-icon>\n         </div>\n        </ion-item>\n\n				<div *ngIf="!isShowArrow">\n	        <ion-item style="border:none" class="visit">\n			      <!--<ion-label class="common_font" style="max-width:30%;width: 30%;">走访类型</ion-label>-->\n			      <ion-select class="common_font" style="max-width:90%; width: 90%;padding:0px;" [(ngModel)]="reports.activityType" (ngModelChange)="switchType()" interface="popover" placeholder="走访类型" >\n			        <ion-option value="新增走访">新增走访</ion-option>\n			        <ion-option value="多次走访">多次走访</ion-option>\n			      </ion-select>\n			      <ion-label class="img4 imgall4"></ion-label>\n			    </ion-item>\n			    <ion-item style="border:none" class="visit">\n			      <!--<ion-label class="common_font" style="max-width:30%;width: 30%;">走访类型</ion-label>-->\n			      <!--<ion-select class="common_font" style="max-width:70%; width: 70%;padding: 11px 8px 11px 6px;" [(ngModel)]="activityType" (ngModelChange)="switchType()" interface="popover" placeholder="走访类型" >-->\n			      <ion-select class="common_font" style="max-width:90%; width: 90%;padding:0px;" [(ngModel)]="reports.rate" (ngModelChange)="switchType2()" interface="popover" placeholder="走访进度" >\n			        <ion-option value="未拜访">未拜访</ion-option>\n			        <ion-option value="已拜访">已拜访</ion-option>\n			      </ion-select>\n			      <ion-label class="img4 imgall4"></ion-label>\n			    </ion-item>\n			    <ion-item style="border:none" class="visit">\n			      <!--<ion-label class="common_font" style="max-width:30%;width: 30%;">走访类型</ion-label>-->\n			      <ion-select class="common_font" style="max-width:90%; width: 90%;padding:0px;" [(ngModel)]="reports.manager" (ngModelChange)="switchType3()" interface="popover" placeholder="产品经理" >\n			        <ion-option value="张经理">张经理</ion-option>\n			        <ion-option value="刘经理">刘经理</ion-option>\n			        <ion-option value="王经理">王经理</ion-option>\n			      </ion-select>\n			      <ion-label class="img4 imgall4"></ion-label>\n			    </ion-item>\n		    </div>\n		    <ion-item style="border:none;"  (click)=\'showArrow()\'>\n		     	<ion-icon ios="ios-arrow-down" *ngIf="isShowArrow" class="icon_isShow"></ion-icon>\n		     	<ion-icon ios="ios-arrow-up" *ngIf="!isShowArrow" class="icon_isShow"></ion-icon>\n		    </ion-item>\n      </ion-list>\n      <!--<div class="kittens_item" *ngFor="let item of workList" (click)="goCalendarDetail(item)">-->\n      <div class="kittens_item" *ngFor="let item of reportants" (click)="go_visidetail(item)">\n            <div class="item_alltime">\n              <!--10:00-->\n              <span class="commonT startT padding-top16">{{item.realDate}}</span>\n              <!--<span class="commonT endT">{{item.endDate}}</span>-->\n            </div>\n            <div class="item_content">\n            	<!--接待-->\n          <!--<span class="item_style">\n            {{item.scheduleType}}\n          </span>-->\n              <div class="item_detail">\n                <div style="font-size: 14px;">{{item.userName}}</div>\n                <!--<div style="color:#999;font-size: 12px;">{{item.address}}</div>-->\n              </div>\n            </div>\n            <div class="item_status">\n              <div style="font-size: 14px;" *ngIf="item.status==2">审批中</div>\n              <div style="font-size: 14px;" *ngIf="item.status==3">已审批</div>\n              <div style="font-size: 14px;" *ngIf="item.status==4">已退回</div>\n            </div>\n          </div>\n      <!--************************************-->\n\n			 <ion-fab style="position:fixed;right:10px;bottom:80px;" >\n        <button ion-fab style="width: 50px;height: 50px;line-height: 50px;margin-right: 10px;background:#ff8611"><ion-icon name="add"></ion-icon></button>\n        <ion-fab-list  side="top" >\n          <button class="btnfab yellowBg" (click)="report(0)">报告</button>\n          <button class="btnfab yellowBg" (click)="plan()">计划</button>\n          <!--<button class="btnfab yellowBg" (click)="presentModal()">其他</button>-->\n        </ion-fab-list>\n      </ion-fab>\n    </ion-list>\n\n		<!--走访计划-->\n    <ion-list *ngSwitchCase="\'kittens\'"\n              (swipeleft)="next()"\n              (swiperight)="previous()"\n              (panup)="onPanUp()"\n              (pandown)="onPanDown()"\n    >\n      <!--<ion-calendar #calendar [events]="currentEvents" (onDaySelect)="onDaySelect($event)"></ion-calendar>-->\n      <calendar #calendar (onDayEvent)="onDayEvent($event)"\n                (onChangeEvent)="onChange($event)"\n                (onTitleChangeEvent)="onTitleChange($event)"\n                [daysEvents]="daysEvents"\n                (onGoTodayEvent)="goToday()"\n                (onIsTodayEvent)="isToday($event)"\n                [showCNDate]="true"></calendar>\n      <div class="kittens_content" *ngIf="hasEvent != \'\'">\n        <div class="common_header">{{date}}</div>\n\n        <!--具体日期有数据时-->\n        <div *ngIf="hasEvent == \'true\'">\n          <!--<div class="kittens_item" *ngFor="let item of workList" (click)="goCalendarDetail(item)">-->\n          <div class="kittens_item" *ngFor="let item of workList" (click)="goAddReport(item)">\n            <div class="item_alltime">\n              <!--10:00-->\n              <span class="commonT startT padding-top16">{{item.planDate}}</span>\n              <!--<span class="commonT endT">{{item.endDate}}</span>-->\n            </div>\n            <div class="item_content">\n            	  <!--接待-->\n          <!--<span class="item_style">\n            {{item.scheduleType}}\n          </span>-->\n              <div class="item_detail">\n                <div style="font-size: 14px;">{{item.customName}}</div>\n                <!--<div style="color:#999;font-size: 12px;">{{item.address}}</div>-->\n              </div>\n            </div>\n            <div class="item_status">\n              <div style="font-size: 14px;" *ngIf="item.status==2">审批中</div>\n              <div style="font-size: 14px;" *ngIf="item.status==3">已审批</div>\n              <div style="font-size: 14px;" *ngIf="item.status==4">已退回</div>\n            </div>\n          </div>\n        </div>\n        <!--具体日期无数据时-->\n        <div *ngIf="hasEvent == \'false\'">\n          <div class="nothing">\n            <ion-icon name="people" style="color: #CDCDC1;font-size:100px;"></ion-icon>\n          </div>\n          <div style="width: 100%;text-align: center;font-size: 1.2rem">\n            <label >暂无更多事件</label>\n          </div>\n        </div>\n      </div>\n\n      <ion-fab style="position:fixed;right:10px;bottom:80px;">\n        <button ion-fab  style="width: 50px;height: 50px;line-height: 50px;margin-right: 10px;background:#ff8611"><ion-icon name="add"></ion-icon></button>\n        <ion-fab-list  side="top" >\n          <!--<button class="btnfab redBg" (click)="showmarket()">计划</button>\n          <button class="btnfab saffronyellowBg" (click)="gomeeting()">报告</button>\n          <button class="btnfab yellowBg" (click)="presentModal()">其他</button>-->\n          <button class="btnfab yellowBg" (click)="report()">报告</button>\n          <button class="btnfab yellowBg" (click)="plan()">计划</button>\n        </ion-fab-list>\n      </ion-fab>\n    </ion-list>\n\n\n    <ion-list *ngSwitchCase="\'meeting\'">\n      <ion-list ng-controller="MyCtrl"\n                show-delete="shouldShowDelete"\n                show-reorder="shouldShowReorder"\n                can-swipe="listCanSwipe"  class="item-thumbnail-left">\n        <div class="button-positive clearfix"   ng-click="share(item);" *ngFor="let item of meetinglist" (click)="gotomeetingdetil(item)">\n          <ion-item ng-repeat="item in items"  class="about-list-item-magin">\n            <div style="width: 80%;float: left">\n              <div class="list_mark left bsFont "><label >{{item.meetingType}}</label></div>\n              <div class="item_title left titlefont blackwideFont"  style="font-weight: 550;"><label >{{item.title}}</label></div>\n              <div class="item_time left bsFont btmfont"><label >时间：{{item.startTime}}-{{item.endTime}}</label></div>\n              <div class="item_address left bsFont btmfont"><label >地点：{{item.address}}&nbsp;&nbsp;&nbsp;</label></div>\n              <div class="item_who left bsFont btmfont"><label class="buleFont">{{item.who}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</label>\n                <label class="wathetbuleFont">{{item.nowTime}}</label>\n              </div>\n              <div class="item_address left bsFont btmfont"><label >签到人数：&nbsp;&nbsp;&nbsp;</label></div>\n            </div>\n\n            <div style="width: 20%;float: right" id="statusdiv" >\n              <label class="bsFont btmfont" >{{item.status}}</label>\n            </div>\n\n          </ion-item>\n\n        </div>\n      </ion-list>\n    </ion-list>\n\n\n\n    <ion-list *ngSwitchCase="\'other\'" >\n      <ion-list ng-controller="MyCtrl"\n                show-delete="shouldShowDelete"\n                show-reorder="shouldShowReorder"\n                can-swipe="listCanSwipe"  class="item-thumbnail-left">\n          <div class="button-positive clearfix">\n            <ion-item  *ngFor="let item of elseList" (click)="gotoOtherDetail(item)"   class="about-list-item-magin">\n	            <div style="width: 80%;float: left">\n	              <!--<div class="list_mark left bsFont other_bg"><label >{{item.style}}</label></div>-->\n	              <div class="list_mark left bsFont other_bg"><label>其它</label></div>\n	              <div class="item_title left titlefont blackwideFont" *ngIf="item.title"  style="font-weight: 550;" ><label >{{item.title}}</label></div><br />\n	              <div class="item_time left bsFont btmfont"><label >时间：{{item.time}}</label></div>\n	              <div class="item_address left bsFont btmfont"><label >内容：{{item.content}}</label></div>\n	            </div>\n          </ion-item>\n          </div>\n          <!--<ion-fab bottom right>-->\n		        <!--<button ion-fab style="width: 50px;height: 50px;line-height: 50px;margin-right: 10px;" (click)="addOther()"><ion-icon name="add"></ion-icon></button>-->\n		        <!--<button ion-fab style="width: 50px;height: 50px;line-height: 50px;margin-right: 10px;" (click)="presentModal()"><ion-icon name="add"></ion-icon></button>-->\n		      <!--</ion-fab>-->\n      </ion-list>\n    </ion-list>\n\n\n    <ion-list *ngSwitchCase="\'card\'" >\n      <ion-list ng-controller="MyCtrl"\n                show-delete="shouldShowDelete"\n                show-reorder="shouldShowReorder"\n                can-swipe="listCanSwipe"  class="item-thumbnail-left">\n        <div class="button-positive clearfix"   ng-click="share(item);" (click)="gotoCardDetail(item)"  *ngFor="let item of cardlist">\n          <ion-item ng-repeat="item in items" class="about-list-item-magin" >\n            <div style="width: 80%;float: left">\n              <div class="list_mark left bsFont "><label >{{item.style}}</label></div>\n              <div class="item_title left titlefont blackwideFont"  style="font-weight: 550;"><label >{{item.title}}</label></div>\n              <div class="item_time left bsFont btmfont"><label >时间：{{item.time}}</label></div>\n              <div class="item_address left bsFont btmfont"><label >地点：{{item.address}}&nbsp;&nbsp;&nbsp;</label>\n                <ion-icon name="send" style="color: #00008B;font-size: 14px" (click)="openMap();$event.stopPropagation();"></ion-icon>\n                <label>{{item.length}}</label>\n              </div>\n              <div class="item_thing left bsFont btmfont"><label >事项：{{item.content}}</label></div>\n              <div class="item_who left bsFont btmfont"><label class="buleFont">{{item.who}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</label>\n                <label class="wathetbuleFont">{{item.nowTime}}</label>\n              </div>\n            </div>\n\n            <div style="width: 20%;float: right">\n              <ion-icon name="call" style="color: #2ec95c;font-size: 40px;margin-top: 34%;margin-right: 20px" class="right" (click)="CallPhone(item.phone);$event.stopPropagation();"></ion-icon>\n            </div>\n\n          </ion-item>\n\n        </div>\n      </ion-list>\n\n    </ion-list>\n  </div>\n\n\n\n\n<!--上滑加载更多-->\n <!--\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Loading more data...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>-->\n\n\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtherDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__addotherpage_addotherpage__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MarketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OtherDetailPage = (function () {
    function OtherDetailPage(navCtrl, navParams, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.otherDetails = navParams.get('detail');
    }
    OtherDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OtherDetailPage');
    };
    OtherDetailPage.prototype.presentModal = function () {
        var _this = this;
        var myModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__addotherpage_addotherpage__["a" /* AddOtherPage */], { otherDetails: this.otherDetails, type: "编辑其它" });
        myModal.onDidDismiss(function (data) {
            _this.otherDetails = data;
        });
        myModal.present();
    };
    OtherDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-otherdetailpage',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\otherdetailpage\otherdetailpage.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>其它详情</ion-title>\n    <!--<div class="edit right" (click)="goEditOther(otherDetails)">编辑</div>-->\n    <div class="edit right" (click)="presentModal()">编辑</div>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <div class="market-list">\n    <span class="market-list-name">任务主题:</span>\n    <span class="market-list-cont">{{otherDetails.title}}</span>\n  </div>\n  <!--<div class="market-list">\n    <span class="market-list-name">计划类型:</span>\n    <span class="market-list-cont">{{otherDetails.style}}</span>\n  </div>-->\n  <div class="market-list">\n    <span class="market-list-name">任务时间:</span>\n    <span class="market-list-cont">{{otherDetails.time}}</span>\n  </div>\n  <div class="market-list">\n    <span class="market-list-name">任务内容:</span>\n    <span class="market-list-cont">{{otherDetails.content}}</span>\n  </div>\n  <!--<div class="market-list" *ngIf="otherDetails.addr">\n    <span class="market-list-name">地点</span>\n    <span class="market-list-cont">{{otherDetails.addr}}</span>\n  </div>\n  <div class="market-list">\n    <span class="market-list-name">发起人</span>\n    <span class="market-list-cont">{{otherDetails.who}}</span>\n  </div>\n   <div class="market-list">\n    <span class="market-list-name">发起时间</span>\n    <span class="market-list-cont">{{otherDetails.nowTime}}</span>\n  </div>-->\n\n\n  <div class="footer"></div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\otherdetailpage\otherdetailpage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], OtherDetailPage);
    return OtherDetailPage;
}());

//# sourceMappingURL=otherdetailpage.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddplanpagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MarketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddplanpagePage = (function () {
    function AddplanpagePage(navCtrl, navParams, httpService, alertCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.addOthers = {};
        this.addParams = {};
        this.others = {};
        this.isDisabled = true;
        this.searchLists = [];
        this.searchList = [];
        this.infoType = this.navParams.get('type');
        this.num = this.navParams.get('num');
        console.log(navParams.get('otherDetails'));
        //获取userId
        this.userId = sessionStorage.getItem("userName");
        this.isSearch = "none";
        this.isAddress = "none";
        if (this.navParams.get('otherDetails')) {
            this.addOthers = this.navParams.get('otherDetails');
            this.others = JSON.stringify(this.navParams.get('otherDetails'));
            console.log(this.addOthers);
            console.log(this.addOthers.time);
            console.log(this.addOthers.time.substr(0, 10));
            this.addOthers.time = this.addOthers.time.substr(0, 10);
        }
    }
    AddplanpagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddOtherPage');
    };
    AddplanpagePage.prototype.transformData = function (data) {
        var da = new Date(data).getDay();
        switch (da) {
            case 0:
                this.date = "周日";
                break;
            case 1:
                this.date = "周一";
                break;
            case 2:
                this.date = "周二";
                break;
            case 3:
                this.date = "周三";
                break;
            case 4:
                this.date = "周四";
                break;
            case 5:
                this.date = "周五";
                break;
            case 6:
                this.date = "周六";
                break;
            default:
                break;
        }
        return (data + " " + this.date);
    };
    AddplanpagePage.prototype.saveInfo = function (isSubmit) {
        var _this = this;
        console.log(this.addOthers.time);
        var date = new Date(this.addOthers.time);
        this.dayTime = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日 " + date.getHours() + ":" + date.getMinutes();
        var URL = "search/addPlan.json";
        var par = {
            "customName": this.addOthers.title,
            "planDate": this.dayTime,
            "province": this.addOthers.province,
            "city": this.addOthers.area,
            "isSubmit": isSubmit,
            "userId": this.userId,
            "isAdd": 0
        };
        this.httpService.getData({
            url: URL,
            body: par,
        }).then(function (res) {
            console.log(res);
            var result = res.returnCode;
            if (result == 0) {
                _this.showAlertMsg("保存成功", true);
            }
            else {
                _this.showAlertMsg("保存失败", false);
            }
        }).catch(function (error) {
            _this.showAlertMsg(error, false);
        });
    };
    AddplanpagePage.prototype.showAlertMsg = function (messag, isTouter) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '系统提示',
            subTitle: messag,
            buttons: [
                {
                    text: "确定",
                    handler: function () {
                        console.log('Cancel clicked');
                        if (isTouter) {
                            if (_this.infoType == "编辑") {
                                _this.dismiss(true);
                            }
                            else {
                                _this.dismiss(true);
                            }
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    AddplanpagePage.prototype.dismiss = function (data) {
        if (data) {
            this.viewCtrl.dismiss(this.addOthers);
        }
        else {
            console.log(this.others);
            //		this.viewCtrl.dismiss(JSON.parse(this.others));
            if (this.infoType != "编辑其它") {
                this.addOthers = this.others;
                this.viewCtrl.dismiss(this.addOthers);
            }
            else {
                this.addOthers = JSON.parse(this.others);
                this.viewCtrl.dismiss(this.addOthers);
            }
        }
    };
    //点击选择省份
    AddplanpagePage.prototype.switchType = function () {
        this.activityType2 = "请选择市区";
        //  console.log(this.meterial);
        console.log('选择类型');
        this.activityType2 = "请选择市区";
    };
    //点击选择市
    AddplanpagePage.prototype.switchType2 = function () {
        //  console.log(this.meterial);
        console.log('选择类型');
    };
    AddplanpagePage.prototype.goSearch = function ($event) {
        var _this = this;
        var url = "search/customer.json";
        var param = {
            "customName": this.addOthers.title,
            "pageNo": "1",
            "dataCount": "10",
            "fisrPageNo": "10",
            "vague": true
        };
        this.httpService.getData({
            url: url,
            body: param
        })
            .then(function (res) {
            console.log(res);
            _this.searchList = res.customs;
            _this.searchLists = [];
            if ($event.target.value) {
                for (var i = 0, len = _this.searchList.length; i < len; i++) {
                    if (_this.searchList[i].customName.indexOf($event.target.value) != -1) {
                        console.log($event.target.value);
                        _this.searchLists.push(_this.searchList[i]);
                    }
                    else {
                        _this.isSearch = 'none';
                    }
                }
                if (_this.searchLists.length == 0) {
                    _this.isSearch = 'none';
                }
                else {
                    _this.isSearch = 'block';
                }
            }
            else {
                _this.isSearch = 'none';
            }
        });
    };
    AddplanpagePage.prototype.goCustomer = function (cust) {
        this.addOthers.title = cust.customName;
        this.isSearch = 'none';
    };
    AddplanpagePage.prototype.addAttendees = function () {
        this.isAddress = "block";
    };
    AddplanpagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addplanpage',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\addplanpage\addplanpage.html"*/'\n<ion-header  class="header">\n\n  <ion-navbar>\n\n    <ion-title>新增计划</ion-title>\n    <div class="save right" (click)="saveInfo(0)">保存</div>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-item>\n    <ion-label fixed>客户名称</ion-label>\n    <ion-input type="text" value="" placeholder="客户名称" [(ngModel)]="addOthers.title" (keyup)="goSearch($event)"></ion-input>\n  </ion-item>\n  <div class="serach_lists" [ngStyle]="{\'display\':isSearch}">\n   		<div class="lists_cont">\n   			<div class="list_item" (click)="goCustomer(item)" *ngFor="let item of searchLists">{{item.customName}}</div>\n   		</div>\n   	</div>\n  <ion-item>\n    <ion-label fixed>计划走访时间</ion-label>\n		<div item-content class="item_width">\n      <div class="left">\n      	<ion-datetime displayFormat="YYYY年MM月DD日 HH:mm" placeholder="计划走访时间" cancelText="取消" doneText="完成" [(ngModel)]="addOthers.time" ></ion-datetime>\n      </div>\n      <ion-label class="img imgall"></ion-label>\n    </div>\n  </ion-item>\n	<ion-item >\n    <ion-label fixed> <label ></label>客户地址</ion-label>\n    <ion-label class="imgall2  add_attendees" (click)="addAttendees()">\n    	<div class="add_img" >\n				<ion-icon name="md-add"></ion-icon>\n	    </div>\n    </ion-label>\n  </ion-item>\n    <ion-item style="border:none" [ngStyle]="{\'display\':isAddress}" *ngIf="!activityType2 || activityType2 == \'请选择市区\'">\n      <ion-label class="common_font" style="max-width:30%;width: 30%;">客户省份</ion-label>\n      <ion-select class="common_font" style="max-width:70%; width: 70%;padding: 11px 8px 11px 6px;" [(ngModel)]="addOthers.province" (ngModelChange)="switchType()" interface="popover" placeholder="请选择省份">\n        <ion-option value="上海">上海</ion-option>\n        <ion-option value="浙江省">浙江省</ion-option>\n        <ion-option value="江苏省">江苏省</ion-option>\n      </ion-select>\n      <ion-label class="img4 imgall4"></ion-label>\n    </ion-item>\n    <ion-item style="border:none" [ngStyle]="{\'display\':isAddress}" *ngIf="!activityType2 || activityType2 == \'请选择市区\'">\n      <ion-label class="common_font" style="max-width:30%;width: 30%;">客户市区</ion-label>\n      <ion-select class="common_font" style="max-width:70%; width: 70%;padding: 11px 8px 11px 6px;" [(ngModel)]="addOthers.area" (ngModelChange)="switchType2()" interface="popover" placeholder="请选择市区">\n        <ion-option value="请选择市区">请选择市区</ion-option>\n        <ion-option value="宁波">宁波</ion-option>\n        <ion-option value="杭州">杭州</ion-option>\n        <ion-option value="温州">温州</ion-option>\n      </ion-select>\n      <ion-label class="img4 imgall4"></ion-label>\n    </ion-item>\n\n  <ion-item style="border:none" *ngIf="activityType2 && activityType2 != \'请选择市区\'">\n    <ion-label class="common_font" style="max-width:30%;width: 30%;">客户地址</ion-label>\n    <ion-label class="common_font" style="max-width:70%;width: 70%;">{{activityType}}{{activityType2}}</ion-label>\n  </ion-item>\n\n   <div class="submit" (click)="saveInfo(1)">提交</div>\n\n  <div class="footer"></div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\addplanpage\addplanpage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], AddplanpagePage);
    return AddplanpagePage;
}());

//# sourceMappingURL=addplanpage.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AttendeesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__addattend_addattend__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_angular_3_9_2_ionic_angular_components_toast_toast_controller__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the AttendeesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AttendeesPage = (function () {
    function AttendeesPage(navCtrl, navParams, httpService, viewCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.attendLists = [];
        this.attendArr = [];
        this.attends = {};
        this.attentdList = [];
        this.isTrue = true;
        this.checked_select = false;
        //this.getData();
    }
    AttendeesPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad AttendeesPage');
    };
    AttendeesPage.prototype.getData = function () {
        var _this = this;
        var url = "search/attenddList.json";
        var par = {
            "type": this.attends.activityType,
            "name": this.attends.customer,
            "department": this.attends.department,
            "position": this.attends.position
        };
        this.httpService.getData({
            url: url,
            body: par
        })
            .then(function (res) {
            console.log(res);
            _this.attendLists = res.meeters;
        });
    };
    //点击全选
    AttendeesPage.prototype.all_check = function () {
        console.log("您点击了全选");
        //判断是否为true
        if (this.checked_all_select) {
            this.checked_all_select = false;
            this.checked_select = false;
        }
        else {
            this.checked_all_select = true;
            this.checked_select = true;
            this.attendArr = this.attendLists;
        }
    };
    AttendeesPage.prototype.picc = function ($event) {
        this.isTrue = false;
        if ($event.target.value) {
            this.isTrue = false;
        }
        else {
            this.isTrue = true;
        }
    };
    AttendeesPage.prototype.goSearch = function ($event) {
        this.getData();
        if (this.attends.activityType) {
            //this.getData();
            this.attentdList = [];
            if (this.attendLists.length > 0) {
                for (var i = 0, len = this.attendLists.length; i < len; i++) {
                    if (this.attendLists[i].type === this.attends.activityType && this.attendLists[i].name.indexOf($event.target.previousSibling.previousSibling.value) != -1) {
                        this.attentdList.push(this.attendLists[i]);
                    }
                    else {
                        var toast = this.toastCtrl.create({
                            message: '没有找到数据',
                            duration: 1000,
                            position: 'middle' //位置
                        });
                        toast.present();
                        break;
                    }
                }
            }
            if (this.attentdList.length > 0) {
                this.isDisplay = "block";
            }
            else {
                this.isDisplay = "none";
            }
        }
        else {
            if (!$event.target.previousSibling.previousSibling.value) {
                var toast = this.toastCtrl.create({
                    message: '请输入姓名',
                    duration: 1000,
                    position: 'middle' //位置
                });
                toast.present();
            }
            else {
                this.isTrue = false;
                var toast = this.toastCtrl.create({
                    message: '请选择类型',
                    duration: 1000,
                    position: 'middle' //位置
                });
                toast.present();
            }
        }
    };
    //选择类型
    AttendeesPage.prototype.switchType = function () {
        console.log(typeof this.attends.activityType);
        this.isDisplay = "none";
        console.log("点击类型");
    };
    //选择职位
    AttendeesPage.prototype.switchType1 = function () {
        console.log("点击部门");
    };
    //选择
    AttendeesPage.prototype.switchType2 = function () {
        console.log("点击职位");
    };
    AttendeesPage.prototype.addList = function () {
        console.log('新增');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__addattend_addattend__["a" /* AddattendPage */], { animate: true });
    };
    AttendeesPage.prototype.addAtteends = function () {
        console.log('立即添加');
        console.log(this.attendArr);
        this.viewCtrl.dismiss(this.attendArr);
    };
    AttendeesPage.prototype.selectName = function (item) {
        this.attendArr.push(item);
    };
    AttendeesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-attendees',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\attendees\attendees.html"*/'<!--\n  Generated template for the AttendeesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header">\n  <ion-navbar>\n    <div class="search_header">\n      <input class="input" type="search"  (keyup)="picc($event)" placeholder="请输入名字" [(ngModel)]="attends.customer">\n      <div class="search_icon" (click)="goSearch($event)">搜索</div>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n\n  <div style="border-bottom: 1px #ddd solid;display: -webkit-box;">\n  <ion-item style="border:none" class="visit">\n    <!--<ion-label class="common_font" style="max-width:30%;width: 30%;">走访类型</ion-label>-->\n    <ion-select class="common_font" style="max-width:90%; width: 90%;padding:0px;" [(ngModel)]="attends.activityType" [disabled]="isTrue"  (ngModelChange)="switchType()" interface="popover" placeholder="类型" >\n      <ion-option value="0">我方</ion-option>\n      <ion-option value="1">客户</ion-option>\n    </ion-select>\n    <ion-label class="img4 imgall4"></ion-label>\n  </ion-item>\n  </div>\n\n  <div [ngStyle]="{\'display\':isDisplay}" class="common_content common_flex"  style="border-bottom: 1px #ddd solid;"  *ngFor="let item of attentdList">\n    <div style="display: -webkit-box;-webkit-box-align: center">\n      <input type="checkbox" style="display: -webkit-box;width:1.5rem;height:1.5rem;margin-right: 1rem" [checked]="checked_select"  (click)="selectName(item)">\n    </div>\n    <div  class="content_nowrap">\n      <div class="content_title">{{item.name}}</div>\n      <div class="content_font" style="margin-top: 1rem;">\n        <span>部门：{{item.department}}</span><span style="margin-left: 2rem;">职位：{{item.position}}</span>\n      </div>\n    </div>\n  </div>\n\n  <div class="footer">\n    <div style="display: -webkit-box;-webkit-box-align: center;width:10%;-webkit-box-pack:end">\n      <input type="checkbox" style="display: -webkit-box;width:1.5rem;height:1.5rem;" [checked]="checked_all_select" (click)="all_check()">\n    </div>\n    <div style="width: 10%;text-align: center;" (click)="all_check($event)">\n      全选\n    </div>\n    <div style="width: 30%;text-align: center;">\n      <span (click)="addList()">新增</span>\n    </div>\n    <div style="width: 50%;text-align: center">\n      <span style="background: #ff8611;color:#ffffff;" (click)="addAtteends()">立即添加</span>\n    </div>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\attendees\attendees.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_angular_3_9_2_ionic_angular_components_toast_toast_controller__["a" /* ToastController */]])
    ], AttendeesPage);
    return AttendeesPage;
}());

//# sourceMappingURL=attendees.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddattendPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MarketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddattendPage = (function () {
    function AddattendPage(navCtrl, navParams, httpService, alertCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.addOthers = {};
        this.addParams = {};
        this.others = {};
        this.isDisabled = true;
        this.infoType = this.navParams.get('type');
        this.num = this.navParams.get('num');
    }
    AddattendPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddOtherPage');
    };
    AddattendPage.prototype.saveOther = function () {
        var _this = this;
        var URL = "search/addReport.json";
        var par = {
            "name": this.addOthers.title,
            "type": this.addOthers.type,
            "department": this.addOthers.department,
            "position": this.addOthers.position,
            "businessCard": this.addOthers.businessCard,
            "phone": this.addOthers.phone
        };
        this.httpService.getData({
            url: URL,
            body: par
        }).then(function (res) {
            console.log(res);
            var result = res.status;
            if (result == 0) {
                _this.showAlertMsg("保存成功", true);
                window.history.go(-1);
            }
            else {
                _this.showAlertMsg("保存失败", false);
            }
        }).catch(function (error) {
            _this.showAlertMsg(error, false);
        });
    };
    AddattendPage.prototype.transformData = function (data) {
        var da = new Date(data).getDay();
        switch (da) {
            case 0:
                this.date = "周日";
                break;
            case 1:
                this.date = "周一";
                break;
            case 2:
                this.date = "周二";
                break;
            case 3:
                this.date = "周三";
                break;
            case 4:
                this.date = "周四";
                break;
            case 5:
                this.date = "周五";
                break;
            case 6:
                this.date = "周六";
                break;
            default:
                break;
        }
        return (data + " " + this.date);
    };
    AddattendPage.prototype.saveInfo = function (URL) {
        var _this = this;
        this.httpService.getData({
            url: URL,
            body: {
                //        params: this.addOthers
                params: this.addParams
            },
        }).then(function (res) {
            console.log(res);
            var result = res.status;
            if (result == 0) {
                _this.showAlertMsg("保存成功", true);
            }
            else {
                _this.showAlertMsg("保存失败", false);
            }
        }).catch(function (error) {
            _this.showAlertMsg(error, false);
        });
    };
    AddattendPage.prototype.showAlertMsg = function (messag, isTouter) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '系统提示',
            subTitle: messag,
            buttons: [
                {
                    text: "确定",
                    handler: function () {
                        console.log('Cancel clicked');
                        if (isTouter) {
                            if (_this.infoType == "编辑") {
                                _this.dismiss(true);
                            }
                            else {
                                _this.dismiss(true);
                            }
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    AddattendPage.prototype.dismiss = function (data) {
        if (data) {
            this.viewCtrl.dismiss(this.addOthers);
        }
        else {
            console.log(this.others);
            //		this.viewCtrl.dismiss(JSON.parse(this.others));
            if (this.infoType != "编辑其它") {
                this.addOthers = this.others;
                this.viewCtrl.dismiss(this.addOthers);
            }
            else {
                this.addOthers = JSON.parse(this.others);
                this.viewCtrl.dismiss(this.addOthers);
            }
        }
    };
    //点击选择省份
    AddattendPage.prototype.switchType = function () {
    };
    //点击选择市
    AddattendPage.prototype.switchType2 = function () {
        //  console.log(this.meterial);
        console.log('选择类型');
    };
    AddattendPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addattendpage',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\addattend\addattend.html"*/'\n<ion-header  class="header">\n\n  <ion-navbar>\n\n    <ion-title>新增与会人员</ion-title>\n    <div class="save right" (click)="saveOther()">保存</div>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-item>\n    <ion-label fixed>姓名</ion-label>\n    <ion-input type="text" value="" placeholder="请输入会谈人员姓名" [(ngModel)]="addOthers.title"></ion-input>\n  </ion-item>\n  <ion-item style="border:none" >\n      <ion-label class="common_font" style="max-width:30%;width: 30%;">类型</ion-label>\n      <ion-select class="common_font" style="max-width:70%; width: 70%;padding: 11px 8px 11px 6px;" [(ngModel)]="addOthers.type" (ngModelChange)="switchType()" interface="popover" placeholder="请选择类型">\n        <ion-option value="我方">我方</ion-option>\n        <ion-option value="第三方">第三方</ion-option>\n      </ion-select>\n      <ion-label class="img4 imgall4"></ion-label>\n    </ion-item>\n    <ion-item>\n	    <ion-label fixed>所属部门</ion-label>\n	    <ion-input type="text" value="" placeholder="请输入会谈人员所属部门" [(ngModel)]="addOthers.department"></ion-input>\n	  </ion-item>\n	   <ion-item>\n	    <ion-label fixed>职位</ion-label>\n	    <ion-input type="text" value="" placeholder="请输入会谈人员职位" [(ngModel)]="addOthers.position"></ion-input>\n	  </ion-item>\n	  <ion-item>\n	    <ion-label fixed>名片</ion-label>\n	    <ion-input type="text" value="" placeholder="请输入会谈人员名片" [(ngModel)]="addOthers.businessCard"></ion-input>\n	  </ion-item>\n	  <ion-item>\n	    <ion-label fixed>电话</ion-label>\n	    <ion-input type="text" value="" placeholder="请输入会谈人员电话" [(ngModel)]="addOthers.phone"></ion-input>\n	  </ion-item>\n\n\n\n\n\n   <div class="submit" (click)="saveOther()">提交</div>\n\n  <div class="footer"></div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\addattend\addattend.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], AddattendPage);
    return AddattendPage;
}());

//# sourceMappingURL=addattend.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisidetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__visitlist_visitlist__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Constants__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the VisidetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VisidetailPage = (function () {
    function VisidetailPage(navCtrl, viewCtrl, navParams, alertCtrl, httpService) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.httpService = httpService;
        this.iii = false;
        this.roles = [];
        //已审批状态
        this.haveapprove = false;
        //退回原因
        this.canselreason = false;
        this.id = navParams.get("item");
        var 
        // roles=sessionStorage.getItem("roles");
        roles = [{ "roleid": "aaa" }, { "roleid": "outsourceTA" }];
        for (var i = 0; i < roles.length; i++) {
            if (roles[i].roleid == "outsourceTA") {
                this.iii = true;
                console.log(this.iii);
            }
        }
        //this.status_index = navParams.get("index");
        this.status_index = 4;
        console.log("您点击的是第" + this.status_index + "项");
        if (this.status_index == 1) {
            this.haveapprove = false;
        }
        else if (this.status_index == 2) {
            this.haveapprove = false;
        }
        else if (this.status_index == 3) {
            this.haveapprove = true;
        }
        else if (this.status_index == 4 && this.iii == true) {
            this.canselreason = true;
        }
    }
    VisidetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VisidetailPage');
    };
    VisidetailPage.prototype.cansel = function () {
        var _this = this;
        console.log("你点击了取消");
        var confirm = this.alertCtrl.create({
            title: '提示',
            message: '是否取消该走访计划?',
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                        console.log('您点击了取消');
                    }
                },
                {
                    text: '是',
                    handler: function () {
                        console.log('您点击了是');
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__visitlist_visitlist__["a" /* VisitlistPage */], { animate: true });
                    }
                }
            ]
        });
        confirm.present();
    };
    VisidetailPage.prototype.presentPrompt = function (msg) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '请打分',
            subTitle: msg,
            buttons: [
                {
                    text: '1分',
                    handler: function () { _this.score = '1'; console.log(_this.score); }
                },
                {
                    text: '2分',
                    handler: function () { _this.score = '2'; }
                },
                {
                    text: '3分',
                    handler: function () { _this.score = '3'; }
                },
                {
                    text: '4分',
                    handler: function () { _this.score = '4'; }
                },
                {
                    text: '5分',
                    handler: function () { _this.score = '5'; }
                }
            ]
        });
        alert.present();
    };
    VisidetailPage.prototype.updateSource = function () {
        var url = __WEBPACK_IMPORTED_MODULE_4__providers_Constants__["a" /* Contents */].HTTP_LOCAL_ORIGIN;
        // this.presentPrompt('请打分');
        var data = {
            "appId": "mcrm",
            "reqParam": {
                "userId": sessionStorage.getItem("userId"),
                "interviewId": this.id,
                "score": this.score
            }
            // "serviceId":Contents.UPDATE_INTERVIEW_SCORE
        };
        this.httpService.getData({
            url: url,
            body: data
        }).then(function (res) {
            console.log(res);
            console.log(res.info);
        });
    };
    VisidetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-visidetail',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\visidetail\visidetail.html"*/'<!--\n  Generated template for the VisidetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>未完成走访计划详情</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-list>\n    <ion-item>\n      <ion-label class="common_font" style="padding-left:14px;max-width:30%;width: 30%;">走访类型</ion-label>\n      <ion-select class="common_font" style="max-width:70%; width: 70%;padding: 11px 8px 11px 6px;"  interface="popover" placeholder="请选择" value="审批中" readonly>\n        <ion-option value="新增">新增</ion-option>\n        <ion-option value="审批中">审批中</ion-option>\n        <ion-option value="已审批">已审批</ion-option>\n        <ion-option value="已退回">已退回</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label class="common_font" style="padding-left:14px;max-width:30%;width: 30%;">客户名称</ion-label>\n      <ion-label class="common_font" style="max-width: 70%;"  type="text">希维尔</ion-label>\n    </ion-item>\n\n    <ion-item>\n      <ion-label class="common_font" style="padding-left:14px;max-width:30%;width: 30%;">走访进度</ion-label>\n      <ion-label class="common_font" style="max-width: 70%;"  type="text">审批中</ion-label>\n    </ion-item>\n\n    <ion-item>\n      <ion-label class="common_font" style="padding-left:14px;max-width:30%;width: 30%;">客户地址</ion-label>\n      <ion-label class="common_font" style="max-width: 70%;"  type="text">重庆沙坪坝</ion-label>\n    </ion-item>\n\n    <ion-item>\n      <ion-label class="common_font" style="padding-left:14px;max-width:30%;width: 30%;">计划走访时间</ion-label>\n      <ion-label class="common_font" style="max-width: 70%;"  type="text">2018-3-23 09:30</ion-label>\n    </ion-item>\n\n    <ion-item>\n      <ion-label class="common_font" style="padding-left:14px;max-width:30%;width: 30%;">实际走访时间</ion-label>\n      <ion-label class="common_font" style="max-width: 70%;"  type="text">2018-3-23 09:30</ion-label>\n    </ion-item>\n\n    <ion-item>\n      <ion-label class="common_font" style="padding-left:14px;max-width:30%;width: 30%;">行内人员</ion-label>\n      <ion-label class="common_font" style="max-width: 70%;"  type="text">佐助，小樱，鸣人</ion-label>\n    </ion-item>\n\n    <ion-item>\n      <ion-label class="common_font" style="padding-left:14px;max-width:30%;width: 30%;">拜访客户</ion-label>\n      <ion-label class="common_font" style="max-width: 70%;"  type="text">卡卡西</ion-label>\n    </ion-item>\n\n    <ion-item  *ngIf="haveapprove">\n      <ion-label class="common_font" style="padding-left:14px;max-width:30%;width: 30%;">审批信息</ion-label>\n      <ion-label class="common_font" style="max-width: 70%;"  type="text">通过</ion-label>\n    </ion-item>\n\n    <ion-item  *ngIf="haveapprove">\n      <ion-label class="common_font" style="padding-left:14px;max-width:30%;width: 30%;">分数</ion-label>\n      <ion-label class="common_font" style="max-width: 70%;"  type="text">100</ion-label>\n    </ion-item>\n\n    <ion-item  *ngIf="canselreason">\n      <ion-label class="common_font" style="padding-left:14px;max-width:30%;width: 30%;">退回原因</ion-label>\n      <ion-label class="common_font" style="max-width: 70%;"  type="text">路程太远</ion-label>\n    </ion-item>\n\n    <ion-item>\n      <ion-label class="common_font" style="padding-left:14px;max-width:30%;width: 30%;">客户名片</ion-label>\n    </ion-item>\n    <div class="common_font" style="height: 5rem;background: red;margin:30px;color:#ffffff;line-height: 5rem;text-align: center">图片区域</div>\n\n    <ion-item>\n      <ion-label class="common_font" style="padding-left:14px;max-width:30%;width: 30%;">拜访图片</ion-label>\n    </ion-item>\n    <div class="common_font" style="height: 5rem;background: red;margin:30px;color:#ffffff;line-height: 5rem;text-align: center">图片区域</div>\n\n  </ion-list>\n  <ion-item  *ngIf="canselreason">\n  <div class="login_button" (click)="presentPrompt(msg)">\n    打分\n  </div>\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\visidetail\visidetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
    ], VisidetailPage);
    return VisidetailPage;
}());

//# sourceMappingURL=visidetail.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkBench; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__workbenchService__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__formalcust_formalcust__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__potentialcust_potentialcust__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__myapprove_myapprove__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__bulletin_bulletin__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__searchlist_searchlist__ = __webpack_require__(236);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var WorkBench = (function () {
    function WorkBench(navCtrl, service) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.menus = [];
    }
    WorkBench.prototype.goTakepic = function (PageId) {
        if (PageId == "FormalcustPage") {
            this.Pageid = __WEBPACK_IMPORTED_MODULE_3__formalcust_formalcust__["a" /* FormalcustPage */];
        }
        if (PageId == "PotentialcustPage") {
            this.Pageid = __WEBPACK_IMPORTED_MODULE_4__potentialcust_potentialcust__["a" /* PotentialcustPage */];
        }
        if (PageId == "TargetplanPage") {
        }
        if (PageId == "TakepicPage") {
        }
        if (PageId == "Other") {
        }
        if (PageId == "MarketreportPage") {
        }
        if (PageId == "MyapprovePage") {
            this.Pageid = __WEBPACK_IMPORTED_MODULE_5__myapprove_myapprove__["a" /* MyapprovePage */];
        }
        if (PageId == "BulletinPage") {
            this.Pageid = __WEBPACK_IMPORTED_MODULE_6__bulletin_bulletin__["a" /* BulletinPage */];
        }
        if (PageId == "StatisticsPage") {
        }
        if (PageId == "MeetinginfoPage") {
        }
        this.navCtrl.push(this.Pageid);
    };
    WorkBench.prototype.ionViewDidLoad = function () {
        var _this = this;
        var param = {
            "num": 1,
            "parent_id": "0"
        };
        this.service.getMenu(param).then(function (res) {
            if (res.status) {
                _this.menus = res.data;
                console.log(res.data);
            }
        });
    };
    WorkBench.prototype.serachTool = function () {
        console.log("kk");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__searchlist_searchlist__["a" /* SearchlistPage */], {}, { animate: true });
    };
    WorkBench = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-workbench',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\workbench\workbench.html"*/'<ion-header class="header">\n\n  <ion-navbar>\n  <ion-title>工作台</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="work-bench-body">\n\n  <!--<ng-container *ngFor="let menu of menus">\n\n    <ion-card class="work-bench-item" *ngIf="menu.parentId==0">\n      <ion-card-header class="work-bench-header">\n        {{menu.name}}\n      </ion-card-header>\n      <ion-card-content class="icon-list">\n        <ion-row>\n          <ion-col *ngFor="let subMenu of menus" [hidden]="subMenu.parentId!=menu.code" col-3>\n            <a (click)="goTakepic(subMenu.PageId)" class="work-bench-list" href="javascript:void(0)" [name]="subMenu.icon">\n              <ion-icon class="work-bench-icon" [name]="subMenu.icon"></ion-icon>\n              <br/>\n            </a>\n            <span class="work-bench-test">{{subMenu.name}}</span>\n          </ion-col>\n        </ion-row>\n      </ion-card-content>\n    </ion-card>\n  </ng-container>-->\n  \n  <!--****************工具开始************************-->\n		<div class="tool_top">\n      	<img src="../../assets/imgs/tool/tool_title.png\" alt="" />\n		</div>\n\n    <div class="tool">\n    	<div class="tool_item" (click)="serachTool()">\n    		<div class="tool_cont">\n	    			<ion-icon name="search" class="tool_search"></ion-icon>\n	    		查询\n	      </div>\n    	</div>\n    	<div class="tool_item">\n    		<div class="tool_cont">\n	    			<ion-icon name="search" class="tool_search"></ion-icon>\n	    		查询\n	      </div>\n    	</div>\n    	<div class="tool_item">\n    		<div class="tool_cont">\n	    			<ion-icon name="search" class="tool_search"></ion-icon>\n	    		查询\n	      </div>\n    	</div>\n    	<div class="tool_item">\n    		<div class="tool_cont">\n	    			<ion-icon name="search" class="tool_search"></ion-icon>\n	    		查询\n	      </div>\n    	</div>\n    </div>\n    \n\n		\n		\n  <!--****************工具结束************************-->\n\n  <!--<ion-card class="work-bench-item">-->\n    <!--<ion-card-header class="work-bench-header">-->\n      <!--Header-->\n    <!--</ion-card-header>-->\n    <!--<ion-card-content>-->\n      <!--<ion-row>-->\n        <!--<ion-col col-3>-->\n          <!--<a class="work-bench-list" href="javascript:void(0)">-->\n            <!--<ion-icon class="work-bench-icon" name="ios-tennisball"></ion-icon>-->\n            <!--<br/>-->\n            <!--<span class="work-bench-test">标准化动作</span>-->\n          <!--</a>-->\n        <!--</ion-col>-->\n        <!--<ion-col col-3>-->\n          <!--<a class="work-bench-list" href="javascript:void(0)">-->\n            <!--<ion-icon class="work-bench-icon" name="ios-tennisball"></ion-icon>-->\n            <!--<br/>-->\n            <!--<span class="work-bench-test">标准化动作</span>-->\n          <!--</a>-->\n        <!--</ion-col>-->\n        <!--<ion-col col-3>-->\n          <!--<a class="work-bench-list" href="javascript:void(0)">-->\n            <!--<ion-icon class="work-bench-icon" name="ios-tennisball"></ion-icon>-->\n            <!--<br/>-->\n            <!--<span class="work-bench-test">标准化动作</span>-->\n          <!--</a>-->\n        <!--</ion-col>-->\n        <!--<ion-col col-3>-->\n          <!--<a class="work-bench-list" href="javascript:void(0)">-->\n            <!--<ion-icon class="work-bench-icon" name="ios-tennisball"></ion-icon>-->\n            <!--<br/>-->\n            <!--<span class="work-bench-test">标准化动作</span>-->\n          <!--</a>-->\n        <!--</ion-col>-->\n      <!--</ion-row>-->\n    <!--</ion-card-content>-->\n  <!--</ion-card>-->\n  <!--<ion-card class="work-bench-item">-->\n    <!--<ion-card-header class="work-bench-header">-->\n      <!--Header-->\n    <!--</ion-card-header>-->\n    <!--<ion-card-content>-->\n      <!--<ion-row>-->\n        <!--<ion-col col-3>-->\n          <!--<a class="work-bench-list" href="javascript:void(0)">-->\n            <!--<ion-icon class="work-bench-icon" name="ios-tennisball"></ion-icon>-->\n            <!--<br/>-->\n            <!--<span class="work-bench-test">标准化动作</span>-->\n          <!--</a>-->\n        <!--</ion-col>-->\n\n      <!--</ion-row>-->\n    <!--</ion-card-content>-->\n  <!--</ion-card>-->\n  <!--<ion-card class="work-bench-item">-->\n    <!--<ion-card-header class="work-bench-header">-->\n      <!--Header-->\n    <!--</ion-card-header>-->\n    <!--<ion-card-content>-->\n      <!--<ion-row>-->\n        <!--<ion-col col-3>-->\n          <!--<a class="work-bench-list" href="javascript:void(0)">-->\n            <!--<ion-icon class="work-bench-icon" name="ios-tennisball"></ion-icon>-->\n            <!--<br/>-->\n            <!--<span class="work-bench-test">标准化动作</span>-->\n          <!--</a>-->\n        <!--</ion-col>-->\n\n      <!--</ion-row>-->\n    <!--</ion-card-content>-->\n  <!--</ion-card>-->\n  <!--<ion-card class="work-bench-item">-->\n    <!--<ion-card-header class="work-bench-header">-->\n      <!--Header-->\n    <!--</ion-card-header>-->\n    <!--<ion-card-content>-->\n      <!--<ion-row>-->\n        <!--<ion-col col-3>-->\n          <!--<a class="work-bench-list" href="javascript:void(0)">-->\n            <!--<ion-icon class="work-bench-icon" name="ios-tennisball"></ion-icon>-->\n            <!--<br/>-->\n            <!--<span class="work-bench-test">标准化动作</span>-->\n          <!--</a>-->\n        <!--</ion-col>-->\n\n      <!--</ion-row>-->\n    <!--</ion-card-content>-->\n  <!--</ion-card>-->\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\workbench\workbench.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__workbenchService__["a" /* WorkbenchService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__workbenchService__["a" /* WorkbenchService */]])
    ], WorkBench);
    return WorkBench;
}());

//# sourceMappingURL=workbench.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormalcustPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__formalparticulars_formalparticulars__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Constants__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the FormalcustPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FormalcustPage = (function () {
    function FormalcustPage(navCtrl, navParams, httpServer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpServer = httpServer;
        //结果集
        this.resultDataList = [];
        this.pageIndex = 0;
        this.btnisactive = false;
    }
    FormalcustPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FormalcustPage');
        this.getFomalCustList(this.pageIndex);
    };
    FormalcustPage.prototype.CallPhone = function () {
        //alert(phone);
        window.open('tel:11111');
    };
    FormalcustPage.prototype.gopartiulars = function (arg) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__formalparticulars_formalparticulars__["a" /* FormalparticularsPage */], {
            custId: arg
        });
    };
    /**
     * 请求正式客户列表
     */
    FormalcustPage.prototype.getFomalCustList = function (pageIndex) {
        var _this = this;
        this.httpServer.postData({
            url: __WEBPACK_IMPORTED_MODULE_4__providers_Constants__["a" /* Contents */].HTTP_LOCAL_ORIGIN,
            body: {
                "appId": "mcrm",
                "reqParam": {
                    "custName": "",
                    "custId": "",
                    "idenNo": "",
                    "page": {
                        "pageSize": 10,
                        "pageIndex": pageIndex
                    }
                },
                "serviceId": __WEBPACK_IMPORTED_MODULE_4__providers_Constants__["a" /* Contents */].QUERY_FORMAL_CUST_LIST
            }
        }).then(function (res) {
            var datalist = JSON.parse(res.resultRes).data;
            for (var i = 0; i < datalist.length; i++) {
                _this.resultDataList.push(datalist[i]);
            }
            console.log(_this.resultDataList);
            _this.totalNum = JSON.parse(res.resultRes).count;
        }).catch(function (err) {
            console.log(err);
        });
    };
    FormalcustPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.pageIndex++;
        setTimeout(function () {
            _this.getFomalCustList(_this.pageIndex);
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
        console.log(this.pageIndex);
    };
    FormalcustPage.prototype.menuActive = function (e) {
        console.log(e);
        // this.btnisactive = this.btnisactive == false ? true: false
    };
    FormalcustPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-formalcust',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\formalcust\formalcust.html"*/'<!--\n  Generated template for the FormalcustPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header">\n  <ion-navbar #Menu>\n    <div class="bar both-clear bar-header item-input-inset">\n      <label class="item-input-wrapper">\n        <input class="input" type="search" placeholder="请输入名字">\n      </label>\n      <span class="left">\n        <ion-icon class="block" name="ios-funnel-outline" md="ios-funnel-outline" menuToggle></ion-icon>\n      </span>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <p class="result">搜索到( {{totalNum}} )条记录</p>\n  <ion-list  style="margin-top: 5px">\n    <ion-item *ngFor="let dataList of resultDataList" class="item-list" (click)="gopartiulars(dataList.custId)">\n        <div>\n          <span class="name">{{dataList.custName}}</span><span class="old">({{dataList.age}}岁)</span>\n\n          <span *ngIf="dataList.sex==\'M\'" class="gender"><ion-icon ios="md-male" md="md-male"></ion-icon></span>\n          <span *ngIf="dataList.sex==\'F\'" style="color: pink" class="gender"><ion-icon ios="ios-female-outline" md="ios-transgender"></ion-icon></span>\n           <span class="classes">{{dataList.custLvl}}</span>\n        </div>\n        <div>\n          <span class="custrid">客户号:</span><span class="code">{{dataList.custId}}</span></div>\n        <div>\n          <span class="manage-person">管户人：<span class="code">{{dataList.manageName}}</span>\n          </span>\n        </div>\n        <div>\n          <span class="manage-person">营销人：<span class="code">无</span>\n          </span>\n        </div>\n      <ion-icon ios="ios-call" (click)="CallPhone(dataList.mobileNo)" md="md-call" class="phone"></ion-icon>\n    </ion-item>\n\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n\n<!--侧滑栏-->\n<ion-menu class="menu-cont" [content]="Menu" type="overlay" side="right">\n  <ion-header>\n    <ion-toolbar class="menu-bgc menu">\n\n      <ion-title>\n        <ion-icon class="menu-back" name="ios-arrow-back" menuToggle></ion-icon>\n        高级筛选\n      </ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content padding>\n    <div class="menu-row row">\n      <span col-3>姓名</span>\n      <input col-8 type="text" value="请输入姓名">\n    </div>\n    <div class="menu-row row">\n      <span col-3>证件号</span>\n      <input col-8 type="text" value="请输入证件号">\n    </div>\n    <div class="menu-row row">\n      <span col-3>客户号</span>\n      <input col-8 type="text" value="请输入客户号">\n    </div>\n    <div class="row menu-btn-item">\n      <span (click)="menuActive($event)"  col-6 class="menu-btn">重置</span>\n      <span (click)="menuActive($event)" menuToggle col-6 class="menu-btn menu-btn-active">确定</span>\n    </div>\n  </ion-content>\n</ion-menu>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\formalcust\formalcust.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
    ], FormalcustPage);
    return FormalcustPage;
}());

//# sourceMappingURL=formalcust.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormalparticularsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enjoycard_enjoycard__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_Constants__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the FormalparticularsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FormalparticularsPage = (function () {
    function FormalparticularsPage(navCtrl, navParams, httpServer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpServer = httpServer;
        this.userMsgs = [];
        this.bankMsgs = [];
        //结果集
        this.userData = [];
        this.custId = this.navParams.get("custId");
    }
    FormalparticularsPage.prototype.ionViewWillEnter = function () {
    };
    FormalparticularsPage.prototype.ionViewDidLoad = function () {
        this.getFomalCustDetail();
        //   this.userMsgs = [{
        //     name	:"乔布斯",
        //     old:35,
        //     gender:"女",
        //     firm:"重庆市公安局江北区分局特警支队",
        //     job:"一般员工",
        //     credetype:"居民身份证",
        //     credenum:"13012********999",
        //     calendar:"1982-05-09",
        //     lunarcalendar:"一九八二壬戌年四月十六日"
        //   }
        //   ]
        //
        //   this.bankMsgs = [
        //     {msg:"客户号",content:"1000627959"},
        //     {msg:"考核属性",content:""},
        //     {msg:"归属网点",content:"重庆团队(C037)"},
        //     {msg:"归属机构",content:"台州分行直销(V8800)"},
        //     {msg:"建立日期",content:"2016-04-27"},
        //     {msg:"管户经理",content:"黄一明(152268)"},
        //     {msg:"客户等级",content:"普通客户5"},
        //     {msg:"客户分层",content:"零余额客户"},
        //     {msg:"私银等级",content:"否"},
        //     {msg:"私银分层",content:""},
        //     {msg:"信贷经理",content:"黄均易(164637)"},
        //     {msg:"私银经理",content:""},
        //     {msg:"营销人",content:"黄一明(152268)"},
        //     {msg:"行内员工",content:"否"},
        //     {msg:"重点客户",content:"否"},
        //   ]
        //
    };
    FormalparticularsPage.prototype.CallPhone = function () {
        //alert(phone);
        window.open('tel:11111');
    };
    FormalparticularsPage.prototype.goEnjoycard = function (args) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__enjoycard_enjoycard__["a" /* EnjoycardPage */], {
            title: args
        }, {
            animate: true
        });
    };
    /**
     * 请求根据客户id获取客户详情
     */
    FormalparticularsPage.prototype.getFomalCustDetail = function () {
        var _this = this;
        this.httpServer.postData({
            url: __WEBPACK_IMPORTED_MODULE_3__providers_Constants__["a" /* Contents */].HTTP_LOCAL_ORIGIN,
            body: {
                "appId": "mcrm",
                "reqParam": {
                    "pkId": "1001766752"
                },
                "serviceId": __WEBPACK_IMPORTED_MODULE_3__providers_Constants__["a" /* Contents */].QUERY_FORMAL_CUST_BASEINFO
            }
        }).then(function (res) {
            _this.userData = [];
            _this.userData.push(JSON.parse(res.resultRes).data);
            console.log(_this.userData);
        });
    };
    FormalparticularsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-formalparticulars',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\formalparticulars\formalparticulars.html"*/'<!--\n  Generated template for the FormalparticularsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header align-title="center" class="both-clear">\n\n  <ion-navbar>\n    <ion-title class="cust-name">客户详情</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content *ngFor="let custmsg of userData " class="body">\n  <div class="message-list">\n    <ion-row >\n      <div class="row" col-12>\n        <span class="name">{{custmsg.custName}}</span>\n        <span class="old">{{\'(\'+custmsg.age+\')\'}}</span>\n        <ion-icon *ngIf="custmsg.sex==\'M\'" class="gender genderman" ios="md-male" md="md-male"></ion-icon>\n        <ion-icon *ngIf="custmsg.sex==\'F\'" class="gender gendergirl" ios="ios-female-outline" md="ios-transgender"></ion-icon>\n      </div>\n    </ion-row>\n    <ion-row>\n      <div class="row " col-12>\n        <span class="title-txt">单位名称：&nbsp;&nbsp;</span>\n        <span class="content-txt">{{custmsg.companyName}}</span>\n      </div>\n    </ion-row>\n\n    <ion-row>\n      <div class="row" col-6>\n        <span class="title-txt">职务：&nbsp;&nbsp;</span>\n        <span class="content-txt">{{custmsg.dutyCd}}</span>\n      </div>\n\n      <div class="row" col-6>\n        <span class="title-txt">证件类型：&nbsp;&nbsp;</span>\n        <span class="content-txt">{{custmsg.idenType}}</span>\n      </div>\n\n    </ion-row>\n\n    <ion-row>\n      <div class="row" col-12>\n        <span class="title-txt">身份证掩码：&nbsp;&nbsp;</span>\n        <span class="content-txt">{{custmsg.idenNo}}</span>\n      </div>\n    </ion-row>\n\n    <ion-row>\n    <div class="row" col-12>\n      <span class="title-txt">CRM公历生日：&nbsp;&nbsp;</span>\n      <span class="content-txt">{{custmsg.birthDt}}</span>\n    </div>\n    </ion-row>\n    <ion-row>\n    <div class="row" col-12>\n      <span class="title-txt">CRM农历生日：&nbsp;&nbsp;</span>\n      <span class="content-txt">{{custmsg.birthDtNl}}</span>\n    </div>\n    </ion-row>\n  </div>\n\n  <div class="both-clear personal-masg">\n    行内信息\n  </div>\n\n  <div class="bank-msg">\n    <div class="row msg-row">\n      <span class="msg" col-4>客户号</span>\n      <span class="ctn" col-8>{{custmsg.custId}}</span>\n    </div>\n    <div class="row msg-row">\n      <span class="msg" col-4>考核属性</span>\n      <span class="ctn" col-8>{{custmsg.assAttr}}</span>\n    </div>\n    <div class="row msg-row">\n      <span class="msg" col-4>归属网点</span>\n      <span class="ctn" col-8>{{custmsg.belongLvl4Org}}</span>\n    </div>\n    <div class="row msg-row">\n      <span class="msg" col-4>归属机构</span>\n      <span class="ctn" col-8>{{custmsg.belongOrg}}</span>\n    </div>\n    <div class="row msg-row">\n      <span class="msg" col-4>建立日期</span>\n      <span class="ctn" col-8>{{custmsg.openDate}}</span>\n    </div>\n    <div class="row msg-row">\n      <span class="msg" col-4>管户经理</span>\n      <span class="ctn" col-8>{{custmsg.manageName}}</span>\n    </div>\n\n    <div class="row msg-row">\n      <span class="msg" col-4>客户等级</span>\n      <span class="ctn" col-8>{{custmsg.indivLvl}}</span>\n    </div>\n    <div class="row msg-row">\n      <span class="msg" col-4>客户分层</span>\n      <span class="ctn" col-8>{{custmsg.custLevCode}}</span>\n    </div>\n    <div class="row msg-row">\n      <span class="msg" col-4>私银等级</span>\n      <span class="ctn" col-8>{{custmsg.indivFlag}}</span>\n    </div>\n    <div class="row msg-row">\n      <span class="msg" col-4>私银分层</span>\n      <span class="ctn" col-8>{{custmsg.indivLvl}}</span>\n    </div>\n    <div class="row msg-row">\n      <span class="msg" col-4>是否有私银卡</span>\n      <span class="ctn" col-8>{{custmsg.indivCard==\'0\'?\'是\':\'否\'}}</span>\n    </div>\n\n    <div class="row msg-row">\n      <span class="msg" col-4>信贷经理</span>\n      <span class="ctn" col-8>{{custmsg.crdManagerName}}</span>\n    </div>\n    <div class="row msg-row">\n      <span class="msg" col-4>私银经理</span>\n      <span class="ctn" col-8>{{custmsg.indivManagerName}}</span>\n    </div>\n    <div class="row msg-row">\n      <span class="msg" col-4>营销人</span>\n      <span class="ctn" col-8>{{custmsg.campEmpName}}</span>\n    </div>\n    <div class="row msg-row">\n      <span class="msg" col-4>是否是行内员工</span>\n      <span class="ctn" col-8>{{custmsg.empFlag}}</span>\n    </div>\n    <div class="row msg-row">\n      <span class="msg" col-4>是否是重点客户</span>\n      <span class="ctn" col-8>{{custmsg.vipFlag==\'N\'?\'否\':\'是\'}}</span>\n    </div>\n  </div>\n\n  <div class="footer">\n    <div (click)="goCusremarks(\'备注\')" col-4 class="foot-btn">\n      <div class="footer-img" >\n        <div class="footer-img1 footer-imgall"></div>\n      </div>\n      <span  class="btn">备注</span>\n    </div>\n    <div (click)="goCusmarke(\'预约\')" col-4 class="foot-btn">\n      <div class="footer-img">\n        <div class="footer-img2 footer-imgall"></div>\n      </div>\n      <span  class="btn">预约</span>\n    </div>\n    <div (click)="goEnjoycard(\'尊享卡申请\')" col-4 class="foot-btn">\n      <div class="footer-img">\n        <div class="footer-img3 footer-imgall"></div>\n      </div>\n      <span class="btn">尊享卡申请</span>\n    </div>\n    <div (click)="goEnjoycard(\'私银卡申请\')" col-4 class="foot-btn">\n      <div class="footer-img">\n        <div class="footer-img4 footer-imgall"></div>\n      </div>\n      <span class="btn">私银卡申请</span>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\formalparticulars\formalparticulars.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */]])
    ], FormalparticularsPage);
    return FormalparticularsPage;
}());

//# sourceMappingURL=formalparticulars.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnjoycardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__examinerecord_examinerecord__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the EnjoycardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EnjoycardPage = (function () {
    function EnjoycardPage(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.birthday = "";
        this.phoneNum = "";
        this.cardNum = "";
        this.companyName = "";
        this.contactlocation = "";
        this.headerText = this.navParams.get("title");
    }
    EnjoycardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EnjoycardPage');
    };
    EnjoycardPage.prototype.hintHandle = function (title) {
        var _this = this;
        if (title) {
            if (title == this.headerText) {
                title = title.substr(0, 3);
            }
            var hint = this.alertCtrl.create({
                message: title + "不能为空",
                buttons: [
                    {
                        text: '确定',
                        handler: function (data) {
                            console.log('确定');
                        }
                    }
                ]
            });
            hint.present();
        }
        if (title == "") {
            var uptrue = this.alertCtrl.create({
                message: "提交成功",
                buttons: [
                    {
                        text: '确定',
                        handler: function (data) {
                            _this.navCtrl.pop();
                        }
                    }
                ]
            });
            uptrue.present();
        }
    };
    EnjoycardPage.prototype.Updata = function () {
        console.log(this.contactlocation + "---" + this.cardNum + "---" + this.phoneNum + "---" + this.birthday + "---" + this.companyName);
        var phoneNum = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (this.cardNum.trim() == "") {
            this.hintHandle(this.headerText);
            return false;
        }
        if (!phoneNum.test(this.phoneNum.trim())) {
            var uptrue = this.alertCtrl.create({
                message: "请填写正确的手机号码",
                buttons: [
                    {
                        text: '确定',
                        handler: function (data) {
                            console.log('确定');
                        }
                    }
                ]
            });
            uptrue.present();
            return false;
        }
        if (this.birthday.trim() == "") {
            this.hintHandle("生日");
            return false;
        }
        if (this.companyName.trim() == "") {
            this.hintHandle("单位名");
            return false;
        }
        if (this.contactlocation.trim() == "") {
            this.hintHandle("联系地址");
            return false;
        }
        else {
            this.hintHandle("");
        }
    };
    EnjoycardPage.prototype.goExamineRecord = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__examinerecord_examinerecord__["a" /* ExaminerecordPage */]);
    };
    EnjoycardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-enjoycard',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\enjoycard\enjoycard.html"*/'<!--\n  Generated template for the EnjoycardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{headerText}}</ion-title>\n    <span class="updata" (click)="Updata()">提交</span>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background-color: #f5f5f5 !important; position:relative;" padding>\n  <ion-item>\n    <ion-label class="text-right" fixed>{{headerText=="尊享卡申请"? "尊享卡号":"私银卡号"}}</ion-label>\n    <ion-input [(ngModel)]="cardNum" type="tel" value="" placeholder="任务主题"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label class="text-right" fixed>手机号</ion-label>\n    <ion-input [(ngModel)]="phoneNum" type="tel" value="" placeholder="请输入您的手机号"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label class="text-right" fixed>生日</ion-label>\n    <div item-content class="item_width">\n      <div class="left">\n        <ion-datetime [(ngModel)]="birthday" displayFormat="YYYY-MM-DD" placeholder="您的生日" cancelText="取消" doneText="完成" value="12413" ></ion-datetime>\n      </div>\n      <span class="img imgall"></span>\n    </div>\n  </ion-item>\n  <ion-item>\n    <ion-label class="text-right" fixed>单位名称</ion-label>\n    <ion-input [(ngModel)]="companyName" type="text" value="" placeholder="单位名称"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label class="text-right" fixed>联系地址</ion-label>\n    <ion-input [(ngModel)]="contactlocation" type="text" value="" placeholder="请输入您地地址"></ion-input>\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\enjoycard\enjoycard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], EnjoycardPage);
    return EnjoycardPage;
}());

//# sourceMappingURL=enjoycard.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PotentialcustPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__potentialcustdetails_potentialcustdetails__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Constants__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__potentialcustedit_potentialcustedit__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the PotentialcustPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PotentialcustPage = (function () {
    function PotentialcustPage(navCtrl, navParams, httpServer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpServer = httpServer;
        this.custinfo = [];
    }
    PotentialcustPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PotentialcustPage');
        this.getpotentialcustinfo();
    };
    PotentialcustPage.prototype.CallPhone = function (num, e) {
        //alert(phone);
        e.preventDefault();
        window.open('tel:' + num);
    };
    PotentialcustPage.prototype.getpotentialcustinfo = function () {
        var _this = this;
        this.custinfo = [];
        // const url = "custList/potentialcustList.json"
        this.httpServer.postData({
            url: __WEBPACK_IMPORTED_MODULE_4__providers_Constants__["a" /* Contents */].HTTP_LOCAL_ORIGIN,
            body: {
                "appId": "mcrm",
                "reqParam": {
                    // "custName":"",
                    // "custId":"",
                    // "idenNo":"",
                    "page": {
                        "pageSize": 10,
                        "pageIndex": 1
                    }
                },
                "serviceId": "cust.mobile.potenCust.queryMyPotenCust"
            }
        })
            .then(function (res) {
            var infoList = JSON.parse(res.resultRes).data;
            console.log(infoList);
            for (var i in infoList) {
                _this.custinfo.push(infoList[i]);
            }
        });
    };
    PotentialcustPage.prototype.goDetailPage = function (iteminfo) {
        // this.navCtrl.push(PotentialcustdetailsPage)
        console.log("列表点击事件");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__potentialcustdetails_potentialcustdetails__["a" /* PotentialcustdetailsPage */], {
            detail: iteminfo
        }, {
            animate: true
        });
    };
    PotentialcustPage.prototype.goaddPage = function (arg) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__potentialcustedit_potentialcustedit__["a" /* PotentialcusteditPage */], {
            isEdit: arg
        });
    };
    PotentialcustPage.prototype.goTakepicPage = function () {
    };
    PotentialcustPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-potentialcust',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\potentialcust\potentialcust.html"*/'<!--\n  Generated template for the PotentialcustPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <!--<label class="item item-input item-select">-->\n      <!--<ion-row>-->\n        <!--<select class="select">-->\n          <!--<option>姓名</option>-->\n          <!--<option selected>工号</option>-->\n          <!--<option>单位</option>-->\n        <!--</select><input type="text" col-8 class="input">-->\n        <!--<span class="active-search">搜索</span>-->\n      <!--</ion-row>-->\n    <!--</label>-->\n    <ion-navbar #Menu style="padding:0px;">\n      <div class="bar both-clear bar-header item-input-inset">\n        <label class="item-input-wrapper">\n          <input class="input" type="search" placeholder="请输入名字">\n        </label>\n        <span>\n        <ion-icon class="block" name="ios-funnel-outline" md="ios-funnel-outline" menuToggle></ion-icon>\n      </span>\n      </div>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n    <div>\n      <ion-item *ngFor="let infoList of custinfo" (click)="goDetailPage(infoList.custId)" class="item-list">\n        <div>\n          <span class="name">{{infoList.custName?\'张三\':infoList.custName}}</span>\n          <span class="old">{{\'(\'+infoList.age?infoList.age:\'5\'+\'岁)\'}}</span>\n          <span *ngIf="infoList.sex==\'M\'" class="genderman"><ion-icon ios="md-male" md="md-male"></ion-icon></span>\n          <span *ngIf="infoList.sex==\'F\'" class="gendergirl"><ion-icon ios="ios-female-outline" md="ios-transgender"></ion-icon></span>\n\n        </div>\n        <div>\n        <span class="custrid">单位\n          <span class="code">{{infoList.companyName}}</span>\n        </span>\n        </div>\n        <div>\n          <span class="manage-person">职务\n            <span class="code">{{infoList.dutyCd}}</span>\n          </span>\n        </div>\n        <ion-icon ios="md-call" (click)="CallPhone(infoList.mobileNo,$event)" md="md-call" class="phone"></ion-icon>\n      </ion-item>\n    </div>\n  </ion-list>\n\n  <ion-fab bottom right class="icon-item">\n    <button class="select-btn" ion-fab mini><ion-icon name="add"></ion-icon></button>\n    <ion-fab-list side="top">\n      <button class="options-btn" (click)="goaddPage(0)" ion-fab>新增</button>\n      <button class="options-btn" (click)="goTakepicPage()"  ion-fab>新增多个</button>\n    </ion-fab-list>\n  </ion-fab>\n\n</ion-content>\n<ion-menu class="menu-cont" [content]="Menu" type="overlay" side="right">\n  <ion-header>\n    <ion-toolbar class="menu-bgc menu">\n\n      <ion-title>\n        <ion-icon class="menu-back" name="ios-arrow-back" menuToggle></ion-icon>\n        高级筛选\n      </ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content padding>\n    <div class="menu-row row">\n      <span col-3>姓名</span>\n      <input col-8 type="text" value="请输入姓名">\n    </div>\n    <div class="menu-row row">\n      <span col-3>证件号</span>\n      <input col-8 type="text" value="请输入证件号">\n    </div>\n    <div class="menu-row row">\n      <span col-3>客户号</span>\n      <input col-8 type="text" value="请输入客户号">\n    </div>\n    <div class="row menu-btn-item">\n      <span (click)="menuActive($event)"  col-6 class="menu-btn">重置</span>\n      <span  menuToggle col-6 class="menu-btn menu-btn-active">确定</span>\n    </div>\n  </ion-content>\n</ion-menu>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\potentialcust\potentialcust.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
    ], PotentialcustPage);
    return PotentialcustPage;
}());

//# sourceMappingURL=potentialcust.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PotentialcustdetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__potentialcustedit_potentialcustedit__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_Constants__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the PotentialcustdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PotentialcustdetailsPage = (function () {
    function PotentialcustdetailsPage(navCtrl, navParams, httpServer) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpServer = httpServer;
        this.custDetailList = [];
        this.pkId = '';
        this.dataList = [];
        this.CallbackFunction = function (_params, _params1) {
            return new Promise(function (resolve, reject) {
                _this.dataList = _params;
                resolve();
            });
        };
        this.pkId = this.navParams.get("detail");
    }
    PotentialcustdetailsPage.prototype.ionViewDidLoad = function () {
        this.getpotentData();
    };
    PotentialcustdetailsPage.prototype.getpotentData = function () {
        var _this = this;
        this.httpServer.postData({
            url: __WEBPACK_IMPORTED_MODULE_3__providers_Constants__["a" /* Contents */].HTTP_LOCAL_ORIGIN,
            body: {
                "appId": "mcrm",
                "reqParam": {
                    "pkId": this.pkId
                },
                "serviceId": "cust.mobile.potenCust.queryPotenCustBaseInfo"
            }
        })
            .then(function (res) {
            _this.custDetailList = [];
            _this.custDetailList.push(JSON.parse(res.resultRes).data);
        });
    };
    PotentialcustdetailsPage.prototype.goEditPage = function (arg) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__potentialcustedit_potentialcustedit__["a" /* PotentialcusteditPage */], {
            callback: this.CallbackFunction,
            detail: this.custDetailList,
            isEdit: arg
        });
    };
    PotentialcustdetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-potentialcustdetails',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\potentialcustdetails\potentialcustdetails.html"*/'<!--\n  Generated template for the PotentialcustdetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>客户详情</ion-title>\n\n    <span (click)="goEditPage(1)" class="edit">编辑</span>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <!--<ion-list class="list">-->\n    <!--<ion-item  *ngFor="let list of custDetailList" class="list-item">-->\n    <!--<ion-row>-->\n      <!--<span col-2 class="item-title">{{list.title}}</span>-->\n      <!--<span col-8 class="item-content">{{list.content}}</span>-->\n    <!--</ion-row>-->\n  <!--</ion-item>-->\n  <!--</ion-list>-->\n  <div *ngFor="let item of custDetailList ">\n    <div class="market-list">\n      <span class="market-list-name">名字</span>\n      <span class="market-list-cont">{{item.custName}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">性别</span>\n      <span class="market-list-cont">{{item.sex=="F"?"男":"女"}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">年龄</span>\n      <span class="market-list-cont">{{item.age}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">单位</span>\n      <span class="market-list-cont">{{item.companyName}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">职位</span>\n      <span class="market-list-cont">{{item.dutyCd}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">工号</span>\n      <span class="market-list-cont">{{item.custId}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">电话</span>\n      <span class="market-list-cont">{{item.mobileNo}}</span>\n    </div>\n  </div>\n\n  <!--<div class="footer">-->\n    <!--<ion-row>-->\n      <!--<div col-4>-->\n        <!--<span  class="btn">备注</span>-->\n      <!--</div>-->\n      <!--<div col-4>-->\n        <!--<span  class="btn">预约</span>-->\n      <!--</div>-->\n      <!--<div col-4>-->\n        <!--<span (click)="goEditPage()" class="btn">编辑</span>-->\n      <!--</div>-->\n    <!--</ion-row>-->\n\n  <!--</div>-->\n  <div class="footer">\n    <!--[ngClass]="{\'bgIn\':clockFlag == \'1\',\'bgOut\':clockFlag == \'2\'}"-->\n    <div col-4 class="foot-btn">\n      <div class="footer-img" >\n        <div class="footer-img1 footer-imgall"></div>\n      </div>\n      <span  class="btn">备注</span>\n    </div>\n    <div col-4 class="foot-btn">\n      <div class="footer-img">\n        <div class="footer-img2 footer-imgall"></div>\n      </div>\n      <span  class="btn">预约</span>\n    </div>\n    <div col-4 class="foot-btn">\n      <div class="footer-img">\n        <div class="footer-img3 footer-imgall"></div>\n      </div>\n      <span class="btn">编辑</span>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\potentialcustdetails\potentialcustdetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */]])
    ], PotentialcustdetailsPage);
    return PotentialcustdetailsPage;
}());

//# sourceMappingURL=potentialcustdetails.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyapprovePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__myapprovedetil_myapprovedetil__ = __webpack_require__(231);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MyapprovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyapprovePage = (function () {
    function MyapprovePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.pet = "kittens";
    }
    MyapprovePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyapprovePage');
    };
    MyapprovePage.prototype.gomyapprodetil = function (args) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__myapprovedetil_myapprovedetil__["a" /* MyapprovedetilPage */], {
            title: args
        }, {
            animate: true,
        });
    };
    MyapprovePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-myapprove',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\myapprove\myapprove.html"*/'<!--\n  Generated template for the MyapprovePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>我的审批</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-row class="nav">\n\n    <ion-segment class="clearpadd" col-12 [(ngModel)]="pet">\n      <!--<ion-segment-button value="kittens">\n        尊享卡审批\n      </ion-segment-button>\n      <ion-segment-button value="puppies">\n        私银卡审批\n      </ion-segment-button>-->\n      <ion-segment-button value="kittens" style="text-align:center">\n        尊享卡审批\n      </ion-segment-button>\n    </ion-segment>\n </ion-row>\n  <div [ngSwitch]="pet">\n    <ion-list *ngSwitchCase="\'puppies\'">\n      <ion-item (click)="gomyapprodetil(\'私银卡审批详情\')" class="row item-list">\n        <div col-12 class="name clearpadd mar-t">张三 <span class="cust-type bsFont">普通客户</span></div>\n\n        <div class="clearpadd mar-t" col-12>\n          <div style="display: inline-block" class="clearpadd " col-6>\n            <span class="title btmfont">审批标准</span>\n            <span class="cont">&nbsp;&nbsp;1</span>\n          </div>\n\n          <div style="display: inline-block" class="clearpadd" col-6>\n            <span class="title btmfont">审批状态</span>\n            <span class="cont">&nbsp;&nbsp;未审批</span>\n          </div>\n        </div>\n\n        <div class="clearpadd mar-t" col-12>\n          <div class="clearpadd" style="display: inline-block" col-6>\n            <span class="title btmfont">申报人</span>\n            <span class="cont">&nbsp;&nbsp;田亮</span>\n          </div>\n\n          <div class="clearpadd" style="display: inline-block" col-6>\n            <span class="title btmfont">申报时间</span>\n            <span class="cont">&nbsp;&nbsp;2018-03-01</span>\n          </div>\n        </div>\n      </ion-item>\n    </ion-list>\n\n    <ion-list *ngSwitchCase="\'kittens\'">\n      <ion-item (click)="gomyapprodetil(\'尊享卡审批详情\')" class="row item-list">\n       <div col-12 class="name clearpadd mar-t">张三 <span class="cust-type bsFont">普通客户</span></div>\n\n       <div class="clearpadd mar-t" col-12>\n         <div style="display: inline-block" class="clearpadd " col-6>\n           <span class="title">审批标准</span>\n           <span class="cont">&nbsp;&nbsp;1</span>\n         </div>\n\n         <div style="display: inline-block" class="clearpadd" col-6>\n           <span class="title">审批状态</span>\n           <span class="cont">&nbsp;&nbsp;未审批</span>\n         </div>\n       </div>\n\n       <div class="clearpadd mar-t" col-12>\n          <div class="clearpadd" style="display: inline-block" col-6>\n            <span class="title">申报人</span>\n            <span class="cont">&nbsp;&nbsp;田亮</span>\n          </div>\n\n          <div class="clearpadd" style="display: inline-block" col-6>\n            <span class="title">申报时间</span>\n            <span class="cont">&nbsp;&nbsp;2018-03-01</span>\n          </div>\n        </div>\n      </ion-item>\n\n      <ion-item (click)="gomyapprodetil(\'尊享卡审批详情\')" class="row item-list">\n        <div col-12 class="name clearpadd mar-t">张三 <span class="cust-type bsFont">普通客户</span></div>\n\n        <div class="clearpadd mar-t" col-12>\n          <div style="display: inline-block" class="clearpadd " col-6>\n            <span class="title">审批标准</span>\n            <span class="cont">&nbsp;&nbsp;1</span>\n          </div>\n\n          <div style="display: inline-block" class="clearpadd" col-6>\n            <span class="title">审批状态</span>\n            <span class="cont">&nbsp;&nbsp;未审批</span>\n          </div>\n        </div>\n\n        <div class="clearpadd mar-t" col-12>\n          <div class="clearpadd" style="display: inline-block" col-6>\n            <span class="title">申报人</span>\n            <span class="cont">&nbsp;&nbsp;田亮</span>\n          </div>\n\n          <div class="clearpadd" style="display: inline-block" col-6>\n            <span class="title">申报时间</span>\n            <span class="cont">&nbsp;&nbsp;2018-03-01</span>\n          </div>\n        </div>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\myapprove\myapprove.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], MyapprovePage);
    return MyapprovePage;
}());

//# sourceMappingURL=myapprove.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyapprovedetilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__examinerecord_examinerecord__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the MyapprovedetilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyapprovedetilPage = (function () {
    function MyapprovedetilPage(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.isAgree = 0;
        this.isDisagree = "";
        this.rejectCont = "";
        this.isdispose = 0;
        this.headerText = this.navParams.get("title");
    }
    MyapprovedetilPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyapprovedetilPage');
    };
    MyapprovedetilPage.prototype.agree = function (args) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            message: '请输入同意意见',
            inputs: [
                {
                    name: 'cont',
                    placeholder: '请输入您的意见'
                },
            ],
            buttons: [
                {
                    text: '返回',
                    handler: function (data) {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        console.log(data.cont + "同意意见");
                        _this.rejectCont = data;
                    }
                }
            ]
        });
        confirm.present();
    };
    MyapprovedetilPage.prototype.doPrompt = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            message: "请输入拒绝建议",
            inputs: [
                {
                    name: 'cont',
                    placeholder: '请输入您的意见'
                },
            ],
            buttons: [
                {
                    text: '返回',
                    handler: function (data) {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        console.log(data.cont + "拒绝意见");
                        _this.isDisagree = data;
                    }
                }
            ]
        });
        prompt.present();
    };
    MyapprovedetilPage.prototype.goExamineRecord = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__examinerecord_examinerecord__["a" /* ExaminerecordPage */]);
    };
    MyapprovedetilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-myapprovedetil',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\myapprovedetil\myapprovedetil.html"*/'<!--\n  Generated template for the EnjoycardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{headerText}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background-color: #f5f5f5 !important; position:relative;" padding>\n  <div class="headline ">\n    申请详情\n  </div>\n  <div class="cont-list">\n    <div class="market-list">\n      <span class="market-list-name">客户姓名：</span>\n      <span class="market-list-cont">张三</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">客户类型：</span>\n      <span class="market-list-cont">普通客户</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">管户经理：</span>\n      <span class="market-list-cont">李四</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">{{headerText==\'私银卡审批详情\'?\'私银卡号\':\'尊享卡号\'}}：</span>\n      <span class="market-list-cont">6217468222834</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">归属网点：</span>\n      <span class="market-list-cont">******</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">归属机构：</span>\n      <span class="market-list-cont">宁波银行</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">{{headerText==\'私银卡审批详情\'?\'私银分层\':\'尊享分层\'}}：</span>\n      <span class="market-list-cont">******</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">{{headerText==\'私银卡审批详情\'?\'私银经理\':\'尊享经理\'}}：</span>\n      <span class="market-list-cont">王五</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">申报人</span>\n      <span class="market-list-cont">王五</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">申报网点</span>\n      <span class="market-list-cont">宁波银行鄞州支行</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">资产总额</span>\n      <span class="market-list-cont">5900.00</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">季日均资产</span>\n      <span class="market-list-cont">120.00</span>\n    </div>\n  </div>\n\n  <div class="newrecord clearfix" style="background-color: #fff !important;">\n    <div class="headline ">\n      历史审批记录\n      <span class="loadmore right" (click)="goExamineRecord()">更多记录>></span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">处理环节</span>\n      <span class="market-list-cont">一级支行管理部门经理审批</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">处理人</span>\n      <span class="market-list-cont">沈XX</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">操作时间</span>\n      <span class="market-list-cont">2018-3-3 12:00:00</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">结果</span>\n      <span class="market-list-cont">同意</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">意见</span>\n      <span class="market-list-cont">同意</span>\n    </div>\n  </div>\n\n  <div class="footer row">\n    <button col-6 ion-button color="secondary" (click)="agree()" block>同意</button>\n    <button col-6 ion-button color="danger" block (click)="doPrompt()">拒绝</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\myapprovedetil\myapprovedetil.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], MyapprovedetilPage);
    return MyapprovedetilPage;
}());

//# sourceMappingURL=myapprovedetil.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BulletinPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__largeremind_largeremind__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__arrivalremind_arrivalremind__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__advancemoney_advancemoney__ = __webpack_require__(235);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the BulletinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BulletinPage = (function () {
    function BulletinPage(navCtrl, navParams, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.elseList = [];
        this.itemList = [];
        this.arrvitlist = [];
        this.advance = [];
    }
    BulletinPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BulletinPage');
        this.getlargremindfo();
        this.getarrvitremindfo();
        this.getadvancefo();
    };
    BulletinPage.prototype.getlargremindfo = function () {
        var _this = this;
        // let names=[];
        var url = "performance/remind.json";
        this.httpService.getData({
            url: url,
            body: {}
        })
            .then(function (res) {
            var pieData = res.resultRes.targetSummary;
            var array = [];
            var iphe = [];
            _this.elseList = pieData;
            console.log(_this.elseList);
        });
    };
    BulletinPage.prototype.getarrvitremindfo = function () {
        var _this = this;
        // let names=[];
        var url = "performance/arrivalremind.json";
        this.httpService.getData({
            url: url,
            body: {}
        })
            .then(function (res) {
            var pieData = res.resultRes.targetSummary;
            var array = [];
            var iphe = [];
            _this.arrvitlist = pieData;
            console.log(_this.arrvitlist);
        });
    };
    BulletinPage.prototype.getadvancefo = function () {
        var _this = this;
        // let names=[];
        var url = "performance/advance.json";
        this.httpService.getData({
            url: url,
            body: {}
        })
            .then(function (res) {
            var pieData = res.resultRes.targetSummary;
            var array = [];
            var iphe = [];
            _this.advance = pieData;
            console.log(_this.advance);
        });
    };
    BulletinPage.prototype.openolarg = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__largeremind_largeremind__["a" /* LargeremindPage */], { animate: true });
    };
    BulletinPage.prototype.openarrival = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__arrivalremind_arrivalremind__["a" /* ArrivalremindPage */], { animate: true });
    };
    BulletinPage.prototype.openadvance = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__advancemoney_advancemoney__["a" /* AdvancemoneyPage */], { animate: true });
    };
    BulletinPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-bulletin',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\bulletin\bulletin.html"*/'<!--\n  Generated template for the BulletinPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>提醒简报</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-card *ngFor="let n of elseList" (click)="openolarg()">\n    <ion-card-content class="clearfix">\n      <span class="carsty-io">{{n.time}}</span>\n      <span class="fontsy-si">{{n.name}}</span>\n      <!--<p style="margin-top: 1rem">{{n.count}}</p>-->\n    </ion-card-content>\n    <div class="slide-sy"></div>\n    <ion-row>\n      <p class="conntentst-sty">查看详情</p>\n      <div class="footer-img3 footer-imgall" ></div>\n    </ion-row>\n  </ion-card>\n\n  <ion-card *ngFor="let n of arrvitlist" (click)="openarrival()">\n    <ion-card-content class="clearfix">\n      <span class="carsty-io">{{n.time}}</span>\n      <span class="fontsy-si">{{n.name}}</span>\n      <!--<p style="margin-top: 1rem">{{n.count}}</p>-->\n    </ion-card-content>\n    <div class="slide-sy"></div>\n    <ion-row>\n      <p class="conntentst-sty">查看详情</p>\n      <div class="footer-img3 footer-imgall" ></div>\n    </ion-row>\n  </ion-card>\n\n  <ion-card *ngFor="let n of advance" (click)="openadvance()">\n    <ion-card-content class="clearfix">\n      <span class="carsty-io">{{n.time}}</span>\n      <span class="fontsy-si">{{n.name}}</span>\n      <!--<p style="margin-top: 1rem">{{n.count}}</p>-->\n    </ion-card-content>\n    <div class="slide-sy"></div>\n    <ion-row>\n      <p class="conntentst-sty">查看详情</p>\n      <div class="footer-img3 footer-imgall" ></div>\n    </ion-row>\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\bulletin\bulletin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */]])
    ], BulletinPage);
    return BulletinPage;
}());

//# sourceMappingURL=bulletin.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LargeremindPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the LargeremindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LargeremindPage = (function () {
    function LargeremindPage(navCtrl, navParams, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.elseList = [];
        this.itemList = [];
    }
    LargeremindPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LargeremindPage');
        this.getlargerefo();
    };
    LargeremindPage.prototype.getlargerefo = function () {
        var _this = this;
        // let names=[];
        var url = "performance/largreminddata.json";
        this.httpService.getData({
            url: url,
            body: {}
        })
            .then(function (res) {
            var pieData = res.resultRes.targetSummary;
            var array = [];
            var iphe = [];
            _this.elseList = pieData;
            console.log(_this.elseList);
        });
    };
    LargeremindPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-largeremind',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\largeremind\largeremind.html"*/'<!--\n  Generated template for the LargeremindPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>大额变动提醒简报</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n\n  <div *ngFor="let n of elseList">\n    <div class="market-list">\n      <span class="market-list-name">客户号</span>\n      <span class="market-list-cont">{{n.customerid}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">客户名称</span>\n      <span class="market-list-cont">{{n.customeridname}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">客户等级</span>\n      <span class="market-list-cont">{{n.customerlist}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">支取金额</span>\n      <span class="market-list-cont">{{n.money}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">交易类型</span>\n      <span class="market-list-cont">{{n.type}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">交易时间</span>\n      <span class="market-list-cont">{{n.time}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">帐号</span>\n      <span class="market-list-cont">{{n.accounts}}</span>\n    </div>\n    <div class="market-list">\n    <span class="market-list-name">营销人</span>\n    <span class="market-list-cont">{{n.marketingpeople}}</span>\n  </div>\n    <div class="market-list">\n    <span class="market-list-name">客户经理</span>\n    <span class="market-list-cont">{{n.manager}}</span>\n  </div>\n <div class="market-list">\n  <span class="market-list-name">归属机构</span>\n  <span class="market-list-cont">{{n.org}}</span>\n</div>\n    <ion-item class="itemclass">\n      <ion-label class="market-list-name1">是否处理</ion-label>\n      <ion-input type="text" class="market-list-setm" placeholder="请处理"></ion-input>\n    </ion-item>\n    <ion-item class="itemclass">\n      <ion-label class="market-list-name1">备注</ion-label>\n      <ion-input type="text" class="market-list-setm1" placeholder="请编辑"></ion-input>\n    </ion-item>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\largeremind\largeremind.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */]])
    ], LargeremindPage);
    return LargeremindPage;
}());

//# sourceMappingURL=largeremind.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrivalremindPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ArrivalremindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ArrivalremindPage = (function () {
    function ArrivalremindPage(navCtrl, navParams, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.elseList = [];
        this.itemList = [];
    }
    ArrivalremindPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ArrivalremindPage');
        this.getlargerefo();
    };
    ArrivalremindPage.prototype.getlargerefo = function () {
        var _this = this;
        // let names=[];
        var url = "performance/largreminddata.json";
        this.httpService.getData({
            url: url,
            body: {}
        })
            .then(function (res) {
            var pieData = res.resultRes.targetSummary;
            var array = [];
            var iphe = [];
            _this.elseList = pieData;
            console.log(_this.elseList);
        });
    };
    ArrivalremindPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-arrivalremind',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\arrivalremind\arrivalremind.html"*/'<!--\n  Generated template for the ArrivalremindPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>客户到达提醒简报</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n\n  <div *ngFor="let n of elseList">\n    <div class="market-list">\n      <span class="market-list-name">客户号</span>\n      <span class="market-list-cont">{{n.customerid}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">客户名称</span>\n      <span class="market-list-cont">{{n.customeridname}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">客户等级</span>\n      <span class="market-list-cont">{{n.customerlist}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">客户到达时间</span>\n      <span class="market-list-cont">{{n.date}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">客户到达网点名称</span>\n      <span class="market-list-cont">{{n.point}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">客户到达机构名称</span>\n      <span class="market-list-cont">{{n.orglist}}</span>\n    </div>\n    <ion-item class="itemclass">\n      <ion-label class="market-list-name1">是否处理</ion-label>\n      <ion-input type="text" class="market-list-setm" placeholder="请处理"></ion-input>\n    </ion-item>\n    <ion-item class="itemclass">\n      <ion-label class="market-list-name1">备注</ion-label>\n      <ion-input type="text" class="market-list-setm1" placeholder="请编辑"></ion-input>\n    </ion-item>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\arrivalremind\arrivalremind.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */]])
    ], ArrivalremindPage);
    return ArrivalremindPage;
}());

//# sourceMappingURL=arrivalremind.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdvancemoneyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AdvancemoneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AdvancemoneyPage = (function () {
    function AdvancemoneyPage(navCtrl, navParams, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.elseList = [];
        this.itemList = [];
    }
    AdvancemoneyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AdvancemoneyPage');
        this.getlargerefo();
    };
    AdvancemoneyPage.prototype.getlargerefo = function () {
        var _this = this;
        // let names=[];
        var url = "performance/largreminddata.json";
        this.httpService.getData({
            url: url,
            body: {}
        })
            .then(function (res) {
            var pieData = res.resultRes.targetSummary;
            var array = [];
            var iphe = [];
            _this.elseList = pieData;
            console.log(_this.elseList);
        });
    };
    AdvancemoneyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-advancemoney',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\advancemoney\advancemoney.html"*/'<!--\n  Generated template for the AdvancemoneyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>定额提前支取提醒简报</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n\n  <div *ngFor="let n of elseList">\n    <div class="market-list">\n      <span class="market-list-name">客户号</span>\n      <span class="market-list-cont">{{n.customerid}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">客户名称</span>\n      <span class="market-list-cont">{{n.customeridname}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">客户等级</span>\n      <span class="market-list-cont">{{n.customerlist}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">支取金额</span>\n      <span class="market-list-cont">{{n.money}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">交易类型</span>\n      <span class="market-list-cont">{{n.type}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">交易时间</span>\n      <span class="market-list-cont">{{n.time}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">开户到期日</span>\n      <span class="market-list-cont">{{n.date}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">定存期限</span>\n      <span class="market-list-cont">{{n.year}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">卡号</span>\n      <span class="market-list-cont">{{n.card}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">帐号</span>\n      <span class="market-list-cont">{{n.accounts}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">营销人</span>\n      <span class="market-list-cont">{{n.marketingpeople}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">客户经理</span>\n      <span class="market-list-cont">{{n.manager}}</span>\n    </div>\n    <div class="market-list">\n      <span class="market-list-name">归属机构</span>\n      <span class="market-list-cont">{{n.org}}</span>\n    </div>\n    <ion-item class="itemclass">\n      <ion-label class="market-list-name1">是否处理</ion-label>\n      <ion-input type="text" class="market-list-setm" placeholder="请处理"></ion-input>\n    </ion-item>\n    <ion-item class="itemclass">\n      <ion-label class="market-list-name1">备注</ion-label>\n      <ion-input type="text" class="market-list-setm1" placeholder="请编辑"></ion-input>\n    </ion-item>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\advancemoney\advancemoney.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */]])
    ], AdvancemoneyPage);
    return AdvancemoneyPage;
}());

//# sourceMappingURL=advancemoney.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customer_customer__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_project__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__rate_rate__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__accountSearch_accountSearch__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__balance_balance__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { SearchlistPage } from '../searchlist/searchlist';





/**
 * Generated class for the MarketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchlistPage = (function () {
    function SearchlistPage(navCtrl, navParams, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
    }
    SearchlistPage.prototype.goSearchList = function (style) {
        console.log(style);
        switch (style) {
            case 'customer':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__customer_customer__["a" /* CustomerPage */], {}, { animate: true });
                break;
            case 'project':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__project_project__["a" /* ProjectPage */], {}, { animate: true });
                break;
            case 'rate':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__rate_rate__["a" /* RatePage */], {}, { animate: true });
                break;
            case 'detail':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__accountSearch_accountSearch__["a" /* AccountSearchPage */], {}, { animate: true });
                break;
            case 'balance':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__balance_balance__["a" /* BalancePage */], {}, { animate: true });
                break;
            default:
                break;
        }
    };
    SearchlistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-searchlistpage',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\searchlist\searchlist.html"*/'\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>查询</ion-title>\n    <!--<div class="edit right" (click)="goEditOther(otherDetails)">编辑</div>-->\n    <!--<div class="edit right" (click)="presentModal()">编辑</div>-->\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="cont_bg_color">\n    <ion-list no-lines>\n      <ion-item class="serachlist_item" (click)="goSearchList(\'customer\')">\n      	<ion-icon name="md-person" class="customer_icon"></ion-icon>\n     		客户信息查询\n      </ion-item>\n      <ion-item class="serachlist_item" (click)="goSearchList(\'project\')">\n      	<ion-icon name="md-square" class="project_icon"></ion-icon>\n     		项目信息查询\n      </ion-item>\n      <ion-item class="serachlist_item" (click)="goSearchList(\'rate\')">\n      	<ion-icon name="md-radio-button-on" class="rate_icon"></ion-icon>\n     		指令进度查询\n      </ion-item>\n      <ion-item class="serachlist_item" (click)="goSearchList(\'detail\')">\n      	<ion-icon name="ios-list-box" class="account_icon"></ion-icon>\n     		账户明细查询\n      </ion-item>\n      <ion-item class="serachlist_item" (click)="goSearchList(\'balance\')">\n      	<ion-icon name="ios-folder" class="balance_icon"></ion-icon>\n     		账户余额查询\n      </ion-item>\n      <ion-item class="serachlist_item" (click)="goSearchList(\'market\')">\n      	<ion-icon name="md-star" class="market_icon"></ion-icon>\n     		营销名单查询\n      </ion-item>\n  \n    </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\searchlist\searchlist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], SearchlistPage);
    return SearchlistPage;
}());

//# sourceMappingURL=searchlist.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customermanagerprodetail_customermanagerprodetail__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the MarketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CustomerDetailPage = (function () {
    function CustomerDetailPage(navCtrl, navParams, modalCtrl, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.httpService = httpService;
        this.customers = {};
        this.customer = navParams.get('customer');
    }
    CustomerDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        var url = "search/customerDetail.json";
        var param = {
            "customName": this.customer,
            "pageNo": "1",
            "dataCount": "10",
            "fisrPageNo": "1",
            "vague": false
        };
        this.httpService.getData({
            url: url,
            body: param
        })
            .then(function (res) {
            console.log(res);
            _this.customers = res.customs;
        });
    };
    CustomerDetailPage.prototype.goCustomer = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__customermanagerprodetail_customermanagerprodetail__["a" /* CustomermanagerprodetailPage */], { "customId": this.customers.customId }, { animate: true });
    };
    CustomerDetailPage.prototype.share = function () {
        console.log('分享');
    };
    CustomerDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customerdetail',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\customerdetail\customerdetail.html"*/'\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>诺软资产管理有限公司</ion-title>\n    <div class="edit right" (click)="share()">分享</div>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="cont_bg_color">\n    <div class="customer">\n    	<div class="customer_cont">\n	   	  <div class="info_title">公司属性</div>\n	   		<div class="info_content">{{customers.customName}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">法人代表</div>\n	   		<div class="info_content">{{customers.legalPerson}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">成立日期</div>\n	   		<div class="info_content">{{customers.foundDate}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">易托管户</div>\n	   		<div class="info_content">{{customers.ifZsb}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">托管规模</div>\n	   		<div class="info_content">{{customers.sCale}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">下辖项目</div>\n	   		<div class="info_content look" (click)="goCustomer()">查看</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="explain">说明:托管规模指该客户在本分行/宁波地区支行的托管规模</div>\n	    </div>\n    </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\customerdetail\customerdetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
    ], CustomerDetailPage);
    return CustomerDetailPage;
}());

//# sourceMappingURL=customerdetail.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { CustomerDetailPage } from '../customerdetail/customerdetail';

/**
 * Generated class for the MarketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProjectDetailPage = (function () {
    function ProjectDetailPage(navCtrl, navParams, modalCtrl, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.httpService = httpService;
        this.projects = {};
        this.instId = navParams.get('instId');
    }
    ProjectDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        var url = "search/projectDetail.json";
        var param = {
            "instId": this.instId
        };
        this.httpService.getData({
            url: url,
            body: param
        })
            .then(function (res) {
            console.log(res);
            _this.projects = res.projects;
        });
    };
    ProjectDetailPage.prototype.share = function () {
        console.log("分享");
    };
    ProjectDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-projectDetail',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\projectDetail\projectDetail.html"*/'\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>诺软资产管理有限公司</ion-title>\n    <div class="edit right" (click)="share()">分享</div>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="cont_bg_color">\n    <div class="customer">\n    	<div class="customer_cont">\n	   	  <div class="info_title">项目名称</div>\n	   		<div class="info_content">{{projects.name}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">项目ID</div>\n	   		<div class="info_content">{{projects.id}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">项目类型</div>\n	   		<div class="info_content">{{projects.proType}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">客户名称</div>\n	   		<div class="info_content">{{projects.customName}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">所属机构</div>\n	   		<div class="info_content">{{projects.compCode}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">委托人</div>\n	   		<div class="info_content">{{projects.consignorId}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">投向</div>\n	   		<div class="info_content">{{projects.investRange}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">托管规模</div>\n	   		<div class="info_content">{{projects.scale}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">大写金额</div>\n	   		<div class="info_content">{{projects.scaleUpper}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">托管费率</div>\n	   		<div class="info_content">{{projects.planRate}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">收费方式</div>\n	   		<div class="info_content">{{projects.chargingType}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">预计成立日期</div>\n	   		<div class="info_content">{{projects.foundDate}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">预计结束日期</div>\n	   		<div class="info_content">{{projects.planEndDate}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">是否估值</div>\n	   		<div class="info_content">{{projects.isEstimate}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">估值频率</div>\n	   		<div class="info_content">{{projects.estimateFrequency}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">估值方法</div>\n	   		<div class="info_content">{{projects.estimateType}}</div>\n	    </div>\n	    <div class="customer_cont">\n	   	  <div class="info_title">是否套印</div>\n	   		<div class="info_content">{{projects.isOverPrint}}</div>\n	    </div>\n	    \n    </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\projectDetail\projectDetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */]])
    ], ProjectDetailPage);
    return ProjectDetailPage;
}());

//# sourceMappingURL=projectDetail.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RateDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { CustomerDetailPage } from '../customerdetail/customerdetail';
/**
 * Generated class for the MarketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RateDetailPage = (function () {
    function RateDetailPage(navCtrl, navParams, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.ratesDetails = [];
        this.ratesDetails = navParams.get('ratesDetails');
    }
    RateDetailPage.prototype.presentModal = function () {
        console.log("分享");
    };
    RateDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-rateDetailpage',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\rateDetail\rateDetail.html"*/'\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>指令明细</ion-title>\n    <!--<div class="edit right" (click)="goEditOther(otherDetails)">编辑</div>-->\n    <div class="edit right" (click)="presentModal()">分享</div>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="cont_bg_color">\n   <!--<div>指令进度详情</div>-->\n		<div class="detail">\n			<div class="detail_top">{{ratesDetails.name}}</div>\n			<div class="detail_main">\n				<div class="detail_item border_top">\n					<div class="item_left title">指令日期</div>\n					<div class="item_center title">金额</div>\n					<div class="item_right title">当前处理</div>\n				</div>\n				<div class="detail_item border_top" *ngFor="let item  of ratesDetails.instructs">\n					<div class="item_left">{{item.instructDate}}</div>\n					<div class="item_center">{{item.amt}}</div>\n					<div class="item_right">{{item.stutas}}</div>\n				</div>\n			</div>\n		</div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\rateDetail\rateDetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], RateDetailPage);
    return RateDetailPage;
}());

//# sourceMappingURL=rateDetail.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the MarketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AccountDetailPage = (function () {
    function AccountDetailPage(navCtrl, navParams, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.accountDetails = {};
        this.accountDetails = navParams.get('accountDetails');
    }
    AccountDetailPage.prototype.presentModal = function () {
        console.log("分享");
    };
    AccountDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-accountDetailpage',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\accountDetail\accountDetail.html"*/'\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>资金进出</ion-title>\n    <!--<div class="edit right" (click)="goEditOther(otherDetails)">编辑</div>-->\n    <div class="edit right" (click)="presentModal()">分享</div>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="cont_bg_color">\n   <!--<div>指令进度详情</div>-->\n		<div class="detail">\n			<div class="detail_top">{{accountDetails.name}}</div>\n			<div class="detail_main">\n				<div class="detail_item border_top">\n					<div class="item_left title">日期</div>\n					<div class="item_center title">金额</div>\n					<div class="item_right title">方向</div>\n				</div>\n				<div class="detail_item border_top" *ngFor="let item  of accountDetails.instructs">\n					<div class="item_left">{{item.instructDate}}</div>\n					<div class="item_center">{{item.amt}}</div>\n					<div class="item_right">{{item.stutas}}</div>\n				</div>\n				\n				\n			</div>\n		</div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\accountDetail\accountDetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], AccountDetailPage);
    return AccountDetailPage;
}());

//# sourceMappingURL=accountDetail.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BalanceDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { CustomerDetailPage } from '../customerdetail/customerdetail';
/**
 * Generated class for the MarketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BalanceDetailPage = (function () {
    function BalanceDetailPage(navCtrl, navParams, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.balance = {};
        this.balanceDetails = {};
        this.balanceDetails = navParams.get('balanceDetails');
    }
    BalanceDetailPage.prototype.presentModal = function () {
        console.log('分享');
    };
    BalanceDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-balanceDetailpage',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\balanceDetail\balanceDetail.html"*/'\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>余额详情</ion-title>\n    <!--<div class="edit right" (click)="goEditOther(otherDetails)">编辑</div>-->\n    <div class="edit right" (click)="presentModal()">分享</div>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="cont_bg_color">\n   <!--<div>指令进度详情</div>-->\n		<div class="detail">\n			<div class="detail_top">{{balanceDetails.name}}</div>\n			<div class="detail_main">\n				<div class="detail_item border_top">\n					<div class="item_left title">日期</div>\n					<div class="item_center title">金额</div>\n					<div class="item_right title">方向</div>\n				</div>\n				<div class="detail_item border_top" *ngFor="let item  of balanceDetails.instructs">\n					<div class="item_left">{{item.instructDate}}</div>\n					<div class="item_center">{{item.amt}}</div>\n					<div class="item_right">{{item.stutas}}</div>\n				</div>\n				\n				\n			</div>\n		</div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\balanceDetail\balanceDetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], BalanceDetailPage);
    return BalanceDetailPage;
}());

//# sourceMappingURL=balanceDetail.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__HomeService__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__approvedpending_approvedpending__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__businessreport_businessreport__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__approvedpenddetail_approvedpenddetail__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__businessreportdetail_businessreportdetail__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__visitlist_visitlist__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__addreport_addreport__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__customer_customer__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__project_project__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__rate_rate__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__accountSearch_accountSearch__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__balance_balance__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var HomePage = (function () {
    //传递待审批更多的字段
    function HomePage(navCtrl, httpService) {
        this.navCtrl = navCtrl;
        this.httpService = httpService;
        //主界面的数据包装
        this.homePageDrtail = [];
        //empID
        this.empId = 1;
        this.arr = [];
    }
    //点击进入走访详情页面
    HomePage.prototype.go_visidetail = function (status) {
        // let index;
        // if(status == '待走访'){
        //   index = 1;
        // }else if(status == '已走访'){
        //   index = 2;
        // }else if(status == '已提交待审批'){
        //   index = 3;
        // }else if(status == '已取消'){
        //   index = 4;
        // }else if(status == '过期未走访'){
        //   index = 5;
        // }
        // this.navCtrl.push(VisidetailPage,{index:index},
        //   { animate: true });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__addreport_addreport__["a" /* addreportPage */], { animate: true });
    };
    //点击首页的待审批项，进入该项的详情
    HomePage.prototype.approvedpendingdetail = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__approvedpenddetail_approvedpenddetail__["a" /* ApprovedpenddetailPage */], { animate: true });
    };
    //点击首页的未完成走访计划
    HomePage.prototype.go_visitlist = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__visitlist_visitlist__["a" /* VisitlistPage */], { animate: true });
    };
    //点击首页的业务报告，进入该项的详情
    HomePage.prototype.go_businessreportdetail = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__businessreportdetail_businessreportdetail__["a" /* BusinessreportdetailPage */], { reprotArrListLastWeek: this.reprotArrListLastWeek, startTime: this.reprotArrListLastItem.startTime, endTime: this.reprotArrListLastItem.endTime }, { animate: true });
    };
    //转到审批列表
    HomePage.prototype.go_approverpend = function (index) {
        console.log("你点击了待审批列表");
        //点击更多，查询类型的最大数据
        console.log(this.homePageDrtail);
        if (index == 0) {
            var arrNum = [
                { name: "用印", num: this.homePageDrtail.recordNum },
                { name: "项目", num: this.homePageDrtail.reportNum },
                { name: "尽调", num: this.homePageDrtail.proNum },
                { name: "报告", num: this.homePageDrtail.num }
            ];
            console.log("根据排序来的：" + arrNum.sort(this.compare('num')));
            console.log("最多条数的是：" + arrNum[0].name);
            var indexName = arrNum[0].name;
            if (indexName == '用印') {
                index = 1;
            }
            else if (indexName == '项目') {
                index = 2;
            }
            else if (indexName == '尽调') {
                index = 3;
            }
            else if (indexName == '报告') {
                index = 4;
            }
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__approvedpending_approvedpending__["a" /* ApprovedpendingPage */], { "approve_index": index }, { animate: true });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__approvedpending_approvedpending__["a" /* ApprovedpendingPage */], { "approve_index": index }, { animate: true });
        }
    };
    //转到每周维护页面
    HomePage.prototype.go_report = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__businessreport_businessreport__["a" /* BusinessreportPage */], { reprotArrList: this.reprotArrList }, { animate: true });
    };
    //排序共用方法(从大到小排列)
    HomePage.prototype.compare = function (property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value2 - value1;
        };
    };
    HomePage.prototype.ionViewDidLoad = function () {
        this.getHomePage();
        var arrNewList = [];
        //获取当前周
        this.DTime1 = new Date();
        this.DTime2 = new Date();
        this.DTime2.setMonth(0);
        this.DTime2.setDate(1);
        var rq = this.DTime1 - this.DTime2;
        var s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
        var weekofyear = Math.ceil(s1 / 7);
        console.log("这是当前周" + weekofyear);
        //查询主界面的接口
        var getWeeks = function (year) {
            var d = new Date(year, 0, 1);
            while (d.getDay() != 1) {
                d.setDate(d.getDate() - 1);
            }
            var to = new Date(year + 1, 0, 1);
            var i = 1;
            var arrList = [];
            for (var from = d; from < to;) {
                var str = '';
                str = i + "&" + year + "-" + ((from.getMonth() + 1) <= 9 ? ('0' + (from.getMonth() + 1)) : (from.getMonth() + 1)) + "-" + (from.getDate() <= 9 ? ('0' + from.getDate()) : from.getDate()) + "&";
                from.setDate(from.getDate() + 6);
                if (from < to) {
                    str = str + year + "-" + ((from.getMonth() + 1) <= 9 ? ('0' + (from.getMonth() + 1)) : (from.getMonth() + 1)) + "-" + (from.getDate() <= 9 ? ('0' + from.getDate()) : from.getDate());
                    from.setDate(from.getDate() + 1);
                }
                else {
                    to.setDate(to.getDate() - 1);
                    str = str + year + "-" + ((to.getMonth() + 1) <= 9 ? ('0' + (to.getMonth() + 1)) : (to.getMonth() + 1)) + "-" + (to.getDate() <= 9 ? ('0' + to.getDate()) : to.getDate());
                }
                arrList.push(str);
                i++;
            }
            //重新组装arrList,截取每个数组变成每个新的对象
            for (var o = 0; o < weekofyear; o++) {
                //新建一个对象
                var weekReprotList = {};
                weekReprotList["week"] = arrList[o].split("&")[0];
                weekReprotList["startTime"] = arrList[o].split("&")[1];
                weekReprotList["endTime"] = arrList[o].split("&")[2];
                arrNewList.push(weekReprotList);
            }
            //判断如果是当周，且最后日期大于当天查看日期，就显示当天日期
            var endTimeCurrentWeek = arrNewList[arrNewList.length - 1].endTime;
            //获取当前日期
            var dateTime = new Date();
            var currYear = dateTime.getFullYear();
            var currMonth = dateTime.getMonth() + 1;
            var currDate = dateTime.getDate();
            var currMonthString;
            var currDateString;
            if (currMonth >= 1 && currMonth <= 9) {
                currMonthString = "0" + currMonth;
            }
            else {
                currMonthString = currMonth;
            }
            if (currDate >= 1 && currDate <= 9) {
                currDateString = "0" + currDate;
            }
            else {
                currDateString = currDate;
            }
            //申明当天日期
            var currDateTime = currYear + "-" + currMonthString + "-" + currDateString;
            //转换时间格式进而进行比较
            var d1 = new Date(currDateTime.replace(/\-/g, "\/"));
            var d2 = new Date(endTimeCurrentWeek.replace(/\-/g, "\/"));
            if (d1 < d2) {
                arrNewList[arrNewList.length - 1].endTime = currDateTime;
            }
        };
        //传入当前年
        getWeeks(new Date().getFullYear());
        this.reprotArrList = arrNewList;
        this.reprotArrListLastItem = arrNewList[arrNewList.length - 1];
        this.reprotArrListLastWeek = this.reprotArrListLastItem.week;
        this.reprotArrListLastTime = this.reprotArrListLastItem.startTime + " 至 " + this.reprotArrListLastItem.endTime;
    };
    //时间字段格式化
    HomePage.prototype.timeFormat = function (val) {
        return val.slice(0, 10);
    };
    //查询主界面的接口
    HomePage.prototype.getHomePage = function () {
        var _this = this;
        var url = "home_g/home_g.json";
        // const url = "http://127.0.0.1:8000/mcrm/zwebmcrm/com.nbcb.pcrm.mcrm.mobile";
        var data = {
            "appId": "mcrm",
            "reqParam": {
                "userId": this.empId
            },
            "serviceId": "auth.mcrmLogin"
        };
        this.httpService.getData({
            url: url,
            body: {}
        }).then(function (res) {
            _this.homePageDrtail = res.resultRes.plans.slice(0, 3);
            console.log(new Date(_this.homePageDrtail[0].planDate).getDay());
            console.log(res.resultRes);
        });
    };
    //返回的时间对象中取周几
    HomePage.prototype.getWeekday = function (time) {
        var arr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        return arr[new Date(time).getDay()];
    };
    HomePage.prototype.arrClassname = function (cls) {
        this.arr = cls.split(" ");
    };
    HomePage.prototype.goSearchlists = function ($event) {
        this.arrClassname($event.target.className);
        console.log($event.target.className);
        for (var i = 0, len = this.arr.length; i < len; i++) {
            switch (this.arr[i]) {
                case "customer_icon":
                    console.log("666");
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__customer_customer__["a" /* CustomerPage */], {}, { animate: true });
                    break;
                case "project_icon":
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__project_project__["a" /* ProjectPage */], {}, { animate: true });
                    break;
                case "rate_icon":
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__rate_rate__["a" /* RatePage */], {}, { animate: true });
                    break;
                case "account_icon":
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__accountSearch_accountSearch__["a" /* AccountSearchPage */], {}, { animate: true });
                    break;
                case "balance_icon":
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_14__balance_balance__["a" /* BalancePage */], {}, { animate: true });
                    break;
                case "market_icon":
                    ;
                    break;
                case "pr1111_icon":
                    ;
                    break;
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], HomePage.prototype, "content", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\home\home.html"*/'\n<ion-header>\n</ion-header>\n\n<ion-content style="">\n  <div class="show_nav_detail">\n    <div class="flex_one" style="-webkit-box-orient: vertical;">\n      <div class="nav_title">业绩完成率</div>\n      <div class="nav_number">80%</div>\n    </div>\n    <div class="flex_one" style="-webkit-box-orient: vertical;">\n      <div class="nav_title">当前排名</div>\n      <div class="nav_number">1</div>\n    </div>\n  </div>\n\n  <div class="home_menu">\n      <div class="menu_list" (click)="goSearchlists($event)">\n      <div style = "position: relative;" class="menu_item flex_one">\n        <ion-icon name="md-person" class="customer_icon icon icon-ios ion-md-person item-icon" role="img" aria-label="person"></ion-icon>\n        <div class="fontColor1 fontSize">客户查询</div>\n      </div>\n\n      <div class="menu_item flex_one">\n        <ion-icon name="md-square" class="project_icon icon icon-ios ion-md-square item-icon" role="img" aria-label="square"></ion-icon>\n        <div class="fontColor2 fontSize">项目查询</div>\n      </div>\n\n      <div class="menu_item flex_one">\n        <ion-icon name="md-radio-button-on" class="rate_icon icon icon-ios ion-md-radio-button-on item-icon" role="img" aria-label="radio button-on"></ion-icon>\n        <div class="fontColor3 fontSize">指令查询</div>\n      </div>\n\n      <div class="menu_item flex_one">\n        <ion-icon name="ios-list-box" class="account_icon icon icon-ios ion-ios-list-box item-icon" role="img" aria-label="list box"></ion-icon>\n        <div class="fontColor4 fontSize">账户查询</div>\n      </div>\n\n      <div class="menu_item flex_one">\n        <ion-icon name="ios-folder" class="balance_icon icon icon-ios ion-ios-folder item-icon" role="img" aria-label="folder"></ion-icon>\n        <div class="fontColor5 fontSize">余额查询</div>\n      </div>\n    </div>\n\n    <div class="menu_list">\n      <div class="menu_item flex_one">\n        <ion-icon name="md-star" class="market_icon icon icon-ios ion-md-star item-icon" role="img" aria-label="start"></ion-icon>\n        <div class="fontColor6 fontSize">营销查询</div>\n      </div>\n\n      <div class="menu_item flex_one">\n        <img src="">\n        <div class="fontColor7 fontSize">敬请期待</div>\n      </div>\n\n      <div class="menu_item flex_one">\n        <img src="">\n        <div class="fontColor8 fontSize">敬请期待</div>\n      </div>\n\n      <div class="menu_item flex_one">\n        <img src="">\n        <div class="fontColor9 fontSize">敬请期待</div>\n      </div>\n\n      <div class="menu_item flex_one">\n        <img src="">\n        <div class="fontColor10 fontSize">敬请期待</div>\n      </div>\n    </div>\n\n  </div>\n\n  <div class="home_menu" style="margin-top: 1rem;padding: 0px;">\n    <div class="common_title">\n      <span class="nav_icon"></span>\n      待审批事项\n      <span class="common_more" (click)="go_approverpend(0)">更多</span>\n    </div>\n\n    <div class="common_content">\n      <div class="flex_horizontal">\n        <div class="flex_one" (click)="go_approverpend(1)" style="color:#FB7B78">\n          <img class="record_img" src="../../assets/imgs/formaldetail/edit.png">\n          用印\n          <span style="margin-left: 1rem;">{{homePageDrtail.recordNum}}</span>\n        </div>\n        <div  class="flex_one" (click)="go_approverpend(2)" style="color:#0099ff">\n          <img class="report_img" src="../../assets/imgs/formaldetail/remark.png">\n          项目<span style="margin-left: 1rem;">{{homePageDrtail.reportNum}}</span>\n        </div>\n      </div>\n\n      <div class="flex_horizontal">\n        <span class="flex_one" (click)="go_approverpend(3)" style="color:#666666">\n          <img class="pro_img" src="../../assets/imgs/tab/about.png">\n          尽调<span style="margin-left: 1rem;">{{homePageDrtail.proNum}}</span>\n        </span>\n        <span class="flex_one" (click)="go_approverpend(4)" style="color:#3CB371">\n          <img class="num_img" src="../../assets/imgs/market/report.png">\n          报告<span style="margin-left: 1rem;">{{homePageDrtail.num}}</span>\n        </span>\n      </div>\n\n    </div>\n\n\n\n    <!--<div class="common_content common_flex" (click)="approvedpendingdetail()">-->\n      <!--<div  class="content_nowrap">-->\n        <!--<div class="content_title">宁波天心企业咨询有限公司资产托管上报资料</div>-->\n        <!--<div class="content_font" style="margin-top: 1rem;">-->\n          <!--<span class="content_type" style="background: rgb(85, 221, 170);color:#ffffff">类型</span>-->\n          <!--<span>2017-11-23 9:00</span>-->\n        <!--</div>-->\n      <!--</div>-->\n      <!--<div class="content_detail">   >  </div>-->\n    <!--</div>-->\n  </div>\n\n  <div class="home_menu" style="margin-top: 1rem;padding: 0px;">\n    <div class="common_title" (click)="go_visitlist()">\n      <span class="nav_icon"></span>\n      未完成走访计划\n      <span class="common_more">更多</span>\n    </div>\n\n    <div (click)="go_visidetail(item.status)" *ngFor="let item of homePageDrtail;let i = index" class="common_content common_flex" style="padding: 1.5rem 1rem 1.5rem 1rem;border-bottom: 1px #ddd solid;">\n      <div  class="content_nowrap">\n        <div class="content_title" style="display: -webkit-box">\n          <span style="color:#ff9933">{{ getWeekday(item.planDate) }}</span>\n          <span class="line_vertical"></span>\n          <span>{{item.customName}}</span>\n          <span class="content_type" [ngClass]="{\'orange\':item.status == \'待走访\',\'red\':item.status == \'已走访\',\'orange\':item.status == \'已取消\',\'seagreen\':item.status == \'过期未走访\',\'powderblue\':item.status == \'已提交待审批\'}">{{item.status}}</span>\n        </div>\n      </div>\n      <div class="content_detail">   >  </div>\n    </div>\n    <!--<div class="common_content common_flex" style="padding: 1.5rem 1rem 1.5rem 1rem;border-bottom: 1px #ddd solid;">-->\n      <!--<div  class="content_nowrap">-->\n        <!--<div class="content_title" style="display: -webkit-box">-->\n          <!--<span style="color:#ff9933">周三</span>-->\n          <!--<span class="line_vertical"></span>-->\n          <!--<span>宁波天心企业咨询有限公司</span>-->\n          <!--<span class="content_type">类型</span>-->\n        <!--</div>-->\n      <!--</div>-->\n      <!--<div class="content_detail">   >  </div>-->\n    <!--</div>-->\n    <!--<div class="common_content common_flex" style="padding: 1.5rem 1rem 1.5rem 1rem;border-bottom: 1px #ddd solid;">-->\n      <!--<div  class="content_nowrap">-->\n        <!--<div class="content_title" style="display: -webkit-box">-->\n          <!--<span style="color:#ff9933">周三</span>-->\n          <!--<span class="line_vertical"></span>-->\n          <!--<span>宁波天心企业咨询有限公司</span>-->\n          <!--<span class="content_type">类型</span>-->\n        <!--</div>-->\n      <!--</div>-->\n      <!--<div class="content_detail">   >  </div>-->\n    <!--</div>-->\n  </div>\n\n  <!--<div class="home_menu" style="margin-top: 1rem;padding: 0px;">-->\n    <!--<div class="common_title">-->\n      <!--<span class="nav_icon"></span>-->\n      <!--重要客户业务动态-->\n      <!--<span class="common_more">更多</span>-->\n    <!--</div>-->\n    <!--<div class="common_content common_flex">-->\n      <!--<div  class="content_nowrap">-->\n        <!--<div class="content_title">宁波天心企业咨询有限公司已开通分级基金</div>-->\n        <!--<div class="content_font" style="margin-top: 1rem;">-->\n          <!--<span>2017-11-23 9:00</span>-->\n        <!--</div>-->\n      <!--</div>-->\n      <!--<div class="content_detail">   >  </div>-->\n    <!--</div>-->\n  <!--</div>-->\n\n  <div class="home_menu" style="margin-top: 1rem;padding: 0px;margin-bottom: 2rem;">\n    <div class="common_title">\n      <span class="nav_icon"></span>\n      每周业务报告\n      <span class="common_more" (click)="go_report()">更多</span>\n    </div>\n    <div class="common_content common_flex" (click)="go_businessreportdetail()">\n      <div  class="content_nowrap">\n        <div class="content_title">2018年第<span>{{reprotArrListLastWeek}}</span>周业务报告</div>\n        <div class="content_font" style="margin-top: 1rem;">\n          <span>{{reprotArrListLastTime}}</span>\n        </div>\n      </div>\n      <div class="content_detail">   >  </div>\n    </div>\n  </div>\n\n</ion-content>\n\n\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\home\home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__HomeService__["a" /* HomeService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApproveprojectdetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__approvedpending_approvedpending__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ApproveprojectdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ApproveprojectdetailPage = (function () {
    function ApproveprojectdetailPage(navCtrl, navParams, alertCtrl, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.httpService = httpService;
        //申明一个对象来装详情信息
        this.projectDetail = {};
        this.processinstId = navParams.get("processinstId");
    }
    ApproveprojectdetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ApproveprojectdetailPage');
        this.getDetailPage();
    };
    //查询详情页面接口
    ApproveprojectdetailPage.prototype.getDetailPage = function () {
        var _this = this;
        var url = "approveindialist/approveprojectdetail.json";
        // const url = "http://127.0.0.1:8000/mcrm/zwebmcrm/com.nbcb.pcrm.mcrm.mobile";
        var data = {
            "appId": "mcrm",
            "reqParam": {
                "processinstId": this.processinstId
            },
            "serviceId": "auth.mcrmLogin"
        };
        this.httpService.getData({
            url: url,
            body: {}
        }).then(function (res) {
            _this.projectDetail = res.resultRes;
            console.log("这是项目详情数据" + _this.projectDetail);
        });
    };
    //点击提交
    ApproveprojectdetailPage.prototype.submit = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: '提示',
            message: '是否取消该走访计划?',
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                        console.log('您点击了取消');
                    }
                },
                {
                    text: '是',
                    handler: function () {
                        //您点击了提交
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__approvedpending_approvedpending__["a" /* ApprovedpendingPage */], { approve_index: "2" }, { animate: true });
                        console.log('您点击了是');
                    }
                }
            ]
        });
        confirm.present();
    };
    ApproveprojectdetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-approveprojectdetail',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\approveprojectdetail\approveprojectdetail.html"*/'<!--\n  Generated template for the ApproveprojectdetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>项目审批详情信息</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div>\n    <div class="header_title">项目详情</div>\n\n    <div class="detail_content">\n      <div class="detail_item">\n        <div class="item_name flex_one">项目名称</div>\n        <div class="item_name flex_four" style="border-right: 0px;">{{projectDetail.name}}</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">项目类型</div>\n        <div class="item_name flex_four" style="border-right: 0px;">{{projectDetail.proType}}</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">客户名称</div>\n        <div class="item_name flex_four" style="border-right: 0px;">{{projectDetail.customName}}</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">委托人</div>\n        <div class="item_name flex_four" style="border-right: 0px;">{{projectDetail.consignorId}}</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one" style="border-right: 0px;">投向</div>\n        <div class="item_name flex_four" style="border-right: 0px;border-left: 1px #ddd solid">{{projectDetail.investRange}}</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">托管规模</div>\n        <div class="item_name flex_four" style="border-right: 0px;">{{projectDetail.scale}}</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">大写金额</div>\n        <div class="item_name flex_four" style="border-right: 0px;">{{projectDetail.scaleUpper}}</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">托管费率</div>\n        <div class="item_name flex_four" style="border-right: 0px;">{{projectDetail.planRate}}</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">收费方式</div>\n        <div class="item_name flex_four" style="border-right: 0px;">{{projectDetail.chargingType}}</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">预计成立日期</div>\n        <div class="item_name flex_four" style="border-right: 0px;">{{projectDetail.foundDate}}</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">预计结束日期</div>\n        <div class="item_name flex_four" style="border-right: 0px;">{{projectDetail.planEndDate}}</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">所属机构</div>\n        <div class="item_name flex_four" style="border-right: 0px;">{{projectDetail.compCode}}</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">是否估值</div>\n        <div class="item_name flex_four" style="border-right: 0px;">{{projectDetail.isEstimate}}</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">估值方法</div>\n        <div class="item_name flex_four" style="border-right: 0px;">{{projectDetail.estimateType}}</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">是否套印</div>\n        <div class="item_name flex_four" style="border-right: 0px;">{{projectDetail.isOverPrint}}</div>\n      </div>\n\n      <div class="last_item">\n        <div>审批意见：无</div>\n        <div>日期：2018-03-02 15:30:36</div>\n      </div>\n    </div>\n\n    <div class="checkbox_content">\n      <input type="radio" name="status" checked>同意\n      <input type="radio"  name="status" style="margin-left: 1rem;">退回\n    </div>\n\n    <div class="submit_bottom" (click)="submit()">提交</div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\approveprojectdetail\approveprojectdetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
    ], ApproveprojectdetailPage);
    return ApproveprojectdetailPage;
}());

//# sourceMappingURL=approveprojectdetail.js.map

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApproveindiadetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__approvedpending_approvedpending__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ApproveindiadetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ApproveindiadetailPage = (function () {
    function ApproveindiadetailPage(navCtrl, navParams, alertCtrl, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.httpService = httpService;
        //申明一个对象来装详情信息
        this.indiaDetail = {};
        this.processinstId = navParams.get("processinstId");
        this.sealId = navParams.get("sealId");
        console.log("传递的processinstId" + this.processinstId);
        console.log("传递的sealId" + this.sealId);
    }
    ApproveindiadetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ApproveindiadetailPage');
        this.getDetailPage();
    };
    //查询详情页面接口
    ApproveindiadetailPage.prototype.getDetailPage = function () {
        var _this = this;
        var url = "approveindialist/approveindiaDetail.json";
        // const url = "http://127.0.0.1:8000/mcrm/zwebmcrm/com.nbcb.pcrm.mcrm.mobile";
        var data = {
            "appId": "mcrm",
            "reqParam": {
                "sealId": this.sealId,
                "processinstId": this.processinstId
            },
            "serviceId": "auth.mcrmLogin"
        };
        this.httpService.getData({
            url: url,
            body: {}
        }).then(function (res) {
            _this.indiaDetail = res;
            console.log(_this.indiaDetail);
        });
    };
    //点击提交
    ApproveindiadetailPage.prototype.submit = function () {
        var _this = this;
        //您点击了提交
        var confirm = this.alertCtrl.create({
            title: '提示',
            message: '是否取消该走访计划?',
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                        console.log('您点击了取消');
                    }
                },
                {
                    text: '是',
                    handler: function () {
                        //您点击了提交
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__approvedpending_approvedpending__["a" /* ApprovedpendingPage */], { approve_index: "1" }, { animate: true });
                        console.log('您点击了是');
                    }
                }
            ]
        });
        confirm.present();
    };
    ApproveindiadetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-approveindiadetail',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\approveindiadetail\approveindiadetail.html"*/'<!--\n  Generated template for the ApproveindiadetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>用印审批详情信息</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div>\n    <div class="header_title">用印详情</div>\n\n    <div class="detail_content">\n      <div class="detail_item">\n        <div class="item_name flex_one">业务类型</div>\n        <div class="item_name flex_four" style="border-right: 0px;">资产托管业务</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">项目名称</div>\n        <div class="item_name flex_four" style="border-right: 0px;">--</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">客户名称</div>\n        <div class="item_name flex_four" style="border-right: 0px;">上海金元百利资产管理有限公司</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">合同类型</div>\n        <div class="item_name flex_four" style="border-right: 0px;">--</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">签约金额</div>\n        <div class="item_name flex_four" style="border-right: 0px;">0.00元</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">大写金额</div>\n        <div class="item_name flex_four" style="border-right: 0px;">0元整</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">文本类型</div>\n        <div class="item_name flex_four" style="border-right: 0px;">标准文本</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">申请类型</div>\n        <div class="item_name flex_four" style="border-right: 0px;">原件</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">印章类型</div>\n        <div class="item_name flex_four" style="border-right: 0px;">托管合同专用章</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">盖章数</div>\n        <div class="item_name flex_four" style="border-right: 0px;">2</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">申请人</div>\n        <div class="item_name flex_four" style="border-right: 0px;">何意</div>\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">提交机构</div>\n        <div class="item_name flex_four" style="border-right: 0px;">总行</div>\n      </div>\n\n\n      <div class=" detail_nav" style="display: -webkit-box; -webkit-box-orient: vertical;padding: 1rem;font-weight: bold;border: 1px #ddd solid;">\n        流程信息\n      </div>\n\n      <div class="detail_item" style="border-top:0px;">\n        <div class="item_name flex_one">审批人</div>\n        <div class="item_name flex_four" style="border-right: 0px;">何意</div>\n      </div>\n      <div class="last_item">\n        <div>审批意见：无</div>\n        <div>日期：2018-03-02 15:30:36</div>\n      </div>\n\n      <div class=" detail_nav" style="display: -webkit-box; -webkit-box-orient: vertical;padding: 1rem;font-weight: bold;border: 1px #ddd solid;">\n        附加信息\n      </div>\n      <div class="detail_item" style="border-top:0px;">\n        <a style="padding: 1rem;">10(50M)副本.doc</a>\n      </div>\n      <div class="detail_item" style="border-top:0px;">\n        <a style="padding: 1rem;">10(50M)副本.doc</a>\n      </div>\n\n    </div>\n\n\n\n    <div class="checkbox_content">\n      <input type="radio" name="status" checked>同意\n      <input type="radio"  name="status" style="margin-left: 1rem;">退回\n    </div>\n\n    <div class="submit_bottom" (click)="submit()">提交</div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\approveindiadetail\approveindiadetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
    ], ApproveindiadetailPage);
    return ApproveindiadetailPage;
}());

//# sourceMappingURL=approveindiadetail.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApprovewechartdetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__approvedpending_approvedpending__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ApprovewechartdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ApprovewechartdetailPage = (function () {
    function ApprovewechartdetailPage(navCtrl, navParams, alertCtrl, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.httpService = httpService;
        this.processinstId = navParams.get("processinstId");
        this.wechartId = navParams.get("wechartId");
    }
    ApprovewechartdetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ApprovewechartdetailPage');
        this.getDetailPage();
    };
    //点击提交
    ApprovewechartdetailPage.prototype.submit = function () {
        var _this = this;
        //您点击了提交
        var confirm = this.alertCtrl.create({
            title: '提示',
            message: '是否取消该走访计划?',
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                        console.log('您点击了取消');
                    }
                },
                {
                    text: '是',
                    handler: function () {
                        //您点击了提交
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__approvedpending_approvedpending__["a" /* ApprovedpendingPage */], { approve_index: "3" }, { animate: true });
                        console.log('您点击了是');
                    }
                }
            ]
        });
        confirm.present();
    };
    //查询详情页面接口
    ApprovewechartdetailPage.prototype.getDetailPage = function () {
        var _this = this;
        var url = "approveindialist/approveindiaDetail.json";
        // const url = "http://127.0.0.1:8000/mcrm/zwebmcrm/com.nbcb.pcrm.mcrm.mobile";
        var data = {
            "appId": "mcrm",
            "reqParam": {
                "sealId": this.wechartId,
                "processinstId": this.processinstId
            },
            "serviceId": "auth.mcrmLogin"
        };
        this.httpService.getData({
            url: url,
            body: {}
        }).then(function (res) {
            _this.wechartDetail = res;
            console.log(_this.wechartDetail);
        });
    };
    ApprovewechartdetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-approvewechartdetail',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\approvewechartdetail\approvewechartdetail.html"*/'<!--\n  Generated template for the ApprovewechartdetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>托管主尽调微信详情</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <div class="header_title">尽调详情</div>\n\n  <div class="detail_content">\n    <div class="detail_item">\n      <div class="item_name flex_one">尽调类型</div>\n      <div class="item_name flex_four" style="border-right: 0px;">托管主尽调</div>\n    </div>\n\n    <div class="detail_item" style="border-top:0px;">\n      <div class="item_name flex_one">客户名称</div>\n      <div class="item_name flex_four" style="border-right: 0px;">安信证券股份有限公司</div>\n    </div>\n\n    <div class="detail_item" style="border-top:0px;">\n      <div class="item_name flex_one">公司属性</div>\n      <div class="item_name flex_four" style="border-right: 0px;">证券公司</div>\n    </div>\n\n    <div class="detail_item" style="border-top:0px;">\n      <div class="item_name flex_one">公司规模</div>\n      <div class="item_name flex_four" style="border-right: 0px;">0.00元</div>\n    </div>\n\n    <div class="detail_item" style="border-top:0px;">\n      <div class="item_name flex_one">公司发展简况</div>\n      <div class="item_name flex_four" style="border-right: 0px;">2</div>\n    </div>\n\n    <div class="detail_item" style="border-top:0px;">\n      <div class="item_name flex_one">主要管理人员简历</div>\n      <div class="item_name flex_four" style="border-right: 0px;">2</div>\n    </div>\n\n    <div class="detail_item" style="border-top:0px;">\n      <div class="item_name flex_one">最近年度财务状况</div>\n      <div class="item_name flex_four" style="border-right: 0px;">201</div>\n    </div>\n\n    <div class="detail_item" style="border-top:0px;">\n      <div class="item_name flex_one">投资管理产品业绩</div>\n      <div class="item_name flex_four" style="border-right: 0px;">2</div>\n    </div>\n\n    <div class="detail_item" style="border-top:0px;">\n      <div class="item_name flex_one" style="border-right:0;">其他情况</div>\n      <div class="item_name flex_four" style="border-right: 0px;border-left:1px #ddd solid;">\n        <div>\n          <input type="checkbox" checked>不存在的违法违规情况\n        </div>\n        <div>\n          <input type="checkbox" checked>不存在发行产品到期未偿付情况\n        </div>\n        <div>\n          <input type="checkbox" checked>过去三年未被监管机构处罚\n        </div>\n      </div>\n    </div>\n\n    <div class="detail_nav" style="display: -webkit-box; -webkit-box-orient: vertical;padding: 1rem;font-weight: bold;border:1px #ddd solid;">\n      流程信息\n    </div>\n\n    <div class="detail_item" style="border-top:0px;">\n      <div class="item_name flex_one">审批人</div>\n      <div class="item_name flex_four" style="border-right: 0px;">何意</div>\n    </div>\n    <div class="last_item">\n      <div>审批意见：无</div>\n      <div>日期：2018-03-02 15:30:36</div>\n    </div>\n  </div>\n\n  <div class="checkbox_content">\n    <input type="radio" name="status" checked>同意\n    <input type="radio"  name="status" style="margin-left: 1rem;">退回\n  </div>\n\n  <div class="submit_bottom" (click)="submit()">提交</div>\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\approvewechartdetail\approvewechartdetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
    ], ApprovewechartdetailPage);
    return ApprovewechartdetailPage;
}());

//# sourceMappingURL=approvewechartdetail.js.map

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusinessreportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__businessreportdetail_businessreportdetail__ = __webpack_require__(117);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the BusinessreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BusinessreportPage = (function () {
    function BusinessreportPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        var reprotArr = navParams.get("reprotArrList");
        this.businessreportList = reprotArr;
        // console.log("传递过来的集合"+this.businessreportList.reverse());
        console.log(reprotArr.sort(this.compare('week')));
    }
    //根据字段week字段从大到小排列
    BusinessreportPage.prototype.compare = function (property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value2 - value1;
        };
    };
    // console.log(arr.sort(compare('age')))
    BusinessreportPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BusinessreportPage');
    };
    //点击其中一行，会转到对应详情页面
    BusinessreportPage.prototype.go_detail = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__businessreportdetail_businessreportdetail__["a" /* BusinessreportdetailPage */], { reprotArrListLastWeek: item.week, startTime: item.startTime, endTime: item.endTime }, { animate: true });
    };
    BusinessreportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-businessreport',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\businessreport\businessreport.html"*/'<!--\n  Generated template for the BusinessreportPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>每周业务报告</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="home_menu" style="margin-top: 1rem;padding: 0px;margin-bottom: 2rem;">\n    <div class="common_content common_flex" style="border-bottom: 1px #ddd solid;" (click)="go_detail(item)" *ngFor="let item of businessreportList;let i = index">\n      <div  class="content_nowrap">\n        <div class="content_title">2018年第{{item.week}}周业务报告<span *ngIf = "i==0" class="new_font" style="background: red">new</span></div>\n        <div class="content_font" style="margin-top: 1rem;">\n          <span>{{item.startTime}} 至 {{item.endTime}}</span>\n        </div>\n      </div>\n      <div class="content_detail">   >  </div>\n    </div>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\businessreport\businessreport.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], BusinessreportPage);
    return BusinessreportPage;
}());

//# sourceMappingURL=businessreport.js.map

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MinePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MinePage = (function () {
    function MinePage(navCtrl, alerCtrl, httpService) {
        this.navCtrl = navCtrl;
        this.alerCtrl = alerCtrl;
        this.httpService = httpService;
        this.progress_box_width = '80%';
        this.progress_box_width2 = '120%';
    }
    MinePage.prototype.ionViewDidLoad = function () { };
    MinePage.prototype.loginOut = function () {
        console.log('loginOut');
        //转到登录页面
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    MinePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mine',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\mine\mine.html"*/'<!--\n  Generated template for the MinePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <!--<ion-navbar>-->\n    <!--<ion-title>我的</ion-title>-->\n  <!--</ion-navbar>-->\n\n</ion-header>\n\n<ion-content>\n  <!--<div class="user-info">\n    <ion-list no-lines>\n      <ion-item>\n        李明光\n      </ion-item>\n      <ion-item detail-push>\n        {{position}}\n        <ion-note (click)="changeobj()" color="light" >item-end\n          切换\n        </ion-note>\n      </ion-item>\n    </ion-list>\n  </div>\n  <div class="btn-content">\n    <ion-list no-lines>\n      <ion-item (click)="goBulletinPage()" detail-push class="mb">\n        <ion-icon name="ios-alert-outline" color="danger"></ion-icon>\n        系统消息\n        <ion-badge color="danger" item-end>5</ion-badge>\n      </ion-item>\n      <ion-item (click)="goopionfedb()" detail-push class="mb">\n        <ion-icon name="ios-chatbubbles-outline" color="primary"></ion-icon>\n        意见反馈\n      </ion-item>\n      <ion-item (click)="goset()" detail-push class="mb">\n        <ion-icon name="ios-settings-outline"></ion-icon>\n        系统设置\n      </ion-item>\n      <ion-item detail-push class="mb">\n        <ion-icon name="ios-home-outline" color="primary"></ion-icon>\n        常用地址设置\n      </ion-item>\n    </ion-list>\n  </div>-->\n\n  <!--**************易托管开始*******************-->\n  <div class="user-info">\n\n  	<div class="head_main">\n  		<div class="head">\n	  		<img src="../../assets/imgs/head.jpg" alt="" />\n	  	</div>\n	  	<div class="head_cont">\n	  		<div class="head_item">\n	  			<div class="item_user" style="font-size:2rem;">郭晓婷</div>\n	  			<div class="item_out" (click)="loginOut()">退出登录</div>\n	  		</div>\n	  		<div class="head_item" style="font-size:1.6rem;">产品经理/上海分行</div>\n	  	</div>\n  	</div>\n  	<div class="head_foot">指标完成情况</div>\n  </div>\n  <div class="btn-content" style="    margin: 3rem 1rem;">\n  	<div class="progress">\n  		<div class="progress_title">产品经理业绩</div>\n  		<div class="progress_cont">\n  			<div class="progress_box" [ngStyle]="{\'width\':progress_box_width}">\n  				<div class="progress_num">{{progress_box_width}}</div>\n  			</div>\n  		</div>\n  	</div>\n  	<div class="progress">\n  		<div class="progress_title">所属分行业绩</div>\n  		<div class="progress_cont">\n  			<div class="progress_box" [ngStyle]="{\'width\':progress_box_width2}">\n  				<div class="progress_num">{{progress_box_width2}}</div>\n  			</div>\n  		</div>\n  	</div>\n  	<div class="progress">\n  		<div class="progress_title">总行业绩</div>\n  		<div class="progress_cont">\n  			<div class="progress_box" [ngStyle]="{\'width\':progress_box_width2}">\n  				<div class="progress_num">{{progress_box_width2}}</div>\n  			</div>\n  		</div>\n  	</div>\n\n    <!--<div id="radar" class="div-charts"></div>-->\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\mine\mine.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */]])
    ], MinePage);
    return MinePage;
}());

//# sourceMappingURL=mine.js.map

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomermanagerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__customermanagerlist_customermanagerlist__ = __webpack_require__(249);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CustomermanagerPage = (function () {
    function CustomermanagerPage(navCtrl, navParams, httpService, cd) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.cd = cd;
    }
    CustomermanagerPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var navtest = this.navCtrl;
        this.myChartpie = echarts.init(document.getElementById('pie'));
        this.myChartpie.on('click', function (params) {
            console.log("您点击的类别是：" + params.data.name); //从params集合中获取状态state
            navtest.push(__WEBPACK_IMPORTED_MODULE_3__customermanagerlist_customermanagerlist__["a" /* CustomermanagerlistPage */], {}, { animate: true });
        });
        console.log('ionViewDidLoad CustomermanagerPage');
        var url = "performance/customerCurrent.json";
        this.httpService.postData({
            url: url,
            body: {}
        }).then(function (res) {
            var pieData = res.resultRes.targetSummary;
            var datapie = [];
            //放置左边标签，存入名字
            var datalegend = [];
            for (var _i = 0, pieData_1 = pieData; _i < pieData_1.length; _i++) {
                var date = pieData_1[_i];
                var obj = {};
                obj['name'] = date.indicatorType;
                obj['value'] = date.indicatorSum;
                datapie.push(obj);
                datalegend.push(date.indicatorType);
            }
            console.log(datapie);
            console.log(datalegend);
            _this.myChartpie.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                // legend: {
                //   orient: 'vertical',
                //   left: 'left',
                //   data: datalegend
                // },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: datapie,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
            //第二个图表
            _this.myChartbar = echarts.init(document.getElementById('bar'));
            _this.myChartbar.setOption({
                color: ['#8bc9df'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#626262',
                                width: 1,
                            }
                        },
                        axisTick: {
                            alignWithLabel: false,
                            show: false
                        },
                        axisLabel: {
                            interval: 0,
                            rotate: 40,
                            show: true,
                            textStyle: {
                                color: '#d3d3d3',
                            },
                        },
                        type: 'category',
                        data: datalegend
                    }
                ],
                yAxis: [
                    {
                        axisLine: {
                            show: true,
                            color: '#d3d3d3'
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ['#f3f3f3']
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#d3d3d3',
                            },
                        },
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '',
                        type: 'bar',
                        barWidth: '60%',
                        data: datapie
                    }
                ]
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], CustomermanagerPage.prototype, "content", void 0);
    CustomermanagerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customermanager',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\customermanager\customermanager.html"*/'<!--\n  Generated template for the CustomermanagerPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>客户汇总</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#F5F6F7">\n\n  <div class="customer_item">\n    <div class="customer_header">\n        客户分类\n    </div>\n    <div class="customer_content">\n      <div style="margin-top: 2rem">\n        <div id="pie" class="div-charts"></div>\n      </div>\n    </div>\n  </div>\n\n  <div style="width: 100%;height:1rem;background:#ddd"></div>\n\n  <div class="customer_item">\n    <div class="customer_header">\n      公司属性\n    </div>\n    <div class="customer_content">\n      <div style="margin-top: 2rem">\n        <div id="bar" class="div-charts"></div>\n      </div>\n    </div>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\customermanager\customermanager.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
    ], CustomermanagerPage);
    return CustomermanagerPage;
}());

//# sourceMappingURL=customermanager.js.map

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomermanagerlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customermanagerdetail_customermanagerdetail__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the CustomermanagerlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CustomermanagerlistPage = (function () {
    function CustomermanagerlistPage(navCtrl, navParams, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
    }
    CustomermanagerlistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomermanagerlistPage');
        this.customName = "";
        this.getListPage();
    };
    //点击某一项的详情
    CustomermanagerlistPage.prototype.customerdetail = function () {
        //把客户ID传到下一个页面
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__customermanagerdetail_customermanagerdetail__["a" /* CustomermanagerdetailPage */], { customId: this.customId }, { animate: true });
    };
    //根据传过来的一个类型，查询集合
    CustomermanagerlistPage.prototype.getListPage = function () {
        var _this = this;
        var url = "approveindialist/approveprojectdetail.json";
        // const url = "http://127.0.0.1:8000/mcrm/zwebmcrm/com.nbcb.pcrm.mcrm.mobile";
        var data = {
            "appId": "mcrm",
            "reqParam": {
                "customName": this.customName,
                "propDesc": '',
                "summaryC": this.summaryC,
                "pageNo": "",
                "dataCount": "",
                "firstPageNo": ""
            },
            "serviceId": "auth.mcrmLogin"
        };
        this.httpService.getData({
            url: url,
            body: {}
        }).then(function (res) {
            _this.custormerManageList = res;
            //在返回的结果提取客户ID，这里是自定义的值，因为不知道返回的结构
            _this.customId = 1;
            console.log("这是客户列表数据：" + _this.custormerManageList);
        });
    };
    //点击查询根据客户名称或者客户类型
    CustomermanagerlistPage.prototype.search = function () {
        //获取input的值
        var secrchVal = this.searchvalue;
        console.log("这是搜索框的值：" + secrchVal);
        this.customName = secrchVal;
        this.getListPage();
    };
    CustomermanagerlistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customermanagerlist',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\customermanagerlist\customermanagerlist.html"*/'<!--\n  Generated template for the CustomermanagerlistPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header">\n  <ion-navbar>\n    <div class="search_header">\n      <input [(ngModel)]="searchvalue" class="input" type="search" placeholder="请输入名字">\n      <div class="search_icon" (click)="search()">搜索</div>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content style="background: #F3F4F6;">\n  <div class="list_item" (click)="customerdetail()">\n    <div class="list_status"><span class="list_status_name" style="background: #E25156">互联网</span></div>\n    <div class="list_content">\n      <div class="list_name">\n        宁波天心企业咨询有限公司\n      </div>\n      <div class="list_body" style="color:#777777">\n        法人代表：<span class="">希维尔</span><span style="margin-left: 1rem;color:#777777">公司属性：投资贸易</span>\n      </div>\n      <div class="list_body" style="color:#777777;padding-top:0px;">\n        易托管户：<span class="">正式版</span><span style="margin-left: 1rem;color:#777777">托管规模：8000000.0</span>\n      </div>\n    </div>\n    <div class="list_detail">\n      详情\n    </div>\n  </div>\n\n  <div class="list_item" (click)="customerdetail()">\n    <div class="list_status"><span class="list_status_name" style="background: #E25156">互联网</span></div>\n    <div class="list_content">\n      <div class="list_name">\n        宁波天心企业咨询有限公司\n      </div>\n      <div class="list_body" style="color:#777777">\n        法人代表：<span class="">希维尔</span><span style="margin-left: 1rem;color:#777777">公司属性：投资贸易</span>\n      </div>\n      <div class="list_body" style="color:#777777;padding-top:0px;">\n        易托管户：<span class="">正式版</span><span style="margin-left: 1rem;color:#777777">托管规模：8000000.0</span>\n      </div>\n    </div>\n    <div class="list_detail">\n      详情\n    </div>\n  </div>\n\n  <div class="list_item" (click)="customerdetail()">\n    <div class="list_status"><span class="list_status_name" style="background: #E25156">互联网</span></div>\n    <div class="list_content">\n      <div class="list_name">\n        宁波天心企业咨询有限公司\n      </div>\n      <div class="list_body" style="color:#777777">\n        法人代表：<span class="">希维尔</span><span style="margin-left: 1rem;color:#777777">公司属性：投资贸易</span>\n      </div>\n      <div class="list_body" style="color:#777777;padding-top:0px;">\n        易托管户：<span class="">正式版</span><span style="margin-left: 1rem;color:#777777">托管规模：8000000.0</span>\n      </div>\n    </div>\n    <div class="list_detail">\n      详情\n    </div>\n  </div>\n\n  <div class="list_item" (click)="customerdetail()">\n    <div class="list_status"><span class="list_status_name" style="background: #E25156">互联网</span></div>\n    <div class="list_content">\n      <div class="list_name">\n        宁波天心企业咨询有限公司\n      </div>\n      <div class="list_body" style="color:#777777">\n        法人代表：<span class="">希维尔</span><span style="margin-left: 1rem;color:#777777">公司属性：投资贸易</span>\n      </div>\n      <div class="list_body" style="color:#777777;padding-top:0px;">\n        易托管户：<span class="">正式版</span><span style="margin-left: 1rem;color:#777777">托管规模：8000000.0</span>\n      </div>\n    </div>\n    <div class="list_detail">\n      详情\n    </div>\n  </div>\n\n\n\n  <!--<div class="list_item" (click)="customerdetail()">-->\n    <!--<div class="list_status"><span class="list_status_name" style="background: #E25156">互联网</span></div>-->\n    <!--<div class="list_content">-->\n      <!--<div class="list_name">-->\n        <!--宁波天心企业咨询有限公司-->\n      <!--</div>-->\n      <!--<div class="list_body" style="color:#89ACD6">-->\n        <!--当前规模:<span class="common_num">158236</span>万<span style="margin-left: 1rem;color:#777777">较年初：6666万</span>-->\n      <!--</div>-->\n      <!--<div class="list_body" style="color:#E25156;padding-top:0px;">-->\n        <!--当前收入:<span class="common_num">158236</span>万<span style="margin-left: 1rem;color:#777777">较年初：6666万</span>-->\n      <!--</div>-->\n    <!--</div>-->\n    <!--<div class="list_detail">-->\n      <!--详情-->\n    <!--</div>-->\n  <!--</div>-->\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\customermanagerlist\customermanagerlist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
    ], CustomermanagerlistPage);
    return CustomermanagerlistPage;
}());

//# sourceMappingURL=customermanagerlist.js.map

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomermanagerdetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customermanagerprodetail_customermanagerprodetail__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the CustomermanagerdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CustomermanagerdetailPage = (function () {
    function CustomermanagerdetailPage(navCtrl, navParams, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.customId = navParams.get("customId");
    }
    CustomermanagerdetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomermanagerdetailPage');
        this.getDetail();
    };
    //查看客户直辖项目列表
    CustomermanagerdetailPage.prototype.go_customerdetail = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__customermanagerprodetail_customermanagerprodetail__["a" /* CustomermanagerprodetailPage */], { customId: this.customId }, { animate: true });
    };
    //查询主界面的接口
    CustomermanagerdetailPage.prototype.getDetail = function () {
        var _this = this;
        var url = "home_g/home_g.json";
        // const url = "http://127.0.0.1:8000/mcrm/zwebmcrm/com.nbcb.pcrm.mcrm.mobile";
        var data = {
            "appId": "mcrm",
            "reqParam": {
                "customId": this.customId,
            },
            "serviceId": "auth.mcrmLogin"
        };
        this.httpService.getData({
            url: url,
            body: {}
        }).then(function (res) {
            _this.customDetail = res;
            console.log(_this.customDetail);
        });
    };
    CustomermanagerdetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customermanagerdetail',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\customermanagerdetail\customermanagerdetail.html"*/'<!--\n  Generated template for the CustomermanagerdetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>诺远资产管理有限公司</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <div class="detail_content" style="margin-bottom: 1.5rem;margin-top:3rem;">\n    <div class="detail_item">\n      <div class="item_name flex_one">公司属性</div>\n      <div class="item_name flex_four" style="border-right: 0px;text-align: center;">证券公司</div>\n    </div>\n\n    <div class="detail_item" style="border-top:0px;">\n      <div class="item_name flex_one">法人代表</div>\n      <div class="item_name flex_four" style="border-right: 0px;text-align: center;">林立</div>\n    </div>\n\n    <div class="detail_item" style="border-top:0px;">\n      <div class="item_name flex_one">成立日期</div>\n      <div class="item_name flex_four" style="border-right: 0px;text-align: center;">1997-06-18</div>\n    </div>\n\n    <div class="detail_item" style="border-top:0px;">\n      <div class="item_name flex_one">易托管户</div>\n      <div class="item_name flex_four" style="border-right: 0px;text-align: center;">正式版</div>\n    </div>\n\n    <div class="detail_item" style="border-top:0px;">\n      <div class="item_name flex_one">托管规模</div>\n      <div class="item_name flex_four" style="border-right: 0px;text-align: center;">80000000.00元</div>\n    </div>\n\n    <div class="detail_item" style="border-top:0px;">\n      <div class="item_name flex_one">下辖项目</div>\n      <div class="item_name flex_four" style="border-right: 0px;text-align: center;">\n        <a style="color:#005F93" (click)="go_customerdetail()">查看</a>\n      </div>\n    </div>\n  </div>\n\n  <div class="content_tip">\n     说明：托管规模指该客户在本分行/宁波地区支行的托管规模。\n  </div>\n</ion-content>\n\n\n<!--<ion-content style="background:#F5F6F7">-->\n    <!--<div class="content_title">宁波天心企业咨询有限公司</div>-->\n    <!--<div class="customer_content">-->\n      <!--<div class="detail_item">-->\n        <!--<div class="detail_title">公司属性</div>-->\n        <!--<div class="detail_content">证券公司</div>-->\n      <!--</div>-->\n    <!--</div>-->\n\n  <!--<div class="customer_content">-->\n    <!--<div class="detail_item">-->\n      <!--<div class="detail_title">法人代表</div>-->\n      <!--<div class="detail_content">李三</div>-->\n    <!--</div>-->\n  <!--</div>-->\n\n  <!--<div class="customer_content">-->\n    <!--<div class="detail_item">-->\n      <!--<div class="detail_title">成立日期</div>-->\n      <!--<div class="detail_content">2013-10-22</div>-->\n    <!--</div>-->\n  <!--</div>-->\n\n  <!--<div class="customer_content">-->\n    <!--<div class="detail_item">-->\n      <!--<div class="detail_title">易托管户</div>-->\n      <!--<div class="detail_content">正式版</div>-->\n    <!--</div>-->\n  <!--</div>-->\n\n  <!--<div class="customer_content">-->\n    <!--<div class="detail_item">-->\n      <!--<div class="detail_title">托管规模</div>-->\n      <!--<div class="detail_content">1000000.00元</div>-->\n    <!--</div>-->\n  <!--</div>-->\n\n  <!--<div class="customer_content">-->\n    <!--<div class="detail_item">-->\n      <!--<div class="detail_title">下辖项目</div>-->\n      <!--<div class="detail_content"><a style="color:#005F93" (click)="go_customerdetail()">查看</a></div>-->\n    <!--</div>-->\n  <!--</div>-->\n\n<!--</ion-content>-->\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\customermanagerdetail\customermanagerdetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
    ], CustomermanagerdetailPage);
    return CustomermanagerdetailPage;
}());

//# sourceMappingURL=customermanagerdetail.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RtprecordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the RtprecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RtprecordPage = (function () {
    function RtprecordPage(navCtrl, navParams, actionSheetCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
    }
    RtprecordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RtprecordPage');
    };
    RtprecordPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: '任务完成',
                    role: 'destructive',
                    handler: function () {
                        console.log('Destructive clicked');
                    }
                }, {
                    text: '任务失败',
                    handler: function () {
                        var prompt = _this.alertCtrl.create({
                            message: "请填写失败原因",
                            inputs: [
                                {
                                    name: '失败原因',
                                    placeholder: '请输入失败原因'
                                },
                            ],
                            buttons: [
                                {
                                    text: '确定',
                                    handler: function (data) {
                                        console.log(data);
                                    }
                                }
                            ]
                        });
                        prompt.present();
                    }
                }
            ]
        });
        actionSheet.present();
    };
    RtprecordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-rtprecord',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\rtprecord\rtprecord.html"*/'<!--\n  Generated template for the RtprecordPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>联系记录</ion-title>\n    <ion-icon class="call-out" ios="ios-call" md="md-call"></ion-icon>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background-color: #EEEEEE" padding>\n  <ion-row class="clearfix">\n    <ion-card-content class="recor-list releft" col-10>\n      <ion-icon class="phone-icon" ios="ios-call" md="md-call"></ion-icon>\n     <div class="rtp-person clearfix" col-12>\n       <span class="name left">陈杰英</span>\n       <span class="msg right">宁波银行信用卡中心</span>\n     </div>\n      <div class="rtp-time clearfix" col-12>\n        <span class="name left">15:21</span>\n        <span class="msg right">2018.2.22 15:16</span>\n      </div>\n    </ion-card-content>\n    <ion-card-content class="recor-list releft" col-10>\n      <ion-icon class="phone-icon" ios="ios-call" md="md-call"></ion-icon>\n      <div class="rtp-person clearfix" col-12>\n        <span class="name left">陈杰英</span>\n        <span class="msg right">宁波银行信用卡中心</span>\n      </div>\n      <div class="rtp-time clearfix" col-12>\n        <span class="name left">15:21</span>\n        <span class="msg right">2018.2.22 15:16</span>\n      </div>\n    </ion-card-content>\n\n    <ion-card-content class="recor-list clearfix reright" col-10>\n      <ion-icon class="mark-icon" ios="md-pricetag" md="md-pricetag"></ion-icon>\n      <div class="rtp-person clearfix" col-12>\n        <span class="name left">陈杰英</span>\n        <span class="msg right">宁波银行信用卡中心</span>\n      </div>\n\n      <div class="remark-cont">客户出国年后再约</div>\n\n      <div class="rtp-time clearfix" col-12>\n        <!--<span class="name left">15:21</span>-->\n        <span class="msg right">2018.2.22 15:16</span>\n      </div>\n    </ion-card-content>\n  </ion-row>\n\n\n  <div class="footer">\n    <!--[ngClass]="{\'bgIn\':clockFlag == \'1\',\'bgOut\':clockFlag == \'2\'}"-->\n    <div col-4 class="foot-btn">\n      <div class="footer-img" >\n        <div class="footer-img1 footer-imgall"></div>\n      </div>\n      <span  class="btn">修改日程</span>\n    </div>\n    <div col-4 class="foot-btn">\n      <div class="footer-img">\n        <div class="footer-img2 footer-imgall"></div>\n      </div>\n      <span  class="btn">上门签到</span>\n    </div>\n    <div (click)="presentActionSheet()" col-4 class="foot-btn">\n      <div class="footer-img">\n        <div class="footer-img3 footer-imgall"></div>\n      </div>\n      <span class="btn">任务关闭</span>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\rtprecord\rtprecord.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], RtprecordPage);
    return RtprecordPage;
}());

//# sourceMappingURL=rtprecord.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApprovedetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ApprovedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ApprovedetailPage = (function () {
    function ApprovedetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ApprovedetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ApprovedetailPage');
    };
    ApprovedetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-approvedetail',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\approvedetail\approvedetail.html"*/'<!--\n  Generated template for the ApprovedetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title class="app-title">尊享卡审批详情</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\approvedetail\approvedetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ApprovedetailPage);
    return ApprovedetailPage;
}());

//# sourceMappingURL=approvedetail.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThirdPath; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * 第三方方法引用
 */
var ThirdPath = (function () {
    function ThirdPath() {
        this.moment = __WEBPACK_IMPORTED_MODULE_1_moment__;
        try {
            this.UPCHAT = UPCHAT;
            this.BMap = BMap;
            this.AMap = AMap;
        }
        catch (e) {
        }
    }
    ThirdPath = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], ThirdPath);
    return ThirdPath;
}());

//# sourceMappingURL=third-path.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Contents; });
var Contents = (function () {
    function Contents() {
    }
    // static SERVICE_DEBUG_URL = "http://localhost:8100" //本地挡板
    // // static SERVICE_URL = "http://sso.topcheer.com:5000/ningbo/www" //公司服务器
    // static SERVICE_PROD_URL = "http://sso.topcheer.com:5000/webapp"
    //
    // static SERVICE_DATA_PROD = 'prod';  //生产服务
    // static SERVICE_DATA_LOCAL = 'local'; //本地服务
    // static SERVICE_DATA_DEBUG = 'debug';  //挡板数据
    //
    // static HTTP_PROJECT = "/assets/data";  //挡板项目名
    //Storage 存储
    Contents.STORAGE_TYPE = 'StorageType';
    Contents.STORAGE_VALUE_SESSION = 'session';
    Contents.STORAGE_VALUE_LOCAL = 'local';
    //Http
    Contents.HTTP_DATA_PROD = 'prod'; //生产服务
    Contents.HTTP_DATA_LOCAL = 'local'; //本地服务
    Contents.HTTP_DATA_DEBUG = 'debug'; //挡板数据
    Contents.HTTP_PROJECT = 'http://sso.topcheer.com:5000/ningbo/www'; //项目名
    // static HTTP_LOCAL_ORIGIN = 'http://12.99.106.20:90/pcrm/com.nbcb.pcrm.fmap.mobile';
    Contents.HTTP_LOCAL_ORIGIN = 'http://127.0.0.1:8000/mcrm/zwebmcrm/com.nbcb.pcrm.mcrm.mobile';
    // static HTTP_LOCAL_PORT = '8080';  //本地服务器端口
    Contents.HTTP_LOCAL_PORT = '8000'; //本地服务器端口
    Contents.HTTP_DATA_PATH = 'assets/data'; //挡板数据位置
    //serviceId
    //---------------------------------------------------------
    //登录
    Contents.AUTH_LOGIN = 'auth.mcrmLogin';
    //查询字典
    Contents.GENERAL_DICT = 'general.selectDict';
    //业绩墙-客户经理
    Contents.QUERY_PERSON_ACHIEVEMENT = 'report.mobile.achievement.queryPersonAchievement';
    //客户管理-正式客户列表
    Contents.QUERY_FORMAL_CUST_LIST = 'cust.mobile.formalCust.queryFormalCustList';
    //客户管理-正式客户详情
    Contents.QUERY_FORMAL_CUST_BASEINFO = 'cust.mobile.formalCust.queryFormalCustBaseInfo';
    return Contents;
}());

//# sourceMappingURL=Constants.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the CustomerlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CustomerlistPage = (function () {
    function CustomerlistPage(navCtrl, navParams, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.elseList = [];
        this.elseListiph = [];
        this.names = [];
        this.ipon = [];
        this.searchQuery = '';
    }
    CustomerlistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomerlistPage');
        // this.getpeoplefo();
    };
    //获取数据
    CustomerlistPage.prototype.getpeoplefo = function (e) {
        var _this = this;
        var searchText = e.target.value;
        // let names=[];
        var url = "performance/peoplelist.json";
        if (searchText && searchText.trim() != '') {
            this.httpService.getData({
                url: url,
                body: {
                    name: name,
                }
            })
                .then(function (res) {
                var pieData = res.resultRes.targetSummary;
                var array = [];
                var iphe = [];
                // for(let date of pieData){
                //   array.push(date.name);
                // }
                // for(let date of pieData){
                //   iphe.push(date.iph);
                // }
                // this.itemList = array;
                // this.elseListiph=iphe;
                // this.initializeItems(this.itemList);
                _this.elseList = pieData;
                console.log(_this.itemList);
            });
        }
    };
    //搜索人员
    // initializeItems(arr) {
    //   this.items = arr;
    //     // this.items=this.elseList;
    //   console.log(this.items);
    //
    // }
    // getItems(ev: any) {
    //   // Reset items back to all of the items
    //   this.initializeItems(this.itemList);
    //
    //   // set val to the value of the searchbar
    //   let val = ev.target.value;
    //
    //   // if the value is an empty string don't filter the items
    //   if (val && val.trim() != '') {
    //     this.items = this.items.filter((item) => {
    //       return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //     })
    //   }
    // }
    CustomerlistPage.prototype.itemSelected = function (itme, iph) {
        var _this = this;
        console.log(iph);
        this.callback = this.navParams.get('callback');
        this.callback(itme, iph).then(function () {
            _this.navCtrl.pop();
        });
    };
    CustomerlistPage.prototype.search = function (name) {
        console.log(name.value);
        this.getpeoplefo(name.value);
    };
    CustomerlistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customerlist',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\customerlist\customerlist.html"*/'<!--\n  Generated template for the CustomerlistPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>人员列表</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n\n\n  <div >\n    <ion-searchbar  placeholder="请输入姓名" (ionInput)="getpeoplefo($event)"></ion-searchbar>\n  </div>\n\n  <ion-list inset class="itemclass" *ngFor="let item of elseList">\n    <button ion-item  (click)="itemSelected(item.name,item.iph)">\n      {{ item.name }}\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\customerlist\customerlist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */]])
    ], CustomerlistPage);
    return CustomerlistPage;
}());

//# sourceMappingURL=customerlist.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PeoplereceptPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the PeoplereceptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PeoplereceptPage = (function () {
    function PeoplereceptPage(navCtrl, navParams, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.elseList = [];
        this.elseListiph = [];
        this.names = [];
        this.ipon = [];
        this.searchQuery = '';
    }
    PeoplereceptPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomerlistPage');
        // this.getpeoplefo();
    };
    //获取数据
    PeoplereceptPage.prototype.getpeoplefo = function (e) {
        var _this = this;
        //console.log(e);
        // let names=[];
        var searchText = e.target.value;
        //console.log(searchText);
        var url = "performance/peoplelist.json";
        if (searchText && searchText.trim() != '') {
            this.httpService.getData({
                url: url,
                body: {
                    name: searchText,
                }
            })
                .then(function (res) {
                var pieData = res.resultRes.targetSummary;
                var array = [];
                var iphe = [];
                // for(let date of pieData){
                //   array.push(date.name);
                // }
                // for(let date of pieData){
                //   iphe.push(date.iph);
                // }
                // this.itemList = array;
                // this.elseListiph=iphe;
                // this.initializeItems(this.itemList);
                _this.elseList = pieData;
                console.log(_this.itemList);
            });
        }
    };
    //搜索人员
    // initializeItems(arr) {
    //   this.items = arr;
    //     // this.items=this.elseList;
    //   console.log(this.items);
    //
    // }
    // getItems(ev: any) {
    //   // Reset items back to all of the items
    //   this.initializeItems(this.itemList);
    //
    //   // set val to the value of the searchbar
    //   let val = ev.target.value;
    //
    //   // if the value is an empty string don't filter the items
    //   if (val && val.trim() != '') {
    //     this.items = this.items.filter((item) => {
    //       return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //     })
    //   }
    // }
    PeoplereceptPage.prototype.itemSelected = function (itme, iph) {
        var _this = this;
        console.log(iph);
        this.callback = this.navParams.get('callback');
        this.callback(itme, iph).then(function () {
            _this.navCtrl.pop();
        });
    };
    PeoplereceptPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-peoplerecept',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\peoplerecept\peoplerecept.html"*/'<!--\n  Generated template for the CustomerlistPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>人员列表</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n\n  <div>\n    <ion-searchbar  placeholder="请输入姓名" (ionInput)="getpeoplefo($event)"></ion-searchbar>\n  </div>\n  <ion-list inset class="itemclass" *ngFor="let item of elseList" >\n    <button ion-item  (click)="itemSelected(item.name,item.iph)">\n      {{ item.name }}\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\peoplerecept\peoplerecept.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */]])
    ], PeoplereceptPage);
    return PeoplereceptPage;
}());

//# sourceMappingURL=peoplerecept.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarUtil; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__calendar_holiday__ = __webpack_require__(382);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CalendarUtil = (function () {
    function CalendarUtil(holiday) {
        var _this = this;
        this.holiday = holiday;
        /**
         * 农历1900-2100的润大小信息表
         * @Array Of Property
         * @return Hex
         */
        this.lunarInfo = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
            0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
            0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
            0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
            0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
            0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
            0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
            0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
            0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
            0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
            0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
            0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
            0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
            0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
            0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
            0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
            0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
            0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
            0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
            0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
            0x0d520]; //2100
        /**
         * 公历每个月份的天数普通表
         * @Array Of Property
         * @return Number
         */
        // private solarMonth:number[] = [31,28,31,30,31,30,31,31,30,31,30,31]
        /**
         * 天干地支之天干速查表
         * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
         * @return Cn string
         */
        this.Gan = ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"];
        /**
         * 天干地支之地支速查表
         * @Array Of Property
         * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
         * @return Cn string
         */
        this.Zhi = ["\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348",
            "\u672a", "\u7533", "\u9149", "\u620c", "\u4ea5"];
        /**
         * 天干地支之地支速查表<=>生肖
         * @Array Of Property
         * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
         * @return Cn string
         */
        this.Animals = ["\u9f20", "\u725b", "\u864e", "\u5154", "\u9f99", "\u86c7", "\u9a6c",
            "\u7f8a", "\u7334", "\u9e21", "\u72d7", "\u732a"];
        /**
         * 24节气速查表
         * @Array Of Property
         * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至",
         * "小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
         * @return Cn string
         */
        this.solarTerm = ["\u5c0f\u5bd2", "\u5927\u5bd2", "\u7acb\u6625", "\u96e8\u6c34",
            "\u60ca\u86f0", "\u6625\u5206", "\u6e05\u660e", "\u8c37\u96e8", "\u7acb\u590f",
            "\u5c0f\u6ee1", "\u8292\u79cd", "\u590f\u81f3", "\u5c0f\u6691", "\u5927\u6691",
            "\u7acb\u79cb", "\u5904\u6691", "\u767d\u9732", "\u79cb\u5206", "\u5bd2\u9732",
            "\u971c\u964d", "\u7acb\u51ac", "\u5c0f\u96ea", "\u5927\u96ea", "\u51ac\u81f3"];
        /**
         * 1900-2100各年的24节气日期速查表
         * @Array Of Property
         * @return 0x string For splice
         */
        this.sTermInfo = ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
            '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
            '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
            'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
            '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
            '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
            '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
            '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
            '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
            '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
            '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
            '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
            '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
            '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
            '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
            '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
            '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
            '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
            '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
            '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
            '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
            '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
            '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
            '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
            '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
            '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
            '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
            '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
            '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
            '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
            '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
            '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
            '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
            '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
            '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
            '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
            '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
            '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
            '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
            '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
            '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
            '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'];
        /**
         * 数字转中文速查表
         * @Array Of Property
         * @trans ['日','一','二','三','四','五','六','七','八','九','十']
         * @return Cn string
         */
        this.nStr1 = ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03",
            "\u516b", "\u4e5d", "\u5341"];
        /**
         * 日期转农历称呼速查表
         * @Array Of Property
         * @trans ['初','十','廿','卅']
         * @return Cn string
         */
        this.nStr2 = ["\u521d", "\u5341", "\u5eff", "\u5345"];
        /**
         * 月份转农历称呼速查表
         * @Array Of Property
         * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
         * @return Cn string
         */
        this.nStr3 = ["\u6b63", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03",
            "\u516b", "\u4e5d", "\u5341", "\u51ac", "\u814a"];
        //公历节日
        this.sFtv = [
            "0101 元旦",
            "0214 情人节",
            "0308 妇女节",
            "0312 植树节",
            "0315 消费者权益日",
            "0401 愚人节",
            "0501 劳动节",
            "0504 青年节",
            "0512 护士节",
            "0601 儿童节",
            "0701 建党节",
            "0801 建军节",
            "0903 抗战胜利日",
            "0910 教师节",
            "0928 孔子诞辰",
            "1001 国庆节",
            "1006 老人节",
            "1024 联合国日",
            "1224 平安夜",
            "1225 圣诞节"
        ];
        //农历节日
        this.lFtv = [
            "0101 春节",
            "0115 元宵节",
            "0505 端午节",
            "0707 七夕",
            "0715 中元节",
            "0815 中秋节",
            "0909 重阳节",
            "1208 腊八节",
            "1224 小年"
        ];
        /**
         * 返回农历y年一整年的总天数
         * @param year lunar Year
         * @return Number
         * @eg:var count = calendar.lYearDays(1987) ;//count=387
         */
        this.lYearDays = function (year) {
            var i, sum = 348;
            for (i = 0x8000; i > 0x8; i >>= 1) {
                sum += (_this.lunarInfo[year - 1900] & i) ? 1 : 0;
            }
            return (sum + _this.leapDays(year));
        };
        /**
         * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
         * @param year lunar Year
         * @return Number (0-12)
         * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
         */
        this.leapMonth = function (year) {
            return (_this.lunarInfo[year - 1900] & 0xf);
        };
        /**
         * 返回农历y年闰月的天数 若该年没有闰月则返回0
         * @param year lunar Year
         * @return Number (0、29、30)
         * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
         */
        this.leapDays = function (year) {
            if (_this.leapMonth(year)) {
                return ((_this.lunarInfo[year - 1900] & 0x10000) ? 30 : 29);
            }
            return (0);
        };
        /**
         * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
         * @param year  lunar Year
         * @param month  lunar month
         * @return Number (-1、29、30)
         * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
         */
        this.monthDays = function (year, month) {
            if (month > 12 || month < 1) {
                return -1;
            } //月份参数从1至12，参数错误返回-1
            return ((_this.lunarInfo[year - 1900] & (0x10000 >> month)) ? 30 : 29);
        };
        /**
         * 农历年份转换为干支纪年
         * @param  lYear 农历年的年份数
         * @return Cn string
         */
        this.toGanZhiYear = function (lYear) {
            var ganKey = (lYear - 3) % 10;
            var zhiKey = (lYear - 3) % 12;
            if (ganKey == 0)
                ganKey = 10; //如果余数为0则为最后一个天干
            if (zhiKey == 0)
                zhiKey = 12; //如果余数为0则为最后一个地支
            return _this.Gan[ganKey - 1] + _this.Zhi[zhiKey - 1];
        };
        /**
         * 公历月、日判断所属星座
         * @param  cMonth [description]
         * @param  cDay [description]
         * @return Cn string
         */
        this.toAstro = function (cMonth, cDay) {
            var s = "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
            var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
            return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5ea7"; //座
        };
        /**
         * 传入offset偏移量返回干支
         * @param offset 相对甲子的偏移量
         * @return Cn string
         */
        this.toGanZhi = function (offset) {
            return _this.Gan[offset % 10] + _this.Zhi[offset % 12];
        };
        /**
         * 传入公历(!)y年获得该年第n个节气的公历日期
         * @param year 公历年(1900-2100)
         * @param number 二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
         * @return day Number
         * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
         */
        this.getTerm = function (year, number) {
            if (year < 1900 || year > 2100) {
                return -1;
            }
            if (number < 1 || number > 24) {
                return -1;
            }
            var _table = _this.sTermInfo[year - 1900];
            var _info = [
                parseInt('0x' + _table.substr(0, 5)).toString(),
                parseInt('0x' + _table.substr(5, 5)).toString(),
                parseInt('0x' + _table.substr(10, 5)).toString(),
                parseInt('0x' + _table.substr(15, 5)).toString(),
                parseInt('0x' + _table.substr(20, 5)).toString(),
                parseInt('0x' + _table.substr(25, 5)).toString()
            ];
            var _calday = [
                _info[0].substr(0, 1),
                _info[0].substr(1, 2),
                _info[0].substr(3, 1),
                _info[0].substr(4, 2),
                _info[1].substr(0, 1),
                _info[1].substr(1, 2),
                _info[1].substr(3, 1),
                _info[1].substr(4, 2),
                _info[2].substr(0, 1),
                _info[2].substr(1, 2),
                _info[2].substr(3, 1),
                _info[2].substr(4, 2),
                _info[3].substr(0, 1),
                _info[3].substr(1, 2),
                _info[3].substr(3, 1),
                _info[3].substr(4, 2),
                _info[4].substr(0, 1),
                _info[4].substr(1, 2),
                _info[4].substr(3, 1),
                _info[4].substr(4, 2),
                _info[5].substr(0, 1),
                _info[5].substr(1, 2),
                _info[5].substr(3, 1),
                _info[5].substr(4, 2),
            ];
            return parseInt(_calday[number - 1]);
        };
        /**
         * 传入农历数字月份返回汉语通俗表示法
         * @param month   lunar month
         * @return Cn string
         * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
         */
        this.toChinaMonth = function (month) {
            if (month > 12 || month < 1) {
                return '-1';
            } //若参数错误 返回-1
            var s = _this.nStr3[month - 1];
            s += "\u6708"; //加上月字
            return s;
        };
        /**
         * 传入农历日期数字返回汉字表示法
         * @param day   lunar day
         * @return Cn string
         * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
         */
        this.toChinaDay = function (day) {
            var s;
            switch (day) {
                case 10:
                    s = '\u521d\u5341';
                    break;
                case 20:
                    s = '\u4e8c\u5341';
                    break;
                case 30:
                    s = '\u4e09\u5341';
                    break;
                default:
                    s = _this.nStr2[Math.floor(day / 10)];
                    s += _this.nStr1[day % 10];
            }
            return (s);
        };
        /**
         * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
         * @param year year
         * @return Cn string
         * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
         */
        this.getAnimal = function (year) {
            return _this.Animals[(year - 4) % 12];
        };
        /**
         * 获取公历的节日
         * @param month
         * @param day
         */
        this.getSFtv = function (year, month, day) {
            for (var ipp = 0; ipp < _this.sFtv.length; ipp++) {
                if (parseInt(_this.sFtv[ipp].substr(0, 2)) == (month)) {
                    if (parseInt(_this.sFtv[ipp].substr(2, 2)) == (day)) {
                        return _this.sFtv[ipp].substr(5);
                    }
                }
            }
            var date = new Date(year, parseInt(month) - 1, day), w = date.getDay(), d = date.getDate();
            var fat = Math.ceil((d + 6 - w) / 7);
            if ((month) == 5) {
                if (w == 0 && fat == 3) {
                    return '母亲节';
                }
            }
            if ((month) == 6) {
                if (w == 0 && fat == 4) {
                    return '父亲节';
                }
            }
            return '';
        };
        /**
         * 获取公历的节日
         * @param month
         * @param day
         */
        this.getLFtv = function (month, day) {
            for (var ipp = 0; ipp < _this.lFtv.length; ipp++) {
                if (parseInt(_this.lFtv[ipp].substr(0, 2)) == (month)) {
                    if (parseInt(_this.lFtv[ipp].substr(2, 2)) == (day)) {
                        return _this.lFtv[ipp].substr(5);
                    }
                }
            }
            if (12 == (month)) {
                if (30 == (day)) {
                    return '除夕';
                }
            }
            return '';
        };
        this.getHoliday = function (year, month, day) {
            var y = year;
            var m = month < 10 ? '0' + month : month;
            var d = day < 10 ? '0' + day : day;
            //0:不需要标注 1:需要标注上班  2：需要标注休假
            return _this.holiday.date[y + '/' + m + '/' + d] || 0;
        };
        /**
         * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
         * @param year  solar year
         * @param month  solar month
         * @param day  solar day
         * @return JSON object
         * @eg:console.log(calendar.solar2lunar(1987,11,01));
         */
        this.solar2lunar = function (year, month, day) {
            //年份限定、上限
            if (year < 1900 || year > 2100) {
                return -1; // undefined转换为数字变为NaN
            }
            //公历传参最下限
            if (year == 1900 && month == 1 && day < 31) {
                return -1;
            }
            //未传参  获得当天
            var objDate;
            if (!year) {
                objDate = new Date();
            }
            else {
                objDate = new Date(year, parseInt(month) - 1, day);
            }
            var i, temp = 0;
            //修正ymd参数
            var y = objDate.getFullYear(), m = objDate.getMonth() + 1, d = objDate.getDate();
            var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
            for (i = 1900; i < 2101 && offset > 0; i++) {
                temp = _this.lYearDays(i);
                offset -= temp;
            }
            if (offset < 0) {
                offset += temp;
                i--;
            }
            //是否今天
            var isTodayObj = new Date(), isToday = false;
            if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
                isToday = true;
            }
            //星期几
            var nWeek = objDate.getDay(), cWeek = _this.nStr1[nWeek];
            //数字表示周几顺应天朝周一开始的惯例
            if (nWeek == 0) {
                nWeek = 7;
            }
            //农历年
            var lyear = i;
            var leap = _this.leapMonth(i); //闰哪个月
            var isLeap = false;
            //效验闰月
            for (i = 1; i < 13 && offset > 0; i++) {
                //闰月
                if (leap > 0 && i == (leap + 1) && isLeap == false) {
                    --i;
                    isLeap = true;
                    temp = _this.leapDays(lyear); //计算农历闰月天数
                }
                else {
                    temp = _this.monthDays(lyear, i); //计算农历普通月天数
                }
                //解除闰月
                if (isLeap == true && i == (leap + 1)) {
                    isLeap = false;
                }
                offset -= temp;
            }
            // 闰月导致数组下标重叠取反
            if (offset == 0 && leap > 0 && i == leap + 1) {
                if (isLeap) {
                    isLeap = false;
                }
                else {
                    isLeap = true;
                    --i;
                }
            }
            if (offset < 0) {
                offset += temp;
                --i;
            }
            //农历月
            var lmonth = i;
            //农历日
            var lday = offset + 1;
            //天干地支处理
            var sm = m - 1;
            var gzY = _this.toGanZhiYear(lyear);
            // 当月的两个节气
            // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
            var firstNode = _this.getTerm(y, (m * 2 - 1)); //返回当月「节」为几日开始
            var secondNode = _this.getTerm(y, (m * 2)); //返回当月「节」为几日开始
            // 依据12节气修正干支月
            var gzM = _this.toGanZhi((y - 1900) * 12 + m + 11);
            if (d >= firstNode) {
                gzM = _this.toGanZhi((y - 1900) * 12 + m + 12);
            }
            //传入的日期的节气与否
            var isTerm = false;
            var Term = null;
            if (firstNode == d) {
                isTerm = true;
                Term = _this.solarTerm[m * 2 - 2];
            }
            if (secondNode == d) {
                isTerm = true;
                Term = _this.solarTerm[m * 2 - 1];
            }
            //日柱 当月一日与 1900/1/1 相差天数
            var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
            var gzD = _this.toGanZhi(dayCyclical + d - 1);
            //该日期所属的星座
            var astro = _this.toAstro(m, d);
            return { 'lYear': lyear, 'lMonth': lmonth, 'lDay': lday,
                'Animal': _this.getAnimal(lyear), 'IMonthCn': (isLeap ? "\u95f0" : '') + _this.toChinaMonth(lmonth),
                'IDayCn': _this.toChinaDay(lday), 'cYear': y, 'cMonth': m, 'cDay': d,
                'gzYear': gzY, 'gzMonth': gzM, 'gzDay': gzD, 'isToday': isToday,
                'sFtv': _this.getSFtv(y, m, d), 'lFtv': _this.getLFtv(lmonth, lday), 'holiday': _this.getHoliday(y, m, d),
                'isLeap': isLeap, 'nWeek': nWeek, 'ncWeek': "\u661f\u671f" + cWeek, 'isTerm': isTerm, 'Term': Term, 'astro': astro };
        };
    }
    CalendarUtil = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__calendar_holiday__["a" /* CalendarHoliday */]])
    ], CalendarUtil);
    return CalendarUtil;
}());

//# sourceMappingURL=calendar.util.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarHoliday; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CalendarHoliday = (function () {
    function CalendarHoliday() {
        //1为上班  2为休假
        this.date = {};
    }
    CalendarHoliday = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], CalendarHoliday);
    return CalendarHoliday;
}());

//# sourceMappingURL=calendar.holiday.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(405);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_formalcust_formalcust__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_formalparticulars_formalparticulars__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_potentialcust_potentialcust__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_potentialcustdetails_potentialcustdetails__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_potentialcustedit_potentialcustedit__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_otherdetailpage_otherdetailpage__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_targetdetail_targetdetail__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_HttpService__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_common_http__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_carddetil_carddetil__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_approve_approve__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_approvedetail_approvedetail__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_addotherpage_addotherpage__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_camera_camera__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_third_path_third_path__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser_animations__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_addmeetinginfo_addmeetinginfo__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_visit_visit__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_customerlist_customerlist__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_reception_reception__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_peoplerecept_peoplerecept__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_tabs_tabs__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_report_report__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_mine_mine__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_knowledge_knowledge__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_home_home__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_about_about__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_calendar_calendar_module__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_enjoycard_enjoycard__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_examinerecord_examinerecord__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_rtprecord_rtprecord__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_bulletin_bulletin__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_largeremind_largeremind__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_myapprove_myapprove__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_myapprovedetil_myapprovedetil__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_advancemoney_advancemoney__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_arrivalremind_arrivalremind__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_opinionfedb_opinionfedb__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_funddailyreport_funddailyreport__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_branchlinereport_branchlinereport__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_largechangereport_largechangereport__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_approvedpending_approvedpending__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_approvedpenddetail_approvedpenddetail__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_businessreport_businessreport__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pages_searchlist_searchlist__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_customer_customer__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__pages_customerdetail_customerdetail__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_project_project__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__pages_projectDetail_projectDetail__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__pages_rate_rate__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__pages_rateDetail_rateDetail__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__pages_accountSearch_accountSearch__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__pages_accountDetail_accountDetail__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__pages_balance_balance__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__pages_balanceDetail_balanceDetail__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__pages_businessreportdetail_businessreportdetail__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__pages_customermanager_customermanager__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__pages_customermanagerlist_customermanagerlist__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__pages_customermanagerdetail_customermanagerdetail__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__pages_addplanpage_addplanpage__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__pages_addreport_addreport__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__pages_approveprojectdetail_approveprojectdetail__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__pages_approveindiadetail_approveindiadetail__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__pages_approvewechartdetail_approvewechartdetail__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__pages_customermanagerprodetail_customermanagerprodetail__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__pages_visitlist_visitlist__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__pages_visidetail_visidetail__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__pages_prompt_prompt__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__pages_attendees_attendees__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__pages_addattend_addattend__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__pages_workbench_workbench__ = __webpack_require__(224);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














































































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_28__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_knowledge_knowledge__["a" /* KnowledgePage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_mine_mine__["a" /* MinePage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_report_report__["a" /* ReportPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_otherdetailpage_otherdetailpage__["a" /* OtherDetailPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_formalcust_formalcust__["a" /* FormalcustPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_formalparticulars_formalparticulars__["a" /* FormalparticularsPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_carddetil_carddetil__["a" /* CarddetilPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_potentialcust_potentialcust__["a" /* PotentialcustPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_potentialcustdetails_potentialcustdetails__["a" /* PotentialcustdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_potentialcustedit_potentialcustedit__["a" /* PotentialcusteditPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_approve_approve__["a" /* ApprovePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_approvedetail_approvedetail__["a" /* ApprovedetailPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_addotherpage_addotherpage__["a" /* AddOtherPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_camera_camera__["a" /* CameraPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_addmeetinginfo_addmeetinginfo__["a" /* AddmeetinginfoPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_visit_visit__["a" /* VisitPage */],
                __WEBPACK_IMPORTED_MODULE_77__pages_workbench_workbench__["a" /* WorkBench */],
                __WEBPACK_IMPORTED_MODULE_25__pages_customerlist_customerlist__["a" /* CustomerlistPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_targetdetail_targetdetail__["a" /* TargetdetailPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_reception_reception__["a" /* ReceptionPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_peoplerecept_peoplerecept__["a" /* PeoplereceptPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_enjoycard_enjoycard__["a" /* EnjoycardPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_examinerecord_examinerecord__["a" /* ExaminerecordPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_rtprecord_rtprecord__["a" /* RtprecordPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_bulletin_bulletin__["a" /* BulletinPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_largeremind_largeremind__["a" /* LargeremindPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_myapprove_myapprove__["a" /* MyapprovePage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_myapprovedetil_myapprovedetil__["a" /* MyapprovedetilPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_advancemoney_advancemoney__["a" /* AdvancemoneyPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_arrivalremind_arrivalremind__["a" /* ArrivalremindPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_opinionfedb_opinionfedb__["a" /* OpinionfedbPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_funddailyreport_funddailyreport__["a" /* FunddailyreportPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_branchlinereport_branchlinereport__["a" /* BranchlinereportPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_largechangereport_largechangereport__["a" /* LargechangereportPage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_searchlist_searchlist__["a" /* SearchlistPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_customer_customer__["a" /* CustomerPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_customerdetail_customerdetail__["a" /* CustomerDetailPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_project_project__["a" /* ProjectPage */],
                __WEBPACK_IMPORTED_MODULE_55__pages_projectDetail_projectDetail__["a" /* ProjectDetailPage */],
                __WEBPACK_IMPORTED_MODULE_56__pages_rate_rate__["a" /* RatePage */],
                __WEBPACK_IMPORTED_MODULE_57__pages_rateDetail_rateDetail__["a" /* RateDetailPage */],
                __WEBPACK_IMPORTED_MODULE_58__pages_accountSearch_accountSearch__["a" /* AccountSearchPage */],
                __WEBPACK_IMPORTED_MODULE_59__pages_accountDetail_accountDetail__["a" /* AccountDetailPage */],
                __WEBPACK_IMPORTED_MODULE_60__pages_balance_balance__["a" /* BalancePage */],
                __WEBPACK_IMPORTED_MODULE_61__pages_balanceDetail_balanceDetail__["a" /* BalanceDetailPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_approvedpending_approvedpending__["a" /* ApprovedpendingPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_approvedpenddetail_approvedpenddetail__["a" /* ApprovedpenddetailPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_businessreport_businessreport__["a" /* BusinessreportPage */],
                __WEBPACK_IMPORTED_MODULE_62__pages_businessreportdetail_businessreportdetail__["a" /* BusinessreportdetailPage */],
                __WEBPACK_IMPORTED_MODULE_63__pages_customermanager_customermanager__["a" /* CustomermanagerPage */],
                __WEBPACK_IMPORTED_MODULE_64__pages_customermanagerlist_customermanagerlist__["a" /* CustomermanagerlistPage */],
                __WEBPACK_IMPORTED_MODULE_65__pages_customermanagerdetail_customermanagerdetail__["a" /* CustomermanagerdetailPage */],
                __WEBPACK_IMPORTED_MODULE_66__pages_addplanpage_addplanpage__["a" /* AddplanpagePage */],
                __WEBPACK_IMPORTED_MODULE_67__pages_addreport_addreport__["a" /* addreportPage */],
                __WEBPACK_IMPORTED_MODULE_68__pages_approveprojectdetail_approveprojectdetail__["a" /* ApproveprojectdetailPage */],
                __WEBPACK_IMPORTED_MODULE_69__pages_approveindiadetail_approveindiadetail__["a" /* ApproveindiadetailPage */],
                __WEBPACK_IMPORTED_MODULE_70__pages_approvewechartdetail_approvewechartdetail__["a" /* ApprovewechartdetailPage */],
                __WEBPACK_IMPORTED_MODULE_71__pages_customermanagerprodetail_customermanagerprodetail__["a" /* CustomermanagerprodetailPage */],
                __WEBPACK_IMPORTED_MODULE_72__pages_visitlist_visitlist__["a" /* VisitlistPage */],
                __WEBPACK_IMPORTED_MODULE_73__pages_visidetail_visidetail__["a" /* VisidetailPage */],
                __WEBPACK_IMPORTED_MODULE_74__pages_prompt_prompt__["a" /* PromptPage */],
                __WEBPACK_IMPORTED_MODULE_75__pages_attendees_attendees__["a" /* AttendeesPage */],
                __WEBPACK_IMPORTED_MODULE_76__pages_addattend_addattend__["a" /* AddattendPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_34__components_calendar_calendar_module__["a" /* CalendarModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                    mode: "ios",
                    backButtonText: "",
                    backButtonIcon: 'ios-arrow-back',
                    tabsHideOnSubPages: true,
                    platforms: {
                        ios: {
                            menuType: "overlay"
                        }
                    }
                }, {
                    links: [
                        { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/accountDetail/accountDetail.module#AccountDetailPageModule', name: 'AccountDetailPage', segment: 'accountDetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/accountSearch/accountSearch.module#AccountSearchPageModule', name: 'AccountSearchPage', segment: 'accountSearch', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/addattend/addattend.module#AddattendPageModule', name: 'AddattendPage', segment: 'addattend', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/addmeetinginfo/addmeetinginfo.module#AddmeetinginfoPageModule', name: 'AddmeetinginfoPage', segment: 'addmeetinginfo', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/addotherpage/addotherpage.module#AddOtherPageModule', name: 'AddOtherPage', segment: 'addotherpage', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/addplanpage/addplanpage.module#AddplanpagePageModule', name: 'AddplanpagePage', segment: 'addplanpage', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/advancemoney/advancemoney.module#AdvancemoneyPageModule', name: 'AdvancemoneyPage', segment: 'advancemoney', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/approve/approve.module#ApprovePageModule', name: 'ApprovePage', segment: 'approve', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/approvedetail/approvedetail.module#ApprovedetailPageModule', name: 'ApprovedetailPage', segment: 'approvedetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/approvedpenddetail/approvedpenddetail.module#ApprovedpenddetailPageModule', name: 'ApprovedpenddetailPage', segment: 'approvedpenddetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/approvedpending/approvedpending.module#ApprovedpendingPageModule', name: 'ApprovedpendingPage', segment: 'approvedpending', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/approveindiadetail/approveindiadetail.module#ApproveindiadetailPageModule', name: 'ApproveindiadetailPage', segment: 'approveindiadetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/approveprojectdetail/approveprojectdetail.module#ApproveprojectdetailPageModule', name: 'ApproveprojectdetailPage', segment: 'approveprojectdetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/approvewechartdetail/approvewechartdetail.module#ApprovewechartdetailPageModule', name: 'ApprovewechartdetailPage', segment: 'approvewechartdetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/arrivalremind/arrivalremind.module#ArrivalremindPageModule', name: 'ArrivalremindPage', segment: 'arrivalremind', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/attendees/attendees.module#AttendeesPageModule', name: 'AttendeesPage', segment: 'attendees', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/balance/balance.module#BalancePageModule', name: 'BalancePage', segment: 'balance', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/balanceDetail/balanceDetail.module#BalanceDetailPageModule', name: 'BalanceDetailPage', segment: 'balanceDetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/branchlinereport/branchlinereport.module#BranchlinereportPageModule', name: 'BranchlinereportPage', segment: 'branchlinereport', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/bulletin/bulletin.module#BulletinPageModule', name: 'BulletinPage', segment: 'bulletin', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/businessreport/businessreport.module#BusinessreportPageModule', name: 'BusinessreportPage', segment: 'businessreport', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/businessreportdetail/businessreportdetail.module#BusinessreportdetailPageModule', name: 'BusinessreportdetailPage', segment: 'businessreportdetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/camera/camera.module#CameraPageModule', name: 'CameraPage', segment: 'camera', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/carddetil/carddetil.module#CarddetilPageModule', name: 'CarddetilPage', segment: 'carddetil', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer/customer.module#CustomerPageModule', name: 'CustomerPage', segment: 'customer', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customerdetail/customerdetail.module#CustomerDetailPageModule', name: 'CustomerDetailPage', segment: 'customerdetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customerlist/customerlist.module#CustomerlistPageModule', name: 'CustomerlistPage', segment: 'customerlist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customermanager/customermanager.module#CustomermanagerPageModule', name: 'CustomermanagerPage', segment: 'customermanager', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customermanagerdetail/customermanagerdetail.module#CustomermanagerdetailPageModule', name: 'CustomermanagerdetailPage', segment: 'customermanagerdetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customermanagerlist/customermanagerlist.module#CustomermanagerlistPageModule', name: 'CustomermanagerlistPage', segment: 'customermanagerlist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customermanagerprodetail/customermanagerprodetail.module#CustomermanagerprodetailPageModule', name: 'CustomermanagerprodetailPage', segment: 'customermanagerprodetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/enjoycard/enjoycard.module#EnjoycardPageModule', name: 'EnjoycardPage', segment: 'enjoycard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/examinerecord/examinerecord.module#ExaminerecordPageModule', name: 'ExaminerecordPage', segment: 'examinerecord', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/formalcust/formalcust.module#FormalcustPageModule', name: 'FormalcustPage', segment: 'formalcust', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/formalparticulars/formalparticulars.module#FormalparticularsPageModule', name: 'FormalparticularsPage', segment: 'formalparticulars', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/funddailyreport/funddailyreport.module#FunddailyreportPageModule', name: 'FunddailyreportPage', segment: 'funddailyreport', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/knowledge/knowledge.module#KnowledgePageModule', name: 'KnowledgePage', segment: 'knowledge', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/largechangereport/largechangereport.module#LargechangereportPageModule', name: 'LargechangereportPage', segment: 'largechangereport', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/largeremind/largeremind.module#LargeremindPageModule', name: 'LargeremindPage', segment: 'largeremind', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mine/mine.module#MinePageModule', name: 'MinePage', segment: 'mine', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/myapprove/myapprove.module#MyapprovePageModule', name: 'MyapprovePage', segment: 'myapprove', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/myapprovedetil/myapprovedetil.module#MyapprovedetilPageModule', name: 'MyapprovedetilPage', segment: 'myapprovedetil', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/opinionfedb/opinionfedb.module#OpinionfedbPageModule', name: 'OpinionfedbPage', segment: 'opinionfedb', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/otherdetailpage/otherdetailpage.module#OtherDetailPageModule', name: 'OtherDetailPage', segment: 'otherdetailpage', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/peoplerecept/peoplerecept.module#PeoplereceptPageModule', name: 'PeoplereceptPage', segment: 'peoplerecept', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/potentialcust/potentialcust.module#PotentialcustPageModule', name: 'PotentialcustPage', segment: 'potentialcust', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/potentialcustdetails/potentialcustdetails.module#PotentialcustdetailsPageModule', name: 'PotentialcustdetailsPage', segment: 'potentialcustdetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/potentialcustedit/potentialcustedit.module#PotentialcusteditPageModule', name: 'PotentialcusteditPage', segment: 'potentialcustedit', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/project/project.module#ProjectPageModule', name: 'ProjectPage', segment: 'project', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/projectDetail/projectDetail.module#ProjectDetailPageModule', name: 'ProjectDetailPage', segment: 'projectDetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/prompt/prompt.module#PromptPageModule', name: 'PromptPage', segment: 'prompt', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/rate/rate.module#RatePageModule', name: 'RatePage', segment: 'rate', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/rateDetail/rateDetail.module#RateDetailPageModule', name: 'RateDetailPage', segment: 'rateDetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reception/reception.module#ReceptionPageModule', name: 'ReceptionPage', segment: 'reception', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/regularclient/regularclient.module#RegularclientPageModule', name: 'RegularclientPage', segment: 'regularclient', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/rtprecord/rtprecord.module#RtprecordPageModule', name: 'RtprecordPage', segment: 'rtprecord', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/report/report.module#ReportPageModule', name: 'ReportPage', segment: 'report', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/searchlist/searchlist.module#SearchlistPageModule', name: 'SearchlistPage', segment: 'searchlist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/targetdetail/targetdetail.module#TargetdetailPageModule', name: 'TargetdetailPage', segment: 'targetdetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'tabs', segment: 'tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/visit/visit.module#VisitPageModule', name: 'VisitPage', segment: 'visit', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/visitlist/visitlist.module#VisitlistPageModule', name: 'VisitlistPage', segment: 'visitlist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/workbench/workbench.module#WorkBenchModule', name: 'WorkBench', segment: 'workbench', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/visidetail/visidetail.module#VisidetailPageModule', name: 'VisidetailPage', segment: 'visidetail', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_15__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_28__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_77__pages_workbench_workbench__["a" /* WorkBench */],
                __WEBPACK_IMPORTED_MODULE_31__pages_knowledge_knowledge__["a" /* KnowledgePage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_mine_mine__["a" /* MinePage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_report_report__["a" /* ReportPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_otherdetailpage_otherdetailpage__["a" /* OtherDetailPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_formalcust_formalcust__["a" /* FormalcustPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_formalparticulars_formalparticulars__["a" /* FormalparticularsPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_carddetil_carddetil__["a" /* CarddetilPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_potentialcust_potentialcust__["a" /* PotentialcustPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_potentialcustdetails_potentialcustdetails__["a" /* PotentialcustdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_potentialcustedit_potentialcustedit__["a" /* PotentialcusteditPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_approve_approve__["a" /* ApprovePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_approvedetail_approvedetail__["a" /* ApprovedetailPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_addotherpage_addotherpage__["a" /* AddOtherPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_camera_camera__["a" /* CameraPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_addmeetinginfo_addmeetinginfo__["a" /* AddmeetinginfoPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_visit_visit__["a" /* VisitPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_customerlist_customerlist__["a" /* CustomerlistPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_targetdetail_targetdetail__["a" /* TargetdetailPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_reception_reception__["a" /* ReceptionPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_peoplerecept_peoplerecept__["a" /* PeoplereceptPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_enjoycard_enjoycard__["a" /* EnjoycardPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_examinerecord_examinerecord__["a" /* ExaminerecordPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_rtprecord_rtprecord__["a" /* RtprecordPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_bulletin_bulletin__["a" /* BulletinPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_largeremind_largeremind__["a" /* LargeremindPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_myapprove_myapprove__["a" /* MyapprovePage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_myapprovedetil_myapprovedetil__["a" /* MyapprovedetilPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_advancemoney_advancemoney__["a" /* AdvancemoneyPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_arrivalremind_arrivalremind__["a" /* ArrivalremindPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_opinionfedb_opinionfedb__["a" /* OpinionfedbPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_funddailyreport_funddailyreport__["a" /* FunddailyreportPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_branchlinereport_branchlinereport__["a" /* BranchlinereportPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_largechangereport_largechangereport__["a" /* LargechangereportPage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_searchlist_searchlist__["a" /* SearchlistPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_customer_customer__["a" /* CustomerPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_customerdetail_customerdetail__["a" /* CustomerDetailPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_project_project__["a" /* ProjectPage */],
                __WEBPACK_IMPORTED_MODULE_55__pages_projectDetail_projectDetail__["a" /* ProjectDetailPage */],
                __WEBPACK_IMPORTED_MODULE_56__pages_rate_rate__["a" /* RatePage */],
                __WEBPACK_IMPORTED_MODULE_57__pages_rateDetail_rateDetail__["a" /* RateDetailPage */],
                __WEBPACK_IMPORTED_MODULE_58__pages_accountSearch_accountSearch__["a" /* AccountSearchPage */],
                __WEBPACK_IMPORTED_MODULE_59__pages_accountDetail_accountDetail__["a" /* AccountDetailPage */],
                __WEBPACK_IMPORTED_MODULE_60__pages_balance_balance__["a" /* BalancePage */],
                __WEBPACK_IMPORTED_MODULE_61__pages_balanceDetail_balanceDetail__["a" /* BalanceDetailPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_approvedpending_approvedpending__["a" /* ApprovedpendingPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_approvedpenddetail_approvedpenddetail__["a" /* ApprovedpenddetailPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_businessreport_businessreport__["a" /* BusinessreportPage */],
                __WEBPACK_IMPORTED_MODULE_62__pages_businessreportdetail_businessreportdetail__["a" /* BusinessreportdetailPage */],
                __WEBPACK_IMPORTED_MODULE_63__pages_customermanager_customermanager__["a" /* CustomermanagerPage */],
                __WEBPACK_IMPORTED_MODULE_64__pages_customermanagerlist_customermanagerlist__["a" /* CustomermanagerlistPage */],
                __WEBPACK_IMPORTED_MODULE_65__pages_customermanagerdetail_customermanagerdetail__["a" /* CustomermanagerdetailPage */],
                __WEBPACK_IMPORTED_MODULE_66__pages_addplanpage_addplanpage__["a" /* AddplanpagePage */],
                __WEBPACK_IMPORTED_MODULE_67__pages_addreport_addreport__["a" /* addreportPage */],
                __WEBPACK_IMPORTED_MODULE_68__pages_approveprojectdetail_approveprojectdetail__["a" /* ApproveprojectdetailPage */],
                __WEBPACK_IMPORTED_MODULE_69__pages_approveindiadetail_approveindiadetail__["a" /* ApproveindiadetailPage */],
                __WEBPACK_IMPORTED_MODULE_70__pages_approvewechartdetail_approvewechartdetail__["a" /* ApprovewechartdetailPage */],
                __WEBPACK_IMPORTED_MODULE_71__pages_customermanagerprodetail_customermanagerprodetail__["a" /* CustomermanagerprodetailPage */],
                __WEBPACK_IMPORTED_MODULE_72__pages_visitlist_visitlist__["a" /* VisitlistPage */],
                __WEBPACK_IMPORTED_MODULE_73__pages_visidetail_visidetail__["a" /* VisidetailPage */],
                __WEBPACK_IMPORTED_MODULE_74__pages_prompt_prompt__["a" /* PromptPage */],
                __WEBPACK_IMPORTED_MODULE_75__pages_attendees_attendees__["a" /* AttendeesPage */],
                __WEBPACK_IMPORTED_MODULE_76__pages_addattend_addattend__["a" /* AddattendPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_14__providers_HttpService__["a" /* HttpService */],
                __WEBPACK_IMPORTED_MODULE_21__providers_third_path_third_path__["a" /* ThirdPath */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApprovedpendingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__approvedpenddetail_approvedpenddetail__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__approveprojectdetail_approveprojectdetail__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__approveindiadetail_approveindiadetail__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__approvewechartdetail_approvewechartdetail__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the ApprovedpendingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ApprovedpendingPage = (function () {
    function ApprovedpendingPage(navCtrl, navParams, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.pet = "kittens";
        //声明员工号
        this.empId = "10000";
        //声明员工名字
        this.customName = "张三";
        this.approvepend_Type = "尽调";
        this.select = {
            ismyListshow: false,
            isUnderListshow: false,
        };
        this.approve_index = navParams.get('approve_index');
        console.log("传过来的index值：" + this.approve_index);
        if (this.approve_index == 1) {
            this.approvepend_Type = "用印";
        }
        else if (this.approve_index == 2) {
            this.approvepend_Type = "项目";
        }
        else if (this.approve_index == 3) {
            this.approvepend_Type = "尽调";
        }
        else if (this.approve_index == 4) {
            this.approvepend_Type = "报告";
        }
    }
    ApprovedpendingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ApprovedpendingPage');
        //根据类型查询所属的列表
        //默认第一次进来，把status,time赋值为空
        this.time = "";
        this.status = "";
        this.getApproveList();
    };
    //判断显示或者隐藏
    ApprovedpendingPage.prototype.changeselec = function () {
        this.select.ismyListshow = false;
        this.select.isUnderListshow = false;
    };
    //点击待审批项，进入该项的详情
    ApprovedpendingPage.prototype.approvedpendingdetail = function (index) {
        if (index == 1) {
            //报告
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__approvedpenddetail_approvedpenddetail__["a" /* ApprovedpenddetailPage */], { processinstId: this.processinstId }, { animate: true });
        }
        else if (index == 2) {
            //项目
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__approveprojectdetail_approveprojectdetail__["a" /* ApproveprojectdetailPage */], { processinstId: this.processinstId }, { animate: true });
        }
        else if (index == 3) {
            //用印
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__approveindiadetail_approveindiadetail__["a" /* ApproveindiadetailPage */], { sealId: this.sealId, processinstId: this.processinstId }, { animate: true });
        }
        else if (index == 4) {
            //尽调
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__approvewechartdetail_approvewechartdetail__["a" /* ApprovewechartdetailPage */], { wechartId: this.wechartId, processinstId: this.processinstId }, { animate: true });
        }
    };
    //根据下拉框选择的类型，查询对应的列表数据
    ApprovedpendingPage.prototype.getApproveList = function () {
        var _this = this;
        //该档板未写，所以指向的是首页的json，在此只是查看数据是否连通
        var url = "home_g/home_g.json";
        // const url = "http://127.0.0.1:8000/mcrm/zwebmcrm/com.nbcb.pcrm.mcrm.mobile";
        var data = {
            "appId": "mcrm",
            "reqParam": {
                "userId": this.empId,
                "customName": this.customName,
                "type": this.approvepend_Type,
                "status": this.status,
                "time": this.time,
                "page": {
                    "firstPageNo": 0,
                    "dataCount": 0,
                    "pageNo": 0
                }
            },
            "serviceId": "auth.mcrmLogin"
        };
        this.httpService.getData({
            url: url,
            body: data
        }).then(function (res) {
            _this.getapproveListbystyle = res;
            console.log(res);
            //根据返回的结果，去赋值对应的ID和流程ID，传递给下个页面
            //例如：该列表展示的是用印的列表，把查询到的用印ID赋值，和流程ID赋值
            _this.sealId = 1;
            _this.wechartId = 1;
            //例如：该列表展示的是尽调列表，把查询到的尽调ID赋值，和流程ID赋值
            _this.processinstId = 1;
        });
    };
    //点击了待审批的下拉列表
    ApprovedpendingPage.prototype.switch_Type = function () {
        console.log("你点击了待审批的下拉列表:" + this.approvepend_Type);
        this.time = "";
        this.status = "";
        this.getApproveList();
    };
    //点击了下拉列表
    ApprovedpendingPage.prototype.switchType = function () {
        console.log("你点击了下拉审批时间" + this.time);
    };
    //点击了下拉列表
    ApprovedpendingPage.prototype.switchType1 = function () {
        console.log("你点击了下拉状态" + this.status);
    };
    //点击查询
    ApprovedpendingPage.prototype.getsearchlist = function () {
        console.log("你点击了查询");
        //根据时间和状态查询相关列表
        this.getApproveList();
    };
    ApprovedpendingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-approvedpending',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\approvedpending\approvedpending.html"*/'<!--\n  Generated template for the ApprovedpendingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="header">\n\n  <ion-navbar>\n    <ion-title>\n      <div padding>\n        <ion-segment class="toggle-table" [(ngModel)]="pet">\n          <ion-segment-button value="kittens" (click)="changeselec()">\n            待审批项\n          </ion-segment-button>\n          <ion-segment-button value="puppies" (click)="changeselec()">\n            已审批项\n          </ion-segment-button>\n        </ion-segment>\n      </div>\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background-color: #ffffff">\n  <div [ngSwitch]="pet" style="width:100%;height:100%;">\n    <ion-list *ngSwitchCase="\'puppies\'" style="width: 100%;height: 100%;background: rgb(255, 238, 255);padding-top: 1rem;">\n       <ion-item style="display: -webkit-box;background: #ffffff">\n            <ion-label class="common_font" style="padding-left:14px;max-width:30%;width: 30%;">审批时间</ion-label>\n            <ion-select class="common_font" style="max-width:70%; width: 70%;padding: 11px 8px 11px 6px;"   [(ngModel)]="time" (ngModelChange)="switchType()" interface="popover" placeholder="请选择">\n              <ion-option value="当天">当天</ion-option>\n              <ion-option value="近一月">近一月</ion-option>\n              <ion-option value="近一年">近一年</ion-option>\n            </ion-select>\n       </ion-item>\n\n      <div style="border-top:1px #ddd solid"></div>\n\n      <ion-item style="display: -webkit-box;background: #ffffff">\n          <ion-label class="common_font" style="padding-left:14px;max-width:30%;width: 30%;">审批状态</ion-label>\n          <ion-select class="common_font" style="max-width:70%; width: 70%;padding: 11px 8px 11px 6px;"  [(ngModel)]="status"  (ngModelChange)="switchType1()" interface="popover" placeholder="请选择">\n            <ion-option value="待审批">待审批</ion-option>\n            <ion-option value="已审批">已审批</ion-option>\n          </ion-select>\n      </ion-item>\n\n\n      <div class="search_button" (click)="getsearchlist()">\n        查询\n      </div>\n\n\n      <div class="common_content common_flex" style="border-bottom: 1px #ddd solid"  (click)="approvedpendingdetail(1)">\n        <div  class="content_nowrap">\n          <div class="content_title">宁波天心企业咨询有限公司资产托管上报资料</div>\n          <div class="content_font" style="margin-top: 1rem;">\n            <span class="content_type" style="background: rgb(85, 221, 170);color:#ffffff">类型</span>\n            <span>2017-11-23 9:00</span>\n          </div>\n        </div>\n        <div class="content_detail">   >  </div>\n      </div>\n\n      <div class="common_content common_flex" style="border-bottom: 1px #ddd solid"  (click)="approvedpendingdetail(2)">\n        <div  class="content_nowrap">\n          <div class="content_title">宁波天心企业咨询有限公司资产托管上报资料</div>\n          <div class="content_font" style="margin-top: 1rem;">\n            <span class="content_type" style="background: rgb(85, 221, 170);color:#ffffff">类型</span>\n            <span>2017-11-23 9:00</span>\n          </div>\n        </div>\n        <div class="content_detail">   >  </div>\n      </div>\n\n    </ion-list>\n\n    <ion-list *ngSwitchCase="\'kittens\'">\n\n\n      <div class="" style="display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center">\n        <ion-item style="border-bottom: 1px #ddd solid">\n          <ion-select class="" style="" [(ngModel)]="approvepend_Type" (ngModelChange)="switch_Type()" interface="popover" placeholder="全部" >\n            <ion-option value="用印">用印</ion-option>\n            <ion-option value="项目">项目</ion-option>\n            <ion-option value="尽调">尽调</ion-option>\n            <ion-option value="报告">报告</ion-option>\n          </ion-select>\n          <ion-label class="img4 imgall4" style="display:inline-block"></ion-label>\n        </ion-item>\n      </div>\n\n\n\n      <div class="common_content common_flex" style="border-bottom: 1px #ddd solid"  (click)="approvedpendingdetail(1)">\n        <div  class="content_nowrap">\n          <div class="content_title">宁波天心企业咨询有限公司资产托管上报资料</div>\n          <div class="content_font" style="margin-top: 1rem;">\n            <span class="content_type" style="background:#3CB371;color:#ffffff">报告</span>\n            <span>2017-11-23 9:00</span>\n          </div>\n        </div>\n        <div class="content_detail">   >  </div>\n      </div>\n\n      <div class="common_content common_flex" style="border-bottom: 1px #ddd solid"  (click)="approvedpendingdetail(2)">\n        <div  class="content_nowrap">\n          <div class="content_title">宁波天心企业咨询有限公司资产托管上报资料</div>\n          <div class="content_font" style="margin-top: 1rem;">\n            <span class="content_type" style="background:#0099ff;color:#ffffff">项目</span>\n            <span>2017-11-23 9:00</span>\n          </div>\n        </div>\n        <div class="content_detail">   >  </div>\n      </div>\n\n      <div class="common_content common_flex" style="border-bottom: 1px #ddd solid"  (click)="approvedpendingdetail(3)">\n        <div  class="content_nowrap">\n          <div class="content_title">宁波天心企业咨询有限公司资产托管上报资料</div>\n          <div class="content_font" style="margin-top: 1rem;">\n            <span class="content_type" style="background:#FB7B78;color:#ffffff">用印</span>\n            <span>2017-11-23 9:00</span>\n          </div>\n        </div>\n        <div class="content_detail">   >  </div>\n      </div>\n\n      <div class="common_content common_flex" style="border-bottom: 1px #ddd solid"  (click)="approvedpendingdetail(4)">\n        <div  class="content_nowrap">\n          <div class="content_title">宁波天心企业咨询有限公司资产托管上报资料</div>\n          <div class="content_font" style="margin-top: 1rem;">\n            <span class="content_type" style="background: #666666;color:#ffffff">尽调</span>\n            <span>2017-11-23 9:00</span>\n          </div>\n        </div>\n        <div class="content_detail">   >  </div>\n      </div>\n\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\approvedpending\approvedpending.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__providers_HttpService__["a" /* HttpService */]])
    ], ApprovedpendingPage);
    return ApprovedpendingPage;
}());

//# sourceMappingURL=approvedpending.js.map

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_knowledge_knowledge__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        this.rootknowledge = __WEBPACK_IMPORTED_MODULE_4__pages_knowledge_knowledge__["a" /* KnowledgePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkbenchService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WorkbenchService = (function () {
    function WorkbenchService(httpService) {
        this.httpService = httpService;
    }
    WorkbenchService.prototype.getMenu = function (params) {
        // let url = "/getRandomForDesk";
        var url = "menu.json";
        return this.httpService.getData({
            url: url,
            body: params
        });
        // return this.httpService.requestGet(url,params);
        // return this.httpService.requestPost(url,params);
    };
    WorkbenchService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */]])
    ], WorkbenchService);
    return WorkbenchService;
}());

//# sourceMappingURL=workbenchService.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeService = (function () {
    function HomeService(httpService) {
        this.httpService = httpService;
    }
    HomeService.prototype.getCustomerCurrent = function (params) {
        // return this.httpService.get("/assets/data/performance/customerCurrent.json",null);
        var url = "performance/customerCurrent.json";
        return this.httpService.getData({
            url: url,
            body: params
        });
        // return this.httpService.requestGet1(url,params);
    };
    HomeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */]])
    ], HomeService);
    return HomeService;
}());

//# sourceMappingURL=HomeService.js.map

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TargetdetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the TargetdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TargetdetailPage = (function () {
    function TargetdetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.contenttext = "会议签到：会议发起人可以在APP中点击开始会议，会议开始后，与会人员会议信息中的签到功能开启。与会人员采用定位签到功能，在500-1000米（具体精度再定）范围内才可以签到，超过范围不允许签到。结束会议：会议结束后，会议主持人点击结束会议，会议更新为结束状态后，不允许继续签到。主持人可以填写会议报告。取消会议：对于未开始的会议可以取消会议日程，并推送通知参与人员。正在进行的会议不可取消。";
        this.textmaxleng = "";
        this.custDetailList = [
            { title: "目标类型", content: "日计划" },
            { title: "开始时间", content: "2018-5-15" },
            { title: "结束时间", content: "20187-26" },
            { title: "计划执行人", content: "自己" },
            { title: "计划主题", content: "白领融收单30" },
            { title: "计划内容", content: ["海关税务局收20", "环球中心收10"] }
        ];
    }
    TargetdetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TargetdetailPage');
        console.log(this.custDetailList);
        var maxleng = this.contenttext.substr(0, 30);
        this.textmaxleng = maxleng;
    };
    TargetdetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-targetdetail',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\targetdetail\targetdetail.html"*/'<!--\n  Generated template for the TargetdetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>目标计划详情</ion-title>\n    <span class="edit">编辑</span>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background-color: #f1f5f8">\n  <div class="list">\n      <div  class="market-list row">\n        <span col-3 class="market-list-name clear-pad">目标类型</span>\n        <span col-8 class="market-list-cont clear-pad">日计划</span>\n      </div>\n    <div class="market-list row">\n      <span col-3 class="market-list-name clear-pad">开始时间</span>\n      <span col-8 class="market-list-cont clear-pad">2018-1-03 1:00</span>\n    </div>\n    <div class="market-list row">\n      <span col-3 class="market-list-name clear-pad">结束时间</span>\n      <span col-8 class="market-list-cont clear-pad">2018-1-03 1:00</span>\n    </div>\n    <div class="market-list row">\n      <span col-3 class="market-list-name clear-pad">计划执行人</span>\n      <span col-8 class="market-list-cont clear-pad">自己</span>\n    </div>\n    <div class="market-list row">\n      <span col-3 class="market-list-name clear-pad">计划主题</span>\n      <span col-8 class="market-list-cont clear-pad">白领融收单30</span>\n    </div>\n    <div class="market-list row item-last">\n      <span col-3 class="market-list-name clear-pad">计划内容</span>\n      <div col-8 class="clear-pad">\n        <span class="market-list-cont last-cont">1:海关税务局收20</span>\n        <span class="market-list-cont last-cont">2:环球中心收10</span>\n      </div>\n\n    </div>\n  </div>\n\n\n  <!--<ion-item>-->\n    <!--<ion-label fixed>目标类型:</ion-label>-->\n    <!--<ion-input type="text" value="" placeholder="日计划"></ion-input>-->\n  <!--</ion-item>-->\n  <!--<ion-item>-->\n    <!--<ion-label fixed>计划类型:</ion-label>-->\n    <!--<ion-input type="text" value="" placeholder="计划类型"></ion-input>-->\n  <!--</ion-item>-->\n  <!--<ion-item>-->\n    <!--<ion-label fixed>开始时间:</ion-label>-->\n    <!--<ion-datetime displayFormat="YYYY-MM-DD" placeholder="时间" canceltext="取消" donetext="完成"></ion-datetime>-->\n  <!--</ion-item>-->\n  <!--<ion-item>-->\n    <!--<ion-label fixed>结束时间:</ion-label>-->\n    <!--<ion-datetime displayFormat="YYYY-MM-DD" placeholder="时间" canceltext="取消" donetext="完成"></ion-datetime>-->\n  <!--</ion-item>-->\n  <!--<ion-item>-->\n    <!--<ion-label fixed>计划执行人:</ion-label>-->\n    <!--<ion-input type="text" value="" placeholder="自己"></ion-input>-->\n  <!--</ion-item>-->\n  <!--<ion-item>-->\n    <!--<ion-label fixed>计划主题:</ion-label>-->\n    <!--<ion-input type="text" value="" placeholder="白领融收单30"></ion-input>-->\n  <!--</ion-item>-->\n  <!--<ion-item class="last-item">-->\n    <!--<ion-label class="left last-label">计划内容:</ion-label>-->\n    <!--&lt;!&ndash;<ion-input style="margin: 0px !important; padding: 0px !important;" class="left last-label" type="text" value="" placeholder="白领融收单30"></ion-input>&ndash;&gt;-->\n    <!--<ion-textarea style="padding:0px 45px" class="left" name="" cols="30" id="sss" rows="10" placeholder="1:海关税务局收20 &#10;2:环球中心收10"></ion-textarea>-->\n  <!--</ion-item>-->\n\n  <div class="report both-clear" style="margin-top: 10px; background-color: #fff">\n    <span col-3 class="market-list-name left">汇报成果</span>\n    <!--<textarea placeholder="请输入内容" class="left textarea" name="" id="" cols="30" rows="10"></textarea>-->\n    <span col-8 class="market-list-cont textarea last-cont">{{textmaxleng+". . ."}}</span>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\targetdetail\targetdetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], TargetdetailPage);
    return TargetdetailPage;
}());

//# sourceMappingURL=targetdetail.js.map

/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarddetilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rtprecord_rtprecord__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*检测手机是否有百度地图或者谷歌地图*/
/*declare let appAvailability: any;
declare var AMap;
declare var device;*/
var CarddetilPage = (function () {
    function CarddetilPage(
        /*public navCtrl: NavController,*/
        platform, navCtrl, navParams, sanitizer, alertCtrl, modalCtrl) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.cardlist = [];
        this.cardinfo = [];
        this.businesslist = [];
        this.session = navParams.data;
        this.cardlist = [];
        this.cardinfo = [];
        //this.cardlist = this.navParams.get('detail');
        // this.cardlist.push(this.navParams.get('detail'));
        if (this.navParams.get('detail')) {
            this.cardlist.push(this.navParams.get('detail'));
        }
        else {
            this.cardlist.push(this.navParams.get('list'));
        }
        //console.log(this.cardlist.businesslist);
        for (var _i = 0, _a = this.cardlist; _i < _a.length; _i++) {
            var info = _a[_i];
            //this.cardinfo.push(info.businesslist);
            console.log(this.cardlist);
            for (var o in info.businesslist) {
                this.cardinfo.push(info.businesslist[o]);
            }
            console.log(this.cardinfo);
        }
    }
    /*高德地图方法*/
    /*loadMap() {
      this.map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 8,
        center: [121.55,29.88]
      });
    }*/
    CarddetilPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CarddetilPage');
        /* this.loadMap(); 高德地图方法*/
        /*let map = this.map = new BMap.Map(this.mapElement.nativeElement, { enableMapClick: true });//创建地图实例*/
        var map = new BMap.Map(this.mapElement.nativeElement, { enableMapClick: true }); //创建地图实例
        map.enableScrollWheelZoom(); //启动滚轮放大缩小，默认禁用
        map.enableContinuousZoom(); //连续缩放效果，默认禁用
        var point = new BMap.Point(121.547842, 29.815853); //坐标可以通过百度地图坐标拾取器获取
        map.centerAndZoom(point, 18); //设置中心和地图显示级别
        /*let marker = new BMap.Marker(point);        // 创建标注
        map.addOverlay(marker);                     // 将标注添加到地图中*/
        /*//地图放大缩小控件
        let sizeMap = new BMap.Size(10, 80);//显示位置
        map.addControl(new BMap.NavigationControl({
          anchor: BMAP_ANCHOR_BOTTOM_RIGHT,//显示方向
          offset: sizeMap
        }));*/
        /*let map = new BMap.Map("container");
        let point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);  // 编写自定义函数，创建标注*/
        /*自定义图标*/
        var myIcon = new BMap.Icon("../../assets/imgs/market/point.png", new BMap.Size(23, 25), {
            // 指定定位位置。
            // 当标注显示在地图上时，其所指向的地理位置距离图标左上
            // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
            // 图标中央下端的尖角位置。
            anchor: new BMap.Size(40, 40),
            // 设置图片偏移。
            // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
            // 需要指定大图的偏移位置，此做法与css sprites技术类似。
            imageOffset: new BMap.Size(0, 0) // 设置图片偏移
        });
        // 创建标注对象并添加到地图
        var marker = new BMap.Marker(point, { icon: myIcon });
        map.addOverlay(marker);
    };
    /*点击时打开手机上的百度地图APP*/
    /*openBaiduMap() {
      appAvailability.check(
        'com.baidu.BaiduMap',
        function() {  // 已下载
          device.platform === 'iOS'?
            window.location.href = 'baidumap://map/direction?origin=latlng:116.291226,39.965221|name:世纪城&destination=latlng:39.9761,116.3282|name:钓点位置':
            window.location.href = 'bdapp://map/direction?&origin=latlng:116.291226,39.965221|name:世纪城&destination=latlng:39.9761,116.3282|name:钓点位置'
        },
        function() { // 未下载
          // 打开浏览器
          window.open(" http://api.map.baidu.com/direction?origin=latlng:34.264642646862,108.95108518068|name:当前位置&destination=latlng:39.9761,116.3282|name:钓点位置&mode=driving&region=西安&output=html&src=yourCompanyName|yourAppName");
        }
      );
    }*/
    CarddetilPage.prototype.CallPhone = function (phone) {
        window.open('tel:' + phone);
    };
    CarddetilPage.prototype.goRtprecord = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__rtprecord_rtprecord__["a" /* RtprecordPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], CarddetilPage.prototype, "mapElement", void 0);
    CarddetilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-carddetil',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\carddetil\carddetil.html"*/'<!--\n  Generated template for the CarddetilPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>详情</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content >\n  <!--百度地图-->\n  <div>\n    <div id="map" #map style="width:100%; height: 18rem;"></div>\n    <!--<ion-fab bottom right >\n      &lt;!&ndash;(click)="openBaiduMap()"&ndash;&gt;\n      <button  ion-fab style="width: 50px;height: 50px;line-height: 50px;margin-right: 10px;"><ion-icon name="">GO</ion-icon></button>\n    </ion-fab>-->\n  </div>\n  <div style="width: 100%;height: 100%; ">\n    <div class="info_area" style="float: left">\n        <div *ngFor="let item of cardlist">\n          <div class="redfont bsFont wideFont" style="margin-left: 5%; margin-top:5%;">\n            <label>{{item.people}}</label>\n            <label style="padding-left:0.5rem; font-size:1rem;">\n              <ion-icon *ngIf="item.sex==\'男\'" class="gender genderman" ios="md-male" md="md-male"></ion-icon>\n              <ion-icon *ngIf="item.sex==\'女\'" class="gender gendergirl" ios="ios-female-outline" md="ios-transgender"></ion-icon>\n            </label>\n          </div>\n\n          <div style="margin-top: 3px;" class="titlefont blackwideFont"><label></label></div>\n          <ion-item class="item-thumbnail-left" >\n            <div class="minFont grayFont btmfont"><label>手机号：{{item.phone}}</label></div>\n            <div class="minFont grayFont btmfont"><label>身份证：{{item.iccard}}</label></div>\n            <div class="minFont grayFont btmfont"><label>地址：{{item.address}}</label></div>\n          </ion-item>\n        </div>\n      <div  class="titlefont blackwideFont" style="padding:1rem 0; text-align: center; background-color:#f2f2f2; font-weight:900; font-size:1.8rem;"><label>业务信息区</label></div>\n      <ion-item ng-repeat="item in items" >\n\n        <ion-list>\n          <ion-list ng-controller="MyCtrl"\n                    show-delete="shouldShowDelete"\n                    show-reorder="shouldShowReorder"\n                    can-swipe="listCanSwipe"  class="list item-thumbnail-left">\n            <div class="button-positive clearfix">\n              <ion-item ng-repeat="item in items" *ngFor="let info of cardinfo"  style="border-bottom:0.55px solid #ddd;">\n                <div style="width: 100%;float: left">\n                  <div class="minFont grayFont btmfont"><label>卡号：{{info.cardid}}</label></div>\n                  <div class="minFont grayFont btmfont"><label>卡产品名称：{{info.cardname}}</label></div>\n                  <div class="minFont grayFont btmfont"><label>额度：{{info.lines}}</label></div>\n                </div>\n\n              </ion-item>\n            </div>\n          </ion-list>\n        </ion-list>\n      </ion-item>\n    </div>\n  </div>\n\n</ion-content>\n<ion-footer>\n  <div class="button-positive clearfix" style="width: 100%">\n    <ion-item >\n      <div style="text-align: center;margin-top:1.4rem;width: 80%;float: left" *ngFor="let item of cardlist">\n        <button ion-button round icon-left class="callbutton" (click)="CallPhone(item.phone)">\n          <ion-icon name="call" style="color: #2ec95c;font-size: 30px;"></ion-icon>\n          <div class="blackwideFont" style="font-size: 1.7rem">{{item.phone}}</div>\n        </button>\n      </div>\n      <div (click)="goRtprecord()" style="text-align: center;margin-top: 20px;width: 20%;float: right">\n        <div class="footer-img">\n          <div class="footer-img1 footer-imgall"></div>\n        </div>\n      </div>\n    </ion-item>\n  </div>\n</ion-footer>\n\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\carddetil\carddetil.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], CarddetilPage);
    return CarddetilPage;
}());

//# sourceMappingURL=carddetil.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApprovePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__approvedetail_approvedetail__ = __webpack_require__(253);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ApprovePage = (function () {
    function ApprovePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ApprovePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ApprovePage');
    };
    ApprovePage.prototype.goDetail = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__approvedetail_approvedetail__["a" /* ApprovedetailPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], ApprovePage.prototype, "content", void 0);
    ApprovePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-approve',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\approve\approve.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title class="app-title">我的审批</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <div class="app-tslide">\n    <div style="color: #345a92;font-size: 1.6rem;">尊享卡审批</div>\n    <div style="color: #5fadda;font-size: 1.5rem;">私银卡号审批</div>\n  </div>\n  <div style="margin-top: 4rem">\n    <div class="app-list">\n      <div class="app-name">\n        <span class="app-name-name">张三</span>\n        <span class="app-name-ke">普通客户</span>\n        <span class="app-name-time">2018-01-20</span>\n      </div>\n      <div class="app-list-one">\n        <span>\n          <span class="app-list1-left1">审批标准</span>\n          <span class="app-list1-left2">4</span>\n        </span>\n        <span>\n          <span class="app-list1-right1">申报人</span>\n          <span class="app-list1-right2">吕佳妮</span>\n        </span>\n      </div>\n    </div>\n  </div>\n  <div (click)="goDetail()">\n    <div class="app-list">\n      <div class="app-name">\n        <span class="app-name-name">张三</span>\n        <span class="app-name-ke">普通客户</span>\n        <span class="app-name-time">2018-01-20</span>\n      </div>\n      <div class="app-list-one">\n        <span>\n          <span class="app-list1-left1">审批标准</span>\n          <span class="app-list1-left2">4</span>\n        </span>\n        <span>\n          <span class="app-list1-right1">申报人</span>\n          <span class="app-list1-right2">吕佳妮</span>\n        </span>\n      </div>\n    </div>\n  </div>\n\n  <!--<ion-slides style="margin-top: 4rem">-->\n    <!--<ion-slide>-->\n      <!--<div class="app-list">-->\n        <!--<div class="app-name">-->\n          <!--<span class="app-name-name">张三</span>-->\n          <!--<span class="app-name-ke">普通客户</span>-->\n          <!--<span class="app-name-time">2018-01-20</span>-->\n        <!--</div>-->\n      <!--</div>-->\n    <!--</ion-slide>-->\n\n  <!--</ion-slides>-->\n\n  <!--<ion-slides>-->\n    <!--<ion-slide>-->\n      <!--<div class="app-list">-->\n        <!--<div class="app-name">-->\n          <!--<span class="app-name-name">张三</span>-->\n          <!--<span class="app-name-ke">普通客户</span>-->\n          <!--<span class="app-name-time">2018-01-20</span>-->\n        <!--</div>-->\n      <!--</div>-->\n    <!--</ion-slide>-->\n  <!--</ion-slides>-->\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\approve\approve.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ApprovePage);
    return ApprovePage;
}());

//# sourceMappingURL=approve.js.map

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CameraPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CameraPage = (function () {
    function CameraPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CameraPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CameraPage');
    };
    CameraPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-camera',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\camera\camera.html"*/'<!--\n  Generated template for the CameraPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>拍照</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\camera\camera.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], CameraPage);
    return CameraPage;
}());

//# sourceMappingURL=camera.js.map

/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 255,
	"./af.js": 255,
	"./ar": 256,
	"./ar-dz": 257,
	"./ar-dz.js": 257,
	"./ar-kw": 258,
	"./ar-kw.js": 258,
	"./ar-ly": 259,
	"./ar-ly.js": 259,
	"./ar-ma": 260,
	"./ar-ma.js": 260,
	"./ar-sa": 261,
	"./ar-sa.js": 261,
	"./ar-tn": 262,
	"./ar-tn.js": 262,
	"./ar.js": 256,
	"./az": 263,
	"./az.js": 263,
	"./be": 264,
	"./be.js": 264,
	"./bg": 265,
	"./bg.js": 265,
	"./bm": 266,
	"./bm.js": 266,
	"./bn": 267,
	"./bn.js": 267,
	"./bo": 268,
	"./bo.js": 268,
	"./br": 269,
	"./br.js": 269,
	"./bs": 270,
	"./bs.js": 270,
	"./ca": 271,
	"./ca.js": 271,
	"./cs": 272,
	"./cs.js": 272,
	"./cv": 273,
	"./cv.js": 273,
	"./cy": 274,
	"./cy.js": 274,
	"./da": 275,
	"./da.js": 275,
	"./de": 276,
	"./de-at": 277,
	"./de-at.js": 277,
	"./de-ch": 278,
	"./de-ch.js": 278,
	"./de.js": 276,
	"./dv": 279,
	"./dv.js": 279,
	"./el": 280,
	"./el.js": 280,
	"./en-au": 281,
	"./en-au.js": 281,
	"./en-ca": 282,
	"./en-ca.js": 282,
	"./en-gb": 283,
	"./en-gb.js": 283,
	"./en-ie": 284,
	"./en-ie.js": 284,
	"./en-il": 285,
	"./en-il.js": 285,
	"./en-nz": 286,
	"./en-nz.js": 286,
	"./eo": 287,
	"./eo.js": 287,
	"./es": 288,
	"./es-do": 289,
	"./es-do.js": 289,
	"./es-us": 290,
	"./es-us.js": 290,
	"./es.js": 288,
	"./et": 291,
	"./et.js": 291,
	"./eu": 292,
	"./eu.js": 292,
	"./fa": 293,
	"./fa.js": 293,
	"./fi": 294,
	"./fi.js": 294,
	"./fo": 295,
	"./fo.js": 295,
	"./fr": 296,
	"./fr-ca": 297,
	"./fr-ca.js": 297,
	"./fr-ch": 298,
	"./fr-ch.js": 298,
	"./fr.js": 296,
	"./fy": 299,
	"./fy.js": 299,
	"./gd": 300,
	"./gd.js": 300,
	"./gl": 301,
	"./gl.js": 301,
	"./gom-latn": 302,
	"./gom-latn.js": 302,
	"./gu": 303,
	"./gu.js": 303,
	"./he": 304,
	"./he.js": 304,
	"./hi": 305,
	"./hi.js": 305,
	"./hr": 306,
	"./hr.js": 306,
	"./hu": 307,
	"./hu.js": 307,
	"./hy-am": 308,
	"./hy-am.js": 308,
	"./id": 309,
	"./id.js": 309,
	"./is": 310,
	"./is.js": 310,
	"./it": 311,
	"./it.js": 311,
	"./ja": 312,
	"./ja.js": 312,
	"./jv": 313,
	"./jv.js": 313,
	"./ka": 314,
	"./ka.js": 314,
	"./kk": 315,
	"./kk.js": 315,
	"./km": 316,
	"./km.js": 316,
	"./kn": 317,
	"./kn.js": 317,
	"./ko": 318,
	"./ko.js": 318,
	"./ky": 319,
	"./ky.js": 319,
	"./lb": 320,
	"./lb.js": 320,
	"./lo": 321,
	"./lo.js": 321,
	"./lt": 322,
	"./lt.js": 322,
	"./lv": 323,
	"./lv.js": 323,
	"./me": 324,
	"./me.js": 324,
	"./mi": 325,
	"./mi.js": 325,
	"./mk": 326,
	"./mk.js": 326,
	"./ml": 327,
	"./ml.js": 327,
	"./mn": 328,
	"./mn.js": 328,
	"./mr": 329,
	"./mr.js": 329,
	"./ms": 330,
	"./ms-my": 331,
	"./ms-my.js": 331,
	"./ms.js": 330,
	"./mt": 332,
	"./mt.js": 332,
	"./my": 333,
	"./my.js": 333,
	"./nb": 334,
	"./nb.js": 334,
	"./ne": 335,
	"./ne.js": 335,
	"./nl": 336,
	"./nl-be": 337,
	"./nl-be.js": 337,
	"./nl.js": 336,
	"./nn": 338,
	"./nn.js": 338,
	"./pa-in": 339,
	"./pa-in.js": 339,
	"./pl": 340,
	"./pl.js": 340,
	"./pt": 341,
	"./pt-br": 342,
	"./pt-br.js": 342,
	"./pt.js": 341,
	"./ro": 343,
	"./ro.js": 343,
	"./ru": 344,
	"./ru.js": 344,
	"./sd": 345,
	"./sd.js": 345,
	"./se": 346,
	"./se.js": 346,
	"./si": 347,
	"./si.js": 347,
	"./sk": 348,
	"./sk.js": 348,
	"./sl": 349,
	"./sl.js": 349,
	"./sq": 350,
	"./sq.js": 350,
	"./sr": 351,
	"./sr-cyrl": 352,
	"./sr-cyrl.js": 352,
	"./sr.js": 351,
	"./ss": 353,
	"./ss.js": 353,
	"./sv": 354,
	"./sv.js": 354,
	"./sw": 355,
	"./sw.js": 355,
	"./ta": 356,
	"./ta.js": 356,
	"./te": 357,
	"./te.js": 357,
	"./tet": 358,
	"./tet.js": 358,
	"./tg": 359,
	"./tg.js": 359,
	"./th": 360,
	"./th.js": 360,
	"./tl-ph": 361,
	"./tl-ph.js": 361,
	"./tlh": 362,
	"./tlh.js": 362,
	"./tr": 363,
	"./tr.js": 363,
	"./tzl": 364,
	"./tzl.js": 364,
	"./tzm": 365,
	"./tzm-latn": 366,
	"./tzm-latn.js": 366,
	"./tzm.js": 365,
	"./ug-cn": 367,
	"./ug-cn.js": 367,
	"./uk": 368,
	"./uk.js": 368,
	"./ur": 369,
	"./ur.js": 369,
	"./uz": 370,
	"./uz-latn": 371,
	"./uz-latn.js": 371,
	"./uz.js": 370,
	"./vi": 372,
	"./vi.js": 372,
	"./x-pseudo": 373,
	"./x-pseudo.js": 373,
	"./yo": 374,
	"./yo.js": 374,
	"./zh-cn": 375,
	"./zh-cn.js": 375,
	"./zh-hk": 376,
	"./zh-hk.js": 376,
	"./zh-tw": 377,
	"./zh-tw.js": 377
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 471;

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddmeetinginfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AddmeetinginfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddmeetinginfoPage = (function () {
    function AddmeetinginfoPage(navCtrl, httpService, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.httpService = httpService;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
    }
    AddmeetinginfoPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad AddmeetinginfoPage');
        var _this = this;
        this.writeCon = "编辑";
        this.wFlag = false;
        var url = "calendar/meeting.json";
        this.httpService.postData({
            url: url,
            body: {}
        }).then(function (res) {
            //console.log(res);
            if (res.status == 0) {
                _this.meetingcontent = res.resultRes.content;
                _this.meetingtitle = res.resultRes.title;
            }
            else {
            }
        });
    };
    AddmeetinginfoPage.prototype.showAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: '系统提示',
            subTitle: msg,
            buttons: ['确定']
        });
        alert.present();
    };
    AddmeetinginfoPage.prototype.saveRemark = function (meetingcontent, meetingtitle) {
        if (this.wFlag == false) {
            this.wFlag = true;
            this.writeCon = "保存";
            document.getElementById("meetingid").focus();
            document.getElementById("meetingid").removeAttribute("readonly");
            document.getElementById("meetingcontent").removeAttribute("readonly");
        }
        else {
            this.showAlert("保存成功");
            this.wFlag = false;
            this.writeCon = "编辑";
            document.getElementById("meetingid").setAttribute('readonly', 'readonly');
            document.getElementById("meetingcontent").setAttribute("readonly", 'readonly');
        }
    };
    AddmeetinginfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addmeetinginfo',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\addmeetinginfo\addmeetinginfo.html"*/'<!--\n  Generated template for the AddmeetinginfoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>添加会议纪要</ion-title>\n    <div class="remark-save" (click)="saveRemark(meetingtitle,meetingcontent)">{{writeCon}}</div>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div class="remark-list clearfix">\n    <div class="remark-list-name left">标题</div>\n    <div class="remark-list-cont left" style="height: 3rem;">\n      <input type="text" class="remark-input" [(ngModel)]="meetingtitle" id="meetingid" readonly="readonly">\n    </div>\n  </div>\n\n  <div class="remark-list clearfix">\n    <div class="remark-list-name left">内容</div>\n    <div class="remark-list-cont left">\n      <textarea class="remark-text" [(ngModel)]="meetingcontent" id="meetingcontent" readonly="readonly"></textarea>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\addmeetinginfo\addmeetinginfo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], AddmeetinginfoPage);
    return AddmeetinginfoPage;
}());

//# sourceMappingURL=addmeetinginfo.js.map

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisitPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customerlist_customerlist__ = __webpack_require__(379);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the VisitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VisitPage = (function () {
    function VisitPage(navCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.visitgetfolist = [];
        this.visitgetfolistiph = [];
        this.newtime = {};
        this.vame = true;
        this.opTionValue = sessionStorage.getItem("id");
        this.valueList = [
            { "value": "1", "name": "正式客户" },
            { "value": "2", "name": "潜在客户" },
            { "value": "3", "name": "非管户客户" }
        ];
        //回调方法
        this.CallbackFunction = function (_params, _params1) {
            return new Promise(function (resolve, reject) {
                _this.visitgetfolist = _params;
                _this.visitgetfolistiph = _params1;
                resolve();
            });
        };
        this.visitgetfolist.push(this.navParams.get('detail'));
        this.visitgetfolistiph.push(this.navParams.get('iph'));
        this.newtime.starttime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString();
    }
    VisitPage.prototype.ionViewDidLoad = function () {
        if (this.opTionValue == "" || this.opTionValue == null) {
            this.opTionValue = "1";
        }
        console.log(this.navParams.get('iph'));
    };
    VisitPage.prototype.change = function (opTionValue) {
        console.log(opTionValue);
        if (opTionValue == "3") {
            this.vame = false;
        }
        else {
            this.vame = true;
        }
        this.vame = false;
        this.opTionValue = opTionValue;
        sessionStorage.setItem("id", this.opTionValue);
        // window.location.reload()
    };
    VisitPage.prototype.changebutton = function () {
        this.vame = true;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__customerlist_customerlist__["a" /* CustomerlistPage */], {
            callback: this.CallbackFunction,
            animate: true
        });
    };
    VisitPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-visit',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\visit\visit.html"*/'<!--\n  Generated template for the VisitPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>新增拜访</ion-title>\n    <div class="remark-save"  >保存</div>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n\n\n  <ion-item class="itemclass">\n    <ion-label>客户类型</ion-label>\n\n      <!--<ion-select  [(ngModel)]="opTionValue"  (ngModelChange)="change(opTionValue)" cancelText="取消" okText="确定">-->\n        <!--<ion-option *ngFor="let opTion of valueList" [value]="opTion.value">{{opTion.name}}</ion-option>-->\n      <!--</ion-select>-->\n    <ion-select class="common_font" [(ngModel)]="opTionValue" (ngModelChange)="change(opTionValue)" interface="popover" placeholder="请选择">\n    <ion-option *ngFor="let opTion of valueList"  [value]="opTion.value">{{opTion.name}}</ion-option>\n    </ion-select>\n    <ion-label class="img4 imgall4"></ion-label>\n  </ion-item>\n\n\n  <ion-item class="itemclass">\n    <ion-label fixed style="padding-left: 0%">客户姓名</ion-label>\n    <ion-input  [ngClass]="{\'slideone\':opTionValue==\'1\',\'slidetwo\':opTionValue==\'3\',\'slidethree\':opTionValue==\'2\'}"  disabled="true"type="text" placeholder="请选择姓名" value={{visitgetfolist}} (click)="changebutton()"></ion-input>\n    <ion-input   [ngClass]="{\'slideone\':opTionValue==\'2\',\'slidetwo\':opTionValue==\'1\',\'slidethree\':opTionValue==\'3\'}"  disabled="true" type="text"  placeholder="请选择姓名" value={{visitgetfolist}} (click)="changebutton()"></ion-input>\n    <ion-input   [ngClass]="{\'slideone\':opTionValue==\'3\',\'slidetwo\':opTionValue==\'2\',\'slidethree\':opTionValue==\'1\'}"   type="text"  placeholder="请输入姓名" value={{visitgetfolist}} ></ion-input>\n    <ion-label *ngIf="opTionValue!=\'3\'" class="footer-img3 footer-imgall" ></ion-label>\n  </ion-item>\n\n\n  <ion-item class="itemclass">\n    <ion-label fixed style="padding-left: 7%">地点</ion-label>\n    <ion-input style="padding-left: 1%"  type="text" placeholder="请填写地点" value="{{visitgetfolistiph}}"></ion-input>\n\n  </ion-item>\n  <ion-item id="time"class="itemclass">\n    <ion-label class="market-list-name">开始时间</ion-label>\n    <ion-datetime class="market-list-cont" cancelText="取消" doneText="确定" displayFormat="YYYY年MM月DD日 HH:mm" [(ngModel)]="newtime.starttime"></ion-datetime>\n    <ion-label class="footer-img footer-imgal2" ></ion-label>\n  </ion-item>\n\n\n  <ion-item id="endtime"class="itemclass">\n    <ion-label class="market-list-name">结束时间</ion-label>\n    <ion-datetime class="market-list-cont" cancelText="取消" doneText="确定" displayFormat="YYYY年MM月DD日 HH:mm" [(ngModel)]="newtime.starttime"></ion-datetime>\n    <ion-label class="footer-img footer-imgal2" ></ion-label>\n  </ion-item>\n  <!--<button ion-button class="buttonstyle" (click)="changebutton()">1</button>-->\n  <ion-item class="itemclass">\n    <ion-label fixed style="padding-left: 7%">事项</ion-label>\n    <ion-input style="padding-left: 1%"  type="text" placeholder="请填写地点" value="{{visitgetfolistiph}}"></ion-input>\n\n  </ion-item>\n\n\n  <!--<ion-item>-->\n    <!--<ion-label fixed>拜访时间</ion-label>-->\n    <!--<ion-input type="date"  value="2018/03/05"></ion-input>-->\n    <!--<ion-label class="footer-img footer-imgal2" ></ion-label>-->\n  <!--</ion-item>-->\n\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\visit\visit.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], VisitPage);
    return VisitPage;
}());

//# sourceMappingURL=visit.js.map

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReceptionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__peoplerecept_peoplerecept__ = __webpack_require__(380);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ReceptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReceptionPage = (function () {
    function ReceptionPage(navCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.visitgetfolist = [];
        this.visitgetfolistiph = [];
        this.newtime = {};
        this.opTionValue = sessionStorage.getItem("id");
        this.valueList = [
            { "value": "1", "name": "正式客户" },
            { "value": "2", "name": "潜在客户" }
        ];
        //回调方法
        this.CallbackFunction = function (_params, _params1) {
            return new Promise(function (resolve, reject) {
                _this.visitgetfolist = _params;
                _this.visitgetfolistiph = _params1;
                resolve();
            });
        };
        this.visitgetfolist.push(this.navParams.get('detail'));
        this.visitgetfolistiph.push(this.navParams.get('iph'));
        this.newtime.starttime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString();
    }
    ReceptionPage.prototype.ionViewDidLoad = function () {
        if (this.opTionValue == "" || this.opTionValue == null) {
            this.opTionValue = "1";
        }
        console.log(this.visitgetfolist);
    };
    ReceptionPage.prototype.change = function (opTionValue) {
        this.opTionValue = opTionValue;
        sessionStorage.setItem("id", this.opTionValue);
        // window.location.reload()
    };
    ReceptionPage.prototype.changebutton = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__peoplerecept_peoplerecept__["a" /* PeoplereceptPage */], {
            callback: this.CallbackFunction,
            animate: true
        });
    };
    ReceptionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-reception',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\reception\reception.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>新增接待</ion-title>\n    <div class="remark-save"  >保存</div>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n\n\n  <ion-item class="itemclass">\n    <ion-label>客户类型</ion-label>\n\n    <!--<ion-select  [(ngModel)]="opTionValue"  (ngModelChange)="change(opTionValue)" cancelText="取消" okText="确定">-->\n    <!--<ion-option *ngFor="let opTion of valueList" [value]="opTion.value">{{opTion.name}}</ion-option>-->\n    <!--</ion-select>-->\n    <ion-select class="common_font" [(ngModel)]="opTionValue" (ngModelChange)="change(opTionValue)" interface="popover" placeholder="请选择">\n      <ion-option *ngFor="let opTion of valueList" [value]="opTion.value">{{opTion.name}}</ion-option>\n    </ion-select>\n    <ion-label class="img4 imgall4"></ion-label>\n  </ion-item>\n\n\n  <ion-item class="itemclass">\n    <ion-label fixed style="padding-left: 8%">姓名</ion-label>\n    <ion-input style="padding-left: 3%" [ngClass]="{\'slideone\':opTionValue==\'2\',\'slidetwo\':opTionValue==\'1\'}"  type="text" placeholder="请输入姓名" value={{visitgetfolist}} (click)="changebutton()"></ion-input>\n    <ion-input style="padding-left: 3%" [ngClass]="{\'slideone\':opTionValue==\'1\',\'slidetwo\':opTionValue==\'2\'}"  disabled="true" placeholder="请选择姓名" type="text"  value={{visitgetfolist}} (click)="changebutton()"></ion-input>\n    <ion-label class="footer-img3 footer-imgall" ></ion-label>\n  </ion-item>\n\n\n  <!--<button ion-button class="buttonstyle" (click)="changebutton()">1</button>-->\n  <ion-item class="itemclass">\n    <ion-label fixed style="padding-left: 4%">手机号</ion-label>\n    <ion-input style="padding-left: 3%" [ngClass]="{\'slideone\':opTionValue==\'2\',\'slidetwo\':opTionValue==\'1\'}" type="text" placeholder="请输入号码" value="{{visitgetfolistiph}}"></ion-input>\n    <ion-input style="padding-left: 3%" [ngClass]="{\'slideone\':opTionValue==\'1\',\'slidetwo\':opTionValue==\'2\'}" disabled="true" type="text" placeholder="请选择号码" value="{{visitgetfolistiph}}"></ion-input>\n  </ion-item>\n\n  <ion-item id="endtime" class="itemclass">\n    <ion-label class="market-list-name">拜访时间</ion-label>\n    <ion-datetime class="market-list-cont" cancelText="取消" doneText="确定" displayFormat="YYYY年MM月DD日 HH:mm" [(ngModel)]="newtime.starttime"></ion-datetime>\n    <ion-label class="footer-img footer-imgal2" ></ion-label>\n  </ion-item>\n\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\reception\reception.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ReceptionPage);
    return ReceptionPage;
}());

//# sourceMappingURL=reception.js.map

/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReportPage = (function () {
    function ReportPage(navCtrl, navParams, httpService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.alertCtrl = alertCtrl;
        this.title = "修改";
        this.changeBtn = "编辑";
        this.read = true;
        this.test = this.navParams.get('animate');
    }
    ReportPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewDidLoad ReportPage');
        var url = "market/updateMarkReport.json";
        this.httpService.postData({
            url: url,
            body: {}
        }).then(function (res) {
            // console.log(res);
            console.log(_this.test);
            if (res.status == 0) {
                _this.theme = res.resultRes.theme;
                _this.content = res.resultRes.content;
            }
            else if (res.status == 1) {
                _this.title = "新增";
                _this.changeBtn = "保存";
                _this.read = false;
            }
            else {
                _this.showAlert();
            }
        });
    };
    ReportPage.prototype.saveReport = function (theme, conten) {
        var _this = this;
        if (this.changeBtn == "编辑") {
            // angular.element
            this.changeBtn = "保存";
            this.read = false;
        }
        else if (this.changeBtn == "保存") {
            this.read = true;
            console.log(theme + conten);
            this.changeBtn = "编辑";
            // this.navCtrl.pop();
            var url = "performance/customerCurrent.json";
            this.httpService.getData({
                url: url,
                body: {
                    theme: theme,
                    conten: conten
                },
            })
                .then(function (res) {
                var result = res.status;
                //alert(result);
                if (result == 0) {
                    _this.showAlertMsg(_this.title + "成功");
                    _this.ionViewWillEnter();
                }
                else {
                    _this.showAlertMsg(_this.title + "失败");
                    //alert("登陆失败");
                    // let toast = this.toastCtrl.create({
                    //   message: '登陆失败',
                    //   duration: 3000,//3秒后自动消失
                    //   position: 'top'//位置
                    // })
                    // toast.present();
                }
            }).catch(function (error) {
                _this.showAlertMsg(_this.title + "错误");
            });
        }
    };
    ReportPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: '系统提示',
            subTitle: '暂无数据',
            buttons: ['确定']
        });
        alert.present();
    };
    ReportPage.prototype.showAlertMsg = function (messag) {
        var alert = this.alertCtrl.create({
            title: '系统提示',
            subTitle: messag,
            buttons: ['确定']
        });
        alert.present();
    };
    ReportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-report',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\report\report.html"*/'<!--\n  Generated template for the ReportPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{title}}报告</ion-title>\n    <div class="report-save" (click)="saveReport(theme,content)">{{changeBtn}}</div>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div class="report-list">\n    <div class="report-list-name left">主题</div>\n    <div class="report-list-cont left"  style="height: 3rem;">\n      <input type="text" class="report-input" [(ngModel)]="theme" id="reportId"  [readonly]="read">\n    </div>\n  </div>\n\n  <div class="report-list">\n    <div class="report-list-name left">内容</div>\n    <div class="report-list-cont left">\n      <textarea class="report-text" [(ngModel)]="content" id="reportText"  [readonly]="read"></textarea>\n    </div>\n  </div>\n  <!--<div class="remark-button">-->\n    <!--<button ion-button color="light" round (click)="saveReport(theme,content)">保存</button>-->\n  <!--</div>-->\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\report\report.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], ReportPage);
    return ReportPage;
}());

//# sourceMappingURL=report.js.map

/***/ }),

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendar__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__calendar_util__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__calendar_holiday__ = __webpack_require__(382);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var CalendarModule = (function () {
    function CalendarModule() {
    }
    CalendarModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_0__calendar__["a" /* Calendar */]],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicModule */]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_0__calendar__["a" /* Calendar */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__calendar_util__["a" /* CalendarUtil */],
                __WEBPACK_IMPORTED_MODULE_4__calendar_holiday__["a" /* CalendarHoliday */]
            ]
        })
    ], CalendarModule);
    return CalendarModule;
}());

//# sourceMappingURL=calendar.module.js.map

/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Calendar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_third_path_third_path__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__calendar_util__ = __webpack_require__(381);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 *  日历控件
 */
var Calendar = (function () {
    function Calendar(third, calendar) {
        var _this = this;
        this.third = third;
        this.calendar = calendar;
        /**
         *  日历标题 头是否需要显示
         * @type {boolean}
         */
        this.calendarHeader = true;
        /**
         *  日历开关 左右控制
         * @type {boolean}
         */
        this.calendarOperate = true;
        /**
         * 日历模式 months:按月排日期  weeks:按周排日期
         * @type {string}
         */
        this.calendarModal = 'weeks';
        /**
         * 是否显示农历
         * @type {boolean}
         */
        this.showCNDate = false;
        /**
         * 不是本月的 无点击事件
         * @type {boolean}
         */
        this.canClickOutOfMonth = true;
        this.onDayEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.onChangeEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.onTitleChangeEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.onIsTodayEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.onModalChangeEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */](); //周、月的切换
        /**
         * @type {any[]}
         */
        this.weekdaysMin = ['日', '一', '二', '三', '四', '五', '六'];
        /**
         * 日历标题
         */
        this.calendarTitle = '';
        /**
         * 日期列表
         * @type {any[]}
         */
        this.days = [];
        /**
         * 选中的日期
         * @type {string}
         */
        this.selectedDate = '';
        /**
         * 当前显示的box
         * @type {string}
         */
        this.selectBox = '';
        this.daysEvents = {};
        /**
         * 设置为当天
         */
        this.goToday = function () {
            _this.setCalendarHeader(_this.third.moment().format('LL'));
            var today = _this.third.moment().format('LL');
            var day = { date: today, fullDate: _this.solar2lunar(today) };
            _this.onDayClick(today, day);
        };
        /**
         * 设置地区
         */
        this.setLocale = function () {
            _this.third.moment.locale('zh-cn', {
                longDateFormat: {
                    L: "YYYY/MM",
                    LL: "YYYY/MM/DD",
                    l: "YYYY年M月",
                    ll: "YYYY年MM月DD日"
                }
            });
        };
        /**
         * 设置日历标题
         * @param {string} date
         */
        this.setCalendarHeader = function (date) {
            switch (_this.calendarModal) {
                // case 'weeks':
                //   this.calendarTitle = `${this.third.moment(date, 'LL').format('YYYY年')}
                //   第${this.third.moment(date, 'LL').week()}周`
                //   break;
                default:
                    _this.calendarTitle = "" + _this.third.moment(date, 'LL').format('l');
                    break;
            }
            _this.onTitleChangeEvent.emit(_this.calendarTitle);
            _this.setDays(date);
        };
        /**
         * 设置日历日期
         * @param {string} date
         */
        this.setDays = function (date) {
            switch (_this.calendarModal) {
                // case 'weeks':
                //   this.setDaysByWeeks(date)
                //   break;
                case 'months':
                    _this.setDaysByMonths(date);
                    break;
                default:
                    _this.calendarModal = 'weeks';
                    _this.setDaysByWeeks(date);
                    break;
            }
            _this.onChangeEvent.emit(date);
        };
        /**
         * 通过月设置日历日期
         * @param {string} date
         */
        this.setDaysByMonths = function (date) {
            _this.days = [];
            _this.selectBox = _this.third.moment(date, 'LL').startOf('month').format('LL');
            //1.计算当前日期这个月最后一天的日期
            var lastDateOfMonth = _this.third.moment(date, 'LL').endOf('month');
            var lastDayOfMonth = lastDateOfMonth.get('date');
            //2.计算这个月1号是星期几
            var startDateOfMonth = _this.third.moment(date, 'LL').startOf('month');
            var firstWeek = startDateOfMonth.isoWeekday() == 7 ? 0 : startDateOfMonth.isoWeekday();
            var endWeek = lastDateOfMonth.isoWeekday() == 7 ? 0 : lastDateOfMonth.isoWeekday();
            var day;
            //3.计算上个月留几天在本月页面
            for (var i = firstWeek; i > 0; i--) {
                var obj = _this.third.moment(date, 'LL').startOf('month').subtract(i, 'days').format('LL');
                day = { date: obj, fullDate: _this.solar2lunar(obj) };
                _this.days.push(day);
            }
            //4.当前月份的天数列表
            for (var i = 0; i < lastDayOfMonth; i++) {
                var obj = _this.third.moment(date, 'LL').startOf('month').add(i, 'days').format('LL');
                day = { date: obj, fullDate: _this.solar2lunar(obj) };
                _this.days.push(day);
            }
            //5.计算下个月留几天在本月页面
            for (var i = 1; i <= 6 - endWeek; i++) {
                var obj = _this.third.moment(date, 'LL').endOf('month').add(i, 'days').format('LL');
                day = { date: obj, fullDate: _this.solar2lunar(obj) };
                _this.days.push(day);
            }
        };
        /**
         * 通过周设置日历日期
         * @param {string} date
         */
        this.setDaysByWeeks = function (date) {
            _this.days = [];
            _this.selectBox = _this.third.moment(date, 'LL').startOf('weeks').format('LL');
            var day;
            for (var i = 0; i < 7; i++) {
                var obj = _this.third.moment(_this.selectBox, 'LL').add(i, 'days').format('LL');
                day = { date: obj, fullDate: _this.solar2lunar(obj) };
                _this.days.push(day);
            }
        };
        /**
         * 下个月或者下周
         */
        this.next = function () {
            switch (_this.calendarModal) {
                case 'weeks':
                    _this.selectBox = _this.third.moment(_this.selectBox, 'LL').add(7, 'days').format('LL');
                    _this.setCalendarHeader(_this.selectBox);
                    var day = { date: _this.selectBox, fullDate: _this.solar2lunar(_this.selectBox) };
                    _this.onDayClick(_this.selectBox, day);
                    break;
                default:
                    _this.selectBox = _this.third.moment(_this.selectBox, 'LL').add(1, 'months').format('LL');
                    _this.setCalendarHeader(_this.selectBox);
                    var daySelect = { date: _this.selectBox, fullDate: _this.solar2lunar(_this.selectBox) };
                    _this.onDayClick(_this.selectBox, daySelect);
                    break;
            }
        };
        /**
         * 上个月或上周
         */
        this.previous = function () {
            switch (_this.calendarModal) {
                case 'weeks':
                    _this.selectBox = _this.third.moment(_this.selectBox, 'LL').subtract(7, 'days').format('LL');
                    _this.setCalendarHeader(_this.selectBox);
                    var daySelect = { date: _this.selectBox, fullDate: _this.solar2lunar(_this.selectBox) };
                    _this.onDayClick(_this.selectBox, daySelect);
                    break;
                default:
                    _this.selectBox = _this.third.moment(_this.selectBox, 'LL').subtract(1, 'months').format('LL');
                    _this.setCalendarHeader(_this.selectBox);
                    var day = { date: _this.selectBox, fullDate: _this.solar2lunar(_this.selectBox) };
                    _this.onDayClick(_this.selectBox, day);
                    break;
            }
        };
        /**
         * 模式切换为 weeks
         */
        this.onPanUp = function () {
            if (_this.calendarModal != 'weeks') {
                _this.calendarModal = 'weeks';
                var today = _this.third.moment().format('LL');
                if (_this.third.moment(_this.selectBox, 'LL').format('L') == _this.third.moment(today, 'LL').format('L')) {
                    if (_this.selectedDate) {
                        if (_this.third.moment(_this.selectBox, 'LL').format('L') == _this.third.moment(_this.selectedDate, 'LL').format('L')) {
                            _this.setCalendarHeader(_this.selectedDate);
                        }
                        else {
                            _this.setCalendarHeader(_this.selectBox);
                        }
                    }
                    else {
                        _this.setCalendarHeader(today);
                    }
                }
                else {
                    if (_this.selectedDate) {
                        if (_this.third.moment(_this.selectBox, 'LL').format('L') == _this.third.moment(_this.selectedDate, 'LL').format('L')) {
                            _this.setCalendarHeader(_this.selectedDate);
                        }
                        else {
                            _this.setCalendarHeader(_this.selectBox);
                        }
                    }
                    else {
                        _this.setCalendarHeader(_this.selectBox);
                    }
                }
                var day = { date: _this.selectedDate, fullDate: _this.solar2lunar(_this.selectedDate) };
                _this.onDayClick(_this.selectedDate, day);
            }
        };
        /**
         * 模式切换为 moths
         */
        this.onPanDown = function () {
            if (_this.calendarModal != 'months') {
                _this.calendarModal = 'months';
                var today = _this.third.moment().format('LL');
                console.log(_this.selectBox);
                var start = _this.third.moment(_this.selectBox, 'LL').startOf('weeks').format('LL');
                var end = _this.third.moment(_this.selectBox, 'LL').endOf('weeks').format('LL');
                if (today < start || today > end) {
                    if (_this.selectedDate) {
                        if (_this.selectedDate < start || _this.selectedDate > end) {
                            _this.setCalendarHeader(_this.selectBox);
                        }
                        else {
                            _this.setCalendarHeader(_this.selectedDate);
                        }
                    }
                    else {
                        _this.setCalendarHeader(_this.selectBox);
                    }
                }
                else {
                    if (_this.selectedDate) {
                        if (_this.selectedDate < start || _this.selectedDate > end) {
                            _this.setCalendarHeader(today);
                        }
                        else {
                            _this.setCalendarHeader(_this.selectedDate);
                        }
                    }
                    else {
                        _this.setCalendarHeader(_this.selectBox);
                    }
                }
                var day = { date: _this.selectedDate, fullDate: _this.solar2lunar(_this.selectedDate) };
                _this.onDayClick(_this.selectedDate, day);
                // this.onModalChangeEvent.emit(this.selectedDate);
            }
        };
        this.onDayClick = function (date, day) {
            switch (_this.calendarModal) {
                case 'weeks':
                    // if(this.selectedDate == date) {
                    //   // this.selectedDate = '';
                    //   return;
                    // }
                    _this.selectedDate = date;
                    // this.onDayEvent.emit(day);
                    day.hasEvent = _this.hasEvent(date);
                    _this.onDayEvent.emit(day);
                    _this.onIsTodayEvent.emit(_this.isToday(date));
                    break;
                default:
                    if (_this.third.moment(date, 'LL').format('L') < _this.third.moment(_this.selectBox, 'LL').format('L')) {
                        if (_this.canClickOutOfMonth) {
                            _this.previous();
                        }
                    }
                    else if (_this.third.moment(date, 'LL').format('L') > _this.third.moment(_this.selectBox, 'LL').format('L')) {
                        if (_this.canClickOutOfMonth) {
                            _this.next();
                        }
                    }
                    else {
                        // if(this.selectedDate == date) {
                        //   // this.selectedDate = '';
                        //   return;
                        // }
                        _this.selectedDate = date;
                        // this.onDayEvent.emit(date);
                        day.hasEvent = _this.hasEvent(date);
                        _this.onDayEvent.emit(day);
                        _this.onIsTodayEvent.emit(_this.isToday(date));
                    }
                    break;
            }
        };
        /**
         * 设置Wrapper的class
         */
        this.setWrapper = function () {
            if (_this.calendarModal == 'weeks')
                return 'calendar-model-w';
            return 'calendar-model-m';
        };
        /**
         * 不是当前月
         * @param {string} date
         * @returns {boolean}
         */
        this.outOfMonth = function (date) {
            if (!_this.selectBox)
                return false;
            if (_this.calendarModal == 'weeks')
                return false;
            date = _this.third.moment(date, 'LL').format('L');
            if (_this.third.moment(_this.selectBox, 'LL').format('L') != date)
                return true;
            return false;
        };
        /**
         * 是否是今天
         * @param date
         * @returns {boolean}
         */
        this.isToday = function (date) {
            var today = _this.third.moment().format('LL');
            if (date == today)
                return true;
            return false;
        };
        /**
         * 休息日判断
         * @param date
         * @returns {boolean}
         */
        this.dayOff = function (date) {
            var week = _this.third.moment(date, 'LL').isoWeekday();
            if (week == 6 || week == 7)
                return true;
            return false;
        };
        /**
         * 是否今天有事件
         * @param date
         * @returns {boolean}
         */
        this.hasEvent = function (date) {
            if (!_this.daysEvents || !_this.daysEvents[date])
                return false;
            return true;
        };
        this.solar2lunar = function (date) {
            var year = _this.third.moment(date, 'LL').get('year');
            var month = _this.third.moment(date, 'LL').get('month');
            var day = _this.third.moment(date, 'LL').get('date');
            var fullDate = _this.calendar.solar2lunar(year, month + 1, day);
            return fullDate;
        };
    }
    Calendar.prototype.ngAfterViewInit = function () {
        this.setLocale();
        this.goToday();
    };
    Calendar.prototype.ngOnChanges = function (changes) {
        if (changes.daysEvents) {
            this.daysEvents = changes.daysEvents.currentValue;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], Calendar.prototype, "calendarHeader", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], Calendar.prototype, "calendarOperate", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], Calendar.prototype, "calendarModal", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], Calendar.prototype, "showCNDate", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], Calendar.prototype, "canClickOutOfMonth", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], Calendar.prototype, "onDayEvent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], Calendar.prototype, "onChangeEvent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], Calendar.prototype, "onTitleChangeEvent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], Calendar.prototype, "onIsTodayEvent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], Calendar.prototype, "onModalChangeEvent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], Calendar.prototype, "daysEvents", void 0);
    Calendar = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'calendar',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\components\calendar\calendar.html"*/'<div class="calendar">\n  <!--<ion-toolbar *ngIf="calendarHeader">-->\n    <!--<ion-buttons start *ngIf="calendarOperate">-->\n      <!--<button ion-button icon-only (click)="previous()">-->\n        <!--<ion-icon name="arrow-back"></ion-icon>-->\n      <!--</button>-->\n    <!--</ion-buttons>-->\n    <!--<ion-title>{{calendarTitle}}</ion-title>-->\n    <!--<ion-buttons end *ngIf="calendarOperate">-->\n      <!--<button ion-button icon-only (click)="next()">-->\n        <!--<ion-icon name="arrow-forward"></ion-icon>-->\n      <!--</button>-->\n    <!--</ion-buttons>-->\n  <!--</ion-toolbar>-->\n  <div class="calendar-content">\n    <div class="calendar-weekday" *ngIf="weekdaysMin.length>0">\n      <div class="calendar-item" *ngFor="let week of weekdaysMin">\n        <div class="item-week" text-center>{{week}}</div>\n      </div>\n    </div>\n    <div class="calendar-wrapper"\n         [ngClass]="setWrapper()">\n      <div class=\'calendar-box\'>\n        <div class="calendar-item" *ngFor="let day of days">\n          <div class="item-day" text-center>\n            <div class="day"\n                 [ngClass]="{\'has-date-cn\':showCNDate,\'out-of-month\':outOfMonth(day.date)\n                 ,\'selected\':selectedDate==day.date,\'today\':isToday(day.date),\'has-event\':hasEvent(day.date)\n                 ,\'work\':day.fullDate.holiday==1,\'holiday\':day.fullDate.holiday==2,\n                 \'day-off\':dayOff(day.date)}"\n                 (click)="onDayClick(day.date,day)">\n              <div class="date">{{third.moment(day.date, \'LL\').get(\'date\')}}</div>\n              <div class="date-cn" *ngIf="showCNDate">{{day.fullDate.lFtv||day.fullDate.sFtv||day.fullDate.Term||day.fullDate.IDayCn}}</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\components\calendar\calendar.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_third_path_third_path__["a" /* ThirdPath */],
            __WEBPACK_IMPORTED_MODULE_2__calendar_util__["a" /* CalendarUtil */]])
    ], Calendar);
    return Calendar;
}());

//# sourceMappingURL=calendar.js.map

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OpinionfedbPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the OpinionfedbPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OpinionfedbPage = (function () {
    function OpinionfedbPage(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
    }
    OpinionfedbPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OpinionfedbPage');
    };
    OpinionfedbPage.prototype.uptext = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            subTitle: '感谢你的意见反馈我们将尽快完善',
            buttons: [
                {
                    text: '确定',
                    handler: function () {
                        _this.feedback = undefined;
                    }
                },
            ]
        });
        alert.present();
        console.log(this.feedback);
    };
    OpinionfedbPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-opinionfedb',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\opinionfedb\opinionfedb.html"*/'<!--\n  Generated template for the OpinionfedbPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>意见反馈</ion-title>\n    <div class="remark-save" (click)="uptext()">提交</div>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div class="remark-list clearfix">\n    <!--<div class="remark-list-name left">内容</div>-->\n    <div class="remark-list-cont left">\n      <textarea [(ngModel)]="feedback" class="remark-text" id="meetingcontent" placeholder="在这里输入您的想法和意见"></textarea>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\opinionfedb\opinionfedb.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], OpinionfedbPage);
    return OpinionfedbPage;
}());

//# sourceMappingURL=opinionfedb.js.map

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FunddailyreportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the FunddailyreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FunddailyreportPage = (function () {
    function FunddailyreportPage(navCtrl, navParams, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.data = [];
    }
    FunddailyreportPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad FunddailyreportPage');
        this.getInfo();
    };
    FunddailyreportPage.prototype.getInfo = function () {
        var _this = this;
        this.data = [];
        var url = "count/countlist.json";
        this.httpService.postData({
            url: url,
            body: {}
        })
            .then(function (res) {
            var pieData = res.resultRes.data;
            for (var o in pieData) {
                _this.data.push(pieData[o]);
            }
            console.log(_this.data);
        });
    };
    FunddailyreportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-funddailyreport',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\funddailyreport\funddailyreport.html"*/'<!--\n  Generated template for the FunddailyreportPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>资金日报表</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-scroll scrollX="true">\n  <div >\n    <ion-grid class="guid gridcolor">\n      <ion-row >\n        <ion-col width-25 class="blackwideFont ioncol">项目名称</ion-col>\n        <ion-col width-25 class="blackwideFont ioncol">当前余额</ion-col>\n        <ion-col width-25 class="blackwideFont ioncol">比上期</ion-col>\n        <ion-col width-25 class="blackwideFont fontarea">比年初</ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <ion-grid >\n      <ion-row  *ngFor="let res of data" style="border-bottom: 1px solid grey;">\n        <ion-col width-25 class="ioncol"> {{ res.projectName }}</ion-col>\n        <ion-col width-25 class="ioncol"> {{ res.balance }}</ion-col>\n        <ion-col width-25 class="ioncol"> {{ res.comparelast }}</ion-col>\n        <ion-col width-25 class="fontarea"> {{ res.comparelastyear }}</ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n  </ion-scroll>\n\n\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\funddailyreport\funddailyreport.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */]])
    ], FunddailyreportPage);
    return FunddailyreportPage;
}());

//# sourceMappingURL=funddailyreport.js.map

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BranchlinereportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the BranchlinereportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BranchlinereportPage = (function () {
    function BranchlinereportPage(navCtrl, navParams, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.data = [];
        this.myList = [];
        this.UnderList = [];
        this.toggle = [];
        this.toggleSelect = "";
        this.tiemSelectval = "存款";
        this.stateSelectval = "未完成";
        this.select = {
            ismyListshow: false,
            isUnderListshow: false,
            UnderList: [
                { option: "各项存款", ischecked: false },
                { option: "大中企业存款", ischecked: false },
                { option: "小企业存款", ischecked: false },
                { option: "储蓄存款", ischecked: false }
            ],
            UnderList1: [
                { option: "各项贷款", ischecked: false },
                { option: "大中企业贷款", ischecked: false },
                { option: "大中企业贴现", ischecked: false },
                { option: "零售条线表内贷款", ischecked: false },
                { option: "零售条线贴现", ischecked: false },
                { option: "零售条线表内贷款", ischecked: false },
                { option: "信用卡垫款", ischecked: false },
                { option: "个人条线贷款", ischecked: false }
            ],
            MyList: [
                { option: "存款", ischecked: false },
                { option: "贷款", ischecked: false }
            ]
        };
    }
    BranchlinereportPage.prototype.ionViewDidLoad = function () {
        this.stateSelectval = this.select.MyList[0].option;
        this.tiemSelectval = this.select.UnderList[0].option;
        this.UnderList = this.select.UnderList;
        //console.log('ionViewDidLoad BranchlinereportPage');
        this.getInfo();
    };
    BranchlinereportPage.prototype.getInfo = function () {
        var _this = this;
        this.data = [];
        var url = "count/countlist.json";
        this.httpService.postData({
            url: url,
            body: {}
        })
            .then(function (res) {
            var pieData = res.resultRes.data;
            for (var o in pieData) {
                _this.data.push(pieData[o]);
            }
            console.log(_this.data);
        });
    };
    //设置单选列表状态
    BranchlinereportPage.prototype.showMyList = function (toggle) {
        this.toggleSelect = toggle;
        this.myList = this.select.MyList;
        if (toggle == "stat") {
            this.select.isUnderListshow = false;
            if (this.select.ismyListshow) {
                this.select.ismyListshow = false;
            }
            else {
                this.select.ismyListshow = true;
            }
        }
    };
    //设置单选列表状态
    BranchlinereportPage.prototype.showUnderList = function (toggle) {
        this.toggleSelect = toggle;
        if (toggle == "time") {
            this.select.ismyListshow = false;
            if (this.select.isUnderListshow) {
                this.select.isUnderListshow = false;
            }
            else {
                this.select.isUnderListshow = true;
            }
        }
    };
    //设置筛选内容
    BranchlinereportPage.prototype.getValues = function (val) {
        if (this.toggleSelect === "stat") {
            this.stateSelectval = val;
            console.log("toggle:" + this.stateSelectval);
            if (val == "贷款") {
                this.tiemSelectval = this.select.UnderList1[0].option;
                this.UnderList = this.select.UnderList1;
            }
            else {
                this.tiemSelectval = this.select.UnderList[0].option;
                this.UnderList = this.select.UnderList;
            }
        }
        if (this.toggleSelect === "time") {
            console.log("toggle:" + this.toggleSelect);
            this.tiemSelectval = val;
        }
        this.select.ismyListshow = false;
        this.select.isUnderListshow = false;
        console.log(this.stateSelectval);
        console.log(this.tiemSelectval);
        /*const url = "count/countlist.json";
        this.httpService.postData({
          url: url,
          body: {
    
          }
        })
          .then(res=>{
            let pieData = res.resultRes.data;
            for(var o in pieData){
              this.data.push(pieData[o]);
            }
            console.log(this.data);
          })*/
    };
    BranchlinereportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-branchlinereport',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\branchlinereport\branchlinereport.html"*/'<!--\n  Generated template for the BranchlinereportPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>分支行条线存贷款统计表</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <div class="row nav-filtrate">\n      <ion-grid>\n        <ion-row >\n          <ion-col width-50>\n            <div (click)="showMyList(\'stat\')" class="select-state select ">\n              <label>\n                <span>{{stateSelectval}}</span>\n                <ion-icon class="icon-down" name="arrow-down" ios="ios-arrow-down" md="md-arrow-down"></ion-icon>\n              </label>\n            </div>\n            <ion-list [ngClass]="{show:select.ismyListshow}" radio-group style="width: 100%;margin-left:-5px;float: left;display: none;">\n              <ion-item *ngFor="let item of myList" class="items" style="border-bottom: 0.55px solid #c8c7cc;font-size: 1.4rem;text-align: center;">\n                <ion-label>{{item.option}}</ion-label>\n                <ion-radio (click)="getValues(item.option)" value="{{item.option}}"></ion-radio>\n              </ion-item>\n            </ion-list>\n          </ion-col>\n          <ion-col width-50>\n            <div (click)="showUnderList(\'time\')" class="select-state select " >\n              <label>\n                <span>{{tiemSelectval}}</span>\n                <ion-icon class="icon-down" name="arrow-down" ios="ios-arrow-down" md="md-arrow-down"></ion-icon>\n              </label>\n            </div>\n            <ion-list [ngClass]="{show:select.isUnderListshow}" radio-group style="width: 100%;margin-left:-5px;float: right;display: none;">\n              <ion-item *ngFor="let item of UnderList" class="items" style="border-bottom: 0.55px solid #c8c7cc;font-size: 1.4rem;text-align: center;">\n                <ion-label>{{item.option}}</ion-label>\n                <ion-radio (click)="getValues(item.option)" value="{{item.option}}"></ion-radio>\n              </ion-item>\n            </ion-list>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n      <ion-grid class="guid gridcolor">\n        <ion-row >\n          <ion-col width-25 class="blackwideFont ioncol">项目名称</ion-col>\n          <ion-col width-25 class="blackwideFont ioncol">当前余额</ion-col>\n          <ion-col width-25 class="blackwideFont ioncol">比上期</ion-col>\n          <ion-col width-25 class="blackwideFont fontarea">比年初</ion-col>\n        </ion-row>\n      </ion-grid>\n\n      <ion-grid >\n        <ion-row  *ngFor="let res of data" style="border-bottom: 0.55px solid #c8c7cc;">\n          <ion-col width-25 class="ioncol"> {{ res.projectName }}</ion-col>\n          <ion-col width-25 class="ioncol"> {{ res.balance }}</ion-col>\n          <ion-col width-25 class="ioncol"> {{ res.comparelast }}</ion-col>\n          <ion-col width-25 class="fontarea"> {{ res.comparelastyear }}</ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\branchlinereport\branchlinereport.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */]])
    ], BranchlinereportPage);
    return BranchlinereportPage;
}());

//# sourceMappingURL=branchlinereport.js.map

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LargechangereportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the LargechangereportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LargechangereportPage = (function () {
    function LargechangereportPage(navCtrl, navParams, httpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.data = [];
    }
    LargechangereportPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad LargechangereportPage');
        this.getInfo();
    };
    LargechangereportPage.prototype.getInfo = function () {
        var _this = this;
        this.data = [];
        var url = "count/countlist.json";
        this.httpService.postData({
            url: url,
            body: {}
        })
            .then(function (res) {
            var pieData = res.resultRes.data;
            for (var o in pieData) {
                _this.data.push(pieData[o]);
            }
            console.log(_this.data);
        });
    };
    LargechangereportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-largechangereport',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\largechangereport\largechangereport.html"*/'<!--\n  Generated template for the FunddailyreportPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>存款余额大额变动表</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding >\n  <ion-scroll scrollX="true">\n    <div style="width: 250%">\n      <ion-grid class="guid gridcolor">\n        <ion-row >\n          <ion-col width-25 class="blackwideFont ioncol">账号</ion-col>\n          <ion-col width-25 class="blackwideFont ioncol">户名</ion-col>\n          <ion-col width-25 class="blackwideFont ioncol">客户属性</ion-col>\n          <ion-col width-25 class="blackwideFont ioncol">交易日期</ion-col>\n          <ion-col width-25 class="blackwideFont ioncol">流水号</ion-col>\n          <ion-col width-25 class="blackwideFont ioncol">币种</ion-col>\n          <ion-col width-25 class="blackwideFont ioncol">交易金额</ion-col>\n          <ion-col width-25 class="blackwideFont ioncol">收付</ion-col>\n          <ion-col width-25 class="blackwideFont ioncol">余额</ion-col>\n          <ion-col width-25 class="blackwideFont ioncol">发生网点</ion-col>\n          <ion-col width-25 class="blackwideFont ioncol">开户网点</ion-col>\n          <ion-col width-25 class="blackwideFont ioncol">交易码</ion-col>\n          <ion-col width-25 class="blackwideFont fontarea">对方账号</ion-col>\n        </ion-row>\n      </ion-grid>\n\n      <ion-grid >\n        <ion-row  *ngFor="let res of data" style="border-bottom: 1px solid grey;">\n          <ion-col width-25 class="ioncol"> {{ res.projectName }}</ion-col>\n          <ion-col width-25 class="ioncol"> {{ res.balance }}</ion-col>\n          <ion-col width-25 class="ioncol"> {{ res.comparelast }}</ion-col>\n          <ion-col width-25 class="ioncol"> {{ res.projectName }}</ion-col>\n          <ion-col width-25 class="ioncol"> {{ res.balance }}</ion-col>\n          <ion-col width-25 class="ioncol"> {{ res.comparelast }}</ion-col>\n          <ion-col width-25 class="ioncol"> {{ res.projectName }}</ion-col>\n          <ion-col width-25 class="ioncol"> {{ res.balance }}</ion-col>\n          <ion-col width-25 class="ioncol"> {{ res.comparelast }}</ion-col>\n          <ion-col width-25 class="ioncol"> {{ res.projectName }}</ion-col>\n          <ion-col width-25 class="ioncol"> {{ res.balance }}</ion-col>\n          <ion-col width-25 class="ioncol"> {{ res.comparelast }}</ion-col>\n          <ion-col width-25 class="fontarea"> {{ res.comparelastyear }}</ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n  </ion-scroll>\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\largechangereport\largechangereport.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */]])
    ], LargechangereportPage);
    return LargechangereportPage;
}());

//# sourceMappingURL=largechangereport.js.map

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PromptPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MarketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PromptPage = (function () {
    function PromptPage(navCtrl, navParams, httpService, alertCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpService = httpService;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.addOthers = {};
        this.addParams = {};
        this.others = {};
        this.isDisabled = true;
        this.isSelected = false;
        this.infoType = this.navParams.get('type');
        this.num = this.navParams.get('num');
        console.log(navParams.get('otherDetails'));
        if (this.navParams.get('otherDetails')) {
            this.addOthers = this.navParams.get('otherDetails');
            this.others = JSON.stringify(this.navParams.get('otherDetails'));
            console.log(this.addOthers);
            console.log(this.addOthers.time);
            console.log(this.addOthers.time.substr(0, 10));
            this.addOthers.time = this.addOthers.time.substr(0, 10);
        }
    }
    PromptPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddOtherPage');
    };
    PromptPage.prototype.saveOther = function () {
        this.dismiss(true);
    };
    PromptPage.prototype.transformData = function (data) {
        var da = new Date(data).getDay();
        switch (da) {
            case 0:
                this.date = "周日";
                break;
            case 1:
                this.date = "周一";
                break;
            case 2:
                this.date = "周二";
                break;
            case 3:
                this.date = "周三";
                break;
            case 4:
                this.date = "周四";
                break;
            case 5:
                this.date = "周五";
                break;
            case 6:
                this.date = "周六";
                break;
            default:
                break;
        }
        return (data + " " + this.date);
    };
    PromptPage.prototype.saveInfo = function (URL) {
        var _this = this;
        this.httpService.getData({
            url: URL,
            body: {
                //        params: this.addOthers
                params: this.addParams
            },
        }).then(function (res) {
            console.log(res);
            var result = res.status;
            if (result == 0) {
                _this.showAlertMsg("保存成功", true);
            }
            else {
                _this.showAlertMsg("保存失败", false);
            }
        }).catch(function (error) {
            _this.showAlertMsg(error, false);
        });
    };
    PromptPage.prototype.showAlertMsg = function (messag, isTouter) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '系统提示',
            subTitle: messag,
            buttons: [
                {
                    text: "确定",
                    handler: function () {
                        console.log('Cancel clicked');
                        if (isTouter) {
                            if (_this.infoType == "编辑") {
                                _this.dismiss(true);
                            }
                            else {
                                _this.dismiss(true);
                            }
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    PromptPage.prototype.dismiss = function (data) {
        if (data) {
            this.viewCtrl.dismiss(this.addOthers);
        }
        else {
            console.log(this.others);
            //		this.viewCtrl.dismiss(JSON.parse(this.others));
            if (this.infoType != "编辑其它") {
                this.addOthers = this.others;
                this.viewCtrl.dismiss(this.addOthers);
            }
            else {
                this.addOthers = JSON.parse(this.others);
                this.viewCtrl.dismiss(this.addOthers);
            }
        }
    };
    PromptPage.prototype.isSelect = function () {
        console.log(this.isSelected);
    };
    PromptPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-promptpage',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\prompt\prompt.html"*/'\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>提醒</ion-title>\n    <!--<div class="save right" (click)="saveOther()">保存</div>-->\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n	\n   <div class="prompt">\n   	"新增走访记录"功能仅用于添加无走访计划的临时走访，如您已有走访计划，请通过走访计划页面撰写走访记录。否则会导致您的走访计划变为过期未走访。\n   </div>\n   <div class="prompt_checkbox">\n   		<input type="checkbox" name=\'selected\' [(ngModel)]="isSelected" (ngModelChange)="isSelect()"/>\n   		&nbsp;&nbsp;已知晓，不再提醒\n   </div>\n\n   <div class="submit" (click)="saveOther()">关闭提醒</div>\n  \n  <div class="footer"></div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\prompt\prompt.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], PromptPage);
    return PromptPage;
}());

//# sourceMappingURL=prompt.js.map

/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Constants__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(218);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HttpService = (function () {
    function HttpService(http) {
        var _this = this;
        this.http = http;
        this.server = __WEBPACK_IMPORTED_MODULE_2__Constants__["a" /* Contents */].HTTP_DATA_LOCAL;
        this.postData = function (request) {
            _this.requestMethod = HttpService_1.POST;
            return _this.getData(request);
        };
        this.deleteData = function (request) {
            _this.requestMethod = HttpService_1.DELETE;
            return _this.getData(request);
        };
        this.putData = function (request) {
            _this.requestMethod = HttpService_1.PUT;
            return _this.getData(request);
        };
        this.getData = function (request) {
            var url = _this.getAction(request.url);
            request.url = url;
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json;charset=utf-8'
                // 'X-Custom-Header':''
            });
            request.options = { headers: headers };
            request.body = request.body; // this.toJsonBody(request.body);
            request = request.requestChange && request.requestChange(request) || request;
            switch (_this.server) {
                case __WEBPACK_IMPORTED_MODULE_2__Constants__["a" /* Contents */].HTTP_DATA_DEBUG:
                    return _this.requestGet(request);
                default:
                    switch (_this.requestMethod) {
                        case HttpService_1.POST:
                            return _this.requestPost(request);
                        case HttpService_1.PUT:
                            return _this.requestPut(request);
                        case HttpService_1.DELETE:
                            return _this.requestDelete(request);
                        default:
                            return _this.requestGet(request);
                    }
            }
        };
        this.getLocationOrigin = function (port) {
            return window.location.protocol + '//' + window.location.hostname + (port ? ':' + port : '');
        };
        /**
         *
         * @param any
         * @return {string}
         *  声明: var obj= {'name':'小军',age:23};
         *  调用: toQueryBody(obj);
         *  返回: "name=%E5%B0%8F%E5%86%9B&age=23"
         */
        this.toQueryBody = function (params) {
            var ret = [];
            for (var key in params) {
                key = encodeURIComponent(key);
                var values = params[key];
                if (values && values.constructor == Array) {
                    var queryValues = [];
                    for (var i = 0, len = values.length, value = void 0; i < len; i++) {
                        value = values[i];
                        queryValues.push(_this.toQueryPair(key, value));
                    }
                    ret = ret.concat(queryValues);
                }
                else {
                    ret.push(_this.toQueryPair(key, values));
                }
            }
            return ret.join('&');
        };
        this.getAction = function (action) {
            var url = '';
            if (action.indexOf("json") != -1) {
                _this.server = __WEBPACK_IMPORTED_MODULE_2__Constants__["a" /* Contents */].HTTP_DATA_DEBUG;
            }
            else {
                _this.server = __WEBPACK_IMPORTED_MODULE_2__Constants__["a" /* Contents */].HTTP_DATA_LOCAL;
            }
            switch (_this.server) {
                case __WEBPACK_IMPORTED_MODULE_2__Constants__["a" /* Contents */].HTTP_DATA_LOCAL:
                    url = action;
                    // url=Contents.HTTP_LOCAL_ORIGIN;
                    // url = this.getLocationOrigin(Contents.HTTP_LOCAL_PORT) + Contents.HTTP_PROJECT + '/' + action;
                    break;
                case __WEBPACK_IMPORTED_MODULE_2__Constants__["a" /* Contents */].HTTP_DATA_DEBUG:
                    url = __WEBPACK_IMPORTED_MODULE_2__Constants__["a" /* Contents */].HTTP_DATA_PATH + '/' + action;
                    break;
                default:
                    url = __WEBPACK_IMPORTED_MODULE_2__Constants__["a" /* Contents */].HTTP_PROJECT + '/' + action;
                    break;
            }
            return url;
        };
        this.toJsonBody = function (obj) {
            var str = JSON.stringify(obj);
            return str;
        };
    }
    HttpService_1 = HttpService;
    HttpService.prototype.requestGet = function (request) {
        var _this = this;
        return this.http.get(request.url + '?' + request.body, request.options)
            .toPromise()
            .then(function (res) { return _this.handleSuccess(res); })
            .catch(function (error) { return _this.handleError(error); });
    };
    HttpService.prototype.requestPost = function (request) {
        var _this = this;
        return this.http.post(request.url, request.body, request.options)
            .toPromise()
            .then(function (res) { return _this.handleSuccess(res); })
            .catch(function (error) { return _this.handleError(error); });
    };
    //put 增加
    HttpService.prototype.requestPut = function (request) {
        var _this = this;
        return this.http.put(request.url, request.body, request.options)
            .toPromise()
            .then(function (res) { return _this.handleSuccess(res); })
            .catch(function (error) { return _this.handleError(error); });
    };
    //delete 删除
    HttpService.prototype.requestDelete = function (request) {
        var _this = this;
        return this.http.delete(request.url, request.options)
            .toPromise()
            .then(function (res) { return _this.handleSuccess(res); })
            .catch(function (error) { return _this.handleError(error); });
    };
    HttpService.prototype.handleSuccess = function (result) {
        if (result && !result.success) {
            // alert("result.msg");//这里使用ToastController
        }
        return result;
    };
    HttpService.prototype.handleError = function (error) {
        var msg = '请求失败';
        if (error.status == 0) {
            msg = '请求地址错误';
        }
        if (error.status == 400) {
            msg = '请求无效';
            console.log('请检查参数类型是否匹配');
        }
        if (error.status == 404) {
            msg = '请求资源不存在';
            console.error(msg + '，请检查路径是否正确');
        }
        console.log(error);
        // alert("msg");//这里使用ToastController
        return { success: false, msg: msg };
    };
    HttpService.prototype.toQueryPair = function (key, value) {
        if (typeof value == 'undefined') {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
    };
    // private server:string = Contents.HTTP_DATA_DEBUG;
    // private server:string = Contents.HTTP_DATA_PROD;
    HttpService.PUT = 'put';
    HttpService.POST = 'post';
    HttpService.DELETE = 'delete';
    HttpService = HttpService_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], HttpService);
    return HttpService;
    var HttpService_1;
}());

//# sourceMappingURL=HttpService.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addreportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__attendees_attendees__ = __webpack_require__(221);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* enableProdMode */])();
var addreportPage = (function () {
    function addreportPage(platform, navCtrl, navParams, alertCtrl, viewCtrl, modalCtrl, httpService) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.httpService = httpService;
        this.people = [];
        this.peerpames = [];
        this.myList = [];
        this.toggle = [];
        this.stateSelectval = "周会";
        this.toggleSelect = "";
        this.newtime = {};
        this.isSelected = false;
        this.showPromp = false;
        this.isShowEdit = false;
        this.attends = [];
        this.isDisplayAttend = 'none';
        this.reports = {};
        this.searchLists = [];
        this.location = "";
        this.num = 0;
        this.select = {
            ismyListshow: false,
            isUnderListshow: false,
            MyList: [
                { option: "周会", ischecked: false },
                { option: "晨会", ischecked: false },
                { option: "夕会", ischecked: false }
            ]
        };
        //跳转回调
        this.CallbackFunction = function (_params) {
            return new Promise(function (resolve, reject) {
                _this.peerpames = _params;
                console.log(_this.peerpames.length);
                if (_this.peerpames.length > 3) {
                    _this.people = _this.peerpames.slice(0, 3) + ",...";
                    console.log(_this.people);
                }
                else {
                    _this.people = _this.peerpames;
                }
                resolve();
            });
        };
        //获取用户userId
        this.reports.userId = sessionStorage.getItem("userName");
        this.isSearch = 'none';
        //是否显示提示
        this.showPromp = navParams.get('showPromp');
        if (this.showPromp) {
            this.isBlock = "block";
        }
        else {
            this.isBlock = "none";
        }
        //判断是否新增
        this.reports.isAdd = navParams.get('isAdd');
        //1是编辑
        if (this.reports.isAdd == 1) {
            this.reports = navParams.get('datas');
            this.reports.reportType = 0;
            console.log(this.reports);
        }
        else {
            //新增走访进来
            this.reports.reportType = 1;
            this.reports.status = 1;
            this.reports.planId = "";
        }
        //把原来的构造方法删了
        this.reports.starttime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString();
        this.reports.endtime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000 + 60 * 60 * 1000 + 30 * 60 * 1000).toISOString();
        var minDate = new Date();
        var year = minDate.getFullYear();
        var month = minDate.getMonth() + 1;
        var day = minDate.getDate();
        this.minTime = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
        console.log(this.minTime.toString());
        ////  console.log(this.minTime.toISOString());
        //		this.minTime="2018-03-29";
    }
    addreportPage.prototype.ionViewDidLoad = function () {
        this.wFlag = false;
    };
    //设置单选列表状态
    addreportPage.prototype.showMyList = function (toggle) {
        this.toggleSelect = toggle;
        this.myList = this.select.MyList;
        if (toggle == "stat") {
            this.select.isUnderListshow = false;
            if (this.select.ismyListshow) {
                this.select.ismyListshow = false;
            }
            else {
                this.select.ismyListshow = true;
            }
        }
    };
    //设置筛选内容
    addreportPage.prototype.getValues = function (val) {
        if (this.toggleSelect === "stat") {
            this.stateSelectval = val;
        }
        this.select.ismyListshow = false;
    };
    /*clockIn(){
      //console.log(111);
      if(this.wFlag == false){
        document.getElementById('starttime').style.display="none";
        document.getElementById('endtime').style.display="none";
        this.wFlag=true;
      }else{
        document.getElementById('starttime').style.display="block";
        document.getElementById('endtime').style.display="block";
        this.wFlag=false;
      }
    }*/
    addreportPage.prototype.showAlert = function (msg) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '系统提示',
            subTitle: msg,
            //    buttons: ["确定"]
            buttons: [{
                    text: "确定",
                    handler: function () {
                        console.log('Cancel clicked');
                        _this.viewCtrl.dismiss();
                    }
                }]
        });
        alert.present();
    };
    /*tomeetpeople(){
      this.navCtrl.push(MeetingpeoplePage,{ animate: true });
      //console.log(111111);
    }*/
    addreportPage.prototype.saveRemark = function () {
        this.showAlert("保存成功");
        //console.log(starttime);
        //this.navCtrl.pop();
    };
    addreportPage.prototype.gotochoosepeo = function () {
    };
    addreportPage.prototype.changeDate = function (e) {
        var date = new Date(this.reports.starttime);
        console.log(date);
        this.reports.endtime = new Date(date.getTime() + 60 * 60 * 1000).toISOString();
        console.log(this.reports.endtime);
        this.isShowEdit = true;
    };
    addreportPage.prototype.addAttendees = function ($evevt) {
        var _this = this;
        console.log($evevt);
        console.log("添加与会列表");
        var AattendeesModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__attendees_attendees__["a" /* AttendeesPage */], { type: "编辑其它" });
        AattendeesModal.onDidDismiss(function (data) {
            console.log(data);
            if (data.length !== 0) {
                if (_this.isDisplayAttend === "none") {
                    _this.attends = data;
                    _this.isDisplayAttend = "block";
                    //data=[];
                }
                else {
                    _this.isDisplayAttend = "none";
                    _this.attends = Array.from(new Set(_this.attends.concat(data)));
                    console.log(_this.attends);
                    _this.isDisplayAttend = "block";
                    //data=[];
                }
            }
            else {
                if (_this.isDisplayAttend = "none") {
                    ;
                }
                else {
                    ;
                }
            }
        });
        AattendeesModal.present();
    };
    addreportPage.prototype.fadeOut = function ($event) {
        //$event.target.style="display:none";
        $event.target.parentNode.style = "display:none";
        this.num++;
        if (this.attends.length == this.num) {
            this.isDisplayAttend = "none";
            $event.target.parentNode.parentNode.removeChild($event.target.parentNode);
        }
        for (var i = 0, len = this.attends.length; i < len; i++) {
            // console.log("666");
            console.log($event.target.previousSibling.innerHTML);
            if (this.attends[i].name == $event.target.previousSibling.innerHTML) {
                console.log("666");
                this.attends.splice(i, 1);
                console.log(this.attends);
            }
        }
    };
    addreportPage.prototype.isSelect = function () {
        console.log(this.isSelected);
    };
    addreportPage.prototype.saveOther = function () {
        console.log('关闭提醒');
        this.isBlock = 'none';
    };
    addreportPage.prototype.addReport = function (isSubmit) {
        console.log("提交");
        var par = {
            "planId": this.reports.planId,
            "status": this.reports.status,
            "customName": this.reports.customer,
            "pace": this.reports.pace,
            "planDate": this.reports.starttime,
            "address": this.reports.address,
            "realDate": this.reports.endtime,
            "meeeters": this.attends,
            "meetiType": this.stateSelectval,
            "mainpPurpose": this.reports.mainpPurpose,
            "customData": this.reports.customData,
            "talkProcess": this.reports.talkProcess,
            "talkResult": this.reports.talkResult,
            "otherMsg": this.reports.otherMsg,
            "photo": this.reports.photo,
            "userId": this.reports.userId,
            "isAdd": this.reports.isAdd,
            "isSubmit": isSubmit,
            "reportType": this.reports.reportType
        };
        this.showSelect('确定要提交吗', par);
    };
    addreportPage.prototype.editReport = function (isSubmit) {
        console.log("改期");
        var par = {
            "planId": this.reports.planId,
            "status": this.reports.status,
            "customName": this.reports.customer,
            "pace": this.reports.pace,
            "planDate": this.reports.starttime,
            "address": this.reports.address,
            "realDate": this.reports.endtime,
            "meeeters": this.attends,
            "meetiType": this.stateSelectval,
            "mainpPurpose": this.reports.mainpPurpose,
            "customData": this.reports.customData,
            "talkProcess": this.reports.talkProcess,
            "talkResult": this.reports.talkResult,
            "otherMsg": this.reports.otherMsg,
            "photo": this.reports.photo,
            "userId": this.reports.userId,
            "isAdd": this.reports.isAdd,
            "isSubmit": isSubmit,
            "reportType": this.reports.reportType
        };
        this.showSelect('是否确认改期', par);
    };
    addreportPage.prototype.cancelReport = function () {
        console.log("取消");
        // 	this.showSelect('会提示该操作会导致该走访计划变为已取消状态，是否确认取消');
        this.presentPrompt('会提示该操作会导致该走访计划变为已取消状态，是否确认取消');
    };
    addreportPage.prototype.showSelect = function (msg, param) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '提示',
            subTitle: msg,
            //    buttons: ["确定"]
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: "确定",
                    handler: function () {
                        console.log('提交');
                        _this.raise(param);
                    }
                }
            ]
        });
        alert.present();
    };
    addreportPage.prototype.presentPrompt = function (msg) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '提示',
            subTitle: msg,
            inputs: [
                {
                    name: 'cancelause',
                    placeholder: '请输入取消原因,否则无法取消'
                }
            ],
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        if (data.cancelause) {
                            console.log("有数据发请求------");
                            console.log(data.cancelause);
                            //向后台请求取消
                            _this.viewCtrl.dismiss();
                        }
                        else {
                            console.log("---+++++++++++++--");
                            console.log(data.cancelause);
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    addreportPage.prototype.raise = function (param) {
        var _this = this;
        var url = "search/addReport.json";
        this.httpService.getData({
            url: url,
            body: {}
        })
            .then(function (res) {
            console.log(res);
            _this.viewCtrl.dismiss();
        });
    };
    addreportPage.prototype.goSearch = function ($event) {
        var _this = this;
        var url = "search/customer.json";
        var param = {
            "customName": this.reports.customer,
            "pageNo": "1",
            "dataCount": "10",
            "fisrPageNo": "10",
            "vague": true
        };
        this.httpService.getData({
            url: url,
            body: param
        })
            .then(function (res) {
            console.log(res);
            _this.searchLists = res.customs;
            if (_this.searchLists.length == 0) {
                _this.isSearch = 'none';
            }
            else {
                _this.isSearch = 'block';
            }
        });
    };
    addreportPage.prototype.goCustomer = function (cust) {
        this.reports.customer = cust.customName;
        this.isSearch = 'none';
    };
    //获得当前位置信息
    addreportPage.prototype.getRoad = function () {
        var _this = this;
        //alert("hello");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                alert(position.coords.latitude);
                _this.yLocation = position.coords.longitude;
            });
        }
        else {
            this.errLocation = "获取位置信息失败。";
        }
        //let urll = "http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=39.983424,116.322987
        // &output=json&pois=1&ak=oVF7rVxFBuiwNWwrqeYshKxme6kpO5ij";
        var url = "province/getprovince.json";
        this.httpService.getData({ url: url }).then(function (res) {
            console.log(res);
            _this.location = res.province[0] + res.city[0];
            //console.log("world");
        });
    };
    addreportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addreportpage',template:/*ion-inline-start:"E:\workspace\ionic3-angualr\src\pages\addreport\addreport.html"*/'<ion-header class="header">\n  <ion-navbar>\n    <ion-title>\n      新增走访报告\n    </ion-title>\n    <div class="remark-save" (click)="addReport(0)">保存</div>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n<!--去掉会议类型栏-->\n  <!--<div class="row nav-filtrate">-->\n    <!--&lt;!&ndash;<ion-label style="color: red">*</ion-label>&ndash;&gt;-->\n    <!--<ion-label class="divlist"><label style="color: red;padding-left:10px"></label>会议类型</ion-label>-->\n    <!--<div (click)="showMyList(\'stat\')" class="select-state select ">-->\n      <!--<label>-->\n        <!--<span>{{stateSelectval}}</span>-->\n        <!--<ion-label class="img4 imgall4"></ion-label>-->\n      <!--</label>-->\n    <!--</div>-->\n    <!--<ion-list [ngClass]="{show:select.ismyListshow}" radio-group style="margin-left:32%;width: 70%;float: right;display: none">-->\n      <!--<ion-item *ngFor="let item of myList" class="items" style="border-bottom: 0.55px solid #c8c7cc;font-size: 1.4rem;">-->\n        <!--<ion-label>{{item.option}}</ion-label>-->\n        <!--<ion-radio (click)="getValues(item.option)" value="{{item.option}}"></ion-radio>-->\n      <!--</ion-item>-->\n    <!--</ion-list>-->\n  <!--</div>-->\n  <ion-item class="itemclass">\n    <ion-label  class="divlist" style="width: 25%;padding-left: 10px" fixed>客户名称</ion-label>\n    <ion-input type="text" placeholder="请输入客户名称" [(ngModel)]="reports.customer" (keyup)="goSearch()"></ion-input>\n  </ion-item>\n  <div class="serach_lists" [ngStyle]="{\'display\':isSearch}">\n		<div class="lists_cont">\n			<div class="list_item" (click)="goCustomer(item)" *ngFor="let item of searchLists">{{item.customName}}</div>\n		</div>\n  </div>\n  <ion-item class="itemclass">\n    <ion-label  class="divlist" fixed> <label style="color: red;padding-left: 10px"></label>走访进度</ion-label>\n    <ion-input type="text" placeholder="请输入走访进度" [(ngModel)]="reports.pace"></ion-input>\n  </ion-item>\n  <ion-item class="itemclass">\n    <ion-label  class="divlist" fixed> <label style="color: red;padding-left: 10px"></label>客户地址</ion-label>\n    <ion-input type="text" placeholder="客户地址" disabled=\'ture\' [(ngModel)]="reports.address" [value]="location"></ion-input>\n    <ion-input type = "button" value="定位签到" class="imgall location" (click) = "getRoad()">定位签到</ion-input>\n  </ion-item>\n\n	<ion-item id="endtime" class="itemclass">\n    <ion-label  class="divlist" fixed style="max-width: 25%;padding-left: 10px">计划走访时间</ion-label>\n    <ion-datetime cancelText="取消" doneText="确定" style="width: 73%;" displayFormat="YYYY年MM月DD日 HH:mm" [min]="minTime" [(ngModel)]="reports.starttime" (ngModelChange)="changeDate($event)"></ion-datetime>\n    <ion-label class="img2 imgall2"></ion-label>\n  </ion-item>\n  <ion-item id="starttime" class="itemclass">\n    <ion-label  class="divlist" fixed style="max-width: 25%;padding-left: 10px"><label style="color: red"></label>实际走访时间</ion-label><!--style="max-width: 22%;margin-left: 1%"-->\n    <ion-input type="text" placeholder="实际走访时间" [(ngModel)]="reports.endtime" disabled="true"></ion-input>\n    <!--<ion-datetime id="chostarttime" cancelText="取消" doneText="确定"  style="width: 73%;" displayFormat="YYYY年MM月DD日 HH:mm" [(ngModel)]="newtime.endtime" (ngModelChange)="changeDate($event)"></ion-datetime>-->\n    <!--<ion-label class="img imgall"></ion-label>-->\n  </ion-item>\n\n\n	<!--<ion-item class="itemclass">\n    <ion-label  class="divlist" fixed> <label style="color: red;padding-left: 10px"></label>行内人员</ion-label>\n    <ion-input type="text" placeholder="请输入行内人员"></ion-input>\n  </ion-item>-->\n  <ion-item class="itemclass">\n    <ion-label  class="divlist" fixed> <label style="color: red;padding-left: 10px"></label>与会人员</ion-label>\n    <!--<ion-input type="text" placeholder="请添加拜访客户"disabled="true"></ion-input>-->\n\n    <ion-label class="imgall2  add_attendees" (click)="addAttendees($event)">\n    	<div class="add_img" >\n				<ion-icon name="md-add"></ion-icon>\n	    </div>\n    </ion-label>\n  </ion-item>\n\n  <ion-item class="itemclass item_attend" [ngStyle]="{\'display\':isDisplayAttend}">\n   <div class="attend_cont">\n     <div class="attend" *ngFor="let item of attends" ><span>{{item.name}}</span>><i class="icon-del" (click) = "fadeOut($event)"></i></div>\n   </div>\n  </ion-item>\n  <!--<ion-item class="itemclass">\n    <ion-label  class="divlist" fixed> <label style="color: red"></label>新增客户名片</ion-label>\n    <ion-input type="text" placeholder="请输入新增客户名片户"></ion-input>\n  </ion-item>-->\n  <ion-item class="itemclass">\n    <ion-label  class="divlist" fixed> <label style="color: red;padding-left: 10px"></label>拜访照片</ion-label>\n    <ion-input type="text" placeholder="请输入拜访照片" [(ngModel)]="reports.photo"></ion-input>\n  </ion-item>\n  <!--<ion-item class="itemclass">\n    <ion-label  class="divlist" fixed> <label style="color: red;padding-left: 10px"></label>需求及问题</ion-label>\n    <ion-input type="text" placeholder="请输入需求及问题"></ion-input>\n  </ion-item>-->\n  <ion-item class="itemclass feedback">\n    <ion-label  class="divlist" fixed> <label style="color: red;padding-left: 10px"></label>主要目的</ion-label>\n    <ion-textarea col=\'10\' placeholder="主要目的" [(ngModel)]="reports.mainpPurpose"></ion-textarea>\n  </ion-item>\n   <ion-item class="itemclass feedback">\n    <ion-label  class="divlist" fixed> <label style="color: red;padding-left: 10px"></label>客户数据</ion-label>\n    <ion-textarea col=\'10\' placeholder="客户数据" [(ngModel)]="reports.customData"></ion-textarea>\n  </ion-item>\n   <ion-item class="itemclass feedback">\n    <ion-label  class="divlist" fixed> <label style="color: red;padding-left: 10px"></label>会谈过程</ion-label>\n    <ion-textarea col=\'10\' placeholder="会谈过程" [(ngModel)]="reports.talkProcess"></ion-textarea>\n  </ion-item>\n  <ion-item class="itemclass feedback">\n    <ion-label  class="divlist" fixed> <label style="color: red;padding-left: 10px"></label>会谈结论</ion-label>\n    <ion-textarea col=\'10\' placeholder="会谈结论" [(ngModel)]="reports.talkResult"></ion-textarea>\n  </ion-item>\n  <ion-item class="itemclass feedback">\n    <ion-label  class="divlist" fixed> <label style="color: red;padding-left: 10px"></label>其它信息</ion-label>\n    <ion-textarea col=\'10\' placeholder="其它信息" [(ngModel)]="reports.otherMsg"></ion-textarea>\n  </ion-item>\n  <ion-item class="itemclass feedback">\n    <div class="btn_box">\n    	<div class="add_btn" (click)="addReport(1)">提交</div>\n      <div class="add_edit" *ngIf="isShowEdit" (click)="editReport(1)">改期</div>\n      <div class="add_cancel" (click)="cancelReport()">取消</div>\n    </div>\n  </ion-item>\n\n\n  <!--<ion-item class="itemclass">\n    <ion-label class="market-list-name">发起人</ion-label>\n    <ion-input type="text" class="market-list-cont" value="张三"></ion-input>\n  </ion-item>-->\n  <!--<ion-item class="itemclass">\n    <ion-label  class="divlist"  fixed style="max-width: 25%;padding-left: 15px"><label style="color: red">*&nbsp;</label>参与人</ion-label>\n    <ion-input type="text"   placeholder="请选择会议参与人" disabled="true" value="{{people}}" (click)="gotochoosepeo()"></ion-input>\n    <ion-label class="img3 imgall3"></ion-label>\n  </ion-item>-->\n\n\n  <!--<ion-item>\n    <ion-label class="market-list-name">提醒</ion-label>\n    <ion-select cancelText="取消" okText="确定">\n      <ion-option value="1">日程开始时</ion-option>\n      <ion-option value="2">提前5分钟</ion-option>\n      <ion-option value="3">提前15分钟</ion-option>\n      <ion-option value="4">提前30分钟</ion-option>\n      <ion-option value="5">提前1小时</ion-option>\n      <ion-option value="6">提前1天</ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-item>\n    <ion-label class="market-list-name">重复</ion-label>\n    <ion-select cancelText="取消" okText="确定">\n      <ion-option value="1">不重复</ion-option>\n      <ion-option value="2">每天</ion-option>\n      <ion-option value="3">每周</ion-option>\n      <ion-option value="4">每两周</ion-option>\n      <ion-option value="5">每月</ion-option>\n      <ion-option value="6">每年</ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-item>\n    <ion-label class="market-list-name">备注</ion-label>\n    <ion-input placeholder="添加备注"></ion-input>\n  </ion-item>-->\n  <div class="prompt_main" [ngStyle]="{\'display\':isBlock}">\n  	<div class="prompt_cont">\n  		<div class="prompt">\n	   	"新增走访记录"功能仅用于添加无走访计划的临时走访，如您已有走访计划，请通过走访计划页面撰写走访记录。否则会导致您的走访计划变为过期未走访。\n	   </div>\n	   <div class="prompt_checkbox">\n	   		<input type="checkbox" name=\'selected\' [(ngModel)]="isSelected" (ngModelChange)="isSelect()"/>\n	   		&nbsp;&nbsp;已知晓，不再提醒\n	   </div>\n\n	   <div class="submit" (click)="saveOther()">关闭提醒</div>\n\n  	</div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\workspace\ionic3-angualr\src\pages\addreport\addreport.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */]])
    ], addreportPage);
    return addreportPage;
}());

//# sourceMappingURL=addreport.js.map

/***/ })

},[383]);
//# sourceMappingURL=main.js.map