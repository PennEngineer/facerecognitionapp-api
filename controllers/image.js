const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'c0e8e136210a416683cbee85b9af5f71'
});

const handleApiCall = (req,res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL , req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res,knex) => {
	const {id} = req.body;
	knex('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries=> {
		res.json(entries[0]);
	})
	.catch(err=> res.status(400).json("unable to get entries"))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}
