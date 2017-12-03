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
#nmap -sn 172.26.129.0/24 172.26.130.0/24 172.26.131.0/24 172.26.132.0/24 172.26.140.0/24 172.26.141.0/24 172.26.142.0/24
# TODO try, and test in GL network

# stdout variant using ${} as string variable, for further parsing.
# NMAP_CONTENT=$(nmap -sn 172.26.129.0/24) 

# stdout parsing into file
# NMAP_CONTENT=$(nmap -sn 172.26.129.0/24 >> nmap_command.log) 

# echo $NMAP_CONTENT

# https://unix.stackexchange.com/questions/20784/how-can-i-resolve-a-hostname-to-an-ip-address-in-a-bash-script

#
# Built In commands (mac OS)
#

#ipconfig getifaddr en4 # assuming that en4 current enabled interface
# 169.254.13.252 - AL local IP address (from home / UPC Internet provider)

host krk1-ldl-p00669
# krk1-ldl-p00669.synapse.com has address 172.26.132.13
host krk1-ldl-p00670
# krk1-ldl-p00670.synapse.com has address 172.26.129.142
 
dig +short krk1-ldl-p00669.synapse.com
# 172.26.132.13
dig +short krk1-ldl-p00670.synapse.com
# 172.26.129.142

# Try in office
dig +short Delle5480.synapse.com

# Try in office
nmap -sn  krk1-lhp-f61890.synapse.com

# Starting Nmap 7.60 ( https://nmap.org ) at 2017-12-03 16:55 CET
# Failed to resolve "krk1-lhp-f61890.synapse.com".
# WARNING: No targets were specified, so 0 hosts scanned.
# Nmap done: 0 IP addresses (0 hosts up) scanned in 0.01 seconds


# getent hosts unix.stackexchange.com | cut -d' ' -f1
# TODO

#
# Other commands: 
#