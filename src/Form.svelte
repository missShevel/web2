<script>
	let nameValue = "";
	let emailValue = "";
	let messageValue = "";

	const url = '/api/mailsender'

    //???
	const FormSelectors = {
	 FORM: 'form',
	 LOADER: '.form_loader',
 };

 const getFormData = (form) => {
     const formData = {};
     new FormData(form).forEach((nameValue, key) => {
         formData[key] = nameValue;
     });
     return formData;
 };

//  const resetFields = (form) => {
//      const fields = form.querySelectorAll('input, textarea');
//      for (const field of fields) {
//          field.value = '';
//      }
//  };

 //querySelector?
//  const showFormMessage = (form) => {
//      const formMessage = document.querySelector('.form_message');
//      if(!message.ok) {
//          formMessage.innerText = 'Unexpected error';
//          formMessage.classList.add('form_error');
//      } else {
//          formMessage.innerText = 'Success!';
//          formMessage.classList.remove('form_error');
//      }
//      formMessage.style.visibility = 'visible';
// };

const submitHandler = async (event) => {
    const form = document.querySelector('form');
//     const formLoader = document.querySelector('.form_loader');
//     const formMessage = document.querySelector('.form_message');

    document.getElementById('button').disabled = true;
//     formLoader.style.visibility = 'visible';
document.getElementsByClassName('loader')[0].style.visibility = 'visible';

    const formData = getFormData(form);

    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        });
const result = await response.json();
console.log(result);
if(result.result.success){
document.getElementsByClassName('result')[0].innerText = 'Your message was successfuly delivered!'
} else {
    document.getElementsByClassName('result')[0].innerText = result.errors.join(';')
}


    
//     formMessage.style.visibility = 'visible';
} catch(exception) {
console.log(exception)
}
document.getElementById('button').disabled = false;
document.getElementsByClassName('loader')[0].style.visibility = 'hidden';
// formLoader.style.visibility = 'hidden';
console.log(formData);
}




</script>

<main>
<div class="bg-contact2" >
    <div class="container-contact2">
        <div class="wrap-contact2">
            <form class="contact2-form validate-form" on:submit|preventDefault={submitHandler}>
                <span class="contact2-form-title">
                    Contact Us
                </span>

                <div class="wrap-input2 validate-input" data-validate="Name is required">
                    <input class="input2" type="text" name="name" placeholder="Name">
                    <span class="focus-input2" data-placeholder="NAME"></span>
                </div>

                <div class="wrap-input2 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                    <input class="input2" type="text" name="email" placeholder="Email">
                    <span class="focus-input2" data-placeholder="EMAIL"></span>
                </div>

                <div class="wrap-input2 validate-input" data-validate = "Message is required">
                    <textarea class="input2" name="message" placeholder="Message"></textarea>
                    <span class="focus-input2" data-placeholder="MESSAGE"></span>
                </div>

                <div class="container-contact2-form-btn">
                    <div class="wrap-contact2-form-btn">
                        <div class="contact2-form-bgbtn"></div>
                        <button class="contact2-form-btn" id ="button">
                            Send Your Message
                        </button>
                    </div>
                </div>
                <div class = 'result'>



                </div>
                <div class="loader" style='visibility: hidden' >
                    <img src="/loader.gif" alt="loader"/>
                </div>

            </form>
        </div>
    </div>
</div>
</main>

  <style>


  </style>