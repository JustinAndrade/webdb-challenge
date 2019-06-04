exports.up = async function(knex) {
	await knex.schema.createTable('projects', (tbl) => {
		tbl.increments('id');
		tbl.string('name');
		tbl.string('description');
		tbl.boolean('flag');
	});

	await knex.schema.createTable('actions', (tbl) => {
		tbl.increments('id');
		tbl.string('description').notNullable();
		tbl.string('notes').notNullable();
		tbl.boolean('completed').notNullable();
		tbl.integer('project_id').references('id').inTable('projects');
	});

	await knex.schema.table('projects', (tbl) => {
		tbl.renameColumn('flag', 'completed');
	});
};
exports.down = async function(knex) {
	await knex.schema.dropTableIfExists('projects');
	await knex.schema.dropTableIfExists('actions');
};
