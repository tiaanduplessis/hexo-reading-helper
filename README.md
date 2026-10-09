<h1 align="center">hexo-reading-helper</h1>
<div align="center">
  <strong>Hexo helper plugin for getting word count &amp; estimated reading time</strong>
</div>
<br>
<div align="center">
  <a href="https://npmjs.org/package/hexo-reading-helper">
    <img src="https://img.shields.io/npm/v/hexo-reading-helper.svg?style=flat-square" alt="Package version" />
  </a>
  <a href="https://npmjs.org/package/hexo-reading-helper">
  <img src="https://img.shields.io/npm/dm/hexo-reading-helper.svg?style=flat-square" alt="Downloads" />
  </a>
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard" />
  </a>
  <a href="https://travis-ci.org/tiaanduplessis/hexo-reading-helper">
    <img src="https://img.shields.io/travis/tiaanduplessis/hexo-reading-helper.svg?style=flat-square" alt="Travis Build" />
  </a>
  <a href="https://github.com/RichardLitt/standard-readme)">
    <img src="https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square" alt="Standard Readme" />
  </a>
  <a href="https://badge.fury.io/gh/tiaanduplessis%2Fhexo-reading-helper">
    <img src="https://badge.fury.io/gh/tiaanduplessis%2Fhexo-reading-helper.svg?style=flat-square" alt="GitHub version" />
  </a>
  <a href="https://dependencyci.com/github/tiaanduplessis/hexo-reading-helper">
    <img src="https://dependencyci.com/github/tiaanduplessis/hexo-reading-helper/badge?style=flat-square" alt="Dependency CI" />
  </a>
  <a href="https://github.com/tiaanduplessis/hexo-reading-helper/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/hexo-reading-helper.svg?style=flat-square" alt="License" />
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs" />
  </a>
  <a href="https://www.paypal.me/tiaanduplessis/1">
    <img src="https://img.shields.io/badge/$-support-green.svg?style=flat-square" alt="Donate" />
  </a>
</div>
<br>
<div align="center">
  <a href="https://github.com/tiaanduplessis/hexo-reading-helper/watchers">
    <img src="https://img.shields.io/github/watchers/tiaanduplessis/hexo-reading-helper.svg?style=social" alt="Github Watch Badge" />
  </a>
  <a href="https://github.com/tiaanduplessis/hexo-reading-helper/stargazers">
    <img src="https://img.shields.io/github/stars/tiaanduplessis/hexo-reading-helper.svg?style=social" alt="Github Star Badge" />
  </a>
  <a href="https://twitter.com/intent/tweet?text=Check%20out%20hexo-reading-helper!%20https://github.com/tiaanduplessis/hexo-reading-helper%20%F0%9F%91%8D">
    <img src="https://img.shields.io/twitter/url/https/github.com/tiaanduplessis/hexo-reading-helper.svg?style=social" alt="Tweet" />
  </a>
</div>
<br>
<div align="center">
  Built with ❤︎ by <a href="tiaan.beer">Tiaan</a> and <a href="https://github.com/tiaanduplessis/hexo-reading-helper/graphs/contributors">contributors</a>
</div>

<h2>Table of Contents</h2>
<details>
  <summary>Table of Contents</summary>
  <li><a href="#install">Install</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contribute">Contribute</a></li>
  <li><a href="#license">License</a></li>
</details>

## Install

[![Greenkeeper badge](https://badges.greenkeeper.io/tiaanduplessis/hexo-reading-helper.svg)](https://greenkeeper.io/)

```sh
$ npm install --save hexo-reading-helper
# OR
$ yarn add hexo-reading-helper
```

## Usage

<div align="center">
	<image src="example.png" alt=""/>
</div>

Usage shown using `ejs`

To get reading time:

```html
<%- reading(page.content).time() %> <!-- 1 min read -->
```

To get word count:

```html
<%- reading(page.content).words() %> <!-- 50 words -->
```

Use your own custom formatting by passing a callback to the `time` or `words` function:

```html
<%- reading(page.content).time(function(minutes) {
	return 'About ' + minutes + 'min'
}) %> <!-- 1 min read -->
```


Set the number of words per a minute to base estimation on:

```html
<%- reading(page.content, {wordsPerMinute: 400}).time() %>
```

## Contribute

Contributions are welcome. Please open up an issue or create PR if you would like to help out.

Note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

Licensed under the MIT License.
