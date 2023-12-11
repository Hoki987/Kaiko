//===========================================/ Import the modeles \===========================================\\
const { Client, StringSelectMenuInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

//==========< OTHERS >==========\\
const embedsModel = require('../Structures/Models/embedsModel.js');

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: 'naborMenuReem'
    },

    /**
     * @param {Client} client
     * @param {StringSelectMenuInteraction} interaction
     */

    async execute(client, interaction) {
        const [, type] = interaction.customId.split('_')
        const [, subType] = interaction.values[0].split('_')
        let embed;
        if (type === 'stuffReemRec') {
            switch (subType) {
                case 'ControlReemRec':
                    const controlEmbed = await embedsModel.findOne({ where: { type: 'nabor_Control' } })
                    embed = JSON.parse(controlEmbed.embed)
                    break;
                case 'AssistReemRec':
                    const assistEmbed = await embedsModel.findOne({ where: { type: 'nabor_Assist' } })
                    embed = JSON.parse(assistEmbed.embed)
                    break;
                case 'EventReemRec':
                    const eventEmbed = await embedsModel.findOne({ where: { type: 'nabor_Event' } })
                    embed = JSON.parse(eventEmbed.embed)
                    break;
                case 'MafiaReemRec':
                    const mafiaEmbed = await embedsModel.findOne({ where: { type: 'nabor_Mafia' } })
                    embed = JSON.parse(mafiaEmbed.embed)
                    break;
                case 'CloseReemRec':
                    const closeEmbed = await embedsModel.findOne({ where: { type: 'nabor_Close' } })
                    embed = JSON.parse(closeEmbed.embed)
                    break;
                case 'CreativeReemRec':
                    const creativeEmbed = await embedsModel.findOne({ where: { type: 'nabor_Creative' } })
                    embed = JSON.parse(creativeEmbed.embed)
                    break;
                case 'ContentReemRec':
                    const contenterEmbed = await embedsModel.findOne({ where: { type: 'nabor_Contenter' } })
                    embed = JSON.parse(contenterEmbed.embed)
                    break;
            }
        }
        const components = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`reemNabor_edit_${subType}`)
                    .setLabel("Изменить эмбед")
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`reemNabor_get_${subType}`)
                    .setLabel("Получить JSON код эмбеда")
                    .setStyle(ButtonStyle.Secondary)
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