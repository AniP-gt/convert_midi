import * as fs from "fs";
import * as path from "path";
import JZZ from "jzz";

// @ts-ignore - jzz-midi-smf has no types
const smf = require("jzz-midi-smf");
smf(JZZ);

// Note map type definition
type NoteMap = Record<number, number | null>;

async function convertMidi(
  inputFile: string,
  outputFile: string,
  noteMap: NoteMap
): Promise<void> {
  try {
    // Read the MIDI file
    const data: Buffer = fs.readFileSync(inputFile);
    // @ts-ignore - jzz-midi-smf has no types
const smf = new JZZ.MIDI.smf(data);

    // Process each track
    for (let i = 0; i < smf.length; i++) {
      const track = smf[i];

      for (let j: number = 0; j < track.length; j++) {
        const event = track[j];

        // Check if it's a Note On event (status byte 0x90-0x9F)
        if (event.isNoteOn()) {
          const originalNote: number = event.getNote();
          if (Object.prototype.hasOwnProperty.call(noteMap, originalNote)) {
            const newNote = noteMap[originalNote];
            if (newNote !== null) {
              event.setNote(newNote);
            }
          }
        }
        // Check if it's a Note Off event (status byte 0x80-0x8F)
        else if (event.isNoteOff()) {
          const originalNote: number = event.getNote();
          if (Object.prototype.hasOwnProperty.call(noteMap, originalNote)) {
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
    const err = error as Error;
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

// Command line argument processing
if (process.argv.length !== 4) {
  console.log(
    "Usage: node midi_converter.ts <input_midi_file> <output_midi_file>",
  );
  process.exit(1);
}

const inputMidiFile: string = process.argv[2];
const outputMidiFile: string = process.argv[3];

// Import the appropriate note map based on the file being processed
// You can modify this logic based on your needs
let noteMap: NoteMap;
try {
  // Default to modo_drum_note_map, but you can add logic to choose different maps
  const { NOTE_MAP } = require("./MidiMap/modo_drum_note_map") as {
    NOTE_MAP: NoteMap;
  };
  noteMap = NOTE_MAP;
} catch (error) {
  const err = error as Error;
  console.error(`Error loading note map: ${err.message}`);
  process.exit(1);
}

// Run the conversion
convertMidi(inputMidiFile, outputMidiFile, noteMap);