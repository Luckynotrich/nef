const form = document.getElementById("contact-form");
  
const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById('shim').style.display = document.getElementById('msgbx').style.display = "block";
  document.getElementById('inTouch').style.display='none';
  let mail = new FormData(form);
  
  mail.append('message',message.value)
  sendMail(mail);
   
});

sendMail = async (mail) =>{
      //  axios.post('https://www.newledohub.org/newledo/sendEmail', 
      axios.post('http://localhost:5000/newledo/sendEmail', 
         mail, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
          .then(res => {
              if (!res.ok) {
                  return null
              }
          })
          .catch((e) => {
              console.log('ERROR ERROR', e, 'ERROR ERROR')
          })
        }