<template>
	<view>
		<cu-custom :bgColor="NavBarColor" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">二维码</block>
		</cu-custom>
		<view class="img-wrap">
			<image class="img-style" @click="goAdd" :src="avatar" mode="widthFix" />
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar: 'http://caredev.schillerchina.com/static/img/avatar.d7282e5a.png?imageView2/1/w/80/h/80',
			}
		},
		mounted(){
			console.log(this.$Route.query)
		},
		methods: {
			goAdd() {
				
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
