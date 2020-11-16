
document.querySelector(".event-form").addEventListener("submit",submitForm);

function submitForm(){
    e.preventDefault();
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let num = document.getElementById("number-people").value;
    let fname = document.getElementById("fname").value;
    let date= document.getElementById("event-date").value;
    let room= document.querySelector('input[name="room"]:checked').value;

let time="6-8";
var obj=({
    first_name: fname,
    last_name: lname,
    email: email,
    phone:phone,
    num_people: num
});
db.collection('events').doc(room).collection(date).doc(time).set(obj);
document.querySelector(".event-form").reset();


var timings=["10-12","12-2","2-4","5-6","6-8","8-10"];
db.collection('events').doc(room).collection(date).get().then(function(querySnapshot){
    querySnapshot.forEach(function (doc){
        var x=timings.indexOf(doc.id);
        timings.splice(x,1);
        console.log(timings);
    });
    console.log(timings);
    var str=""
    for(var i=0;i<timings.length;i++){
         str+="<option value="+timings[i]+">"+timings[i]+"</option>";
    }
    document.getElementById("time_options").innerHTML=str;

 }).catch(function(err){
  console.log("error");
 });;


}


