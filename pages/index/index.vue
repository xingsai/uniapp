<template>
	<view class="wrap">
		<cu-custom :bgColor="NavBarColor" :isBack="false" backRouterName="index" v-if="flagTitle">
			<block slot="content">患者列表</block>
		</cu-custom>
		<view class="uni-form-item uni-column">
			<input class="uni-input" maxlength="10" focus placeholder="请输入关键字" />
		</view>
		<view v-for="(item,index) in peopleList " :key="index" @click="goOther">
			<view>{{item.name}}</view>
			<view>{{item.avatar}}</view>
			<view>{{item.actived_at}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flagTitle: false,

				peopleList: [{
						"id": 19560,
						"name": "\u968f\u4fbf",
						"inpatient": {
							"department": "",
							"area": "",
							"bed": "",
							"charge": "",
							"inpatientid": "",
							"cc": "",
							"diagnosis": ""
						},
						"avatar": "\/storage\/image2\/avatar.png",
						"gender": "2",
						"title": "20210916X0ogd7",
						"birthday": "2021-09-05",
						"idcard": "120100202109062137",
						"sex": "\u5973",
						"age": 0,
						"phone": "13927827921",
						"height": 170,
						"info": true,
						"weight": 40,
						"actived_at": "10:47:18",
						"updated_at": "2021-09-16 10:48:27",
						"area": "",
						"areacode": null,
						"wx": false
					},
					{
						"id": 19558,
						"name": "\u6d4b\u8bd5\u9662\u5185\u7f16\u53f7",
						"inpatient": {
							"department": "",
							"area": "",
							"bed": "",
							"charge": "",
							"inpatientid": "",
							"cc": "",
							"diagnosis": ""
						},
						"avatar": "\/storage\/image2\/avatar.png",
						"gender": "2",
						"title": "2021-7-5555",
						"birthday": "2021-09-07",
						"idcard": "",
						"sex": "\u5973",
						"age": 0,
						"phone": "13752730087",
						"height": 55,
						"info": false,
						"weight": 11,
						"actived_at": "09:17:13",
						"updated_at": "2021-09-16 09:17:12",
						"area": "",
						"areacode": null,
						"wx": false
					},
					{
						"id": 19557,
						"name": "\u6d4b\u8bd5",
						"inpatient": {
							"department": "",
							"area": "",
							"bed": "",
							"charge": "",
							"inpatientid": "",
							"cc": "",
							"diagnosis": ""
						},
						"avatar": "\/storage\/image2\/avatar.png",
						"gender": "1",
						"title": "20210916lxqdrY",
						"birthday": "2021-09-08",
						"idcard": "",
						"sex": "\u7537",
						"age": 0,
						"phone": "13752733011",
						"height": 51,
						"info": false,
						"weight": 22,
						"actived_at": "09:01:29",
						"updated_at": "2021-09-16 09:01:29",
						"area": "",
						"areacode": null,
						"wx": false
					},
				]
			}
		},
		onLoad: function() {
			this.flagTitle = true
		},
		methods: {
			goOther() {
				this.$Router.pushTab({
					path: '/pages/site/site'
				})
			},

		}
	}
</script>

<style>
	.wrap{
		
	}

</style>
