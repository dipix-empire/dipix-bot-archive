import Mongoose from "mongoose"

export default new Mongoose.Schema({
    discord_id: String,
    nickname: String,
    allowed: Boolean
}, {
    collection: 'players'
})