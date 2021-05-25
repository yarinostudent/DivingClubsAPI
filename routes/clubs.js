const express = require('express');
const router = express.Router();

const {
    auth
} = require('../middlewares/auth');

const {
    ClubModel,
    validClubData
} = require('../models/clubsModel');


//--------Documentation--------

router.get('/', async (req, res) => {
    res.json({
        Signup: "/signup -> Send Name,Email and Password",
        Login: "/login -> Send Email and Password and you will get Token(save him)",
        clubs: "/info -> To see all diving clubs",
        newClub: "/newClub -> To add you own club",
        edit: "/:idEdit -> To Edit your club by his id",
        delete: "/:idDel -> To Delete your club by his id"
    })
})

//--------Diving Clubs--------


//Info
router.get('/info', async (req, res) => {
    let page = req.query.page ? Number(req.query.page) : 0;
    let perPage = req.query.perPage ? Number(req.query.perPage) : 4;
    let searchQ = req.query.s ? req.query.s : "";
    let sortBy = req.query.sort ? req.query.sort : "name";
    let regSearchQ = RegExp(searchQ, "i");
    let clubsLength;
    if (searchQ.length > 0) {
        clubsLength = await ClubModel.countDocuments({
            $or: [{
                    name: regSearchQ
                },
                {
                    org: regSearchQ
                },
                {
                    location: regSearchQ
                }
            ]
        });
    } else {
        clubsLength = await ClubModel.countDocuments({});
    }
    let clubs = await ClubModel.find({
            $or: [{
                    name: regSearchQ
                },
                {
                    org: regSearchQ
                },
                {
                    location: regSearchQ
                }
            ]
        })
        .limit(perPage)
        .skip(page * perPage)
        .sort({
            [sortBy]: 1
        })
    res.json({
        clubs: clubs,
        clubsLength: clubsLength
    });
})

//Return All The Db For Pagination
// router.get('/paginationInfo', async (req, res) => {
//     let clubs = await ClubModel.countDocuments({});
//     res.json(clubs);
// })

//Single Club
router.get('/single/:id', async (req, res) => {
    let id = req.params.id;
    let club = await ClubModel.findOne({
        _id: id
    })
    res.json(club);
})

//Get User Clubs
router.get('/myClubs', auth, async (req, res) => {
    let clubs = await ClubModel.find({
        user_id: req.tokenData._id
    })
    res.json(clubs);
})

//Add new club
router.post('/newClub', auth, async (req, res) => {
    let validClub = validClubData(req.body);
    if (validClub.error) {
        return res.status(400).json(validClub.error.details[0].message);
    }
    try {
        let club = new ClubModel(req.body);
        club.user_id = req.tokenData._id;
        await club.save();
        res.status(201).json(club);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})


//Edit Club
router.put('/:idEdit', auth, async (req, res) => {
    let idEdit = req.params.idEdit;
    let validClub = validClubData(req.body);
    if (validClub.error) {
        return res.status(400).json(validClub.error.details);
    }
    try {
        let club = await ClubModel.updateOne({
            _id: idEdit,
            user_id: req.tokenData._id
        }, req.body);
        res.json(club);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})


//Delete Club
router.delete('/:idDel', auth, async (req, res) => {
    let idDel = req.params.idDel;
    try {
        let club = await ClubModel.deleteOne({
            _id: idDel,
            user_id: req.tokenData._id
        });
        res.json(club);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})


module.exports = router;