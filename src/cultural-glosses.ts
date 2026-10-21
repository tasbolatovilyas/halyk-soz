import type {Local} from './content';
const L=(ru:string,en:string,kk:string):Local=>({ru,en,kk});
export const culturalNotes:Record<string,Local>={
 'наурыз':L('В календаре «наурыз» — март. «Наурыз мейрамы» — весенний праздник. Например: «наурыз айында» — в марте; «Наурыз құтты болсын!» — с праздником Наурыз. Значение выбираем по контексту.','In a calendar, nauryz means March. Nauryz meyramy is the spring festival. Nauryz ayında means in March; Nauryz qūtty bolsyn is a festival greeting. Context determines the meaning.','Күнтізбедегі наурыз — үшінші ай. Наурыз мейрамы — көктемгі мереке. «Наурыз айында» айды, «Наурыз құтты болсын!» мерекені білдіреді. Мағына мәнмәтіннен анықталады.'),
 'күй':L('В музыкальном контексте — кюй, инструментальная пьеса. В других сочетаниях «күй» означает состояние: «көңіл күй» — настроение.','In music, kuy is an instrumental piece. Elsewhere küy can mean a state or condition: köñil küy means mood.','Музыкада күй — аспаптық шығарма. Басқа тіркестерде жай-күйді білдіреді: «көңіл күй» — адамның көңіл қалпы.'),
 'шаңырақ':L('Буквально — верхний круг юрты. Переносно может означать дом и семью: «шаңырақ көтеру» — создать семью.','Literally the roof crown of a yurt. Figuratively it may refer to a home or family: şañyraq köteru means to start a family.','Тура мағынасы — киіз үйдің төбедегі шеңбері. Ауыспалы мағынада үйді, отбасын білдіреді: «шаңырақ көтеру» — отбасын құру.'),
 'жүз':L('Может означать число сто, лицо или историческое объединение — жуз. Например: «жүз теңге» — сто тенге. Одного перевода для всех случаев нет.','It can mean one hundred, a face, or a historical grouping called a zhuz. Jüz teñge means one hundred tenge. One translation does not fit every context.','Жүз санды, бетті немесе тарихи бірлестікті білдіруі мүмкін. Мысалы, «жүз теңге» — сан. Барлық мәнмәтінге бір аударма жарамайды.'),
 'той':L('Празднование или торжество; не обязательно свадьба. «Үйлену тойы» — свадьба, «туған күн тойы» — празднование дня рождения.','A celebration or feast; not necessarily a wedding. Üilenu toiy is a wedding; tuğan kün toiy is a birthday celebration.','Той — мереке, салтанат. Міндетті түрде үйлену тойы емес: «туған күн тойы» да бар.'),
 'дастарқан':L('Буквально — скатерть; также накрытый стол и общая трапеза. В рассказе о гостях обычно имеется в виду угощение и встреча за столом.','Literally a tablecloth; also the laid table or shared meal. In a story about guests it usually refers to hospitality around the table.','Тура мағынасы — ас жаятын мата. Сонымен бірге жайылған ас пен ортақ дастарқан басындағы кездесуді білдіреді.')
};
export function enrichGlosses(bank:Record<string,{ru:string;en:string}>){
 Object.assign(bank,{
  наурыз:{ru:'Март; также Наурыз — весенний праздник',en:'March; also Nauryz, the spring festival'},
  күй:{ru:'Кюй, инструментальная пьеса; состояние — по контексту',en:'Kuy, an instrumental piece; state or condition in other contexts'},
  шаңырақ:{ru:'Верхний круг юрты; также дом, семья',en:'Yurt roof crown; also home or family'},
  жүз:{ru:'Сто; лицо; исторический жуз — по контексту',en:'One hundred; face; historical zhuz — depending on context'},
  той:{ru:'Празднование, торжество',en:'Celebration or feast'},
  дастарқан:{ru:'Скатерть; накрытый стол, общая трапеза',en:'Tablecloth; laid table or shared meal'}
 });
}
