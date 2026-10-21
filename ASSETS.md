# Illustration assets

Mode: built-in ImageGen, two original illustrations, no reference images.

1. `public/images/steppe.png`

Prompt: “Use case: illustration-story. Asset type: wide hero illustration for a Kazakh language learning application. Create a beautiful refined editorial gouache and paper cut illustration of a peaceful Kazakh steppe, soft turquoise layered mountains, golden ochre sun, a small cream traditional yurt with subtle Kazakh ornament, terracotta path, sage green shrubs, a distant golden eagle. Minimal rounded shapes, subtle grain texture, contemporary children's book aesthetic appealing to all ages. Wide landscape 3:2 or wider. Restrained colors: warm ivory #f5f2e9, deep teal #175e54, sage #b8c9aa, ochre #e9b95e, terracotta #c57959. Composition: yurt and scene mostly right half, left half soft calm sky and rolling meadow with plenty of negative space. No text, no letters, no UI, no borders, no watermark. This will be the primary coherent illustration style for a learning app.”

2. `public/images/reading.png`

Prompt: “Use case: illustration-story. Create a refined editorial gouache and paper-cut illustration for a Kazakh language learning app's reading library. A cozy still life: open cream book with no visible writing, traditional two-string Kazakh dombra leaning nearby, a small ceramic tea cup and an apple on a warm wooden table beside a window overlooking the Kazakh steppe. A branch with leaves. Soft tactile paper grain, rounded organic simplified forms, warm ivory, sage green, deep teal, muted ochre and terracotta palette. Contemporary picture-book style, cohesive and calm, for all generations. Landscape composition. No text, no letters, no UI, no watermark.”

## Historical illustrations (v2)
Built-in ImageGen. Reference: public/images/steppe.png. All three use coherent editorial gouache and paper-cut textures, warm ivory, sage, teal, ochre and terracotta; no text or watermark. Artistic educational interpretations, not historical evidence.

- public/images/history-camp.png — peaceful fifteenth-century Zhetysu camp, yurts, river and distant horse riders, no weapons or violence.
- public/images/history-caravan.png — Silk Road camel caravan approaching an adobe Central Asian city, dome and open steppe.
- public/images/history-archive.png — quiet early twentieth-century Semey street, foreground desk, pen, blank papers and book, window onto steppe; no identifiable real person or historical document.

Golos Text and Noto Serif are bundled locally under OFL; Kazakh glyph coverage was checked. Unbounded and the former Manrope are not used in the v2 interface.

## Age-specific expansion (built-in ImageGen)

Project images are in `public/images/`. Reference image for all prompts: `public/images/steppe.png`, used only as a style reference. The following shared prompt was combined with each scene below:

“Use case: illustration-story. Create a wide landscape illustration for SÖZ Kazakh learning app. Use the attached image ONLY as style reference: refined editorial gouache and paper-cut, tactile grain, simplified organic forms, restrained warm ivory, sage, deep teal, ochre, terracotta. Match its painterly quality. Distinct new composition, full scene, no collage, no borders or watermarks.”

- `children-garden.png`: “A warm Kazakh grandmother and a young child gently planting three seeds in a little garden beside an apple tree, watering can, a tiny bird watching. Happy gentle educational children's book scene. No text.”
- `children-library.png`: “Cozy village children's library on a rainy day, Kazakh child holding an open picture book by a big window with raindrops, warm lamp, bookshelves and small dombra. Joyful calm storybook scene. No text.”
- `history-school.png`: “A nineteenth-century Kazakh steppe school: modest wooden classroom, teacher and several children studying with blank books, open door looking onto rolling steppe, thoughtful warm light. Educational artistic interpretation, no identifiable real historical person, no text.”
- `history-city.png`: “Ancient Otrar inspired Central Asian adobe city and towers seen from a peaceful orchard, distant caravan and irrigation channel, ochre masonry with teal dome. Educational historical interpretation, not documentary. No war, no text.”
- `history-dombra.png`: “A quiet Kazakh yurt interior, traditional two-string dombra beside a patterned woven rug and ceramic tea cups, open felt doorway onto mountains at golden hour, no people. No text.”
- `history-memory.png`: “Quiet Kazakh steppe memorial landscape: a simple unmarked stone, distant low hills and poppies bending in wind, muted sage and ivory sky, solemn but hopeful, no bodies, no weapons, no text, educational artistic interpretation.”
- `history-independence.png`: “A contemporary Kazakhstan city park with a single clear turquoise Kazakhstan flag with small gold sun and eagle emblem, families strolling under poplar trees, modern civic architecture far away, sunrise. Respectful educational artistic interpretation. No text.”

