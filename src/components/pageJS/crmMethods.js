export default {
//	深克隆数组对象
    cloneObj(nVal,oVal) {
    	nVal=[];
    	for(let i in oVal){
    		nVal.push(oVal[i]);
    	};
    	return nVal;
    },
//  深克隆查找数组
    cloneSearchObj(nVal,oVal){
    	for(let i in oVal){
    		nVal=[];
			nVal.push([oVal[i].email,
				oVal[i].tel,
				oVal[i].name,
				oVal[i].identificationState
			])
		}
    	return nVal;
    }
    
}