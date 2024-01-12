import axios from 'axios';

const API_URL = 'http://locahost:5000';

const addTruckType = async (formData) => {
    const response = await axios.post(API_URL + '/api/addTruckType', formData);
    console.log(response);
}

const truckTypeService = {
    addTruckType,
}

module.exports = truckTypeService;