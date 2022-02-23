const DataBaseHelper = require('../../helper/db.helper');


ping = async() => {
    try {
        const dbHelper = new DataBaseHelper();
        const instace = dbHelper.init();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    ping
}