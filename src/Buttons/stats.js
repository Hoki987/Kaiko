//===========================================/ Import the modeles \===========================================\\
const { Client, ButtonInteraction } = require('discord.js');

//==========< OTHERS >==========\\
const requestsStat = require('..//Structures/Models/requestsStat.js')
const { renderStats } = require('../Structures/Utility/Functions/renderStats.js');

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: 'stats'
    },

    /**
     * @param {Client} client
     * @param {ButtonInteraction} interaction
     */

    async execute(client, interaction) {
        const [, action, executor] = interaction.customId.split('_')
        const pages = interaction.message.embeds[0].footer?.text.split('/')
        const page = Number(pages[0].replace(/\D/g, ''))
        const newPage = action === 'left' ? page - 1 : page + 1;
        const stats = await requestsStat.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10,
            offset: (newPage - 1) * 10
        })
        await interaction.update(renderStats(stats, newPage, Number(pages[1]), interaction.message.embeds[0].description, interaction.guild.iconURL(), executor))
    }
}