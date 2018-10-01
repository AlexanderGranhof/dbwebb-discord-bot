const { Client, Attachment } = require("discord.js");
const auth = require("./auth.json");
const calendar = require("./calendar.js");
const channels = require("./channels.json");
let kmom = filterKmom(require("./data/kmom.json"));

const avaliableCommands = {
    "!fbhelp": "Skriver ut detta.",
    "!cal": "Skickar en bild på dbwebb kalendern.",
    "!kmom": "Skriver ut nästa kmom i python och php.",
    "!kmom htmlphp": "Skriver ut nästa kmom.",
    "!kmom python": "Skriver ut nästa kmom."
};

const client = new Client();

client.on("ready", () => {
    //log(`Logged in as ${client.user.tag} at ${new Date().toLocaleString()}`);
});

client.on("message", async message => {
    if (message.content[0] === "!" && message.channel.name === "bot-testing") {
        const command = message.content
            .substr(1)
            .replace(/\s/g, "")
            .toLowerCase();

        switch (command) {
            case "cal":
            case "kalender":
                sendCalendar(message);
                logCommand(message);
                break;

            case "kmompython":
                var course = getKmomData("python");
                var msg =
                    `Nästa Python kmom:\r` +
                    `${course.name} - ${course.date}\r` +
                    `${course.url}\r`;

                message.channel.send(msg);
                logCommand(message);
                break;
            case "kmomphp":
            case "kmomhtmlphp":
                var course = getKmomData("htmlphp");
                var msg =
                    `Nästa htmlphp kmom:\r` +
                    `${course.name} - ${course.date}\r` +
                    `${course.url}\r`;

                message.channel.send(msg);
                logCommand(message);
                break;
            case "kmom":
                var course = getKmomData("python");
                let python = `Python - ${course.name} - ${course.date}\r` + `${course.url}\r\n`;

                var course = getKmomData("htmlphp");
                let htmlphp = `Htmlphp - ${course.name} - ${course.date}\r` + `${course.url}\r`;

                var msg = `Nästa kmoms:\r` + python + htmlphp;

                message.channel.send(msg);
                logCommand(message);
                break;
            case "fbhelp":
                var msg = `Du kan använda dessa kommandon:\r`;

                for (cmd in avaliableCommands) {
                    msg += `\`${cmd}\`: ${avaliableCommands[cmd]}\r`;
                }

                message.channel.send(msg);
                logCommand(message);
                break;
            default:
                logCommand(message, true);
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

function getKmomData(course) {
    return {
        name: kmom[course][0].name,
        date: new Date(Date.parse(kmom[course][0].date)).toDateString(),
        url: kmom[course][0].url
    };
}

client.login(auth.token);

function log(message) {
    client.channels.get(channels["bot-log"]).send(message);
}

function logCommand(message, failed) {
    let msg = `**${message.author.username}** used command: \`${message.content}\``;
    if (failed) msg += " but it doesn't exist!";

    msg += " `" + new Date().toLocaleString() + "`";

    client.channels.get(channels["bot-log"]).send(msg);
}

function filterKmom(kmom) {
    temp = {};

    for (course in kmom) {
        temp[course] = kmom[course].filter(
            assignment => Date.parse(assignment.date) > new Date().getTime()
        );
    }

    return temp;
}

//client.channels.get("486488345333989378").send("First Log")
