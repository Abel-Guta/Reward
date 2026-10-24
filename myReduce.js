Array.prototype.myReduce=function(callback,initialValue){

    if (typeof callback !== 'function'){
        throw new TypeError("only type function or array as input is allowed")
    }

   
    let i=0
    let acc

    if( arguments.length<2){

        while ( i<this.length && !(i in this) ){
            i++
        }

        if (i === this.length) throw new TypeError

        acc =this[i]
        i++
    }
    else{
        acc=initialValue
    }

    const n =this.length
    

    for (;i<n;i++){
        if (i in this){
            acc=callback(acc,this[i],i,this)
        }


    }

    return acc


}

function check(name, fn) {
  try {
    const ok = fn();
    console.log(ok ? "✅" : "❌", name);
  } catch (e) {
    console.log("❌", name, "→ threw:", e.message);
  }
}

function same(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if ((i in a) !== (i in b)) return false;
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function throws(fn) {
  try { fn(); return false; } catch (e) { return e instanceof TypeError; }
}



check("sum with start value", () => [1, 2, 3].myReduce((a, x) => a + x, 0) === 6);
check("sum without start value", () => [1, 2, 3].myReduce((a, x) => a + x) === 6);
check("strings", () => ["a", "b"].myReduce((a, x) => a + x, "") === "ab");
check("empty array with start value", () => [].myReduce((a, x) => a + x, 0) === 0);
check("empty array without start value throws", () => throws(() => [].myReduce((a, x) => a + x)));
check("only empty slots, no start value, throws", () => throws(() => [, ,].myReduce((a, x) => a + x)));
check("skips leading empty slots", () => [, , 5].myReduce((a, x) => a + x) === 5);
check("skips empty slot in the middle", () => [1, , 3].myReduce((a, x) => a + x, 0) === 4);
check("start value of undefined is respected", () => [1].myReduce(a => a, undefined) === undefined);
check("index starts at 1 without start value", () => [1, 2, 3].myReduce((a, x, i) => a + i) === 4);
check("index starts at 0 with start value", () => [1, 2, 3].myReduce((a, x, i) => a + i, 0) === 3);
check("passes the array", () => [5, 6].myReduce((a, x, i, arr) => arr.length, 0) === 2);
check("ignores items added during the loop", () => {
  const arr = [1, 2, 3];
  return arr.myReduce((a, x, i, list) => { list.push(10); return a + x; }, 0) === 6;
});
check("builds an object", () => {
  const out = ["a", "b", "a"].myReduce((acc, x) => { acc[x] = (acc[x] || 0) + 1; return acc; }, {});
  return out.a === 2 && out.b === 1;
});
check("throws if callback isn't a function", () => throws(() => [1, 2].myReduce("nope")));