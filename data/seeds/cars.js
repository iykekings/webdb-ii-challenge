exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('cars').insert([
        {
          VIN: '253663H345T',
          make: 'mercedes',
          model: 'venz',
          mileage: 700,
          transmission_status: 'clean',
          transmission_type: 'type1'
        },
        {
          VIN: '253663H348J',
          make: 'honda',
          model: 'end of discussion',
          mileage: 589,
          transmission_status: 'salvage',
          transmission_type: 'type2'
        },
        {
          VIN: '253663H340L',
          make: 'peugeot',
          model: '404',
          mileage: 765,
          transmission_status: 'clean',
          transmission_type: 'type2'
        }
      ]);
    });
};
