const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById('shim').style.display = document.getElementById('msgbx').style.display = "block";
  document.getElementById('inTouch').style.display = 'none';


  Object.keys(form).forEach(key => {
    form[key] = DOMPurify.sanitize(form[key]);
  });

  let mail = new FormData(form);
  mail.append('message', DOMPurify.sanitize(message.value))
  console.log('mail ',mail)
  sendMail(mail);

});

sendMail = async (mail) => {

  // Automatically detect environment and use appropriate URL
  const baseURL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://www.newledohub.org';
  
  axios.post(`${baseURL}/newledo/sendEmail`,
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