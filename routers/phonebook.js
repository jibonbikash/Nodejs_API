const router = require('express').Router();
const Phonebook = require('../models/Phonebook');
const {phonebookValidation} = require('../helper/PhonebookValidation');


// Get all phone books
// http://localhost:3000/api/phonebook

router.get('/', async (req, res) => {

    try {
        const allPhone = await Phonebook.find({});

        return res.status(200).json({success: true, message: "ALl Phonebook ", data: allPhone});
    } catch (e) {
        return res.status(500).json({success: false, message: e});
    }
});

// Add new  phone book data
// http://localhost:3000/api/phonebook/new

router.post('/new', async (req, res) => {
    try {
        const {error} = phonebookValidation(req.body, {abortEarly: false});

        if (error) {
            return res.status(404).send({success: false, message: error.details[0].message});

        }

        const mobileexist = await Phonebook.findOne({mobile: req.body.mobile});

        if (mobileexist) {
            return res.status(200).json({success: false, message: "Mobile already exist "});
        }


        const newphone = new Phonebook({
            name: req.body.name,
            mobile: req.body.mobile,
        });

        try {
            const savePhone = await newphone.save();
            return res.status(200).json({success: true, message: "Data Save ", data: savePhone});

        } catch (e) {
            return res.status(500).json({success: false, message: e});
        }


    } catch (e) {
        return res.status(500).json({success: false, message: e});
    }

});

// http://localhost:3000/api/phonebook/update
// Update by _id
router.patch("/update", async (req, res) => {
    try {
        const updatePhone = await Phonebook.updateOne({_id: req.body._id}, {
            name: req.body.name,
            mobile: req.body.mobile
        });
        return res.status(200).json({success: true, message: "Data updated ", data: updatePhone});

    } catch (e) {
        if (e.code == 11000) {
            return res.status(200).json({success: false, message: "Mobile no already exist"});
        }
        else {
            return res.status(500).json({success: false, message: e});
        }

    }
});

// http://localhost:3000/api/phonebook/update/mobile_no
// Update by mobile no
router.patch("/update/(:mobile)", async (req, res) => {
    try {

        const mobileexist = await Phonebook.findOne({mobile: req.params.mobile});
        if (mobileexist) {

            const updatePhone = await Phonebook.updateOne({_id: req.body._id}, {
                name: req.body.name,
                mobile: req.body.mobile
            });
            return res.status(200).json({success: true, message: "Data updated ", data: mobileexist});
        }
        else {
            return res.status(404).json({success: false, message: 'Mobile no not found'});
        }


    } catch (e) {
        return res.status(500).json({success: false, msg: e});
    }
});

// http://localhost:3000/api/phonebook/details/mobile_no
router.get("/details/(:mobile)", async (req, res) => {
    if (req.params.mobile) {
        try {
            const mobileexist = await Phonebook.findOne({mobile: req.params.mobile});
            if (mobileexist) {
                return res.status(200).json({success: true, message: "Contact Details ", data: mobileexist});
            }
            else {
                return res.status(404).json({success: false, message: 'Mobile no not found'});
            }


        } catch (e) {
            return res.status(500).json({success: false, message: e});
        }
    }
    else {
        return res.status(500).json({success: false, message: 'Mobile no is required'});
    }

});

// http://localhost:3000/api/phonebook/delete/mobile_no
router.delete("/delete/(:mobile)", async (req, res) => {
    try {

        const mobileexist = await Phonebook.findOne({mobile: req.params.mobile});
        if (mobileexist) {
            Phonebook.findOneAndDelete({mobile: req.params.mobile}, function (err) {
                if (err) console.log(err);
                console.log("Successful deletion");
                return res.status(200).json({success: true, message: 'Mobile no deleted'});
            });
        }
        else {
            return res.status(404).json({success: false, message: 'Mobile no not found'});
        }


    } catch (e) {
        return res.status(500).json({success: false, message: e});
    }


});


module.exports = router;