//===========================================/ Import the modeles \===========================================\\
const { Client, ButtonInteraction } = require('discord.js');

//==========< OTHERS >==========\\
const { RoleID } = require('../config.js')

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: 'acquaintance'
    },

    /**
     * @param {Client} client
     * @param {ButtonInteraction} interaction
     */

    async execute(client, interaction) {
        const hasRoleAC = (id) => interaction.member.roles.cache.has(id);
        const contentAC = (id) => hasRoleAC(id) ? "Роль успешно забрана" : "Роль успешно выдана"
        interaction.member.roles[hasRoleAC(RoleID.acquaintance) ? "remove" : "add"](RoleID.acquaintance)
        interaction.reply({ ephemeral: true, content: contentAC(RoleID.acquaintance) });
    }
}