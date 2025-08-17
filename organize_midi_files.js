#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const SOURCE_DIR = "Converted MIDI Files";
const TARGET_DIR = "Organized MIDI Files";

function organizeMidiFiles() {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  // Get all MIDI files
  const midiFiles = fs
    .readdirSync(SOURCE_DIR)
    .filter((file) => file.toLowerCase().endsWith(".mid"))
    .map((file) => path.join(SOURCE_DIR, file));

  console.log(`Found ${midiFiles.length} MIDI files to organize`);

  midiFiles.forEach((filePath) => {
    const filename = path.basename(filePath);

    // Parse filename components
    // Example: Ace_Soul__ClosedHH_8_4-4_102.mid
    // Pattern: Name_Genre_Type_Instrument_Bars_TimeSignature_BPM.mid

    // Split by underscore but handle double underscores
    const parts = filename.replace(".mid", "").split("_");

    // Try to identify BPM (last part should be BPM)
    const bpm = parts[parts.length - 1];
    const bpmFolder = `${bpm}BPM`;

    // The rest forms the directory structure
    // We'll create a structure based on the genre and type pattern
    if (parts.length >= 3) {
      // Extract genre (second part) and create folder structure
      const name = parts[0];
      const genre = parts[1];

      // Create directory path
      const targetPath = path.join(TARGET_DIR, genre, bpmFolder);
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }

      // Copy file to new location
      const targetFile = path.join(targetPath, filename);
      fs.copyFileSync(filePath, targetFile);

      console.log(`Organized: ${filename} -> ${targetPath}`);
    } else {
      console.log(
        `Warning: Could not parse filename structure for: ${filename}`,
      );
    }
  });

  console.log("Organization complete!");
}

// Run the organization
organizeMidiFiles();

