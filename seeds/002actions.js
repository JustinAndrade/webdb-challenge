exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('actions').del().then(function() {
		// Inserts seed entries
		return knex('actions').insert([
			{
				description: 'Build Restful API',
				notes: 'good job',
				completed: false,
				project_id: 1
			},
			{
				description: 'Build correct tables and columns',
				notes: 'amazing job',
				completed: false,
				project_id: 1
			},
			{
				description: 'project 2 actions',
				notes: 'project 2 notes',
				completed: false,
				project_id: 2
			}
		]);
	});
};
