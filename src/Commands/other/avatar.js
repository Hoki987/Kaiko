//===========================================/ Import the modeles \===========================================\\
const { Client, ContextMenuCommandInteraction, ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require("discord.js");
const { Utility } = require('../../config.js')

//===========================================< Code >===========================\\

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Avatar")
        .setType(ApplicationCommandType.User)
        .setDMPermission(false),

    /**
     * 
     * @param {Client} client 
     * @param {ContextMenuCommandInteraction} interaction 
     */

    async execute(client, interaction) {
        const message = interaction.targetMember;
        const embed = new EmbedBuilder()
            .setTitle(`Аватар пользователя | ${message.user.username}`)
            .setImage(message.displayAvatarURL({ size: 4096, format: 'png', dynamic: true }))
            .setColor(Utility.colorDiscord)
        return interaction.reply({
            ephemeral: false,
            embeds: [embed]
        });
    }
};