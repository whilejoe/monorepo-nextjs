# 🤝 Contributing

## Prerequisites

- node >= lts/Hydrogen (recommended install through [nvm](https://github.com/nvm-sh/nvm))

  With nvm, running `nvm use` in the project will configure the proper node version for this project.

- [yarn](https://yarnpkg.com/en/docs/install) - `curl -o- -L https://yarnpkg.com/install.sh | bash`

## Setting Up The Project

This command will clone the repo, cd into the project, and install the project's npm dependencies.

```sh
  git clone git@github.com:whilejoe/monorepo-nextjs.git && yarn
```

### Configuring Your IDE

The project provides npm scripts (and even commit hooks) to run formatting and linting on the codebase.

However, running these tasks manually is time-consuming, and you lose the benefits of real-time feedback that can catch bugs before you hit save.

These tools are far more effective when integrated into your IDE, and once configured, can apply to any other project.

#### VSCode

Preferred, and easiet to set up.

All recommended plugins will show up under the tab `extensions > recommended`. All plugin-specific configs already live in the codebase. Install and you're all set!

#### Other IDE's

- [babel](https://babeljs.io/docs/en/editors)
- [eslint](https://eslint.org/docs/user-guide/integrations#editors)
- [prettier](https://prettier.io/docs/en/editors.html)

#### The Manual Way

- `yarn lint` lints all packages. Pass the `--fix` flag to automatically fix most errors.
- `yarn format` formats `ts/tsx/md` files across the codebase.

## 🚀 Development

Copy the `.env.local.example` file and rename to `.env.local`

To develop all apps and packages, run:

```
yarn dev
```

### Installing A Package

This monorepo uses [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) to manage npm dependencies across packages.

#### Root

_Note: This is only needed for a project-wide dependency and shouldn't be required often._

The `-W` flag indicates a package should be installed in the root workspace.

```
yarn -W add package-name
```

#### Individual Workspace

Each workspace should declare the dependencies it requires (symlinking is handled by yarn).
Using the web app as an example:

```
yarn workspace web add react
```

### Building For Production

Ensure your changes will pass pipeline checks and build.

For a quick sanity check:

```
# Build prod
yarn build

# Serve prod
yarn start
```

For a more accurate representation of a production build:

#### Docker

```

# Build prod

COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build

# Start prod in detached mode

docker-compose -f docker-compose.yml up -d

```

Open [http://localhost:3000](http://localhost:3000)

To shutdown all running containers:

```

# Stop all running containers

docker kill $(docker ps -q) && docker rm $(docker ps -a -q)

```
