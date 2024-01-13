const truckType = {
    trucKTypeAddition: 'INSERT INTO truck_types (_id,truck_type, image, book_type) VALUES(?,?,?,?)',
    getTruckTypes: 'SELECT * FROM truck_types',
    deleteTruckTypes: 'DELETE FROM truck_types WHERE _id = ?',
    updateTruckTypes: 'UPDATE truck_types SET truck_type = ?, image = ? , book_type = ? WHERE _id = ?',
    updateTruckTypesImageNull: 'UPDATE truck_types SET truck_type = ?, book_type = ? WHERE _id = ?',
}

const townRoutes = {
    add: 'INSERT INTO routes (id, route_name) VALUES (?, ?)',
    get:'SELECT * FROM routes',
    delete: 'DELETE FROM routes WHERE id = ?',
    update: 'UPDATE routes SET route_name = ? WHERE id = ?',
}

const trucks = {
    add: `INSERT INTO trucks (
        id,
        truck_type,
        book_type,
        pricing,
        max_amount,
        truck_model,
        number_plate,
        truck_image,
        driver_name,
        driver_license,
        national_id,
        start_route,
        end_route
    ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    get: 'SELECT * FROM trucks',
    delete: 'DELETE FROM trucks WHERE id = ?',
    update: `UPDATE trucks SET 
            truck_type = ?,
            truck_model = ?,
            number_plate = ?,
            truck_image = ?,
            driver_name = ?,
            driver_license = ?,
            national_id = ?,
            start_route = ?,
            end_route = ? WHERE id = ?`,
    
}
const queries = {
    truckType,
    townRoutes,
    trucks,
}

module.exports = queries;