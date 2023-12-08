//===========================================/ Import the modeles \===========================================\\
const { Client, ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const embedsModel = require("../../Structures/Models/embedsModel.js");

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
        const embed = await embedsModel.findOne({ where: { type: 'friendsInfo' } })
        const button = new ButtonBuilder()
            .setLabel('ᅠᅠᅠᅠᅠᅠᅠᅠᅠᅠПрисоединиться ᅠᅠᅠᅠᅠᅠᅠᅠᅠ')
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.gg/tenderly")
        try {
            if ('embeds' in JSON.parse(embed.embed)) {
                await interaction.channel.send(JSON.parse(embed.embed), {
                    components: [new ActionRowBuilder().addComponents(button)]
                })
            } else {
                await interaction.channel.send({
                    embeds: JSON.parse(embed.embed),
                    components: [new ActionRowBuilder().addComponents(button)]

                })
            }
        } catch (error) {
            return await interaction.reply({
                ephemeral: true,
                content: 'Эмбед сформирован неверно!'
            })
        }
    }
}