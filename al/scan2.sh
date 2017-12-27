#!/bin/bash
# Copied from https://ubuntuforums.org/showthread.php?t=1656571
#
# TODO - smth BAD - try in office
# 
echo -e "\nEnter the full path to the nmap output file to be parsed:"
read -e input_file

echo -e "\nEnter the full path to the output file from this script:"
read -e output_file

declare -a nmap_array=($(
  grep -e report -e MAC "$input_file" | \
  sed -e '{
    s/Nmap scan report for //g
    s/MAC Address: //g
    s/ (.\+//g
  }'
))

nmap_array_len=${#nmap_array[@]}
echo -n > "$output_file"

for (( i = 0; i <= $nmap_array_len; i++ )); do
  while (( $(echo ${nmap_array[$i]} | grep -c '[0-9A-F]\+:') < 1 )); do
    (( i++ ))
  done
  echo ${nmap_array[(( $i - 1 ))]} ${nmap_array[$i]} '-' >> "$output_file"
  (( i++ ))
done

echo -e "\nAll finished.\n" 
exit 0
