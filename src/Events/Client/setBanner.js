//===========================================/ Import the modeles \===========================================\\
const { Client, ChannelType } = require("discord.js");

//==========< OTHERS >==========\\
const color = require("colors");
const { ChannelID } = require('../../config.js')
const { build } = require("../../MEDIA/artifacts/meta_banner");

//===========================================< Code >===========================\\
module.exports = {
    name: "ready",
    once: true,

    /**
     * @param {Client} client 
     */

    async execute(client) {
        try {
            async function banner() {
                const getUsersChannel = client.guilds.cache.get(ChannelID.META).channels.cache.filter(c => c.type === ChannelType.GuildVoice || c.type === ChannelType.GuildStageVoice).reduce((a, b) => a + b.members.size, 0)
                const buf = await build(getUsersChannel);
                await client.guilds.cache.get(ChannelID.META).setBanner(buf)
            }
            setInterval(banner, 60000);
        } catch (error) {
            console.log(`${color.bold.red(`[CLIENT > SETBANNER : ERROR]`)}` + `${error}.`.bgRed);
        }
    },
};