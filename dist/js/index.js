const form = document.getElementById("contact-form");
// Automatically detect environment and use appropriate URL
const baseURL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://www.newledohub.org';

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById('shim').style.display = document.getElementById('msgbx').style.display = "block";
  document.getElementById('inTouch').style.display = 'none';
// <input type="text"  name="contactType" value='A New Contact From' readonly hidden>

  Object.keys(form).forEach(key => {
    form[key] = DOMPurify.sanitize(form[key]);
  });

  let mail = new FormData(form);
  mail.append('message', DOMPurify.sanitize(message.value))
  mail.append('contactType','A New Contact From')
  console.log('mail ', mail)
  sendMail(mail);

});

sendMail = (mail) => {

  event.preventDefault()

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

function enableSubmit(token) {
  const contactForm = document.getElementById('contact-form');
  
  for (const child of contactForm.children) {
    if (child.disabled) {
      child.disabled = false
      child.hidden = false
    }
  }
}



const ipload = async () => {
  try {
    const result = await axios.get(`/getip`)//${baseURL}
    const data = await JSON.stringify(result.data, null, 2)
    const cleanData = JSON.parse(data);

    document.getElementById('ip').textContent = cleanData
  }
  catch (error) {
    document.getElementById('ip').textContent = `Error loading data: ${error} `
  }
}
