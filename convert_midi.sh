#!/bin/bash
mkdir -p "Covert MIDI Files"
find MIDI\ Files -name "*.mid" -print0 | while IFS= read -r -d $'\0' file; do
  output_file="Covert MIDI Files/$(dirname "$file" | sed 's/MIDI Files//')/$(basename "$file")"
  output_file="${output_file%.*}".mid
  mkdir -p "Covert MIDI Files/$(dirname "$file" | sed 's/MIDI Files//')"
  ruby midi_converter.rb "$file" "$output_file"
done
