FROM ruby:3.2
WORKDIR /app
COPY . /app
COPY convert_midi.sh /app/convert_midi.sh
RUN gem install midilib fileutils
RUN chmod +x /app/convert_midi.sh && ls -l /app/convert_midi.sh
