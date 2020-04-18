aral-vps-test
=============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/aral-vps-test.svg)](https://npmjs.org/package/aral-vps-test)
[![Downloads/week](https://img.shields.io/npm/dw/aral-vps-test.svg)](https://npmjs.org/package/aral-vps-test)
[![License](https://img.shields.io/npm/l/aral-vps-test.svg)](https://github.com/11arn11/aral-vps-test/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g aral-vps-test
$ aral COMMAND
running command...
$ aral (-v|--version|version)
aral-vps-test/1.0.17 darwin-x64 node-v12.16.1
$ aral --help [COMMAND]
USAGE
  $ aral COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`aral destroyAll`](#aral-destroyall)
* [`aral help [COMMAND]`](#aral-help-command)
* [`aral init`](#aral-init)
* [`aral start`](#aral-start)
* [`aral workspace:create REPOSITORY BRANCH [PROVIDER]`](#aral-workspacecreate-repository-branch-provider)
* [`aral workspace:list`](#aral-workspacelist)
* [`aral workspace:start REPOSITORY BRANCH [PROVIDER]`](#aral-workspacestart-repository-branch-provider)
* [`aral workspace:startAll`](#aral-workspacestartall)
* [`aral workspace:update REPOSITORY BRANCH [PROVIDER]`](#aral-workspaceupdate-repository-branch-provider)

## `aral destroyAll`

remove all system container. After this command you will have to set authorized_keys of Webhook container again

```
USAGE
  $ aral destroyAll
```

_See code: [src/commands/destroyAll.ts](https://github.com/11arn11/aral-vps-test/blob/v1.0.17/src/commands/destroyAll.ts)_

## `aral help [COMMAND]`

display help for aral

```
USAGE
  $ aral help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `aral init`

start configuration wizard

```
USAGE
  $ aral init
```

_See code: [src/commands/init.ts](https://github.com/11arn11/aral-vps-test/blob/v1.0.17/src/commands/init.ts)_

## `aral start`

start the system

```
USAGE
  $ aral start
```

_See code: [src/commands/start.ts](https://github.com/11arn11/aral-vps-test/blob/v1.0.17/src/commands/start.ts)_

## `aral workspace:create REPOSITORY BRANCH [PROVIDER]`

create a branch repository workspace

```
USAGE
  $ aral workspace:create REPOSITORY BRANCH [PROVIDER]
```

_See code: [src/commands/workspace/create.ts](https://github.com/11arn11/aral-vps-test/blob/v1.0.17/src/commands/workspace/create.ts)_

## `aral workspace:list`

list all created workspace (started or not)

```
USAGE
  $ aral workspace:list
```

_See code: [src/commands/workspace/list.ts](https://github.com/11arn11/aral-vps-test/blob/v1.0.17/src/commands/workspace/list.ts)_

## `aral workspace:start REPOSITORY BRANCH [PROVIDER]`

start a branch repository workspace

```
USAGE
  $ aral workspace:start REPOSITORY BRANCH [PROVIDER]
```

_See code: [src/commands/workspace/start.ts](https://github.com/11arn11/aral-vps-test/blob/v1.0.17/src/commands/workspace/start.ts)_

## `aral workspace:startAll`

start (or restart) all workspace created

```
USAGE
  $ aral workspace:startAll
```

_See code: [src/commands/workspace/startAll.ts](https://github.com/11arn11/aral-vps-test/blob/v1.0.17/src/commands/workspace/startAll.ts)_

## `aral workspace:update REPOSITORY BRANCH [PROVIDER]`

update workspace filesystem

```
USAGE
  $ aral workspace:update REPOSITORY BRANCH [PROVIDER]
```

_See code: [src/commands/workspace/update.ts](https://github.com/11arn11/aral-vps-test/blob/v1.0.17/src/commands/workspace/update.ts)_
<!-- commandsstop -->
