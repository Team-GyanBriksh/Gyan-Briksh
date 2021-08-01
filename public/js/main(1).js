function show_more_menu(e){
    e.preventDefault();
    console.log("clicked");
    location.href="/welcomepage"
}
function submitform(e){
    e.preventDefault();
    let name=document.forms["welcome_form"]["name"].value;
    sessionStorage.setItem("name",name);
    console.log(name);
    location.href="/mytho_quiz"
}
let user_name=sessionStorage.getItem("name");
document.querySelector(".name").innerHTML=user_name;
window.onload=function(){
    show(0);
}
let questions_1=[
    {
        id:1,
        question:"Q.In order to teach Lord Brahma a lesson, which God showed different multiversal  version of Lord brahma to him?",
        answer:"Lord Krishna",
        options:[
            "Lord Krishna",
            "Lord Shiva",  
            "Lord Ganesh", 
            "Maa Durga"
        ]
    },
    {
        id:2,
        question:"Q.For how many days Mahabharat war fought ?",
        answer:"18",
        options:[
            "20",
            "18",  
            "25", 
            "30"
        ]
    },
    {
        id:3,
        question:"Q.Which barrister turned freedom fighter fought for Bhagat Singh in Court?",
        answer:"Md Ali Jinnah  ",
        options:[
            "Md Ali Jinnah  ",
            "Gandhi ji",  
            "Nehru ji", 
            "Rabindranath Tagore"
        ]
    },
    {
        id:4,
        question:"Q.Who is the current prime minister of India?",
        answer:"Narendra Modi  ",
        options:[
            "Manmohan singh  ",
            "Narendra Modi  ",  
            "Amit Shah  ", 
            "Kejriwal"
        ]
    },
    {
        id:5,
        question:"Q.Who is the last avatar of Lord Vishnu?",
        answer:"Lord Kalki",
        options:[
            "Lord Jaganath",
            "Lord Shayam",  
            "Lord Tirumala", 
            "Lord Kalki"
        ]
    }
];
let question_count=0;
let quiz_points=0;
function next(){
    if(question_count==questions_1.length-1){
        location.href="/finalpage"
    }
    let user_answer=document.querySelector("li.option.active").innerHTML;
    //check answer
    if(user_answer==questions_1[question_count].answer){
        console.log("right");
        quiz_points+=10;
        sessionStorage.setItem("points",quiz_points);
    }
    else{
        console.log("wrong");
    }
    question_count++;
    console.log(question_count);
    show(question_count);
}
function show(count){
    let question=document.getElementById("questions");
    question.innerHTML= `<h2> ${questions_1[count].question} </h2>
    <ul class="option_group">
                    <li class="option">${questions_1[count].options[0]}</li>
                    <li class="option">${questions_1[count].options[1]}</li>
                    <li class="option">${questions_1[count].options[2]}</li>
                    <li class="option">${questions_1[count].options[3]}</li>
                </ul>`;
                toggle_active();
}
function toggle_active(){
let option=document.querySelectorAll("li.option");
for(let i=0;i<option.length;i++){
    option[i].onclick=function(){
        for(let i=0;i<option.length;i++)
        {
            if(option[i].classList.contains("active")){
                option[i].classList.remove("active");
            }
        }
        option[i].classList.add("active");
    };
}
}
