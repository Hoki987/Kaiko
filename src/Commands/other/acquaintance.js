//===========================================/ Import the modeles \===========================================\\
const { Client, ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const embedsModel = require('../../Structures/Models/embedsModel.js');

//===========================================< Code >===========================\\

module.exports = {
    data: new SlashCommandBuilder()
        .setName("acquaintance")
        .setDescription("Пользовательское соглашение знакомств.")
        .setDMPermission(false),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(client, interaction) {
        const embed = await embedsModel.findOne({ where: { type: 'acquaintance' } })
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`acquaintance_accept`)
                .setLabel("Я ознакомлен со всем вышеперечисленным!")
                .setStyle(ButtonStyle.Secondary)
        )
        try {
            if ('embeds' in JSON.parse(embed.embed)) {
                await interaction.channel.send(JSON.parse(embed.embed), {
                    components: [button]
                })
            } else {
                await interaction.channel.send({
                    embeds: JSON.parse(embed.embed),
                    components: [button]

                })
            }
        } catch (error) {
            return await interaction.reply({
                ephemeral: true,
                content: 'Эмбед сформирован неверно!'
            })
        }
    }
};