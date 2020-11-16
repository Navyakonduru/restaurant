//first name
function validate_fname(){
    document.getElementById("f_name").innerHTML="";
    var fname = document.getElementById("fname").value;
    var re = /[^ ][a-zA-Z ]{1,35}$/;
    if(!fname){
        document.getElementById("f_name").innerHTML="First name is required";
        return 1;
    }
    else if(!re.test(fname)){
        document.getElementById("f_name").innerHTML="Invalid First Name";
        return 1;
    }
    return 0;
}

//last name
function validate_lname(){
    document.getElementById("l_name").innerHTML="";
    var lname = document.getElementById("lname").value;
    re = /^[a-zA-Z ]{1,35}$/;
    if(!lname){
        document.getElementById("l_name").innerHTML="Last name is required";
        return 1;
    }
    else if(!re.test(lname)){
        document.getElementById("l_name").innerHTML="Invalid Last Name";
        return 1;
    }
    return 0;
}

//Email
function validate_mail() {
    document.getElementById("mail").innerHTML="";
    var email = document.getElementById("email").value;
    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!email){
        document.getElementById("mail").innerHTML="Mail Id is required";
        return 1;
    }
    else if(!re.test(email)){
        document.getElementById("mail").innerHTML="Invalid Mail Id";
        return 1;
    }
    return 0;
}

//Phone
function validate_phone(){
    document.getElementById("contact").innerHTML="";
    var phone = document.getElementById("phone").value;
    var re = /^\d{10}$/;
    if(!phone){
        document.getElementById("contact").innerHTML="Phone number is required";
        return 1;
    }
    else if(!re.test(phone)){
        document.getElementById("contact").innerHTML="Invalid Phone Number";
        return 1;
    }
    return 0;
}

//event name
function validate_ename(){
    document.getElementById("e_name").innerHTML="";
    var e_name= document.getElementById("event-name").value;
    var re = /^[a-zA-Z ]{1,50}$/;
    if(e_name.length == 0){
        document.getElementById("e_name").innerHTML="Event name is required";
        return 1;
    }
    else if(!re.test(e_name)){
        document.getElementById("e_name").innerHTML="Invalid Event Name";
        return 1;
    }
    return 0;
}

//Date
function validate_date(){
    document.getElementById("date").innerHTML="";
    document.getElementById("time_options").innerHTML="";
    document.getElementById("time_options").disabled=true;
    var date = document.getElementById("event-date").value;
    if(!date){
        document.getElementById("date").innerHTML="Date is Required";
        return 1;
    }  
    else if(date<=today){
        document.getElementById("date").innerHTML="Invalid Date";
        return 1;
    }
    return 0;
}

//number of people
function validate_num(){
    document.getElementById("num").innerHTML="";
    var num = document.getElementById("number-people").value;
    var re = /^\d+$/;
    if(!num){
        document.getElementById("num").innerHTML="Number of people is required";
        return 1;
    }
    else if(!re.test(num)){
        document.getElementById("num").innerHTML="Invalid Selection";
        return 1;
    }
    return 0;
}

//room
function validate_room(){
    document.getElementById("time_options").innerHTML="";
    document.getElementById("time_options").disabled=true;
}

//Submit
function validate(){
    document.getElementById("e_room").innerHTML="";
    let time = document.getElementById("time_options").value;
    let date = document.getElementById("event-date").value;

    var x=0;
    x=x+validate_fname();
    x=x+validate_lname();
    x=x+validate_mail();
    x=x+validate_phone();
    x=x+validate_ename();
    x=x+validate_num();
    if(!date){
        document.getElementById("date").innerHTML="Date is required";
        x=x+1;
    }
    else if(date<=today){
        document.getElementById("date").innerHTML="Invalid Date";
        x=x+1;
    }
        
    if(time==""){
        document.getElementById("e_time").innerHTML="Time is required";
        x=x+1;
    }
    
    //room
    try{
        var room= document.querySelector('input[name="room"]:checked').value;
    }
    catch(err){
        document.getElementById("e_room").innerHTML="Room selection is required";
        x=x+1;
    }
    
    if(x==0){
        let lname = document.getElementById("lname").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let num = document.getElementById("number-people").value;
        let fname = document.getElementById("fname").value;
        let pref= document.getElementById("contact-preference").value;
        let ename = document.getElementById("event-name").value;
        let info = document.getElementById("add-info").value;
        let hear_r = document.getElementById("hear").value;

        var obj=({
            first_name: fname,
            last_name: lname,
            email: email,
            phone:phone,
            preference:pref,
            event_name:ename,
            num_people: num,
            add_info:info,
            hear:hear_r
        });
        db.collection('events').doc(room).collection(date).doc(time).set(obj);
        document.querySelector(".event-form").reset();
        document.getElementById("time_options").innerHTML="";
		var body= "Hi "+fname+",<br>The "+room+" room has been booked successfully on "+date+" at "+time+"<br>For any other information, please contact us.<br>Thanks,<br> Team Delicious.";
        
        Email.send({
            Host: "smtp.gmail.com",
            Username : "delicious1res@gmail.com",
            Password : "delicious54*",
            port: 587,
            To : email,
            From : "delicious1res@gmail.com",
            Subject : "Room booked successfully",
            Body : body,
        })
        .then(function(message){
            window.history.back();
        });
        
    }
}

function change(){
    let date = document.getElementById("event-date").value;
    let time = document.getElementById("time_options").value;

    try{
    var room= document.querySelector('input[name="room"]:checked').value;
    const db=firebase.firestore();

    var timings=["8 A.M. -- 11 A.M.","11 A.M. -- 2 P.M.","2 P.M. -- 5 P.M.","5 P.M. -- 8 P.M.","8 P.M. -- 11 P.M."];
    var timings2=["8A.M.--11A.M.","11A.M.--2P.M.","2P.M.--5P.M.","5P.M.--8P.M.","8P.M.--11P.M."];
    db.collection('events').doc(room).collection(date).get().then(function(querySnapshot){
        querySnapshot.forEach(function (doc){
            var x=timings2.indexOf(doc.id);
            timings.splice(x,1);
            timings2.splice(x,1);
        });
        if(timings.length==0){
            document.getElementById("e_time").innerHTML="No bookings available for "+room+" room on "+date;
            document.getElementById("time_options").innerHTML="";
            document.getElementById("time_options").disabled=true;
        }
        else{
            if((date) && (room) && (date>today) && (!time)){
                document.getElementById("time_options").disabled=false;
                document.getElementById("e_time").innerHTML="";
                var str="";
                for(var i=0;i<timings.length;i++){
                    str+="<option value="+timings2[i]+">"+timings[i]+"</option>";
                }
                document.getElementById("time_options").innerHTML=str;
            }
        }
        }).catch(function(err){
            console.log("error");
        });
    }
    catch(err){
        console.log("error");
    }
}

var d=new Date();
var dd=String(d.getDate());
var mm=String(d.getMonth()+1);
var yy=String(d.getFullYear());
var today;
if(dd<10)
    today=yy+'-'+mm+'-0'+dd;
else
    today=yy+'-'+mm+'-'+dd;
    
