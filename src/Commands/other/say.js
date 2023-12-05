//===========================================/ Import the modeles \===========================================\\
const { Client, ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");

//===========================================< Code >===========================\\

module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("embed")
        .setDMPermission(false)
        .addStringOption((string) => string.setName("embed").setDescription("Сюда свой эмбед").setRequired(true)),

    /**
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(client, interaction) {
        const embed = interaction.options.getString('embed')
        try {
            if ("embeds" in JSON.parse(embed)) {
                await interaction.channel.send(
                    JSON.parse(embed))
            } else {
                await interaction.channel.send({
                    embeds: [
                        JSON.parse(embed)
                    ]
                })
            }
        } catch (err) {
            return interaction.channel.send(embed);
        }
    }
}