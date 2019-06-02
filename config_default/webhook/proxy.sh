#!/bin/bash

REPOSITORY=$1
BRANCH=$2
PROVIDER=$3

if [ "$PROVIDER" == "bitbucket" ]; then
    REPOSITORY="git@bitbucket.org:$REPOSITORY"
fi

INTERNAL_HOST_IP=$(ip route show default | awk '/default/ {print $3}')

CMD="ssh -p 2552 aral@${INTERNAL_HOST_IP} \"aral workspace:update $REPOSITORY $BRANCH $PROVIDER\""

echo $CMD

eval $CMD
