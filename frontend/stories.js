#!/usr/bin/env node
let config = {
  root: 'site/', //Root hugo folder, can be empty
  dataFolder: 'data', //Data folder path (will fetch ALL files from here)
  type: 'stories', //Type name [basically layout] (save it under "layouts/NAME/single.html" or themes/THEME/layouts/NAME/single.html). Can be overridden on individual pages by defining "type" under "fields"
  pages: 'stories', //Pages elemenet in your data, in case it's "posts" or "articles" etc.
  contentPath: 'content', //Path to content directory (in case it's not "content")
  languages: ['nl', 'de', 'fr'],
  storyPaths: {nl: 'verhalen', fr: 'histoires', de: 'geschichten'},
}

const fs = require('fs');
const fse = require('fs-extra');
const prompts = require('prompts');
const fetch = require('node-fetch');
const { default: slugify } = require('slugify');

const parseYoutube = (url) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length===11)? match[7] : false;
};

const getApiToken = async () => {
  const creds = await prompts([
    {
     type: 'text',
      name: 'email',
      message: 'Email?',
      initial: 'koen@neok.be'
    },
    {
     type: 'text',
      name: 'password',
      message: 'Password?'
    },
  ]);

  const myHeaders = new fetch.Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(creds);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  try {
    const response = await fetch("https://api.hoopdoetleven.be/authentication_token", requestOptions);
    const json = await response.json();

    if(!json.token) {
      console.error('could not retrieve token');
      process.exit(1);
    }

    return json.token;
  } catch(error) {
    console.error(error);
    process.exit(1);
  }
};

const fetchContent = async (apiToken, lang = 'nl') => {
  const myHeaders = new fetch.Headers();
  myHeaders.append("Authorization", `Bearer ${apiToken}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const submissions = 'https://api.hoopdoetleven.be/submissions';

  try {
    const response = await fetch(`${submissions}?type=video&status=accepted&videoUrl=youtu&order[createdAt]=DESC&contactLang=${lang}`, requestOptions);
    const json = await response.json();
    
    return json && json.hasOwnProperty('hydra:member') ? json['hydra:member'] : false;
  } catch(error) {
    console.error(error);
    process.exit(1);
  }
}

const buildStories = async (add, force) => {
  if (typeof add === 'undefined') add = true;
  if (typeof force === 'undefined') force = false;

  const apiToken = await getApiToken();

  for(let iLang in config.languages) {
    const lang = config.languages[iLang];

    const submissions = await fetchContent(apiToken, lang);

    if(!submissions) {
      continue;
    }

    const preparedSubmissions = submissions.map(submission => ({
     title: submission.heroName,
     heroName: submission.heroName,
     date: submission.createdAt,
     description: '',
     videoId: parseYoutube(submission.videoUrl),
     isFeatured: submission.featured,
     videoType: 'youtube',
     type: 'stories',
     titleSlug: slugify(submission.heroName, {lower: true}),     
    }));

    for(let i in preparedSubmissions) {
      const sub = preparedSubmissions[i];

      sub.url = `${config.storyPaths[lang]}/${sub.titleSlug}`;
      const pagePath = config.root + config.contentPath + '/' + lang + '/' + config.pages + '/' + sub.titleSlug;

      if (add) {
        fs.writeFileSync(pagePath + '.md', JSON.stringify(sub) + '\n');
        console.log('Created file: ' + pagePath + '.md');
      } else if (fs.existsSync(pagePath)) {
        let response;
        if (!force) {
          response = await prompts({
            type: 'confirm',
            name: 'value',
            message: 'Delete ' + pagePath + ' ?'
          });
        }
  
        if (force || response.value) {
          fse.removeSync(pagePath);
          console.log('Removed folder: ' + pagePath);
        }
      }
    }
  }
};

const main = async (argvs) => {
  await buildStories();

  console.log('Done!');
};

// Defining commands and flags
const argvs = require('yargs')
  .command('$0', 'Generate folders/files from data, then run `hugo build`')
  .argv;

main(argvs);