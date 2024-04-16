//===========================================/ Import the modeles \===========================================\\
const { Client, ButtonInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');

//==========< OTHERS >==========\\
const embedsModel = require('../Structures/Models/embedsModel.js');

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: 'reemNabor'
    },

    /**
     * @param {Client} client
     * @param {ButtonInteraction} interaction
     */

    async execute(client, interaction) {
        const [, type, subType] = interaction.customId.split('_')
        switch (type) {
            case 'edit':
                await interaction.showModal(
                    new ModalBuilder()
                        .setCustomId(`modalReemNabor_${subType}`)
                        .setTitle('Изменение набора')
                        .addComponents(
                            new ActionRowBuilder().addComponents(
                                new TextInputBuilder()
                                    .setCustomId('modalReemNabor_Input1')
                                    .setLabel('embed в JSON формате')
                                    .setPlaceholder('Если не понимаете, что это значит, зайдите на discohook.org > JSON Data Editor')
                                    .setStyle(TextInputStyle.Paragraph)
                            )
                        )
                )
                break;
            case 'get':
                const dictionary = {
                    'ControlReemRec': 'nabor_Control',
                    'EventReemRec': 'nabor_Event',
                    'MafiaReemRec': 'nabor_Mafia',
                    'CloseReemRec': 'nabor_Close',
                    'CreativeReemRec': 'nabor_Creative',
                    'ContentReemRec': 'nabor_Contenter'
                }
                const findEmbed = await embedsModel.findOne({ where: { type: dictionary[subType] } });
                await interaction.reply({
                    ephemeral: true,
                    embeds: [new EmbedBuilder().setTitle('Эмбед').setDescription('```json\n' + `${JSON.stringify(JSON.parse(findEmbed.embed), null, 2)}` + '\n```')]
                })
                break;
        }
    }
}