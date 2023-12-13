//===========================================/ Import the modeles \===========================================\\
const { Client, ButtonInteraction } = require('discord.js');

//==========< OTHERS >==========\\
const { Utility } = require('../config.js')

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: 'rolesInfoChoices'
    },

    /**
     * @param {Client} client
     * @param {ButtonInteraction} interaction
     */

    async execute(client, interaction) {
        const [, type] = interaction.customId.split('_')
        let color;
        let content = [];
        switch (type) {
            case 'accept':
                color = Utility.colorGreen
                content.push(`<@${interaction.user.id}> \`одобрил(а)\` заявку!`)
                break;
            case 'deny':
                color = Utility.colorRed
                content.push(`<@${interaction.user.id}> \`отклонил(а)\` заявку!`)
                break;
        }
        await interaction.update({
            content: content[0],
            embeds: [{ ...interaction.message.embeds[0].data, color: color }],
            components: [{ components: [{ ...interaction.message.components[0].components[0].data, disabled: true }, { ...interaction.message.components[0].components[1].data, disabled: true }] }]
        })
    }
}