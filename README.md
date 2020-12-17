# Pterodactyl-Discord-Bot

[![GitHub](https://img.shields.io/github/license/linux123123/Simple-Discord-Bot)](https://github.com/Linux123123/Simple-Discord-Bot/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/linux123123/Simple-Discord-Bot)](https://github.com/Linux123123/Simple-Discord-Bot/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/linux123123/Simple-Discord-Bot)](https://github.com/Linux123123/Simple-Discord-Bot/pulls)

<h3>A simple discord bot, that has a permission system.</h3>

# Requirements

1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**<br>
1.1 You need to have **Privileged Gateway Intents** enabled. (both member and presence)
2. Node.js v12.0.0 or newer

# To install

<h5>Install from the command line:</h5>

```bash
git clone https://github.com/Simple-Discord-Bot.git
npm install --production
npm start
```

# Permissions

There are 10 permission levels. They are defined in `config.js`

| Level name    	| Corresponding role   	| Level 	| Guild role     	|
|---------------	|----------------------	|-------	|----------------	|
| User          	| everyone (default)   	| 0     	| :green_circle: 	|
|               	|                      	| 1     	|                	|
| Moderator     	| Server moderator     	| 2     	| :green_circle: 	|
| Administrator 	| Server administrator 	| 3     	| :green_circle: 	|
| Server Owner  	| Server owner         	| 4     	| :green_circle: 	|
|               	|                      	| 5     	|                	|
|               	|                      	| 6     	|                	|
|               	|                      	| 7     	|                	|
| Bot Support   	| Bot support          	| 8     	| :red_circle:   	|
| Bot Admin     	| Bot admins           	| 9     	| :red_circle:   	|
| Bot Owner     	| Linux123123          	| 10    	| :red_circle:   	|

The rows without any information are left to change if you want to add more roles.

# Disclaimer
I am not responsible for any damages that you cause to your servers by using this bot.

# Contributors
Created and maintained by [Linux123123](https://github.com/linux123123)
