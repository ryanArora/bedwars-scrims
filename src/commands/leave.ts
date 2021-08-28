import Command, { RunCallback } from "../structures/Command";
import leavePlayer from "../util/actions/leavePlayer";
import getPermission, { PermissionLevel } from "../util/permission";

const run: RunCallback = async (client, message, args, settings) => {
  if (!message.member) return;

  if (getPermission(message.member, settings) < PermissionLevel.BANNED) {
    message.channel.send("You dont have permission to do that!");
    return;
  }

  leavePlayer(message.member, settings);
};

const LeaveCommand: Command = {
  name: "leave",
  aliases: ["l"],
  run,
};

module.exports = LeaveCommand;
