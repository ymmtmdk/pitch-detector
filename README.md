# musical pitch detector
## usage

```javascript
import { Note, Pitcher } from 'pitch-detector';

const hz = Pitcher.pitch(wave, sampleRate);
const note = new Note(hz);

console.log(hz, note.name());
```
