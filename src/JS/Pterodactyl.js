const Nodeactyl = require('nodeactyl')
class Panel {
    _panel
    _id
    runCommand(command){
        this._panel.sendServerCommand(this._id, command)
    }
    constructor(host, key, id) {
        this._panel = new Nodeactyl.NodeactylClient(host, key)
        this._id = id
    }
}
module.exports = Panel