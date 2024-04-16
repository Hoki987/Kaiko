//===========================================/ Import the modeles \===========================================\\
const { Client, ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

//==========< OTHERS >==========\\
const embedsModel = require('../../Structures/Models/embedsModel.js');
const { Emoji, RoleID, ChannelID } = require("../../config.js");

//===========================================< Code >===========================\\

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rolesinfo")
        .setDescription("Информация ролей приветствия")
        .setDMPermission(false),

    /**
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(client, interaction) {
        const gameEmbed = await embedsModel.findOne({ where: { type: 'rolesInfo_GameRoles' } })
        const announcementEmbed = await embedsModel.findOne({ where: { type: 'rolesInfo_AnnouncementRoles' } })
        const customEmbed = await embedsModel.findOne({ where: { type: 'rolesInfo_CustomRoles' } })
        await interaction.channel.send({
            embeds: JSON.parse(gameEmbed.embed),
            components: [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("rolesinfoMenu_GameRoles")
                        .setPlaceholder("Выберите нужное")
                        .addOptions(
                            new StringSelectMenuOptionBuilder()
                                .setLabel("minecraft")
                                .setEmoji(Emoji.Minecraft)
                                .setValue(`select_AnMinecraft_${RoleID.Minecraft}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("dota 2")
                                .setEmoji(Emoji.Dota)
                                .setValue(`select_AnDota_${RoleID.Dota}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("league of legends")
                                .setEmoji(Emoji.LOL)
                                .setValue(`select_AnLol_${RoleID.Lol}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("cs2")
                                .setEmoji(Emoji.CSGO)
                                .setValue(`select_AnCs_${RoleID.Cs}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("valorant")
                                .setEmoji(Emoji.Valorant)
                                .setValue(`select_AnValorant_${RoleID.Valorant}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Очистить выбор")
                                .setEmoji(Emoji.Trash)
                                .setValue("select_Clear")
                        )
                )
            ]
        })
        await interaction.channel.send({
            embeds: JSON.parse(announcementEmbed.embed),
            components: [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("rolesinfoMenu_AnnouncementRoles")
                        .setPlaceholder("Выберите нужное")
                        .addOptions(
                            new StringSelectMenuOptionBuilder()
                                .setLabel("анонсы наборов в стафф")
                                .setEmoji(Emoji.NaborStuff)
                                .setValue(`select_AnNabor_${RoleID.AnNabor}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("анонсы кинотеатра")
                                .setEmoji(Emoji.Kino)
                                .setValue(`select_AnKino_${RoleID.AnKino}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("анонсы творчества")
                                .setEmoji(Emoji.CreativeAn)
                                .setValue(`select_AnCreative_${RoleID.AnCreative}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("анонсы браузерных игр")
                                .setEmoji(Emoji.Browser)
                                .setValue(`select_AnBrowser_${RoleID.AnBrowser}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("анонсы настольных игр")
                                .setEmoji(Emoji.Dice)
                                .setValue(`select_AnNastolki_${RoleID.AnNastolki}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("анонсы клозов")
                                .setEmoji(Emoji.CloseAn)
                                .setValue(`select_AnClose_${RoleID.AnClose}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("анонсы мафии")
                                .setEmoji(Emoji.MafiaAn)
                                .setValue(`select_AnMafia_${RoleID.AnMafia}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("анонсы бункера")
                                .setEmoji(Emoji.BunkerAn)
                                .setValue(`select_AnBunker_${RoleID.AnBunker}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Очистить выбор")
                                .setEmoji(Emoji.Trash)
                                .setValue("select_Clear")
                        ),
                )
            ]
        })
        await interaction.channel.send({
            embeds: JSON.parse(customEmbed.embed),
            components: [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("rolesinfoMenu_CustomRoles")
                        .setPlaceholder("Выберите нужное")
                        .addOptions(
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Товарищ сервера")
                                .setEmoji(Emoji.Ruchki)
                                .setValue("select_Ruchki"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Показатель эрудированности пользователя")
                                .setEmoji(Emoji.Erydit)
                                .setValue(`select_Erydit_null_${ChannelID.EruditRequest}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Показатель частой и хорошей игры в клозы")
                                .setEmoji(Emoji.VHSClose)
                                .setValue(`select_CloseHS_null_${ChannelID.CloseRoleRequest}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Показатель хорошей игры в мафию или бункер")
                                .setEmoji(Emoji.VHSMafia)
                                .setValue(`select_MafiaHS_null_${ChannelID.MafiaRoleRequest}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Порядочный человек")
                                .setEmoji(Emoji.Cloudy)
                                .setValue(`select_Cloud_null_${ChannelID.CloudRequest}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Даббер сервера")
                                .setEmoji(Emoji.Dubber)
                                .setValue(`select_Dabber_null_${ChannelID.DabberRequest}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Музыкант сервера")
                                .setEmoji(Emoji.Music)
                                .setValue(`select_Music_null_${ChannelID.MusicRequest}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Художник сервера")
                                .setEmoji(Emoji.Painter)
                                .setValue(`select_Painter_null_${ChannelID.PainterRequest}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Чтец сервера")
                                .setEmoji(Emoji.Reader)
                                .setValue(`select_Reader_null_${ChannelID.ReaderRequest}`),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Лаврумы")
                                .setEmoji(Emoji.Loveroom)
                                .setValue("select_Loveroom"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Нитро бустер")
                                .setEmoji(Emoji.Nitro)
                                .setValue("select_Nitro"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Отправлять картинки")
                                .setEmoji(Emoji.Pictures)
                                .setValue("select_Picture"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Выдается за сигну серверу")
                                .setEmoji(Emoji.Signa)
                                .setValue("select_Signa"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Выдается за победу в глобальном мероприятии")
                                .setEmoji(Emoji.Kubok)
                                .setValue("select_Kubok"),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Очистить выбор")
                                .setEmoji(Emoji.Trash)
                                .setValue("select_Clear")
                        ),
                )
            ]
        });
    }
}