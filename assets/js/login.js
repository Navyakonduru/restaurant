//name
function validate_name(){
    document.getElementById("e_name").innerHTML="";
    var name = document.getElementById("s_name").value;
    var re = /^[a-zA-Z ]{1,35}$/;
    if(!name){
        document.getElementById("e_name").innerHTML="Name is required";
        return 1;
    }
    else if(!re.test(name)){
        document.getElementById("e_name").innerHTML="Invalid Name";
        return 1;
    }
    return 0;
}
//Email
function validate_mail() {
    document.getElementById("e_mail").innerHTML="";
    var email = document.getElementById("s_mail").value;
    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!email){
        document.getElementById("e_mail").innerHTML="Mail Id is required";
        return 1;
    }
    else if(!re.test(email)){
        document.getElementById("e_mail").innerHTML="Invalid Mail Id";
        return 1;
    }
    return 0;
}
//Phone
function validate_phone(){
    document.getElementById("e_phone").innerHTML="";
    var phone = document.getElementById("s_phone").value;
    var re = /^\d{10}$/;
    if(!phone){
        document.getElementById("e_phone").innerHTML="Phone number is required";
        return 1;
    }
    else if(!re.test(phone)){
        document.getElementById("e_phone").innerHTML="Invalid Phone Number";
        return 1;
    }
    return 0;
}
//Password
function validate_password(){
    document.getElementById("e_password").innerHTML="";
    var password = document.getElementById("s_password").value;
    var re = /^[a-zA-Z0-9.,*&#^-_]{1,15}$/;
    if(!password){
        document.getElementById("e_password").innerHTML="Password is required";
        return 1;
    }
    else if(password.length<6 || password.length>15){
        document.getElementById("e_password").innerHTML="Password should 6-15 characters";
        return 1;
    }
    else if(!re.test(password)){
        document.getElementById("e_password").innerHTML="Invalid Password";
        return 1;
    }
    return 0;
}

function validate_signUp(){
    let name = document.getElementById("s_name").value;
    let email = document.getElementById("s_mail").value;
    let phone = document.getElementById("s_phone").value;
    let password = document.getElementById("s_password").value;
    var x=0;
    x+=validate_name();
    x+=validate_mail();
    x=validate_phone();
    x+=validate_password();
    if(x==0){
        var obj=({
            name:name,
            phone:phone,
            password:password
        });
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
            return result.user.updateProfile({
                displayName: name
            })
        }).catch(function(error) {
            console.log(error);
        });
        
        db.collection("users").doc(email).set(obj);
        $('.close').click();
        $('.login').click();
        document.querySelector(".login-form").reset();
        document.getElementById("el_mail").innerHTML="";
        document.getElementById("el_password").innerHTML="";
    }
}

//Login Email
function validate_lmail() {
    document.getElementById("el_mail").innerHTML="";
    var email = document.getElementById("l_mail").value;
    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!email){
        document.getElementById("el_mail").innerHTML="Mail Id is required";
        return 1;
    }
    else if(!re.test(email)){
        document.getElementById("el_mail").innerHTML="Invalid Mail Id";
        return 1;
    }
    return 0;
}
//Login Password
function validate_lpassword(){
    document.getElementById("el_password").innerHTML="";
    var password = document.getElementById("l_password").value;
    var re = /^[a-zA-Z0-9.,*&#^-_]{1,15}$/;
    if(!password){
        document.getElementById("el_password").innerHTML="Password is required";
        return 1;
    }
    else if(password.length<6 || password.length>15){
        document.getElementById("el_password").innerHTML="Password should 6-15 characters";
        return 1;
    }
    else if(!re.test(password)){
        document.getElementById("el_password").innerHTML="Invalid Password";
        return 1;
    }
    return 0;
}

function validate_login(){
    let email = document.getElementById("l_mail").value;
    let password = document.getElementById("l_password").value;
    document.getElementById("fail").innerHTML="";
    var x=0;
    x+=validate_lmail();
    x+=validate_lpassword();
    console.log(email);
    console.log(password);
    if(x==0){
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
            var user = firebase.auth().currentUser;
            if(user){
                let name=user.displayName;
                console.log(name);
                document.querySelector(".login-form").reset();
                $('.close').click();
                sessionStorage.setItem("name",name);
                sessionStorage.setItem("mail",email);
                sessionStorage.setItem("password",password);
                document.getElementById("login-sm").innerHTML='<a id="login-icon-sm" class="logout change-icon" data-toggle="popover"></a>';
                document.getElementById("login-icon-sm").innerHTML=name[0].toUpperCase();
                document.getElementById("login-lg").innerHTML='<a id="login-icon-lg" class="logout change-icon-lg btn" data-toggle="popover"></a>';
                document.getElementById("login-icon-lg").innerHTML=name[0].toUpperCase();
                $('.logout').popover({
                    content: '<div class="pop"><a class="logoutBtn btn btn-dark" role="button">Log out</a></div>', 
                    html: true, 
                    placement: "bottom"
                }); 
            }
            else {
                document.getElementById("fail").innerHTML="Invalid mail Id or Password";
            }
        });
    }
}

