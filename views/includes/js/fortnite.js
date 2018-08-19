(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Client = require('fortnite');
const fortnite = new Client('8d7a84bf-70d8-4e93-ab6f-f000152fd525');
let username = document.getElementById('username');
let platform = document.getElementById('platform');
// let input = document.getElementsByTagName('input')[0];
// let body = document.getElementsByTagName('body')[0];

fortnite.user(username.textContent, 'pc' /*platform.textContent* for user desire*/ ).then(function(resolved){
  delete resolved.stats.solo;
  delete resolved.stats.duo;
  delete resolved.stats.squad;
  delete resolved.url;
  delete resolved.stats.lifetime;

  var i = 0;
  var speed = 15;
  var txt = JSON.stringify(resolved, undefined, 2)
  function typeWriter() {
    if (i < txt.length) {
      document.getElementById('output').innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter()
});

// body.addEventListener('click', e => {
//   input.focus()
// });

},{"fortnite":2}],2:[function(require,module,exports){
module.exports = require('./src/Client');

},{"./src/Client":3}],3:[function(require,module,exports){
const fetch = require('node-fetch');

const User = require('./User');

/**
 * The main hub for interacting with the FortniteTracker API
 *
 * @author Jake Ruston
 */
class Client {
  /**
   * @param {string} key The API Key from FortniteTracker
   */
  constructor(key) {
    this.url = 'https://api.fortnitetracker.com/v1';
    this.headers = { headers: { 'TRN-Api-Key': key } };

    /**
     * The available platforms
     * @type {Object}
     */
    this.platforms = {
      xbl: ['xbox', 'xb1', 'xbox1', 'xbox one'],
      psn: ['playstation', 'ps4', 'ps', 'playstation 4'],
      pc: ['computer']
    };
  }

  /**
   * Gets the stats of a certain user
   *
   * @param {string} username The username to search for
   * @param {string} platform The platform that the user plays on
   * @returns {Promise<Object>}
   */
  user(username, platform) {
    return new Promise((resolve, reject) => {
      // No values given
      if (!username) return reject(new Error('You must supply a username'));
      if (!platform) return reject(new Error('You must supply a platform'));

      // Invalid value type
      if (typeof username !== 'string') return reject(new TypeError('Username must be a string'));
      if (typeof platform !== 'string') return reject(new TypeError('Platform must be a string'));

      let result;
      let data;

      (async () => {
        try {
          username = encodeURI(username);
          platform = this.getPlatform(platform);

          result = await fetch(`${this.url}/profile/${platform}/${username}`, this.headers);
          data = await result.json();
        } catch (err) {
          return reject(err);
        }

        if (data.error === 'Player Not Found') return reject(new Error('User not found'));
        return resolve(new User(data));
      })();

      return undefined;
    });
  }

  /**
   * Gets the correct platform from a hash map
   *
   * @param {string} platform The platform to get
   * @returns {void}
   */
  getPlatform(platform) {
    if (platform in this.platforms) {
      return platform;
    } else {
      for (const plat in this.platforms) {
        if (this.platforms[plat].includes(platform)) {
          return Object.keys(this.platforms).find(key => this.platforms[key] === this.platforms[plat]);
        }
      }
    }

    return undefined;
  }
}

module.exports = Client;

},{"./User":6,"node-fetch":7}],4:[function(require,module,exports){
/** Class representing a game mode */
class Mode {
  /**
   * @param {Object} data All of the type data resolved from the API
   */
  constructor(data) {
    this.score = data.score.valueInt;
    this.kd = data.kd.valueDec;
    this.matches = data.matches.valueInt;
    this.kills = data.kills.valueInt;
    this.kills_per_match = data.kpg.valueDec;
    this.score_per_match = data.scorePerMatch.valueDec;
    this.wins = data.top1.valueInt;
    this.top_3 = data.top3.valueInt + this.wins;
    this.top_5 = data.top5.valueInt + this.top_3 + this.wins;
    this.top_6 = data.top6.valueInt + this.top_5 + this.top_3 + this.wins;
    this.top_12 = data.top12.valueInt + this.top_6 + this.top_5 + this.top_3 + this.wins;
    this.top_25 = data.top25.valueInt + this.top_12 + this.top_6 + this.top_5 + this.top_3 + this.wins;
  }
}

module.exports = Mode;

},{}],5:[function(require,module,exports){
/** Class representing a single stat */
class Stat {
  /**
   * @param {Object} data All of the stat data resolved from the API
   */
  constructor(data) {
    this[data.key] = data.value;
  }
}

module.exports = Stat;

},{}],6:[function(require,module,exports){
const Mode = require('./Mode');
const Stat = require('./Stat');

/** Class representing a full user */
class User {
  /**
   * @param {Object} data All of the data resolved from the API
   */
  constructor(data) {
    this.id = data.accountId;
    this.username = data.epicUserHandle;
    this.platform = data.platformNameLong;
    this.url = `https://fortnitetracker.com/profile/${data.platformName.toLowerCase()}/${this.username}`;
    this.stats = {};

    for (const mode in data.stats) {
      // Replace the playlist id with its name for the keys
      this.stats[modes[mode]] = new Mode(data.stats[mode]);
    }

    // TODO: Make lifetime single objects and not an array
    // Will be updated in a newer version
    this.stats.lifetime = data.lifeTimeStats.map(stat => new Stat(stat));
  }
}

const modes = {
  p2: 'solo',
  p10: 'duo',
  p9: 'squad',
  curr_p2: 'current_solo',
  curr_p10: 'current_duo',
  curr_p9: 'current_squad'
};

module.exports = User;

},{"./Mode":4,"./Stat":5}],7:[function(require,module,exports){
module.exports = exports = window.fetch;

// Needed for TypeScript and Webpack.
exports.default = window.fetch.bind(window);

exports.Headers = window.Headers;
exports.Request = window.Request;
exports.Response = window.Response;

},{}]},{},[1]);
