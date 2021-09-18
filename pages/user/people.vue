<template>
	<view>
		<cu-custom :bgColor="NavBarColor" :isBack="false" backRouterName="index">
			<block slot="content">我的</block>
		</cu-custom>
		<scroll-view scroll-y class="page">
			<view class="cu-list menu">
				<view class="cu-item animation-slide-bottom boder-bottom" style="height:140rpx;"
					:style="[{animationDelay: '0.1s'}]">
					<view class="content">
						<text class="text-grey">头像</text>
					</view>
					<view class="action">
						<view class="cu-avatar round image-style"
							:style="{backgroundImage: 'url(' + personalMsg.avatar + ')'}">
						</view>
					</view>

				</view>
				<view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.2s'}]">
					<view class="content">
						<text class="text-grey">姓名</text>
					</view>
					<view class="action">
						<text class="text-grey">{{personalMsg.name}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.3s'}]">
					<view class="content">
						<text class="text-grey">职位</text>
					</view>
					<view class="action">
						<text class="text-grey">{{personalMsg.position}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.4s'}]">
					<view class="content">
						<text class="text-grey">邮箱</text>
					</view>
					<view class="action">
						<text class="text-grey">{{personalMsg.email}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.5s'}]">
					<view class="content">
						<text class="text-grey">手机</text>
					</view>
					<view class="action">
						<text class="text-grey">{{personalMsg.phone}}</text>
					</view>
				</view>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	import api from '@/api/api'
	export default {
		name: "people",
		data() {
			return {
				personalMsg: {
					name: '小明',
					position: '主治医师',
					email: '1035098933@qq.com',
					phone: "13323020802",
					avatar: 'http://caredev.schillerchina.com/static/img/avatar.d7282e5a.png?imageView2/1/w/80/h/80'
				},
			};
		},
		watch: {
			cur: {
				immediate: true,
				handler() {
					console.log('watch', this.cur)
					this.userId = this.$store.getters.userid;
					this.load()
				},
			},
		},
		methods: {
			scan() {
				console.log("进来了")
				// #ifndef H5
				uni.scanCode({
					success: function(res) {
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
			load() {
				if (!this.userId) {

					return;
				}
				this.$http.get(this.userUrl, {
					params: {
						id: this.userId
					}
				}).then(res => {
					console.log("res", res)
					if (res.data.success) {
						let perArr = res.data.result
						let avatar = (perArr.avatar && perArr.avatar.length > 0) ? api.getFileAccessHttpUrl(perArr
							.avatar) : '/static/avatar_boy.png'
						this.personalList.avatar = avatar
						this.personalList.realname = perArr.realname
						this.personalList.username = perArr.username
						this.personalList.depart = perArr.departIds
						this.getpost(perArr.post)
					}
				}).catch(err => {
					console.log(err);
				});

			},
			getpost(code) {
				if (!code || code.length == 0) {
					this.personalList.post = '员工'
					return false;
				}
				this.$http.get(this.postUrl, {
					params: {
						code: code
					}
				}).then(res => {
					console.log("postUrl", res)
					if (res.data.success) {
						this.personalList.post = res.data.result.name
					}
				}).catch(err => {
					console.log(err);
				});

			}
		}
	}
</script>

<style>
	.image-style {
		width: 100rpx;
		height: 100rpx;

	}

	.cu-list .boder-bottom:after {
		border-bottom: 5px solid #ddd;
	}
</style>
