<template>
	<view>
		<cu-custom :bgColor="NavBarColor" :isBack="false" backRouterName="index">
			<block slot="content">我的</block>
		</cu-custom>
		<scroll-view scroll-y class="page">
		  <!-- 列表list-->
		  <view class="">
		
			<navigator class="cu-item arrow animation-slide-bottom" :style="[{animationDelay: '0.7s'}]" url="/pages/user/userdetail" hover-class="none">
				<view class="content" >
				  <view class="action">
				  	<view class="cu-avatar" :style="{backgroundImage: 'url(' + personalMsg.avatar + ')'}"></view>
				  </view>
				  <view>
					  <view>{{personalMsg.name}}</view>
					  <view>{{personalMsg.position}}</view>
					  <view>{{personalMsg.mail}}</view>
				  </view>
				</view>
			</navigator>
		  </view>
		  <view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	import api from '@/api/api'
	export default {
		name: "people",
		data() {
			return {
				personalMsg:{
					name:'小明',
					position:'主治医师',
					mail:'1035098933@qq.com',
					avatar:'http://caredev.schillerchina.com/static/img/avatar.d7282e5a.png?imageView2/1/w/80/h/80'
				},
			};
		},
		watch: {
			cur: {
				immediate: true,
				handler() {
					console.log('watch',this.cur)
				    this.userId=this.$store.getters.userid;
					this.load()
				},
			},
		},
		methods: {
			scan(){
				 console.log("进来了")
				// #ifndef H5
				uni.scanCode({
				    success: function (res) {
						console.log('条码res：' + res);
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
				    }
				});
				// #endif
				// #ifdef H5
				this.$tip.alert("暂不支持")
				// #endif
			},
			load(){
				if(!this.userId){
					
					return;
				}
				this.$http.get(this.userUrl,{params:{id:this.userId}}).then(res=>{
					console.log("res",res)
					 if (res.data.success) {
						let perArr = res.data.result
				        let avatar=(perArr.avatar && perArr.avatar.length > 0)? api.getFileAccessHttpUrl(perArr.avatar):'/static/avatar_boy.png'
						this.personalList.avatar =avatar
						this.personalList.realname = perArr.realname
						this.personalList.username = perArr.username
						this.personalList.depart = perArr.departIds
					    this.getpost(perArr.post)
					}
				}).catch(err => {
					console.log(err);
				});
				
			},
			getpost(code){
				if(!code||code.length==0){
					this.personalList.post='员工'
					return false;
				}
				this.$http.get(this.postUrl,{params:{code:code}}).then(res=>{
					console.log("postUrl",res)
					 if (res.data.success) {
						this.personalList.post=res.data.result.name
					}
				}).catch(err => {
					console.log(err);
				});
				
			}
		}
	}
</script>

<style>
.UCenter-bg {
	/* #ifdef MP-WEIXIN */
	background-image: url('https://static.jeecg.com/upload/test/blue_1595818030310.png');
	/* #endif */
	/* #ifndef MP-WEIXIN */
	background-image: url('/static/blue.png');
	/* #endif */
  background-size: cover;
  height: 400rpx;
  display: flex;
  justify-content: center;
  padding-top: 40rpx;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-weight: 300;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.UCenter-bg text {
  opacity: 0.8;
}

.UCenter-bg image {
  width: 200rpx;
  height: 200rpx;
}

.UCenter-bg .gif-wave{
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;  
  height: 100rpx;   
}

map,.mapBox{
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;  
  height: 100rpx;   
}

map,.mapBox{
  width: 750rpx;
  height: 300rpx;
}
</style>
