// 1.0 导入vue核心包
import Vue from 'vue';

// 2.0 导入App.vue的vue对象
import App from './App.vue';

//3.0 将vue-router集成到这个项目中来
import vueRouter from 'vue-router';
Vue.use(vueRouter)  //将vueRouter对象绑定到Vue对象上

//3.0.1 导入路由规则对应的组件对象
import home from './components/Home.vue';
import shopcar from './components/shopcar/car.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
import photolist from './components/photo/photolist.vue';
import photoinfo from './components/photo/photoinfo.vue';


//3.0.2 定义路由规则
var router1 = new vueRouter({
	linkActiveClass:'mui-active',//改变路由激活时的class名称
	routes:[
		{path:'/',redirect:'/home'},
		{path:'/home',component:home},   //首页
		{path:'/shopcar',component:shopcar},  // 购物车
		{path:'/news/newslist',component:newslist}, //新闻资讯列表页面
		{path:'/news/newsinfo/:id',component:newsinfo},  // 新闻资讯详情页面
		{path:'/photo/photolist',component:photolist}, // 图片列表页面
		{path:'/photo/photoinfo/:id',component:photoinfo} //图片详情页面
	]
});

//4.0 注册mint-ui
//导入mint-ui的css文件`
import 'mint-ui/lib/style.min.css';
Vue.use(mintui);

//导入mint-ui组件对象
import mintui from 'mint-ui';


//5.0 注册mui的css样式
import '../statics/mui/css/mui.css';

//6.0 导入一个当前系统的全局基本样式
import '../statics/css/site.css';


//7.0 将vue-resource 在vue中绑定，自动在vue对象实例上注入一个$http对象就可以使用ajax方法了
import vueResource from 'vue-resource';
Vue.use(vueResource);

//8.0 定义一个全局过滤器 实现日期的格式化
import moment from 'moment';
Vue.filter('datefmt',function(input,fmtstring){
	return moment(input).format(fmtstring);
});


// 9.0 利用Vue对象进行解析渲染
new Vue({
	el:'#app',
	router:router1,
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});