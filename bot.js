const { Client, Attachment } = require("discord.js");
const auth = require("./auth.json");
const calendar = require("./calendar.js");
const client = new Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async message => {
    if (message.content[0] === "!" && message.channel.name === "bot-testing") {
        switch (message.content.substr(1)) {
            case "cal":
            case "kalender":
                sendCalendar(message);
                break;

            default:
                break;
        }
    }
});

/**
 * Sends the calendar.png image attachment to the discord
 * @param {object} message
 */
async function sendCalendar(message) {
    await calendar.generateImage();
    const attachment = new Attachment("./calendar.png");
    message.channel.send(attachment);
}

client.login(auth.token);
