<template>
	<view>
		<cu-custom :bgColor="NavBarColor" :isBack="false" backRouterName="index">
			<block slot="content">站点</block>
		</cu-custom>
		<scroll-view scroll-y class="page">
			<view class="list-wrap">
				<view v-for="(item,index) in siteList " :key="index">
					<view class="list-one">
						<view class="radio-wrap" @click.stop="changeSite(item,$event)">
							<view v-if="item.type === 1">
								<image class="img-site-style" src="/static/images/site.png" />
							</view>
							<radio class="radio-style" readonly disabled value="false" v-else />
						</view>
						<view class="name-time-wrap">
							<view class="font-black">{{item.hospital}}</view>
							<view class="type-wrap font-gray">{{item.name}}</view>
							<view class="current-wrap " v-if="item.type === 1">当前站点</view>
						</view>
						<view class="img-wrap">
							<image class="img-style" v-if="item.perm < level" @click="goAdd(item)" :src="addImage"
								mode="widthFix" />
						</view>
					</view>
					<view class="line" v-if="index==0"></view>
				</view>
				<uni-popup ref="popup" type="dialog">
					<uni-popup-dialog title="设置站点提示" :duration="2000" :before-close="true" @close="closeDialog"
						@confirm="confirm">
						是否将{{currentInfo.hospital}}设置为默认站点
					</uni-popup-dialog>
				</uni-popup>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		getInfo,
		setSite
	} from "@/api/user.js"
	import {
		ACCESS_TOKEN
	} from '@/common/util/constants.js'
	export default {
		data() {
			return {
				currentInfo: {},
				level: '',//用户级别
				addImage: ("/static/images/addPerson.png"),
				siteList: [] //站点列表
			}
		},
		created() {
			//获取站点信息
			this.getsiteInfo()
		},
		methods: {
			//修改站点提示框
			changeSite(data, e) {
				this.currentInfo = data
				this.$refs.popup.open()
			},
			//关闭提示框
			closeDialog() {
				this.$refs.popup.close()
			},
			//调用接口修改站点
			confirm() {
				setSite({
					id: this.currentInfo.id
				}).then((res) => {
					this.closeDialog()
					this.getsiteInfo()
				})	
			},
			//获取站点信息
			getsiteInfo(page) {
				getInfo({
					token: uni.getStorageSync(ACCESS_TOKEN)
				}).then(res => {
					if (res.data) {
						this.level = res.data.level - 0
						this.siteList = res.data.sites
					}
				}).catch(() => {

				})
			},
			//去增加人
			goAdd(data) {
				this.$Router.push({
					path: '/pages/site/qrcode',
					query: {
						id: data.id
					}
				})
			}

		}
	}
</script>
<style lang="scss" scoped>
	.font-gray {
		color: $uni-text-color-grey;
	}

	.font-black {
		color: $uni-text-color;
	}

	.list-wrap {
		border-top: 1px solid #EBEDF1;

		.line {
			height: 10rpx;
			width: 100%;
			background-color: #e3e3e3;
		}

		.list-one {

			padding: 20rpx 30rpx;
			display: flex;
			align-items: center;

			.radio-wrap {
				width: 100rpx;
				height: 100rpx;
			}

			.radio-style {
				transform: scale(0.7)
			}

			.img-site-style {
				height: 80rpx;
				width: 80rpx;
			}

			.img-wrap {
				height: 50rpx;
				width: 50rpx;
				flex: 0 0 60rpx;

				.img-style {
					height: 50rpx;
					width: 50rpx;

				}
			}

			.name-time-wrap {
				flex: 1;
				padding-left: 20rpx;
			}

			.age-sex-wrap {
				flex: 1.5;
				padding-left: 20rpx;
				box-sizing: border-box;

				.line-wrap {
					display: flex;
				}
			}

			.type-wrap {
				margin-top: 20rpx;
				background-color: #e3e3e3;
				padding: 2rpx 15rpx;
				border-radius: 30rpx;
				display: inline-block;
				font-size: $uni-font-size-sm;
			}

			.current-wrap {
				margin-top: 20rpx;
				background-color: #FEE4DE;
				padding: 2rpx 15rpx;
				border-radius: 30rpx;
				color: #FE8C74;
				display: inline-block;
				font-size: $uni-font-size-sm;
				margin-left: 10rpx;

			}
		}
	}
</style>
