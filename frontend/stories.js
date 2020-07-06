#!/usr/bin/env node


let config = {
  root: 'site', //Root hugo folder, can be empty
  dataFolder: 'data', //Data folder path (will fetch ALL files from here)
  type: 'stories', //Type name [basically layout] (save it under "layouts/NAME/single.html" or themes/THEME/layouts/NAME/single.html). Can be overridden on individual pages by defining "type" under "fields"
  pages: 'stories', //Pages elemenet in your data, in case it's "posts" or "articles" etc.
  contentPath: 'content', //Path to content directory (in case it's not "content")
  hugoPath: '/snap/bin/hugo', //Path to hugo binary (if global, e.g. /snap/bin/hugo)
  languages: ['nl', 'de', 'fr']
}

const fs = require('fs');
const fse = require('fs-extra');
const prompts = require('prompts');

const converToObject = (file) => {
  const jsyml = require('js-yaml');
  const jstml = require('toml');
  const filetype = file.split('.').pop();
  const fileContent = fs.readFileSync(config.root + config.dataFolder + '/' + file, 'utf8');
  if (filetype === 'json') return JSON.parse(fileContent);
  if (filetype === 'yml' || filetype === 'yaml') return jsyml.safeLoad(fileContent);
  if (filetype === 'toml') return jstml.parse(fileContent);
};
const build = async (add, force) => {
  if (typeof add === 'undefined') add = true;
  if (typeof force === 'undefined') force = false;
  if (!config.contentPath || config.contentPath === '/') return console.log('Error: config.contentPath cannot be \'\' or \'/\')!');
  let dataFiles = {};
  try {
    for(let i in config.languages) {
      const lang = config.languages[i];

      dataFiles[lang] = fs.readdirSync(config.root + config.dataFolder + '/' + lang);
    }
  } catch (e) {
    return console.log('e', e);
  }
  if (dataFiles.length < 1) return console.log('No data files');

  for(let iLang in config.languages) {
    const lang = config.languages[iLang];

    for (let i in dataFiles[lang]) {
      let data = converToObject(lang + '/' + dataFiles[lang][i]);
      let pages = config.pages ? data[config.pages] : data;

      console.log(data);

      for (let j in pages) {
        if (!pages[j].path) return console.log('Error: Pages must include path!');
        if (!pages[j].fields) return console.log('Error: Pages must include fields!');
        if (!pages[j].fields.type) pages[j].fields.type = config.type;

        pages[j].fields.url = data.path + '/' + pages[j].path;
        
        const pagePath = config.root + config.contentPath + '/' + lang + '/' + config.pages + '/' + pages[j].path;

        if (add) {
          // fse.ensureDirSync(pagePath);
          fs.writeFileSync(pagePath + '.md', JSON.stringify(pages[j].fields) + '\n');
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

  }  

};
const main = async (argvs) => {
  const mode = typeof argvs._[0] === 'undefined' ? 'default' : argvs._[0];
  const force = typeof argvs['force'] === 'undefined' ? false : true;
  const configFile = typeof argvs['configFile'] === 'undefined' ? false : require('./' + argvs['configFile']);
  Object.assign(config, configFile); //overriding default settings
  config.root = (!!config.root ? config.root : '.') + '/';
  const { execSync } = require('child_process');
  if (mode === 'server') {
    //server mode - create data-generated files, run hugo server, remove data-generated files on stop
    console.log('Building data-generated files...');
    await build();
    console.log('Running Hugo Server...');
    process.on('SIGINT', () => {}); //Not exiting on ctrl+c (instead, going to "catch" clause)
    try {
      await execSync('(cd ' + config.root + ' && ' + config.hugoPath + ' server)');
    } catch (e) {
      console.log('Removing data-generated files...');
      await build(false, force);
    }
  } else if (mode === 'generate') {
    //generate - just create data-generated files (no hugo running, and no removal)
    console.log('Building data-generated files...');
    await build();
  } else if (mode === 'clean') {
    //clean - just remove data-generated files
    console.log('Removing data-generated files...');
    await build(false, force);
  } else {
    //default behavior - create data-generated files, run hugo build, remove data-generated files
    console.log('Building data-generated files...');
    await build();
    console.log('Running Hugo (build)...');
    await execSync('(cd ' + config.root + ' && ' + config.hugoPath + ')');
    console.log('Removing data-generated files...');
    await build(false, force);
  }

  console.log('Done!');
};

// Defining commands and flags
const argvs = require('yargs')
  .command('$0', 'Generate folders/files from data, then run `hugo build`')
  .command('generate', 'Generate folders/files from data (does not run hugo build)')
  .command('server', 'Generate folders/files from data, run `hugo server`, then cleanup on exit')
  .command('clean', 'Trigger cleanup manually')
  .option('force', {
    alias: 'f',
    description: 'Use this flag to skip folder removal prompts (be careful with this one!)'
  })
  .option('configFile', {
    alias: 'c',
    description: 'Optionally use an external config file (JSON format only)'
  })
  .argv;

main(argvs);