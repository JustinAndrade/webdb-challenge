exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('projects').del().then(function() {
		// Inserts seed entries
		return knex('projects').insert([
			{
				id: 1,
				name: 'Learn how to build a database',
				description: 'Learn API and Crud fundamentals to create your own SQL tables.',
				completed: false
			},
			{
				id: 2,
				name: 'Complete the Sprint with Style',
				description: 'Finish not only the MVP, but also knock down the Stretch Assignment!',
				completed: false
			}
		]);
	});
};
