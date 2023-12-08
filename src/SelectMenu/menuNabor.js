//===========================================/ Import the modeles \===========================================\\
const { Client, StringSelectMenuInteraction, ButtonBuilder, ButtonStyle } = require('discord.js');

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

        await embedsModel.create({
            executor: interaction.user.id,
            embed: '',
            type: 'nabor_Control'
        })
        await embedsModel.create({
            executor: interaction.user.id,
            embed: '',
            type: 'nabor_Assist'
        })
        await embedsModel.create({
            executor: interaction.user.id,
            embed: '',
            type: 'nabor_Event'
        })
        await embedsModel.create({
            executor: interaction.user.id,
            embed: '',
            type: 'nabor_Mafia'
        })
        await embedsModel.create({
            executor: interaction.user.id,
            embed: '',
            type: 'nabor_Close'
        })
        await embedsModel.create({
            executor: interaction.user.id,
            embed: '',
            type: 'nabor_Creative'
        })
        await embedsModel.create({
            executor: interaction.user.id,
            embed: '',
            type: 'nabor_Contenter'
        })

        if (type === 'stuffNaborMain') {
            switch (subType) {
                case 'ControlModNab':
                    const controlEmbed = await embedsModel.findOne({ where: { type: 'nabor_Control' } })
                    embed = JSON.parse(controlEmbed.embed)
                    break;
                case 'AssistModNab':
                    const assistEmbed = await embedsModel.findOne({ where: { type: 'nabor_Assist' } })
                    embed = JSON.parse(assistEmbed.embed)
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
        console.log(subType);
        await interaction.reply({
            ephemeral: true,
            embeds: embed,
            components: [
                new ButtonBuilder()
                    .setCustomId(`nabor_${subType}`)
                    .setLabel("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤПодать заявкуㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ")
                    .setStyle(ButtonStyle.Secondary)]
        })
    }
}