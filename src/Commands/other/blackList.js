//===========================================/ Import the modeles \===========================================\\
const { Client, ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");


//==========< OTHERS >==========\\
const blackListNabor = require('../../Structures/Models/blackListNabor.js');
const { Op } = require("sequelize");

//===========================================< Code >===========================\\
const choices = [
    { name: 'Все категории', value: 'all' },
    { name: 'Контролы', value: 'ControlModNab' },
    { name: 'Ассисты', value: 'AssistModNab' },
    { name: 'Ивентеры', value: 'EventModNab' },
    { name: 'Ведущие', value: 'MafiaModNab' },
    { name: 'Клозеры', value: 'CloseModNab' },
    { name: 'Креативы', value: 'CreativeModNab' },
    { name: 'Контентеры', value: 'ContentModNab' }]
module.exports = {
    data: new SlashCommandBuilder()
        .setName('bl')
        .setDescription("Добавляет участника в бан наборов")
        .setDMPermission(false)
        .addUserOption((user) => user.setName("пользователь").setDescription("Выбери пользователя").setRequired(true))
        .addStringOption((category) => category.setName("категория").setDescription("Выбери категорию").setRequired(true).addChoices(...choices))
        .addIntegerOption((time) => time.setName("время").setDescription("время").setRequired(true).addChoices(
            { name: '7 дней', value: 7 },
            { name: '14 дней', value: 14 },
            { name: '30 дней', value: 30 },
            { name: 'навсегда', value: 0 },
        ))
        .addStringOption((reason) => reason.setName("причина").setDescription("Причина блокировки").setRequired(true)),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(client, interaction) {
        const optionTarget = interaction.options.getMember("пользователь")
        const optionCategory = interaction.options.getString("категория")
        const optionTime = interaction.options.get("время")
        const optionReason = interaction.options.getString("причина")

        const time = optionTime.value * 86400000

        const category = optionCategory !== 'all' ? optionCategory : null
        const findActiveBan = await blackListNabor.count({ where: { target: optionTarget.user.id, category: category, expiresAt: { [Op.or]: [{ [Op.gt]: new Date() }, { [Op.is]: null }] } } })

        await interaction.deferReply({ ephemeral: true })
        switch (true) {
            case interaction.user.id === optionTarget.user.id:
            case optionTarget.user.bot:
            case findActiveBan > 0:
                await interaction.editReply({ content: "Вы не можете выполнить это действие" })
                break;
            default:
                await interaction.editReply({ content: `Пользователь <@${optionTarget.user.id}> был добавлен в бан лист \`${choices.find(c => c.value === optionCategory).name}\`` })
                await blackListNabor.create({
                    executor: interaction.user.id,
                    target: optionTarget.user.id,
                    category: category,
                    reason: optionReason,
                    expiresAt: time ? Date.now() + time : null
                })
                break;
        }
    }
}