require 'fileutils'

# MIDIファイルのルートディレクトリ
ROOT_DIR = "Converted MIDI Files"

# フォルダ内のMIDIファイルをリネームするメソッド
def rename_midi_files_in_folder(bpm_path, group_name)
  Dir.foreach(bpm_path) do |midi_file|
    next if midi_file.start_with?('.') || !midi_file.downcase.end_with?('.mid')

    # バリエーション名を取得（拡張子を除いた部分）
    base_name = File.basename(midi_file, ".mid").gsub(" ", "_")

    # 新しいファイル名を作成
    new_name = "#{group_name}_V_#{base_name}.mid"
    old_path = File.join(bpm_path, midi_file)
    new_path = File.join(bpm_path, new_name)

    # ファイルをリネーム
    FileUtils.mv(old_path, new_path)
    p "Renamed: '#{midi_file}' -> '#{new_name}'"
  end
end

# BPMフォルダごとに処理するメソッド
def process_bpm_folders(genre_path, genre_name)
  Dir.foreach(genre_path) do |bpm_folder|
    next if bpm_folder.start_with?('.')

    bpm_path = File.join(genre_path, bpm_folder)
    next unless File.directory?(bpm_path)

    # グループ名を決定（例: "01_PoPp_01_Groove_110BPM"）
    group_name = "#{genre_name}_#{bpm_folder}".gsub(" ", "_")

    p "Processing BPM folder: '#{bpm_path}', Group: '#{group_name}'"

    # MIDIファイルのリネーム処理
    rename_midi_files_in_folder(bpm_path, group_name)
  end
end

# ルートディレクトリから処理を開始するメソッド
def process_midi_files
  Dir.foreach(ROOT_DIR) do |genre_folder|
    next if genre_folder.start_with?('.')

    genre_path = File.join(ROOT_DIR, genre_folder)
    next unless File.directory?(genre_path)

    p "Processing Genre folder: '#{genre_path}'"

    # BPMフォルダの処理
    process_bpm_folders(genre_path, genre_folder)
  end
end

# スクリプト実行
p "Starting MIDI file processing..."
process_midi_files
p "Processing complete!"
