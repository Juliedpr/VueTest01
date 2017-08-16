<template>
    <div id='tmpl'>
        <!-- 1.0 图片分类 -->
        <div id='cate'>
            <ul v-bind='{style:"width:"+ulWidth+"px"}'>
                <li @click='getimages(0)'>全部</li>
                <li v-for='item in cates' @click='getimages(item.id)'>{{item.title}}</li>
            </ul>
        </div>
        <!-- 2.0 图片列表 -->
        <div id='imglist'>
            <ul>
                <li v-for="item in list">
                    <router-link v-bind='{to:"/photo/photoinfo/"+item.id}'>
                        <img v-lazy="item.img_url">
                        <div id="desc">
                            <!--半透明框-->
                            <h5 v-text="item.title"></h5>
                            <p v-text="item.zhaiyao"></p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import common from '../../kits/common.js';
import { Toast } from 'mint-ui';

export default {
    data() {
        return {
            ulWidth: 320,
            cates: [],
            list: []
        }
    },
    created() {
        //获取图片分类数据
        this.getcates();
        //加载图片数据
        var all = 0; //获取所有数据
        this.getimages(all);
    },
    methods: {
        //获取图片数据
        getimages(cateid){
            var url =common.apidomain + '/api/getimages/'+cateid;
            cateid = cateid || 0; //0代表获取所有图片数据
            this.$http.get(url).then(function(res){
                var body = res.body;
                if(body.status !=0 ){
                    Toast(res.body.message);
                    return;
                }
                //将数据赋值给this.list
                this.list = body.message;
            });
        },
        //获取图片分类数据
        getcates() {
            //1.0 确定url
            var url = common.apidomain + '/api/getimgcategory';
            //2.0 调用$http的get方法获取数据
            this.$http.get(url).then(function (res) {
                if (res.body.status != 0) {
                    Toast(res.body.message);
                    return;
                }
                //3.0 实现数据的赋值操作
                this.cates = res.body.message;
                //4.0 实现当前分类数据所在的ul的总宽度= 分类个数 + 每个分类数据的宽度
                var w = 62;
                var count = res.body.message.length + 1;
                this.ulWidth = w * count;
            });
        }
    }
}

</script>



<style scoped>
/*1.0 图片分类*/

#cate {
    width: 320px;
    max-width: 320px;
    overflow-x: auto;
}

#cate ul {
    margin: 0px;
    padding-left: 10px;
}

#cate li {
    cursor:pointer;
    list-style: none;
    display: inline-block;
    color: #0094ff;
    font-size: 14px;
    padding-left: 6px;
}


/*实现图片列表样式*/
#imglist ul {
    padding-left: 0px;
}

#imglist li {
    list-style: none;
    position: relative;
}

#imglist img {
    width: 100%;
    height: 300px;
}

#desc {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    bottom: 2px;
    left: 0px;
}

#desc h5 {
    color: #ffffff;
    font-weight: bold;
}

#desc p {
    color: #fff;
}

image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
}
</style>