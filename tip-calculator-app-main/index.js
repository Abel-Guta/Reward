const inputMoney=document.querySelector("#inputMoney")
const inputCustomTip=document.querySelector("#inputcustomTip")
const inputPeople=document.querySelector("#inputPeople")
const total=document.querySelector("#total")
const perPerson=document.querySelector("#perPerson")
const reset=document.querySelector("#reset")
const error=document.querySelector("#error")
const buttons=document.querySelectorAll(".chooser")

let bill
let tip
let people

for (const button of buttons){
    button.addEventListener("click",()=>{
        removeLight()
        inputCustomTip.value=''
        button.classList.toggle("light")
        tip= +button.dataset.value
        output()

    })
}
reset.addEventListener("click",()=>{
    inputMoney.value=''
        inputCustomTip.value=''
        total.textContent=`$0.00`
        perPerson.textContent=`$0.00`
        inputPeople.value=''
        removeLight()
        error.classList.remove("active")
        bill=undefined
        tip=undefined
        people=undefined
})
function removeLight(){
    for (const button of buttons){
         button.classList.remove("light")
    }
}



inputMoney.addEventListener("input",()=>{
    
    
    bill= +inputMoney.value
    update()
})

inputCustomTip.addEventListener("input",()=>{
    removeLight()

    tip= +inputCustomTip.value
    update()
})

inputPeople.addEventListener("input",()=>{
    people= +inputPeople.value
    update()
})




function totalTip(bill,tip,people){
    if (typeof bill !== "number" || typeof tip!== "number"){
        throw new TypeError("input only number")
    }



    return (bill +(bill *tip/100))/people

}

function tipPerPerson(people,totalTip){

    if (typeof people !=="number" || people<0){
        throw new TypeError()
    }


    return totalTip/people



}

function update(){
        if (people<=0){
            error.classList.add("active")
             total.textContent=`$0.00`
        perPerson.textContent=`$0.00`
        return 
    
}
else{
    error.classList.remove("active")
    
}
    if(!(typeof bill ==="number" && typeof tip ==="number" && typeof people ==="number")){
        total.textContent=`$0.00`
        perPerson.textContent=`$0.00`
        return

    }

const res=totalTip(bill,tip,people)

total.textContent=`$${res.toFixed(2)}`

const tipDivided=tipPerPerson(people,tip/100 * bill)
perPerson.textContent=`$${tipDivided.toFixed(2)}`
    




}