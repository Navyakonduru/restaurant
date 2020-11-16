//name
function validate_name(){
    document.getElementById("e_name").innerHTML="";
    var name = document.getElementById("name").value;
    re = /^[a-zA-Z ]{1,40}$/;
    if(!name){
        document.getElementById("e_name").innerHTML="Name is required";
        return 1;
    }
    else if(!re.test(name)){
        document.getElementById("e_name").innerHTML="Invalid name";
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

//Date
function validate_date(){
    document.getElementById("e_date").innerHTML="";
    var date = document.getElementById("date").value;
    var d=new Date();
    var dd=String(d.getDate());
    var mm=String(d.getMonth()+1);
    var yy=String(d.getFullYear());
    var today;
    if(dd<10)
        today=yy+'-'+mm+'-0'+dd;
    else
        today=yy+'-'+mm+'-'+dd;
    if(!date){
        document.getElementById("e_date").innerHTML="Date is Required";
        return 1;
    }  
    else if(date<=today){
        document.getElementById("e_date").innerHTML="Invalid Date";
        return 1;
    }
    return 0;
}

//num
function validate_num(){
    document.getElementById("num").innerHTML="";
    let num = document.getElementById("people").value;
    if(!num){
        document.getElementById("num").innerHTML="Number of people is required";
        return 1;
    }
    else if(num<=0)
    {
        document.getElementById("num").innerHTML="Invalid number";
        return 1;
    }
    return 0;
}

//time
function validate_time(){
    document.getElementById("e_time").innerHTML="";
    let time = document.getElementById("time").value;
    if(!time){
        document.getElementById("e_time").innerHTML="Time is required";
        return 1;
    }
    return 0;
}

function validate(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let date = document.getElementById("date").value;
    let num = document.getElementById("people").value;
    let time = document.getElementById("time").value;

    var x=0;
    x=x+validate_name();
    x=x+validate_mail();
    x=x+validate_phone();
    x=x+validate_date();
    x=x+validate_time();
    x=x+validate_num();
    
    if(x==0){
        var obj=({
            name: name,
            phone: phone,
            num_people: num,
        });
        db.collection('reserve').doc(date).collection(time).doc(email).set(obj);
        document.querySelector(".reserve-form").reset();
        document.getElementById('result').innerHTML="Reserved Successfully!";
        
        var body= "Hi "+name+",<br>The table has been reserved successfully for "+num+" people on "+date+" at "+time+".<br>For any other information, please contact us.<br>Thanks,<br> Team Delicious.";
        Email.send({
            Host: "smtp.gmail.com",
            Username : "delicious1res@gmail.com",
            Password : "delicious54",
            port: 587,
            To : email,
            From : "delicious1res@gmail.com",
            Subject : "Table reserved successfully",
            Body : body,
        })
        .then(
        message => document.querySelector(".close").click()
        );
    }
}