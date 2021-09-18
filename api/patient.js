import { http } from '@/common/service/service.js' 

	 
	 /**
	  * 获取患者列表
	  */
	export function getUsersList(params) {
		console.log(params)
		return http.get(`/users`,params)	
	}




