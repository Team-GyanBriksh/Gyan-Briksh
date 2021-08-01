let user_name=sessionStorage.getItem("name");
let point=sessionStorage.getItem("points");
document.querySelector(".name").innerHTML=user_name;

document.querySelector(".points").innerHTML=point;