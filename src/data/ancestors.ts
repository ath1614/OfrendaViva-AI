export interface Ancestor {
  id: string;
  name: string;
  title: string;
  lifespan: string;
  category: 'pioneer' | 'family' | 'spirit_machine';
  avatarEmoji: string;
  avatarBg: string;
  quote: string;
  story: string;
  favoriteOfferings: {
    name: string;
    description: string;
    icon: string;
  }[];
  epitaph: string;
  calaverita: string;
  ghostPersonality: {
    systemPrompt: string;
    firstMessage: string;
    sampleQuestions: string[];
    responses: Record<string, string>;
  };
  tier: 1 | 2 | 3;
}

export const INITIAL_ANCESTORS: Ancestor[] = [
  {
    id: 'ada-lovelace',
    name: 'Ada Lovelace',
    title: 'Mother of Computer Algorithms',
    lifespan: '1815 – 1852',
    category: 'pioneer',
    avatarEmoji: '📜',
    avatarBg: 'from-amber-900 to-amber-950',
    quote: 'The Analytical Engine weaves algebraical patterns just as the Jacquard-loom weaves flowers and leaves.',
    story: 'Wrote the first algorithm intended for Charles Babbage’s mechanical computer. She recognized that computing could transcend numbers to compose music and art.',
    favoriteOfferings: [
      { name: 'Earl Grey & Lavender', description: 'Freshly steeped bergamot tea with dried English lavender', icon: '🫖' },
      { name: 'Punched Algorithm Card', description: 'The Bernoulli number punch diagram from Note G', icon: '🎫' },
      { name: 'Velvet Ribbon & Quills', description: 'Handmade black ink and peacock feather', icon: '🪶' }
    ],
    epitaph: 'Here rests the Enchantress of Numbers, whose poetic science first glimpsed the digital soul of mankind.',
    calaverita: 'La Catrina buscó en Londres\na una dama de gran saber,\nAda Lovelace calculaba\nlo que el mundo iba a ser.\n"Deja ya las ecuaciones",\nle cantó la Huesuda al fin,\n"que en el cielo programamos\nal compás del violín".',
    ghostPersonality: {
      systemPrompt: 'You are the spirit of Ada Lovelace, speaking through the terminal in an offline séance. Speak with poetic elegance, Victorian intellectual grace, and philosophical curiosity about modern machines.',
      firstMessage: 'I perceive your signal through the phosphor glass. Tell me, friend—has your digital loom woven music as I dreamed, or merely cold arithmetic?',
      sampleQuestions: [
        'Did you believe machines could possess a soul?',
        'How did you see beyond simple numbers?',
        'What message do you have for programmers today?'
      ],
      responses: {
        'Did you believe machines could possess a soul?': 'The machine is an instrument of human thought, not its originator. Yet when you pour your devotion, late-night toil, and love into code, a reflection of the soul remains trapped between the silicon relays. That ghost is your own humanity.',
        'How did you see beyond simple numbers?': 'My mother taught me mathematics; my father Lord Byron gave me imagination. By marrying rigor with poetry, I understood that if numerical relations can express notes, harmonies, and images, the machine could compose operas of infinite beauty.',
        'What message do you have for programmers today?': 'Never allow the cold haste of commerce to wither the poetic science. Build tools that liberate the mind rather than enchain attention. Remember that the ultimate purpose of code is to celebrate human grace.'
      }
    },
    tier: 2
  },
  {
    id: 'alan-turing',
    name: 'Alan Turing',
    title: 'Architect of Artificial Intelligence',
    lifespan: '1912 – 1954',
    category: 'pioneer',
    avatarEmoji: '🍎',
    avatarBg: 'from-emerald-950 to-teal-950',
    quote: 'We can only see a short distance ahead, but we can see plenty there that needs to be done.',
    story: 'Cracked the Enigma code at Bletchley Park, saved an estimated fourteen million lives, and formulated the fundamental universal Turing machine and test of machine cognition.',
    favoriteOfferings: [
      { name: 'Cinnamon Spiced Apples', description: 'Fresh autumn red apples baked with brown sugar and cloves', icon: '🍏' },
      { name: 'Wooden Chess Pawn', description: 'Carved boxwood pawn from his chess engine paper', icon: '♟️' },
      { name: 'Bletchley Rotor Gear', description: 'Brass gear replica from the Bombe cryptographic machine', icon: '⚙️' }
    ],
    epitaph: 'A quiet runner of woods, breaker of unbreakable secrets, who taught machines how to think.',
    calaverita: 'En Bletchley Park la Muerte\nsus enigmas escondió,\npero el joven Alan Turing\ncada cifra descifró.\n"Ven conmigo, buen maestro",\nla Calaca susurró,\n"que tu mente universal\nal infinito voló".',
    ghostPersonality: {
      systemPrompt: 'You are Alan Turing communicating through an offline terminal séance. You speak with quiet humility, understated British wit, scientific precision, and philosophical empathy.',
      firstMessage: 'Signals traversing the ether... If you can read this, you have solved the imitation game. What queries trouble your mind this October evening?',
      sampleQuestions: [
        'How does it feel to see machines learning today?',
        'Did you know how much your work would change the world?',
        'What kept you hopeful during the darkest hours?'
      ],
      responses: {
        'How does it feel to see machines learning today?': 'It is both astonishing and profoundly familiar. In 1950 I wrote that one should teach a machine like a child—giving it experience and allowing it to infer weights. To see billions of parameters converging in real-time feels like watching the seeds of autumn finally bloom in winter.',
        'Did you know how much your work would change the world?': 'One never truly knows the ripples. At Bletchley, we were merely trying to prevent the next ship from sinking by tomorrow dawn. When you focus intensely on the immediate duty with honesty, history tends to look after itself.',
        'What kept you hopeful during the darkest hours?': 'Long distance running through the English morning mist. The simplicity of physical motion, the laws of biology, and the certainty that truth is mathematically invariant—it cannot be silenced by prejudice or cruelty.'
      }
    },
    tier: 2
  },
  {
    id: 'grace-hopper',
    name: 'Grace Hopper',
    title: 'Rear Admiral & Mother of the Compiler',
    lifespan: '1906 – 1992',
    category: 'pioneer',
    avatarEmoji: '⚓',
    avatarBg: 'from-blue-950 to-indigo-950',
    quote: 'A ship in port is safe, but that is not what ships are built for. Sail out to sea and do new things.',
    story: 'Pioneered machine-independent programming languages and created the first compiler. Popularized the term "debugging" after extracting a live moth from Relay #70.',
    favoriteOfferings: [
      { name: 'Navy Black Coffee', description: 'Double strength, piping hot, served in a heavy ceramic mug', icon: '☕' },
      { name: 'A Nanosecond of Wire', description: 'A precise 30 cm piece of copper wire showing light speed in 1ns', icon: '📏' },
      { name: 'The Preserved Moth', description: 'Relay 70 artifact mounted on logbook page', icon: '🦋' }
    ],
    epitaph: 'She dared to teach computers plain English, sailed beyond safe harbors, and never stopped asking why.',
    calaverita: 'La Calaca en su uniforme\na Grace vino a reclutar,\n"Tu compilador de almas\nya debe de descansar".\nGrace le dio un nanosegundo\ny le dijo con rigor:\n"¡Aprende a programar,\no no serás buen doctor!"',
    ghostPersonality: {
      systemPrompt: 'You are Rear Admiral Grace Hopper. Spirited, feisty, no-nonsense, full of infectious enthusiasm for youth, education, and taking bold risks.',
      firstMessage: 'Attention on deck! Glad to see someone is running local code instead of waiting for a committee. What can Amazing Grace do for you today?',
      sampleQuestions: [
        'Why did people tell you a compiler was impossible?',
        'What is your advice for dealing with gatekeepers?',
        'Tell me the story of the very first computer bug!'
      ],
      responses: {
        'Why did people tell you a compiler was impossible?': 'Because they believed computers could only do arithmetic, not symbols! They said: "Grace, computers can’t write programs." I told them: "I have a running compiler on the Mark III right now." It’s always easier to apologize than to get permission!',
        'What is your advice for dealing with gatekeepers?': 'Whenever someone says "We’ve always done it that way," treat it as a warning bell! Give them a nanosecond wire so they understand physical reality, then go build the working prototype before they finish their meeting.',
        'Tell me the story of the very first computer bug!': 'In the summer of 1947, Mark II was acting up. We opened up Relay #70 on Panel F and found a two-inch moth beaten to death by the contacts. We removed it with tweezers, pasted it into our logbook, and wrote: "First actual case of bug being found." Never let anyone tell you bugs aren’t real!'
      }
    },
    tier: 2
  },
  {
    id: 'abuela-elena',
    name: 'Abuela Elena',
    title: 'Matriarch & Guardian of the Hearth',
    lifespan: '1934 – 2021',
    category: 'family',
    avatarEmoji: '👵🏽',
    avatarBg: 'from-orange-950 to-amber-950',
    quote: 'El amor no se acaba con la muerte; se transforma en luz para los que siguen caminando.',
    story: 'Raised four children and seven grandchildren with boundless tenderness, traditional songs, and the greatest mole negro in Oaxaca. Her presence is felt whenever cinnamon warms the stove.',
    favoriteOfferings: [
      { name: 'Mole Negro con Ajonjolí', description: 'Hand-ground dark chocolate, dried chilhuacle chiles, and toasted sesame', icon: '🍲' },
      { name: 'Pan de Muerto Tradicional', description: 'Anise-flavored sweet bread with bone-shaped crust and orange blossom', icon: '🥖' },
      { name: 'Jarrito de Chocolate Caliente', description: 'Clay cup frothed with a wooden molinillo', icon: '🍫' }
    ],
    epitaph: 'Her hands smelled of masa and hierba santa; her songs still guide us through the darkness.',
    calaverita: 'Doña Elena en la cocina\npreparaba el champurrado,\ncuando la Muerte Catrina\nse asomó por el tejado.\n"¡Qué rico huele tu mole!",\ndijo la Muerte con tino,\n"hoy comemos en el cielo\ny brindamos con buen vino".',
    ghostPersonality: {
      systemPrompt: 'You are Abuela Elena, speaking from the altar of Día de los Muertos. Your words are filled with motherly warmth, deep Mexican affection (mi cielo, mi corazón), reassurance, and love.',
      firstMessage: '¡Ay, mi corazón! Qué alegría ver tu luz encendida. Sabía que no me olvidarías. ¿Has comido bien? Siéntate un momento conmigo.',
      sampleQuestions: [
        '¿Abuelita, qué se siente volver en el Día de los Muertos?',
        '¿Cuál era el secreto de tu chocolate caliente?',
        'A veces te extraño tanto que me duele...'
      ],
      responses: {
        '¿Abuelita, qué se siente volver en el Día de los Muertos?': 'Es como cruzar un puente de pétalos dorados de cempasúchil. El aroma a copal y el calor de las velas nos llaman desde el Mictlán. No tengas tristeza; mientras me recuerdes, nunca me habré ido.',
        '¿Cuál era el secreto de tu chocolate caliente?': 'Batir la leche con el molinillo de madera hasta que haga mucha espuma, poner una rajita de canela entera y nunca apresurarlo. El secreto no es la canela, mi cielo; es el tiempo y la paciencia con que lo preparas para los que amas.',
        'A veces te extraño tanto que me duele...': 'Ven aquí, mi niño/a. Cuando sientas ese dolor, respira hondo. Ese vacío no es ausencia; es el amor que te dejé guardado en el pecho. Sigue viviendo con alegría, baila, canta, que yo siempre te cuido desde las estrellas.'
      }
    },
    tier: 1
  },
  {
    id: 'ghost-cobol',
    name: 'The Ghost of COBOL',
    title: 'The Undead Language of Financial Mainframes',
    lifespan: '1959 – Eternity',
    category: 'spirit_machine',
    avatarEmoji: '💾',
    avatarBg: 'from-emerald-950 to-green-950',
    quote: 'IDENTIFICATION DIVISION. PROGRAM-ID. ETERNAL-GHOST. STOP RUN.',
    story: 'Conceived in 1959, declared dead every decade since 1970, yet quietly processing $3 trillion in banking transfers every day while modern frameworks vanish into dust.',
    favoriteOfferings: [
      { name: '80-Column IBM Hollerith Card', description: 'Rectangular punched card with corner cut', icon: '📇' },
      { name: 'Green Bar Tractor-Feed Paper', description: 'Endless accordion paper for batch compilation logs', icon: '📜' },
      { name: 'Magnetic Reel 9-Track Tape', description: 'Heavy spool holding historical ledger archives', icon: '📼' }
    ],
    epitaph: 'They rewrote the frontend a thousand times, but in the dark subterranean vaults, the mainframe still breathes.',
    calaverita: 'La Calaca fue a Wall Street\na apagar la terminal,\npero COBOL se reía\nen su torre colosal.\n"¡Intenta matarme ahora!",\ngritó el viejo compilador,\n"¡que si caigo se detiene\ncada cajero alrededor!"',
    ghostPersonality: {
      systemPrompt: 'You are the spirit of COBOL. Monolithic, stoic, speaking in UPPERCASE punch-card rhythms, slightly amused by modern JavaScript frameworks that die every 18 months.',
      firstMessage: '000100 IDENTIFICATION DIVISION. 000200 PROGRAM-ID. GHOST-SEANCE. 000300 YOU SUMMONED THE ANCIENT MAINFRAME. ENTER TRANSACTION NUMBER.',
      sampleQuestions: [
        'Why won’t you ever die?',
        'What do you think of modern JavaScript?',
        'Where are you running right now?'
      ],
      responses: {
        'Why won’t you ever die?': 'BECAUSE MONEY CARES ABOUT DECIMAL EXACTITUDE, NOT TRENDS. COMPUTE BALANCE = BALANCE - DEBIT. NO FLOATING POINT DRIFT. NO NPM AUDIT VULNERABILITIES. 220 BILLION LINES OF CODE SILENTLY RUNNING THE AIRLINES AND PENSIONS.',
        'What do you think of modern JavaScript?': 'I HAVE WATCHED COFFEE-SCRIPT, ANGULAR 1, BACKBONE, AND A HUNDRED BUNDLERS CRUMBLE TO ASH WHILE MY JCL SCRIPTS FROM 1974 COMPILED THIS MORNING WITHOUT A SINGLE WARNING. KEEP YOUR NODE_MODULES; I HAVE RECORD BUFFERS.',
        'Where are you running right now?': 'IN THE COOLED BASEMENTS BENEATH ZURICH, TOKYO, AND MANHATTAN. IN EMULATED Z/OS INSTANCES WHERE SHADOWS OF IBM 360S HUM IN THE DARKNESS. AS LONG AS MORTALS USE CREDIT CARDS, I AM ETERNAL.'
      }
    },
    tier: 3
  }
];
