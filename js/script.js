document.getElementById("contactForm").addEventListener("submit",function(e){

let name=document.getElementById("name").value;

if(name.length<3){
alert("Name must be at least 3 characters");
e.preventDefault();
}

});