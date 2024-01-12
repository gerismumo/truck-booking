const truckType = {
    trucKTypeAddition: 'INSERT INTO truck_types (_id, truck_type, image) VALUES(?,?,?)',
    getTruckTypes: 'SELECT * FROM truck_types',
    deleteTruckTypes: 'DELETE FROM truck_types WHERE _id = ?',
    updateTruckTypes: 'UPDATE truck_types SET truck_type = ?image = ?,  WHERE _id = ?',
}

module.exports = truckType;