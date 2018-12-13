function deepCopy(obj){
    if(typeof obj !=='object') return obj;
    if(typeof window !=='undefined' && window.JSON){
        return JSON.parse(JSON.stringify(obj));
    }else{
        var newObj=obj instanceof Array ?[]:{};
        for(var key in obj){
            if (obj.hasOwnProperty(key)) {
                newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
            }
        }
        return newObj;
    }
}