const fs = require("fs");
const path = require("path");
const JZZ = require("jzz");
const { SMF } = require("jzz-midi-smf");
SMF(JZZ);

async function convertMidi(inputFile, outputFile, noteMap) {
  try {
    // Read the MIDI file
    const data = fs.readFileSync(inputFile);
    const smf = new JZZ.MIDI.SMF(data);

    // Process each track
    for (let i = 0; i < smf.length; i++) {
      const track = smf[i];

      for (let j = 0; j < track.length; j++) {
        const event = track[j];

        // Check if it's a Note On event (status byte 0x90-0x9F)
        if (event.isNoteOn()) {
          const originalNote = event.getNote();
          if (noteMap.hasOwnProperty(originalNote)) {
            const newNote = noteMap[originalNote];
            if (newNote !== null) {
              event.setNote(newNote);
            }
          }
        }
        // Check if it's a Note Off event (status byte 0x80-0x8F)
        else if (event.isNoteOff()) {
          const originalNote = event.getNote();
          if (noteMap.hasOwnProperty(originalNote)) {
            const newNote = noteMap[originalNote];
            if (newNote !== null) {
              event.setNote(newNote);
            }
          }
        }
      }
    }

    // Write the modified MIDI file
    fs.writeFileSync(outputFile, smf.dump());
    console.log("MIDI file converted successfully!");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Command line argument processing
if (process.argv.length !== 4) {
  console.log(
    "Usage: node midi_converter.js <input_midi_file> <output_midi_file>",
  );
  process.exit(1);
}

const inputMidiFile = process.argv[2];
const outputMidiFile = process.argv[3];

// Import the appropriate note map based on the file being processed
// You can modify this logic based on your needs
let noteMap;
try {
  // Default to modo_drum_note_map, but you can add logic to choose different maps
  const { NOTE_MAP } = require("./MidiMap/modo_drum_note_map.js");
  noteMap = NOTE_MAP;
} catch (error) {
  console.error(`Error loading note map: ${error.message}`);
  process.exit(1);
}

// Run the conversion
convertMidi(inputMidiFile, outputMidiFile, noteMap);

