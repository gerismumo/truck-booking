const truckType = {
    trucKTypeAddition: 'INSERT INTO truck_types (_id,truck_type, image) VALUES(?,?,?)',
    getTruckTypes: 'SELECT * FROM truck_types',
    deleteTruckTypes: 'DELETE FROM truck_types WHERE _id = ?',
    updateTruckTypes: 'UPDATE truck_types SET truck_type = ?, image = ? WHERE _id = ?',
}

const townRoutes = {
    add: 'INSERT INTO routes (id, route_name) VALUES (?, ?)',
    get:'SELECT * FROM routes',
    delete: 'DELETE FROM routes WHERE id = ?',
    update: 'UPDATE routes SET route_name = ? WHERE id = ?',
}
const queries = {
    truckType,
    townRoutes,
}

module.exports = queries;