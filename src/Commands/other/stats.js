//===========================================/ Import the modeles \===========================================\\
const { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

//==========< OTHERS >==========\\
const { Utility } = require('../../config.js')
const requestsStat = require('../../Structures/Models/requestsStat.js')
const { renderStats } = require('../../Structures/Utility/Functions/renderStats.js');

//===========================================< Code >===========================\\
module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Статистика заявок")
        .setDMPermission(false),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(client, interaction) {
        await interaction.deferReply({ephemeral: true})
        const stats = await requestsStat.findAll({ order: [['createdAt', 'DESC']] })
        let description = ''
        if (!stats.length) {
            await interaction.editReply({
                embeds: [new EmbedBuilder().setTitle(`Статистика заявок | ${interaction.guild.name}`).setDescription('**Тут пока ничего нет :с**').setColor(Utility.colorDiscord).setThumbnail(interaction.guild.iconURL())]
            })
            return;
        } else {
            const standart = stats.filter(w => w.status === 'В ожидании')
            const accept = stats.filter(w => w.status === 'Одобрено')
            const deny = stats.filter(m => m.status === 'Отказано')

            description += `> **Всего: ${standart.length + accept.length + deny.length}**\n`
            if (accept.length) {
                description += `> **Отказано: ${accept.length}**\n`
            }
            if (deny.length) {
                description += `> **Одобрено: ${deny.length}**\n`
            }
        }
        await interaction.editReply(renderStats(stats.slice(0, 10), 1, Math.ceil(stats.length / 10), description, interaction.guild.iconURL(), stats.executor))
    }
}