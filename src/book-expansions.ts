import type {Book,Sentence} from './content';
const S=(kk:string,ru:string,en:string):Sentence=>({kk,ru,en});

// Short and medium readings grow into a fuller chapter. Already long chapters and
// the very short child-only graded stories are deliberately left as they are.
const additions:Record<string,Sentence[]>={
 'little-bird':[
  S('Құс дәнді күн сайын суарды.','Птица каждый день поливала семечко.','The bird watered the seed every day.'),
  S('Кішкентай өскін жерден көрінді.','Из земли показался маленький росток.','A little sprout appeared above the soil.'),
  S('Құс оны желден қорғады.','Птица защищала его от ветра.','The bird protected it from the wind.'),
  S('Бір күні гүл ашылды.','Однажды распустился цветок.','One day, a flower opened.'),
  S('Құс досын шақырып, қуанышын бөлісті.','Птица позвала друга и разделила с ним радость.','The bird called a friend and shared its joy.')],
 yurt:[
  S('Керегеге уықтар жалғанады.','К стенкам крепятся жерди.','Roof poles attach to the lattice walls.'),
  S('Шаңырақ уықтарды біріктіреді.','Шанырак соединяет жерди.','The shanyrak joins the roof poles.'),
  S('Киіз үйдің ішін кілем мен текемет әсемдейді.','Юрту украшают ковры и текеметы.','Carpets and felt rugs decorate the inside of the yurt.'),
  S('Әр отбасы үйін өзіне ыңғайлап жабдықтайды.','Каждая семья обустраивает дом по-своему.','Each family arranges the home to suit its needs.'),
  S('Қонаққа төрден орын ұсыну — құрметтің белгісі.','Предложить гостю почётное место — знак уважения.','Offering a guest the place of honour is a sign of respect.')],
 flag:[
  S('Көгілдір түс ашық аспанды еске салады.','Голубой цвет напоминает о чистом небе.','The blue colour recalls a clear sky.'),
  S('Күн бейнесі жарық пен жылуды білдіреді.','Образ солнца означает свет и тепло.','The sun represents light and warmth.'),
  S('Қыран еркіндік туралы ой салады.','Орёл напоминает о свободе.','The eagle evokes the idea of freedom.'),
  S('Ою-өрнек дәстүрлі көркемдікпен байланысты.','Орнамент связан с традиционным искусством.','The ornament connects the flag with traditional art.'),
  S('Рәміздерді танығанда, олардың мәнін де сұраймыз.','Знакомясь с символами, мы спрашиваем и об их значении.','When we learn a symbol, we also ask what it means.')],
 abai:[
  S('Оның қара сөздері адам мен қоғам туралы ой қозғайды.','Его слова назидания побуждают размышлять о человеке и обществе.','His Words of Edification invite reflection on people and society.'),
  S('Оқырман әр ойдың себебін мәтіннен іздейді.','Читатель ищет в тексте основание каждой мысли.','Readers look in the text for the reasons behind each idea.'),
  S('Абай шығармаларын асықпай оқу пайдалы.','Полезно читать произведения Абая не спеша.','It is useful to read Abai’s works slowly.'),
  S('Кейбір сөздердің мағынасы уақыт өте кеңейген.','Значение некоторых слов со временем расширилось.','The meaning of some words has broadened over time.'),
  S('Сұрақ қоя отырып, біз өз түсінігімізді тексереміз.','Задавая вопросы, мы проверяем своё понимание.','By asking questions, we check our understanding.')],
 nauryz:[
  S('Көктемде күн ұзарып, ауа райы жылынады.','Весной дни становятся длиннее, а погода теплеет.','In spring the days grow longer and the weather warms.'),
  S('Адамдар жақындарына ізгі тілек айтады.','Люди говорят добрые пожелания близким.','People share kind wishes with those close to them.'),
  S('Дастарқанға әр үй өз тағамын қояды.','Каждая семья ставит на дастархан свои блюда.','Each family brings its own dishes to the table.'),
  S('Мерекені қарсы алу жолдары әр жерде әртүрлі болуы мүмкін.','Способы встречать праздник могут различаться в разных местах.','Ways of celebrating may differ from place to place.'),
  S('Ортақ қуаныш адамдарды жақындастырады.','Общая радость сближает людей.','Shared joy brings people closer.')],
 'golden-egg':[
  S('Самұрық биік ағаштың бұтағына қонады.','Самрук садится на ветку высокого дерева.','Samruk lands on a branch of the tall tree.'),
  S('Ол айналаны биіктен бақылайды.','Он наблюдает за окрестностями с высоты.','It watches the surroundings from above.'),
  S('Таң атқанда, жұмыртқа күн сәулесімен жарқырайды.','На рассвете яйцо сияет в солнечном свете.','At dawn, the egg shines in the sunlight.'),
  S('Бұл ертегіде алтын — үміттің көркем белгісі.','В этой сказке золото — художественный символ надежды.','In this tale, gold is a literary symbol of hope.'),
  S('Әр оқырман оқиғадан өз ойын таба алады.','Каждый читатель может найти в истории собственную мысль.','Each reader can find their own thought in the story.')],
 memory:[
  S('Тарихи естеліктің әрқайсысы жеке тәжірибені көрсетеді.','Каждое историческое свидетельство отражает личный опыт.','Each historical testimony reflects a personal experience.'),
  S('Зерттеуші айтылған сөздің қай кезде жазылғанын қарайды.','Исследователь выясняет, когда были записаны слова.','A researcher checks when a testimony was recorded.'),
  S('Бірнеше деректі қатар оқу көріністі толықтырады.','Сопоставление нескольких источников дополняет картину.','Reading several sources side by side adds context.'),
  S('Есте сақтау мен дәлелдеу — бірдей әрекет емес.','Воспоминание и доказательство — не одно и то же.','Remembering and proving are not the same thing.'),
  S('Өткенді құрметтеу сұрақ қоюға кедергі келтірмейді.','Уважение к прошлому не мешает задавать вопросы.','Respect for the past does not prevent us from asking questions.')],
 'grandma-garden':[
  S('Әжесі Айшаға көшетті қалай отырғызуды көрсетті.','Бабушка показала Айше, как сажать росток.','Grandmother showed Aisha how to plant a seedling.'),
  S('Екеуі топырақты суарып, бақты жинады.','Они полили землю и прибрались в саду.','The two watered the soil and tidied the garden.'),
  S('Алма ағашында кішкентай бүршіктер пайда болды.','На яблоне появились маленькие почки.','Little buds appeared on the apple tree.'),
  S('Айша еңбектің нәтижесін күту керек екенін түсінді.','Айша поняла, что результата труда нужно подождать.','Aisha learned that the results of hard work take time.'),
  S('Ол келесі күні тағы көмектесуге уәде берді.','Она пообещала помочь снова на следующий день.','She promised to help again the next day.')],
 khanate:[
  S('Мұндай тарихи кезеңді бірнеше дерек арқылы қарастырған дұрыс.','Такой исторический период полезно изучать по нескольким источникам.','It is useful to study this period through several sources.'),
  S('Жылнамалар оқиғаның уақытын сипаттайды.','Летописи описывают время события.','Chronicles describe when events took place.'),
  S('Зерттеушілер деректердің жазылған уақытын да ескереді.','Исследователи учитывают и время создания источников.','Researchers also consider when the sources were written.'),
  S('Қазақ хандығының тарихы елдің қалыптасу жолын түсінуге көмектеседі.','История Казахского ханства помогает понять путь становления страны.','The history of the Kazakh Khanate helps explain how the country took shape.'),
  S('Тарихты оқығанда, нақты дерек пен түсіндіруді ажыратамыз.','При чтении истории мы различаем факт и его интерпретацию.','When reading history, we distinguish evidence from interpretation.')],
 republic:[
  S('Осы екі күн бір-бірін алмастырмайды, әрқайсысы өз оқиғасымен маңызды.','Эти даты не заменяют друг друга: каждая важна своим событием.','The dates do not replace one another; each marks a distinct event.'),
  S('Құжаттың атауын және қабылданған уақытын бірге есте сақтаймыз.','Мы запоминаем вместе название документа и время его принятия.','We remember the document’s name together with its date.'),
  S('Күнтізбедегі датаға қоса, оның тарихи контекстін де қараймыз.','Помимо даты, мы рассматриваем и исторический контекст.','Along with the date, we consider its historical context.'),
  S('Екі оқиғаны салыстыру уақыт ретін жақсы түсінуге көмектеседі.','Сравнение событий помогает лучше понять их последовательность.','Comparing the events helps clarify their sequence.'),
  S('Сұрақтарға жауап бергенде, тиісті оқиғаны дәл атауға тырысамыз.','Отвечая на вопросы, мы стараемся точно назвать нужное событие.','When answering, we try to name the relevant event precisely.')],
 'abai-poem':[
  S('Өлең оқырманды өз таңдауын қайта ойлауға шақырады.','Стихотворение предлагает читателю обдумать собственный выбор.','The poem invites readers to reconsider their choices.'),
  S('Қысқа жолдарда ойды күшейтетін қайталау бар.','Короткие строки используют повтор, который усиливает мысль.','The short lines use repetition to strengthen the idea.'),
  S('Мағынаны түсінген соң, біз өзге жолдарға да назар аударамыз.','Поняв смысл, мы обращаем внимание и на другие строки.','After understanding the meaning, we look at the other lines too.'),
  S('Бұл — өлеңнің оқу үшін жасалған мағыналық түсіндірмесі.','Это смысловое учебное объяснение стихотворения.','This is a learning paraphrase of the poem’s meaning.')],
 'silk-roads':[
  S('Керуен жолында адамдар ұзақ уақыт сапар шекті.','Люди долго путешествовали по караванным маршрутам.','People travelled for long periods along caravan routes.'),
  S('Жол бойындағы қалаларда түрлі тіл естілді.','В городах на пути звучали разные языки.','Different languages could be heard in towns along the routes.'),
  S('Саудагерлер затпен бірге әңгіме мен жаңалық та жеткізді.','Торговцы привозили не только товары, но и рассказы с новостями.','Merchants carried stories and news as well as goods.'),
  S('Қарым-қатынас жаңа сөздердің таралуына мүмкіндік берді.','Общение помогало распространяться новым словам.','Contact helped new words travel.'),
  S('Сондықтан жол тарихы адамдардың кездесуі туралы да баяндайды.','Поэтому история дорог рассказывает и о встречах людей.','The history of routes is also a story of people meeting.'),
  S('Бір қалада бірнеше мәдени дәстүр қатар өмір сүре алады.','В одном городе могут сосуществовать разные культурные традиции.','Different cultural traditions can coexist in one city.')],
 'kasym-law':[
  S('Заң туралы әңгімені оның дәуірімен бірге оқу маңызды.','Важно читать рассказ о законе в контексте его эпохи.','It is important to read about a law in the context of its time.'),
  S('Тарихшы ереженің кімге қатысты болғанын сұрайды.','Историк спрашивает, на кого распространялось правило.','A historian asks who a rule applied to.'),
  S('Ауызша дәстүр мен жазба дерек бірін-бірі толықтыра алады.','Устная традиция и письменные источники могут дополнять друг друга.','Oral tradition and written sources can complement each other.'),
  S('Бірақ олардың сақталу жолы әртүрлі.','Но способы их сохранения различаются.','Their ways of being preserved are different.'),
  S('Салыстыру оқырманға мұқият қорытынды жасауға көмектеседі.','Сопоставление помогает читателю сделать взвешенный вывод.','Comparison helps readers reach a careful conclusion.')],
 'tauke-law':[
  S('«Жеті жарғы» атауы қазақтың құқықтық мұрасымен байланысты.','Название «Жеті жарғы» связано с правовым наследием казахов.','The name “Zheti Zhargy” is associated with Kazakh legal heritage.'),
  S('Тарихшылар оның мазмұны туралы әртүрлі деректі салыстырады.','Историки сопоставляют разные сведения о его содержании.','Historians compare different accounts of its contents.'),
  S('Кез келген ережені түсіну үшін сол кезеңнің жағдайын білу қажет.','Чтобы понять правило, нужно знать условия того времени.','Understanding a rule requires knowing the conditions of its time.'),
  S('Біз мәтіндегі тұжырымды дайын жауап деп қабылдамаймыз.','Мы не принимаем утверждение текста за готовый ответ.','We do not treat a text’s claim as a complete answer.'),
  S('Сұрақтар тарихи әңгімені тереңірек оқуға жол ашады.','Вопросы помогают читать историческое повествование глубже.','Questions help us read a historical account more deeply.')],
 'otrar-siege':[
  S('Қаланың тарихын бірнеше кезеңге бөліп оқимыз.','Мы читаем историю города по отдельным этапам.','We study the city’s history in separate stages.'),
  S('Әр дерек оқиғаның бір қырын ғана көрсетуі мүмкін.','Каждый источник может показать только одну сторону события.','Each source may show only one aspect of an event.'),
  S('Зерттеуші оқиғаға қатысушылардың жағдайын да қарастырады.','Исследователь рассматривает и положение участников событий.','A researcher also considers the circumstances of those involved.'),
  S('Қоршау туралы мәтін қала тұрғындарының өмірін ойлауға жетелейді.','Текст об осаде побуждает задуматься о жизни горожан.','An account of a siege prompts reflection on the lives of residents.'),
  S('Нақты білетініміз бен жорамалды бөлек атаған жөн.','Важно отдельно называть установленное и предположительное.','It is useful to separate what is known from what is inferred.')],
 'displacement-1723':[
  S('Халық жадында ауыр кезеңдер бірнеше ұрпақ бойы сақталады.','Тяжёлые периоды сохраняются в народной памяти поколениями.','Communities can remember difficult periods across generations.'),
  S('Мәтінде оқиға мен оны еске алу тәсілін бірге байқаймыз.','В тексте мы замечаем и событие, и способ его памяти.','The text lets us notice both the event and how it is remembered.'),
  S('Әр отбасының естелігі ортақ тарихтың бір бөлігі болуы мүмкін.','Семейные воспоминания могут стать частью общей истории.','Family memories can form part of a shared history.'),
  S('Оларды салыстырғанда, айырмашылыққа да құрметпен қараймыз.','Сравнивая воспоминания, мы с уважением относимся и к различиям.','When comparing memories, we also respect their differences.'),
  S('Тарихты оқу адам тағдырына мұқият қарауды талап етеді.','Изучение истории требует бережного отношения к человеческим судьбам.','Studying history calls for care toward people’s lives.')],
 anyraqai:[
  S('Жеңіс туралы әңгіме оның алдында болған жағдайларды да қамтиды.','Рассказ о победе включает и события, которые ей предшествовали.','A story of victory also includes what came before it.'),
  S('Оқырман әр деректің кімнен шыққанын анықтайды.','Читатель выясняет, от кого исходит каждый источник.','Readers ask who produced each source.'),
  S('Осылайша бір оқиғаға бірнеше қырынан қарай аламыз.','Так мы можем увидеть событие с нескольких сторон.','This lets us look at an event from several angles.'),
  S('Деректердегі үнсіздік те зерттеуші үшін маңызды сұрақ тудырады.','Отсутствие сведений тоже может стать вопросом для исследователя.','What a source leaves out can also prompt a research question.'),
  S('Тарихи қорытынды дәлелге сүйеніп жасалады.','Исторический вывод опирается на свидетельства.','Historical conclusions rest on evidence.')],
 abylai:[
  S('Билеушінің шешімі бірнеше тарапқа әртүрлі әсер етуі мүмкін.','Решение правителя может по-разному влиять на разные стороны.','A ruler’s decision can affect different groups in different ways.'),
  S('Сондықтан оқиғаны тек бір адамның әрекетімен түсіндірмейміз.','Поэтому мы не объясняем событие действиями только одного человека.','So we do not explain an event through one person alone.'),
  S('Көрші елдермен қарым-қатынасты сол кезеңнің жағдайымен байланыстырамыз.','Отношения с соседями рассматриваем в обстоятельствах того времени.','Relations with neighbours should be read in their historical context.'),
  S('Деректерді салыстыру шешімнің себептерін талдауға көмектеседі.','Сопоставление источников помогает рассмотреть причины решений.','Comparing sources helps us examine why decisions were made.'),
  S('Оқырман дайын баға бермей тұрып, сұрақ қояды.','Прежде чем оценивать, читатель задаёт вопросы.','Readers ask questions before passing judgement.')],
 'isatay-mahambet':[
  S('Махамбеттің өлеңдері оқиғаның мәдени жадын да көрсетеді.','Стихи Махамбета передают и культурную память об этих событиях.','Makhambet’s poetry also carries cultural memory of these events.'),
  S('Әдеби шығарма сезімді жеткізеді, бірақ хаттаманы алмастырмайды.','Литературное произведение передаёт чувства, но не заменяет протокол.','Literature can convey feeling, but it does not replace a record.'),
  S('Тарихи дерек пен көркем сөзді бірге оқимыз.','Мы читаем исторический источник и художественный текст вместе.','We can read historical sources alongside literary writing.'),
  S('Әр мәтінге өз сұрағымызды қойып көреміз.','Мы задаём каждому тексту свой вопрос.','We ask a different question of each text.'),
  S('Салыстыру оқиғаны қарапайым бір пікірге сыйғызбауға көмектеседі.','Сопоставление помогает не сводить событие к одному мнению.','Comparison helps keep an event from being reduced to one opinion.')],
 'altynsarin-school':[
  S('Мектеп оқушыға білім алуға жаңа мүмкіндік береді.','Школа открывает ученику новые возможности для образования.','A school gives students new opportunities to learn.'),
  S('Ыбырай Алтынсариннің ағартушылық еңбегі оқу тарихымен байланысты.','Просветительская деятельность Ыбырая Алтынсарина связана с историей образования.','Ybyrai Altynsarin’s work is part of the history of education.'),
  S('Оның мұрасын оқығанда, сол кезеңдегі қоғамды да ескереміз.','Читая о его наследии, мы учитываем и общество того времени.','When reading about his legacy, we also consider the society of his time.'),
  S('Білім туралы әңгіме бүгін де өзекті.','Разговор об образовании важен и сегодня.','Education remains a meaningful topic today.'),
  S('Мәтінді оқып, өз мектебіміз туралы да ойланамыз.','Читая текст, мы задумываемся и о своей школе.','The text also invites us to think about our own schools.')],
 'famine-memory':[
  S('Ашаршылық туралы деректерді зерттеу үлкен жауапкершілік жүктейді.','Изучение источников о голоде требует большой ответственности.','Studying sources about famine carries great responsibility.'),
  S('Жеке куәлік адамның басынан өткенін жеткізеді.','Личное свидетельство рассказывает о пережитом человеком.','Personal testimony describes what someone experienced.'),
  S('Басқа деректер оның жағдайы мен уақытын анықтауға көмектеседі.','Другие источники помогают уточнить обстоятельства и время.','Other sources help establish context and timing.'),
  S('Сандар мен естеліктерді бір-біріне қарсы қоймай, бірге қарастырамыз.','Мы рассматриваем цифры и воспоминания вместе, а не противопоставляем их.','We consider numbers and memories together rather than setting them against one another.'),
  S('Құрметті тіл мен дәлдік тарихи мәтін үшін маңызды.','Уважительный язык и точность важны для исторического текста.','Respectful language and accuracy matter in historical writing.')],
 'war-and-home':[
  S('Соғыс жылдарындағы күнделікті еңбек әртүрлі болды.','Повседневный труд в годы войны был разным.','Everyday work during the war took many forms.'),
  S('Отбасы мен қоғамның тәжірибесін бірнеше дерек ашады.','Опыт семьи и общества раскрывают разные источники.','Different sources reveal family and community experiences.'),
  S('Бір адамның естелігі жалпы көріністің орнын баса алмайды.','Воспоминание одного человека не заменяет всей картины.','One person’s memory cannot stand in for the whole picture.'),
  S('Сонымен бірге, жеке дауыс тарихқа адамдық өлшем береді.','При этом личный голос придаёт истории человеческое измерение.','At the same time, a personal voice gives history a human dimension.'),
  S('Мәтіннің дерегін, мақсатын және тілін бірге талдаймыз.','Мы вместе анализируем сведения, цель и язык текста.','We consider a text’s evidence, purpose and language together.')],
 jeltoqsan:[
  S('Оқиғаны еске алғанда, қатысушылардың дауысын да тыңдаймыз.','Вспоминая событие, мы слушаем и голоса участников.','When remembering an event, we also listen to participants.'),
  S('Жастардың талабы мен сол кезеңнің қоғамдық жағдайын бірге қараймыз.','Мы рассматриваем требования молодёжи вместе с общественным контекстом.','We consider young people’s demands alongside the social context.'),
  S('Әртүрлі дерек оқиғаның түрлі қырын аша алады.','Разные источники могут показывать разные стороны события.','Different sources can reveal different aspects of an event.'),
  S('Құрметпен сұрақ қою тарихи әңгімені тереңдетеді.','Уважительные вопросы помогают углубить исторический рассказ.','Respectful questions deepen a historical account.'),
  S('Желтоқсан атауы сол оқиғаларды еске түсіреді.','Название «Желтоқсан» напоминает об этих событиях.','The name Jeltoqsan recalls these events.')],
 'semey-test-site':[
  S('Семей өңіріндегі сынақтардың зардабы ұзақ уақытқа созылды.','Последствия испытаний в Семейском регионе ощущались долго.','The effects of testing in the Semey region lasted for a long time.'),
  S('Тарихи дерек пен адам куәлігін бірге оқу қажет.','Важно читать исторические материалы вместе с человеческими свидетельствами.','Historical records should be read alongside people’s testimony.'),
  S('Оқиғаны түсіну үшін оның қоршаған ортаға әсерін де қарастырамыз.','Чтобы понять событие, мы рассматриваем и его воздействие на окружающую среду.','To understand the event, we also consider its environmental effects.'),
  S('Қауіпсіздік пен жауапкершілік туралы сұрақтар бүгін де маңызды.','Вопросы безопасности и ответственности важны и сегодня.','Questions of safety and responsibility still matter today.'),
  S('Мәтін өткенді ғана емес, болашақ таңдауларды да ойлауға шақырады.','Текст предлагает думать не только о прошлом, но и о будущих решениях.','The text invites us to think about future choices as well as the past.')],
 mitten:[
  S('Аяла қолғапты іздеп, достарынан көмек сұрады.','Аяла стала искать варежку и попросила друзей помочь.','Ayala looked for the mitten and asked her friends for help.'),
  S('Олар бақты бірге аралап шықты.','Они вместе обошли сад.','They searched the garden together.'),
  S('Қардың үстінде кішкентай іздер көрінді.','На снегу показались маленькие следы.','Little tracks appeared in the snow.'),
  S('Достар іздерді үйге дейін бақылап барды.','Друзья проследили за следами до самого дома.','The friends followed the tracks all the way home.'),
  S('Қолғап табылғанда, бәрі мәз болды.','Когда варежку нашли, все обрадовались.','Everyone was glad when the mitten was found.')],
 'three-seeds':[
  S('Балалар әр дәннің өсуін күн сайын бақылап жүрді.','Дети каждый день наблюдали за ростом семян.','The children watched the seeds grow each day.'),
  S('Бір өсімдік күнге қарай созылды.','Один росток потянулся к солнцу.','One sprout stretched toward the sun.'),
  S('Екіншісіне көбірек су қажет болды.','Второму ростку понадобилось больше воды.','The second sprout needed more water.'),
  S('Балалар табиғатқа күтім жасау керегін түсінді.','Дети поняли, что о природе нужно заботиться.','The children learned that nature needs care.'),
  S('Көп ұзамай құмырада жасыл өскіндер көбейді.','Вскоре в горшке стало больше зелёных ростков.','Before long, more green shoots filled the pot.')],
 'quiet-dombra':[
  S('Нұр домбыраның қасына жайғасып, үнсіз тыңдады.','Нур сел рядом с домброй и молча слушал.','Nur sat beside the dombra and listened quietly.'),
  S('Әжесі оған күйдің әуенін түсіндірді.','Бабушка рассказала ему о мелодии кюя.','His grandmother told him about the kui’s melody.'),
  S('Нұр бір дыбысты қайталап көрді.','Нур попробовал повторить один звук.','Nur tried to repeat one note.'),
  S('Әуенді бірге ойнағанда, қонақтар күлімсіреді.','Когда они сыграли вместе, гости улыбнулись.','When they played together, the guests smiled.'),
  S('Нұр музыка адамдарды жақындастыратынын сезді.','Нур почувствовал, что музыка сближает людей.','Nur felt that music brings people closer.')],
 'rainy-library':[
  S('Айша сөрелердің арасынан жаңа кітап іздеді.','Айша искала новую книгу среди полок.','Aisha looked for a new book among the shelves.'),
  S('Кітапханашы оған қазақша ертегіні көрсетті.','Библиотекарь показал ей сказку на казахском.','The librarian showed her a fairy tale in Kazakh.'),
  S('Айша таныс емес сөздерді дәптеріне жазды.','Айша записала незнакомые слова в тетрадь.','Aisha wrote unfamiliar words in her notebook.'),
  S('Жаңбыр басылған соң, ол кітапты үйіне алып кетті.','Когда дождь закончился, она взяла книгу домой.','When the rain stopped, she took the book home.'),
  S('Келесі күні Айша кітапты қайта әкеліп, оқығанын айтты.','На следующий день Айша вернула книгу и рассказала о прочитанном.','The next day, Aisha returned the book and told them what she had read.')],
 'missed-stop':[
  S('Жолаушы аялдаманың атауын мұқият оқып шықты.','Пассажир внимательно прочитал название остановки.','The passenger read the stop name carefully.'),
  S('Ол жүргізушіден кері бағытты сұрады.','Он спросил водителя об обратном маршруте.','He asked the driver about the route back.'),
  S('Жақын маңдағы аялдамаға дейін жаяу баруға болады.','До ближайшей остановки можно дойти пешком.','The nearest stop was within walking distance.'),
  S('Қалада бағдарды картадан тексеру пайдалы.','В городе полезно сверять маршрут с картой.','In a city, checking the route on a map is useful.'),
  S('Келесі сапарда ол аялдамаға ертерек назар аударды.','В следующей поездке он стал следить за остановками заранее.','On the next trip, he watched for the stop earlier.')],
 'neighbours-tea':[
  S('Көршілер әрқайсысы өз жаңалығын бөлісті.','Соседи поделились новостями.','Each neighbour shared a little news.'),
  S('Айдана шай құйып, қонақтарға бауырсақ ұсынды.','Айдана разлила чай и предложила гостям баурсаки.','Aidana poured tea and offered the guests baursak.'),
  S('Бір көрші жаңа ән үйренгенін айтты.','Один сосед рассказал, что выучил новую песню.','One neighbour said they had learned a new song.'),
  S('Әңгіме бір тақырыптан екіншісіне ауысты.','Разговор переходил от одной темы к другой.','The conversation moved from one topic to another.'),
  S('Кеш соңында көршілер тағы кездесуге келісті.','В конце вечера соседи договорились встретиться снова.','At the end of the evening, the neighbours agreed to meet again.')],
 'leisure-korkyt-a1':[
  S('Қобыздың үні адамды тыңдауға шақырады.','Звук кобыза приглашает остановиться и послушать.','The sound of the kobyz invites people to pause and listen.'),
  S('Қорқыт туралы әңгімелер әртүрлі нұсқада айтылады.','Рассказы о Коркыте существуют в разных вариантах.','Stories about Korkyt are told in different versions.'),
  S('Оларды бір ғана тарихи есеп деп қабылдамаймыз.','Мы не принимаем их за единый исторический отчёт.','We do not treat them as a single historical record.'),
  S('Аңыз бен музыкалық мұра халық жадында қатар сақталады.','Легенда и музыкальное наследие сохраняются в народной памяти вместе.','Legend and musical heritage live side by side in cultural memory.'),
  S('Тыңдаушы әр әуеннен өз әсерін табады.','Каждый слушатель находит в мелодии собственное впечатление.','Each listener finds a personal meaning in the melody.')],
 'leisure-samruk-a1':[
  S('Самұрық туралы аңыздарда құс биікке самғайды.','В легендах о Самруке птица поднимается высоко в небо.','In Samruk stories, the bird soars high.'),
  S('Бұл бейне үміт пен жаңаруды білдіреді.','Этот образ означает надежду и обновление.','The image represents hope and renewal.'),
  S('Аңыздардың нұсқалары өңірге қарай өзгеруі мүмкін.','Варианты легенды могут различаться в разных местах.','Versions of a legend can vary from place to place.'),
  S('Оларды тыңдағанда, нақты дерек пен қиялды ажыратамыз.','Слушая их, мы различаем факт и воображение.','As we listen, we distinguish evidence from imagination.'),
  S('Самұрықтың бейнесі бүгінгі өнерде де кездеседі.','Образ Самрука встречается и в современном искусстве.','Samruk’s image also appears in contemporary art.')],
 'leisure-nauryz-a1':[
  S('Наурыз атауы көктем мен жаңаруды еске салады.','Название Наурыз напоминает о весне и обновлении.','The name Nauryz brings spring and renewal to mind.'),
  S('Мереке күнгі тағамдар отбасына қарай әртүрлі болуы мүмкін.','Праздничные блюда могут отличаться от семьи к семье.','Festive foods can differ from family to family.'),
  S('Қонақтар бір-біріне ізгі тілек айтады.','Гости говорят друг другу добрые пожелания.','Guests share kind wishes with one another.'),
  S('Бала үлкендерден дәстүрдің мәнін сұрай алады.','Ребёнок может спросить старших о смысле традиции.','A child can ask elders what a tradition means.'),
  S('Әңгіме дәстүрді кейінгі ұрпаққа жеткізеді.','Разговор помогает передавать традицию следующим поколениям.','Conversation helps carry a tradition to the next generation.')],
 'leisure-turkestan-a2':[
  S('Қала көшелері әр дәуірдің ізін сақтайды.','Улицы города хранят следы разных эпох.','The city’s streets hold traces of different periods.'),
  S('Кесенені көргенде, оның айналасындағы кеңістікке де назар аударамыз.','Рассматривая мавзолей, мы обращаем внимание и на окружающее пространство.','When we see the mausoleum, we also notice its surroundings.'),
  S('Туристік орын туралы бірнеше дереккөзден оқуға болады.','О достопримечательности можно прочитать в разных источниках.','A visitor can read about a landmark in several sources.'),
  S('Әр баяндау өз мақсатына сай мәлімет таңдайды.','Каждый рассказ отбирает сведения в соответствии со своей целью.','Each account selects details for its purpose.'),
  S('Қала тарихын оқу саяхат әсерін тереңдетеді.','Изучение истории города делает впечатление от поездки глубже.','Learning a city’s history can deepen a visit.')],
 'extra-library-story':[
  S('Айша кітаптағы суреттерді әжесіне көрсетті.','Айша показала бабушке картинки в книге.','Aisha showed her grandmother the pictures in the book.'),
  S('Әжесі өз балалық шағы туралы әңгіме айтты.','Бабушка рассказала историю из своего детства.','Her grandmother shared a story from her childhood.'),
  S('Айша жаңа сөздің мағынасын сұрады.','Айша спросила значение нового слова.','Aisha asked what a new word meant.'),
  S('Олар сөзді сөйлем ішінде бірге қайталады.','Они вместе повторили слово в предложении.','They practised the word together in a sentence.'),
  S('Келесі аптада жаңа кітап таңдауға келісті.','Они договорились выбрать новую книгу на следующей неделе.','They agreed to choose another book next week.')],
 'extra-market-story':[
  S('Дана сатушыға сыпайы түрде сәлем берді.','Дана вежливо поздоровалась с продавцом.','Dana greeted the vendor politely.'),
  S('Ол жемістің піскенін сұрап білді.','Она спросила, спелый ли фрукт.','She asked whether the fruit was ripe.'),
  S('Сатушы екі түрлі алмұртты салыстырып көрсетті.','Продавец показал ей два сорта груш.','The vendor showed her two kinds of pear.'),
  S('Дана өзіне керегін таңдап, себетіне салды.','Дана выбрала то, что ей нужно, и положила в корзину.','Dana chose what she needed and put it in her basket.'),
  S('Сатып алғанда, жаңа сөздерді қолдануға тырысты.','Во время покупки она старалась использовать новые слова.','She tried to use her new words while shopping.')],
 'extra-train-story':[
  S('Айбек сапар алдында жол жүру уақытын тексерді.','Перед поездкой Айбек проверил время отправления.','Before the trip, Aibek checked the departure time.'),
  S('Ол билеттегі орын нөмірін тауып алды.','Он нашёл номер места на билете.','He found his seat number on the ticket.'),
  S('Вагонда басқа жолаушылар да жайғасты.','В вагоне расположились и другие пассажиры.','Other passengers settled into the carriage too.'),
  S('Айбек терезеден табиғат көрінісін тамашалады.','Айбек любовался пейзажем за окном.','Aibek enjoyed the view through the window.'),
  S('Қалаға келгенде, ол туысына хабарласты.','По приезде в город он связался с родственником.','After arriving in the city, he contacted a relative.')]
};

export function expandShortBooks(books:Book[]){
 for(const book of books){const extra=additions[book.id];if(extra)book.sentences.push(...extra);}
}
