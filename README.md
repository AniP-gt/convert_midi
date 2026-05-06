## 使い方

### 準備

1.  依存関係をインストール:
    ```bash
    npm install
    ```

### MIDIファイル変換

1.  **MIDIファイルの準備:**
    -   変換したいMIDIファイルを`MIDI Files`という名前のフォルダに格納してください。
    -   `MIDI Files`フォルダの中に、ジャンルごとのフォルダ（例: `Pop`, `Rock`）を作成し、その中にBPMごとのフォルダ（例: `110BPM`, `120BPM`）を作成して、MIDIファイルを格納してください。
    -   例：`MIDI Files/Pop/110BPM/sample.mid`

2.  **変換スクリプトの実行:**
    ```bash
    npm run convert:ts
    ```
    -   変換されたMIDIファイルは、`Converted MIDI Files`フォルダ内に、元のフォルダ構造を維持した状態で出力されます。

### MIDIファイルのリネーム

```bash
npm run rename:ts
```
-   `Converted MIDI Files`フォルダ内のMIDIファイルが、`[ジャンル名]_[BPMフォルダ名]_V_[ファイル名].mid`という形式でリネームされます。

### MIDIファイルの整理

```bash
npm run organize:ts
```
-   `Converted MIDI Files`フォルダ内のMIDIファイルをジャンルごとに整理します。

### ノートマップの編集

-   `MidiMap/modo_drum_note_map.ts`を編集して、MIDIノートの変換ルールを変更できます。
-   Studio Drummerの場合は`MidiMap/studio_drummer_note_map.ts`を使用してください。