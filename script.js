const glowCursor = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
    glowCursor.style.left = `${e.clientX}px`;
    glowCursor.style.top = `${e.clientY}px`;
    glowCursor.style.opacity = "0.1";
});

document.addEventListener("mouseleave", () => {
    glowCursor.style.opacity = "0";
});

document.addEventListener("mousemove", () => { //to scroll smoothly
    glowCursor.style.opacity = "1";
});

document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior

        const targetId = this.getAttribute('href'); // Get the target section ID
        const targetElement = document.querySelector(targetId); // Select the target element

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

(function () { // Auto-called function
    emailjs.init("-h7d-1QYZwY3xm2jZ"); // Initiating email template ID
})();


document.querySelector("#contact-form").addEventListener("submit",function(event){
    event.preventDefault();

    var responseMsg=document.querySelector("#responseMsg");
    responseMsg.textContent='';

    var name=document.querySelector("#name").value;
    var mail=document.querySelector("#mail").value;
    var message=document.querySelector("#message").value;
    var nameError=document.querySelector("#nameError");
    var mailError=document.querySelector("#mailError");
    var messageError=document.querySelector("#messageError"); 
    var mailPattern=/^[^\s@#\$%\^!*]+@[^\s@]+\.+[^\s@]+$/;

    if(name.trim()==''){
        nameError.style.display='block'
        return;
    }
    if(mail.trim()==''){
        mailError.textContent="Please enter mail.!";
        mailError.style.display='block';
        return;
    }else if(!mailPattern.test(mail)){
        mailError.textContent="Please enter a valid mail.!";
        mailError.style.display='block';
        return;
    }
    if(message.trim()==''){
        messageError.style.display='block';
        return;
    }

    (function(){
        emailjs.init("-h7d-1QYZwY3xm2jZ");
    })();

    emailjs.send("service_3r57y0n", "template_48qyzed",{
        from_name:name,
        to_name:"Recipient",
        message:message,
        user_email:mail
    }).then(response=>{
        console.log("Success "+response);
        responseMsg.textContent="Email sent successfully.!";
        responseMsg.style.color='green';
    }).catch(error=>{
        console.log("Failed ",error);
        responseMsg.textContent="Failed to sent the mail.!";
        responseMsg.style.color='red';
    })
})

document.querySelector("#name").addEventListener("input",function(){
    document.querySelector("#nameError").style.display='none'
})

document.querySelector("#mail").addEventListener(("input"),function(){
    document.querySelector("#mailError").style.display='none'
})

document.querySelector("#message").addEventListener("input",function(){
    document.querySelector("#messageError").style.display='none'
})