//===========================================/ Import the modeles \===========================================\\
const { Client, ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

//===========================================< Code >===========================\\

module.exports = {
    data: new SlashCommandBuilder()
        .setName("friends")
        .setDescription("Други сервера")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    
    async execute(client, interaction) {
        const button = new ButtonBuilder()
            .setLabel('ᅠᅠᅠᅠᅠᅠᅠᅠᅠᅠПрисоединиться ᅠᅠᅠᅠᅠᅠᅠᅠᅠ')
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.gg/tenderly")
        await interaction.channel.send({
            embeds: '', // Запихнуть запрос в базу, где будет браться эмбед
            components: [
                new ActionRowBuilder().addComponents(button),
            ]
        })
    }
}