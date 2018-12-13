// 将 [2,0,2,1,1,0] 排序成 [0,0,1,1,2,2]

function swap(array, left, right) {
    let rightValue = array[right]
    array[right] = array[left]
    array[left] = rightValue
}

var sortColors=function(nums){
    let left=-1;
    let right=nums.length;
    let i=0;
    while(i<right){
        if(nums[i]==0){
            swap(nums,i++,++left);
        }else if(nums[i]==1){
            i++;
        }else{
            swap(nums,i,--right);
        }
    }
}