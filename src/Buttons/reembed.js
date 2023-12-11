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
        let embed;
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
                let embedType;
                switch (subType) {
                    case 'ControlReemRec':
                        embedType = 'nabor_Control'
                        break;
                    case 'AssistReemRec':
                        embedType = 'nabor_Assist'
                        break;
                    case 'EventReemRec':
                        embedType = 'nabor_Event'
                        break;
                    case 'MafiaReemRec':
                        embedType = 'nabor_Mafia'
                        break;
                    case 'CloseReemRec':
                        embedType = 'nabor_Close'
                        break;
                    case 'CreativeReemRec':
                        embedType = 'nabor_Creative'
                        break;
                    case 'ContentReemRec':
                        embedType = 'nabor_Contenter'
                        break;
                }
                const findEmbed = await embedsModel.findOne({ where: { type: embedType } })
                await interaction.reply({
                    ephemeral: true,
                    embeds: [new EmbedBuilder().setTitle('Эмбед').setDescription('```json\n' + `${JSON.stringify(JSON.parse(findEmbed.embed), null, 2)}` + '\n```')]
                })
        break;
    }
}
}