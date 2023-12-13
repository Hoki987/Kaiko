//===========================================/ Import the modeles \===========================================\\
const { Client, ModalSubmitInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');

//==========< OTHERS >==========\\
const requestsStat = require('../Structures/Models/requestsStat.js');
const { ChannelID, RoleID } = require('../config.js')

//===========================================< Code >===========================\\
module.exports = {
    data: {
        name: 'modalNabor'
    },

    /**
     * @param {Client} client
     * @param {ModalSubmitInteraction} interaction
     */

    async execute(client, interaction) {
        let channelId;
        let label;
        let content;
        const [, type, executor] = interaction.customId.split('_')
        switch (type) {
            case 'ControlModNab':
                label = ['Имя и возраст', 'Есть ли опыт работы в подобной сфере?', 'Были ли у тебя муты/варны/баны?', 'В какое время тебе удобно работать?', 'Расскажи немного о себе', 'заявки Контролов']
                channelId = ChannelID.Control
                content = `<@&${RoleID.ControlMentor}>`
                break;
            case 'AssistModNab':
                label = ['Имя и возраст', 'Есть ли опыт работы в подобной сфере?', 'Были ли у тебя муты/варны/баны?', 'В какое время тебе удобно работать?', 'Почему именно ты?', 'заявки Ассистентов']
                channelId = ChannelID.Assist
                content = `<@&${RoleID.AssistMentor}>`
                break;
            case 'EventModNab':
                label = ['Имя, возраст, часовой пояс', 'Был ли опыт в проведении ивентов? Где?', 'Какие ивенты готов(а) / хочешь проводить?', 'Почему именно ветка ивентёров?', 'Стоите ли вы в стаффе другого сервера?', 'заявки Ивентеров']
                channelId = ChannelID.Event
                content = `<@&${RoleID.EventMentor}>`
                break;
            case 'MafiaModNab1':
                label = ['Был ли опыт в проведении мафии до заявки?', 'Сколько игр на нашем сервере?', 'Сколько можно взять +30 за круг?', 'Что будет после 3-ех фолов у игрока?', 'Что вы сделаете за клятву во время игры?', 'заявки Мафии']
                channelId = ChannelID.Mafia
                content = `<@&${RoleID.MafiaMentor}>`
                break;
            case 'MafiaModNab2':
                label = ['Имя и возраст', 'Напиши немного о себе', 'Сколько времени можете уделять должности?', 'Сколько игр в бункер вы наиграли?', 'Почему именно ты?', 'заявки Бункера']
                channelId = ChannelID.Bunker
                content = `<@&${RoleID.BunkerMentor}>`
                break;
            case 'CloseModNab':
                label = ['Имя и возраст', 'Какую игру хочешь проводить?', 'Был ли опыт в проведении клозов?', 'Когда тебе удобно проводить клозы?', 'Расскажи немного о себе', 'заявки Клозеров']
                channelId = ChannelID.Close
                content = `<@&${RoleID.CloseMentor}>`
                break;
            case 'CreativeModNab':
                label = ['Имя и возраст', 'Выбери направление', 'Есть ли опыт работы в данных областях?', 'Сколько времени можешь уделять должности?', 'Почему именно ты?', 'заявки Креативов']
                channelId = ChannelID.Creative
                content = `<@&${RoleID.CreativeMentor}>`
                break;
            case 'ContentModNab':
                label = ['Твое имя, возраст, часовой пояс', 'Сколько времени можешь уделять должности?', 'Расскажи о себе, своем прошлом опыте', 'Чем бы ты хотел(а) заниматься?', 'Почему именно ты?', 'заявки Контентеров']
                channelId = ChannelID.Content
                content = `<@&${RoleID.ContentMentor}>`
                break;
        }
        client.channels.cache.get(channelId).send({
            content: content,
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `Соискатель ${interaction.user.username} | ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL() })
                    .setFields(
                        { name: `**${label[0]}**`, value: `\`\`\`${interaction.fields.getTextInputValue('modalNabor_Input1')}\`\`\`` },
                        { name: `**${label[1]} **`, value: `\`\`\`${interaction.fields.getTextInputValue('modalNabor_Input2')}\`\`\`` },
                        { name: `**${label[2]}**`, value: `\`\`\`${interaction.fields.getTextInputValue('modalNabor_Input3')}\`\`\`` },
                        { name: `**${label[3]}**`, value: `\`\`\`${interaction.fields.getTextInputValue('modalNabor_Input4')}\`\`\`` },
                        { name: `**${label[4]}**`, value: `\`\`\`${interaction.fields.getTextInputValue('modalNabor_Input5')}\`\`\`` }
                    )
                    .setFooter({ text: `${interaction.guild.name} | ${label[5]}`, iconURL: interaction.guild.iconURL() })
                    .setImage('https://cdn.discordapp.com/attachments/772218365413818428/1079003352408543302/11112.png')
                    .setTimestamp()
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`naborChoices_accept_${executor}_${type}`)
                        .setEmoji('✔')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(`naborChoices_deny_${executor}_${type}`)
                        .setEmoji('❌')
                        .setStyle(ButtonStyle.Secondary)
                )
            ]
        })
        await interaction.reply({ ephemeral: true, content: 'Заявка была отправлена! Ждите ответа!' })
        await requestsStat.create({executor: interaction.user.id, type: type, status: 'В ожидании'})
    }
}