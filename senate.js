

function getdata(){
    
    fetch('https://api.propublica.org/congress/v1/113/senate/members.json', {
        
        headers: new Headers({
            "X-API-Key":"TWD3eCQJlbdwwNdbtoTSgnA6N9hIVgvvTbnRu0Rx"
        })
    })
.then(response => response.json())
.then(data => {
    var members=data.results[0].members
    console.log(members) // Prints result from `response.json()` in getRequest
    buildtable(members)
    selectState(members)
    addEvList(members)
})
.catch(error => console.error(error))

}
getdata()

function buildtable(array){
    var tbody=document.getElementById('tbody-senate')
    for(let i = 0; i < array.length; i++){
        var trow=document.createElement("tr")
        var fullname;
        if (array[i].middle_name !=null){
             fullname=array[i].first_name+ " "+array[i].middle_name+ " "+array[i].last_name
            
        }else{
            fullname=array[i].first_name+ " " +array[i].last_name
            
        }
        
        trow.insertCell().innerHTML=fullname
        trow.insertCell().innerHTML=array[i].party
        trow.insertCell().innerHTML=array[i].state
        trow.insertCell().innerHTML=array[i].seniority
        trow.insertCell().innerHTML=array[i].votes_with_party_pct + ' %'

        
        tbody.appendChild(trow)
     
     }
     


}






    function addEvList(array){
         document.getElementById('state-choice')
         .addEventListener("change",()=>selectParty(array))
    
        Array.from(document.querySelectorAll('input[name="parties"]'))
        .forEach(input=>{
            input.addEventListener("change",()=>selectParty(array))
        })
    }
    
    

    function selectParty(array){
        var select=document.getElementById('state-choice').value
    
        var tbody=document.getElementById('tbody-senate')
        tbody.innerHTML=""
        var x = Array.from(document.querySelectorAll('input[name=parties]:checked')).map(myInput=>{

         return myInput.value
        } )
      if(x.length >0 && select=="All" ){
         
        const filtarray= array.filter(senator => x.includes(senator.party));
        buildtable(filtarray)
      }
       if(x.length===0 && select!="All" ){
         const filtarray=array.filter(senator=> senator.state==select)
         buildtable(filtarray)
        }
        if(x.length >0 && select!="All" ){
         
            const filtarray= array.filter(senator => x.includes(senator.party) && senator.state==select);
            buildtable(filtarray)
    
          }
          if(x.length ==0 && select=="All" ){
       
            buildtable(array)
          }
    }

    function selectState(array){
        var states=[] 
       
    array.forEach(senator => {
    
        states.push(senator.state)
      })
    console.log(states)
    var x = states.filter((item,index)=>states.indexOf(item)===index).sort()
    console.log(x)
    
    var select=document.getElementById('state-choice')
    
    x.forEach(state=>{
    
        var options=document.createElement('option')
        options.innerHTML=state
        select.appendChild(options)

    })

    }

    

    

  

     


