//===========================================/ Import the modeles \===========================================\\
const { Client, StringSelectMenuInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

//==========< OTHERS >==========\\
const embedsModel = require('../Structures/Models/embedsModel.js');

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: 'naborMenu'
    },

    /**
     * @param {Client} client
     * @param {StringSelectMenuInteraction} interaction
     */

    async execute(client, interaction) {
        let embed;
        const [, type] = interaction.customId.split('_')
        const [, subType] = interaction.values[0].split('_')
        if (type === 'stuffRecruiting') {
            switch (subType) {
                case 'ControlModNab':
                    const controlEmbed = await embedsModel.findOne({ where: { type: 'nabor_Control' } })
                    embed = JSON.parse(controlEmbed.embed)
                    break;
                case 'EventModNab':
                    const eventEmbed = await embedsModel.findOne({ where: { type: 'nabor_Event' } })
                    embed = JSON.parse(eventEmbed.embed)
                    break;
                case 'MafiaModNab':
                    const mafiaEmbed = await embedsModel.findOne({ where: { type: 'nabor_Mafia' } })
                    embed = JSON.parse(mafiaEmbed.embed)
                    break;
                case 'CloseModNab':
                    const closeEmbed = await embedsModel.findOne({ where: { type: 'nabor_Close' } })
                    embed = JSON.parse(closeEmbed.embed)
                    break;
                case 'CreativeModNab':
                    const creativeEmbed = await embedsModel.findOne({ where: { type: 'nabor_Creative' } })
                    embed = JSON.parse(creativeEmbed.embed)
                    break;
                case 'ContentModNab':
                    const contenterEmbed = await embedsModel.findOne({ where: { type: 'nabor_Contenter' } })
                    embed = JSON.parse(contenterEmbed.embed)
                    break;
            }
        }
        const components = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`sendNabor_${subType}`)
                    .setLabel("Запостить набор")
                    .setStyle(ButtonStyle.Success),
            )

        try {
            if ("embeds" in embed) {
                await interaction.reply({ ephemeral: true, ...embed, components: [components] })
            } else {
                await interaction.reply({ ephemeral: true, embeds: [embed], components: [components] })
            }
        } catch (error) {
            await interaction.reply({ ephemeral: true, embeds: embed, components: [components] })
        }
    }
}