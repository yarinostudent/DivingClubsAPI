$(() => {
    init();
})

const init = () => {
    $('#form_id').on('submit', (e) => {
        e.preventDefault();
        let bodyData = {
            email: $('#email_id').val(),
            password: $('#pass_id').val()
        }
        console.log(bodyData.email, bodyData.password)
        logItIn(bodyData);
    })
}

const logItIn = async (bodyData) => {
    let url = "http://localhost:3000/users/login"
    let data = await doApiMethod(url, 'post', bodyData);

    if (data.token) {
        localStorage.setItem('tok', data.token);
        window.location.href = "/clubs.html";
    } else {
        alert('Invalid Email Or Password!');
    }
    console.log(data);
}