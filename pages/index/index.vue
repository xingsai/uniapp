<template>
	<view class="wrap">
		<cu-custom :bgColor="NavBarColor" :isBack="false" backRouterName="index" v-if="flagTitle">
			<block slot="content">患者列表</block>
		</cu-custom>
		<view class="uni-form-item uni-column input-style" style="width:690rpx;margin: 30rpx;">
			<!-- 输入框头部图标 -->
			<uni-easyinput prefixIcon="search" v-model="searchInfo" class="input-style" placeholder="请输入关键词"
				@input="goSearch"></uni-easyinput>
		</view>
		<view v-if="flagTitle">
			<mescroll-uni ref="mescrollRef" :up="upOption" @init="mescrollInit" :top="top()" @down="downCallback"
				@up="upCallback">
				<!-- 数据列表 -->
				<view class="list-wrap">
					<view class="" style="width: 100vw;" v-for="(item,index) in peopleList" :key="index"
						 :data-target="'move-box-' + index">
						<view class="list-one" @click="goDetail(item)">
							<view class="img-wrap">
								<image class="img-style" :src="item.avatar" mode="widthFix" />
							</view>
							<view class="name-time-wrap">
								<view class="font-black textOverflow" style="max-width: 260rpx;">{{item.name}}</view>
								<view class="time-wrap font-gray textOverflow" style="max-width: 260rpx;">{{item.title}}
								</view>
							</view>
							<view class="age-sex-wrap">
								<view class="line-wrap">
									<view class="font-gray">{{item.sex}}</view>
									<view class="font-gray" style="margin-left:40rpx;">{{item.age}}</view>
								</view>

								<view class="time-wrap font-gray">{{item.actived_at}}</view>
							</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import {
		debounce
	} from "@/common/util/tool.js"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {
		getUsersList
	} from "@/api/patient.js"
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				announcement2: [],
				upOption: {
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量
					},
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 暂无数据 ~', // 提示

					},
					loading: '',
					text: '全部',
					isShowNoMore: false,
					textNoMore: '我是有底线的 >_<'
				},
				flagTitle: false,
				searchInfo: '', //搜索信息
				peopleList: []
			}
		},
		onShow() {
			if (this.mescroll) {
				this.canReset && this.mescroll.resetUpScroll() // 自行实现的刷新指定一条数据  
				this.canReset = true // 过滤第一次的onShow事件,避免初始化界面时重复触发upCallback, 无需配置auto:false
			}
		},
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				return style
			},
		},
		onLoad: function() {
			this.flagTitle = true
		},
		methods: {
			//设置具体顶部的高度
			top() {
				const px = 140 / 750 * wx.getSystemInfoSync().windowWidth;
				return this.CustomBar + px + "px"
			},
			//下拉刷新
			downCallback(page) {
				//this.mescroll.resetUpScroll(),
				this.mescroll.removeEmpty()  //移除空布局，主要是第一次无值，第二次有值
				this.getInfo(this.mescroll)
				this.mescroll.scrollTo(0); 
			},
            //上拉加载更多
			upCallback(page) {
				this.getInfo(this.mescroll)
			},
			//获取缓则列表信息
			getInfo(page) {
				getUsersList({
					params: {
						page: page.num,
						size: 10,
						type: "site",
						name: this.searchInfo
					}
				}).then(res => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.announcement2 = res.data
					this.mescroll.endSuccess(this.announcement2.length);
					//设置列表数据
					if (res.data) {
						this.msg2Count = res.total
						for (let item of this.announcement2) {
							this.peopleList.push(item)
						}
					}
					if (page.num == 1) {
						this.peopleList = []; //如果是第一页需手动制空列表
						this.peopleList = this.peopleList.concat(this.announcement2); //追加新数据
						uni.stopPullDownRefresh();
					}
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
            //进入详情页面
			goDetail(data) {
				this.$Router.push({
					path: '/pages/patient/patientDetail',
					query: {
						id: data.id
					}
				})
			},
			//输入框的输入检索
			goSearch: debounce(function() {
				if (this.searchInfo.length >= 2) {
					this.downCallback()
				} else if (this.searchInfo == '') {
					this.downCallback()
				}
			}, 500, false),
		}
	}
</script>

<style lang="scss" scoped>
	.uni-column {
		.input-style {
			border-radius: 6rpx;
			background-color: #F2F2F3;
			height: 80rpx;

			/deep/ .uni-easyinput__content {
				height: 80rpx;
			}
		}
	}

	.font-gray {
		color: $uni-text-color-grey;
	}

	.font-black {
		color: $uni-text-color;
	}

	.list-wrap {
		border-top: 1px solid #EBEDF1;


		.list-one {
			padding: 20rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;

			.img-wrap {
				height: 120rpx;
				width: 120rpx;
				border-radius: 60rpx;
				flex: 0 0 120rpx;

				.img-style {
					border-radius: 120rpx;
				}
			}

			.name-time-wrap {
				flex: 1;
				padding-left: 20rpx;
			}

			.age-sex-wrap {
				flex: 1;
				padding-left: 20rpx;
				box-sizing: border-box;

				.line-wrap {
					display: flex;
				}
			}

			.time-wrap {
				margin-top: 20rpx;
			}
		}
	}
</style>