console.log(sessionStorage.getItem("mail"));

let email=sessionStorage.getItem("mail");
let password=sessionStorage.getItem("password");
let name=sessionStorage.getItem("name");
console.log(email);
console.log(password);
if(email && password && name){
    console.log(name);
    document.getElementById("login-sm").innerHTML='<a id="login-icon-sm" class="logout change-icon" data-toggle="popover"></a>';
    document.getElementById("login-icon-sm").innerHTML=name[0].toUpperCase();
    document.getElementById("login-lg").innerHTML='<a id="login-icon-lg" class="logout change-icon-lg btn" data-toggle="popover"></a>';
    document.getElementById("login-icon-lg").innerHTML=name[0].toUpperCase();
    $('.logout').popover({
        content: '<div class="pop"><a class="logoutBtn btn btn-dark" role="button">Log out</a></div>', 
        html: true, 
        placement: "bottom"
    }); 
}
else{
    document.getElementById("login-sm").innerHTML='<a id="login-icon-sm" class="login login-icon" href="index1.html" data-toggle="modal" data-target="#loginModal"><i id="icon" class="icofont-user-alt-3"></i></a>';
    document.getElementById("login-lg").innerHTML='<a id="login-icon-lg" class="login" href="index1.html" data-toggle="modal" data-target="#loginModal">login</a>';
}
$(function(){
    $(document).on('click',".logoutBtn",function () {
        $('.logout').popover("hide");
        firebase.auth().signOut().then(function(){
            alert("Logged out scuccessfully.... Redirecting   ------>");
            sessionStorage.clear();
            console.log(sessionStorage.getItem("name"));
            document.getElementById("login-sm").innerHTML='<a id="login-icon-sm" class="login login-icon" href="#loginModal" data-toggle="modal" data-target="#loginModal"><i id="icon" class="icofont-user-alt-3"></i></a>';
            document.getElementById("login-lg").innerHTML='<a id="login-icon-lg" class="login" href="#loginModal" data-toggle="modal" data-target="#loginModal">login</a>';
        });
    });
});

$('.signUpBtn').click(function(){
    document.getElementById("e_name").innerHTML="";
    document.getElementById("e_password").innerHTML="";
    document.getElementById("e_mail").innerHTML="";
    document.getElementById("e_phone").innerHTML="";
    document.querySelector(".signUp-form").reset();
});
$('.login').click(function(){
    document.querySelector(".login-form").reset();
    document.getElementById("fail").innerHTML="";
    document.getElementById("el_mail").innerHTML="";
    document.getElementById("el_password").innerHTML="";
});

//Email
function validate_pmail() {
    document.getElementById("ep_mail").innerHTML="";
    var email = document.getElementById("p_mail").value;
    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!email){
        document.getElementById("ep_mail").innerHTML="Mail Id is required";
        return 1;
    }
    else if(!re.test(email)){
        document.getElementById("ep_mail").innerHTML="Invalid Mail Id";
        return 1;
    }
    return 0;
}

function validate_forgotPass(){
    let email=document.getElementById("p_mail").value;
    var x=validate_pmail();
    if(x==0){
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(email).then(function() {

        }).catch(function(error) {
            alert(error);
        });
        $('.close').click();
        document.querySelector(".password-form").reset();
        document.getElementById("ep_mail").innerHTML="";
    }
}
