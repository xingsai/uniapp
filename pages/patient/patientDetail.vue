<template>
	<view>
		<cu-custom :bgColor="NavBarColor" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">患者详情</block>
		</cu-custom>
		<view class="user-info-wrap">
		
		</view>

	</view>
</template>

<script>
	import {
		getUserInfoDetail
		
	} from "@/api/user.js"
	export default {
		data() {
			return {
				userInfo:{},
			}
		},
		mounted(){
			console.log(this.$Route.query)
			this.getDetail()
		},
		methods: {
			getDetail() {
				getUserInfoDetail({params:{id:this.$Route.query.id}}).then((res)=>{
					console.log(res)
					
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.img-wrap {
		 height:100%;
		 width:100%;
		 display: flex;
		 justify-content: center;
         align-items: center;
		.img-style {
			height: 375rpx;
			width: 375rpx;
			margin-top:30%;
		}
	}
</style>
