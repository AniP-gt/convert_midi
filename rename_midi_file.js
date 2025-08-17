const fs = require("fs");
const path = require("path");

// MIDIファイルのルートディレクトリ
const ROOT_DIR = "Converted MIDI Files";

// フォルダ内のMIDIファイルをリネームするメソッド
function renameMidiFilesInFolder(bpmPath, groupName) {
  const files = fs.readdirSync(bpmPath);

  files.forEach((midiFile) => {
    if (midiFile.startsWith(".") || !midiFile.toLowerCase().endsWith(".mid")) {
      return;
    }

    // バリエーション名を取得（拡張子を除いた部分）
    const baseName = path.basename(midiFile, ".mid").replace(/ /g, "_");

    // 新しいファイル名を作成
    const newName = `${groupName}_V_${baseName}.mid`;
    const oldPath = path.join(bpmPath, midiFile);
    const newPath = path.join(bpmPath, newName);

    // ファイルをリネーム
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: '${midiFile}' -> '${newName}'`);
  });
}

// BPMフォルダごとに処理するメソッド
function processBpmFolders(genrePath, genreName) {
  const folders = fs.readdirSync(genrePath);

  folders.forEach((bpmFolder) => {
    if (bpmFolder.startsWith(".")) {
      return;
    }

    const bpmPath = path.join(genrePath, bpmFolder);
    if (!fs.statSync(bpmPath).isDirectory()) {
      return;
    }

    // グループ名を決定（例: "01_PoPp_01_Groove_110BPM"）
    const groupName = `${genreName}_${bpmFolder}`.replace(/ /g, "_");

    console.log(`Processing BPM folder: '${bpmPath}', Group: '${groupName}'`);

    // MIDIファイルのリネーム処理
    renameMidiFilesInFolder(bpmPath, groupName);
  });
}

// ルートディレクトリから処理を開始するメソッド
function processMidiFiles() {
  const genreFolders = fs.readdirSync(ROOT_DIR);

  genreFolders.forEach((genreFolder) => {
    if (genreFolder.startsWith(".")) {
      return;
    }

    const genrePath = path.join(ROOT_DIR, genreFolder);
    if (!fs.statSync(genrePath).isDirectory()) {
      return;
    }

    console.log(`Processing Genre folder: '${genrePath}'`);

    // BPMフォルダの処理
    processBpmFolders(genrePath, genreFolder);
  });
}

// スクリプト実行
console.log("Starting MIDI file processing...");
processMidiFiles();
console.log("Processing complete!");

