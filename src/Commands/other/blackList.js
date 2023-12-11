//===========================================/ Import the modeles \===========================================\\
const { Client, ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")

//==========< OTHERS >==========\\

//===========================================< Code >===========================\\
module.exports = {
    data: new SlashCommandBuilder()
        .setName('bl')
        .setDescription("Добавляет участника в бан наборов")
        .setDMPermission(false)
        .addUserOption((user) => user.setName("пользователь").setDescription("Выбери пользователя").setRequired(true))
        .addStringOption((category) => category.setName("категория").setDescription("Выбери категорию").setRequired(true).addChoices(
            { name: 'Все категории', value: 'all' },
            { name: 'Контролы', value: 'control' },
            { name: 'Ассисты', value: 'assist' },
            { name: 'Ивентеры', value: 'event' },
            { name: 'Ведущие мафии', value: 'mafia' },
            { name: 'Ведущие бункера', value: 'bunker' },
            { name: 'Клозеры', value: 'close' },
            { name: 'Креативы', value: 'creative' },
            { name: 'Контентеры', value: 'contenter' }
        ))
        .addIntegerOption((time) => time.setName("время").setDescription("время").setRequired(true).addChoices(
            { name: '7 дней', value: 7 },
            { name: '14 дней', value: 14 },
            { name: '30 дней', value: 30 },
            { name: 'навсегда', value: null },
        ))
        .addStringOption((reason) => reason.setName("причина").setDescription("Причина блокировки").setRequired(true)),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(client, interaction) {
        const optionTarget = interaction.options.getMember("пользователь")
        const optionCategoty = interaction.options.getString("категория")
        const optionTime = interaction.options.get("время")
        const optionReason = interaction.options.getString("причина")

        let time;

        await interaction.deferReply({ ephemeral: true })

        switch (optionTime.value) {
            case 7:
                time = optionTime.value * 86400000
                break;
            case 14:
                time = optionTime.value * 86400000
                break;
            case 30:
                time = optionTime.value * 86400000
                break;
            default:
                time = null
                break;
        }
        
    }
}