//===========================================/ Import the modeles \===========================================\\
const { Client, ActivityType } = require("discord.js");
const { ChannelID } = require('../../config.js')

//===========================================< Code >===========================\\
module.exports = {
    name: "ready",
    once: true,

    /**
     * @param {Client} client 
     */

    async execute(client) {
        client.user.setPresence({ activities: [{ name: `на ${client.guilds.cache.get(ChannelID.META).memberCount} метажителей`, type: ActivityType.Watching }], status: "online" });
    },
};