<template>
    <div id='tmpl'>
        <!-- 1.0 实现图片详情和缩略图 -->
        <div id='desc'>    
            <!--图片详情-->
            <div class='title'>
                <h4>{{photoinfo.title}}</h4>
                <p>
					{{photoinfo.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}  {{photoinfo.click}}次浏览
				</p>
            </div>
            
            <!-- 缩略图 -->
            <div class="mui-content">
                <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/news/newslist">
                            <span class="mui-icon mui-icon-home"></span>
                            <div class="mui-media-body">新闻资讯</div>
                        </router-link>
                    </li>
            
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/photo/photolist">
                            <span class="mui-icon mui-icon-email">
            
                            </span>
                            <div class="mui-media-body">图片分享</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/goods/goodslist">
                            <span class="mui-icon mui-icon-chatbubble"></span>
                            <div class="mui-media-body">商品购买</div>
                        </router-link>
            
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/feedback">
                            <span class="mui-icon mui-icon-location"></span>
                            <div class="mui-media-body">留言反馈</div>
                        </router-link>
            
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/vide">
                            <span class="mui-icon mui-icon-search"></span>
                            <div class="mui-media-body">视频专区</div>
                        </router-link>
            
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/callme">
                            <span class="mui-icon mui-icon-phone"></span>
                            <div class="mui-media-body">联系我们</div>
                        </router-link>
                    </li>
            
                </ul>
            </div>

            <!-- 图片详情-摘要部分 -->
            <p>{{photoinfo.content}}</p>

        </div>
        <!-- 2.0 集成评论组件 -->
        <div id='comment'>
            <comment :id='id'></comment> <!--1.0.2使用子组件-->
        </div>
    </div>
</template>



<script>

    //1.0 导入评论子组件
    import comment from '../subcom/comment.vue';
    import common from '../../kits/common.js';
    import { Toast } from 'mint-ui';

    export default{
        components:{
            comment  //1.0.1注册子组件
        },
        data(){
            return{
                id:0, //图片的id
                photoinfo:{} //图片的详情描述数据对象
            }
        },
        created(){
            this.id = this.$route.params.id;
            this.getinfo();
        },
        methods:{
            // 1.0获取图片详情描述数据
            getinfo(){
                var url = common.apidomain+"/api/getimageInfo/"+this.id;
                this.$http.get(url).then(function(res){
                    var body = res.body;
                    if(body.status != 0){
                        Toast(body.message);
                        return;
                    }
                    //将正常的逻辑数据赋值给this.photoinfo对象
                    this.photoinfo = body.message[0];
                })
            }
        }
    }
</script>

<style scoped>
    
 /*图片详情样式*/

 #desc {
     padding: 10px;
 }

 #desc .title h4 {
     color: #0094ff;
 }

 #desc .title p {
     color: rgba(0, 0, 0, 0.4);
     margin-top: 10px;
 }

 #desc .title .line {
     width: 100%;
     height: 1px;
     border-bottom: 1px solid rgba(0, 0, 0, 0.4);
 }

.mui-content,
.mui-content ul {
    background-color: #fff;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border-right: 0px;
    border-bottom: 0px;
}

.mui-grid-view.mui-grid-9 {
    border-top: 0px;
    border-left: 0px;
}

</style>