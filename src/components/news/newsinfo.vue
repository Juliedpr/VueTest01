<template>
    <div id='tmpl'>
        <!-- 1.0实现新闻详情 -->
        <div class="title">
		   <h4 v-text="info.title"></h4>
		   <p>{{ info.add_time | datefmt('YYYY-MM-DD') }}  {{info.click}}次浏览</p>
	   </div>
		<div id="content" v-html="info.content" ></div>
        <!-- 2.0实现评论子组件的集成 -->
        <!-- 使用评论子组件 -->
        <comment :id = 'id' ></comment>
    </div>
</template>

<script>
import common from '../../kits/common.js';
// import ssss from '../aaaa';

import comment from '../subcom/comment.vue'; //导入评论组件 comment.vue

    export default{
        components:{
            comment  //注册评论子组件
        },
        data(){
            return{
                id:0,
                info:{
                     
                }
            }
        },
        created(){
            //1.获取url传入的id参数值给data中的id属性
            this.id = this.$route.params.id
            //2.请求服务器获取到这个id对应的详情数据对象
            this.getinfo();
        },
        methods:{
            getinfo(){
                // var url = 'http://www.lovegf.cn:8899/api/getnew/'+this.id;
                var url = common.apidomain+'/api/getnew/'+this.id;
                this.$http.get(url).then(function(res){
                    var body = res.body;
                    if(body.status != 0){
                        alert(body.message);
                        return;
                    }
                    this.info = body.message[0];
            });
            }
        }

    }
    
</script>

<style scoped>
    .title h4{
		color: #0094ff;
	}
	.title p{
		color:rgba(0,0,0,0.5);
	}

	.title,#content{
		padding: 5px;
	}
</style>