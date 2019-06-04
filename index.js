// Server Setup
const express = require('express');
const knex = require('knex');
const server = express();
const knexConfig = require('./knexfile.js');
server.use(express.json());
const db = knex(knexConfig.development);

// API GET COMMANDS START //
server.get('/', (req, res) => {
	res.status(200).json('Welcome to the Project Tracker API');
});

// Projects
server.get('/projects', (req, res) => {
	db('projects')
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});
server.get('/projects/:id', async (req, res) => {
	try {
		const actions = await db('projects')
			.innerJoin('actions', 'actions.project_id', 'projects.id')
			.select('actions.id', 'actions.description', 'actions.notes', 'actions.completed')
			.where('projects.id', req.params.id);
		const project = await db('projects').where({ id: req.params.id });
		project.length !== 0
			? res.status(200).json({
					...project,
					actions: actions
				})
			: res.status(404).json({ err: 'A project with that ID could not be found.' });
	} catch (err) {
		res.status(500).json({ error: 'The project information could not be retrieved' });
	}
});
// Actions
server.get('/actions', (req, res) => {
	db('actions')
		.then((actions) => {
			res.status(201).json(actions);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});
server.get('/projects/:id/actions', (req, res) => {
	db('actions')
		.where({ project_id: req.params.id })
		.then((actions) => {
			res.status(201).json(actions);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});
// API GET COMMANDS END //

// API Post Commands
server.post('/projects', async (req, res) => {
	await db('projects')
		.insert({ name: req.params.name, description: req.params.description }, 'id')
		.then((newProject) => {
			res.status(201).json(newProject);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

server.post('/actions/', (req, res) => {
	db('actions')
		.insert(req.body)
		.then((action) => {
			res.status(201).json(action);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error creating that action', err });
		});
});
// Server Listening on port 5000

const port = 5000;
server.listen(port, function() {
	console.log(`\n*** Project Tracker listening on http://localhost:${port} ***\n`);
});
