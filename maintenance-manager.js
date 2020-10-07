class MaintenanceManager {
    constructor (DBM) {
        console.log('maintenance-manager::starting manager');
        this.DBM = DBM;
        this.client = null;
    }
    beginMaintenance(client) {
        this.client = client;
        this.runUpdates();
        var dayInMilliseconds = 1000 * 60 * 60 * 24;
        setInterval(async () => {
            this.runUpdates();
        }, dayInMilliseconds);
    }
    runUpdates() {
        this.updateUsers();
        this.updateChannels();
    }
    updateUsers() {
    }
    updateChannels() {
    }
}

module.exports = MaintenanceManager;