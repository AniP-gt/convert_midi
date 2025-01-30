## 使い方

### MIDIファイル変換

1.  **MIDIファイルの準備:**
    -   変換したいMIDIファイルを`MIDI Files`という名前のフォルダに格納してください。
    -   `MIDI Files`フォルダの中に、ジャンルごとのフォルダ（例: `Pop`, `Rock`）を作成し、その中にBPMごとのフォルダ（例: `110BPM`, `120BPM`）を作成して、MIDIファイルを格納してください。
    -   例：`MIDI Files/Pop/110BPM/sample.mid`

2.  **Docker環境の構築:**
    -   このリポジトリのルートディレクトリで、以下のコマンドを実行してDockerイメージをビルドし、コンテナを起動してください。
        ```bash
        docker-compose up --build
        ```
    -   初回はイメージのビルドに時間がかかる場合があります。

3.  **MIDIファイル変換スクリプトの実行:**
    -   `docker-compose.yml`の`command`を以下のように変更することで、MIDI変換スクリプトを実行できます。
        ```yaml
        command: /app/convert_midi.sh
        ```
    -   `docker-compose.yml`を編集後、以下のコマンドでコンテナを再起動してください。
        ```bash
        docker-compose up --build
        ```
    -   変換されたMIDIファイルは、`Covert MIDI Files`フォルダ内に、元のフォルダ構造を維持した状態で出力されます。

### MIDIファイルのリネーム

1.  **Docker環境の構築:**
    -   上記と同様にDocker環境を構築してください。

2.  **リネームスクリプトの実行:**
    -   `docker-compose.yml`の`command`が以下になっていることを確認してください。
        ```yaml
        command: ruby /app/rename_midi_file.rb
        ```
    -   `docker-compose.yml`を編集後、以下のコマンドでコンテナを再起動してください。
        ```bash
        docker-compose up --build
        ```
    -   `Covert MIDI Files`フォルダ内のMIDIファイルが、`[ジャンル名]_[BPMフォルダ名]_V_[ファイル名].mid`という形式でリネームされます。

### 注意点

-   `note_map.rb`でノートマップを編集することで、MIDIノートの変換ルールを変更できます。
-   `convert_midi.sh`は、`MIDI Files`フォルダ内のすべての`.mid`ファイルを変換します。
-   `rename_midi_file.rb`は、`Covert MIDI Files`フォルダ内のすべての`.mid`ファイルをリネームします。
