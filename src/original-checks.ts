import type {Book,Local} from './content';
const L=(ru:string,en:string,kk:string):Local=>({ru,en,kk});
type Row=[Local,Local,Local,Local];
export function improveOriginalChecks(books:Book[]){const rows:Record<string,Row[]>={
 'little-bird':[
 [L('Что нашла птица?','What did the bird find?','Құс не тапты?'),L('Семечко','A seed','Дән'),L('Билет','A ticket','Билет'),L('Ключ','A key','Кілт')],
 [L('Куда она поместила семечко?','Where did it put the seed?','Дәнді қайда екті?'),L('В землю','In the ground','Жерге'),L('В книгу','In a book','Кітапқа'),L('На крышу','On a roof','Шатырға')],
 [L('Какая погода помогла росту?','What weather helped it grow?','Өсуге қандай ауа райы көмектесті?'),L('Солнце и дождь','Sun and rain','Күн мен жаңбыр'),L('Только сильный мороз','Only severe frost','Тек қатты аяз'),L('Непрерывная метель','An unending blizzard','Толассыз боран')]],
 'yurt':[
 [L('Что такое киіз үй?','What is a киіз үй?','Киіз үй деген не?'),L('Традиционное жилище','A traditional dwelling','Дәстүрлі баспана'),L('Музыкальный инструмент','A musical instrument','Музыкалық аспап'),L('Название реки','A river name','Өзен атауы')],
 [L('Где расположен шанырак?','Where is the shanyrak?','Шаңырақ қайда орналасады?'),L('Наверху юрты','At the top of the yurt','Үйдің төбесінде'),L('Под землёй','Underground','Жер астында'),L('В сундуке','In a chest','Сандықта')],
 [L('Что позволяет сделать конструкция?','What does the structure allow?','Құрылымы не істеуге мүмкіндік береді?'),L('Разобрать и перевезти юрту','Dismantle and move the yurt','Үйді жинап, көшіруге'),L('Поднять морской якорь','Raise a sea anchor','Теңіз зәкірін көтеруге'),L('Спрятать целый город','Hide a whole city','Бүкіл қаланы жасыруға')]],
 'flag':[
 [L('Какой основной цвет флага?','What is the main colour of the flag?','Тудың негізгі түсі қандай?'),L('Небесно-голубой','Sky blue','Көгілдір'),L('Бордовый','Burgundy','Қошқыл қызыл'),L('Фиолетовый','Purple','Күлгін')],
 [L('Что изображено в центре?','What is depicted in the centre?','Ортасында не бар?'),L('Золотое солнце','A golden sun','Алтын күн'),L('Серебряная луна','A silver moon','Күміс ай'),L('Красное яблоко','A red apple','Қызыл алма')],
 [L('Где расположен орёл?','Where is the eagle?','Қыран қайда бейнеленген?'),L('Под солнцем','Beneath the sun','Күннің астында'),L('Над облаком','Above a cloud','Бұлт үстінде'),L('Внутри буквы','Inside a letter','Әріп ішінде')]],
 'abai':[
 [L('Что ценил Абай в тексте?','What did Abai value in the text?','Абай нені бағалады?'),L('Знания и труд','Knowledge and work','Білім мен еңбек'),L('Только славу','Only fame','Тек атақты'),L('Скорость вместо смысла','Speed instead of meaning','Мағына орнына жылдамдықты')],
 [L('К чему он призывал человека?','What did he encourage people to do?','Адамды неге шақырды?'),L('Размышлять','Reflect','Ойлануға'),L('Не задавать вопросов','Ask no questions','Сұрақ қоймауға'),L('Отказаться от чтения','Stop reading','Оқудан бас тартуға')],
 [L('Как мы учимся согласно тексту?','How do we learn according to the text?','Мәтін бойынша қалай үйренеміз?'),L('Читая и задавая вопросы','By reading and asking questions','Оқып, сұрақ қойып'),L('Только ожидая','Only by waiting','Тек күтіп'),L('Скрывая ошибки','By hiding errors','Қатені жасырып')]],
 'nauryz':[
 [L('Что люди говорят друг другу?','What do people offer one another?','Адамдар бір-біріне не айтады?'),L('Добрые пожелания','Kind wishes','Жақсы тілек'),L('Только цены','Only prices','Тек баға'),L('Только адреса','Only addresses','Тек мекенжай')],
 [L('Где собираются гости?','Where do guests gather?','Қонақтар қайда жиналады?'),L('За дастарханом','At the shared table','Дастарқанға'),L('В пустой очереди','In an empty queue','Бос кезекте'),L('На вокзальном перроне','On a station platform','Бекет алаңында')],
 [L('Что делают дети?','What do the children do?','Балалар не істейді?'),L('Играют и поют','Play and sing','Ойнап, ән айтады'),L('Ремонтируют автобус','Repair a bus','Автобус жөндейді'),L('Пишут закон','Write a law','Заң жазады')]],
 'golden-egg':[
 [L('Кто строит гнездо?','Who builds the nest?','Ұяны кім салады?'),L('Самрук','Samruk','Самұрық'),L('Городской водитель','A city driver','Қала жүргізушісі'),L('Маленький садовник','A little gardener','Кішкентай бағбан')],
 [L('Что сияет в гнезде?','What shines in the nest?','Ұяда не жарқырайды?'),L('Золотое яйцо','A golden egg','Алтын жұмыртқа'),L('Стеклянный билет','A glass ticket','Шыны билет'),L('Зелёный фонарь','A green lantern','Жасыл шам')],
 [L('Какова тема истории?','What is the story about?','Әңгіме не туралы?'),L('Надежда','Hope','Үміт'),L('Расписание ремонта','A repair schedule','Жөндеу кестесі'),L('Цена молока','The price of milk','Сүт бағасы')]],
 'memory':[
 [L('Что требует изучение сложной истории?','What does studying difficult history require?','Күрделі тарихты оқу нені талап етеді?'),L('Ответственности','Responsibility','Жауапкершілікті'),L('Случайного выбора фактов','Random selection of facts','Деректі кездейсоқ таңдауды'),L('Только красивых заголовков','Only pretty headlines','Тек әдемі тақырыпты')],
 [L('Что нужно сохранять?','What should be preserved?','Нені сақтау маңызды?'),L('Свидетельства','Testimony','Куәліктерді'),L('Ошибки в датах','Errors in dates','Жыл қателерін'),L('Непроверенные слухи вместо документов','Rumours instead of documents','Құжат орнына қауесетті')],
 [L('Чему помогает понимание прошлого?','What does understanding the past help with?','Өткенді түсіну неге көмектеседі?'),L('Осознанному отношению к будущему','A thoughtful approach to the future','Болашаққа саналы қарауға'),L('Отказу от вопросов','Avoiding questions','Сұрақтан бас тартуға'),L('Отмене всех исследований','Cancelling all research','Барлық зерттеуді тоқтатуға')]],
 'grandma-garden':[
 [L('Кому принадлежит сад?','Whose garden is it?','Бақ кімдікі?'),L('Бабушке','Grandmother’s','Әженікі'),L('Капитану корабля','A ship captain’s','Кеме капитанінікі'),L('Водителю трамвая','A tram driver’s','Трамвай жүргізушісінікі')],
 [L('Какого цвета яблоки?','What colour are the apples?','Алма қандай түсті?'),L('Красного','Red','Қызыл'),L('Синего','Blue','Көк'),L('Серебряного','Silver','Күміс')],
 [L('Что принёс рассказчик?','What did the narrator bring?','Әңгімелеуші не әкелді?'),L('Воду','Water','Су'),L('Песок для дороги','Road sand','Жолға құм'),L('Билет на поезд','A train ticket','Пойыз билеті')]],
 'khanate':[
 [L('Какие годы приводит Дулати?','Which years does Dulati give?','Дулати қай жылдарды көрсетеді?'),L('1465–1466','1465–1466','1465–1466'),L('1729–1730','1729–1730','1729–1730'),L('1941–1945','1941–1945','1941–1945')],
 [L('Какой историк назван?','Which historian is named?','Қай тарихшы аталған?'),L('Мухаммед Хайдар Дулати','Muhammad Haydar Dulati','Мұхаммед Хайдар Дулати'),L('Ыбырай Алтынсарин','Ybyrai Altynsarin','Ыбырай Алтынсарин'),L('Современный рассказчик без имени','An unnamed modern narrator','Аты жоқ қазіргі әңгімелеуші')],
 [L('Почему событие названо вехой?','Why is the event called a milestone?','Оқиға неге белес деп аталған?'),L('Оно связано с историей государственности','It relates to statehood','Мемлекеттілік тарихымен байланысты'),L('Это только открытие одного магазина','It is just one shop opening','Тек дүкен ашылуы'),L('Оно объясняет прогноз погоды','It explains the weather forecast','Ауа райын түсіндіреді')]],
 'republic':[
 [L('Какой акт принят 16 декабря 1991?','What was adopted on 16 December 1991?','1991 жылғы 16 желтоқсанда не қабылданды?'),L('Закон о государственной независимости','The law on state independence','Мемлекеттік тәуелсіздік туралы заң'),L('Только новое расписание','Only a new timetable','Тек жаңа кесте'),L('План средневекового города','A medieval city plan','Ортағасырлық қала жоспары')],
 [L('Какое событие было раньше?','Which came first?','Қай оқиға бұрын болды?'),L('Декларация о суверенитете','The sovereignty declaration','Егемендік декларациясы'),L('Закон о независимости','The independence law','Тәуелсіздік заңы'),L('Оба произошли в один день','Both on the same day','Екеуі бір күнде болды')],
 [L('Сколько ключевых событий различает текст?','How many key events does the text distinguish?','Мәтін қанша маңызды оқиғаны ажыратады?'),L('Два','Two','Екі'),L('Семь','Seven','Жеті'),L('Ни одного','None','Бір де біреуін емес')]],
 'abai-poem':[
 [L('Кто автор оригинальных строк?','Who wrote the original lines?','Түпнұсқа жолдардың авторы кім?'),L('Абай Кунанбаев','Abai Qunanbaiuly','Абай Құнанбайұлы'),L('Кенесары хан','Kenesary Khan','Кенесары хан'),L('Безымянный водитель','An unnamed driver','Аты жоқ жүргізуші')],
 [L('Каково значение «ғылым» в этом контексте?','What does ғылым mean here?','Мұнда ғылым нені білдіреді?'),L('Знание и наука','Knowledge and learning','Білім мен ғылым'),L('Городской транспорт','City transport','Қала көлігі'),L('Дождливая погода','Rainy weather','Жаңбырлы ауа райы')],
 [L('Какой характер у формы «мақтанба»?','What kind of form is мақтанба?','Мақтанба қандай тұлға?'),L('Отрицательное побуждение: не хвались','A negative instruction: do not boast','Болымсыз бұйрық'),L('Название места','A place name','Жер атауы'),L('Количество страниц','A page count','Бет саны')]]
};for(const book of books){if(rows[book.id])book.comprehension=[{prompt:book.check,options:book.options,answer:book.answer},...rows[book.id].map(([prompt,a,b,c])=>({prompt,options:[a,b,c],answer:0}))];}}
