//===========================================/ Import the modeles \===========================================\\
const { Client, ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

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
        await interaction.channel.send({
            embeds: '', // Запихнуть запрос в базу, где будет браться эмбед
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`acquaintance_accept_${interaction.user.id}`)
                        .setLabel("Я ознакомлен со всем вышеперечисленным!")
                        .setStyle(ButtonStyle.Secondary)
                )
            ]

        })
    }
};