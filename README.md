<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#testing">Testing</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

[![asciicast](https://asciinema.org/a/598648.svg)](https://asciinema.org/a/598648)

I hate having to manually think about setting up my `.env` files every time I have to bring up a new project without understanding any of the keys. Installing new packages also kind of implies that you manually go through the process to make and also understand the `.env` file that you need to have in order for the package to run successfully. 

This should make that process smoother by making it interactive leaving less room for error while making for a nicer installation experience (think of zip files vs install wizards).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

The project is very simple to setup, clone and run `yarn` to install dependencies. To run the project execute `yarn start`. You should have an example env file (default `env.example`) that will be used to generate the setup flow. It shouldn't be anything special so if you already have it chances are you can use it with `dotenv-generator`. You can also use comments ("#") to provide a description for the env value. By default you can put comments above the variable to describe it, or you can use an inline comment after the variable and the default value. 

### Installation

Run `yarn` to install dependencies

### Testing

Run `yarn test` to execute tests. To generate coverage run `yarn coverage`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

### Example env file

```env
# Comment that will be applied as description to the variable after it
PUBLIC=STRINGY
# Comment that will override the inline comment
BOOLEAN=true # Inline comment that will be overriden that you can use for additional info but not for setup
NUMBEROO=2
SECRETSTUFF=bar # Inline comment that will be displayed during setup
SECRET=2
# Comment that will be ignored
```

With the given example file the setup flow would be as following:

* The first value would have the description as the first line comment for the value "PUBLIC" with the default value of "STRINGY". Enter applies the default value.
* The second value would have the description of the third line comment for the value "BOOLEAN" with the default value of "true". Only boolean values would be accepted here.
* The third value would have the generated description and it would look like this "Enter the value, type number, for NUMBEROO: 2". Only numbers would be accepted here.
* The fourth value would have the description of the inline comment for the value "SECRETSTUFF" with the default value of "bar".
* The last value would have the generated description.
* The last line comment would be ignored and wouldn't impact the setup.

The following recording demonstrates this:

[![asciicast](https://asciinema.org/a/598649.svg)](https://asciinema.org/a/598649)

### How to use dotenv-generator

The easiest way to use this package is to run it (Duh). You can add a `configure` script to your package.json file that runs `dotenv-generator`. If you want users to execute this script let them know by asking them to perform this after installation `npm explore {name_of_the_package} -- npm run configure`.

#### Postinstall

Ideally your project should use `dotenv-generator --postinstall` as a `postinstall` action. This means that after installation of your package, `dotenv-generator` will be run. This allows for a seamless setup of your project that will magically happen after installation. Since this is not an ideal world npm 6+ **doesn't play nice** with interactive `postinstall` hooks so I've added a check for that if you include the `--postinstall` flag it will check the npm version and for npm 6+ the script won't execute the interactive flow.It will instead print a message saying that the configuration could be done by executing `npm explore {name_of_the_package} -- npm run postinstall`. To view this output you must include `--foreground-scripts` as a flag for package installation ie. `npm i --foreground-scripts`.

Don't forget to include an `.env.example` file with descriptions of your fields in the root directory, or anywhere else but then specifying `-f inputFilePath`.

#### Global

You can also install this package globally by running `npm i -g dotenv-generator`. After this you can use `dotenv-generator` anywhere. This makes it really simple to setup multiple projects without having to worry about the generator being a dependency. 

#### Parameters

Available parameters are:
  * -f, --file <env-template-file> - The environment file name to be used as an example
  * -o, --output <env-output-file> - The environment file name to be used as an output
  * -pi, --postinstall - If set the script will check for npm version
  * -d, --debug - A flag to enable writing debug output to stdout

After completed installation your package folder inside of `node_modules` will contain a `.env` file with the provided values that your package can then use.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this project better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Nenad Lukic - [@lnenad](https://github.com/lnenad)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/lnenad/env-generator?style=for-the-badge
[contributors-url]: https://github.com/lnenad/env-generator/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/lnenad/env-generator?style=for-the-badge
[forks-url]: https://github.com/lnenad/env-generator/network/members
[stars-shield]: https://img.shields.io/github/stars/lnenad/env-generator?style=for-the-badge
[stars-url]: https://github.com/lnenad/env-generator/stargazers
[issues-shield]: https://img.shields.io/github/issues/lnenad/env-generator?style=for-the-badge
[issues-url]: https://github.com/lnenad/env-generator/issues
[license-shield]: https://img.shields.io/github/license/lnenad/env-generator?style=for-the-badge
[license-url]: https://github.com/lnenad/env-generator/blob/master/LICENSE.md
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
