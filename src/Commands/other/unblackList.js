//===========================================/ Import the modeles \===========================================\\
const { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Op } = require("sequelize");

//==========< OTHERS >==========\\
const blackListNabor = require('../../Structures/Models/blackListNabor.js');

//===========================================< Code >===========================\\
module.exports = {
    data: new SlashCommandBuilder()
        .setName('unbl')
        .setDescription("Возвращает доступ в наборы")
        .setDMPermission(false)
        .addUserOption((user) => user.setName("пользователь").setDescription("Выбери пользователя").setRequired(true)),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(client, interaction) {
        const optionTarget = interaction.options.getMember("пользователь")
        const findActiveBan = await blackListNabor.findOne({ where: { target: optionTarget.user.id, expiresAt: { [Op.or]: [{ [Op.gt]: new Date() }, { [Op.is]: null }] } } })
        findActiveBan ?
            await interaction.reply({
                ephemeral: true,
                content: 'Пользователю был возвращен доступ в заявки.'
            }) && await blackListNabor.update({
                expiresAt: findActiveBan.createdAt
            },
                {
                    where: {
                        id: findActiveBan.id
                    }
                }) && await client.users.cache.get(findActiveBan.target)?.send({
                    embeds: [new EmbedBuilder()
                        .setDescription("\`\`\`Вам вернули доступ в заявки\`\`\`")
                        .setFooter({ text: `Выполнил: ${interaction.user.username} | ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL() })]
                }) : await interaction.reply({ ephemeral: true, content: 'У пользователя нет активного запрета заявок.' })
    }
}