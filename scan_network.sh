#!/bin/bash
# LF format must be Unix, so that script executed in Unix.
# Test script using nmap command. Alternative to NodeJS+ShellJS


# parse stdout (curl response)
# https://stackoverflow.com/questions/1955505/parsing-json-with-unix-tools
# https://stackoverflow.com/questions/41832641/parsing-an-http-response-from-a-curl-post
# Ideally, need to find using `awk` or any built in approach, python or perl parser is also external, better to avoid.

# Direct command, single execution
# nmap -sn 172.26.129.0/24

# Direct command, multiple networks execution
nmap -sn 172.26.129.0/24 172.26.130.0/24 172.26.131.0/24 172.26.132.0/24 172.26.140.0/24 172.26.141.0/24 172.26.142.0/24
# TODO try, and test in GL network

# stdout variant using ${} as string variable, for further parsing.
# NMAP_CONTENT=$(nmap -sn 172.26.129.0/24) 

# stdout parsing into file
# NMAP_CONTENT=$(nmap -sn 172.26.129.0/24 >> nmap_command.log) 

# echo $NMAP_CONTENT