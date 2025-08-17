const NOTE_MAP = {
  99: null,  // [Empty]
  33: 47,   // Clap - Solo
  34: 47,   // Clap - Multi
  31: 96,   // Tambourine - Tap
  29: 100,  // Cowbell Hi - Open
  28: 100,  // Cowbell Low - Muted
  27: 100,  // Cowbell Low - Open
  30: 100,  // Cowbell Hi - Muted
  32: 96,   // Tambourine - Shake
  26: 90,   // Splash - Choke
  59: 89,   // Splash - Edge
  25: 82,   // China - Choke
  57: 81,   // China - Edge
  58: 81,   // China - Tip
  22: 80,   // High Crash - Choke
  50: 79,   // High Crash - Bell
  48: 79,   // High Crash - Tip
  49: 79,   // High Crash - Edge
  24: 78,   // Low Crash - Choke
  55: 77,   // Low Crash - Edge
  56: 77,   // Low Crash - Bell
  54: 77,   // Low Crash - Tip
  23: 63,   // Ride - Choke
  53: 61,   // Ride - Bell
  52: 62,   // Ride - Edge
  51: 60,   // Ride - Tip
  72: 66,   // Tom 3 - Rim Only (double)
  88: 65,   // Tom 3 - Center L (double)
  89: 65,   // Tom 3 - Center R (double)
  91: 67,   // Tom 3 - Center L
  93: 67,   // Tom 3 - Center R
  65: 66,   // Tom 3 - Rimshot (double)
  67: 68,   // Tom 3 - Rimshot
  43: 67,   // Tom 3 - Center L/R
  41: 65,   // Tom 3 - Center L/R (double)
  95: 69,   // Tom 2 - Center L
  74: 70,   // Tom 2 - Rim Only
  69: 70,   // Tom 2 - Rimshot
  96: 69,   // Tom 2 - Center R
  71: 72,   // Tom 1 - Rimshot
  98: 71,   // Tom 1 - Center R
  100: 71,  // Tom 1 - Center R
  75: 72,   // Tom 1 - Rim Only
  79: 54,   // Open Hihat - Loose
  77: 56,   // Open Hihat - 1/2
  76: 55,   // Open Hihat - 1/4
  46: 54,   // Open Hihat - Control
  70: 53,   // Open Hihat - Pedal
  80: 57,   // Open Hihat - Full
  97: 50,   // Closed Hihat - Shank R
  87: 50,   // Closed Hihat - Tight Tip R
  92: 50,   // Closed Hihat - Tip R
  85: 50,   // Closed Hihat - Tight Tip L
  90: 50,   // Closed Hihat - Tip L
  94: 50,   // Closed Hihat - Shank L
  42: 52,   // Closed Hihat - Tip L/R
  66: 52,   // Closed Hihat - Tight Tip L/R
  44: 48,   // Closed Hihat - Pedal
  81: 40,   // Snare - Center L
  83: 40,   // Snare - Center R
  84: 40,   // Snare - Halfway L
  86: 40,   // Snare - Halfway R
  64: 40,   // Snare - Wires Off
  62: 40,   // Snare Flam
  40: 40,   // Snare - Halfway L/R
  38: 38,   // Snare - Center L/R
  37: 42,   // Snare - Sidestick
  61: 37,   // Snare - Rim Only
  39: 37,   // Snare - Rimshot
  35: 42,   // Stick - Hit
  63: 38,   // Snare - Roll
  60: 36,   // Kick - Open
  36: 36    // Kick - Dampened
};

module.exports = { NOTE_MAP };