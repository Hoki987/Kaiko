//===========================================/ Import the modeles \===========================================\\
const { Client, ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

//==========< OTHERS >==========\\
const embedsModel = require('../../Structures/Models/embedsModel.js');
const { Emoji } = require("../../config.js");

//===========================================< Code >===========================\\
module.exports = {
    data: new SlashCommandBuilder()
        .setName("stuff")
        .setDescription("Вызвать меню набора в стафф.")
        .setDMPermission(false),

    /**
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(client, interaction) {
        const embed = await embedsModel.findOne({ where: { type: 'menuNabor_Main' } })
        await interaction.channel.send({
            embeds: JSON.parse(embed.embed),
            components: [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("naborMenu_stuffNabor")
                        .setPlaceholder("Выбери интересующую тебя роль")
                        .addOptions(
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Контрол")
                                .setEmoji(Emoji.NaborControl)
                                .setDescription("Модерация войсов.")
                                .setValue("select_ControlModNab"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Ассистент")
                                .setEmoji(Emoji.NaborAssist)
                                .setDescription("Модерация чатов.")
                                .setValue("select_AssistModNab"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Ивентер")
                                .setEmoji(Emoji.NaborEvent)
                                .setDescription("Организаторы мероприятий.")
                                .setValue("select_EventModNab"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Ведущий")
                                .setEmoji(Emoji.NaborMafia)
                                .setDescription("Организаторы столов по мафии и бункеру.")
                                .setValue("select_MafiaModNab"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Клозер")
                                .setEmoji(Emoji.NaborClose)
                                .setDescription("Организаторы игровых мероприятий.")
                                .setValue("select_CloseModNab"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Креатив")
                                .setEmoji(Emoji.NaborCreative)
                                .setDescription("Организаторы творчества.")
                                .setValue("select_CreativeModNab"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Контентер")
                                .setEmoji(Emoji.NaborContent)
                                .setDescription("Ведение социальных сетей сервера.")
                                .setValue("select_ContentModNab"),
                        )
                )
            ]
        });
    }
};