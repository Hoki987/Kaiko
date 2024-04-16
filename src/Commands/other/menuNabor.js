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
                        .setCustomId("naborMenuselect_stuffNaborMain")
                        .setPlaceholder("Выбери интересующую тебя роль")
                        .addOptions(
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Модератор")
                                .setEmoji(Emoji.NaborControl)
                                .setDescription("Контроль порядка на сервере.")
                                .setValue("naborMenuselect_ControlModNab"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Ивентер")
                                .setEmoji(Emoji.NaborEvent)
                                .setDescription("Организаторы мероприятий.")
                                .setValue("naborMenuselect_EventModNab"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Ведущий")
                                .setEmoji(Emoji.NaborMafia)
                                .setDescription("Организаторы столов по мафии и бункеру.")
                                .setValue("naborMenuselect_MafiaModNab"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Клозер")
                                .setEmoji(Emoji.NaborClose)
                                .setDescription("Организаторы игровых мероприятий.")
                                .setValue("naborMenuselect_CloseModNab"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Креатив")
                                .setEmoji(Emoji.NaborCreative)
                                .setDescription("Организаторы творчества.")
                                .setValue("naborMenuselect_CreativeModNab"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Контентер")
                                .setEmoji(Emoji.NaborContent)
                                .setDescription("Ведение социальных сетей сервера.")
                                .setValue("naborMenuselect_ContentModNab"),
                        )
                )
            ]
        });
    }
};