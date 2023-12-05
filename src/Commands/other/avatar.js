//===========================================/ Import the modeles \===========================================\\
const { Client, ContextMenuCommandInteraction, ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require("discord.js");

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
        const userAvatar = interaction.user.username;
        const embed = new EmbedBuilder()
            .setTitle(`Аватар пользователя: ${message.user.username}`)
            .setImage(message.displayAvatarURL({ size: 4096, format: 'png', dynamic: true }))
            .setFooter({ text: `Выполнил(а): ${userAvatar}` })
            .setColor(``) // запихнуть цвет из конфига
        return interaction.reply({
            ephemeral: false,
            embeds: [embed]
        });
    }
};