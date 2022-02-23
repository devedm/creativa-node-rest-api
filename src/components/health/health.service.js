const healthData = require('./health.data')
class HealthService {
    constructor () { }   

    ping = async () => {
        return await healthData.ping();
    }
}