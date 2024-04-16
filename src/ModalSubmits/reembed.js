//===========================================/ Import the modeles \===========================================\\
const { Client, ModalSubmitInteraction, EmbedBuilder } = require('discord.js');

//==========< OTHERS >==========\\
const embedsModel = require('../Structures/Models/embedsModel.js');

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: 'modalReemNabor'
    },

    /**
     * @param {Client} client
     * @param {ModalSubmitInteraction} interaction
     */

    async execute(client, interaction) {
        try {
            const [, subType] = interaction.customId.split('_')
            let embedType;
            switch (subType) {
                case 'ControlReemRec':
                    embedType = 'nabor_Control'
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
            await embedsModel.update({ executor: interaction.user.id, embed: JSON.stringify(JSON.parse(interaction.fields.getTextInputValue('modalReemNabor_Input1'))) }, { where: { type: embedType } })
            await interaction.reply({ ephemeral: true, content: 'Эмбед набора успешно изменен.' })
        } catch (error) {
            await interaction.reply({ ephemeral: true, embeds: [new EmbedBuilder().setTitle('Произошла ошибка').setDescription(`\`\`\`${error}\`\`\``)] })
        }
    }
}