let userData;
$(() => {
    init();
})

const init = async () => {
    userData = await checkToken("http://localhost:3000/users/userInfo")
    let url = "http://localhost:3000/clubs/info";
    let clubs = await doApiMethod(url, 'GET');
    console.log(clubs);
    createClubs(clubs);
}

const createClubs = (_ar) => {
    _ar.map(item => {
        let clubs = new ClubClass('#clubList', item);
        clubs.render();
    })
}