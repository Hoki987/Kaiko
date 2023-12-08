//===========================================/ Import the modeles \===========================================\\
const { Client, ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

//==========< OTHERS >==========\\
const embedsModel = require("../../Structures/Models/embedsModel.js");
const { Emoji, Url } = require("../../config.js");

//===========================================< Code >===========================\\

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Выводит меню с информацией категории")
        .setDMPermission(false)
        .addSubcommandGroup((panel) => panel
            .setName("panel")
            .setDescription("Общие панели инфомарции категорий")
            .addSubcommand((creative) => creative
                .setName("creative")
                .setDescription("Панель категории Творчества"))
            .addSubcommand((event) => event
                .setName("event")
                .setDescription("Панель категории Ивентов"))
            .addSubcommand((clan) => clan
                .setName("clan")
                .setDescription("Панель категории Кланов"))
        )
        .addSubcommandGroup((utility) => utility
            .setName("utility")
            .setDescription("Всё то, что находится внутри веток")
            .addSubcommand((eventRULES) => eventRULES
                .setName("erules")
                .setDescription("Выводит информацию с правилами Ивентов"))
            .addSubcommand((eventHELP) => eventHELP
                .setName("ehelp")
                .setDescription("Выводит информацию с полезностями Ивентов"))
        ),

    /**
    * 
    * @param {Client} client
    * @param {ChatInputCommandInteraction} interaction 
    */

    async execute(client, interaction) {
        const panelGroup = interaction.options.getSubcommandGroup();
        const subCmd = interaction.options.getSubcommand();

        switch (panelGroup) {
            case "panel":
                switch (subCmd) {
                    case "creative":
                        const creativePanel = await embedsModel.findOne({ where: { type: 'infoPanel_CreativePanel' } })
                        interaction.channel.send({
                            embeds: JSON.parse(creativePanel.embed),
                            components: [
                                new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setEmoji(Emoji.PanelRules)
                                            .setStyle(ButtonStyle.Link)
                                            .setURL(Url.CreativeRules),
                                        new ButtonBuilder()
                                            .setEmoji(Emoji.PanelUtility)
                                            .setStyle(ButtonStyle.Link)
                                            .setURL(Url.CreativeHelp)
                                    )

                            ]
                        });
                        break;
                    case "event":
                        const eventPanel = await embedsModel.findOne({ where: { type: 'infoPanel_EventPanel' } })
                        interaction.channel.send({
                            embeds: JSON.parse(eventPanel.embed),
                            components: [
                                new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setEmoji(Emoji.PanelRules)
                                            .setStyle(ButtonStyle.Link)
                                            .setURL(Url.EventRules),
                                        new ButtonBuilder()
                                            .setEmoji(Emoji.PanelUtility)
                                            .setStyle(ButtonStyle.Link)
                                            .setURL(Url.EventHelp)
                                    )

                            ]
                        })
                        break;
                    case "clan":
                        const clanPanel = await embedsModel.findOne({ where: { type: 'infoPanel_ClanPanel' } })
                        interaction.channel.send({
                            embeds: JSON.parse(clanPanel.embed),
                            components: [
                                new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setEmoji(Emoji.PanelRules)
                                            .setStyle(ButtonStyle.Link)
                                            .setURL(Url.ClanRules),
                                        new ButtonBuilder()
                                            .setEmoji(Emoji.PanelUtility)
                                            .setStyle(ButtonStyle.Link)
                                            .setURL(Url.ClanHelp)
                                    )

                            ]
                        })
                        break;
                }
                break;
            case "utility":
                switch (subCmd) {
                    case "erules":
                        const eventRulesPanel = await embedsModel.findOne({ where: { type: 'infoPanel_EventRulesPanel' } })
                        interaction.channel.send({
                            embeds: JSON.parse(eventRulesPanel.embed),
                            components: [
                                new ActionRowBuilder().addComponents(
                                    new StringSelectMenuBuilder()
                                        .setCustomId("infoPanelselect_listEventMain")
                                        .setPlaceholder("Выбери интересующую тебя роль")
                                        .addOptions(
                                            new StringSelectMenuOptionBuilder()
                                                .setLabel("Ивентеры")
                                                .setEmoji(Emoji.NaborEvent)
                                                .setDescription("Список правил ивентов, связанных с веткой")
                                                .setValue("infoPanelselect_EventList"),
                                            new StringSelectMenuOptionBuilder()
                                                .setLabel("Ведущие")
                                                .setEmoji(Emoji.NaborMafia)
                                                .setDescription("Список правил ивентов, связанных с веткой")
                                                .setValue("infoPanelselect_MafiaList"),
                                            new StringSelectMenuOptionBuilder()
                                                .setLabel("Клозеры")
                                                .setEmoji(Emoji.NaborClose)
                                                .setDescription("Список правил ивентов, связанных с веткой")
                                                .setValue("infoPanelselect_CloseList")
                                        )
                                )
                            ]
                        })
                        break;
                    case "ehelp":
                        const eventHelpPanel = await embedsModel.findOne({ where: { type: 'infoPanel_EventHelpPanel' } })
                        interaction.channel.send({
                            embeds: JSON.parse(eventHelpPanel.embed),
                            components: [
                                new ActionRowBuilder().addComponents(
                                    new StringSelectMenuBuilder()
                                        .setCustomId("infoPanelselect_EventHelpMain")
                                        .setPlaceholder("Выбери интересующую тебя роль")
                                        .addOptions(
                                            new StringSelectMenuOptionBuilder()
                                                .setLabel("Ивентеры")
                                                .setEmoji(Emoji.NaborEvent)
                                                .setDescription("Полезная информация, связанная с веткой")
                                                .setValue("infoPanelselect_EventHelp"),
                                            new StringSelectMenuOptionBuilder()
                                                .setLabel("Ведущие")
                                                .setEmoji(Emoji.NaborMafia)
                                                .setDescription("Полезная информация, связанная с веткой")
                                                .setValue("infoPanelselect_MafiaHelp"),
                                            new StringSelectMenuOptionBuilder()
                                                .setLabel("Клозеры")
                                                .setEmoji(Emoji.NaborClose)
                                                .setDescription("Полезная информация, связанная с веткой")
                                                .setValue("infoPanelselect_CloseHelp")
                                        )
                                )
                            ]
                        })
                        break;
                }
                break;
        }
    }
}