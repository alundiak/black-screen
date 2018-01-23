#!/bin/bash
#
# Copied from https://ubuntuforums.org/showthread.php?t=1656571
# 
input_file="al/logs/scan.log"
output_file="al/logs/converted_from_subnet.log"

declare -a nmap_array=($(
  grep -e report -e MAC "$input_file" | \
  sed -e '{
    s/Nmap scan report for //g
  }'
))
# s/MAC Address: //g - can be needed for Windows NMAP results. So far on MacOS there is no such line.

nmap_array_len=${#nmap_array[@]}
# echo $nmap_array
# echo -n > "$output_file"

ipv4_pattern='[0-9]'
ipv6_pattern='[0-9A-F]\+:'
ip_pattern=$ipv4_pattern
# ip_pattern = $ipv6_pattern

for (( i = 0; i <= $nmap_array_len; i++ )); do
  # echo ${nmap_array[$i]}  
  # echo ${nmap_array[$i]} | grep -c "$ip_pattern"

  # if IP Address found
  if [ $(echo ${nmap_array[$i]} | grep -c "$ip_pattern") -gt 0 ]; then
    # echo ${nmap_array[(( $i ))]} >> "$output_file"  
    echo ${nmap_array[(( $i ))]}
  fi

  # looks as redundancy/over-complexity
  # while (( $(echo ${nmap_array[$i]} | grep -c "$ip_pattern") < 1 )); do
  #   (( i++ ))
  # done
  # echo ${nmap_array[(( $i - 1 ))]} ${nmap_array[$i]} '-' >> "$output_file"
  # (( i++ ))
done

# echo -e "\nAll finished.\n" 
# exit 0
