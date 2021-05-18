const checkToken = async (_url) => {
    if (!localStorage["tok"]) {
        return window.location.href = "login.html";
    }
    try {
        let data = await doApiMethod(_url, 'get');
        console.log(data)
        if (!data._id) {
            localStorage.removeItem("tok");
            window.location.href = "login.html";
        }
        console.log('logged in');
        return data;
    } catch (err) {
        console.log(err);
    }
}