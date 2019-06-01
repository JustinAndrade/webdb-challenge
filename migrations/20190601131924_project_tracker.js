exports.up = async function(knex) {
	await knex.schema.createTable('projects', (tbl) => {
		tbl.increments('id');
		tbl.string('name').notNullable();
		tbl.string('description').notNullable();
		tbl.boolean('completed').notNullable();
	});

	await knex.schema.createTable('actions', (tbl) => {
		tbl.increments('id');
		tbl.string('description').notNullable();
		tbl.string('notes').notNullable();
		tbl.boolean('flag').references('completed').inTable('projects');
	});
};

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists('projects');
	await knex.schema.dropTableIfExists('actions');
};
