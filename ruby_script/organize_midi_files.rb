#!/usr/bin/env ruby
require 'fileutils'

SOURCE_DIR = 'Converted MIDI Files'
TARGET_DIR = 'Organized MIDI Files'

def organize_midi_files
  # Create target directory if it doesn't exist
  FileUtils.mkdir_p(TARGET_DIR)

  # Get all MIDI files
  midi_files = Dir.glob(File.join(SOURCE_DIR, '*.mid'))

  puts "Found #{midi_files.length} MIDI files to organize"

  midi_files.each do |file_path|
    filename = File.basename(file_path)

    # Parse filename components
    # Example: Ace_Soul__ClosedHH_8_4-4_102.mid
    # Pattern: Name_Genre_Type_Instrument_Bars_TimeSignature_BPM.mid

    # Split by underscore but handle double underscores
    parts = filename.gsub('.mid', '').split('_')

    # Try to identify BPM (last part should be BPM)
    bpm = parts.last
    bpm_folder = "#{bpm}BPM"

    # The rest forms the directory structure
    # We'll create a structure based on the genre and type pattern
    if parts.length >= 3
      # Extract genre (second part) and create folder structure
      name = parts[0]
      genre = parts[1]

      # Create directory path
      target_path = File.join(TARGET_DIR, genre, bpm_folder)
      FileUtils.mkdir_p(target_path)

      # Copy file to new location
      target_file = File.join(target_path, filename)
      FileUtils.cp(file_path, target_file)

      puts "Organized: #{filename} -> #{target_path}"
    else
      puts "Warning: Could not parse filename structure for: #{filename}"
    end
  end

  puts 'Organization complete!'
end

# Run the organization
organize_midi_files