`children-snow-story.png` uses this complete prompt:
“Use case: illustration-story. Wide landscape illustration for SÖZ Kazakh learning app, use attached image only as style reference: editorial gouache and paper-cut, tactile grain, warm ivory, sage green, teal mountains, ochre sun, terracotta. A young Kazakh girl Ayala and her grandmother in a snowy village garden find a small terracotta knitted mitten INSIDE a little snow house the girl has built. Girl pointing at mitten, grandmother smiling beside her, apple tree and a wooden bench. Gentle realistic children's storybook, clear simple composition. No animals, no text, no letters, no watermark. Match painterly reference quality.”

Alternative `children-mitten.png` was generated with the shared prompt and: “One oversized warm terracotta knitted mitten on soft snow, a friendly rabbit, mouse and sparrow nestled near it, distant sage pine trees. Gentle magical fairy tale illustration for young children, not frightening. No text.” It is retained as an unused alternative: the actual SÖZ mitten story has human characters and uses `children-snow-story.png`.

All images were visually checked and copied into the project. `src/book-art.ts` maps cover and inline scenes to reading passages. They are artistic interpretations, not archival evidence. Simple question pictures are repo-native vectors in `src/ChildArt.tsx`, extending the existing `Art.tsx` system; these are semantic teaching illustrations rather than generated raster substitutes.

## Illustration polish — 20 October 2026
Lesson art is local SVG: consistent 2.5 px green outlines, muted terracotta/sage/ochre; thanks uses the original heart, greeting a speech bubble, farewell an open door. Shared across age groups.

children-bird.png — built-in ImageGen, children-garden.png as style reference only. Prompt: New landscape 3:2 Kazakh children’s-book gouache on textured paper, muted sage/teal/ochre/terracotta; a small sparrow beside seeds and a blooming flower in a sunny garden, wooden fence and distant teal foothills. Ground-level composition, no people, hands or writing; natural anatomy, no glossy 3D or clutter. Used in Little Bird and Grandmother’s Garden.

children-dombra.png — built-in ImageGen, children-garden.png as style reference only. Prompt: A new landscape 3:2 warm traditional gouache picture-book illustration on textured ivory paper, muted teal, sage, ochre and terracotta. A wooden Kazakh dombra resting on a woven patterned cushion beside a low round table with a tea bowl, sunlit window and distant foothills. Cozy room corner, restrained ornament, no people, hands, lettering, glossy 3D or clutter. Long thin neck and small pear-shaped wooden body. Used in Quiet Dombra, paired with a different interior illustration.

## Halyk.Soz — child historical story pages
Generated with built-in ImageGen. children-garden.png was a style reference only. Nine separate landscape 3:2 gouache illustrations: muted sage/teal/ochre/terracotta on textured ivory, no lettering, gentle scenes, no violence. These assets are attached only to child-only stories, one distinct image per page. Artistic reconstructions, not archival evidence or exact portraits.

- child-history-khanate-1.png: The journey: a small peaceful group of Kazakh families with pack horses walking through the wide Chu valley in the mid-15th century, distant river and foothills. No battle, weapons or modern objects. Wide scene of the journey, not close-up portraits.

- child-history-khanate-2.png: The new settlement: mid-15th-century Kazakh families raising a felt yurt beside the Chu river in Zhetysu, wooden lattice frame and felt covering, children helping carry a small rolled rug. No modern objects, flags, weapons or battle.

- child-history-khanate-3.png: The gathering: Kerey and Zhanibek represented as two respectfully dressed Kazakh leaders in restrained mid-15th century robes and headwear, meeting community elders outside a yurt in Zhetysu. Peaceful gathering about a shared homeland. Imagined educational scene, not asserted authentic portraits. No crowns, weapons, modern flags or ornate fantasy.

- child-history-school-1.png: Turgai steppe in 1864, a modest single-storey school building of the period, winter snow on the ground, children in simple mid-19th-century Kazakh clothing arriving with small books, a welcoming male Kazakh teacher in a dark traditional coat by the door. No modern supplies, no writing.

