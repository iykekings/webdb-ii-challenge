exports.up = function(knex) {
  return knex.schema.createTable('cars', table => {
    table.increments();
    table
      .text('VIN', 128)
      .unique()
      .notNullable();
    table.text('model', 128).notNullable();
    table.text('make', 128).notNullable();
    table
      .integer('mileage')
      .unsigned()
      .notNullable();
    table.text('transmission_type', 128);
    table.text('transmission_status', 128);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
