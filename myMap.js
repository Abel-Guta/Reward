function myMap(arr,callback){
    if (typeof callback !== 'function' || !Array.isArray(arr)){
        throw new TypeError("only type function or array as input is allowed")
    }

    const n=arr.length
    const output=new Array(n)

    for (let i=0;i<n;i++){

        if(i in arr){
            output[i]=callback(arr[i],i,arr)

        }
        
    }
  return output

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

check("doubles numbers", () => same(myMap([1, 2, 3], x => x * 2), [2, 4, 6]));
check("empty array", () => same(myMap([], x => x), []));
check("passes index", () => same(myMap(["a", "b"], (x, i) => x + i), ["a0", "b1"]));
check("passes the array", () => same(myMap([10, 20], (x, i, arr) => arr.length), [2, 2]));
check("keeps empty slot in the middle", () => same(myMap([1, , 3], x => x * 2), [2, , 6]));
check("keeps empty slot at the end", () => myMap([1, 2, , ], x => x).length === 3);
check("doesn't call callback on empty slots", () => {
  let calls = 0;
  myMap([1, , 3], () => calls++);
  return calls === 2;
});
check("ignores items added during the loop", () => {
  const arr = [1, 2, 3];
  const out = myMap(arr, (x, i, a) => { a.push(99); return x; });
  return out.length === 3;
});
check("doesn't change the original array", () => {
  const arr = [1, 2, 3];
  myMap(arr, x => x * 2);
  return same(arr, [1, 2, 3]);
});
check("throws if callback isn't a function", () => throws(() => myMap([1, 2], "nope")));
check("throws if no callback", () => throws(() => myMap([1, 2])));