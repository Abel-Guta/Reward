function myMap(arr,callback){
    if (typeof callback !=="function" ||  !Array.isArray(arr)){
        throw new TypeError("input  type  function or arr  needed")

    }

  

    const output=new Array(arr.length)


    for (let i=0;i<output.length;i++){
        if (i in arr){
            output[i]=callback(arr[i],i,arr)

        }
    
        
    }

    return output




}
myMap([1, , 3], x => x * 2)