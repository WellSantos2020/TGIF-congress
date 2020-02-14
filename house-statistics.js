//var members=data.results[0].members
function getdata(){
    
    fetch('https://api.propublica.org/congress/v1/113/senate/members.json', {
        
        headers: new Headers({
            "X-API-Key":"TWD3eCQJlbdwwNdbtoTSgnA6N9hIVgvvTbnRu0Rx"
        })
    })
.then(response => response.json())
.then(data => {
    var members=data.results[0].members
    var statistics= { 
        numberofdemocrats:getrepresentatives(members,"D"),
        numberofrepublicans:getrepresentatives(members,"R"),
        democratsvotingwiththeirparty:votesPartyAverage(members,"D"),
        republicansvotingwiththeirparty:votesPartyAverage(members,"R"),
        membersmostoftendonotvotewiththeirparty:"0",
        membersmostoftentvotewiththeirparty:"0",
        memberswhomissedthemostvotes: leastEngagedRep(members),
        memberswhomissedtheleastvotes:MostEngagedRep(members),
        totalrepresentatives:getTotal(members),
        totalpercentage:getTotalPct(members),
    
     }
     houseAtGlance(statistics)
     repEngagetbl(statistics.memberswhomissedthemostvotes, "least-engaged-hou")
     repEngagetbl(statistics.memberswhomissedtheleastvotes, "hou-most")

   
})
.catch(error => console.error(error))

}
getdata()


    
 function getrepresentatives(array, partycode){
       var numbers=[]
        array.forEach(senator => {
            if(senator.party==partycode) {
                numbers.push(senator)
        
            }   
        });
       return numbers.length
    }
//getrepresentatives(members,"D")
//getrepresentatives(members,"R")


function leastEngagedRep( array){
    var missedvotes=[]
    var final=[]
    array.forEach(represent => {
    if(represent.total_votes !=0 ){
        missedvotes.push(represent.missed_votes_pct)
        //console.log(missedvotes)
    } 
         });
    var perc  =Math.floor((array.length/100) * 10)
var y =missedvotes.sort(function (a, b) {  return a - b;  }).slice(0,perc)
    //console.log(y)
    var max=Math.max.apply(null, y)
    console.log(max)
    array.forEach(represent=>{
        if (represent.missed_votes_pct <= max){
         final.push(represent)
        }
    })
    return final
}

function MostEngagedRep( array){
    
    var missedvotes=[]
    var final=[]
    array.forEach(represent => {
    if(represent.total_votes !=0 ){
        missedvotes.push(represent.missed_votes_pct)
     //console.log(missedvotes)
    } 
         });
    var perc  =Math.floor((array.length/100) * 10)
var y =missedvotes.sort(function (a, b) {  return b - a;  }).slice(0,perc)
    //console.log(y)
    var min=Math.min.apply(null, y)
    console.log(min)
    array.forEach(represent=>{
        if (represent.missed_votes_pct >= min){
         final.push(represent)
        }
    })
    return final
}

function votesPartyAverage( array,partycode){
    
    var missedvotes=[]
    var final=[]
    var x;
    array.forEach(represent => {
    if(represent.party == partycode ){
        missedvotes.push(represent.votes_with_party_pct)
        
        x= missedvotes. reduce((a, b)=>a + b);
       
    }
    });
    x=(x/missedvotes.length).toFixed(2);
    console.log(x)
    return x 

    
}
//votesPartyAverage(members, "D")

//votesPartyAverage(members, "R")

function houseAtGlance(object){
    console.log(object)
    var republicans=document.getElementById("Republi-row")
    var democrats=document.getElementById("Democra-row")
    var total=document.getElementById("Total-row")
    
    republicans.insertCell().innerHTML=object.numberofrepublicans
    republicans.insertCell().innerHTML=object.republicansvotingwiththeirparty
    democrats.insertCell().innerHTML=object.numberofdemocrats
    democrats.insertCell().innerHTML=object.democratsvotingwiththeirparty
    total.insertCell().innerHTML=object.totalrepresentatives
    total.insertCell().innerHTML=object.totalpercentage
}


function getTotal(array){
    return array.length
}

function getTotalPct(array){
    var total=[]
    array.forEach(represents=>{
        total.push(represents.votes_with_party_pct)
       
        


    })
     var x =total.reduce((a,b)=>a+b)
     
     return (x/array.length).toFixed(2)
}

function repEngagetbl(array,id){
    var tbody=document.getElementById(id)
    array.forEach(rep=>{
        var trow= document.createElement("tr")
        
        trow.insertCell().innerHTML=rep.first_name+ " "+rep.last_name
        trow.insertCell().innerHTML=rep.missed_votes
        trow.insertCell().innerHTML=rep.missed_votes_pct 
        tbody.appendChild(trow)

        
    })
    
}

