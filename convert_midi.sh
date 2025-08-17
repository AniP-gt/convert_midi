#!/bin/bash
mkdir -p "Converted MIDI Files"
find Grooves -name "*.mid" -print0 | while IFS= read -r -d $'\0' file; do
  output_file="Converted MIDI Files/$(basename "$file")"
  ruby midi_converter.rb "$file" "$output_file"
done
