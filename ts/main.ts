import { readFile } from 'fs/promises';
import { initAndSeedHasura } from './initAndSeedHasura.js';

const jsonUsersFile = "json/example-users.json";
const jsonUsersString = await readFile(jsonUsersFile, {
    encoding: "utf8",
  });
const users: User[] = JSON.parse(jsonUsersString)
  
await initAndSeedHasura(users)
  