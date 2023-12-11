//===========================================/ Import the modeles \===========================================\\
const { Client, ButtonInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: 'nabor'
    },

    /**
     * @param {Client} client
     * @param {ButtonInteraction} interaction
     */

    async execute(client, interaction) {
        const [, type] = interaction.customId.split('_')
        let title;
        let label;
        let placeholder;
        switch (type) {
            case 'ControlModNab':
                title = 'Заявка на Контрола'
                label = ['Имя и возраст', 'Есть ли опыт работы в подобной сфере?', 'Были ли у тебя муты/варны/баны?', 'В какое время тебе удобно работать?', 'Расскажи немного о себе']
                placeholder = ['Дима, 19 лет', 'Если есть, опиши какой и где', 'Если были, то за что?', 'Указывай по московскому времени', 'Выдил свои основные качестка, а так же скажи почему мы должны выбрать именно тебя']
                break;
            case 'AssistModNab':
                title = 'Заявка на Ассистента'
                label = ['Имя и возраст', 'Есть ли опыт работы в подобной сфере?', 'Были ли у тебя муты/варны/баны?', 'В какое время тебе удобно работать?', 'Почему именно ты?']
                placeholder = ['Дима, 16 лет', 'Да, работал на таких проектах, как... / Нет, не был', 'Да, причины наказаний / Нет, не получал', 'Указывай по московскому времени', 'Расскажи о себе']
                break;
            case 'EventModNab':
                title = 'Заявка на Ивентера'
                label = ['Имя, возраст, часовой пояс', 'Был ли опыт в проведении ивентов? Где?', 'Какие ивенты готов(а) / хочешь проводить?', 'Почему именно ветка ивентёров?', 'Стоите ли вы в стаффе другого сервера?']
                placeholder = ['Кира, 21 год, +1 МСК', 'Вела 2 года свою игру на локальном сервере', 'Могу проводить монополию, пазлы. Хочу научиться данеткам', 'Часто сижу на ивентах', 'Да. Сейчас ассистент на МЕТА']
                break;
            case 'MafiaModNab1':
                title = 'Заявка на Ведущего мафии'
                label = ['Был ли опыт в проведении мафии до заявки?', 'Сколько игр на нашем сервере?', 'Сколько можно взять +30 за круг?', 'Что будет после 3-ех фолов у игрока?', 'Что вы сделаете за клятву во время игры?']
                placeholder = ['Да, был... / Нет, не было', 'Например: 4', 'Например: пять раз', ' ', ' ']
                break;
            case 'MafiaModNab2':
                title = 'Заявка на Ведущего бункера'
                label = ['Имя и возраст', 'Напиши немного о себе', 'Сколько времени можете уделять должности?', 'Сколько игр в бункер вы наиграли?', 'Почему именно ты?']
                placeholder = ['Назар, 28 лет', ' ', 'Например: 4 часа в день', 'Например: 400 игр', ' ']
                break;
            case 'CloseModNab':
                title = 'Заявка на Клозера'
                label = ['Имя и возраст', 'Какую игру хочешь проводить?', 'Был ли опыт в проведении клозов?', 'Когда тебе удобно проводить клозы?', 'Расскажи немного о себе']
                placeholder = ['Например: Игорь, 20 лет', 'Например: Dota 2 | LoL | CS2 | VALORANT', 'Например: Да, был... / Нет, не было', 'Указывайте по московскому времени', 'Например: Я крутой, играю на рекрутах в доту два']
                break;
            case 'CreativeModNab':
                title = 'Заявка на Креатива'
                label = ['Имя и возраст', 'Выбери направление', 'Есть ли опыт работы в данных областях?', 'Сколько времени можешь уделять должности?', 'Почему именно ты?']
                placeholder = ['Например: Алиса, 20 лет', 'Музыканты | Даббберы | Чтецы', 'Если да, то расскажи какой', 'Например: 5 часов в неделю', 'Что выделяет тебя среди других?']
                break;
            case 'ContentModNab':
                title = 'Заявка на Контентера'
                label = ['Твое имя, возраст, часовой пояс', 'Сколько времени можешь уделять должности?', 'Расскажи о себе, своем прошлом опыте', 'Чем бы ты хотел(а) заниматься?', 'Почему именно ты?']
                placeholder = ['Например: Максим, 32 года, +1 мск', 'Например: 4 часа в неделю', 'Например: Был(а) контролом на мете, я очень кружелюбный(ая)', 'Монтаж видео | TickTok | YouTube Shorts | Pinterest', 'Выдели свои основные качества']
                break;
        }
        await interaction.showModal(
            new ModalBuilder()
                .setCustomId(`modalNabor_${type}_${interaction.user.id}`)
                .setTitle(title)
                .addComponents(
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('modalNabor_Input1')
                            .setLabel(label[0])
                            .setPlaceholder(placeholder[0])
                            .setMaxLength(100)
                            .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('modalNabor_Input2')
                            .setLabel(label[1])
                            .setPlaceholder(placeholder[1])
                            .setMaxLength(950)
                            .setStyle(TextInputStyle.Paragraph)
                    ),
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('modalNabor_Input3')
                            .setLabel(label[2])
                            .setPlaceholder(placeholder[2])
                            .setMaxLength(950)
                            .setStyle(TextInputStyle.Paragraph)
                    ),
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('modalNabor_Input4')
                            .setLabel(label[3])
                            .setPlaceholder(placeholder[3])
                            .setMaxLength(950)
                            .setStyle(TextInputStyle.Paragraph)
                    ),
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('modalNabor_Input5')
                            .setLabel(label[4])
                            .setPlaceholder(placeholder[4])
                            .setMaxLength(950)
                            .setStyle(TextInputStyle.Paragraph)
                    )
                )
        )
    }
}