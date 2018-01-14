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

#
# AL - FROM MacOS scanning My work PC
# 

# krk1-lhp-p00912
# 169.254.16.88 - after ncap/nmap interface
# 172.26.129.227 (if via LAN)
# 172.26.129.200 (if via KRK-VLAN)
# 172.26.142.175 (if via KRK-VLAN)


# host 172.26.129.200
# Host 200.129.26.172.in-addr.arpa. not found: 3(NXDOMAIN)
# host 172.26.142.175
# Host 175.142.26.172.in-addr.arpa. not found: 3(NXDOMAIN)

# nslookup 172.26.142.175
# Server:		8.8.8.8
# Address:	8.8.8.8#53
# ** server can't find 175.142.26.172.in-addr.arpa: NXDOMAIN

# nslookup 172.26.129.200
# Server:		8.8.8.8
# Address:	8.8.8.8#53
# ** server can't find 200.129.26.172.in-addr.arpa: NXDOMAIN

#
#
#

#ipconfig getifaddr en4 # assuming that en4 current enabled interface
# 169.254.13.252 - AL local IP address (from home / UPC Internet provider)

host krk1-ldl-p00669
# krk1-ldl-p00669.synapse.com has address 172.26.132.13
host krk1-ldl-p00670
# krk1-ldl-p00670.synapse.com has address 172.26.129.142
host krk1-lhp-f61897
# krk1-lhp-f61897.synapse.com has address 10.0.1.73
 
dig +short krk1-ldl-p00669.synapse.com
# 172.26.132.13
dig +short krk1-ldl-p00670.synapse.com
# 172.26.129.142

# Try in office
dig +short Delle5480.synapse.com

# Try in office
# nmap -sn  krk1-lhp-f61890.synapse.com # failed to resolve from VPN
nmap -sn  krk1-lhp-f61897.synapse.com

# Starting Nmap 7.60 ( https://nmap.org ) at 2017-12-03 16:55 CET
# Failed to resolve "krk1-lhp-f61890.synapse.com".
# WARNING: No targets were specified, so 0 hosts scanned.
# Nmap done: 0 IP addresses (0 hosts up) scanned in 0.01 seconds


# getent hosts unix.stackexchange.com | cut -d' ' -f1
# TODO

# Another way to get IP from hostname
# https://unix.stackexchange.com/a/404374
#nslookup google.com | grep -Po 'Address:\s*[0-9.]+' | tail -1 | sed -e 's/Address:\s*//g'
# but grep syntax is not ok
# this is correct on MacOS:
nslookup krk1-lhp-f61897 | grep -e 'Address: ' | tail -1 | sed -e 's/Address: *//g'


ping -a krk1-lhp-f61897 -c 1
# but not all KRK- hosts are pinged/available from VPN
# Need to try from office. Tried. Almost all krk1-lhp-f61897-like hostnames are not resolved from office

#
# Other commands: 
#

# Node JS
# npm install -g lookup-hostname
# or install to project an duse require('lookup')
lookup google.com
# 62.243.192.89