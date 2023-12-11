//===========================================/ Import the modeles \===========================================\\
const { Client, ButtonInteraction, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require('discord.js');

//==========< OTHERS >==========\\
const embedsModel = require('../Structures/Models/embedsModel.js')
const { ChannelID, RoleID } = require('../config.js')

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: 'sendNabor'
    },

    /**
     * @param {Client} client
     * @param {ButtonInteraction} interaction
     */

    async execute(client, interaction) {
        const [, subType] = interaction.customId.split('_')
        let embed;
        console.log(interaction.customId.split('_'));
        switch (subType) {
            case 'ControlModRec':
                const controlEmbed = await embedsModel.findOne({ where: { type: 'nabor_Control' } })
                embed = JSON.parse(controlEmbed.embed)
                break;
            case 'AssistModRec':
                const assistEmbed = await embedsModel.findOne({ where: { type: 'nabor_Assist' } })
                embed = JSON.parse(assistEmbed.embed)
                break;
            case 'EventModRec':
                const eventEmbed = await embedsModel.findOne({ where: { type: 'nabor_Event' } })
                embed = JSON.parse(eventEmbed.embed)
                break;
            case 'MafiaModRec':
                const mafiaEmbed = await embedsModel.findOne({ where: { type: 'nabor_Mafia' } })
                embed = JSON.parse(mafiaEmbed.embed)
                break;
            case 'CloseModRec':
                const closeEmbed = await embedsModel.findOne({ where: { type: 'nabor_Close' } })
                embed = JSON.parse(closeEmbed.embed)
                break;
            case 'CreativeModRec':
                const creativeEmbed = await embedsModel.findOne({ where: { type: 'nabor_Creative' } })
                embed = JSON.parse(creativeEmbed.embed)
                break;
            case 'ContentModRec':
                const contenterEmbed = await embedsModel.findOne({ where: { type: 'nabor_Contenter' } })
                embed = JSON.parse(contenterEmbed.embed)
                break;
        }

        if ('embeds' in embed) {
            client.channels.cache.get(ChannelID.Nabor).send({
                content: `<@&${RoleID.AnNabor}>`,
                ...embed,
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`nabor_${subType}`)
                                .setLabel("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤПодать заявкуㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ")
                                .setStyle(ButtonStyle.Secondary),
                        )
                ]
            })
        } else {
            client.channels.cache.get(ChannelID.Nabor).send({
                content: `<@&${RoleID.AnNabor}>`,
                embeds: embed,
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`nabor_${subType}`)
                                .setLabel("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤПодать заявкуㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ")
                                .setStyle(ButtonStyle.Secondary),
                        )
                ]
            })
        }
        await interaction.reply({ ephemeral: true, content: "Набор успешно отправлен!" })
    }
}