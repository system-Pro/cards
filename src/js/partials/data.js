var data = [
  // 1-12
  {'abide abode abode' : 'придерживаться, соблюдать, выполнять'},
  {'arise arose arisen' : 'возникать, подниматься'},
  {'awake awoke awaked' : 'будить, просыпаться'},
  {'be was(were) been' : 'быть, являться'},
  {'bear bore born' : 'носить, рождать'},
  {'beat beat beaten' : 'бить, избивать, биться'},
  {'become became become' : 'становиться, делаться'},
  {'befall befell  befallen' : 'приключаться, происходить, случаться'},
  {'begin began begun' : 'начинать'},
  {'behold beheld beheld' : 'заметить, увидеть'},
  {'bend bent bent' : 'гнуть, сгибать, согнуть'},
  {'beseech besought besought' : 'умолять, упрашивать'},
  // 13-24
  {'beset beset beset' : 'окружать, осаждать'},
  {'bet bet bet' : 'ставка, держать пари'},
  {'bid bid bid' : 'предлагать цену, велеть, просить'},
  {'bind bound bound' : 'связывать, привязывать'},
  {'bite bit bitten' : 'кусать, укусить'},
  {'bleed bled bled' : 'кровоточить, истекать кровью'},
  {'blow blew blown' : 'дуть'},
  {'break broke broken' : 'ломать, прерывать, разбивать'},
  {'breed bred bred' : 'разводить, порождать, выводить'},
  {'bring brought brought' : 'приносить, приводить'},
  {'broadcast broadcast broadcast' : 'вещать, распространять'},
  {'build built built' : 'строить, встраивать'},
  // 25-36
  {'burn burnt burnt' : 'гореть, сжигать'},
  {'burst burst burst' : 'взрывать'},
  {'buy bought bought' : 'покупать'},
  {'can could could' : "мочь физически"},
  {"cast cast cast" : "бросать, отливать"},
  {"catch caught caught" : "ловить, схватывать"},
  {"choose chose chosen" : "выбирать"},
  {"cling clung clung" : "цепляться, держаться"},
  {"cleave cleft cloven" : "рассечь, расколоть"},
  {"clothe clothed clothed" : "одеть, одевать"},
  {"come came come" : "приходить"},
  {"cost cost cost" : "оценивать, стоить"},
  // 37-48
  {"creep crept crept" : "ползать"},
  {"cut cut cut" : "резать, обрезать"},
  {"dare durst dared" : "рисковать, посметь"},
  {"deal dealt dealt" : "иметь дело, торговать"},
  {"dig dug dug" : "копать"},
  {"dive dove dived " : "нырять"},
  {"do(does) did done" : "делать"},
  {"draw drew drawn" : "рисовать, чертить"},
  {"dream dreamt dreamt " : "мечтать, сниться"},
  {"drink drank drunk " : "пить, выпивать"},
  {"drive drove driven " : "ехать, везти, водить"},
  {"dwell dwelt dwelt " : "жить, обитать, пребывать"},
  // 49-60
  {"eat ate eaten" : "кушать"},
  {"fall fell fallen " : "падать"},
  {"feed fed fed " : "кормить, подавать"},
  {"feel felt felt " : "чувствовать"},
  {"fight fought fought " : "бороться, сражаться"},
  {"find found found " : "находить"},
  {"fit fit fit " : "подходит, годится"},
  {"flee fled fled " : "бежать, убегать"},
  {"fling flung flung " : "бросать"},
  {"fly flew flown " : "летать, пролетать"},
  {"forbid forbade forbidden " : "запрещать"},
  {"forecast forecast/ed forecast/ed " : "прогнозировать, предвидеть, предсказывать"},
  // 61-72
  {"forget forgot forgotten " : "забывать"},
  {"forego forewent foregone " : "отказываться, воздерживаться"},
  {"foretell foretold foretold " : "предсказывать, прогнозировать"},
  {"forgive forgave forgiven " : "прощать"},
  {"forsake forsook forsaken " : "оставлять, покидать, отказываться"},
  {"freeze froze frozen " : "замерзать, замораживать"},
  {"get got got " : "получать, становиться"},
  {"gild gilt/-ded gilt/-ded " : "позолотить, украшать"},
  {"give gave given " : "давать"},
  {"go(goes) went gone " : "идти, ехать"},
  {"grind ground ground " : "молоть, шлифовать, измельчать"},
  {"grow grew grown " : "расти, выращивать"},
  // 73-84
  {"hang hung/ed hung/ed" : "висеть, вешать"},
  {"have had had " : "иметь, обладать"},
  {"hew hewed hewed/hewn " : "рубить, тесать"},
  {"hear heard heard " : "слышать"},
  {"hide hid hidden " : "прятать, прятаться"},
  {"hit hit hit " : "ударять, поражать"},
  {"hold held held " : "держать, удерживать"},
  {"hurt hurt hurt " : "повредить, причинять боль, ранить"},
  {"keep kept kept " : "держать, хранить"},
  {"kneel knelt/-ed knelt/-ed " : "становиться на колени"},
  {"knit knit/ted knit/ted " : "вязать"},
  {"know knew known " : "знать"},
  // 85-96
  {"lay laid laid " : "класть"},
  {"lead led led " : "вести, сопровождать"},
  {"lean leant/-ed leant/-ed " : "опираться, прислоняться"},
  {"leap leapt/-ed leapt/-ed " : "прыгать"},
  {"learn learnt/-ed learnt/-ed " : "учиться, узнавать"},
  {"leave left left " : "оставлять, уезжать"},
  {"lend lent lent" : "одалживать, давать взаймы"},
  {"let let let" : "позволять, сдавать в наём"},
  {"lie lay lain" : "лежать"},
  {"light lit/-ghted lit/-ghted " : "зажигать, освещать"},
  {"lose lost lost " : "терять"},
  {"make made made " : "делать, заставлять"},
  // 97-108
  {"may might might " : "мочь, иметь право"},
  {"mean meant meant " : "значить, подразумевать"},
  {"meet met met " : "встречать, знакомиться"},
  {"mishear misheard misheard " : "ослышаться"},
  {"mislay  mislaid   mislaid" : "класть не на место"},
  {"mistake   mistook   mistaken" : "ошибаться, заблуждаться"},
  {"mow   mowed   mown" : "косить"},
  {'overtake  overtook  overtaken' : 'догнать'},
  {'pay   paid  paid' : 'платить'},
  {'prove   proved  proved(proven)' : 'доказывать, удостоверять'},
  {'put   put   put' : 'класть'},
  {'quit  quit(quitted)   quit(quitted)' : 'оставлять, покидать'},
  // 109-120
  {'read  read(red)   read(red)' : 'читать'},
  {'rebuild   rebuilt   rebuilt' : 'перестраивать, восстанавливать'},
  {'rid   rid(ridded)   rid(ridded)' : 'освобождать, избавлять'},
  {'ride  rode  ridden' : 'ехать верхом'},
  {'ring  rang  rung' : 'звонить, звенеть'},
  {'rise  rose  risen' : 'подниматься, восходить'},
  {'run   ran   run' : 'бежать, течь'},
  {'saw   sawed   sawn(sawed)' : 'пилить'},
  {'say   said  said' : 'говорить, сказать'},
  {'see   saw   seen' : 'видеть'},
  {'seek  sought  sought' : 'искать'},
  {'sell  sold  sold' : 'продавать'},
  // 121-132
  {'send  sent  sent' : 'посылать, отправлять'},
  {'set   set   set' : 'помещать, ставить'},
  {'sew   sewed   sewed(sewn)' : 'шить'},
  {'shake   shook   shaken' : 'трясти'},
  {'shall   should  should' : 'быть должным'},
  {'shave   shaved  shaved' : 'брить(ся)'},
  {'shear   sheared   shorn' : 'стричь, резать, лишать'},
  {'shed  shed  shed' : 'сбрасывать, проливать'},
  {'shine   shone(shined)   shone(shined)' : 'сиять, светить'},
  {'shoe  shod  shod' : 'обувать, подковывать'},
  {'shoot   shot  shot' : 'стрелять'},
  {'show  showed  shown(showed)' : 'показывать'},
  // 133-144
  {'shrink  shrank(shrunk)  shrunk' : 'сокращаться, сжиматься, отскочить, отпрянуть'},
  {'shut  shut  shut' : 'закрыть, закрывать, закрыться'},
  {'sing  sang  sung' : 'петь'},
  {'sink  sank  sunk' : 'опускаться, погружаться, тонуть'},
  {'sit   sat   sat' : 'сидеть'},
  {'slay  slew  slain' : 'убивать, уничтожать'},
  {'sleep   slept   slept' : 'спать'},
  {'slide   slid  slid' : 'скользить'},
  {'sling   slung   slung' : 'швырять, швырнуть, вешать через плечо, подвешивать'},
  {'slit  slit  slit' : 'резать в длину, вдоль'},
  {'smell   smelt(smelled)  smelt(smelled)' : 'пахнуть, нюхать'},
  {'sow   sowed   sowed(sown)' : 'сеять'},
  // 145-156
  {'speak   spoke   spoken' : 'говорить'},
  {'speed   sped(speeded)   sped(speeded)' : 'спешить, ускорять'},
  {'spell   spelt(spelled)  spelt(spelled)' : 'писать, произносить слово по буквам'},
  {'spend   spent   spent' : 'тратить, истощать'},
  {'spill   spilt   spilt' : 'проливать, пролить'},
  {'spin  spun  spun' : 'прясть, плести, крутить'},
  {'spit  spat  spat' : 'плевать, насаживать, натыкать, про-'},
  {'split   split   split' : 'раскалывать, расщеплять'},
  {'spoil   spoilt(spoiled)   spoilt(spoiled)' : 'портить, баловать'},
  {'spread  spread  spread' : 'распространяться'},
  {'spring  sprang  sprung' : 'прыгать, вскочить'},
  {'stand   stood   stood' : 'стоять'},
  // 157-168
  {'steal   stole   stolen' : 'воровать, красть'},
  {'stick   stuck   stuck' : 'втыкать, приклеивать(ся), липнуть'},
  {'sting   stung   stung' : 'жалить, укус, укол'},
  {'stink   stank(stunk)  stunk' : 'вонять, отталкивать'},
  {'strew   strewed   strewn(strewed)' : 'усеять, разбрасывать, расстилать'},
  {'stride  strode  stridden' : 'шаг, шагать'},
  {'strike  struck  struck' : 'ударять, поражать, бастовать'},
  {'string  strung  strung' : 'связывать, натягивать, нанизывать'},
  {'strive  strove  striven' : 'стремиться, стараться'},
  {'swear   swore   sworn' : 'клясться, присягать, браниться'},
  {'sweep   swept   swept' : 'подметать, мести'},
  {'swell   swelled   swollen(swelled)' : 'пухнуть, раздуваться, набухать'},
  // 169-180
  {'swim  swam  swum' : 'плавать'},
  {'swing   swung   swung' : 'качать(ся), размахивать'},
  {'take  took  taken' : 'брать'},
  {'teach   taught  taught' : 'обучать, учить'},
  {'tear  tore  torn' : 'рвать, раз-, со-, от-'},
  {'tell  told  told' : 'рассказывать, сообщать'},
  {'think   thought   thought' : 'думать'},
  {'throw   threw   thrown' : 'кидать, бросать'},
  {'thrust  thrust  thrust' : 'толкать, колоть, выгонять, сунуть'},
  {'tread   trod  trod(trodden)' : 'ступать'},
  {'unbend  unbent  unbent' : 'разгибаться'},
  {'undergo   underwent   undergone' : 'испытывать, переносить'},
  // 181-192
  {'understand  understood  understood' : 'понимать'},
  {'undertake   undertook   undertaken' : 'предпринимать, гарантировать'},
  {'upset   upset   upset' : 'опрокидывать, обжимать'},
  {'wake  woke(waked)   woken(waked)' : 'будить, просыпаться'},
  {'wear  wore  worn' : 'носить (одежду)'},
  {'weave   wove(weaved)  woven(weaved)' : 'ткать'},
  {'wed   wed(wedded )  wed(wedded)' : 'венчать(ся), выдавать замуж'},
  {'weep  wept  wept' : 'плакать, плести'},
  {'will  would   would' : 'хотеть, планировать'},
  {'wet   wet(wetted)   wet(wetted)' : 'мочить, вы-, про-'},
  {'win   won   won' : 'выигрывать, получать'},
  {'wind  wound   wound' : 'заводить (механизм), виться'},
  // 193-195
  {'withdraw  withdrew  withdrawn' : 'брать назад, отнимать'},
  {'wring   wrung   wrung' : 'жать, выжимать, скручивать'},
  {'write   wrote   written' : 'писать'}
];