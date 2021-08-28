import { GuildMember } from "discord.js";
import { ISettings } from "../schemas/Settings";

export const owners = ["272172704243908609"];
export const ignore = [""];

export enum PermissionLevel {
  IGNORE,
  BANNED,
  DEFAULT,
  MOD,
  ADMIN,
  OWNER,
}

const getPermission = (member: GuildMember, settings: ISettings) => {
  if (owners.includes(member.id)) return PermissionLevel.OWNER;
  if (ignore.includes(member.id)) return PermissionLevel.IGNORE;
  if (member.permissions.has("ADMINISTRATOR")) return PermissionLevel.ADMIN;
  if (member.roles.cache.has(settings.modRole)) return PermissionLevel.MOD;
  if (member.roles.cache.has(settings.bannedRole)) return PermissionLevel.BANNED;
  return PermissionLevel.DEFAULT;
};

export default getPermission;