- child-history-school-2.png: Inside a modest Turgai classroom in 1864: Kazakh educator Ybyrai Altynsarin represented respectfully as a dark-haired teacher with modest moustache in a dark coat, beside a plain dark slate board with NO writing, two children at wooden desks holding open books. Period plausible, no modern furniture, no fantasy.

- child-history-school-3.png: Close still-life inside a modest 19th-century school: an open book with abstract unlettered lines, slate, wooden counting beads and inkpot on a wooden desk, window overlooking the winter steppe, warm hopeful sunlight. No legible writing, no modern objects.

- child-history-republic-1.png: A child-friendly imagined educational scene of Kazakhstan's 1990 declaration: a dignified Soviet-era civic assembly hall with several distant seated delegates and a plain paper document on a wooden desk foreground. Do NOT include modern Kazakhstan flag or modern Astana skyline. No legible words, no portraits of identified politicians. Warm calm hopeful educational scene.

- child-history-republic-2.png: Today's Kazakhstan: two Kazakh children in a cozy home looking with a grandmother at a simple outline map of Kazakhstan in an open picture book, a blue Kazakhstan flag on a small stand nearby, sunlight, patterned woven cushion. No writing, no extraneous fingers. Three people only.

- child-history-republic-3.png: Today's Republic Day in Kazakhstan: diverse families and children walking in a leafy autumn city park, blue Kazakhstan flag with gold sun/eagle flying on a pole, warm ochre leaves, clean contemporary architecture far away. Calm family celebration, no crowd, no text, no fireworks. Distinct wide composition.

## Halyk.Soz — child historical story pages
Generated with built-in ImageGen. children-garden.png was a style reference only. Nine separate landscape 3:2 gouache illustrations: muted sage/teal/ochre/terracotta on textured ivory, no lettering, gentle scenes, no violence. These assets are attached only to child-only stories, one distinct image per page. Artistic reconstructions, not archival evidence or exact portraits.

- child-history-khanate-1.png: The journey: a small peaceful group of Kazakh families with pack horses walking through the wide Chu valley in the mid-15th century, distant river and foothills. No battle, weapons or modern objects. Wide scene of the journey, not close-up portraits.

- child-history-khanate-2.png: The new settlement: mid-15th-century Kazakh families raising a felt yurt beside the Chu river in Zhetysu, wooden lattice frame and felt covering, children helping carry a small rolled rug. No modern objects, flags, weapons or battle.

- child-history-khanate-3.png: The gathering: Kerey and Zhanibek represented as two respectfully dressed Kazakh leaders in restrained mid-15th century robes and headwear, meeting community elders outside a yurt in Zhetysu. Peaceful gathering about a shared homeland. Imagined educational scene, not asserted authentic portraits. No crowns, weapons, modern flags or ornate fantasy.

- child-history-school-1.png: Turgai steppe in 1864, a modest single-storey school building of the period, winter snow on the ground, children in simple mid-19th-century Kazakh clothing arriving with small books, a welcoming male Kazakh teacher in a dark traditional coat by the door. No modern supplies, no writing.. Correction: Keep this illustration's painting style and modest school doorway, but correct the history and geography: Turgai is FLAT STEPPE, remove every mountain and replace distant background by a flat snowy horizon. All arriving pupils in this 1864 school scene should be boys in modest period clothes: replace the girl in red headscarf with a boy in a muted red coat and fur cap. The teacher and four pupils remain, no new people. No text. Preserve warm gouache quality.

- child-history-school-2.png: Inside a modest Turgai classroom in 1864: Kazakh educator Ybyrai Altynsarin represented respectfully as a dark-haired teacher with modest moustache in a dark coat, beside a plain dark slate board with NO writing, two children at wooden desks holding open books. Period plausible, no modern furniture, no fantasy.. Correction: Preserve the existing gouache painting style, teacher and modest wooden classroom. Correct geography: outside the window must be FLAT snow-covered Turgai STEPPE with a low horizon, absolutely NO mountains. Replace the pupil on the right (girl with braids) with a boy in a restrained brown vest and short hair, because this scene depicts the boys' school of 1864. Two boy pupils and teacher, no new people. No writing on board. Gentle warm illustration.

