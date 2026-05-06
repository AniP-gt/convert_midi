import * as fs from "fs";
import * as path from "path";

// MIDIファイルのルートディレクトリ
const ROOT_DIR: string = "Converted MIDI Files";

// フォルダ内のMIDIファイルをリネームするメソッド
function renameMidiFilesInFolder(bpmPath: string, groupName: string): void {
  const files: string[] = fs.readdirSync(bpmPath);

  files.forEach((midiFile: string) => {
    if (midiFile.startsWith(".") || !midiFile.toLowerCase().endsWith(".mid")) {
      return;
    }

    // バリエーション名を取得（拡張子を除いた部分）
    const baseName: string = path.basename(midiFile, ".mid").replace(/ /g, "_");

    // 新しいファイル名を作成
    const newName: string = `${groupName}_V_${baseName}.mid`;
    const oldPath: string = path.join(bpmPath, midiFile);
    const newPath: string = path.join(bpmPath, newName);

    // ファイルをリネーム
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: '${midiFile}' -> '${newName}'`);
  });
}

// BPMフォルダごとに処理するメソッド
function processBpmFolders(genrePath: string, genreName: string): void {
  const folders: string[] = fs.readdirSync(genrePath);

  folders.forEach((bpmFolder: string) => {
    if (bpmFolder.startsWith(".")) {
      return;
    }

    const bpmPath: string = path.join(genrePath, bpmFolder);
    if (!fs.statSync(bpmPath).isDirectory()) {
      return;
    }

    // グループ名を決定（例: "01_PoPp_01_Groove_110BPM"）
    const groupName: string = `${genreName}_${bpmFolder}`.replace(/ /g, "_");

    console.log(`Processing BPM folder: '${bpmPath}', Group: '${groupName}'`);

    // MIDIファイルのリネーム処理
    renameMidiFilesInFolder(bpmPath, groupName);
  });
}

// ルートディレクトリから処理を開始するメソッド
function processMidiFiles(): void {
  const genreFolders: string[] = fs.readdirSync(ROOT_DIR);

  genreFolders.forEach((genreFolder: string) => {
    if (genreFolder.startsWith(".")) {
      return;
    }

    const genrePath: string = path.join(ROOT_DIR, genreFolder);
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