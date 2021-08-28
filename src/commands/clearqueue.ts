import { MessageEmbed } from "discord.js";
import { Teams } from "../schemas/Settings";
import Command, { RunCallback } from "../structures/Command";
import getPermission, { PermissionLevel } from "../util/permission";

const run: RunCallback = async (client, message, args, settings) => {
  if (!message.member) return;

  if (getPermission(message.member, settings) < PermissionLevel.MOD) {
    message.channel.send("You don't have permission to do that!");
    return;
  }

  settings.players = [];
  settings.team1 = [];
  settings.team2 = [];
  settings.pick = Teams.ONE;

  await settings.save().catch((err) => {
    console.log(err);
    message.channel.send("Failed to update (clear) queue");
  });

  const embed = new MessageEmbed();
  embed.setColor("#841ccf");
  embed.setTitle("Queue Cleared");
  embed.setDescription(`*type ${client.prefix}j to join the queue!*`);

  message.channel.send({ embeds: [embed] });
};

const ClearQueueCommand: Command = {
  name: "clearqueue",
  aliases: ["clearq", "cq"],
  run,
};

module.exports = ClearQueueCommand;