- child-history-school-3.png: Close still-life inside a modest 19th-century school: an open book with abstract unlettered lines, slate, wooden counting beads and inkpot on a wooden desk, window overlooking the winter steppe, warm hopeful sunlight. No legible writing, no modern objects.. Correction: Preserve painting style, composition, books, slate, inkpot and counting beads. Remove the child entirely, making this a still-life of learning materials on an empty classroom desk. Outside the window replace mountains with a FLAT snowy Turgai steppe and a modest distant yurt, absolutely no mountains. No people and no writing.

- child-history-republic-1.png: A child-friendly imagined educational scene of Kazakhstan's 1990 declaration: a dignified Soviet-era civic assembly hall with several distant seated delegates and a plain paper document on a wooden desk foreground. Do NOT include modern Kazakhstan flag or modern Astana skyline. No legible words, no portraits of identified politicians. Warm calm hopeful educational scene.. Correction: Preserve only the warm gouache picture-book STYLE and a wooden desk. Completely replace scene with an educational STILL LIFE: an important unlettered cream paper document, a fountain pen and a closed dark folder on a simple wooden civic office desk, with a very small distant row of empty wooden assembly seats softly visible in the background. Kazakhstan in 1990, restrained Soviet-era office interior. NO people at all, NO flags, NO state emblems, NO sun murals, NO golden palace decorations, NO mountains or windows with landscapes, NO legible lettering. This must NOT depict a child signing or witnessing a government document. Calm dignified intimate composition.

- child-history-republic-2.png: Today's Kazakhstan: two Kazakh children in a cozy home looking with a grandmother at a simple outline map of Kazakhstan in an open picture book, a blue Kazakhstan flag on a small stand nearby, sunlight, patterned woven cushion. No writing, no extraneous fingers. Three people only.

- child-history-republic-3.png: Today's Republic Day in Kazakhstan: diverse families and children walking in a leafy autumn city park, blue Kazakhstan flag with gold sun/eagle flying on a pole, warm ochre leaves, clean contemporary architecture far away. Calm family celebration, no crowd, no text, no fireworks. Distinct wide composition.

Serving optimisation: the nine child-history PNG originals are exported to WebP at quality 86 without cropping or composition changes. The application serves the WebP files; PNG originals are retained.

## Leisure reading — 21 October 2026
Four new built-in ImageGen illustrations using children-garden.png as a style reference only: textured paper gouache, sage/teal/ochre/terracotta, no text or glossy 3D. Original PNG retained, application serves WebP quality 86. Artistic interpretation, not archaeological evidence or precise instrument documentation.
- leisure-korkyt.webp: A quiet symbolic legend scene: a traditional Kazakh qyl-qobyz bowed instrument resting upright on felt near the Syr Darya river, bow laid alongside, tall reeds and flat steppe horizon, no mountains. The instrument has an open skin-covered wooden bowl and long neck, two horsehair strings, not a guitar. A warm sunset, thoughtful atmosphere. No people, no grave imagery.
- leisure-samruk.webp: A majestic mythical Samruk bird with warm ochre-gold plumage and wings partly open, protecting a small nest in a towering old tree above the steppe, distant dark earth below and luminous sky above. A literary fairy-tale image, not an animal photograph. Gentle noble bird anatomy, no monsters, no battle, no text or modern monuments.
- leisure-nauryz.webp: A welcoming Nauryz spring dastarkhan still-life outside a yurt: woven rug, low wooden table, bowl of nauryz kozhe, baursak, ceramic tea bowls and small green sprigs, soft spring steppe beyond. No people or hands, no writing, no modern plastic, restrained authentic ornament. Natural food shapes, warm morning light.
- leisure-turkestan.webp: A historically respectful artistic view of the Khoja Ahmed Yasawi mausoleum in Turkestan: monumental brick portal with deep arched recess and turquoise dome behind it, low flat steppe horizon, warm earthy brick, sparse small trees, no mountains, no fantasy palace, no minarets invented next to facade, no people, no writing. Calm architecture-focused landscape.

## Kazakh audio — 21 October 2026
1536 MP3 clips, 93.6 minutes, voice kk-KZ-AigulNeural via edge-tts / Microsoft Edge read-aloud. Texts are app-authored vocabulary, lesson phrases, instructions and reading sentences. No user account data was submitted for synthesis. Audio map: public/audio/manifest.json. Source generation rate -8%; player offers 1x and 0.8x. See AUDIO.md.
