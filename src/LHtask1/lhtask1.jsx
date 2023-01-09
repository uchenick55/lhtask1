/**
 * Написать функцию sostavChisla(massivChisel: number[], chislo: number),
 которая бы находила все возможные комбинации чисел из massivChisel,
 сумма которых равна chislo. При этом:
 1) massivChisel содержит, только уникальные положительные числа (> 0)
 2) в комбинации не должно быть повторений чисел
 3) все комбинации должны быть уникальными

 Для проверки работоспособности функции запустить runTests()

 @param massivChisel: number[]
 @param chislo: number[]
 @return Array<Array<number>>
 */
function sostavChisla(massivChisel, chislo) { //[8, 2, 3, 4, 6, 7, 1],
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")

    // код писать только внутри данной функции
    let resultLocal = []; // определение массива результата
    let massivChisel2 = []; // удаляем числа больше chislo и вносим в resultLocal числа равные ему
    let massivChisel3 = []; // прогон массива для проверки 2 слагаемых
    let massivChisel4 = []; // прогон массива для проверки 3 слагаемых
    let massivChisel5 = []; //прогон массива для проверки 4 слагаемых
    let itemForRecord = []; // элемент для записи в массив перед проверкой на повторение
    let result = []; // проверка, был ли данный элемент ранее записан в итоговый массив resultLocal

    massivChisel.map(m1 => { //
        if (m1 > chislo) {// значение массива больше или равно сумме,
            return //  пропускаем
        }
        if (m1 === chislo) {  // проверка одного элемента
            itemForRecord = [m1]; // элемент для записи в итоговый массив
            result = resultLocal.find((item, index) => //  проверка повторений элемента
                JSON.stringify(item) === JSON.stringify(itemForRecord));
            if (!result) { // если данный элемент (массив) еще не записан в resultLocal
                resultLocal.push([m1]) // записываем число как массив в итоговый массив resultLocal
            }
        } // значение добавляем в итоговый массив
        massivChisel2.push(m1)
    })

    let commonPart1 = (uslovie, itemForRecordLocal) => {
        // общая часть для проверки условия вхождения и элемент для записи
        if (uslovie) { // проверка двух слагаемых
            itemForRecord = itemForRecordLocal.sort(); // элемент для записи в итоговый массив (сортируем для проверки повторений)
            result = resultLocal.find((item, index) => //  проверка повторений элемента
                JSON.stringify(item) === JSON.stringify(itemForRecord));
            if (!result) { // если данный элемент (массив) еще не записан в resultLocal
                resultLocal.push(itemForRecord)// записываем оба числа как массив в итоговый массив resultLocal
                console.log("itemForRecord", itemForRecord)// вывод того, что добавляем
            }
        }
    }

    massivChisel2.sort() // сортируем временный массив
    massivChisel3 = massivChisel2.slice() // копия массива для проверки 2 слагаемых
    massivChisel2.map(m2 => { // прогоняем второй массив

        massivChisel3 = massivChisel3.filter(item => item !== m2) // удаляем записаные числа из проверяемого массива
        massivChisel3.map(m3 => { // прогоняем третий массив и сравниваем с проверяемым числом

            commonPart1(m2 + m3 === chislo, [m2, m3]) // проверка 2 слагаемых

            if (m2 + m3 < chislo) { //если сумма 2 чисел меньше нужного результата
                massivChisel4 = massivChisel3.filter(item => item !== m3) // копируем массив3 перед прогоном, в нем уже нет вышестоящих чисел
                massivChisel4.map(m4 => {

                        commonPart1(m2 + m3 + m4 === chislo, [m2, m3, m4]) // проверка 3 слагаемых

                    }
                )
            }
        })
    })

    console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
    console.log("resultLocal", resultLocal)
    return resultLocal;
}

// console.log(sostavChisla([8, 2, 3, 4, 6, 7, 1], 99));

function compareNumericArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    arr1 = [...arr1].sort();
    arr2 = [...arr2].sort();

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

function compareArraysOfNumericArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let el1 of arr1) {
        if (arr2.findIndex(el2 => compareNumericArrays(el1, el2)) < 0) {
            return false;
        }
    }

    return true;
}

//runTests();

function RunTests() {
    console.clear()
    const tests = [
        {
            chislo: 5,
            massivChisel: [8, 2, 3, 4, 6, 7, 1],
            result: [[2, 3], [4, 1]]
        },
        {
            chislo: 99,
            massivChisel: [8, 2, 3, 4, 6, 7, 1],
            result: []
        },
        {
            chislo: 8,
            massivChisel: [1, 2, 3, 4, 5, 6, 7, 8],
            result: [[1, 3, 4], [1, 2, 5], [3, 5], [2, 6], [1, 7], [8]]
        },
        {
            chislo: 8,
            massivChisel: [7, 8, 3, 4, 5, 6, 1, 2],
            result: [[1, 3, 4], [1, 2, 5], [3, 5], [2, 6], [1, 7], [8]]
        },
        {
            chislo: 15,
            massivChisel: [7, 8, 3, 4, 5, 6, 1, 2],
            result: [[1, 2, 3, 4, 5], [2, 3, 4, 6], [1, 3, 5, 6], [4, 5, 6], [1, 3, 4, 7], [1, 2, 5, 7], [3, 5, 7], [2, 6, 7], [1, 2, 4, 8], [3, 4, 8], [2, 5, 8], [1, 6, 8], [7, 8]]
        },

    ];

    let errors = 0;
    for (const test of tests) {
        let result;
        try {
            result = sostavChisla(test.massivChisel, test.chislo);

            if (!compareArraysOfNumericArrays(
                result,
                test.result)
            ) {
                errors++;
                console.log('--------------------------------------------')
                console.log("failed for test", test, "Got result", result);
            }
        } catch (e) {
            errors++;
            console.log("failed for", test, 'exception', e.message);
        }
    }

    if (errors === 0) {
        console.log('checkStringForBracects test successfuly completed');
    } else {
        console.log(`checkStringForBracects test failed with ${errors} errors`);
    }
}

export default RunTests

