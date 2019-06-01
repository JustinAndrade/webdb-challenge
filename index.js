// Server Setup
const express = require('express');
const knex = require('knex');
const server = express();
const db = knex('./knexfile.js').development;

// Server Get Commands
server.get('/', (req, res) => {
	res.status(200).json('Welcome to the Project Tracker API');
});

server.get('/projects', (req, res) => {
	db('projects')
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

//

// Server Listening on port 5000

const port = 5000;
server.listen(port, function() {
	console.log(`\n*** Project Tracker listening on http://localhost:${port} ***\n`);
});
