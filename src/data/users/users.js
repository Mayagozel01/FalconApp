const users= {
    // Отображение слоев
    'view': 'Независимый',//"Независимый" | "Выбор" | "Стадии" | "Полноэкранный"
    // Название группы слоев
    'name': 'СписокКонтактовСписокКонтактов',
    // Версия слоя (под версией понимается последний вариант изменений)
    'version':'1', //string
    // порядок слоев
    'layoutsOrder':// Array<Layout>
    [
        {
            // Название слоя
            'name': 'РеестрПользователейАккорд',//string
            // Порядок слоя
            'order': 'Главный',//"Главный" | "Второстепенный" | "Кнопка"
            // Закрепление слоя
            'attach': 'Левое', //"Левое" | "Правое" | null
            // Размер слоя
            'size':'Минимальный',// "Минимальный"| "Рекомендуемый"| "Максимальный"
            // Видимость слоя
            'isShow': true,
            // Возможность редактирования слоя
            'isEdit': false,
            // Активный/неактивный слой
            'isActive': false,
            // Заголовок слоя
            'title': {
                // Значение заголовка
                'value':'Меню', //string
                // Короткое название
                'shortValue': 'Меню',
                // Путь для яндекс Алиса
                'yaAlice': ['РеестрПользователей','РеестрПользователейАккорд'],//Array<string>
                /* Данные фильтра 
                    null - нет данных
                    {} - есть
                    undefined - фильтра не отображается
                */
                'filter': 'undefined',//необязателен
                /* Данные поиска 
                    null - нет данных
                    {} - есть
                    undefined - поиска не отображается
                */
                'search': 'undefined',//необязателен
            },
            // Обработчик, скорее всего не понадобится, т.к. вычисления будут выполняться на стороне API
            'handler': {
                'name': ''
            },
            // Контекстные команды слоя
            'contextCommands': [],
            // Основная часть слоя
            'content': {
                // Структура слоя
                'structure': //Structure  //необязателен
                {
                    // Тип структуры
                    'type':'Свернут', //null | "Постоянный" | "Свернут" | "Развернут" | "Облачный" | "Перечисление"
                    // Вид отображения структуры (для фронтенда)
                    'view':'list', //"list" | "table" | "dialog"
                    // Стиль отображения (для view)
                    'style':'ТаблицаДерево',//"ТаблицаДерево" | "Опрос" | null
                    // Завершённость полученных данных (пагинация) ???
                    'Завершённость': true,

                    //Заголовок 
                    'tableName': 'Меню',
                    // Отображение заголовков
                    'showHeader': false,//boolean
                    // Заголовки
                    'header': [
                        {
                            // id заголовка для строк 
                            'id': "0",
                            // текст заголовка
                            'title': "Фамилия ",//string | null
                            'shortTitle':'', //string | null //Если его нет, то будет title
                             //Отображение текста заголовка
                             isShow: false,//boolean
                             // id родительского столбца
                             'parentId':  "",//string | number | null  
                             'variable': "РеестрПользователейАккорд.Значение", //не обязательно:string | null // Зарезервированные имена | "Номер"| "Дата" | "Дата2" | "Пользователь"| "Наша компания" | "Контрагент" | "Представитель"
                            
                            /*  
                                обязательность заполнения
                                false - обязательное поле при отправке проверяется, если не заполнено, то предупреждение
                                true - не отправляется если не заполнено
                                undefined - не проверяется
                             */
                             'required': 'undefined',
                              //Тип данных (для выгрузки справочника и обратной загрузке, в интерфейсе не обязательно)
                             'dataType': 'string', //Не обязательно: "string" | "number" | "boolean" | "date"...
                             
                             'options': {
                                // min и max числового диапазон значения
                                    //min?: number | null
                                    //max?: number | null
                                // число знаков после запятой
                                    //round?: number | null
                                // max и min  длина строки
                                    //strLenMax?: number | null
                                    //strLenMin?: number | null
                                // формат данных "dd.mm.yyyy hh:mm:ss", "00 00 000000"
                                    //format?: string | null
                                /*
                                true - можно выбрать несколько значений с учетом порядка
                                false - можно выбрать несколько значений без учета порядка
                                null - без мультивыбора
                                */
                                    //selectMultipleOrder: boolean | null,
                                // Команды контекстного меню
                                    //contextCommands?: string | null
                                // Кнопки при отображении списком
                                    //buttons?: Array<Button> | null
                                // Подсказка
                                    //clue: string | null
                            },
                            // порядок столбца, если null или variable = '$Параметры', то этот столбец в таблице не отображается
                             'view': {
                                 /* 
                                    Порядок для: 
                                    i[0] - Позиция для отображения таблицей
                                    i[1] - Позиция для отображения списком
                                    i[2] - Позиция для отображения диалогом
                                    Например, [0,1,1] - отображается везде кроме таблицы
                                */
                                'index': [
                                    1,
                                    0,
                                    0
                                ]
                                /* Лесенка. отвечает за отображения строк с одинаковыми данными
                                    если true - то все строки с одинаковыми данными будут объединены в один
                                */
                                //groupRecords: boolean
                            }
                        }
                    ],
                    // Строки
                    'rows': [
                        {
                            // Иконка строки
                            'icon':'', //не обязательно null | "url"
                            // состояние строки
                            'state': {
                                // объединение строки
                                'unionRow': true, //boolean

                                /* Условие достоверности данных в строке
                                    true - данные достоверны
                                    false - данные недостоверны
                                    undefined - не проверяется
                                */
                                'veracity': '',//true | false | null
                                // Доступность строки
                                'isAllowed':true,// boolean,
                                // Видимость строки
                                'isShow':true,// boolean
                                // Отмечена ли строка (фронтенд)
                                'isMark': false, //boolean
                                // Активаня строка (т.е. на фронтенде иерархия развернется до этой строки, например отображение деревом)
                                // При передаче в Row являющийся разделом - отображается развернутым
                                'isActive': true
                            },
                            //id строки из бд
                            'id': '0',//string | number
                            // позиция строки
                            'index': 0,//number
                            // id родительской строки
                            'parentId': '',//string | number | null
                            
                            //?????
                            'nesting': "",
                            
                            // Ячейки строки   cells: Array<Cell>
                            "cells": [
                                {
                                    // id в бд
                                    'id':'', //string
                                    
                                    /* Порядок ячейки. Если строка принадлежит панели, то будет массивом 
                                    в порядке, Основное, Избранное, Техническое
                                    */
                                    'index': {},//Не обязательный Array<number>
                                        // текст всплывающей подсказки
                                    'alt':'', //string

                                    // иконка
                                    'icon': '',//null | "url"

                                    // состояние ячейки. Не обязательно
                                    'state': {
                                        // Доступность ячейки для редактирования
                                        'isAllowed': false,// boolean
                                        // Достоверность ячейки
                                        'veracity': '',// boolean | null
                                    },
                                    // Примечание
                                    'note': '',//Не обязательно string | null
                                    
                                    // Ссылка или Http запрос для ячейки. Приоритет выше аналога для столбца и строки. Если тип ячейки подразумевает выбор, то выполняется при нахождениислоя в режиме просмотра(Layout.isEdit:false) 
                                    // URL если передан body выполняет как Http запрос, 
                                    // в инном случае обычная ссылка (например в списке оборачивает в тег a) 
                                    //{} | null
                                    //'action': {},

                                   // id столбца, привязан к header
                                    'headerId': '0',

                                    /** Значение
                                    * Array<string> - Массив строк, например если данных мало или они не измены. Пример Да, Нет
                                    * DirectoryConnection - Ссылка на справочник из которого берутся данные
                                    * string - Строка
                                    */
                                    'value': 'Пользователи', 
                                    
                                    // для единиц измерения данные приходят в отдельном свойстве
                                    // * Ссылка на справочник "Единиц измерения" для значения ячейки
                                    'units':''// DirectoryConnection
                                }
                            ],
                            'isNew': true   // может быть только при загрузке из Excel
                        },
                        {

                            
                            "id": "1",
                            "index": 0,
                            "parentId": "0",
                            'state': {
                                'isActive': true
                            },
                            "nesting": "",
                            "cells": [
                                {
                                    "headerId": "0",
                                    "value": "Список",
                                    'action': { 
                                        'link': 'https://Cайт.com/page/Список пользователей'
                                    }
                                }
                            ],
                            "isNew": true
                        },
                        {
                            "id": "2",
                            "index": 1,
                            "parentId": "0",
                            "nesting": "",
                            "cells": [
                                {
                                    "headerId": "0",
                                    "value": "Права",
                                    'action': { 
                                        'link': 'https://Cайт.com/page/Права пользователей'
                                    },
                                }
                            ],
                            "isNew": true
                        },
                        {
                            "id": "3",
                            "index": 1,
                            "parentId": "",
                            "nesting": "",
                            "cells": [
                                {
                                    "headerId": "0",
                                    "value": "Документы"
                                }
                            ],
                            "isNew": true
                        },
                        {
                            "id": "4",
                            "index": 0,
                            "parentId": "1",
                            "nesting": "",
                            "cells": [
                                {
                                    "headerId": "0",
                                    "value": "Проекты",
                                    'action': { 
                                        'link': 'https://Cайт.com/page/реестр проекты'
                                    },
                                }
                            ],
                            "isNew": true
                        },
                        {
                            "id": "5",
                            "index": 1,
                            "parentId": "1",
                            "nesting": "",
                            "cells": [
                                {
                                    "headerId": "0",
                                    "value": "Работы",
                                    'action': { 
                                        'link': 'https://Cайт.com/page/реестр работы'
                                    },
                                }
                            ],
                            "isNew": true
                        }
                    ]
                },
                // Кнопки слоя
                'buttons': []//Array<Button> // Необязательно
            }
        },
        {
            // Название слоя
            'name': 'РеестрПользователейВидРазрешения',//string
            // Порядок слоя
            'order': 'Второстепенный',//"Главный" | "Второстепенный" | "Кнопка"
            // Закрепление слоя
            'attach': null,
            // Размер слоя
            'size':'Рекомендуемый',// "Минимальный"| "Рекомендуемый"| "Максимальный"
            // Видимость слоя
            'isShow': true,
            // Возможность редактирования слоя
            'isEdit': false,
            // Активный/неактивный слой
            'isActive': false,
            // Заголовок слоя
            'title': {
                // Значение заголовка
                'value':'Виды разрешений', //string
                // Короткое название
                'shortValue': 'Вид',
                // Путь для яндекс Алиса
                'yaAlice': ['РеестрПользователей','РеестрПользователейВидРазрешения'],//Array<string>
                /* Данные фильтра 
                    null - нет данных
                    {} - есть
                    undefined - фильтра не отображается
                */
                'filter': 'undefined',//необязателен
                /* Данные поиска 
                    null - нет данных
                    {} - есть
                    undefined - поиска не отображается
                */
                'search': 'undefined',//необязателен
            },
            // Обработчик, скорее всего не понадобится, т.к. вычисления будут выполняться на стороне API
            'handler': {
                'name': ''
            },
            // Контекстные команды слоя
            'contextCommands': [],
            // Основная часть слоя
            'content': {
                // Структура слоя
                'structure': //Structure  //необязателен
                {
                    // Тип структуры
                    'type':'Свернут', //null | "Постоянный" | "Свернут" | "Развернут" | "Облачный" | "Перечисление"
                    // Вид отображения структуры (для фронтенда)
                    'view':'list', //"list" | "table" | "dialog"
                    //Стиль отображения (для view)
                    'style':'ТаблицаДерево', //"ТаблицаДерево" | "Опрос" | null
                    // Завершённость полученных данных (пагинация) ???
                    'Завершённость': true,

                    //Заголовок 
                    'tableName': 'Выды',
                    // Отображение заголовков
                    'showHeader': false,//boolean
                    // Заголовки
                    'header':[
                        {
                            "id": "3",
                            "title": "Контакт",
                            "parentId": "",
                            "variable": "РеестрПользователейВидРазрешения.Значение",
                            "required": true,
                            "dataType": "string",
                            "view": {
                                "index": [
                                    1,
                                    0,
                                    0
                                ]
                            },
                            "isShow": false
                        }
                    ],
                    // Строки
                    'rows':[
                                {
                                    "id": "5",
                                    "index": 5,
                                    "parentId": "",
                                    "nesting": "",
                                    "cells": [
                                        {
                                            "headerId": "3",
                                            "value": "Разрешен доступ"
                                        }
                                    ],
                                    "isNew": true,
                                    "stat": {
                                    "isActive": true
                                    }

                                },
                                {
                                    "id": "6",
                                    "index": 6,
                                    "parentId": "",
                                    "nesting": "",
                                    "cells": [
                                        {
                                            "headerId": "3",
                                            "value": "Заблокированы"
                                        }
                                    ],
                                    "isNew": true
                                }
                            ]
                },
                // Кнопки слоя
                'buttons': []//Array<Button> // Необязательно
            }
        },
        {
            // Название слоя
            'name': 'СписокКарточкаФизлица',//string
            // Порядок слоя
            'order': 'Второстепенный',//"Главный" | "Второстепенный" | "Кнопка"
            // Закрепление слоя
            'attach': null,
            // Размер слоя
            'size':'Рекомендуемый',// "Минимальный"| "Рекомендуемый"| "Максимальный"
            // Видимость слоя
            'isShow': true,
            // Возможность редактирования слоя
            'isEdit': false,
            // Активный/неактивный слой
            'isActive': true,
            // Заголовок слоя
            'title': {
                // Значение заголовка
                'value':'Пользователи', //string
                // Короткое название
                'shortValue': 'Пользователи',
                // Путь для яндекс Алиса
                'yaAlice': ['РеестрПользователей','СписокКарточкаФизлиц'],//Array<string>
                /* Данные фильтра 
                    null - нет данных
                    {} - есть
                    undefined - фильтра не отображается
                */
                'filter': null,//необязателен
                /* Данные поиска 
                    null - нет данных
                    {} - есть
                    undefined - поиска не отображается
                */
                'search': null,//необязателен
            },
            // Обработчик, скорее всего не понадобится, т.к. вычисления будут выполняться на стороне API
            'handler': {
                'name': ''
            },
            // Контекстные команды слоя
            'contextCommands': [],
            // Основная часть слоя
            'content': {
                // Структура слоя
                'structure':{ //Structure  //необязателен
                
                    // Тип структуры
                    'type':'Свернут', //null | "Постоянный" | "Свернут" | "Развернут" | "Облачный" | "Перечисление"
                    // Вид отображения структуры (для фронтенда)
                    'view':'table', //"list" | "table" | "dialog"
                    // Стиль отображения (для view)
                    'style':'', //"ТаблицаДерево" | "Опрос" | null
                    // Завершённость полученных данных (пагинация) ???
                    'Завершённость': true,

                    //Заголовок 
                    'tableName': 'Cписок пользователей',
                    // Отображение заголовков
                    'showHeader': true,//boolean
                    // Заголовки
                    'header': [
                        {
                            "id": "3",
                            "title": "Фамилия ",
                            "parentId": "",
                            "variable": "СписокКарточкаФизлица.Фамилия*",
                            "required": true,
                            "dataType": "string",
                            "view": {
                                "index": [
                                    1,
                                    1,
                                    1
                                ]
                            },
                            "isShow": false
                        },
                        {
                            "id": "4",
                            "title": "Имя",
                            "parentId": "",
                            "variable": "СписокКарточкаФизлица.Имя",
                            "required": true,
                            "dataType": "string",
                            "view": {
                                "index": [
                                    2,
                                    2,
                                    2
                                ]
                            },
                            "isShow": false
                        },
                        {
                            "id": "5",
                            "title": "Отчество",
                            "parentId": "",
                            "variable": "СписокКарточкаФизлица.Отчество",
                            "required": true,
                            "dataType": "string",
                            "view": {
                                "index": [
                                    3,
                                    3,
                                    3
                                ]
                            },
                            "isShow": false
                        },
                        {
                            "id": "6",
                            "title": "ИНН",
                            "parentId": "",
                            "variable": "СписокКарточкаФизлица.ИНН",
                            "required": true,
                            "dataType": "number",
                            "view": {
                                "index": [
                                    '',
                                    4,
                                    4
                                ]
                            },
                            "isShow": false
                        },
                        {
                            "id": "7",
                            "title": "Режим",
                            "parentId": "",
                            "variable": "СписокКарточкаФизлица.Режим",
                            "required": false,
                            "dataType": "string",
                            "view": {
                                "index": [
                                    '',
                                    5,
                                    5
                                ]
                            },
                            "isShow": false
                        },
                        {
                            "id": "9",
                            "title": "Документ",
                            "parentId": "8",
                            "variable": "СписокКарточкаФизлица.ЛичДанныеДокумент",
                            "required": false,
                            "dataType": "string",
                            "view": {
                                "index": [
                                    '',
                                    0,
                                    0
                                ]
                            },
                            "isShow": false
                        },
                        {
                            "id": "8",
                            "title": "Личные данные",
                            "parentId": "",
                            "variable": "СписокКарточкаФизлица.ЛичДанныеДокумент",
                            "required": false,
                            "dataType": "string",
                            "view": {
                                "index": [
                                    '',
                                    7,
                                    7
                                ]
                            },
                            "isShow": false
                        },
                        {
                            "id": "10",
                            "title": "Серия и номер",
                            "parentId": "8",
                            "variable": "СписокКарточкаФизлица.ЛичДанныеСерияНомер",
                            "required": false,
                            "dataType": "string",
                            "view": {
                                "index": [
                                    '',
                                    1,
                                    1
                                ]
                            },
                            "isShow": false
                        },
                        {
                            "id": "11",
                            "title": "Дата выдачи",
                            "parentId": "8",
                            "variable": "СписокКарточкаФизлица.ЛичДанныеДатаВыдачи",
                            "required": false,
                            "dataType": "date",
                            "view": {
                                "index": [
                                    '',
                                    2,
                                    2
                                ]
                            },
                            "isShow": false
                        },
                        {
                            "id": "13",
                            "title": "Логин",
                            "parentId": "12",
                            "variable": "СписокКарточкаФизлица.Логин*",
                            "required": true,
                            "dataType": "string",
                            "view": {
                                "index": [
                                    0,
                                    0,
                                    0
                                ]
                            },
                            "isShow": false
                        },
                        {
                            "id": "12",
                            "title": "Доступ",
                            "parentId": "",
                            "variable": "СписокКарточкаФизлица.Логин*",
                            "required": true,
                            "dataType": "string",
                            "view": {
                                "index": [
                                    4,
                                    10,
                                    10
                                ]
                            },
                            "isShow": false
                        },
                        {
                            "id": "14",
                            "title": "Пароль",
                            "parentId": "12",
                            "variable": "СписокКарточкаФизлица.Пароль*",
                            "required": true,
                            "dataType": "string",
                            "view": {
                                "index": [
                                    1,
                                    1,
                                    1
                                ]
                            },
                            "isShow": false
                        }
                    ],
                    // Строки
                    'rows':[
                        {
                            "id": "0",
                            "index": 0,
                            "parentId": "",
                            "nesting": "",
                            "cells": [
                                {
                                    "headerId": "3",
                                    "value": "Новенькие"
                                },
                                {
                                    "headerId": "4",
                                    "value": ""
                                },
                                {
                                    "headerId": "5",
                                    "value": ""
                                },
                                {
                                    "headerId": "6",
                                    "value": ""
                                },
                                {
                                    "headerId": "7",
                                    "value": ""
                                },
                                {
                                    "headerId": "9",
                                    "value": ""
                                },
                                {
                                    "headerId": "10",
                                    "value": ""
                                },
                                {
                                    "headerId": "11",
                                    "value": ""
                                },
                                {
                                    "headerId": "13",
                                    "value": ""
                                },
                                {
                                    "headerId": "14",
                                    "value": ""
                                }
                            ],
                            "isNew": true
                        },
                        {
                            "id": "1",
                            "index": 0,
                            "parentId": "0",
                            "nesting": "",
                            "cells": [
                                {
                                    "headerId": "3",
                                    "value": "Иванов"
                                },
                                {
                                    "headerId": "4",
                                    "value": "Иван"
                                },
                                {
                                    "headerId": "5",
                                    "value": "Иванович"
                                },
                                {
                                    "headerId": "6",
                                    "value": "72111111"
                                },
                                {
                                    "headerId": "7",
                                    "value": ""
                                },
                                {
                                    "headerId": "9",
                                    "value": "Паспорт"
                                },
                                {
                                    "headerId": "10",
                                    "value": "72 123"
                                },
                                {
                                    "headerId": "11",
                                    "value": "21.12.2024"
                                },
                                {
                                    "headerId": "13",
                                    "value": "Иван"
                                },
                                {
                                    "headerId": "14",
                                    "value": "1234"
                                }
                            ],
                            "isNew": true
                        },
                        {
                            "id": "2",
                            "index": 1,
                            "parentId": "",
                            "nesting": "",
                            "cells": [
                                {
                                    "headerId": "3",
                                    "value": "Бывалые"
                                },
                                ,
                                {
                                    "headerId": "4",
                                    "value": ""
                                },
                                {
                                    "headerId": "5",
                                    "value": ""
                                },
                                {
                                    "headerId": "6",
                                    "value": ""
                                },
                                {
                                    "headerId": "7",
                                    "value": ""
                                },
                                {
                                    "headerId": "9",
                                    "value": ""
                                },
                                {
                                    "headerId": "10",
                                    "value": ""
                                },
                                {
                                    "headerId": "11",
                                    "value": ""
                                },
                                {
                                    "headerId": "13",
                                    "value": ""
                                },
                                {
                                    "headerId": "14",
                                    "value": ""
                                }
                            ],
                            "isNew": true
                        },
                        {
                            "id": "3",
                            "index": 0,
                            "parentId": "2",
                            "nesting": "",
                            "cells": [
                                {
                                    "headerId": "3",
                                    "value": "Петров"
                                },
                                {
                                    "headerId": "4",
                                    "value": "Петр"
                                },
                                {
                                    "headerId": "5",
                                    "value": "Пертрович"
                                },
                                {
                                    "headerId": "6",
                                    "value": "8611111"
                                },
                                {
                                    "headerId": "7",
                                    "value": ""
                                },
                                {
                                    "headerId": "9",
                                    "value": "Свидетельство о рождении"
                                },
                                {
                                    "headerId": "10",
                                    "value": "82 123"
                                },
                                {
                                    "headerId": "11",
                                    "value": "25.12.2024"
                                },
                                {
                                    "headerId": "13",
                                    "value": "Петр"
                                },
                                {
                                    "headerId": "14",
                                    "value": "5678"
                                }
                            ],
                            "isNew": true
                        }
                    ]    
                },
                // Кнопки слоя
                'buttons': ['Добавить','Режим выбора']//Array<Button> // Необязательно
            }
        }            
    ]
}
export default users;