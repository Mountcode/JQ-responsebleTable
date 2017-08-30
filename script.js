
let adaptive_w = $(window).width();

if (adaptive_w <= 765) {

    function tableConvert(table_name){
        // Конвертация таблицы под мобильную версию
        // Количество строк = количество табов
        let itemTabRow = 0;
        //Количество столбцов
        let itemColums = $('tr:eq(0) td', table_name).length;
        // блок с текущим заголовком
        let cellHeader = '';
        //значение тякущей ячейки для передачи в таб
        let thisVal = '';

        // Создаем общий бокс для всей этой магии
        $(table_name).before('<div class="tabsTable"></div>'); 

        // Создаем список для навигации по табам
        $('.tabsTable').append('<ul class="tableTransormTabsControls"></ul>');

        let trCount = $('tr', table_name).length - 1;

        // Создаем боксы с табами по количеству строк
        let i = 0;
        while (i < trCount) {
            $('ul.tableTransormTabsControls').after('<div class="tabsHolder"></div>');
            i++;
        }

        // Разбираем каждую строку таблицы
        $('tr', table_name).each(function(){
            // Выбираем ячейку с заголовком 
            if( itemTabRow == 0){
                $('td', this).each(function(){
                    cellHeader += ('<p>' + $(this).text()+ ': <span></span></p>');
                });
            }
            // Выбираем первую ячейку каждой строки и наполняем ею список навигации
            if( itemTabRow != 0){ //если это не первая строка-заголовок
                let TabName = $('td:eq(0)', this).text(); //выбираем типоразмер
                $('ul.tableTransormTabsControls').append('<li>'+TabName+'</li>') //добавляем к его списку
                // Добавляем табу параметр для контроля навигации
                $('.tabsHolder:eq('+ (itemTabRow - 1) +')').attr('data-tab',TabName);
                // заносим в текущий таб названия параметров из строки заголовков
                $('.tabsHolder:eq('+ (itemTabRow - 1) +')').append(cellHeader);

                // Проходим по строке и забираем значения ячеек. тут же добавляем их в соотвествующий таб
                let j = 0;
                $('td', this).each(function(){
                    // Узнаем значение ячейки
                    thisVal = $(this).text();

                    // Записываем значение в соответствующую ему строку
                    if (j < itemColums) {
                        $('.tabsHolder:eq('+ (itemTabRow - 1) +') p span:eq('+ j +')').append('  ' + thisVal);
                        j++;
                    }  
                })
            }

            // Счетчик на следующую строку
            itemTabRow++;
        }), $(table_name).hide()

        //****//

        // Табы из конвертированной таблицы
        $('.tabsHolder:eq(0)').addClass('active');
        $('.tableTransormTabsControls li:eq(0)').addClass('active');

        $('.tableTransormTabsControls li').click(function(){
            $('.tableTransormTabsControls li').removeClass('active');
            $(this).addClass('active');
            let thisButton = $(this);
            $('.tabsHolder').removeClass('active');
            $('.tabsHolder').each(function(){
                if ( thisButton.text() == $(this).attr('data-tab')){
                    $(this).addClass('active');
                }
            })
        })
    }

    tableConvert('.tableTransform')
}