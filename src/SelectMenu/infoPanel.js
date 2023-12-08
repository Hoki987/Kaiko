//===========================================/ Import the modeles \===========================================\\
const { Client, StringSelectMenuInteraction } = require('discord.js');

//==========< OTHERS >==========\\
const embedsModel = require('../Structures/Models/embedsModel.js');

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: 'infoPanelselect'
    },

    /**
     * @param {Client} client
     * @param {StringSelectMenuInteraction} interaction
     */

    async execute(client, interaction) {
        let embed;
        const [, type] = interaction.customId.split('_')
        const [, subType] = interaction.values[0].split('_')

        switch (type) {
            case 'listEventMain':
                switch (subType) {
                    case 'EventList':
                        const embedEvent = await embedsModel.findOne({ where: { type: 'infoPanelselect_EventList' } })
                        embed = JSON.parse(embedEvent.embed)
                        break;
                    case 'MafiaList':
                        const embedMafia = await embedsModel.findOne({ where: { type: 'infoPanelselect_MafiaList' } })
                        embed = JSON.parse(embedMafia.embed)
                        break;
                    case 'CloseList':
                        const embedClose = await embedsModel.findOne({ where: { type: 'infoPanelselect_CloseList' } })
                        embed = JSON.parse(embedClose.embed)
                        break;
                }
                break;
            case 'EventHelpMain':
                switch (subType) {
                    case 'EventHelp':
                        const embedEvent = await embedsModel.findOne({ where: { type: 'infoPanelselect_EventHelp' } })
                        embed = JSON.parse(embedEvent.embed)
                        break;
                    case 'MafiaHelp':
                        const embedMafia = await embedsModel.findOne({ where: { type: 'infoPanelselect_MafiaHelp' } })
                        embed = JSON.parse(embedMafia.embed)
                        break;
                    case 'CloseHelp':
                        const embedClose = await embedsModel.findOne({ where: { type: 'infoPanelselect_CloseHelp' } })
                        embed = JSON.parse(embedClose.embed)
                        break;
                }
                break;
        }
        await interaction.reply({ ephemeral: true, embeds: embed })
    }
}