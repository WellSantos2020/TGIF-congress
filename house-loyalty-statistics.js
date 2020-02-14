function getdata(){
    
    fetch('https://api.propublica.org/congress/v1/113/house/members.json', {
        
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
        numberofindependents:getrepresentatives(members,"I"),
        democratsvotingwiththeirparty:votesPartyAverage(members,"D"),
        republicansvotingwiththeirparty:votesPartyAverage(members,"R"),
        indepentsvotingwiththeirparty:votesPartyAverage(members,"I"),
        totalrepresentatives:getTotal(members),
        totalpercentage:getTotalPct(members),
        membersmostoftendonotvotewiththeirparty:leastLoyalRep(members),
        membersmostoftentvotewiththeirparty:MostloyalRep(members),
        membersmissedthemostvotes: leastEngagedRep(members),
        membersmissedtheleastvotes:mostEngagedRep(members), 
     }
     housAtGlance(statistics)
     housEngagetbl(statistics.membersmissedthemostvotes, "least-engaged-hous")
     housEngagetbl(statistics.membersmissedtheleastvotes, "hous-most")
   
})
.catch(error => console.error(error))

}
getdata()







var members=data.results[0].members

    function getrepresentatives(array, partycode){
       var numbers=[]
        array.forEach(senator => {
            if(senator.party==partycode) {
                numbers.push(senator)

            }   
        });
       return numbers.length
    }
getrepresentatives(members,"D")
getrepresentatives(members,"R")
getrepresentatives(members,"I")

function MostEngagedRep( array){
    
    var missedvotes=[]
    var final=[]
    array.forEach(hous => {
    if(hous.total_votes !=0 ){
        missedvotes.push(hous.missed_votes_pct)
        //console.log(missedvotes)
    } 
         });
    var perc  =Math.floor((array.length/100) * 10)
var y =missedvotes.sort(function (a, b) {  return b - a;  }).slice(0,perc)
    //console.log(y)
    var min=Math.min.apply(null, y)
    console.log(min)
    array.forEach(senator=>{
        if (senator.missed_votes_pct >= min){
         final.push(senator)
        }
    })
    console.log(final)
}

function housAtGlance(object){
    console.log(object)
    var republicans=document.getElementById("pubs-row")
    var democrats=document.getElementById("crats-row")
    var independents=document.getElementById("dents-row")
    var total=document.getElementById("Total-row")
     
    republicans.insertCell().innerHTML=object.numberofrepublicans
    republicans.insertCell().innerHTML=object.republicansvotingwiththeirparty
    democrats.insertCell().innerHTML=object.numberofdemocrats
    democrats.insertCell().innerHTML=object.democratsvotingwiththeirparty
    independents.insertCell().innerHTML=object.numberofindependents
    independents.insertCell().innerHTML=object.indepentsvotingwiththeirparty
    total.insertCell().innerHTML=object.totalrepresentatives
    total.insertCell().innerHTML=object.totalpercentage
}



function getTotal(array){
    return array.length
}

function getTotalPct(array){
    var total=[]
    array.forEach(senator=>{
        total.push(senator.votes_with_party_pct)
       
        


    })
     var x =total.reduce((a,b)=>a+b)
     
     return (x/array.length).toFixed(2)
}

function housEngagetbl(array,id){
    var tbody=document.getElementById(id)
    array.forEach(hous=>{
        var trow= document.createElement("tr")
        
        trow.insertCell().innerHTML=hous.first_name+ " "+hous.last_name
        trow.insertCell().innerHTML=hous.missed_votes
        trow.insertCell().innerHTML=hous.missed_votes_pct 
        tbody.appendChild(trow)

        
    })
    
}



function votesPartyAverage( array,partycode){
    
    var missedvotes=[]
    var final=[]
    var x=0
    array.forEach(hous => {
    if(hous.party == partycode ){
        missedvotes.push(hous.votes_with_party_pct)
            if(missedvotes.length> 0) {
                x= missedvotes.reduce((a, b)=>a + b); 
            }
        console.log(x)
    }
    });
        if(x==0){
            return x
        }else{    x=(x/missedvotes.length).toFixed(2);
            console.log("test")
            
                return x


        }
    
    
    

    
}
function leastLoyalRep( array){
    var missedvotes=[]
    var final=[] 
    array.forEach(senator => {
    if(senator.total_votes !=0 ){
        missedvotes.push(senator.votes_with_party_pct)
        //console.log(missedvotes)
    } 
         });
    var perc  =Math.floor((array.length/100) * 10)
var y =missedvotes.sort(function (a, b) {  return a - b;  }).slice(0,perc)
    //console.log(y)
    var max=Math.max.apply(null, y)
    console.log(max)
    array.forEach(senator=>{
        if (senator.votes_with_party_pct <= max){
         final.push(senator)
        }
    })
    return final
}
function MostloyalRep( array){
    
    var missedvotes=[]
    var final=[]
    array.forEach(senator => {
    if(senator.total_votes !=0 ){
        missedvotes.push(senator.votes_with_party_pct)
        //console.log(missedvotes)
    } 
         });
    var perc  =Math.floor((array.length/100) * 10)
var y =missedvotes.sort(function (a, b) {  return b - a;  }).slice(0,perc)
    //console.log(y)
    var min=Math.min.apply(null, y)
    console.log(min)
    array.forEach(senator=>{
        if (senator.votes_with_party_pct >= min){
         final.push(senator)
        }
    })
    return final
}
function leastEngagedRep( array){
    
    var missedvotes=[]
    var final=[]
    array.forEach(senator => {
    if(senator.total_votes !=0 ){
        missedvotes.push(senator.missed_votes_pct)
        //console.log(missedvotes)
    } 
         });
    var perc  =Math.floor((array.length/100) * 10)
var y =missedvotes.sort(function (a, b) {  return b - a;  }).slice(0,perc)
    //console.log(y)
    var min=Math.min.apply(null, y)
    console.log(min)
    array.forEach(senator=>{
        if (senator.missed_votes_pct >= min){
         final.push(senator)
        }
    })
    return final
}

function mostEngagedRep( array){
    var missedvotes=[]
    var final=[]
    array.forEach(senator => {
    if(senator.total_votes !=0 ){
        missedvotes.push(senator.missed_votes_pct)
        //console.log(missedvotes)
    } 
         });
    var perc  =Math.floor((array.length/100) * 10)
var y =missedvotes.sort(function (a, b) {  return a - b;  }).slice(0,perc)
    //console.log(y)
    var max=Math.max.apply(null, y)
    console.log(max)
    array.forEach(senator=>{
        if (senator.missed_votes_pct <= max){
         final.push(senator)
        }
    })
     return final
}


