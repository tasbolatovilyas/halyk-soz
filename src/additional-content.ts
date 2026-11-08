import type {Age,Book,Lesson,Local,Word} from './content';
import {expandShortBooks} from './book-expansions';
import {addThreeLessonsPerLevel} from './level-lessons';
import {addFourBooks} from './four-books';

type Bank={lessons:Lesson[];books:Book[];words:Word[];wordMap:Record<string,Word>;glossary:Record<string,{ru:string;en:string}>};
const L=(ru:string,en:string,kk:string):Local=>({ru,en,kk});
const S=(kk:string,ru:string,en:string)=>({kk,ru,en});
const all:Age[]=['child','adult','senior'];
const grown:Age[]=['adult','senior'];
const asset=(name:string)=>`./images/${name}.jpg`;

export function addAdditionalContent(bank:Bank){
 const addWord=(id:string,kk:string,ru:string,en:string,icon:string)=>{
  const existing=bank.words.find(word=>word.kk.toLocaleLowerCase()===kk.toLocaleLowerCase());
  const word=existing||{id,kk,ru,en,icon};
  if(!existing){bank.words.push(word);bank.wordMap[id]=word;}
  bank.glossary[kk.toLocaleLowerCase()]={ru,en};
  return word.id;
 };
 const words={
  library:addWord('extra-library','кітапхана','библиотека','library','library'),
  book:addWord('extra-book','кітап','книга','book','book'),
  story:addWord('extra-story','ертегі','сказка','fairy tale','book'),
  read:addWord('extra-read','оқу','читать / учиться','read / study','book'),
  market:addWord('extra-market','базар','рынок','market','basket'),
  fruit:addWord('extra-fruit','жеміс','фрукт','fruit','apple'),
  pear:addWord('extra-pear','алмұрт','груша','pear','pear'),
  price:addWord('extra-price','баға','цена','price','tag'),
  scale:addWord('extra-scale','таразы','весы','scales','basket'),
  train:addWord('extra-train','пойыз','поезд','train','bus'),
  station:addWord('extra-station','бекет','станция','station','road'),
  ticket:addWord('extra-ticket','билет','билет','ticket','book'),
  yesterday:addWord('extra-yesterday','кеше','вчера','yesterday','sun'),
  today:addWord('extra-today','бүгін','сегодня','today','sun'),
  walk:addWord('extra-walk','серуендеу','гулять','take a walk','run'),
  park:addWord('extra-park','саябақ','парк','park','flower'),
  letter:addWord('extra-letter','хат','письмо','letter','book'),
  thank:addWord('extra-thank','алғыс','благодарность','thanks','heart')
 };
 Object.assign(bank.glossary,{
  'кітапханашы':{ru:'библиотекарь',en:'librarian'},'ертегі':{ru:'сказка',en:'fairy tale'},
  'екеуі':{ru:'они вдвоём',en:'the two of them'},
  'сатушы':{ru:'продавец',en:'vendor'},'таңертең':{ru:'утром',en:'in the morning'},
  'таңдады':{ru:'выбрал / выбрала',en:'chose'},'салды':{ru:'положил / положила',en:'put'},
  'сатып':{ru:'покупая',en:'buying'},'алды':{ru:'купил / купила',en:'bought'},
  'жолаушылар':{ru:'пассажиры',en:'passengers'},'терезеден':{ru:'из окна',en:'through the window'},
  'тауларды':{ru:'горы',en:'mountains'},'жетті':{ru:'добрался / добралась',en:'arrived'},
  'келіп':{ru:'пришёл / придя',en:'came / after coming'},'дайындалды':{ru:'приготовился / приготовились',en:'got ready'},
  'көрді':{ru:'увидел / увидела',en:'saw'},'себетіне':{ru:'в свою корзину',en:'into her basket'},
  'бағасын':{ru:'цену',en:'the price'},'үйіне':{ru:'домой',en:'home'},
  'аман-есен':{ru:'благополучно',en:'safely'},'қайтып':{ru:'возвращаясь',en:'returning'},
  'кітапты':{ru:'книгу',en:'the book'},'келді':{ru:'пришёл / пришла',en:'came'},
  'оқыды':{ru:'читал / читала',en:'read'},'ұсынды':{ru:'предложил / предложила',en:'offered'},
  'қайтарды':{ru:'вернул / вернула',en:'returned'},'айтты':{ru:'сказал / сказала',en:'said'}
 });
 const lesson=(id:string,title:Local,subtitle:Local,level:Lesson['level'],ages:Age[],icon:string,color:string,wordIds:string[],sentence:string,translation:Local,missing:string,guide?:Lesson['guide']):Lesson=>({id,title,subtitle,level,ages,icon,color,wordIds,category:guide?'grammar':'conversation',sentence,translation,missing,...(guide?{guide}:{})});
 bank.lessons.push(
  lesson('extra-library-visit',L('В библиотеке: выберем историю','At the library: choose a story','Кітапханада: әңгіме таңдаймыз'),L('Книги, библиотека и чтение','Books, the library and reading','Кітап, кітапхана және оқу'),'A0',all,'book','sage',[words.library,words.book,words.story,words.read],'Мен кітап оқимын.',L('Я читаю книгу.','I read a book.','Мен кітап оқимын.'),'кітап'),
  lesson('extra-market-talk',L('На базаре: спросить цену','At the market: ask the price','Базарда: бағасын сұрау'),L('Фрукты, покупки и вежливая просьба','Fruit, shopping and polite requests','Жеміс, сауда және сыпайы өтініш'),'A1',grown,'basket','sand',[words.market,words.fruit,words.pear,words.price,words.scale],'Мына алмұрт қанша тұрады?',L('Сколько стоит эта груша?','How much is this pear?','Мына алмұрт қанша тұрады?'),'алмұрт'),
  lesson('extra-train-trip',L('Поездка на поезде','Travelling by train','Пойызбен саяхат'),L('Билет, станция и время отправления','Tickets, stations and departure times','Билет, бекет және жолға шығу уақыты'),'A2',grown,'bus','blue',[words.train,words.station,words.ticket,words.letter],'Мен пойызға билет алдым.',L('Я купил билет на поезд.','I bought a train ticket.','Мен пойызға билет алдым.'),'билет'),
  lesson('extra-yesterday',L('Что было вчера?','What happened yesterday?','Кеше не болды?'),L('Рассказываем о прошедшем дне','Talk about the day that has passed','Өткен күн туралы айту'),'A2',grown,'sun','lavender',[words.yesterday,words.today,words.walk,words.park],'Кеше біз саябақта серуендедік.',L('Вчера мы гуляли в парке.','We took a walk in the park yesterday.','Кеше біз саябақта серуендедік.'),'Кеше',{
   rule:L('В простом рассказе о завершённом действии часто встречается прошедшая форма на -ды/-ді или -ты/-ті. Сравните: бүгін оқимын — читаю сегодня; кеше оқыдым — читал вчера.','A simple account of a completed action often uses a past form ending in -ды/-ді or -ты/-ті. Compare: бүгін оқимын — I read today; кеше оқыдым — I read yesterday.','Аяқталған әрекетті айтқанда -ды/-ді немесе -ты/-ті өткен шақ жалғауы жиі қолданылады. Салыстырыңыз: бүгін оқимын; кеше оқыдым.'),
   examples:[S('Бүгін саябақта серуендеймін.','Сегодня я гуляю в парке.','Today I take a walk in the park.'),S('Кеше саябақта серуендедім.','Вчера я гулял в парке.','Yesterday I took a walk in the park.')],
   tip:L('Сначала отметьте время: кеше — вчера. Затем найдите действие и проверьте его окончание.','First note the time word: кеше means yesterday. Then find the action and notice its ending.','Алдымен уақыт сөзін байқаңыз: кеше — yesterday. Содан кейін қимылды тауып, жалғауына назар аударыңыз.')
  })
 );
 const books:Book[]=[
  {id:'extra-library-story',title:L('Книга для двоих','A book for two','Екеуге арналған кітап'),genre:'literature',level:'A0',ages:all,childSafe:true,color:'sage',art:'book',image:asset('library-story'),description:L('Короткая история о чтении вместе','A short story about reading together','Бірге кітап оқу туралы шағын әңгіме'),author:L('Авторский учебный рассказ Halyk.Soz','An original Halyk.Soz learning story','Halyk.Soz авторлық оқу әңгімесі'),sentences:[S('Бүгін Айша кітапханаға келді.','Сегодня Айша пришла в библиотеку.','Today Aisha came to the library.'),S('Кітапханашы оған ертегі ұсынды.','Библиотекарь предложил ей сказку.','The librarian offered her a fairy tale.'),S('Айша әжесімен бірге кітап оқыды.','Айша читала книгу вместе с бабушкой.','Aisha read a book together with her grandmother.'),S('Екеуі жаңа сөздерді қайталады.','Они повторили новые слова.','The two of them repeated the new words.'),S('Кешке кітапты орнына қайтарды.','Вечером они вернули книгу на место.','In the evening, they returned the book.')],check:L('С кем Айша читала книгу?','Who read the book with Aisha?','Айша кітапты кіммен бірге оқыды?'),options:[L('С бабушкой','With her grandmother','Әжесімен'),L('С продавцом','With a shopkeeper','Сатушымен'),L('С водителем','With a driver','Жүргізушімен')],answer:0,comprehension:[{prompt:L('С кем Айша читала книгу?','Who read the book with Aisha?','Айша кітапты кіммен бірге оқыды?'),options:[L('С бабушкой','With her grandmother','Әжесімен'),L('С продавцом','With a shopkeeper','Сатушымен'),L('С водителем','With a driver','Жүргізушімен')],answer:0},{prompt:L('Что предложил библиотекарь?','What did the librarian offer?','Кітапханашы не ұсынды?'),options:[L('Сказку','A fairy tale','Ертегі'),L('Билет','A ticket','Билет'),L('Яблоко','An apple','Алма')],answer:0}]},
  {id:'extra-market-story',title:L('Утро на базаре','Morning at the market','Базардағы таң'),genre:'literature',level:'A1',ages:grown,childSafe:true,color:'sand',art:'basket',image:asset('market-morning'),description:L('Покупки, новые слова и вежливый разговор','Shopping, new words and a polite conversation','Сауда, жаңа сөздер және сыпайы әңгіме'),author:L('Авторский учебный рассказ Halyk.Soz','An original Halyk.Soz learning story','Halyk.Soz авторлық оқу әңгімесі'),sentences:[S('Таңертең Дана базарға келді.','Утром Дана пришла на базар.','In the morning, Dana came to the market.'),S('Ол алма мен алмұрт таңдады.','Она выбрала яблоки и груши.','She chose apples and pears.'),S('Сатушы жемісті таразыға салды.','Продавец положил фрукты на весы.','The vendor put the fruit on the scales.'),S('Дана бағасын сұрап, себетіне салды.','Дана спросила цену и положила фрукты в корзину.','Dana asked the price and put the fruit in her basket.'),S('Ол алғыс айтып, үйіне қайтты.','Она поблагодарила и вернулась домой.','She said thank you and went home.')],check:L('Что Дана положила на весы?','What did Dana put on the scales?','Дана таразыға не қойды?'),options:[L('Фрукты','Fruit','Жеміс'),L('Книги','Books','Кітаптар'),L('Билеты','Tickets','Билеттер')],answer:0,comprehension:[{prompt:L('Что Дана положила на весы?','What did Dana put on the scales?','Дана таразыға не қойды?'),options:[L('Фрукты','Fruit','Жеміс'),L('Книги','Books','Кітаптар'),L('Билеты','Tickets','Билеттер')],answer:0},{prompt:L('Что Дана сделала перед тем, как вернуться домой?','What did Dana do before going home?','Дана үйге қайтпас бұрын не істеді?'),options:[L('Поблагодарила','She said thank you','Алғыс айтты'),L('Купила билет','She bought a ticket','Билет сатып алды'),L('Прочитала книгу','She read a book','Кітап оқыды')],answer:0}]},
  {id:'extra-train-story',title:L('Билет на утренний поезд','A ticket for the morning train','Таңғы пойызға билет'),genre:'literature',level:'A2',ages:grown,childSafe:true,color:'blue',art:'road',image:asset('station-story'),description:L('История о поездке, времени и дороге домой','A story about travel, time and the way home','Саяхат, уақыт және үйге қайту туралы әңгіме'),author:L('Авторский учебный рассказ Halyk.Soz','An original Halyk.Soz learning story','Halyk.Soz авторлық оқу әңгімесі'),sentences:[S('Айбек пойызбен қалаға барды.','Айбек поехал в город на поезде.','Aibek travelled to the city by train.'),S('Ол бекетке ерте келіп, билет сатып алды.','Он пришёл на станцию пораньше и купил билет.','He arrived at the station early and bought a ticket.'),S('Билетте пойыздың уақыты мен орны жазылған.','На билете указаны время поезда и место.','The ticket shows the train time and seat.'),S('Пойыз келгенде, жолаушылар жолға дайындалды.','Когда поезд прибыл, пассажиры приготовились к дороге.','When the train arrived, the passengers got ready for the journey.'),S('Терезеден Айбек дала мен тауларды көрді.','Из окна Айбек увидел степь и горы.','Through the window, Aibek saw the steppe and mountains.'),S('Кешке ол қалаға аман-есен жетті.','Вечером он благополучно добрался до города.','In the evening, he arrived safely in the city.')],check:L('Айбек пойызбен қайда барды?','Where did Aibek travel by train?','Айбек пойызбен қайда барды?'),options:[L('В город','To the city','Қалаға'),L('В библиотеку','To the library','Кітапханаға'),L('На базар','To the market','Базарға')],answer:0,comprehension:[{prompt:L('Айбек пойызбен қайда барды?','Where did Aibek travel by train?','Айбек пойызбен қайда барды?'),options:[L('В город','To the city','Қалаға'),L('В библиотеку','To the library','Кітапханаға'),L('На базар','To the market','Базарға')],answer:0},{prompt:L('Билетте қандай ақпарат бар?','What information is on the ticket?','Билетте қандай ақпарат жазылған?'),options:[L('Время поезда и место','Train time and seat','Пойыздың уақыты мен орны'),L('Погода на завтра','Tomorrow’s weather','Ертеңгі ауа райы'),L('Название книги','The book title','Кітаптың атауы')],answer:0}]}
 ];
 bank.books.push(...books);
 // Keep a small set of in-story illustrations in the same painterly style as the covers.
 books[0].illustrations=[{image:'./images/children-library.png',after:2,caption:L('Чтение вместе в библиотеке','Reading together at the library','Кітапханада бірге оқу')}];
 books[1].illustrations=[{image:'./images/history-caravan.png',after:2,caption:L('Торговые пути и базарная жизнь','Trading routes and market life','Сауда жолдары мен базар тіршілігі')}];
 books[2].illustrations=[{image:'./images/history-city.png',after:3,caption:L('Путешествие через города и степь','A journey through cities and the steppe','Қала мен дала арқылы саяхат')}];
 expandShortBooks(bank.books);
 addFourBooks(bank);
 addThreeLessonsPerLevel(bank);
}
