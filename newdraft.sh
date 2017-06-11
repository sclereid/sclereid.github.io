#!/bin/sh

cd _drafts

if [ $# -ne 1 ]
then
    echo "newdraft"
    echo "usage: newdraft <filename>"
    exit
fi

filename="$(date +%Y-%m-%d)-$1.md"
echo "---
layout: post
title:  \"$1\"
date:   $(date +%Y-%m-%d) $(date +%H-%M-%S) +0800
categories: posts
---" > $filename
