//===========================================/ Import the modeles \===========================================\\
const { Client, GatewayIntentBits, Partials, Collection, Options } = require("discord.js");
const color = require("colors");
require("dotenv").config();

//======================< Function >===================\\
const { loadDatabase } = require("./src/Structures/Handlers/Loaders/loadDatabase.js");
const { loadCommands } = require("./src/Structures/Handlers/Loaders/loadCommands.js");
const { loadEvents } = require("./src/Structures/Handlers/Loaders/loadEvents.js");
//======================< Client >===================\\
const client = new Client({
    intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
    ],
    makeCache: Options.cacheWithLimits({
        GuildMemberManager: {
            maxSize: 1000,
            keepOverLimit: member => member.id === client.user.id,
        },
        GuildMessageManager: {
            maxSize: 1000,
        }
    }),
})

//======================< Collection >===================\\
client.slashCommands = new Collection();
client.buttons = new Collection();
client.events = new Collection();
client.selectMenu = new Collection();
client.modalSubmits = new Collection();

//======================< Handlers >===================\\
const Handlers = [

];

Handlers.forEach(handler => {
    require(`./Structures/Handlers/${handler}`)(client, color);
});

//======================< Login >===================\\
client.login(process.env.TOKEN).then(async () => {
    await loadDatabase(client, color);
    loadEvents(client, color);
    loadCommands(client, color);
})
    .catch(err => {
        console.log(`${color.bold.red(`[INDEX ERROR] `)}` + `${err}.`.bgRed);
    });
module.exports = client;