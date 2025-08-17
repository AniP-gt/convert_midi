require 'midilib'
require_relative './note_map'

def convert_midi(input_file, output_file, note_map)
  seq = MIDI::Sequence.new
  File.open(input_file, 'rb') do |file|
    seq.read(file)
  end

  seq.each do |track|
    track.each do |event|
      if event.is_a?(MIDI::NoteOn)
        original_note = event.note
        event.note = note_map[original_note] if note_map.key?(original_note)
      elsif event.is_a?(MIDI::NoteOff)
        original_note = event.note
        event.note = note_map[original_note] if note_map.key?(original_note)
      end
    end
  end

  File.open(output_file, 'wb') do |file|
    seq.write(file)
  end
end

if ARGV.length != 2
  puts 'Usage: ruby midi_converter.rb <input_midi_file> <output_midi_file>'
  exit
end

input_midi_file = ARGV[0]
output_midi_file = ARGV[1]

begin
  note_map = NOTE_MAP
  convert_midi(input_midi_file, output_midi_file, note_map)
  puts 'MIDI file converted successfully!'
rescue JSON::ParserError => e
  puts "Error parsing note map JSON: #{e.message}"
rescue StandardError => e
  puts "Error: #{e.message}"
end
