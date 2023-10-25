const userValidation = (data)=>{
    const error = {};     
    const email_pattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const username_pattern = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,12}$/;
    const phone_pattern = /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const name_pattern = /^[A-Z][a-z]+( [A-Z][a-z]+)?$/;


    if(data.name===""){
       error.name = "Your name can't be empty";
    }
    if(!name_pattern.test(data.name)){
       error.name="Please enter a valid name";
    }
    
    if(!email_pattern.test(data.email)){
       error.email = "Please enter a valid email";
    }
    if(!phone_pattern.test(data.phone)){
        error.phone="Please enter a valid mobile number";
    }
    if(!username_pattern.test(data.username)){
       error.username ="enter atleat 8 character and atmost 12 character";
    }
    if(data.usertype===""){
     error.usertype = " please choose your user type!!";
    }

     return error;

}

module.exports = userValidation;