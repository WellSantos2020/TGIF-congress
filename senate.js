var members=data.results[0].members 
console.log(members)

function buildtable(array){
    var tbody=document.getElementById('tbody-senate')
    for(let i = 0; i < array.length; i++){
        var trow=document.createElement("tr")
        var fullname;
        if (array[i].middle_name !=null){
             fullname=array[i].first_name+ " "+array[i].middle_name+ " "+array[i].last_name
             console.log(fullname)
        }else{
            fullname=array[i].first_name+ " " +array[i].last_name
            console.log(fullname)
        }
        
        trow.insertCell().innerHTML=fullname
        trow.insertCell().innerHTML=array[i].party
        trow.insertCell().innerHTML=array[i].state
        trow.insertCell().innerHTML=array[i].seniority
        trow.insertCell().innerHTML=array[i].votes_with_party_pct + ' %'

        
        tbody.appendChild(trow)
     
     } 


}

buildtable(members)



