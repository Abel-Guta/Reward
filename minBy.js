function minBy(array,callback){
     if (typeof callback !== 'function' || !Array.isArray(array)){
        throw new TypeError("only type function or array as input is allowed")
    }

    let minValue
    let res
    let n=array.length

    for (let i=0;i<n;i++){
        const processed=callback(array[i])
        if ((processed !== null && typeof processed!= "undefined") && (typeof minValue==="undefined" || processed<minValue)){
           
                minValue=processed
                res=array[i]

        
                



        }

    }
    return res 

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
check("smallest number", () => minBy([3, 1, 2], x => x) === 1);
check("returns the element, not the result", () => {
  const a = { n: 2 }, b = { n: 1 };
  return minBy([a, b], o => o.n) === b;
});
check("empty array gives undefined", () => minBy([], x => x) === undefined);
check("zero counts", () => minBy([2, 0, 1, 0.5], x => x) === 0);
check("negative numbers", () => minBy([-5, 3], x => x) === -5);
check("Infinity alone", () => minBy([Infinity], x => x) === Infinity);
check("single element", () => minBy([5], x => x) === 5);
check("strings", () => minBy(["b", "a"], x => x) === "a");
check("first one wins a tie", () => {
  const a = { n: 1, id: "a" }, b = { n: 1, id: "b" };
  return minBy([a, b], o => o.n) === a;
});
check("skips null results", () => {
  const c = { n: 2 };
  return minBy([{ n: null }, { n: 4 }, c], o => o.n) === c;
});
check("skips undefined results", () => {
  const b = { n: 4 };
  return minBy([{ n: undefined }, b], o => o.n) === b;
});
check("null first, then Infinity", () => {
  const b = { n: Infinity };
  return minBy([{ n: null }, b], o => o.n) === b;
});
check("all results null gives undefined", () => minBy([{ n: null }, { n: null }], o => o.n) === undefined);
check("throws if iteratee isn't a function", () => throws(() => minBy([1, 2], "nope")));