import { http } from '@/common/service/service.js' 

	 
	 /**
	  * 返回登录人信息
	  */
	export function getInfo(params) {
	
		return http.get(`/employees/info`, {params})	
	}
	/**
	  * 切换默认站点
	  */
	export function setSite(params) {

		return http.get(`/sites/${params.id}/default`)	
	}
	/**
	  * 获取用户详情信息
	  */
	export function getUserInfoDetail({params}) {
		return http.get(`/users/${params.id}`,{params})	
	}
	

	

