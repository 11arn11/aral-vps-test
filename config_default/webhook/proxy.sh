#!/bin/bash

REPOSITORY="git@bitbucket.org:$1"

BRANCH=$2

PROVIDER=$3

CMD="ssh -p 2552 aral@${HOST_OS_IP} \"aral workspace:update $REPOSITORY $BRANCH\""

echo $CMD

eval $CMD
